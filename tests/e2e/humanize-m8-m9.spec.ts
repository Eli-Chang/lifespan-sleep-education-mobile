import { mkdirSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { englishModules } from '../../src/content/en';

const STORAGE_KEY = 'sleep_education_state_v3';
const SHOTS = process.env.HUMANIZE_SHOTS ?? 'artifacts/humanize/shots';
const norm = (text: string) => text.replace(/\s+/g, ' ').trim();

test('every English paragraph and key point of the PAP modules renders on its lesson route', async ({ page }) => {
  test.setTimeout(240_000);
  mkdirSync(SHOTS, { recursive: true });
  await page.setViewportSize({ width: 430, height: 1300 });
  await page.addInitScript(([key, value]) => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem(key, value); sessionStorage.setItem('seeded', '1'); } }, [STORAGE_KEY, JSON.stringify({ language: 'en' })] as const);
  for (const module of englishModules.filter((m) => m.id === 'm8' || m.id === 'm9')) {
    for (const screen of module.screens) {
      await page.goto(`/lesson/${module.id}/${screen.id}`);
      await expect(page.locator('body')).toContainText(norm(screen.title).slice(0, 40));
      if (screen.type === 'content') {
        const body = norm(await page.locator('body').innerText());
        for (const text of [...screen.paragraphs, ...(screen.keyPoints ?? [])]) {
          expect(body, `${screen.id} should render: ${text.slice(0, 50)}`).toContain(norm(text));
        }
      }
    }
  }
  for (const [moduleId, screenId] of [['m8', 'm8-01'], ['m9', 'm9-03'], ['m9', 'm9-09']]) {
    await page.setViewportSize({ width: 430, height: 1300 });
    await page.goto(`/lesson/${moduleId}/${screenId}`);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${SHOTS}/mobile-${screenId}.png` });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${SHOTS}/desktop-${screenId}.png` });
  }
});
