import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { englishModules } from '../src/content/en';
import { spanishModules } from '../src/content/es';
import { getModules, learnerSelectableLocales, modulesByLocale } from '../src/content';
import { localeContentGaps, looksUntranslated } from '../src/content/locale-completeness';
import { CLINICAL_APPROVALS, LINGUISTIC_APPROVALS, reviewRegisterProblems } from '../src/content/review-register';
import { localeScreenStatuses, translationStatusReport } from '../src/content/translation-status';
import { draftSpanishModule } from '../src/content/es/localize';
import { LOCALE_DEFINITIONS, LANGUAGE_VARIETY_DECISIONS, SOURCE_LOCALE, SUPPORTED_LOCALES, isSupportedLocale, type SupportedLocale } from '../src/i18n/locales';
import { UI_KEYS, UI_STRINGS } from '../src/i18n/strings';
import { sanitizeLearningState } from '../src/state/learning-persistence';
import { splitNarration } from '../src/services/narration-text';
import type { EducationModule } from '../src/types/content';

const placeholders = (value: string) => [...value.matchAll(/\{\{(\w+)\}\}/g)].map((match) => match[1]).sort();

describe('locale registry', () => {
  it('ships exactly English, Spanish, Brazilian Portuguese, and Haitian Creole, with English as the source', () => {
    assert.deepEqual([...SUPPORTED_LOCALES], ['en', 'es', 'pt-BR', 'ht']);
    assert.equal(SOURCE_LOCALE, 'en');
    for (const locale of SUPPORTED_LOCALES) {
      const definition = LOCALE_DEFINITIONS[locale];
      assert.equal(definition.code, locale);
      assert.match(definition.bcp47, /^[a-z]{2,3}(-[A-Z]{2})?$/);
      assert.ok(definition.nativeName.trim());
      assert.ok(definition.narration.languagePrefix.trim());
      assert.equal(definition.clinicalReview, 'not_reviewed', `${locale} must not claim clinical approval`);
    }
    assert.equal(LOCALE_DEFINITIONS.en.linguisticReview, 'source_language');
    for (const locale of ['es', 'pt-BR', 'ht'] as const) assert.equal(LOCALE_DEFINITIONS[locale].linguisticReview, 'draft_awaiting_native_review');
  });

  it('shows specific language names and records the two varieties as unconfirmed working assumptions', () => {
    assert.equal(LOCALE_DEFINITIONS['pt-BR'].englishName, 'Portuguese (Brazil)');
    assert.equal(LOCALE_DEFINITIONS.ht.englishName, 'Haitian Creole');
    for (const locale of SUPPORTED_LOCALES) assert.notEqual(LOCALE_DEFINITIONS[locale].nativeName.trim().toLowerCase(), 'creole');
    assert.equal(LOCALE_DEFINITIONS['pt-BR'].varietyStatus, 'working_assumption');
    assert.equal(LOCALE_DEFINITIONS.ht.varietyStatus, 'working_assumption');
    assert.equal(LOCALE_DEFINITIONS['pt-BR'].translationMethod, 'ai_draft_claude');
    assert.deepEqual(LANGUAGE_VARIETY_DECISIONS.map((decision) => [decision.requestedAs, decision.implementedAs, decision.status]), [['Portuguese', 'pt-BR', 'working_assumption'], ['Creole', 'ht', 'working_assumption']]);
  });

});

