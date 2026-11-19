import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { englishModules } from '../src/content/en';
import { spanishModules } from '../src/content/es';
import type { LessonScreen } from '../src/types/content';

const manifest = JSON.parse(readFileSync('docs/CIAS-CONTENT-MIGRATION-MANIFEST.json', 'utf8')) as {
  records: Array<Record<string, any>>;
  app_only_supplemental: Array<Record<string, any>>;
};
const audit = JSON.parse(readFileSync('docs/CIAS-TO-SLEEP-APP-CONTENT-MAP.json', 'utf8')) as { records: Array<Record<string, any>>; app_only_screens: Array<Record<string, any>> };
const auditById = new Map(audit.records.map((record) => [record.cias_id, record]));
const screens = englishModules.flatMap((module) => module.screens);
const screenById = new Map(screens.map((screen) => [screen.id, screen]));
const spanishScreens = spanishModules.flatMap((module) => module.screens);
const spanishScreenById = new Map(spanishScreens.map((screen) => [screen.id, screen]));
// CIAS-app (screenshot-sourced) modules; Healthy Sleep Hygiene is now taught as m5 and m5b.
const historicalModuleIds = new Set(['m1', 'm2', 'm3', 'm4', 'm5', 'm5b', 'm6', 'm7']);
const historicalModules = englishModules.filter((module) => historicalModuleIds.has(module.id));
const sourceLabels: Record<string, string[]> = {
  'M1-S02': ['Typical breathing during sleep', 'Tongue', 'Hard palate', 'Soft palate', 'Open airway', 'Obstructive sleep apnea', 'Tongue', 'Blocked airway', '© MAYO FOUNDATION FOR MEDICAL EDUCATION AND RESEARCH. ALL RIGHTS RESERVED.'],
  'M3-S06': ['Consistent PAP treatment for sleep apnea', 'Well-controlled stress levels', 'Well-controlled stress hormones', 'Well-controlled blood pressure', 'Well-controlled blood sugar'],
  'M4-S09': ['Untreated sleep apnea', '↑stress levels,', '↑stress hormones', '↑blood pressure', 'Preeclampsia', 'Fetal growth restriction', 'Serious heart issues (heart disease, heart failure)', '↑insulin resistance', '↑blood sugar', 'gestational diabetes', 'Requiring C-section', 'Obesity, Type II Diabetes', 'Respiratory Distress Syndrome (difficulty breathing)', 'Excessive birth weight', 'Premature birth or stillbirth'],
};
const heldIds = new Set(['M1-S05', 'M1-S06', 'M5-S18', 'M5-S22', 'M5-S26', 'M5-S30']);
const productRemovedIds = new Set(['M1-S02']);
const restored = manifest.records.filter((record) => record.chosen_implementation_action !== 'HOLD_SOURCE_LIMITED' && !productRemovedIds.has(record.cias_id));
const productBodyOverrides: Record<string, string[]> = {
  'M1-S03': auditById.get('M1-S03')?.source_body_text.filter((line: string) => line !== 'Explore the video and graphic below and check out this handout!') ?? [],
};

for (const id of productRemovedIds) {
  const record = manifest.records.find((candidate) => candidate.cias_id === id);
  assert.ok(record, `${id} product-removal record exists`);
  assert.equal(screenById.has(record!.resulting_learner_screen_id), false, `${id} is removed from the active runtime`);
}

const typeFor = (record: Record<string, any>) => {
  if (record.cias_screen_type === 'single_select_question') return 'singleChoice';
  if (record.cias_screen_type === 'multi_select_question') return 'multiSelect';
  if (record.cias_screen_type === 'open_ended_reflection_summary') return 'reflection';
  return record.cias_screen_type === 'summary' ? 'summary' : 'content';
};

