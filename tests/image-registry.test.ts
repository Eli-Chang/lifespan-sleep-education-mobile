import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();
const registry = readFileSync(join(root, 'src', 'content', 'image-registry.ts'), 'utf8');
const assetPaths = [...registry.matchAll(/require\('\.\.\/\.\.\/(assets\/curriculum\/[^']+)'\)/g)].map((match) => match[1]);
const entries = [...registry.matchAll(/\{ id: '([^']+)'.+?altText: \{ en: '([^']+)', es: '([^']+)' \}.+?decorative: (true|false).+?attribution: '([^']+)'(?:, licenseStatus: '([^']+)')?(?:, displayOnSourceRecovered: (true|false))? \}/g)];

test('curriculum registry has a focused set of bundled assets', () => {
  assert.ok(assetPaths.length >= 12);
  assert.equal(new Set(assetPaths).size, assetPaths.length);
  for (const path of assetPaths) assert.ok(existsSync(join(root, path)), `missing ${path}`);
});

test('Module 2 uses four one-screen user photos with exact ratios on recovered CIAS content', () => {
  const expected = [
    ['m2-01-partner-at-bedtime', 'm2-01', '1600 / 1068'],
    ['m2-03-pap-during-sleep', 'm2-03', '678 / 452'],
    ['m2-05-partners-resting', 'm2-05', '597 / 335'],
    ['m2-04-pap-with-partner', 'm2-04', '447 / 447'],
  ];
  for (const [id, lessonId, ratio] of expected) {
    const line = registry.split('\n').find((candidate) => candidate.includes(`id: '${id}'`));
    assert.ok(line, `${id} missing`);assert.match(line, new RegExp(`lessonIds: \\['${lessonId}'\\]`));assert.ok(line.includes(`aspectRatio: ${ratio}`));assert.ok(line.includes("attribution: 'User-provided photo'"));assert.ok(line.includes('decorative: false'));assert.ok(line.includes('displayOnSourceRecovered: true'));
  }
  assert.doesNotMatch(registry, /id: 'conversation'|id: 'person-in-bed'/);
});

test('Module 3 opener uses the user-provided pregnancy outcomes infographic', () => {
  const line = registry.split('\n').find((candidate) => candidate.includes("id: 'm3-pregnancy-outcomes'"));
  assert.ok(line);assert.match(line, /lessonIds: \['m3-01'\]/);assert.ok(line.includes('aspectRatio: 4 / 3'));assert.ok(line.includes("attribution: 'User-provided infographic'"));assert.ok(line.includes('decorative: false'));assert.ok(line.includes('displayOnSourceRecovered: true'));
  assert.doesNotMatch(registry, /id: 'alarm-plan'.+m3-01/);
});

test('Module 3 steps 5 and 8 use one user-provided photo each', () => {
  const expected = [
    ['m3-05-pregnancy-rest', 'm3-05', '547 / 365', 'Pregnant person resting on their side in bed.', 'Persona embarazada descansando de lado en la cama.'],
    ['m3-04-pap-sleep', 'm3-04', '1200 / 405', 'Person sleeping in bed while wearing a PAP mask.', 'Persona durmiendo en la cama mientras usa una mascarilla de PAP.'],
  ];
  for (const [id, lessonId, ratio, en, es] of expected) {
    const line = registry.split('\n').find((candidate) => candidate.includes(`id: '${id}'`));
    assert.ok(line, `${id} missing`);
    assert.match(line, new RegExp(`lessonIds: \\['${lessonId}'\\]`));
    assert.ok(line.includes(`aspectRatio: ${ratio}`));
    assert.ok(line.includes(`en: '${en}'`));
    assert.ok(line.includes(`es: '${es}'`));
    assert.ok(line.includes("attribution: 'User-provided photo'"));
    assert.ok(line.includes('decorative: false'));
    if (lessonId === 'm3-04') assert.ok(line.includes('displayOnSourceRecovered: true'));
  }
  assert.doesNotMatch(registry, /id: 'handshake-support'/);
});

test('Module 4 user media is registered with exact one-screen mappings and provenance', () => {
  const expected = [
    ['pregnancy-sleep-apnea-intro', 'm4-01', '694 / 440'],
    ['preeclampsia-overview', 'm4-06', '2400 / 1020'],
    ['pap-treatment-benefits', 'm4-recap', '1294 / 1380'],
  ];
  for (const [id, lessonId, ratio] of expected) {
    const line = registry.split('\n').find((candidate) => candidate.includes(`id: '${id}'`));
    assert.ok(line, `${id} missing`);
    assert.match(line, new RegExp(`lessonIds: \\['${lessonId}'\\]`));
    assert.ok(line.includes(`aspectRatio: ${ratio}`));
    assert.ok(line.includes("attribution: 'User-provided image'"));
    assert.ok(line.includes("licenseStatus: 'unknown/user-provided'"));
    assert.ok(line.includes('displayOnSourceRecovered: true'));
  }
});

test('Module 5 user media has exact one-screen mappings, dimensions, and unknown provenance', () => {
  const expected = [
    ['m5-sleep-hygiene-intro','m5-01','447 / 447'],['m5-pregnancy-sleep-benefits','m5-02','678 / 452'],['m5-sleep-hygiene-overview','m5-03','860 / 440'],
    ['m5-sleep-wake-cycle','m5-13','1442 / 1080'],['m5-blue-light','m5-05','674 / 450'],['m5-difficulty-sleeping','m5-11','910 / 568'],
    ['m5-morning-sunlight','m5-14','736 / 621'],['m5-sleep-environment','m5-06','612 / 408'],['m5-bedroom-noise','m5-15','1024 / 800'],
    ['m5-dark-bedroom','m5-16','1456 / 816'],['m5-bedroom-temperature','m5-17','1155 / 649'],['m5-nighttime-caffeine','m5-07','862 / 577'],
    ['m5-meal-timing','m5-08','650 / 433'],['m5-pregnancy-walking','m5-21','612 / 408'],
    ['m5-napping','m5-10','320 / 199'],['m5-stress-and-sleep','m5-19','520 / 357'],['m5-pregnancy-pillow','m5-20','1080 / 1080'],
  ];
  for(const [id,lessonId,ratio] of expected){const line=registry.split('\n').find(candidate=>candidate.includes(`id: '${id}'`));assert.ok(line,`${id} missing`);assert.match(line,new RegExp(`lessonIds: \\['${lessonId}'\\]`));assert.ok(line.includes(`aspectRatio: ${ratio}`));assert.ok(line.includes("licenseStatus: 'unknown/user-provided'"));assert.ok(line.includes('displayOnSourceRecovered: true'));assert.match(line,/altText: \{ en: '.+', es: '.+' \}/);}
  assert.equal(registry.includes("lessonIds: ['m5-18']"),false);
  assert.equal(existsSync(join(root,'assets','curriculum','module-5','m5-18-nutrition-circle.png')),true);
});

test('Module 7 intimacy images map to steps 2, 5, and 6 with exact dimensions', () => {
  const expected = [
    ['m7-02-intimacy-connection', 'm7-02', '533 / 375'],
    ['m7-05-intimacy-pap-sleep', 'm7-05', '1280 / 720'],
    ['m7-06-intimacy-shared-sleep', 'm7-06', '554 / 361'],
  ];
  for (const [id, lessonId, ratio] of expected) {
    const line = registry.split('\n').find((candidate) => candidate.includes(`id: '${id}'`));
    assert.ok(line, `${id} missing`);
    assert.match(line, new RegExp(`lessonIds: \\['${lessonId}'\\]`));
    assert.ok(line.includes(`aspectRatio: ${ratio}`));
    assert.ok(line.includes("attribution: 'User-provided image'"));
    assert.ok(line.includes("licenseStatus: 'unknown/user-provided'"));
    assert.ok(line.includes('displayOnSourceRecovered: true'));
  }
});

test('Module 8 PAP images map one-to-one to the requested lesson steps', () => {
  const expected = [
    ['m8-01-getting-started', 'm8-01', '1280 / 721'],
    ['m8-02-comfortable-mask', 'm8-02', '547 / 365'],
    ['m8-03-practice-awake', 'm8-03', '1'],
    ['m8-04-practice-resting', 'm8-04', '713 / 429'],
    ['m8-05-bedtime-routine', 'm8-05', '1'],
    ['m8-06-build-whole-night', 'm8-06', '480 / 320'],
    ['m8-07-pap-helping', 'm8-07', '1600 / 1067'],
    ['m8-08-pap-uncomfortable', 'm8-08', '282 / 179'],
    ['m8-10-settings-chart', 'm8-10', '800 / 323'],
  ];
  for (const [id, lessonId, ratio] of expected) {
    const line = registry.split('\n').find((candidate) => candidate.includes(`id: '${id}'`));
    assert.ok(line, `${id} missing`);
    assert.match(line, new RegExp(`lessonIds: \\['${lessonId}'\\]`));
    assert.ok(line.includes(`aspectRatio: ${ratio}`));
    assert.ok(line.includes("licenseStatus: 'unknown/user-provided'"));
    assert.ok(line.includes('displayOnSourceRecovered: true'));
    assert.match(line, /altText: \{ en: '.+', es: '.+' \}/);
  }
  assert.equal(registry.includes("lessonIds: ['m8-09']"), false);
  assert.equal(registry.includes("lessonIds: ['m8-q1']"), false);
  assert.equal(registry.includes("lessonIds: ['m8-q2']"), false);
});

test('Module 9 troubleshooting PAP images map one-to-one to the requested lesson steps', () => {
  const expected = [
    ['m9-02-mask-adjustment', 'm9-02', '600 / 400'],
    ['m9-03-mask-leak-illustration', 'm9-03', '1468 / 560'],
    ['m9-04-water-in-mask', 'm9-04', '1'],
    ['m9-05-skin-irritation', 'm9-05', '678 / 615'],
    ['m9-06-pap-sleep', 'm9-06', '576 / 347'],
    ['m9-07-mouth-open', 'm9-07', '678 / 452'],
    ['m9-08-congestion', 'm9-08', '399 / 300'],
    ['m9-09-sleep-bloating', 'm9-09', '547 / 365'],
    ['m9-10-cpap-device', 'm9-10', '447 / 447'],
    ['m9-11-clean-mask', 'm9-11', '597 / 335'],
  ];
  for (const [id, lessonId, ratio] of expected) {
    const line = registry.split('\n').find((candidate) => candidate.includes(`id: '${id}'`));
    assert.ok(line, `${id} missing`);
    assert.match(line, new RegExp(`lessonIds: \\['${lessonId}'\\]`));
    assert.ok(line.includes(`aspectRatio: ${ratio}`));
    assert.ok(line.includes("licenseStatus: 'unknown/user-provided'"));
    assert.ok(line.includes('displayOnSourceRecovered: true'));
    assert.match(line, /altText: \{ en: '.+', es: '.+' \}/);
  }
  for (const removedLessonId of ['m9-12', 'm9-13', 'm9-14']) assert.equal(registry.includes(`lessonIds: ['${removedLessonId}']`), false);
});

test('every registry entry has bilingual alt classification and attribution', () => {
  assert.equal(entries.length, assetPaths.length);
  for (const [, id, en, es, decorative, attribution] of entries) {
    assert.ok(en.trim().length > 3, `${id} missing English alt`);
    assert.ok(es.trim().length > 3, `${id} missing Spanish alt`);
    assert.match(decorative, /^(true|false)$/);
    assert.match(attribution, /(OpenMoji|Wikimedia Commons|user-provided)/i);
  }
});

test('license registry documents every asset id and accepted licenses', () => {
  const doc = readFileSync(join(root, 'docs', 'IMAGE_SOURCE_REGISTRY.md'), 'utf8');
  for (const [, id, , , , attribution] of entries) if (!/user-provided/i.test(attribution)) assert.ok(doc.includes(`| ${id} |`), `${id} absent from source registry`);
  assert.match(doc, /CC BY-SA 4\.0/);
  assert.match(doc, /Public domain/);
});

test('motion system includes reduced-motion handling', () => {
  const hook = readFileSync(join(root, 'src', 'hooks', 'useReducedMotion.ts'), 'utf8');
  const ui = readFileSync(join(root, 'src', 'components', 'ui.tsx'), 'utf8');
  assert.match(hook, /isReduceMotionEnabled/);
  assert.match(ui, /reducedMotion/);
});
