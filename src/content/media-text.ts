import type { AuthoredLocaleText } from '@/src/types/content';
import type { SupportedLocale } from '@/src/i18n/locales';
import { htCatalog } from './translations/ht';
import { ptBRCatalog } from './translations/pt-BR';

const catalogs = { 'pt-BR': ptBRCatalog.media, ht: htCatalog.media } as const;

/**
 * Alt text and video titles. English and Spanish are authored beside the media; other locales come from
 * the generated catalog by key (`image:<id>`, `video:<screenId>:title|altText`). A missing entry throws:
 * there is no English fallback for a shipped locale.
 */
export function mediaText(authored: AuthoredLocaleText, key: string, locale: SupportedLocale): string {
  if (locale === 'en' || locale === 'es') return authored[locale];
  const value = catalogs[locale][key];
  if (!value) throw new Error(`Missing ${locale} media text for ${key}`);
  return value;
}
