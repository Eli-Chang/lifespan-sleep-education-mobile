// Captures a fixed set of learner screens for before/after visual review.
// Usage: node scripts/capture-ui-review.mjs <outDir> [baseUrl]
// Requires the web preview to be running (npm run web). Uses local Chrome.
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from '@playwright/test';

const outDir = process.argv[2];
const baseUrl = process.argv[3] ?? 'http://127.0.0.1:8084';
if (!outDir) throw new Error('Pass an output directory.');
mkdirSync(outDir, { recursive: true });

const STORAGE_KEY = 'sleep_education_state_v3';
const m1 = ['m1-01', 'm1-03', 'm1-q1', 'm1-04', 'm1-05', 'm1-r1', 'm1-06', 'm1-07', 'm1-q2', 'm1-recap'];
const fresh = (language) => ({ language, curriculumVersion: 11 });
const inProgress = (language) => ({
  language, curriculumVersion: 11, currentModuleId: 'm2',
  completedScreenIds: [...m1, 'm2-01', 'm2-r1', 'm2-03'], completedModuleIds: ['m1'],
  lastScreenByModule: { m1: 'm1-recap', m2: 'm2-05' },
});

const phone = { width: 390, height: 844 };
const narrow = { width: 320, height: 640 };
const tablet = { width: 834, height: 1112 };

async function answer(page, ids) {
  for (const id of ids) await page.getByTestId(`choice-m1-q2-${id}`).click();
  await page.getByRole('button', { name: /^Submit|^Enviar/ }).click();
  await page.waitForTimeout(500);
}

const shots = [
  { name: '01-home-fresh-en', path: '/', state: fresh('en'), fullPage: true },
  { name: '02-home-progress-en', path: '/', state: inProgress('en') },
  { name: '03-home-progress-es', path: '/', state: inProgress('es') },
  { name: '04-module-m1-en', path: '/module/m1', state: inProgress('en'), fullPage: true },
  { name: '05-lesson-m1-01-en', path: '/lesson/m1?screenId=m1-01&direction=forward', state: fresh('en'), fullPage: true },
  { name: '06-lesson-m1-04-en', path: '/lesson/m1?screenId=m1-04&direction=forward', state: fresh('en'), fullPage: true },
  { name: '07-quiz-m1-q2-unanswered-en', path: '/lesson/m1?screenId=m1-q2&direction=forward', state: fresh('en'), fullPage: true },
  { name: '08-quiz-m1-q2-incorrect-en', path: '/lesson/m1?screenId=m1-q2&direction=forward', state: fresh('en'), fullPage: true, act: (page) => answer(page, ['c1', 'c2']) },
  { name: '09-quiz-m1-q2-correct-en', path: '/lesson/m1?screenId=m1-q2&direction=forward', state: fresh('en'), fullPage: true, act: (page) => answer(page, ['c2', 'c3', 'c5']) },
  { name: '10-reflection-m1-r1-en', path: '/lesson/m1?screenId=m1-r1&direction=forward', state: fresh('en'), fullPage: true },
  { name: '11-summary-m1-recap-en', path: '/lesson/m1?screenId=m1-recap&direction=forward', state: inProgress('en'), fullPage: true },
  { name: '12-complete-m1-en', path: '/module/m1/complete', state: inProgress('en'), fullPage: true },
  { name: '13-settings-en', path: '/settings', state: fresh('en'), fullPage: true },
  { name: '14-settings-es', path: '/settings', state: fresh('es'), fullPage: true },
  { name: '15-about-en', path: '/about', state: fresh('en') },
  { name: '16-quiz-m1-q2-es', path: '/lesson/m1?screenId=m1-q2&direction=forward', state: fresh('es'), fullPage: true },
  { name: '17-lesson-m1-01-es', path: '/lesson/m1?screenId=m1-01&direction=forward', state: fresh('es') },
  { name: '18-home-narrow-en', path: '/', state: inProgress('en'), viewport: narrow },
  { name: '19-lesson-m1-04-narrow-en', path: '/lesson/m1?screenId=m1-04&direction=forward', state: fresh('en'), viewport: narrow },
  { name: '20-home-tablet-en', path: '/', state: inProgress('en'), viewport: tablet },
  { name: '21-lesson-m1-04-tablet-en', path: '/lesson/m1?screenId=m1-04&direction=forward', state: fresh('en'), viewport: tablet },
];

const browser = await chromium.launch({ channel: 'chrome' });
const only = process.env.ONLY ? new RegExp(process.env.ONLY) : undefined;
for (const shot of shots) {
  if (only && !only.test(shot.name)) continue;
  const context = await browser.newContext({ viewport: shot.viewport ?? phone, deviceScaleFactor: 2, reducedMotion: process.env.REDUCED_MOTION === '1' ? 'reduce' : 'no-preference' });
  await context.addInitScript(([key, value]) => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem(key, value); sessionStorage.setItem('seeded', '1'); } }, [STORAGE_KEY, JSON.stringify(shot.state)]);
  const page = await context.newPage();
  await page.goto(`${baseUrl}${shot.path}`, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(1200);
  if (shot.act) await shot.act(page);
  if (shot.fullPage) {
    // React Native Web scrolls an inner view, so grow the viewport by its hidden overflow.
    const overflow = await page.evaluate(() => Math.max(0, ...[...document.querySelectorAll('div')].filter((el) => el.offsetParent !== null && el.scrollHeight > el.clientHeight + 4 && getComputedStyle(el).overflowY !== 'visible').map((el) => el.scrollHeight - el.clientHeight)));
    const viewport = shot.viewport ?? phone;
    if (overflow) { await page.setViewportSize({ width: viewport.width, height: viewport.height + overflow }); await page.waitForTimeout(600); }
  }
  await page.screenshot({ path: join(outDir, `${shot.name}.png`) });
  console.log('captured', shot.name);
  await context.close();
}
await browser.close();
