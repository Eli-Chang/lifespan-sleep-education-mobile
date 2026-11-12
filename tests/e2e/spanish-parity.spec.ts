import { test, expect } from '@playwright/test';
import { spanishModules } from '../../src/content/es';

test('all active Spanish learner routes render translated screen titles without fallback text', async ({ page }) => {
  // 113 full page loads against the dev server take about 260 s on the 2026-11 Windows PC; 240 s was too tight.
  test.setTimeout(480_000);
  const consoleErrors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  await page.addInitScript(() => {
    localStorage.setItem('sleep_education_state_v3', JSON.stringify({ language: 'es' }));
  });

  let routeCount = 0;
  for (const module of spanishModules) {
    for (const screen of module.screens) {
      await page.goto(`/lesson/${module.id}/${screen.id}`, { waitUntil: 'commit', timeout: 15_000 });
      await expect(page.locator('body')).toContainText(screen.title);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).not.toContain('temporary_english_fallback');
      routeCount += 1;
    }
  }

  expect(routeCount).toBe(spanishModules.reduce((total, module) => total + module.screens.length, 0));
  expect(consoleErrors).toEqual([]);
});