for (const manifestRecord of restored) {
  const record = auditById.get(manifestRecord.cias_id)!;
  const screen = screenById.get(manifestRecord.resulting_learner_screen_id);
  assert.ok(screen, `${manifestRecord.cias_id} must resolve to ${manifestRecord.resulting_learner_screen_id}`);
  assert.equal(screen!.type, typeFor(record), `${manifestRecord.cias_id} interaction type`);
  assert.equal(screen!.title, record.cias_heading, `${manifestRecord.cias_id} heading`);
  assert.ok(screen!.sourceScreenshotIds.includes(manifestRecord.source_screenshot_id), `${manifestRecord.cias_id} provenance`);
  if (screen!.type === 'content') {
    assert.deepEqual(screen!.paragraphs, productBodyOverrides[manifestRecord.cias_id] ?? record.source_body_text, `${manifestRecord.cias_id} body`);
    assert.deepEqual(screen!.sourceVisibleLabels ?? [], sourceLabels[manifestRecord.cias_id] ?? [], `${manifestRecord.cias_id} visible labels`);
  } else if (screen!.type === 'summary') {
    assert.deepEqual(screen!.keyPoints, record.source_body_text, `${manifestRecord.cias_id} summary`);
    assert.deepEqual(screen!.sourceVisibleLabels ?? [], sourceLabels[manifestRecord.cias_id] ?? [], `${manifestRecord.cias_id} summary labels`);
  } else if (screen!.type === 'singleChoice' || screen!.type === 'multiSelect') {
    assert.equal(screen!.prompt, record.source_question.stem, `${manifestRecord.cias_id} stem`);
    assert.equal(screen!.instructions ?? null, record.source_question.instructions ?? null, `${manifestRecord.cias_id} instructions`);
    assert.deepEqual(screen!.choices.map((choice) => choice.label), record.source_options, `${manifestRecord.cias_id} option order`);
    if (screen!.id === 'm1-q1') {
      // Product-owner decision 2026-11-19: the CIAS key was never recovered, so True (c1) is set as the key.
      assert.equal(screen!.answerBehaviorProvenance, 'PRODUCT_OWNER_ANSWER_KEY', `${manifestRecord.cias_id} answer provenance`);
      assert.equal(screen!.type === 'singleChoice' ? screen!.correctChoiceId : undefined, 'c1', `${manifestRecord.cias_id} product-owner answer key`);
    } else {
      assert.equal(screen!.answerBehaviorProvenance, 'CIAS_ANSWER_KEY_NOT_RECOVERED', `${manifestRecord.cias_id} answer provenance`);
      assert.equal(screen!.type === 'singleChoice' ? screen!.correctChoiceId : screen!.correctChoiceIds, undefined, `${manifestRecord.cias_id} no answer key`);
    }
  } else if (screen!.type === 'reflection') {
    const context = record.source_body_text.filter((line: string) => line !== record.source_question.stem && line !== record.source_question.instructions);
    assert.deepEqual(screen!.contextParagraphs, context, `${manifestRecord.cias_id} recap context`);
    assert.equal(screen!.prompt, record.source_question.stem, `${manifestRecord.cias_id} reflection prompt`);
    assert.equal(screen!.instructions, record.source_question.instructions, `${manifestRecord.cias_id} reflection instructions`);
  }
}

for (const id of heldIds) {
  const record = manifest.records.find((candidate) => candidate.cias_id === id)!;
  const sourceId = record.source_screenshot_id;
  assert.equal(screens.filter((screen) => screen.sourceScreenshotIds.includes(sourceId)).length, 0, `${id} must not be promoted`);
  if (record.resulting_learner_screen_id) {
    const current = screenById.get(record.resulting_learner_screen_id)!;
    assert.ok(!current.sourceIds?.includes('cias-screenshot-recovery'), `${id} current counterpart must stay non-CIAS`);
  }
}

