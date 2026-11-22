import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { englishModules } from '../src/content/en';
import { REVIEW_ITEMS, answerKeyInfo, exactScreenText, findScreen, keylessObjectiveQuestions, splitHighlights } from '../src/qa/curriculum-review';

describe('English Curriculum Review (development-only)', () => {
  it('has the six items in order and every referenced screen exists in the English curriculum', () => {
    assert.deepEqual(REVIEW_ITEMS.map((item) => item.number), [1, 2, 3, 4, 5, 6]);
    for (const item of REVIEW_ITEMS) for (const ref of item.screens) assert.ok(findScreen(englishModules, ref.screenId), `${ref.screenId} exists`);
  });

  it('every highlighted passage is an exact substring of the stored screen text, never a reconstruction', () => {
    for (const item of REVIEW_ITEMS) for (const highlight of item.highlights) {
      const screen = findScreen(englishModules, highlight.screenId)!.screen;
      const hit = exactScreenText(screen).some(([, text]) => text.includes(highlight.phrase));
      assert.ok(hit, `${item.number}: "${highlight.phrase}" must appear in ${highlight.screenId}`);
    }
  });

  it('splitting for highlights never alters the text', () => {
    for (const item of REVIEW_ITEMS) for (const screenRef of item.screens) {
      const phrases = item.highlights.filter((h) => h.screenId === screenRef.screenId).map((h) => h.phrase);
      for (const [, text] of exactScreenText(findScreen(englishModules, screenRef.screenId)!.screen)) {
        assert.equal(splitHighlights(text, phrases).map((part) => part.text).join(''), text);
      }
    }
  });

  it('reports m2-q1 and m2-q2 as graded with the keys read from the CIAS screen recording', () => {
    const expected: Record<string, string[]> = { 'm2-q1': ['c1'], 'm2-q2': ['c2', 'c4'] };
    for (const [id, key] of Object.entries(expected)) {
      const info = answerKeyInfo(findScreen(englishModules, id)!.screen);
      assert.equal(info.hasKey, true, `${id} has a stored key`);
      assert.equal(info.provenance, 'CIAS_SCREEN_RECORDING');
      assert.deepEqual(info.correctChoiceIds ?? (info.correctChoiceId ? [info.correctChoiceId] : []), key);
    }
    const keyless = keylessObjectiveQuestions(englishModules).map((info) => info.screenId);
    for (const id of Object.keys(expected)) assert.equal(keyless.includes(id), false);
  });

  it('m1-q1 is a graded true/false question: True is correct, with the key marked as a product-owner decision', () => {
    const info = answerKeyInfo(findScreen(englishModules, 'm1-q1')!.screen);
    assert.equal(info.hasKey, true);
    assert.equal(info.correctChoiceId, 'c1');
    assert.equal(info.provenance, 'PRODUCT_OWNER_ANSWER_KEY');
    assert.equal(info.behaviour, 'graded');
    assert.ok(!keylessObjectiveQuestions(englishModules).some((item) => item.screenId === 'm1-q1'));
  });

  it('is development-only: redirects in production and is not linked from any learner screen', () => {
    const route = readFileSync('app/qa/curriculum-review.tsx', 'utf8');
    assert.match(route, /export default __DEV__/);
    assert.match(route, /<Redirect href/);
    for (const file of ['app/(tabs)/index.tsx', 'app/(tabs)/settings.tsx', 'app/about.tsx', 'app/module/[id].tsx']) assert.doesNotMatch(readFileSync(file, 'utf8'), /curriculum-review/);
    const screenSource = readFileSync('src/qa/CurriculumReviewScreen.tsx', 'utf8');
    assert.doesNotMatch(screenSource, /completeScreen|saveAnswer|setLanguage|persistLearningState|AsyncStorage|localStorage/, 'the review screen never writes learner state');
  });
});
