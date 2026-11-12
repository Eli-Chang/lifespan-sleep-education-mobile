import assert from 'node:assert/strict';
import { it } from 'node:test';
import { englishModules } from '../src/content/en';
import { spanishModules } from '../src/content/es';
import { isBoilerplateQuestionCopy } from '../src/utils/question-copy';

it('hides the same boilerplate question titles in Spanish as in English', () => {
  for (const title of ['Knowledge check', 'Comprehension check 6: sunlight', 'True or False? (This question is for learning, not a comprehension check)']) assert.equal(isBoilerplateQuestionCopy(title), true, title);
  for (const title of ['Comprobación de conocimientos 6: la importancia de la luz solar', 'Comprobación de conocimientos', 'Seleccione la respuesta correcta: (Esta pregunta es para aprender, no es una comprobación de conocimientos)', '¿Verdadero o falso?']) assert.equal(isBoilerplateQuestionCopy(title), true, title);
  for (const title of ['What Happens During an Obstructive Event?', '¿Qué es la diabetes gestacional?']) assert.equal(isBoilerplateQuestionCopy(title), false, title);
  // Parity: a question title is hidden in Spanish exactly when it is hidden in English.
  const es = new Map(spanishModules.flatMap((module) => module.screens).map((screen) => [screen.id, screen]));
  for (const screen of englishModules.flatMap((module) => module.screens)) {
    if (screen.type !== 'singleChoice' && screen.type !== 'multiSelect') continue;
    assert.equal(isBoilerplateQuestionCopy(es.get(screen.id)!.title), isBoilerplateQuestionCopy(screen.title), `${screen.id} title visibility differs by language`);
  }
});

it('narrates the statement a true-or-false question asks about', () => {
  const screens = englishModules.flatMap((module) => module.screens);
  for (const id of ['m2-q1', 'm3-q1']) {
    const screen = screens.find((candidate) => candidate.id === id);
    assert.ok(screen && (screen.type === 'singleChoice' || screen.type === 'multiSelect') && screen.contextParagraphs?.length, `${id} has a statement`);
    for (const paragraph of screen.contextParagraphs ?? []) assert.ok(screen.narrationText?.includes(paragraph), `${id} narration includes its statement`);
  }
});
