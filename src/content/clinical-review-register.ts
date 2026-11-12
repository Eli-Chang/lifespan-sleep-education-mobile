/**
 * Clinical review register: one machine-checkable entry per module saying which clinical domains it touches,
 * who must review it, what the content is based on, and which specific items are open.
 *
 * It records review needs; it never approves anything. Approval lives only in src/content/review-register.ts.
 * Open items are taken from existing audits (cited per item). They are questions for reviewers, not changes;
 * nothing in this file is shown to learners.
 */
import type { ReviewerRole } from './review-register';

export type ClinicalDomain =
  | 'osa-general'
  | 'pregnancy'
  | 'fetal-and-newborn-outcomes'
  | 'pregnancy-comorbidities'
  | 'pap-initiation'
  | 'pap-troubleshooting'
  | 'pap-equipment-and-cleaning'
  | 'medication-or-product-advice'
  | 'sexual-health-and-relationships'
  | 'sleep-hygiene'
  | 'behavior-change';

export interface ModuleClinicalReview {
  moduleId: string;
  domains: ClinicalDomain[];
  requiredReviewers: ReviewerRole[];
  /** Matches EducationModule.clinicalReviewStatus; 'approved' is not a value here by design. */
  status: 'not_reviewed' | 'needs_revision';
  sourceBasis: string;
  openItems: { item: string; reference: string }[];
}

const AUDIT = 'docs/curriculum-audit-20261021/README.md';
const PAP_AUDIT = 'docs/PAP_PREGNANCY_CONTENT_AUDIT.md';

