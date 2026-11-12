/**
 * Locale registry: the single place that says which languages the app ships, how each one is narrated,
 * and how far each one is through review. Application code iterates over this registry instead of
 * hard-coding language pairs, so adding a language means adding content, UI strings, and one entry here.
 *
 * Keep this file free of React, i18next, and Expo imports so Node tests can load it directly.
 */

/** Languages with complete bundled content. Order is the order shown to learners. */
export const SUPPORTED_LOCALES = ['en', 'es', 'pt-BR', 'ht'] as const;
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
  /** How the translation was produced. */
  translationMethod: 'source' | 'existing_app_draft' | 'ai_draft_claude';
  /**
   * Whether the research team confirmed this exact language variety. 'working_assumption' means the code
   * was chosen by the engineering team to make progress and must be confirmed (see LANGUAGE_VARIETY_DECISIONS).
   */
  varietyStatus: 'source' | 'confirmed' | 'working_assumption';
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
    translationMethod: 'source',
    varietyStatus: 'source',
  },
  es: {
    code: 'es',
    bcp47: 'es-US',
    nativeName: 'Español',
    englishName: 'Spanish',
    narration: { preferredVoiceTags: ['es-us'], languagePrefix: 'es' },
    linguisticReview: 'draft_awaiting_native_review',
    clinicalReview: 'not_reviewed',
    translationMethod: 'existing_app_draft',
    // Spanish was requested and built before this registry existed; the US Spanish tag is long-standing.
    varietyStatus: 'confirmed',
  },
  'pt-BR': {
    code: 'pt-BR',
    bcp47: 'pt-BR',
    nativeName: 'Português (Brasil)',
    englishName: 'Portuguese (Brazil)',
    narration: { preferredVoiceTags: ['pt-br'], languagePrefix: 'pt' },
    linguisticReview: 'draft_awaiting_native_review',
    clinicalReview: 'not_reviewed',
    translationMethod: 'ai_draft_claude',
    varietyStatus: 'working_assumption',
  },
  ht: {
    code: 'ht',
    bcp47: 'ht',
    nativeName: 'Kreyòl ayisyen',
    englishName: 'Haitian Creole',
    // Haitian Creole voices are rare; never substitute French or another language's voice.
    narration: { preferredVoiceTags: ['ht-ht', 'ht'], languagePrefix: 'ht' },
    linguisticReview: 'draft_awaiting_native_review',
    clinicalReview: 'not_reviewed',
    translationMethod: 'ai_draft_claude',
    varietyStatus: 'working_assumption',
  },
};

export const isSupportedLocale = (value: unknown): value is SupportedLocale =>
  typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value);

export const localeDefinition = (locale: SupportedLocale): LocaleDefinition => LOCALE_DEFINITIONS[locale];

/**
 * The research team asked for "Portuguese" and "Creole" without naming a variety, and no project record
 * names one. The engineering team implemented Brazilian Portuguese and Haitian Creole as working
 * assumptions so draft content could be built. Neither choice was made by Dr. Bourjeily or the PI; both
 * must be confirmed before any participant use. See docs/translation/README.md.
 */
export interface LanguageVarietyDecision {
  requestedAs: string;
  implementedAs: SupportedLocale;
  status: 'working_assumption' | 'confirmed';
  alternatives: { tag: string; name: string }[];
  decisionNeeded: string;
}

export const LANGUAGE_VARIETY_DECISIONS: LanguageVarietyDecision[] = [
  {
    requestedAs: 'Portuguese',
    implementedAs: 'pt-BR',
    status: 'working_assumption',
    alternatives: [{ tag: 'pt-PT', name: 'European Portuguese' }],
    decisionNeeded: 'Confirm that the intended participants read Brazilian Portuguese (or name another variety).',
  },
  {
    requestedAs: 'Creole',
    implementedAs: 'ht',
    status: 'working_assumption',
    alternatives: [{ tag: 'kea', name: 'Cape Verdean Creole (Kabuverdianu)' }],
    decisionNeeded: 'Confirm that "Creole" means Haitian Creole (other Creole languages are possible), and whether participants prefer written text, audio, or both.',
  },
];