describe('interface strings', () => {
  it('define every key in every locale with the same placeholders', () => {
    for (const locale of SUPPORTED_LOCALES) {
      assert.deepEqual(Object.keys(UI_STRINGS[locale]).sort(), [...UI_KEYS].sort(), `${locale} key set`);
      for (const key of UI_KEYS) {
        assert.ok(UI_STRINGS[locale][key].trim(), `${locale}.${key} is empty`);
        assert.deepEqual(placeholders(UI_STRINGS[locale][key]), placeholders(UI_STRINGS.en[key]), `${locale}.${key} placeholders`);
      }
    }
  });

  it('translate every multi-word interface string', () => {
    for (const locale of SUPPORTED_LOCALES.filter((code) => code !== SOURCE_LOCALE)) {
      const untranslated = UI_KEYS.filter((key) => looksUntranslated(UI_STRINGS.en[key], UI_STRINGS[locale][key]));
      assert.deepEqual(untranslated, [], `${locale} has English interface text`);
    }
  });

  it('say plainly that Spanish is an unreviewed draft and nothing is clinically approved', () => {
    assert.match(UI_STRINGS.es.languageStatusNote, /borrador/);
    assert.match(UI_STRINGS.es.translationStatusBody, /borrador/);
    for (const locale of ['pt-BR', 'ht'] as const) {
      assert.match(UI_STRINGS[locale].languageStatusNote, /Claude/, `${locale} says an AI model drafted it`);
      assert.match(UI_STRINGS[locale].translationStatusBody, /Claude/, `${locale} about-page note`);
    }
    assert.match(UI_STRINGS.en.contentStatusBody, /not completed clinical review/);
    assert.match(UI_STRINGS.es.contentStatusBody, /no han completado la revisión clínica/);
    for (const locale of SUPPORTED_LOCALES) {
      for (const key of UI_KEYS) assert.doesNotMatch(UI_STRINGS[locale][key], /\b(approved|validated|aprobad[oa]s?|validad[oa]s?)\b/i, `${locale}.${key} must not claim approval`);
    }
  });
});

describe('locale content completeness', () => {
  it('bundles content for every supported locale and offers only complete ones', () => {
    for (const locale of SUPPORTED_LOCALES) assert.ok(modulesByLocale[locale]?.length, `${locale} content`);
    assert.deepEqual(learnerSelectableLocales, ['en', 'es', 'pt-BR', 'ht']);
    for (const locale of SUPPORTED_LOCALES.filter((code) => code !== SOURCE_LOCALE)) assert.deepEqual(localeContentGaps(englishModules, modulesByLocale[locale]), [], `${locale} gaps`);
  });

  it('has no silent fallback to another language', () => {
    assert.throws(() => getModules('pt' as SupportedLocale), /No bundled content/);
    assert.throws(() => getModules('ht-HT' as SupportedLocale), /No bundled content/);
    assert.equal(getModules('es'), spanishModules);
  });

  it('flags a partial, reordered, rekeyed, or untranslated locale', () => {
    const partial = structuredClone(spanishModules) as EducationModule[];
    partial[3].screens = partial[3].screens.slice(0, 4);
    assert.ok(localeContentGaps(englishModules, partial).some((gap) => gap.moduleId === 'm4' && /Expected 10 screens/.test(gap.problem)));

    const untranslated = structuredClone(spanishModules) as EducationModule[];
    untranslated[0].screens[0] = structuredClone(englishModules[0].screens[0]);
    assert.ok(localeContentGaps(englishModules, untranslated).some((gap) => gap.screenId === englishModules[0].screens[0].id && /identical to the source/.test(gap.problem)));

    const question = englishModules.flatMap((module) => module.screens).find((screen) => screen.type === 'multiSelect' && screen.correctChoiceIds?.length);
    assert.ok(question);
    const reordered = structuredClone(spanishModules) as EducationModule[];
    const target = reordered.flatMap((module) => module.screens).find((screen) => screen.id === question.id);
    assert.ok(target && target.type === 'multiSelect');
    target.choices.reverse();
    assert.ok(localeContentGaps(englishModules, reordered).some((gap) => gap.screenId === question.id && /Choice IDs or order/.test(gap.problem)));

    const rekeyed = structuredClone(spanishModules) as EducationModule[];
    const rekeyedTarget = rekeyed.flatMap((module) => module.screens).find((screen) => screen.id === question.id);
    assert.ok(rekeyedTarget && rekeyedTarget.type === 'multiSelect');
    rekeyedTarget.correctChoiceIds = [rekeyedTarget.choices[0].id];
    assert.ok(localeContentGaps(englishModules, rekeyed).some((gap) => gap.screenId === question.id && /Answer key differs/.test(gap.problem)));

    assert.deepEqual(localeContentGaps(englishModules, undefined).map((gap) => gap.problem), ['No content bundled for this locale.']);
  });

  it('stops the Spanish build instead of showing English when a draft string is missing', () => {
    const base = englishModules.find((module) => module.screens.some((screen) => screen.type === 'singleChoice' && !screen.sourceIds?.includes('cias-screenshot-recovery')));
    assert.ok(base);
    const screen = base.screens.find((candidate) => candidate.type === 'singleChoice' && !candidate.sourceIds?.includes('cias-screenshot-recovery'));
    assert.ok(screen && screen.type === 'singleChoice');
    const moduleWithOneScreen = { ...base, screens: [screen] };
    assert.throws(() => draftSpanishModule(moduleWithOneScreen, { title: 't', shortTitle: 's', description: 'd' }, { [screen.id]: { title: 'Pregunta', body: ['Solo el enunciado'] } }), /Missing Spanish choice text/);
  });
});

