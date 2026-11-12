import assert from 'node:assert/strict';
import { it } from 'node:test';
import { englishModules } from '../src/content/en';
import { buildTranslationUnits } from '../scripts/export-translation-source';

it('exports every translatable field once, in order, with the answer key only where one exists', () => {
  const units = buildTranslationUnits();
  assert.equal(new Set(units.map((unit) => unit.unitId)).size, units.length);
  assert.ok(units.every((unit) => unit.source.trim() && unit.target === '' && unit.status === 'missing'));
  for (const module of englishModules) {
    for (const screen of module.screens) {
      if (!('choices' in screen)) continue;
      const choiceUnits = units.filter((unit) => unit.screenId === screen.id && unit.field.startsWith('choices['));
      assert.deepEqual(choiceUnits.map((unit) => unit.source), screen.choices.map((choice) => choice.label), `${screen.id} choice order`);
      const keyed = choiceUnits.filter((unit) => unit.isKeyedAnswer === true).length;
      const expected = screen.type === 'singleChoice' ? (screen.correctChoiceId ? 1 : 0) : screen.type === 'multiSelect' ? (screen.correctChoiceIds?.length ?? 0) : 0;
      assert.equal(keyed, expected, `${screen.id} keyed answers`);
      if (!expected) assert.ok(choiceUnits.every((unit) => unit.isKeyedAnswer === undefined), `${screen.id} must not invent an answer key`);
    }
  }
});
