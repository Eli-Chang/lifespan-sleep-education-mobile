import { expect, test, type Page } from '@playwright/test';
import { englishModules } from '../../src/content/en';
import { modulesByLocale } from '../../src/content';
import { LOCALE_DEFINITIONS } from '../../src/i18n/locales';
import { UI_STRINGS } from '../../src/i18n/strings';
import type { LessonScreen } from '../../src/types/content';

const STORAGE_KEY = 'sleep_education_state_v3';
const NEW_LOCALES = ['pt-BR', 'ht'] as const;
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const fill = (template: string, values: Record<string, string | number>) => template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => String(values[key]));
const isScored = (screen: LessonScreen) =>
  (screen.type === 'singleChoice' && Boolean(screen.correctChoiceId)) || (screen.type === 'multiSelect' && Boolean(screen.correctChoiceIds?.length));

async function seed(page: Page, state: Record<string, unknown>) {
  await page.addInitScript(([key, value]) => {
    if (!sessionStorage.getItem('seeded')) { localStorage.setItem(key, value); sessionStorage.setItem('seeded', '1'); }
  }, [STORAGE_KEY, JSON.stringify(state)] as const);
}

test('Settings offers all four languages by their specific names and states the draft status', async ({ page }) => {
  await seed(page, { language: 'en' });
  await page.goto('/settings');
  await expect(page.getByRole('radio')).toHaveCount(4);
  for (const name of ['English', 'Español', 'Português (Brasil)', 'Kreyòl ayisyen']) await expect(page.getByRole('radio', { name })).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Creole' })).toHaveCount(0);
  for (const locale of NEW_LOCALES) {
    await page.getByRole('radio', { name: LOCALE_DEFINITIONS[locale].nativeName }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.getByTestId('language-status-note')).toHaveText(UI_STRINGS[locale].languageStatusNote);
    await expect(page.getByTestId('language-status-note')).toContainText('Claude');
  }
});

for (const locale of NEW_LOCALES) {
  test(`About states in ${locale} that the translation is an unreviewed AI draft`, async ({ page }) => {
    await seed(page, { language: locale });
    await page.goto('/about');
    await expect(page.getByTestId('content-status')).toContainText(UI_STRINGS[locale].contentStatusHeading);
    await expect(page.getByTestId('content-status')).toContainText(UI_STRINGS[locale].translationStatusBody);
  });

  test(`the ${locale} home path lists all ten modules in order with no English interface text`, async ({ page }) => {
    await seed(page, { language: locale });
    await page.goto('/');
    await expect(page.getByText(UI_STRINGS[locale].homeTitle)).toBeVisible();
    for (const module of modulesByLocale[locale]) await expect(page.getByRole('button', { name: new RegExp(`^${module.order}\\. ${escape(module.title)}\\.`) })).toBeVisible();
    await expect(page.getByText(UI_STRINGS.en.homeTitle)).toHaveCount(0);
  });

  test(`every ${locale} lesson route renders its translated title with no English fallback marker`, async ({ page }) => {
    test.setTimeout(900_000);
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await seed(page, { language: locale });
    let count = 0;
    for (const module of modulesByLocale[locale]) {
      for (const screen of module.screens) {
        await page.goto(`/lesson/${module.id}/${screen.id}`, { waitUntil: 'commit', timeout: 20_000 });
        await expect(page.locator('body')).toContainText(screen.title);
        expect(await page.locator('body').innerText()).not.toContain('temporary_english_fallback');
        count += 1;
      }
    }
    expect(count).toBe(116);
    expect(errors).toEqual([]);
  });

  test(`every ${locale} module is reachable and completable by clicking through every screen`, async ({ page }) => {
    test.setTimeout(1_200_000);
    const strings = UI_STRINGS[locale];
    const modules = modulesByLocale[locale];
    await seed(page, { language: locale });
    for (const [moduleIndex, module] of modules.entries()) {
      await page.goto(`/module/${module.id}`);
      await expect(page.getByRole('heading', { name: module.title })).toBeVisible();
      await page.getByRole('button', { name: new RegExp(`^(${escape(strings.start)}|${escape(strings.continue)}|${escape(strings.reviewModuleAction)})`) }).first().click();
      for (const [index, screen] of module.screens.entries()) {
        await expect(page.getByText(fill(strings.stepOf, { current: index + 1, total: module.screens.length }), { exact: true }).filter({ visible: true }).first()).toBeVisible({ timeout: 20_000 });
        await expect(page).toHaveURL(new RegExp(`/lesson/${module.id}.*${screen.id}`));
        await expect(page.getByText(screen.type === 'content' || screen.type === 'summary' ? screen.title : screen.prompt, { exact: true }).filter({ visible: true }).first()).toBeVisible();
        const last = index === module.screens.length - 1;
        if (isScored(screen) && (screen.type === 'singleChoice' || screen.type === 'multiSelect')) {
          const correct = screen.type === 'singleChoice' ? [screen.correctChoiceId!] : screen.correctChoiceIds!;
          for (const id of correct) {
            const label = screen.choices.find((choice) => choice.id === id)!.label;
            await page.getByRole(screen.type === 'singleChoice' ? 'radio' : 'checkbox', { name: label, exact: true }).filter({ visible: true }).first().click();
          }
          // Single-choice shows "Check answer"; multi-select shows "Check N answers". Match the shared first word.
          await page.getByRole('button', { name: new RegExp(`^${escape(strings.submit.split(' ')[0])}`) }).filter({ visible: true }).first().click();
          await expect(page.getByRole('alert').filter({ visible: true }).filter({ hasText: strings.correct }).first()).toBeVisible();
        }
        // The lesson screen ignores navigation for 320 ms after each page turn (a double-tap guard).
        await page.waitForTimeout(400);
        await page.getByRole('button', { name: last ? strings.completeModule : new RegExp(`^(${escape(strings.next)}|${escape(strings.skipOptional)})$`) }).filter({ visible: true }).first().click();
      }
      await expect(page).toHaveURL(new RegExp(`/module/${module.id}/complete`));
      await expect(page.getByText(fill(strings.moduleCompleteKicker, { number: module.order }))).toBeVisible();
      const next = modules[moduleIndex + 1];
      if (next) {
        await page.getByRole('button', { name: fill(strings.continueToNextModule, { module: next.shortTitle }) }).click();
        await expect(page).toHaveURL(new RegExp(`/module/${next.id}$`));
      }
    }
    await page.goto('/');
    await expect(page.getByText(strings.allModulesComplete)).toBeVisible();
    const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? '{}'), STORAGE_KEY);
    expect(stored.curriculumVersion).toBe(14);
    expect(new Set(stored.completedModuleIds)).toEqual(new Set(englishModules.map((module) => module.id)));
  });
}

