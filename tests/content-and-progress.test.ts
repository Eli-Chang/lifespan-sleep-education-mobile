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