describe('saved language', () => {
  it('restores only languages that ship content', () => {
    assert.equal(sanitizeLearningState({ language: 'es' }).language, 'es');
    assert.equal(sanitizeLearningState({ language: 'pt' }).language, undefined);
    assert.equal(sanitizeLearningState({ language: 'pt-BR' }).language, 'pt-BR');
    assert.equal(sanitizeLearningState({ language: 'ht' }).language, 'ht');
    assert.equal(sanitizeLearningState({ language: 'fr' }).language, undefined);
  });
});

describe('translation status', () => {
  const report = translationStatusReport(modulesByLocale, learnerSelectableLocales);
  const total = englishModules.reduce((sum, module) => sum + module.screens.length, 0);

  it('reports English as source and every other language as an unapproved draft with unconfirmed varieties for Portuguese and Creole', () => {
    const byTarget = Object.fromEntries(report.map((row) => [row.target, row]));
    assert.equal(byTarget.en.counts.source, total);
    assert.equal(byTarget.es.counts.draft_awaiting_native_review, total);
    assert.equal(byTarget.es.counts.approved, 0);
    for (const id of ['pt-BR', 'ht']) {
      assert.equal(byTarget[id].decided, false, `${id} variety is not confirmed`);
      assert.equal(byTarget[id].learnerSelectable, true);
      assert.equal(byTarget[id].counts.draft_awaiting_native_review, total);
      assert.equal(byTarget[id].counts.approved, 0);
      assert.equal(byTarget[id].counts.missing, 0);
    }
    for (const row of report) assert.equal(row.clinicalReviewRequired, total, `${row.target} still needs clinical review`);
  });

  it('counts approval only from a complete review-register entry', () => {
    assert.deepEqual(LINGUISTIC_APPROVALS, []);
    assert.deepEqual(CLINICAL_APPROVALS, []);
    assert.deepEqual(reviewRegisterProblems(), []);
    const screenId = spanishModules[0].screens[0].id;
    const valid = [{ locale: 'es' as const, screens: [screenId], reviewerRole: 'qualified medical translator' as const, date: '2027-01-15', evidence: 'review-record-001' }];
    assert.equal(localeScreenStatuses(englishModules, spanishModules, 'es', valid).find((row) => row.screenId === screenId)?.state, 'approved');
    const undated = [{ ...valid[0], date: 'soon' }];
    assert.equal(localeScreenStatuses(englishModules, spanishModules, 'es', undated).find((row) => row.screenId === screenId)?.state, 'draft_awaiting_native_review');
    assert.ok(reviewRegisterProblems([], [{ moduleId: 'm4', locale: 'en', reviewerRole: 'qualified medical translator', date: '2027-01-15', evidence: 'x' }]).length > 0);
    assert.ok(reviewRegisterProblems([{ ...valid[0], reviewerRole: 'study PI' }], []).length > 0);
  });
});

describe('narration text', () => {
  it('keeps closing quotes with their sentence', () => {
    const chunks = splitNarration('She said “wait.” Then she slept.', 10);
    assert.deepEqual(chunks, ['She said “wait.”', 'Then she slept.']);
    assert.ok(!chunks.some((chunk) => /^[”’"]/.test(chunk)));
  });
});
