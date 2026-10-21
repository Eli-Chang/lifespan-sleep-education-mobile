import assert from 'node:assert/strict';
import { test } from 'node:test';
import { englishModules } from '../src/content/en';
import { spanishModules } from '../src/content/es';
import { CURRICULUM_VERSION, migrateLearningState } from '../src/state/curriculum-migration';

test('the active bilingual curriculum contains no legacy AI screen IDs', () => {
  for (const modules of [englishModules, spanishModules]) {
    assert.equal(modules.flatMap((module) => module.screens).some((screen) => /-ai\d+$/.test(screen.id)), false);
  }
});

test('the legacy sanitizer drops AI state and redirects removed last screens', () => {
  const migrated = migrateLearningState({
    curriculumVersion: 7,
    completedScreenIds: ['m1-01', 'm3-ai1'],
    lastScreenByModule: { m3: 'm3-ai2' },
    answers: { 'm3-ai1': ['old'], 'm1-01': ['c1'] },
    answerAttempts: { 'm3-ai2': [], 'm1-01': [] },
    reflectionDrafts: { 'm3-ai1': 'old' },
    savedReflections: { 'm3-ai2': { text: 'old', savedAt: 'test' } },
    lessonChats: { old: { draft: 'old' } },
    pendingVelaActivity: { learnerText: 'old' },
    aiConsent: true,
    aiEnabled: true,
    velaConversationRevision: 3,
    actionPlans: [{ id: 'm3-ai2', text: 'old', createdAt: 'test' }],
  });
  assert.equal(migrated.curriculumVersion, CURRICULUM_VERSION);
  assert.deepEqual(migrated.completedScreenIds, ['m1-01']);
  assert.equal(migrated.lastScreenByModule?.m3, 'm3-recap');
  assert.deepEqual(migrated.answers, { 'm1-01': ['c1'] });
  for (const key of ['lessonChats', 'pendingVelaActivity', 'aiConsent', 'aiEnabled', 'velaConversationRevision', 'actionPlans']) assert.equal(key in migrated, false);
  assert.deepEqual(migrateLearningState(migrated), migrated);
});

test('pre-version-11 PAP module state is removed while Modules 1-7 remain intact', () => {
  const migrated = migrateLearningState({
    curriculumVersion: 10,
    completedScreenIds: ['m1-01', 'm8-01', 'm9-q1', 'm10-01'],
    completedModuleIds: ['m1', 'm8', 'm9', 'm10'],
    currentModuleId: 'm9',
    lastScreenByModule: { m1: 'm1-01', m8: 'm8-01', m9: 'm9-q1', m10: 'm10-01' },
    answers: { 'm1-01': ['c1'], 'm8-01': ['old'], 'm9-q1': ['old'], 'm10-01': ['old'] },
    answerAttempts: { 'm1-01': [], 'm8-01': [], 'm9-q1': [], 'm10-01': [] },
    reflectionDrafts: { 'm8-01': 'old' },
    savedReflections: { 'm9-q1': { text: 'old', savedAt: 'test' } },
  });
  assert.deepEqual(migrated.completedScreenIds, ['m1-01']);
  assert.deepEqual(migrated.completedModuleIds, ['m1']);
  assert.equal(migrated.currentModuleId, undefined);
  assert.deepEqual(migrated.lastScreenByModule, { m1: 'm1-01' });
  assert.deepEqual(migrated.answers, { 'm1-01': ['c1'] });
  assert.deepEqual(migrated.answerAttempts, { 'm1-01': [] });
  assert.deepEqual(migrated.reflectionDrafts, {});
  assert.deepEqual(migrated.savedReflections, {});
});

const SLEEP_HYGIENE_ORDER = ['m5-01','m5-02','m5-03','m5-q5','m5-q6','m5-04','m5-13','m5-05','m5-q7','m5-11','m5-q1','m5-14','m5-q9','m5-q4','m5-06','m5-15','m5-16','m5-17','m5-07','m5-q3','m5-q2','m5-08','m5-18','m5-q11','m5-q8','m5-21','m5-10','m5-19','m5-20','m5-q10','m5-recap'];
const PART_ONE = SLEEP_HYGIENE_ORDER.slice(0, SLEEP_HYGIENE_ORDER.indexOf('m5-06'));
const PART_TWO = SLEEP_HYGIENE_ORDER.slice(SLEEP_HYGIENE_ORDER.indexOf('m5-06'));

