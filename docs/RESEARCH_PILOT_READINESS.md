# Research pilot readiness

Status as of 2026-11-12, branch `work/canonical-multilingual-20261111` (based on `dev/ten-module-curriculum-20261021` at `0071c30`).

**Bottom line:** the app is a working, tested development build in English with a complete but unreviewed Spanish draft. It is ready for an internal walkthrough with Dr. Bourjeily and the research team, clearly labeled as unreviewed. It is **not** approved for participants: there is no clinical review, no professional translation review, no IRB or institutional approval, no assigned PI decision on the study design, and no participant-data design. Nothing in this repository claims otherwise.

Context: at the 2026-11-11 meeting, the agreed next steps were to polish the existing modules and prepare additional languages. Recruitment ideas (personal social media; participants from other Lifespan women's health studies), deployment (an app store was mentioned), and a manuscript were raised, but Dr. Bourjeily's answers were not captured in the transcript, so none of them is treated as decided here.

## 1. Technically complete

| Area | State | Evidence |
| --- | --- | --- |
| Curriculum | 10 modules, 113 screens per language; module IDs `m1`, `m2`, `m3`, `m4`, `m5`, `m5b`, `m6`, `m7`, `m8`, `m9` | `docs/curriculum/CURRICULUM_INVENTORY.md` (generated); `npm run validate:content` |
| Saved progress | Curriculum version 12 with a tested migration from every earlier version, including the m5 and m5b split; screen IDs unchanged by this work | `src/state/curriculum-migration.ts`; `tests/content-and-progress.test.ts`; the ten-module browser test seeds version 11 progress |
| Languages | Locale registry; all interface strings keyed; partial or untranslated locales cannot be selected; no fallback to English inside a lesson; Spanish fails the build instead of reusing English text | `src/i18n/locales.ts`, `src/content/locale-completeness.ts`; `tests/locale-infrastructure.test.ts`; `tests/e2e/locale-status.spec.ts` |
| Honest status labels | Settings and About state that the lessons have not completed clinical review and that Spanish is an unreviewed draft | `src/i18n/strings.ts`; browser tests |
| Review tracking | Approvals can only be recorded in `src/content/review-register.ts` (empty); per-module clinical review domains and open items in `src/content/clinical-review-register.ts` | `tests/clinical-review-register.test.ts`; `docs/translation/TRANSLATION_STATUS.md` (generated) |
| Translator hand-off | Export of every English text unit with screen, field, clinical domain, and answer-key markers | `scripts/export-translation-source.ts`; `tests/translation-export.test.ts` |
| Privacy | No accounts, analytics, network calls, or in-app AI; progress, answers, and reflections stay on the device; only learning keys are stored | `tests/privacy-boundaries.test.ts`; `src/state/learning-persistence.ts` |
| Narration | Device voices only, never a voice for another language; closing-quote fix; English question narration includes the statement being judged | `src/services/narration.ts`, `src/services/narration-text.ts`; unit and browser tests |
| Accessibility | Minimum touch targets, labeled controls, reduced motion; screen-reader-only titles are `aria-hidden` when they repeat boilerplate | Existing UI audits; browser tests |

## 2. Needs Dr. Bourjeily's decision (or the PI's)

1. **Languages and varieties.** Which Portuguese (Brazilian `pt-BR` or European `pt-PT`) and which Creole (for example Haitian Creole `ht` or Cape Verdean Creole `kea`), based on the participants. Also whether audio is needed. See `docs/translation/README.md`.
2. **Study design.** Who the participants are, how they are recruited, what (if anything) is measured, and whether the study is a usability or educational evaluation. The app currently collects nothing.
3. **The August "APPROVED" packet.** `docs/BILINGUAL-CLINICAL-LANGUAGE-REVIEW.md` says clinical and Spanish approval were finalized for 101 screens, with no reviewer recorded. The code treats everything as unreviewed until this is confirmed or withdrawn.
4. **Withheld images.** Whether to replace or permanently drop the m8-10 oxygen-cylinder table and the m9-05 face photo (`docs/PAP_PREGNANCY_CONTENT_AUDIT.md`).
5. **Topics with no source.** Whether to commission content for delivery-hospital planning, postpartum planning, pregnancy-specific PAP adjustment, and any statement that PAP improves fetal or newborn outcomes. These are blocked until a cited source and a clinical decision exist.
6. **CIAS wording.** Whether the team accepts departing from verbatim CIAS text for 17 low-risk editorial fixes (typos, a missing link, a paragraph about an image that is not shown). See `docs/curriculum-audit-20261112/README.md`.

## 3. Needs a medical content reviewer

Every module is `not_reviewed`, and `m6` is `needs_revision`. The reviewer should use `src/content/clinical-review-register.ts` as the checklist. Priority items:

- **Pregnancy and fetal outcomes (m3, m4):** the m3 "lower birth weight" answer key versus CIAS p.17 (mild OSA linked to larger babies); the m4 recap drawing that shows PAP leading to controlled blood pressure and blood sugar; four m4 and three m6 CIAS questions with no answer key (shown as ungraded, including options such as stillbirth, autism, and ADHD).
- **Medication and product statements (m6, m9):** named nasal sprays, antacids, and acid reducers in pregnancy; the m6-03 versus m9-08 conflict on nasal sprays in pregnancy.
- **PAP use (m8, m9):** three contradictions with CIAS in m8, one in m9, the ATS supplement material that is listed as not clinically approved, and who adjusts humidity and ramp (m6 versus m8).
- **Statistics without references:** m6 prevalence figures, and the m7 bed-partner percentages.
- **New structural text:** the m5 and m5b titles and descriptions.

## 4. Needs a qualified language reviewer

- **Spanish (all 113 screens):** professional medical translation review. Known issues: "tú" in m8 and m9 versus "usted" elsewhere; masculine forms addressing a pregnant audience; m1-q1 says "puede tener" where English is definite; m4-q1 softens "at risk of"; images with English text on Spanish screens (m6-07, m6-08, m9-04, and the m4 recap drawing); two English-only videos.
- **Portuguese and Creole:** translation, then review, once the variety is decided.
- **New Spanish alt text:** m4 recap and m6-07 (written on this branch as drafts).

## 5. Needs institutional approval or a PI assignment

- IRB determination (or exemption) for any study, including a usability pilot.
- A named PI and the institution under which the study runs; who owns the content, the code, and any data.
- Approval of the CIAS-derived content for this use, and license or permission for every user-provided image (66 image placements; most have no recorded license).
- Whether the app may be distributed (app store, test build, or web) and under whose account.
- Data protection review before any data collection is designed.

## 6. Needs a decision about recruitment and deployment

- Recruitment channel and eligibility (pregnant patients with OSA prescribed PAP, per the original prototype's purpose).
- Whether participants use their own phones, a study device, or a web link.
- Whether any data leaves the device. Today nothing does. A study that needs data requires a separate design: consent, minimum necessary fields, no identifiers in the app, an approved storage location, and an agreement with any vendor that handles it.
- Native device testing on iPhone and Android, including screen readers and real Spanish voices (`docs/PHYSICAL_DEVICE_TEST_CHECKLIST.md`).
- Runtime privacy: the three lesson videos load their thumbnails from YouTube when the screen opens, and opening them goes to YouTube; reviewers should decide whether that is acceptable for participants.

## 7. Needed for a future usability or educational evaluation (after approval)

- Pre-defined outcomes (for example knowledge-check accuracy, completion, perceived usefulness) and how they are measured without identifying anyone.
- A versioned, frozen content snapshot for the study (the snapshot script hashes the curriculum).
- A consent screen and a study mode that are designed and approved, not improvised.
- An analysis plan. The repository's deterministic personas are test constructs, not participants, and do not show effectiveness.

## 8. Deliberately out of scope for this engineering phase

Recruitment, any participant contact, data collection, analytics, in-app AI, deployment to an app store or public URL, pushing this branch to GitHub, writing new clinical content, machine-translating Portuguese or Creole, and any claim of IRB approval, clinical validation, or effectiveness.

## 9. Verification run on this branch

Run on 2026-11-12 on Windows 11 with Node 24 and Chrome.

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed, 0 errors |
| `npm run lint` | 0 errors, 2 warnings (both existed before this work) |
| `npm run validate:content` | Passed: 10 modules, 113 screens, matching English and Spanish IDs |
| `npm test` | 67 of 67 passed (43 before this work) |
| `npx playwright test` | 29 of 29 passed in 10.4 minutes (23 existing plus 6 new), including clicking through all ten modules in English and Spanish and loading all 113 Spanish screens |
| `npx tsx scripts/generate-review-reports.ts --check` | Reports match the code |
| `npm audit --omit=dev` | 37 advisories (1 critical `shell-quote`, 16 high, 19 moderate, 1 low). All but `expo-router` are transitive, mostly in Expo, Metro, and build tooling. 13 of the 17 high or critical items have fixes inside the declared version ranges (`npm audit fix`, lockfile only); 4 need major upgrades of `expo-router` or `expo`. Not applied in this task: dependency changes need their own Expo compatibility pass (`npx expo-doctor`, web export, and native builds). Recommended as the next engineering task. |
| `gitleaks` on this branch's commits and changed folders | No leaks |
| Clean checkout | A fresh clone of commit `dceed00` (the last code commit) with a fresh `npm ci` passed every check above, including all 29 browser tests. The commit after it changes documentation only. |
| Accessibility audit (`scripts/audit-ui-a11y.mjs`) | 36 page and viewport combinations (English and Spanish, 320 and 390 px), 296 controls: 0 without a name, 0 under 44 px, 0 horizontal overflow; every focused control shows a 3 px outline |
| Committed Cloudflare Worker (`cloudflare-worker`, unused by the research app) | `npm run check`: typecheck clean, 10 of 10 tests |
