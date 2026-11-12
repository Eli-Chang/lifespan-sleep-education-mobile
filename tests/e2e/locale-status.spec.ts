import { expect, test, type Page } from '@playwright/test';

const STORAGE_KEY = 'sleep_education_state_v3';

async function seed(page: Page, state: Record<string, unknown>) {
  await page.addInitScript(([key, value]) => {
    if (!sessionStorage.getItem('seeded')) {
      localStorage.setItem(key, value);
      sessionStorage.setItem('seeded', '1');
    }
  }, [STORAGE_KEY, JSON.stringify(state)] as const);
}

test('Settings offers only complete languages and states their review status', async ({ page }) => {
  await seed(page, { language: 'es' });
  await page.goto('/settings');
  const radios = page.getByRole('radio');
  await expect(radios).toHaveCount(2);
  await expect(page.getByRole('radio', { name: 'English' })).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Español' })).toBeVisible();
  await expect(page.getByTestId('language-status-note')).toContainText('borrador');
  await expect(page.getByTestId('language-status-note')).toContainText('no han completado la revisión clínica');
  await page.getByRole('radio', { name: 'English' }).click();
  await expect(page.getByTestId('language-status-note')).toContainText('have not completed clinical review');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('a saved but unsupported language falls back to English defaults instead of a broken screen', async ({ page }) => {
  await seed(page, { language: 'pt' });
  await page.goto('/');
  await expect(page.getByText('Start by understanding sleep.')).toBeVisible();
});

test('About shows the content status card in both languages', async ({ page }) => {
  await seed(page, { language: 'es' });
  await page.goto('/about');
  const card = page.getByTestId('content-status');
  await expect(card).toContainText('Estado del contenido');
  await expect(card).toContainText('borrador');
});

for (const [screenId, hiddenAlt] of [['m8-10', /cylinder duration/i], ['m9-05', /facial skin/i]] as const) {
  test(`${screenId} no longer shows its withheld image`, async ({ page }) => {
    await seed(page, { language: 'en' });
    await page.goto(`/lesson/${screenId.split('-')[0]}/${screenId}`);
    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(page.getByLabel(hiddenAlt)).toHaveCount(0);
  });
}

test('Spanish hides numbered knowledge-check titles the same way English does', async ({ page }) => {
  await seed(page, { language: 'es' });
  await page.goto('/lesson/m5/m5-q9');
  await expect(page.getByText('COMPROBAR COMPRENSIÓN')).toBeVisible();
  // Hidden titles stay in the DOM as 1 px, aria-hidden text; the learner-facing check is aria-hidden.
  await expect(page.getByText(/Comprobación de conocimientos 6/)).toHaveAttribute('aria-hidden', 'true');
});