test('switching languages keeps progress and answers, never duplicates completed screens, and reopens a completed screen', async ({ page }) => {
  const completed = ['m1-01', 'm1-03', 'm1-q1'];
  await seed(page, { language: 'en', completedScreenIds: completed, completedModuleIds: [], currentModuleId: 'm1', answers: { 'm1-q1': ['c1'] } });
  await page.goto('/settings');
  for (const locale of ['pt-BR', 'ht', 'es', 'en'] as const) {
    await page.getByRole('radio', { name: LOCALE_DEFINITIONS[locale].nativeName }).click();
    const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? '{}'), STORAGE_KEY);
    expect(stored.language).toBe(locale);
    expect(new Set(stored.completedScreenIds)).toEqual(new Set(completed));
    expect(stored.completedScreenIds.length).toBe(completed.length);
    expect(stored.answers['m1-q1']).toEqual(['c1']);
  }
  await page.getByRole('radio', { name: LOCALE_DEFINITIONS.ht.nativeName }).click();
  await page.goto('/lesson/m1/m1-03');
  await expect(page.locator('body')).toContainText(modulesByLocale.ht[0].screens[1].title);
});

for (const [name, width, height] of [['phone 320', 320, 640], ['phone 390', 390, 844], ['desktop', 1280, 800]] as const) {
  test(`long Portuguese and Creole text does not overflow on ${name}`, async ({ page }) => {
    // Twelve full page loads against the dev server; 30 s was too tight on the 2026-11 Windows PC.
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height });
    for (const locale of NEW_LOCALES) {
      await page.addInitScript(([key, value]) => localStorage.setItem(key, value), [STORAGE_KEY, JSON.stringify({ language: locale })] as const);
      for (const path of ['/', '/settings', '/about', '/lesson/m6/m6-03', '/lesson/m9/m9-04', '/lesson/m8/m8-08']) {
        await page.goto(path);
        await page.waitForTimeout(500);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${locale} ${path} horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
      }
    }
  });
}

test('narration controls are labeled in the selected language', async ({ page }) => {
  for (const locale of NEW_LOCALES) {
    await page.addInitScript(([key, value]) => localStorage.setItem(key, value), [STORAGE_KEY, JSON.stringify({ language: locale })] as const);
    await page.goto('/lesson/m1/m1-03');
    await expect(page.getByRole('button', { name: new RegExp(`^${escape(UI_STRINGS[locale].listen)}`) }).first()).toBeVisible();
  }
});