function comparable(screen: LessonScreen): Record<string, unknown> {
  if (screen.type === 'content') return { id: screen.id, type: screen.type, title: screen.title, paragraphs: screen.paragraphs, keyPoints: screen.keyPoints ?? [], orderedList: screen.orderedList ?? [] };
  if (screen.type === 'summary') return { id: screen.id, type: screen.type, title: screen.title, keyPoints: screen.keyPoints };
  if (screen.type === 'reflection') return { id: screen.id, type: screen.type, title: screen.title, prompt: screen.prompt };
  return { id: screen.id, type: screen.type, title: screen.title, prompt: screen.prompt, choices: screen.choices.map((choice) => choice.label) };
}

for (const appOnly of manifest.app_only_supplemental) {
  const screen = screenById.get(appOnly.screen_id);
  assert.ok(screen, `${appOnly.screen_id} app-only screen is present`);
  const auditSnapshot = audit.app_only_screens.find((candidate) => candidate.screen_id === appOnly.screen_id)?.snapshot;
  assert.ok(auditSnapshot, `${appOnly.screen_id} app-only snapshot is available`);
  const expected = { ...auditSnapshot, choices: auditSnapshot.choices ?? undefined };
  assert.deepEqual(comparable(screen!), {
    id: expected.id,
    type: expected.type,
    title: expected.title,
    ...(expected.type === 'content' ? { paragraphs: expected.paragraphs, keyPoints: expected.keyPoints ?? [], orderedList: expected.orderedList ?? [] } : {}),
    ...(expected.type === 'summary' ? { keyPoints: expected.keyPoints } : {}),
    ...(['singleChoice', 'multiSelect'].includes(expected.type) ? { prompt: expected.prompt, choices: expected.choices } : {}),
  }, `${appOnly.screen_id} app-only content`);
}

