import { expect, test } from '@playwright/test';
const worker='lifespan-sleep-education-ai.eli-apps.workers.dev';
test.beforeEach(async({page})=>{await page.goto('/');await page.evaluate(()=>localStorage.clear());await page.reload();});

test('lesson step label, Home hierarchy, source link, and responsive overflow are correct', async ({ page }) => {
  await page.goto('/lesson/m1/m1-01');
  await expect(page.getByLabel(/Step 1 of 12/)).toBeVisible();
  const source = page.getByText('Supporting source: NHLBI Sleep Apnea');
  await expect(source).toHaveCSS('color', /rgb\(29, 95, 167\)/);
  await expect(source).toHaveCSS('text-decoration-line', 'underline');
  await page.goto('/');
  await expect(page.getByText('7 focused topics')).toHaveCount(0);
  await expect(page.getByText('Continue Learning')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('focused topics');
});

test('reset confirmation can cancel and then clears progress', async ({ page }) => {
  await page.getByRole('button', { name: /1\. Intro to Sleep Apnea/ }).click();
  await page.getByRole('button', { name: /Start/ }).click();
  await page.getByRole('button', { name: /Next/ }).click();
  await page.getByRole('button', { name: /Home/ }).click();
  await expect(page.getByText(/1 \/ 82 steps/).last()).toBeVisible();
  await page.getByRole('tab', { name: /Settings/ }).click();
  await page.getByRole('button', { name: /Reset progress/ }).click();
  await expect(page.getByRole('alert')).toContainText('saved answers from this device');
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(page.getByRole('alert')).toHaveCount(0);
  await page.getByRole('button', { name: /Reset progress/ }).click();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.getByRole('tab', { name: /Home/ }).click();
  await expect(page.getByText(/0 \/ 82 steps/).last()).toBeVisible();
  await page.reload();
  await expect(page.getByText(/0 \/ 82 steps/).last()).toBeVisible();
});

test.skip('pre-consent AI is offline; consent enables health; revocation blocks future requests',async({page})=>{
  const requests:string[]=[];await page.route(`https://${worker}/**`,async route=>{requests.push(route.request().url());await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true})});});
  await page.getByRole('tab',{name:/Settings/}).click();await page.getByRole('button',{name:/AI learning tools/}).click();
  await expect(page.getByText(/Health: consent_required/)).toBeVisible();await page.waitForTimeout(300);expect(requests).toEqual([]);
  await page.getByRole('button',{name:/consent/}).click();await expect.poll(()=>requests.filter(url=>url.endsWith('/health')).length).toBe(1);
  await page.getByRole('button',{name:'Back',exact:true}).click();await page.getByRole('button',{name:/Revoke AI consent/}).click();
  const count=requests.length;await page.getByRole('button',{name:/AI learning tools/}).click();await expect(page.getByText(/Health: consent_required/)).toBeVisible();await page.waitForTimeout(300);expect(requests.length).toBe(count);
});

test('AI route makes no Worker request before consent and sends only the current message after consent', async ({ page }) => {
  const requests: { url: string; body?: Record<string, unknown> }[] = [];
  await page.route(`https://${worker}/**`, async route => {
    const request = route.request();
    requests.push({ url: request.url(), body: request.postDataJSON() as Record<string, unknown> | undefined });
    await route.fulfill({ json: { feedback: 'Synthetic educational feedback.', followUpQuestion: null, status: 'understood' } });
  });
  await page.goto('/ai?activityId=m1-ai1&kind=teach-back');
  await expect(page.getByText(/I understand and consent/)).toBeVisible();
  await page.waitForTimeout(200);
  expect(requests).toEqual([]);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const input = page.getByRole('textbox');
  await input.fill('privacy-sentinel: the airway narrows during sleep');
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.getByText('Synthetic educational feedback.')).toBeVisible();
  expect(requests).toHaveLength(1);
  const body = requests[0].body ?? {};
  expect(body.messages).toEqual([{ role: 'user', content: 'privacy-sentinel: the airway narrows during sleep' }]);
  expect(String(body.sessionId)).toMatch(/^session_/);
  expect(String(body.sessionId)).not.toContain('lesson-');
  const storage = await page.evaluate(() => Object.values(localStorage).join('\n'));
  expect(storage).not.toContain('privacy-sentinel');
});

