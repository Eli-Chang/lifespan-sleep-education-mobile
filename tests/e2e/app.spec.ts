import { expect, test } from '@playwright/test';

test('the learner can open a module without an obsolete assistant route', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole('button', { name: /1\. Intro to Sleep Apnea/i }).click();
  await page.getByRole('button', { name: /Start/i }).click();
  await expect(page.getByText(/Sleep Apnea|Apnea del sueño/i)).toBeVisible();
  await expect(page.locator('[href="/ai"]')).toHaveCount(0);
});
