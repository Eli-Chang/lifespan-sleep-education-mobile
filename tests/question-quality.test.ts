import assert from 'node:assert/strict';
import test from 'node:test';
import { module01 } from '@/src/content/en/modules/module-01';
import { module09 } from '@/src/content/en/modules/module-09';
import { module09 as spanishModule09 } from '@/src/content/es/modules/module-09';
import { questionQualityIssues } from '@/src/utils/question-quality';

test('OSA objective questions pass lightweight quality checks', () => {
  assert.deepEqual(questionQualityIssues(module01.screens), []);
});

test('quality check detects duplicate options', () => {
  const screen = module01.screens.find((item) => item.id === 'm1-q1');
  assert.ok(screen && (screen.type === 'singleChoice' || screen.type === 'multiSelect'));
  const original = screen.choices;
  screen.choices = [{ id: 'c1', label: 'same' }, { id: 'c2', label: 'same' }, { id: 'c3', label: 'short' }, { id: 'c4', label: 'short' }];
  const issues = questionQualityIssues([screen]);
  screen.choices = original;
  assert.ok(issues.some((issue) => issue.issue === 'duplicate choices'));
});

test('Troubleshooting PAP checks do not cue the correct answer by length', () => {
  for (const [locale, module] of [['en', module09], ['es', spanishModule09]] as const) {
    for (const id of ['m9-q1', 'm9-q2', 'm9-q3']) {
      const screen = module.screens.find((item) => item.id === id);
      assert.ok(screen && screen.type === 'singleChoice');
      const correct = screen.choices.find((choice) => choice.id === screen.correctChoiceId);
      assert.ok(correct);
      const longest = Math.max(...screen.choices.map((choice) => choice.label.length));
      assert.ok(correct.label.length < longest, `${locale} ${id} correct option is still the longest`);
    }
  }
  assert.deepEqual(questionQualityIssues(module09.screens), []);
  assert.deepEqual(questionQualityIssues(spanishModule09.screens), []);
});
