import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { englishModules } from '../src/content/en';
import { spanishModules } from '../src/content/es';

const moduleById = (modules: typeof englishModules, id: string) => {
  const module = modules.find((candidate) => candidate.id === id);
  assert.ok(module, `Missing ${id}`);
  return module;
};

test('PAP modules retain CIAS and clinical supplement source IDs in both languages', () => {
  const expectedSourceIds = ['cias-ez-pap-document', 'ats-pap-overview', 'ats-pap-troubleshooting', 'ats-pap-care-cleaning'];
  for (const modules of [englishModules, spanishModules]) {
    for (const id of ['m8', 'm9']) {
      const module = moduleById(modules, id);
      for (const screen of module.screens) assert.deepEqual(screen.sourceIds, expectedSourceIds);
    }
  }
});

test('PAP modules have required screen counts, knowledge-check spacing, and safety exclusions', () => {
  const m8 = moduleById(englishModules, 'm8'); const m9 = moduleById(englishModules, 'm9');
  assert.equal(m8.screens.length, 12); assert.deepEqual(m8.screens.filter((screen) => screen.type === 'singleChoice').map((screen) => screen.id), ['m8-q1', 'm8-q2']);
  assert.equal(m9.screens.length, 14); assert.deepEqual(m9.screens.filter((screen) => screen.type === 'singleChoice').map((screen) => screen.id), ['m9-q1', 'm9-q2', 'm9-q3']);
  assert.deepEqual(m9.screens.filter((screen) => screen.type === 'content').map((screen) => screen.id), ['m9-01', 'm9-02', 'm9-03', 'm9-04', 'm9-05', 'm9-06', 'm9-07', 'm9-08', 'm9-09', 'm9-10', 'm9-11']);
  assert.doesNotMatch(JSON.stringify(m9), /Traveling with PAP|Flying with PAP/);
  const text = JSON.stringify([m8, m9]);
  for (const forbidden of ['less than 30 minutes', 'mouth tap', 'insurance', 'rental', 'machine on the floor']) assert.doesNotMatch(text.toLowerCase(), new RegExp(forbidden));
});

test('PAP modules preserve EN/ES screen and choice parity', () => {
  for (const id of ['m8', 'm9']) {
    const english = moduleById(englishModules, id);
    const spanish = moduleById(spanishModules, id);
    assert.deepEqual(spanish.screens.map((screen) => screen.id), english.screens.map((screen) => screen.id));
    for (const [index, screen] of english.screens.entries()) {
      const translated = spanish.screens[index];
      if (screen.type === 'multiSelect' || screen.type === 'singleChoice') {
        assert.equal(translated.type, screen.type);
        if (translated.type === 'multiSelect' || translated.type === 'singleChoice') assert.equal(translated.choices.length, screen.choices.length);
      }
    }
  }
});

test('PAP content screens include expanded teaching and takeaways', () => {
  for (const modules of [englishModules, spanishModules]) {
    for (const id of ['m8', 'm9']) {
      const module = moduleById(modules, id);
      const contentScreens = module.screens.filter((screen) => screen.type === 'content');
      assert.ok(contentScreens.every((screen) => screen.paragraphs.length >= 2), `${id} has a short content screen`);
      assert.ok(contentScreens.every((screen) => (screen.keyPoints?.length ?? 0) >= 2), `${id} is missing practical takeaways`);
    }
  }
});

test('home module titles use the heading font token', () => {
  const source = readFileSync('app/(tabs)/index.tsx', 'utf8');
  assert.match(source, /moduleTitle:\s*\{[^}]*fontFamily:\s*fontFamily\.heading/s);
});
