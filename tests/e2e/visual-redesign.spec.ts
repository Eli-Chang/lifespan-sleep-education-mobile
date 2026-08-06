import { expect, test } from '@playwright/test';

const worker = 'lifespan-sleep-education-ai.eli-apps.workers.dev';
const routeNavigationOptions = { waitUntil: 'commit' as const, timeout: 60_000 };

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('visual redesign routes expose reachable headings and no horizontal overflow', async ({ page }) => {
  const routes = ['/', '/module/m1', '/lesson/m1/m1-01', '/lesson/m1/m1-q1', '/lesson/m1/m1-r1', '/settings'];
  for (const route of routes) {
    await page.goto(route, routeNavigationOptions);
    await expect(page.locator('h1')).toHaveCount(1);
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      obstructed: Array.from(document.querySelectorAll('button, input, textarea')).some((node) => {
        const box = node.getBoundingClientRect();
        return box.width > 0 && box.height > 0 && (box.right < 0 || box.left > innerWidth);
      }),
    }));
    expect(metrics.scrollWidth).toBe(metrics.clientWidth);
    expect(metrics.obstructed).toBe(false);
  }
});

test('quiz controls expose selected state and keep Next disabled until submission', async ({ page }) => {
  await page.goto('/lesson/m1/m1-q1');
  await expect(page.getByRole('button', { name: 'Next', exact: true })).toBeDisabled();
  const answer = page.getByRole('radio').first();
  await answer.check();
  await expect(answer).toBeChecked();
  await expect(page.getByRole('button', { name: 'Submit answer', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Submit answer', exact: true }).click();
  await expect(page.locator('[aria-live="polite"]')).toBeVisible();
});

test('Spanish settings and lesson controls wrap without losing accessible names', async ({ page }) => {
  await page.goto('/settings');
  await page.getByRole('radio', { name: 'Español' }).click();
  await expect(page.getByRole('heading', { name: 'Ajustes', exact: true })).toBeVisible();
  await expect(page.getByRole('switch', { name: 'Narración', exact: true })).toBeVisible();
  await page.goto('/lesson/m1/m1-01');
  await expect(page.getByRole('heading', { name: 'Comprender la apnea del sueño', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reproducir', exact: true })).toBeVisible();
  const width = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  expect(width.scrollWidth).toBe(width.clientWidth);
});

test('LessonChat remains consent-gated and supports a bounded three-turn conversation', async ({ page }) => {
  let calls = 0;
  const requests: string[] = [];
  await page.route(`https://${worker}/**`, async (route) => {
    requests.push(route.request().url());
    if (route.request().url().endsWith('/health')) return route.fulfill({ json: { ok: true } });
    calls += 1;
    return route.fulfill({ json: { status: 'understood', feedback: `Synthetic feedback ${calls}`, followUpQuestion: null } });
  });
  await page.goto('/ai?activityId=m1-ai1&kind=teach-back');
  await page.waitForTimeout(200);
  expect(requests).toEqual([]);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const input = page.getByRole('textbox');
  for (let i = 1; i <= 3; i += 1) {
    await input.fill(`Synthetic response ${i}`);
    await page.getByRole('button', { name: 'Send', exact: true }).click();
    await expect(page.getByText(`Synthetic feedback ${i}`, { exact: true })).toBeVisible();
  }
  await expect(page.getByText(/covered the main idea/i)).toBeVisible();
  await expect(input).toHaveCount(0);
  expect(calls).toBe(3);
});
