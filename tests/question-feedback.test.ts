import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { modulesByLocale } from '../src/content';
import { QUESTION_FEEDBACK, QUESTION_KEYS } from '../src/content/question-feedback';
import { SUPPORTED_LOCALES } from '../src/i18n/locales';
import type { LessonScreen } from '../src/types/content';

const screensFor = (locale: (typeof SUPPORTED_LOCALES)[number]) => modulesByLocale[locale].flatMap((module) => module.screens.map((screen) => ({ moduleId: module.id, screen })));
const keyOf = (screen: LessonScreen) => screen.type === 'singleChoice' ? (screen.correctChoiceId ? [screen.correctChoiceId] : [])
  : screen.type === 'multiSelect' ? [...(screen.correctChoiceIds ?? [])] : [];

describe('check-your-understanding questions', () => {
  it('grade every question in Modules 1-7 that is not a personal reflection, with a note for every choice in every language', () => {
    for (const locale of SUPPORTED_LOCALES) {
      for (const { moduleId, screen } of screensFor(locale)) {
        if (screen.type !== 'singleChoice' && screen.type !== 'multiSelect') continue;
        if (['m8', 'm9'].includes(moduleId)) continue;
        if (['m1-r1', 'm2-r1', 'm7-r1'].includes(screen.id)) continue;
        assert.ok(QUESTION_KEYS[screen.id], `${screen.id} has an answer key entry`);
        assert.deepEqual(keyOf(screen), QUESTION_KEYS[screen.id].correct, `${locale} ${screen.id} key`);
        for (const choice of screen.choices) assert.ok(screen.questionFeedback?.optionExplanations?.[choice.id]?.trim(), `${locale} ${screen.id} ${choice.id} note`);
      }
    }
  });

  it('keep the three personal reflections ungraded', () => {
    for (const locale of SUPPORTED_LOCALES) {
      for (const { screen } of screensFor(locale).filter(({ screen }) => ['m1-r1', 'm2-r1', 'm7-r1'].includes(screen.id))) {
        assert.deepEqual(keyOf(screen), [], `${locale} ${screen.id} stays ungraded`);
      }
    }
  });

  it('keep the true/false statements for m2-q1 and m3-q1 above the question, with keys that match their wording', () => {
    const en = Object.fromEntries(screensFor('en').map(({ screen }) => [screen.id, screen]));
    const statement = (id: string) => { const screen = en[id]; return screen.type === 'singleChoice' ? (screen.contextParagraphs ?? []).join(' ') : ''; };
    assert.match(statement('m3-q1'), /co-morbid illnesses that increase their risk for cesarean births/);
    assert.match(statement('m2-q1'), /some couples also report increased relationship satisfaction/);
    // The approved m2-q1 wording is true, so True is the key; m3-q1 is true in the CIAS slides.
    assert.deepEqual(keyOf(en['m2-q1']), ['c1']);
    assert.deepEqual(keyOf(en['m3-q1']), ['c1']);
  });

  it('use the same keys and choice IDs in every language', () => {
    const english = Object.fromEntries(screensFor('en').map(({ screen }) => [screen.id, screen]));
    for (const locale of SUPPORTED_LOCALES) {
      for (const { screen } of screensFor(locale)) {
        if (!QUESTION_KEYS[screen.id] || (screen.type !== 'singleChoice' && screen.type !== 'multiSelect')) continue;
        const source = english[screen.id];
        assert.ok(source.type === screen.type);
        assert.deepEqual(screen.choices.map((choice) => choice.id), source.choices.map((choice) => choice.id));
        assert.deepEqual(keyOf(screen), keyOf(source));
      }
    }
  });

  it('keep every note to a sentence or two, with no em dashes and no leftover English in translations', () => {
    for (const locale of SUPPORTED_LOCALES) {
      for (const [id, entry] of Object.entries(QUESTION_FEEDBACK[locale])) {
        assert.ok(QUESTION_KEYS[id], `${locale} ${id} has a key`);
        for (const [choiceId, text] of Object.entries(entry.optionExplanations)) {
          assert.doesNotMatch(text, /—/, `${locale} ${id} ${choiceId} em dash`);
          assert.ok(text.length <= 260, `${locale} ${id} ${choiceId} is short (${text.length})`);
          if (locale !== 'en') assert.notEqual(text, QUESTION_FEEDBACK.en[id].optionExplanations[choiceId], `${locale} ${id} ${choiceId} is translated`);
        }
      }
    }
  });
});