test('Module 1 supports incorrect retry, correct feedback, editable multi-select, and unscored reflection',async({page})=>{
  await page.getByRole('button',{name:/1\. Intro to Sleep Apnea/}).click();await page.getByRole('button',{name:/Start/}).click();
  await expect(page.getByRole('heading',{name:'Understanding Sleep Apnea'})).toBeVisible();
  for(let i=0;i<4;i++) await page.getByRole('button',{name:/Next/}).click();
  await expect(page.getByText(/throat muscles relax during sleep/)).toBeVisible();
  await page.getByRole('radio',{name:/lungs stop working/i}).click();await page.getByRole('button',{name:/Submit answer/}).click();
  await expect(page.getByText('Not quite.')).toBeVisible();await page.getByRole('button',{name:/Try again/}).click();
  await page.getByRole('radio',{name:/upper airway repeatedly narrows/i}).click();await page.getByRole('button',{name:/Submit answer/}).click();await expect(page.getByText('Correct.').last()).toBeVisible();
  await page.getByRole('button',{name:/Next/}).click();await page.getByRole('button',{name:/Next/}).click();
  await page.getByRole('checkbox',{name:/I am not sure/i}).click();await page.getByRole('button',{name:/Submit answer/}).click();await expect(page.getByText(/Response saved/)).toBeVisible();
  await page.getByRole('button',{name:/Next/}).click();await page.getByRole('button',{name:/Next/}).click();await page.getByRole('button',{name:/Next/}).click();
  await page.getByRole('checkbox',{name:/pressurized air to help support/i}).click();await page.getByRole('checkbox',{name:/mask can deliver/i}).click();await page.getByRole('checkbox',{name:/equipment or comfort questions/i}).click();
  await page.getByRole('button',{name:/Submit answer/}).click();await expect(page.getByText('Correct.').last()).toBeVisible();
  await page.getByRole('button',{name:/Change answer/}).click();await expect(page.getByRole('checkbox',{name:/mask can deliver/i})).toBeEnabled();
});

test.skip('legacy teach-back screen replaced by LessonChat',async({page})=>{
  let call=0;await page.route(`https://${worker}/**`,async route=>{
    if(route.request().url().endsWith('/health')) return route.fulfill({json:{ok:true}});
    call++;const strong=call===1;return route.fulfill({json:{feedback:strong?'You explained the breathing event clearly.':'You identified airway blockage. Add what happens next.',followUpQuestion:null,status:strong?'understood':'partially_understood'}});
  });
  await page.goto('/lesson/m1/m1-ai1');await page.getByRole('button',{name:/Open AI activity/}).click();await page.getByRole('button',{name:/consent/}).click();
  const box=page.getByRole('textbox',{name:/Explain it in your own words/});await box.fill('The airway closes, airflow stops, and the body restarts breathing.');await page.getByRole('button',{name:/Get educational feedback/}).click();await expect(page.getByText(/explained the breathing event/i)).toBeVisible();await expect(page.getByText(/understoodConcepts|missingConcepts|misconceptions|outsideScope|status/)).toHaveCount(0);
  await box.fill('The airway gets blocked.');await page.getByRole('button',{name:/Get educational feedback/}).click();await expect(page.getByText(/Add what happens next/i)).toBeVisible();
});

test.skip('legacy AI output screen replaced by LessonChat', async ({ page }) => {
  await page.route(`https://${worker}/**`, async route => {
    if (route.request().url().endsWith('/health')) return route.fulfill({ json: { ok: true } });
    return route.fulfill({ status: 502, json: { error: { code: 'AI_UNAVAILABLE', message: 'AI feedback is temporarily unavailable. Your lesson and saved progress are still available.' } } });
  });
  await page.goto('/lesson/m1/m1-ai1');
  await page.getByRole('button', { name: /Open AI activity/ }).click();
  await page.getByRole('button', { name: /consent/ }).click();
  await page.getByRole('textbox', { name: /Explain it in your own words/ }).fill('A short response.');
  await page.getByRole('button', { name: /Get educational feedback/ }).click();
  await expect(page.getByText(/AI feedback is temporarily unavailable/)).toBeVisible();
  await expect(page.locator('body')).not.toContainText('raw');
});

