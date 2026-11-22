import { englishBaseModules, englishModules } from './en';
import { spanishModules } from './es';
import { overlayModules } from './overlay';
import { withQuestionFeedback } from './question-feedback';
import { ptBRCatalog } from './translations/pt-BR';
import { htCatalog } from './translations/ht';
import { SOURCE_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from '@/src/i18n/locales';
import type { EducationModule } from '@/src/types/content';
import { localeContentGaps } from './locale-completeness';

/** Bundled lesson content for every supported locale. A new locale must add an entry here (compile error otherwise). */
export const modulesByLocale: Record<SupportedLocale, EducationModule[]> = {
  en: englishModules,
  es: spanishModules,
  'pt-BR': withQuestionFeedback(overlayModules(englishBaseModules, { locale: 'pt-BR', catalog: ptBRCatalog.content }), 'pt-BR'),
  ht: withQuestionFeedback(overlayModules(englishBaseModules, { locale: 'ht', catalog: htCatalog.content }), 'ht'),
};

/**
 * Locales a learner may choose. A locale is offered only when its content is complete: every English module
 * and screen exists, in order, with translated text. A partial locale is never offered, so a lesson can never
 * silently show English inside a language presented as translated.
 */
export const learnerSelectableLocales: SupportedLocale[] = SUPPORTED_LOCALES.filter((locale) =>
  locale === SOURCE_LOCALE || localeContentGaps(modulesByLocale[SOURCE_LOCALE], modulesByLocale[locale]).length === 0);

/** Returns the modules for a supported locale. There is no fallback to another language. */
export const getModules = (locale: SupportedLocale): EducationModule[] => {
  const modules = modulesByLocale[locale];
  if (!modules) throw new Error(`No bundled content for locale "${String(locale)}".`);
  return modules;
};
export const getModule = (locale: SupportedLocale, id: string) =>
  getModules(locale).find((module) => module.id === id);