test('Healthy Sleep Hygiene is two modules that together keep all 31 screens in their original order', () => {
  for (const modules of [englishModules, spanishModules]) {
    const m5 = modules.find((module) => module.id === 'm5');
    const m5b = modules.find((module) => module.id === 'm5b');
    assert.ok(m5 && m5b);
    assert.deepEqual(m5.screens.map((screen) => screen.id), PART_ONE);
    assert.deepEqual(m5b.screens.map((screen) => screen.id), PART_TWO);
    assert.deepEqual(modules.map((module) => module.order), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    assert.deepEqual(modules.map((module) => module.id), ['m1', 'm2', 'm3', 'm4', 'm5', 'm5b', 'm6', 'm7', 'm8', 'm9']);
  }
});

test('a finished nine-module sleep hygiene module migrates to both parts complete with answers on the same questions', () => {
  const answers = { 'm5-q5': ['c2', 'c5', 'c6'], 'm5-q2': ['c1'], 'm5-q10': ['c3'] };
  const input = {
    curriculumVersion: 11,
    completedScreenIds: ['m1-01', ...SLEEP_HYGIENE_ORDER, 'm8-01'],
    completedModuleIds: ['m1', 'm5', 'm8'],
    currentModuleId: 'm5',
    lastScreenByModule: { m1: 'm1-01', m5: 'm5-recap', m8: 'm8-01' },
    answers,
    answerAttempts: { 'm5-q5': [{ answers: ['c2', 'c5', 'c6'], correct: true, submittedAt: 'test' }] },
  };
  const migrated = migrateLearningState(input);
  assert.equal(migrated.curriculumVersion, 12);
  assert.deepEqual(migrated.completedModuleIds, ['m1', 'm5', 'm5b', 'm8']);
  assert.equal(migrated.currentModuleId, 'm5b');
  assert.deepEqual(migrated.lastScreenByModule, { m1: 'm1-01', m5: 'm5-q4', m5b: 'm5-recap', m8: 'm8-01' });
  assert.deepEqual(migrated.answers, answers);
  assert.deepEqual(migrated.completedScreenIds, input.completedScreenIds);
  for (const id of Object.keys(answers)) {
    const owners = englishModules.filter((module) => module.screens.some((screen) => screen.id === id));
    assert.equal(owners.length, 1, `${id} must belong to exactly one module`);
  }
  assert.deepEqual(migrateLearningState(migrated), migrated);
});

test('partial sleep hygiene progress completes Part 1 only when every Part 1 screen was done', () => {
  const migrated = migrateLearningState({
    curriculumVersion: 11,
    completedScreenIds: [...PART_ONE, 'm5-06', 'm5-15'],
    completedModuleIds: ['m1'],
    currentModuleId: 'm5',
    lastScreenByModule: { m5: 'm5-16' },
  });
  assert.deepEqual(migrated.completedModuleIds, ['m1', 'm5']);
  assert.equal(migrated.currentModuleId, 'm5b');
  assert.deepEqual(migrated.lastScreenByModule, { m5: 'm5-q4', m5b: 'm5-16' });
});

test('a Part 2 position with a gap in Part 1 never marks Part 1 complete', () => {
  const migrated = migrateLearningState({
    curriculumVersion: 11,
    completedScreenIds: PART_ONE.filter((id) => id !== 'm5-13').concat(['m5-06']),
    completedModuleIds: [],
    currentModuleId: 'm5',
    lastScreenByModule: { m5: 'm5-15' },
  });
  assert.deepEqual(migrated.completedModuleIds, []);
  assert.deepEqual(migrated.lastScreenByModule, { m5b: 'm5-15' });
  assert.equal(migrated.currentModuleId, 'm5b');
});

test('progress inside Part 1 is left in place', () => {
  const input = { curriculumVersion: 11, completedScreenIds: ['m5-01', 'm5-02'], completedModuleIds: [], currentModuleId: 'm5', lastScreenByModule: { m5: 'm5-03' } };
  const migrated = migrateLearningState(input);
  assert.deepEqual(migrated.completedModuleIds, []);
  assert.deepEqual(migrated.lastScreenByModule, { m5: 'm5-03' });
  assert.equal(migrated.currentModuleId, 'm5');
});

test('version 12 state is not re-split, and version 11 PAP progress is kept', () => {
  const current = { curriculumVersion: 12, completedScreenIds: PART_ONE, completedModuleIds: ['m5'], currentModuleId: 'm5', lastScreenByModule: { m5: 'm5-q4' } };
  assert.deepEqual(migrateLearningState(current).completedModuleIds, ['m5']);
  const papUser = migrateLearningState({ curriculumVersion: 11, completedScreenIds: ['m8-01', 'm9-q1'], completedModuleIds: ['m8'], currentModuleId: 'm9', lastScreenByModule: { m9: 'm9-q1' }, answers: { 'm9-q1': ['c2'] } });
  assert.deepEqual(papUser.completedScreenIds, ['m8-01', 'm9-q1']);
  assert.deepEqual(papUser.completedModuleIds, ['m8']);
  assert.equal(papUser.currentModuleId, 'm9');
  assert.deepEqual(papUser.answers, { 'm9-q1': ['c2'] });
});

test('legacy pre-version-11 sleep hygiene screen IDs map into the split modules', () => {
  const migrated = migrateLearningState({
    curriculumVersion: 10,
    completedScreenIds: ['m5-s01', 'm5-s14'],
    completedModuleIds: [],
    lastScreenByModule: { m5: 'm5-s15' },
    answers: { 'm5-s20': ['c1'] },
  });
  assert.deepEqual(migrated.completedScreenIds, ['m5-01', 'm5-06']);
  assert.deepEqual(migrated.answers, { 'm5-q2': ['c1'] });
  assert.deepEqual(migrated.lastScreenByModule, { m5b: 'm5-15' });
});
