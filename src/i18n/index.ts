import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SOURCE_LOCALE, SUPPORTED_LOCALES } from './locales';
import { UI_STRINGS } from './strings';

const i18n = createInstance();

/** i18next resources for every supported locale, built from the locale registry. */
export const ui = Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, { translation: UI_STRINGS[locale] }]));

// fallbackLng stays at the source locale only as a last-resort guard; every shipped locale defines every key
// (enforced by the UiKey type and tests/locale-infrastructure.test.ts), so the fallback is never reached.
void i18n.use(initReactI18next).init({ resources: ui, lng: SOURCE_LOCALE, fallbackLng: SOURCE_LOCALE, supportedLngs: [...SUPPORTED_LOCALES], interpolation:{ escapeValue:false }, compatibilityJSON:'v4' });
if (typeof document !== 'undefined') { document.documentElement.lang = i18n.language; i18n.on('languageChanged', (language) => { document.documentElement.lang = language; }); }
export default i18n;