assert.deepEqual(screens.map((screen) => [screen.id, screen.type]), spanishScreens.map((screen) => [screen.id, screen.type]), 'language route structure');
assert.deepEqual(englishModules.map((module) => [module.id, module.order]), spanishModules.map((module) => [module.id, module.order]), 'module order');
assert.deepEqual(englishModules.map((module) => module.screens.map((screen) => screen.id)), spanishModules.map((module) => module.screens.map((screen) => screen.id)), 'per-module screen order');
const restoredSpanish = screens.filter((screen) => screen.sourceIds?.includes('cias-screenshot-recovery'));
for (const english of restoredSpanish) {
  const spanish = spanishScreenById.get(english.id);
  assert.ok(spanish, `${english.id} translated Spanish screen exists`);
  assert.equal(spanish!.translationStatus, 'translated_from_approved_english', `${english.id} translation status`);
  assert.equal(spanish!.translationProvenance, 'approved-english-curriculum', `${english.id} translation provenance`);
  assert.deepEqual(spanish!.sourceScreenshotIds, english.sourceScreenshotIds, `${english.id} source provenance`);
  assert.deepEqual(spanish!.sourceIds, english.sourceIds, `${english.id} source content provenance`);
  assert.equal(spanish!.type, english.type, `${english.id} translated type`);
  if (english.type === 'content' && spanish!.type === 'content') {
    assert.equal(spanish!.paragraphs.length, english.paragraphs.length, `${english.id} paragraph count`);
    assert.notDeepEqual(spanish!.paragraphs, english.paragraphs, `${english.id} must not mechanically source English paragraphs`);
    assert.equal(spanish!.sourceVisibleLabels?.length ?? 0, english.sourceVisibleLabels?.length ?? 0, `${english.id} visible-label count`);
  } else if (english.type === 'summary' && spanish!.type === 'summary') {
    assert.equal(spanish!.keyPoints.length, english.keyPoints.length, `${english.id} summary count`);
    assert.notDeepEqual(spanish!.keyPoints, english.keyPoints, `${english.id} must not mechanically source English summary`);
    assert.equal(spanish!.sourceVisibleLabels?.length ?? 0, english.sourceVisibleLabels?.length ?? 0, `${english.id} summary-label count`);
  } else if ((english.type === 'singleChoice' || english.type === 'multiSelect') && (spanish!.type === 'singleChoice' || spanish!.type === 'multiSelect')) {
    assert.equal(spanish!.choices.length, english.choices.length, `${english.id} option count`);
    assert.deepEqual(spanish!.choices.map((choice) => choice.id), english.choices.map((choice) => choice.id), `${english.id} option positions`);
    assert.notDeepEqual(spanish!.choices.map((choice) => choice.label), english.choices.map((choice) => choice.label), `${english.id} must not mechanically source English options`);
    assert.notEqual(spanish!.prompt, english.prompt, `${english.id} must not mechanically source English prompt`);
    assert.equal(spanish!.instructions === undefined, english.instructions === undefined, `${english.id} instruction presence`);
    if (english.instructions) assert.notEqual(spanish!.instructions, english.instructions, `${english.id} must translate instructions`);
    assert.equal(spanish!.contextParagraphs?.length ?? 0, english.contextParagraphs?.length ?? 0, `${english.id} context count`);
    if (english.type === 'singleChoice' && spanish!.type === 'singleChoice') {
      assert.deepEqual(spanish!.correctChoiceId, english.correctChoiceId, `${english.id} single-choice answer behavior`);
    }
    if (english.type === 'multiSelect' && spanish!.type === 'multiSelect') {
      assert.deepEqual(spanish!.correctChoiceIds, english.correctChoiceIds, `${english.id} multi-choice answer behavior`);
    }
    assert.deepEqual(spanish!.questionFeedback, english.questionFeedback, `${english.id} feedback behavior`);
    assert.equal(spanish!.answerBehaviorProvenance, english.answerBehaviorProvenance, `${english.id} answer provenance`);
  } else if (english.type === 'reflection' && spanish!.type === 'reflection') {
    assert.notEqual(spanish!.prompt, english.prompt, `${english.id} must not mechanically source English reflection prompt`);
    assert.notEqual(spanish!.instructions, english.instructions, `${english.id} must translate reflection instructions`);
    assert.equal(spanish!.contextParagraphs?.length ?? 0, english.contextParagraphs?.length ?? 0, `${english.id} reflection context count`);
  }
}
assert.equal(screens.filter((screen) => screen.sourceIds?.includes('cias-screenshot-recovery')).length, 70, 'restored CIAS source count');
assert.equal(restoredSpanish.length, 70, 'restored CIAS translation count');
assert.equal(spanishScreens.filter((screen) => screen.translationStatus === 'temporary_english_fallback').length, 0, 'temporary Spanish fallback count');
assert.equal(spanishScreens.filter((screen) => screen.translationStatus === 'translated_from_approved_english').length, 70, 'translated CIAS screen count');
assert.equal(spanishScreens.filter((screen) => screen.translationProvenance === 'approved-english-curriculum').length, 70, 'Spanish translation provenance count');
assert.deepEqual(englishModules.map((module) => module.screens.length), [11, 10, 11, 13, 33, 14, 10], 'module screen counts');
assert.equal(manifest.app_only_supplemental.length, 28, 'app-only manifest count');
assert.equal(spanishModules.flatMap((module) => module.screens).filter((screen) => manifest.app_only_supplemental.some((entry) => entry.screen_id === screen.id)).length, 28, 'Spanish app-only screen count');
assert.equal(historicalModules.length, 7, 'historical module count');

console.log(JSON.stringify({
  status: 'PASS',
  restoredRecords: restored.length,
  heldRecords: heldIds.size,
  restoredQuestionsUnscored: screens.filter((screen) => screen.answerBehaviorProvenance === 'CIAS_ANSWER_KEY_NOT_RECOVERED').length,
  translatedCiasScreens: spanishScreens.filter((screen) => screen.translationStatus === 'translated_from_approved_english').length,
  temporaryFallbackScreens: spanishScreens.filter((screen) => screen.translationStatus === 'temporary_english_fallback').length,
  appOnlyScreensPresent: manifest.app_only_supplemental.length,
  englishScreenCount: screens.length,
  spanishScreenCount: spanishScreens.length,
  moduleScreenCounts: englishModules.map((module) => ({ id: module.id, count: module.screens.length })),
}, null, 2));
