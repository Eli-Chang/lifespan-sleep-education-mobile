/**
 * Review register: the only place where a translation or a module may be recorded as approved.
 *
 * Both lists are empty on purpose. As of 2026-11-11 no qualified language reviewer has approved any
 * translation and no clinician has approved any module. Code that reports "approved" reads this file and
 * nothing else, so approval cannot be implied by a commit message, a document title, or a status flag.
 *
 * To record an approval, add an entry with the reviewer's role (not their name), the date, the exact scope,
 * and a pointer to the signed review record kept outside this repository. Tests reject incomplete entries.
 */
import type { SupportedLocale } from '@/src/i18n/locales';

export type ReviewerRole =
  | 'qualified medical translator'
  | 'native-speaker clinician'
  | 'study PI'
  | 'clinical content reviewer'
  | 'institutional reviewer';

export interface LinguisticApproval {
  locale: SupportedLocale;
  /** Screen IDs covered, or 'all' for every screen in the locale at the reviewed content hash. */
  screens: string[] | 'all';
  reviewerRole: ReviewerRole;
  /** ISO date (YYYY-MM-DD) of the signed review. */
  date: string;
  /** Pointer to the review record held outside the repository (for example a document ID). No names or PHI. */
  evidence: string;
}

export interface ClinicalApproval {
  moduleId: string;
  locale: SupportedLocale;
  reviewerRole: ReviewerRole;
  date: string;
  evidence: string;
}

export const LINGUISTIC_APPROVALS: LinguisticApproval[] = [];
export const CLINICAL_APPROVALS: ClinicalApproval[] = [];

const isIsoDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));

/** Returns problems with register entries; an approval with any problem must not count. */
export function reviewRegisterProblems(
  linguistic: LinguisticApproval[] = LINGUISTIC_APPROVALS,
  clinical: ClinicalApproval[] = CLINICAL_APPROVALS,
): string[] {
  const problems: string[] = [];
  linguistic.forEach((entry, index) => {
    if (!isIsoDate(entry.date)) problems.push(`linguistic[${index}] has no valid date.`);
    if (!entry.evidence.trim()) problems.push(`linguistic[${index}] has no evidence pointer.`);
    if (entry.screens !== 'all' && entry.screens.length === 0) problems.push(`linguistic[${index}] covers no screens.`);
    if (entry.reviewerRole === 'study PI' || entry.reviewerRole === 'institutional reviewer') problems.push(`linguistic[${index}] reviewer role cannot approve a translation.`);
  });
  clinical.forEach((entry, index) => {
    if (!isIsoDate(entry.date)) problems.push(`clinical[${index}] has no valid date.`);
    if (!entry.evidence.trim()) problems.push(`clinical[${index}] has no evidence pointer.`);
    if (entry.reviewerRole === 'qualified medical translator') problems.push(`clinical[${index}] reviewer role cannot approve clinical content.`);
  });
  return problems;
}
