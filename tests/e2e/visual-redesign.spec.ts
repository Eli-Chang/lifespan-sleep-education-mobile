import { expect, test } from '@playwright/test';

test('lesson controls remain usable without an assistant surface', async ({ page }) => {
  await page.goto('/lesson/m1/m1-r1');
  await expect(page.getByRole('button', { name: 'Previous', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Listen', exact: true })).toBeVisible();
  await expect(page.locator('[href="/ai"]')).toHaveCount(0);
});