export const MODULE_CLINICAL_REVIEW: ModuleClinicalReview[] = [
  {
    moduleId: 'm1', domains: ['osa-general', 'pregnancy'], requiredReviewers: ['clinical content reviewer'], status: 'not_reviewed',
    sourceBasis: 'CIAS app screenshots (3 screens) and the app curriculum (7 screens).',
    openItems: [{ item: 'Confirm app-authored overview text and the NHLBI supporting link.', reference: 'docs/CLINICAL_SOURCE_REGISTRY.md' }],
  },
  {
    moduleId: 'm2', domains: ['osa-general', 'sexual-health-and-relationships', 'pregnancy'], requiredReviewers: ['clinical content reviewer'], status: 'not_reviewed',
    sourceBasis: 'CIAS app screenshots (7 of 8 screens).', openItems: [],
  },
  {
    moduleId: 'm3', domains: ['osa-general', 'pregnancy', 'fetal-and-newborn-outcomes', 'behavior-change'], requiredReviewers: ['clinical content reviewer', 'study PI'], status: 'not_reviewed',
    sourceBasis: 'CIAS app screenshots (6 of 8 screens); the m3-01 fetal-outcome infographic is user-provided and its license is not recorded.',
    openItems: [{ item: 'Fetal and newborn outcome statements and the m3-01 infographic need clinician confirmation and a citation.', reference: PAP_AUDIT }],
  },
  {
    moduleId: 'm4', domains: ['pregnancy', 'fetal-and-newborn-outcomes', 'pregnancy-comorbidities'], requiredReviewers: ['clinical content reviewer', 'study PI'], status: 'not_reviewed',
    sourceBasis: 'CIAS app screenshots (8 of 10 screens); two external English-language videos; images user-provided with unknown license.',
    openItems: [
      { item: 'Gestational diabetes and preeclampsia explanations and association wording need obstetric review.', reference: PAP_AUDIT },
      { item: 'External YouTube videos (m4-03, m4-05) are third-party, English only, and unreviewed.', reference: PAP_AUDIT },
    ],
  },
  {
    moduleId: 'm5', domains: ['sleep-hygiene', 'pregnancy'], requiredReviewers: ['clinical content reviewer'], status: 'not_reviewed',
    sourceBasis: 'CIAS app screenshots (12 of 14 screens).',
    openItems: [{ item: 'New Part 1 title, short title, and description (2026-10-21) are structural text awaiting review.', reference: AUDIT }],
  },
  {
    moduleId: 'm5b', domains: ['sleep-hygiene', 'pregnancy'], requiredReviewers: ['clinical content reviewer'], status: 'not_reviewed',
    sourceBasis: 'CIAS app screenshots (14 of 17 screens).',
    openItems: [{ item: 'New Part 2 title, short title, and description (2026-10-21) are structural text awaiting review.', reference: AUDIT }],
  },
  {
    moduleId: 'm6', domains: ['pregnancy', 'pregnancy-comorbidities', 'pap-initiation'], requiredReviewers: ['clinical content reviewer', 'study PI'], status: 'needs_revision',
    sourceBasis: 'CIAS app screenshots (10 of 11 screens). Module already marked needs_revision in content metadata.',
    openItems: [{ item: 'Module is marked needs_revision; reviewer must state what revision is required.', reference: 'docs/CLINICAL_REVIEW.md' }],
  },
  {
    moduleId: 'm7', domains: ['sexual-health-and-relationships', 'pregnancy', 'pap-initiation'], requiredReviewers: ['clinical content reviewer'], status: 'not_reviewed',
    sourceBasis: 'CIAS app screenshots (7 of 9 screens); CIAS EZ-PAP Section VI.',
    openItems: [
      { item: 'm7-04 and m7-q2 are ungraded reflections that still say "There are 3 correct answers".', reference: AUDIT },
      { item: 'The 90%/75% bed-partner statistic has no reference in either source.', reference: AUDIT },
      { item: 'm7 says to use PAP every time you sleep; CIAS allows skipping naps under 30 minutes.', reference: AUDIT },
    ],
  },
  {
    moduleId: 'm8', domains: ['pap-initiation', 'pap-equipment-and-cleaning', 'pregnancy'], requiredReviewers: ['clinical content reviewer', 'study PI'], status: 'not_reviewed',
    sourceBasis: 'CIAS EZ-PAP Section II (62 of 100 statements match or paraphrase) plus ATS patient-education supplements listed as not clinically approved.',
    openItems: [
      { item: 'm8-02 says to fit the mask with the machine running; CIAS step 1 says not to plug it in yet.', reference: AUDIT },
      { item: 'm8-08 calls humidification a care-team decision; CIAS and m9 let patients adjust it.', reference: AUDIT },
      { item: 'm8-09 omits CIAS allowances (naps under 30 minutes, partial use still helps).', reference: AUDIT },
      { item: 'm8-03/m8-04 acclimation timing is vaguer than CIAS (3 to 5 days per step, 1 hour a day).', reference: AUDIT },
      { item: 'CIAS acclimation steps skip number 3 in the source PDF; CIAS authors should confirm nothing was lost.', reference: AUDIT },
    ],
  },
  {
    moduleId: 'm9', domains: ['pap-troubleshooting', 'pap-equipment-and-cleaning', 'medication-or-product-advice', 'pregnancy'], requiredReviewers: ['clinical content reviewer', 'study PI'], status: 'not_reviewed',
    sourceBasis: 'CIAS EZ-PAP Section III (84 of 143 statements match or paraphrase) plus ATS supplements (49 statements) listed as not clinically approved.',
    openItems: [
      { item: 'm9-05 omits CIAS petroleum-cream and silicone-mask suggestions and adds a product warning.', reference: AUDIT },
      { item: 'm9-08 omits CIAS statement that saline spray and nasal steroids are safe in pregnancy and adds a caution.', reference: AUDIT },
      { item: 'm9-11 keeps only weekly tubing cleaning from the CIAS schedule; ATS-derived cleaning bans are not in CIAS.', reference: AUDIT },
      { item: 'm9-04, m9-07, m9-09 differ from CIAS (whistling cause, mouth tape, comfort features).', reference: AUDIT },
      { item: 'Travel and flying (CIAS p24) are intentionally absent; confirm the decision.', reference: AUDIT },
      { item: 'Ten m9 images have unknown license; m9-05 is a close-up of a real person with no recorded source.', reference: AUDIT },
    ],
  },
];

/** Domains that require a pregnancy-qualified clinician regardless of other reviewers. */
export const PREGNANCY_DOMAINS: ClinicalDomain[] = ['pregnancy', 'fetal-and-newborn-outcomes', 'pregnancy-comorbidities'];
export const PAP_DOMAINS: ClinicalDomain[] = ['pap-initiation', 'pap-troubleshooting', 'pap-equipment-and-cleaning'];