test.skip('legacy parallel AI tools replaced by LessonChat',async({page})=>{
  await page.route(`https://${worker}/**`,async route=>{
    if(route.request().url().endsWith('/health')) return route.fulfill({json:{ok:true}});
    if(route.request().url().includes('pap-barrier')) return route.fulfill({json:{identifiedCategories:['nasal congestion','anxiety or claustrophobia'],clarificationQuestion:'Which starts first?',approvedContentIds:['pap-barriers'],educationalResponse:'Both congestion and anxiety may be involved.',suggestedDiscussionTopics:['timing','mask comfort'],outsideScope:false,urgentLanguageDetected:false}});
    return route.fulfill({json:{answer:'That question is not answered by the approved information in this lesson. This may be a useful question for your healthcare professional.',approvedContentIds:[],suggestedClinicianQuestions:[],outsideScope:true}});
  });
  await page.goto('/lesson/m6/m6-ai1');await page.getByRole('button',{name:/Open AI activity/}).click();await page.getByRole('button',{name:/consent/}).click();
  await page.getByRole('textbox',{name:/Describe a PAP barrier/}).fill('My nose feels blocked and I feel panicked.');await page.getByRole('button',{name:/Get educational feedback/}).click();await expect(page.getByText(/Both congestion and anxiety may be involved/)).toBeVisible();
  await page.goto('/ai');await page.getByRole('radio',{name:/Ask about this lesson/}).click();await page.getByRole('textbox',{name:/Ask about this lesson/}).fill('What medication should I take?');await page.getByRole('button',{name:/Get educational feedback/}).click();await expect(page.getByText(/not answered by the approved information/)).toBeVisible();
});

test('language switching preserves progress and Spanish rendering',async({page})=>{
  await page.getByRole('button',{name:/1\. Intro to Sleep Apnea/}).click();await page.getByRole('button',{name:/Start/}).click();await page.getByRole('button',{name:/Next/}).click();
  await page.getByRole('button',{name:'Home',exact:true}).click();await expect(page.getByText(/1 \/ 82 steps/).last()).toBeVisible();
  await page.getByRole('tab',{name:/Settings/}).click();await page.getByRole('radio',{name:'Español'}).click();await page.getByRole('tab',{name:/Inicio/}).click();
  await expect(page.getByText(/1 \/ 82 pasos/).last()).toBeVisible();await page.getByRole('button',{name:/1\. Introducci.n a la apnea del sue.o/}).click();await page.getByRole('button',{name:/Continuar/}).click();
  await expect(page.getByRole('heading',{name:/La respiraci.n durante el sue.o/})).toBeVisible();
});

test('mobile, tablet, and desktop layouts have no horizontal overflow or obstructed controls',async({page})=>{
  for(const viewport of [{width:390,height:844},{width:768,height:1024},{width:1440,height:900}]){
    await page.setViewportSize(viewport);await page.goto('/');
    const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,buttons:Array.from(document.querySelectorAll('button')).map(el=>el.getBoundingClientRect()).filter(box=>box.width>0&&box.height>0).every(box=>box.right>=0&&box.left<=innerWidth)}));
    expect(metrics.scrollWidth).toBe(metrics.clientWidth);expect(metrics.buttons).toBe(true);
  }
});

test('LessonChat is the single bounded multi-turn flow', async ({ page }) => {
  let calls = 0;
  await page.route(`https://${worker}/**`, async route => {
    if (route.request().url().endsWith('/health')) return route.fulfill({ json: { ok: true } });
    calls += 1;
    return route.fulfill({ json: { status: 'understood', feedback: `Feedback ${calls}`, followUpQuestion: null } });
  });
  await page.goto('/ai?activityId=m1-ai1&kind=teach-back');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const input = page.getByRole('textbox');
  for (let i = 0; i < 3; i++) { await input.fill(`Response ${i}`); await page.getByRole('button', { name: 'Send' }).click(); await expect(page.getByText(`Feedback ${i + 1}`)).toBeVisible(); }
  await expect(page.getByText(/covered the main idea/i)).toBeVisible();
  await expect(input).toHaveCount(0);
  expect(calls).toBe(3);
});

test('Settings AI entry does not expose an invalid lesson continuation route', async ({ page }) => {
  await page.goto('/settings');
  await page.getByRole('button', { name: /AI learning tools/i }).click();
  await expect(page).toHaveURL(/\/ai$/);
  await expect(page.getByRole('button', { name: /Continue lesson/i })).toHaveCount(0);
});
