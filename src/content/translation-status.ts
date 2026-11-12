/**
 * Translation status for every requested language, screen by screen. It separates four questions:
 * Is there text? Has a qualified language reviewer approved it? Does the content still need clinical review?
 * Is the language even decided? Status comes from the content metadata plus src/content/review-register.ts;
 * nothing here can mark a translation approved on its own.
 */
import { PLANNED_LOCALE_TARGETS, SOURCE_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from '@/src/i18n/locales';
import type { EducationModule, LessonScreen } from '@/src/types/content';
import { CLINICAL_APPROVALS, LINGUISTIC_APPROVALS, reviewRegisterProblems, type ClinicalApproval, type LinguisticApproval } from './review-register';

export type ScreenTranslationState = 'source' | 'approved' | 'draft_awaiting_native_review' | 'missing';

export interface ScreenTranslationStatus {
  moduleId: string;
  screenId: string;
  state: ScreenTranslationState;
  clinicalReviewRequired: boolean;
}

export interface LocaleTranslationSummary {
  target: string;
  label: string;
  /** False for requested languages whose exact language or variety is not decided. */
  decided: boolean;
  learnerSelectable: boolean;
  counts: Record<ScreenTranslationState, number>;
  clinicalReviewRequired: number;
  totalScreens: number;
  modules: { moduleId: string; counts: Record<ScreenTranslationState, number>; totalScreens: number }[];
}

const emptyCounts = (): Record<ScreenTranslationState, number> => ({ source: 0, approved: 0, draft_awaiting_native_review: 0, missing: 0 });

function approvedScreens(locale: SupportedLocale, approvals: LinguisticApproval[]): Set<string> | 'all' {
  const valid = reviewRegisterProblems(approvals, []).length === 0 ? approvals.filter((entry) => entry.locale === locale) : [];
  if (valid.some((entry) => entry.screens === 'all')) return 'all';
  return new Set(valid.flatMap((entry) => (entry.screens === 'all' ? [] : entry.screens)));
}

export function screenTranslationState(screen: LessonScreen | undefined, locale: SupportedLocale, approved: Set<string> | 'all'): ScreenTranslationState {
  if (locale === SOURCE_LOCALE) return screen ? 'source' : 'missing';
  if (!screen || screen.translationStatus === 'temporary_english_fallback' || screen.translationStatus === 'source') return 'missing';
  if (approved === 'all' || approved.has(screen.id)) return 'approved';
  return 'draft_awaiting_native_review';
}

export function localeScreenStatuses(
  source: EducationModule[],
  target: EducationModule[] | undefined,
  locale: SupportedLocale,
  approvals: LinguisticApproval[] = LINGUISTIC_APPROVALS,
  clinical: ClinicalApproval[] = CLINICAL_APPROVALS,
): ScreenTranslationStatus[] {
  const approved = approvedScreens(locale, approvals);
  const clinicalOk = reviewRegisterProblems([], clinical).length === 0 ? clinical : [];
  return source.flatMap((module) => {
    const targetModule = target?.find((candidate) => candidate.id === module.id);
    return module.screens.map((screen) => ({
      moduleId: module.id,
      screenId: screen.id,
      state: screenTranslationState(targetModule?.screens.find((candidate) => candidate.id === screen.id), locale, approved),
      clinicalReviewRequired: !clinicalOk.some((entry) => entry.moduleId === module.id && entry.locale === locale),
    }));
  });
}

function summarize(target: string, label: string, decided: boolean, learnerSelectable: boolean, statuses: ScreenTranslationStatus[], moduleIds: string[]): LocaleTranslationSummary {
  const counts = emptyCounts();
  statuses.forEach((status) => { counts[status.state] += 1; });
  return {
    target, label, decided, learnerSelectable, counts,
    clinicalReviewRequired: statuses.filter((status) => status.clinicalReviewRequired).length,
    totalScreens: statuses.length,
    modules: moduleIds.map((moduleId) => {
      const moduleCounts = emptyCounts();
      const rows = statuses.filter((status) => status.moduleId === moduleId);
      rows.forEach((status) => { moduleCounts[status.state] += 1; });
      return { moduleId, counts: moduleCounts, totalScreens: rows.length };
    }),
  };
}

/** Summary for every supported locale plus every requested-but-undecided language. */
export function translationStatusReport(modulesByLocale: Record<SupportedLocale, EducationModule[]>, selectable: SupportedLocale[]): LocaleTranslationSummary[] {
  const source = modulesByLocale[SOURCE_LOCALE];
  const moduleIds = source.map((module) => module.id);
  const supported = SUPPORTED_LOCALES.map((locale) => summarize(locale, locale, true, selectable.includes(locale), localeScreenStatuses(source, modulesByLocale[locale], locale), moduleIds));
  const planned = PLANNED_LOCALE_TARGETS.map((target) => summarize(
    target.id, `${target.requestedAs} (variety not decided: ${target.candidateTags.map((candidate) => candidate.tag).join(' or ')})`, false, false,
    source.flatMap((module) => module.screens.map((screen) => ({ moduleId: module.id, screenId: screen.id, state: 'missing' as const, clinicalReviewRequired: true }))),
    moduleIds,
  ));
  return [...supported, ...planned];
}
