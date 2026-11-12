/**
 * Locale registry: the single place that says which languages the app ships, how each one is narrated,
 * and how far each one is through review. Application code iterates over this registry instead of
 * hard-coding language pairs, so adding a language means adding content, UI strings, and one entry here.
 *
 * Keep this file free of React, i18next, and Expo imports so Node tests can load it directly.
 */

/** Languages with complete bundled content. Order is the order shown to learners. */
export const SUPPORTED_LOCALES = ['en', 'es'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

/** The language every other locale is translated from. */
export const SOURCE_LOCALE: SupportedLocale = 'en';

/**
 * Linguistic review state for a whole locale.
 * - source_language: the authoring language; it is not a translation.
 * - draft_awaiting_native_review: complete translated text exists but no qualified reviewer has approved it.
 * - approved: a qualified reviewer approved it; requires an entry in src/content/review-register.ts.
 */
export type LinguisticReviewState = 'source_language' | 'draft_awaiting_native_review' | 'approved';

/**
 * Clinical review state for a locale's content. No locale, including English, has completed clinical
 * review; the app is a development build. Approval requires an entry in src/content/review-register.ts.
 */
export type ClinicalReviewState = 'not_reviewed' | 'approved';

export interface LocaleDefinition {
  code: SupportedLocale;
  /** BCP 47 tag used for the HTML lang attribute and for speech synthesis. */
  bcp47: string;
  /** Name shown in the language picker, written in that language. */
  nativeName: string;
  englishName: string;
  narration: {
    /** Lower-case voice language tags preferred first, for example 'en-us'. */
    preferredVoiceTags: string[];
    /** Any voice whose language starts with this prefix is compatible. Never another language. */
    languagePrefix: string;
  };
  linguisticReview: LinguisticReviewState;
  clinicalReview: ClinicalReviewState;
}

export const LOCALE_DEFINITIONS: Record<SupportedLocale, LocaleDefinition> = {
  en: {
    code: 'en',
    bcp47: 'en-US',
    nativeName: 'English',
    englishName: 'English',
    narration: { preferredVoiceTags: ['en-us'], languagePrefix: 'en' },
    linguisticReview: 'source_language',
    clinicalReview: 'not_reviewed',
  },
  es: {
    code: 'es',
    bcp47: 'es-US',
    nativeName: 'Español',
    englishName: 'Spanish',
    narration: { preferredVoiceTags: ['es-us'], languagePrefix: 'es' },
    linguisticReview: 'draft_awaiting_native_review',
    clinicalReview: 'not_reviewed',
  },
};

export const isSupportedLocale = (value: unknown): value is SupportedLocale =>
  typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value);

export const localeDefinition = (locale: SupportedLocale): LocaleDefinition => LOCALE_DEFINITIONS[locale];

/**
 * Languages that have been requested but are not implemented because the exact language or regional
 * variety has not been decided. These are deliberately NOT SupportedLocale values: no locale code is
 * chosen, no content exists, and nothing here is shown to learners. See docs/translation/README.md.
 */
export interface PlannedLocaleTarget {
  id: 'portuguese' | 'creole';
  requestedAs: string;
  resolution: 'unresolved';
  candidateTags: { tag: string; name: string; note: string }[];
  decisionNeeded: string;
}

export const PLANNED_LOCALE_TARGETS: PlannedLocaleTarget[] = [
  {
    id: 'portuguese',
    requestedAs: 'Portuguese',
    resolution: 'unresolved',
    candidateTags: [
      { tag: 'pt-BR', name: 'Brazilian Portuguese', note: 'Candidate only; not selected.' },
      { tag: 'pt-PT', name: 'European Portuguese', note: 'Candidate only; not selected.' },
    ],
    decisionNeeded: 'Which Portuguese variety the intended participants read (Brazilian, European, or both as separate locales).',
  },
  {
    id: 'creole',
    requestedAs: 'Creole',
    resolution: 'unresolved',
    candidateTags: [
      { tag: 'ht', name: 'Haitian Creole (Kreyòl ayisyen)', note: 'Candidate only; not selected.' },
      { tag: 'kea', name: 'Cape Verdean Creole (Kabuverdianu)', note: 'Candidate only; not selected.' },
    ],
    decisionNeeded: 'Which Creole language is meant; other Creole languages are possible. Also whether participants prefer written text, audio, or both.',
  },
];
