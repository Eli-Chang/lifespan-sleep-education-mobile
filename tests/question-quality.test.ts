import assert from 'node:assert/strict';
import test from 'node:test';
import { module01 } from '@/src/content/en/modules/module-01';
import { getModules } from '@/src/content';
import { module08 } from '@/src/content/en/modules/module-08';
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

test('PAP module checks do not cue the correct answers by length', () => {
  // A correct option must never be the longest one, in any language.
  for (const locale of ['en', 'es', 'pt-BR', 'ht'] as const) {
    for (const module of getModules(locale).filter((item) => item.id === 'm8' || item.id === 'm9')) {
      for (const screen of module.screens) {
        if (screen.type !== 'multiSelect') continue;
        const longest = Math.max(...screen.choices.map((choice) => choice.label.length));
        for (const id of screen.correctChoiceIds ?? []) {
          const correctLength: number = screen.choices.find((choice) => choice.id === id)?.label.length ?? Infinity;
          assert.ok(correctLength < longest, `${locale} ${screen.id} ${id} is the longest option`);
        }
      }
    }
  }
  assert.deepEqual(questionQualityIssues(module08.screens), []);
  assert.deepEqual(questionQualityIssues(module09.screens), []);
  assert.deepEqual(questionQualityIssues(spanishModule09.screens), []);
});
