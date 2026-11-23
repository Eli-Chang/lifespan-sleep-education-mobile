import { mkdirSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { englishModules } from '../../src/content/en';
import { REVIEW_ITEMS, exactScreenText, findScreen } from '../../src/qa/curriculum-review';

const STORAGE_KEY = 'sleep_education_state_v3';
const SHOTS = process.env.REVIEW_SHOTS ?? 'artifacts/curriculum-review';
const readState = (page: Page) => page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);

test('the review index opens every affected real screen with the exact English text and changes no progress', async ({ page }) => {
  test.setTimeout(300_000);
  mkdirSync(SHOTS, { recursive: true });
  // Tall phone-width viewport so a whole lesson fits in one screenshot (the lesson scrolls inside the page).
  await page.setViewportSize({ width: 430, height: 1100 });
  await page.addInitScript(([key, value]) => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem(key, value); sessionStorage.setItem('seeded', '1'); } }, [STORAGE_KEY, JSON.stringify({ language: 'en' })] as const);
  await page.goto('/');
  await expect(page.getByText('Start by understanding sleep.')).toBeVisible();
  await page.waitForTimeout(1000);
  const baseline = await readState(page);

  for (const item of REVIEW_ITEMS) {
    await page.goto(`/qa/curriculum-review?issue=${item.number}`);
    await expect(page.getByTestId('review-banner')).toContainText('English Curriculum Review — Internal Draft');
    await expect(page.getByTestId('review-issue-title')).toContainText(`Issue ${item.number} of 6`);
    for (const highlight of item.highlights) {
      // The exact stored passage is present on the review screen inside the screen's own block.
      await expect(page.getByTestId(`review-screen-${highlight.screenId}`)).toContainText(highlight.phrase);
    }
    await page.screenshot({ path: `${SHOTS}/review-issue-${item.number}.png`, fullPage: true });

    for (const ref of item.screens) {
      await page.goto(`/qa/curriculum-review?issue=${item.number}`);
      await page.getByTestId(`open-screen-${ref.screenId}`).click();
      const found = findScreen(englishModules, ref.screenId)!;
      await expect(page).toHaveURL(new RegExp(`/lesson/${found.module.id}(/${ref.screenId}|[?].*screenId=${ref.screenId})`));
      // The app opens a pushed lesson as /lesson/<module>?screenId=<id>; a typed /lesson/<module>/<id> address also works (checked below).
      // The real lesson screen shows the screen's own title or prompt.
      const first = exactScreenText(found.screen).find(([field]) => field === 'prompt' || field === 'title')!;
      await expect(page.locator('body')).toContainText(first[1].slice(0, 60).trim());
      if (ref.role === 'affected' || ref.role === 'comparison') { await page.waitForTimeout(1200); await page.screenshot({ path: `${SHOTS}/screen-${ref.screenId}.png` }); }
    }
  }

  // Next/Previous and the tab buttons move between all six items.
  await page.goto('/qa/curriculum-review?issue=1');
  for (let n = 2; n <= 6; n += 1) { await page.getByTestId('review-next').click(); await expect(page.getByTestId('review-issue-title')).toContainText(`Issue ${n} of 6`); }
  await page.getByTestId('review-tab-3').click();
  await expect(page.getByTestId('review-issue-title')).toContainText('Issue 3 of 6');
  await expect(page.getByTestId('key-m2-q1')).toContainText('none stored');
  await expect(page.getByTestId('key-m2-q2')).toContainText('CIAS_SCREEN_RECORDING');
  await page.getByTestId('review-tab-2').click();
  await page.getByTestId('jump-m2-05').click();
  await expect(page).toHaveURL(/\/lesson\/m2(\/m2-05|[?].*screenId=m2-05)/);

  // Typed deep links open the same real screens.
  for (const [moduleId, screenId] of [['m1', 'm1-q1'], ['m2', 'm2-05'], ['m2', 'm2-q1'], ['m2', 'm2-q2'], ['m5', 'm5-04'], ['m5b', 'm5-10'], ['m6', 'm6-03']]) {
    await page.goto(`/lesson/${moduleId}/${screenId}`);
    const first = exactScreenText(findScreen(englishModules, screenId)!.screen).find(([field]) => field === 'prompt' || field === 'title')!;
    await expect(page.locator('body')).toContainText(first[1].slice(0, 60).trim());
  }
  await page.goto('/');
  await page.waitForTimeout(500);
  expect(await readState(page)).toBe(baseline);
});
