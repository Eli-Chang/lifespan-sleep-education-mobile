import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { englishModules } from '../src/content/en';
import { modulesByLocale } from '../src/content';
import { learnerVisibleText } from '../src/content/locale-completeness';
import { SUPPORTED_LOCALES, SOURCE_LOCALE, LOCALE_DEFINITIONS } from '../src/i18n/locales';
import { UI_KEYS, UI_STRINGS } from '../src/i18n/strings';
import { ptBRCatalog } from '../src/content/translations/pt-BR';
import { htCatalog } from '../src/content/translations/ht';

const targets = SUPPORTED_LOCALES.filter((locale) => locale !== SOURCE_LOCALE);
const numbers = (text: string) => (text.match(/\d+(?:[.,]\d+)?/g) ?? []).map((value) => value.replace(',', '.')).sort();
// English writes "Type II diabetes" with a Roman numeral; translations may use an Arabic numeral.
const romanNumeralUnits = new Set(['m4-04::choices[2]']);
const keepTokens = ['PAP', 'CPAP', 'APAP', 'BiPAP', 'NHLBI', 'CIAS', 'ATS', 'cmH2O', 'AI'];
const allText = (modules: typeof englishModules) => modules.flatMap((module) => [
  [`${module.id}::module.title`, module.title], [`${module.id}::module.shortTitle`, module.shortTitle], [`${module.id}::module.description`, module.description],
  ...module.screens.flatMap((screen) => Object.entries(learnerVisibleText(screen)).filter(([field]) => field !== 'narrationText').map(([field, text]) => [`${screen.id}::${field}`, text])),
] as [string, string][]);

describe('four-language translation QA', () => {
  it('keeps exactly four configured languages', () => assert.deepEqual([...SUPPORTED_LOCALES], ['en', 'es', 'pt-BR', 'ht']));

  for (const locale of targets) {
    describe(locale, () => {
      const source = new Map(allText(englishModules));
      const target = new Map(allText(modulesByLocale[locale]));

      it('has identical modules, screens, types, choice IDs, answer keys, source IDs, and review flags', () => {
        const translated = modulesByLocale[locale];
        assert.deepEqual(translated.map((module) => module.id), englishModules.map((module) => module.id));
        assert.equal(translated.reduce((sum, module) => sum + module.screens.length, 0), 116);
        englishModules.forEach((module, moduleIndex) => module.screens.forEach((screen, screenIndex) => {
          const other = translated[moduleIndex].screens[screenIndex] as typeof screen;
          assert.equal(other.id, screen.id);
          assert.equal(other.type, screen.type);
          assert.deepEqual(other.sourceIds, screen.sourceIds, `${screen.id} sourceIds`);
          assert.equal(other.clinicalReviewStatus, screen.clinicalReviewStatus, `${screen.id} clinical review flag`);
          assert.equal(other.reviewReason, screen.reviewReason, `${screen.id} review reason`);
          if ('choices' in screen && 'choices' in other) assert.deepEqual(other.choices.map((c) => c.id), screen.choices.map((c) => c.id), `${screen.id} choices`);
          if ('correctChoiceId' in screen) assert.equal((other as typeof screen).correctChoiceId, screen.correctChoiceId, `${screen.id} key`);
          if ('correctChoiceIds' in screen) assert.deepEqual((other as typeof screen).correctChoiceIds, screen.correctChoiceIds, `${screen.id} keys`);
          if ('questionKind' in screen) assert.equal((other as typeof screen).questionKind, screen.questionKind, `${screen.id} graded or ungraded`);
          if ('questionFeedback' in screen && screen.questionFeedback?.optionExplanations) assert.deepEqual(Object.keys((other as typeof screen).questionFeedback?.optionExplanations ?? {}), Object.keys(screen.questionFeedback.optionExplanations));
        }));
      });

      it('translates every learner-visible field with no empty, invalid, or untranslated text', () => {
        assert.deepEqual([...target.keys()], [...source.keys()]);
        for (const [key, text] of target) {
          assert.ok(text.trim(), `${key} empty`);
          assert.doesNotMatch(text, /�/, `${key} has an invalid character`);
          assert.equal(text, text.normalize('NFC'), `${key} not NFC`);
          assert.doesNotMatch(text, /\{\{|<[a-z-]+>|undefined|\[object/i, `${key} has a placeholder or leak`);
        }
      });

      it('preserves numbers, bullets, line breaks, and protected abbreviations', () => {
        const problems: string[] = [];
        for (const [key, english] of source) {
          const text = target.get(key) ?? '';
          // Option letters and screen IDs are not text; a changed figure, bullet, or line break is a finding.
          if (!romanNumeralUnits.has(key) && numbers(english).join('|') !== numbers(text).join('|')) problems.push(`${key} numbers ${numbers(english)} vs ${numbers(text)}`);
          if ((english.match(/•/g) ?? []).length !== (text.match(/•/g) ?? []).length) problems.push(`${key} bullets`);
          if ((english.match(/\n/g) ?? []).length !== (text.match(/\n/g) ?? []).length) problems.push(`${key} line breaks`);
          for (const token of keepTokens) if (new RegExp(`\b${token}\b`).test(english) && !new RegExp(`\b${token}\b`).test(text)) problems.push(`${key} lost ${token}`);
        }
        assert.deepEqual(problems, []);
      });

      it('keeps PAP as air pressure and never as oxygen therapy', () => {
        const bad = [...target].filter(([key, text]) => /\bPAP\b/.test(source.get(key) ?? '') && /oxig[eê]n|oksij[eè]n/i.test(text) && !/oxygen/i.test(source.get(key) ?? ''));
        assert.deepEqual(bad.map(([key]) => key), []);
      });

      it('has interface strings for every key without untranslated English', () => {
        for (const key of UI_KEYS) assert.ok(UI_STRINGS[locale][key].trim(), `${locale}.${key}`);
      });
    });
  }

  it('has no catalog entries without an English source unit', () => {
    const keys = new Set(allText(englishModules).map(([key]) => key));
    for (const catalog of [ptBRCatalog.content, htCatalog.content]) for (const key of Object.keys(catalog)) assert.ok(keys.has(key), `${key} has no source`);
  });

  it('only treats a voice as compatible when its language matches the locale prefix (no French or English voice for Creole)', () => {
    const compatible = (voiceLanguage: string, locale: (typeof SUPPORTED_LOCALES)[number]) => voiceLanguage.toLowerCase().startsWith(LOCALE_DEFINITIONS[locale].narration.languagePrefix);
    assert.equal(compatible('ht-HT', 'ht'), true);
    for (const other of ['fr-FR', 'fr-HT', 'en-US', 'pt-BR', 'es-US']) assert.equal(compatible(other, 'ht'), false, `${other} must not narrate ht`);
    assert.equal(compatible('pt-BR', 'pt-BR'), true);
    for (const other of ['en-US', 'es-ES', 'fr-FR', 'ht-HT']) assert.equal(compatible(other, 'pt-BR'), false, `${other} must not narrate pt-BR`);
  });
});
