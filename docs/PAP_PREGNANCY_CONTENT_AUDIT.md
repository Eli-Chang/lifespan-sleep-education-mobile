# PAP and pregnancy content audit (m3, m4, m6, m8, m9)

Date: 2026-11-11. Branch `work/canonical-multilingual-20261111`. This is a development record, not a clinical, translation, institutional, or medical-device approval. No medical claim, statistic, answer key, or recommendation was added or changed. No PHI was found in any file read.

`<Personal Drive>` means the My Drive folder of the personal Google account on the Windows PC; `<User home>` is the Windows user folder.

## What this audit answers

The request referred to PAP and fetal-health modules as "Module 9, 10, or 11". In the code the PAP modules are `m8` (Getting Started with PAP, shown 9th) and `m9` (Troubleshooting PAP, shown 10th); pregnancy and baby health is `m4` (shown 4th) with outcome questions in `m3`; pregnancy comorbidities is `m6` (shown 7th). There is no `m10` or `m11` in the current curriculum. An older curriculum (before version 11) had PAP modules `m8` to `m10`; their content is not recorded anywhere and their saved progress is discarded by the migration.

**Is further fetal-health material actually missing?** Yes, in a specific sense. The CIAS EZ-PAP source document (pp. 16 to 19) has maternal and fetal/neonatal outcome detail that the app does not include (newborn low blood sugar, APGAR, jaundice, NICU admission, preeclampsia complications, odds ratios, growth restriction rates). That material is *source-available* but not yet adapted; adapting it is clinical editorial work for the research team, not something done here. Material with **no source at all**: any evidence that PAP improves fetal or neonatal outcomes; pregnancy-specific PAP adjustment as pregnancy progresses; delivery-hospitalization planning; postpartum planning (the CIAS overview and EZ-PAP p.27 have topic labels only). These are **blocked by missing source evidence** and need a clinical decision and a cited source before any lesson is written.

## Changes made on this branch because of this audit

| Change | Why | How to reverse |
| --- | --- | --- |
| The `m8-10` image (`m8-10-settings-chart`) is withheld from learners. | It is a flow-rate, pressure, oxygen-percentage, and oxygen-cylinder (D tank) table for a different kind of device, shown on the screen that tells learners not to change prescribed pressure. The numbers could be read as settings guidance, and m1-07 says PAP is not supplemental oxygen. License not recorded. | Delete its entry from `WITHHELD_IMAGES` in `src/content/image-registry.ts`. |
| The `m9-05` image (`m9-05-skin-irritation`) is withheld from learners. | A close-up photograph of a real person with a visible skin finding. Its origin, license, and any authorization from the person shown are not recorded. A photo of a patient needs written authorization from that person before it is used in education material. | Record the source and authorization, then delete its entry from `WITHHELD_IMAGES`. |
| `src/content/clinical-review-register.ts` records the review domains, required reviewers, and open items for every module; tests require pregnancy domains on every module that mentions pregnancy and PAP domains plus PI sign-off on m8 and m9. | Machine-checkable review flags. | Not applicable; it approves nothing. |

Both images stay on disk and in the registry. Screen text, alt text, and attribution are unchanged.

## Verification of this audit

The detailed tables below were produced by an independent read-only audit agent on 2026-11-11 from the CIAS EZ-PAP PDF text, the CIAS screenshot archive, and the October 21 claim-by-claim audit (`docs/curriculum-audit-20261021/`). The coordinating session re-checked three findings directly before acting on them: the m8-10 image content (viewed), the CIAS p.17 birth-weight sentence (found in `docs/CIAS App_ EZ-PAP extracted.txt`), and the "APPROVED" header of `docs/BILINGUAL-CLINICAL-LANGUAGE-REVIEW.md`.

## Checks run

| Check | Result |
| --- | --- |
| `npx tsx scripts/snapshot-curriculum.ts` | 10 modules, 113 screens in EN and in ES; sha256 `e87ace920413f498d4fb40963e5d07efa2800ab336af1df59731136ddc2b39e7` |
| `npx tsx --test` on `cias-module-source-boundaries`, `content-and-progress`, `question-quality`, `image-registry` tests | 30 pass, 0 fail |
| `npx tsx scripts/validate-content.ts` | Passed: 10 modules, 113 screens, matching EN/ES IDs, 77 source entries |
| Verbatim check of every m4 and m6 CIAS-tagged screen against `docs/CIAS-SCREENSHOT-SOURCE-ARCHIVE.json` | 18 of 18 match word for word (title, body, prompt, choices, hint) |
| YouTube oEmbed for the two m4 videos | Both authored by Blue Cross Blue Shield of Michigan, matching the CIAS screen text. Video content was not reviewed |
| Exact-substring check of every EZ-PAP quote in this report | All match the stated page |

## Sources used

| Source | Location | Scope |
| --- | --- | --- |
| CIAS EZ-PAP document | `docs/CIAS App_ EZ-PAP .pdf`, `docs/CIAS App_ EZ-PAP extracted.txt` (page markers: p16 line 3010, p17 3384, p18 3676, p19 3991, p20 4529, p21 4932, p22 5279, p23 5605, p24 5965, p26 6643, p27 7078) | Section I pp.2-18 incl. "OSA Maternal & Fetal/Neonatal Outcomes" pp.16-19; Section II pp.19-20; Section III pp.21-24; Section V pp.25-27; Section VI pp.28-30 |
| CIAS app screenshots | `docs/CIAS-SCREENSHOT-SOURCE-ARCHIVE.json` (77 records, CIAS app modules 1-7), transcribed in `src/content/en/cias-source.ts` | Source of m4 and m6 |
| CIAS topic overview | `<Personal Drive>\AIOS\References (1)\Lifespan References\Sleep_Apnea_CIAS_Overview.png` | 8 planned topic columns, labels only |
| Oct 21 audit | `docs/curriculum-audit-20261021/` | Claim-by-claim m8/m9 vs CIAS |
| ATS supplements | `ats-pap-overview`, `ats-pap-troubleshooting`, `ats-pap-care-cleaning` | Candidates, "statement-level review pending" (`docs/CLINICAL_SOURCE_REGISTRY.md` lines 9-11). Not fetched or compared here |
| Not accessible | Google Doc "Educational Modules Enhancing CPAP Adherence in Pregnant Women With Sleep Apnea" | `docs/curriculum-audit-20261021/README.md` line 12 |
| Not found | Old Next.js prototype | No `next.config.*` or prototype folder in the AIOS Drive, `Documents\App Developments`, or `AppData\Local\LifespanSleepEducation` |
| Checked, no clinical content | `<User home>\Documents\App Developments\lifespan-sleep-education-media` (SOURCES.md, sources/SOURCE_POLICY.md) and the Sept 22 handoff (`BOURJEILY-EMAIL-DRAFT.md`, `HANDOFF-PROVENANCE.md`) | Media prototype covers only the m1 airway; handoff m4/m6/m8/m9 files match current except display order and one m9-11 label later removed |

## Module-by-module table

Ratings in the last column are this audit's assessment for an internal research-team demo, not a clinical or release approval. None of these modules is ready for patients.

| Module id | Title | Screens | Existing content summary | Source completeness | Citation / evidence quality | EN/ES translation coverage | Technical implementation state | Missing sections, source available | Missing sections, no source | Clinical review needed | Internal-demo readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **m4** (display 4) | Sleep Apnea and Health of Your Pregnancy and Baby (`module-04.ts` line 50) | 10: m4-01, m4-q1, m4-03, m4-04, m4-q4, m4-05, m4-06, m4-q6, m4-q3, m4-recap | CIAS intro; "which conditions are you at risk of" multi-select; gestational diabetes and preeclampsia via BCBS Michigan YouTube shorts; maternal and baby GDM complication questions; preeclampsia organ damage and fetal growth restriction (m4-06); preeclampsia complication question; app-written "What does PAP directly treat?" check and recap | 8 of 10 screens are CIAS app screenshots M4-S01 to S08, verbatim; 2 app-written (`curriculum-master-v3`); 0 ATS. CIAS M4-S09 recap diagram replaced by app recap. EZ-PAP pp.16-19 outcome section not used directly; most of its detail absent (Q3) | Screen-level provenance only; no statement-level citation on any screen. EZ-PAP pp.16-19 names reviews by title only. 4 CIAS questions have no recovered answer key (`helpers.ts` line 289) and show as ungraded reflections (`app/module/[id].tsx` line 19) while still saying "Hint: There are 3 correct answers" | 10/10 ES screens: 8 translated from approved English, 2 machine-drafted; all `bilingualReviewStatus: not_reviewed`. ES m4-q1 softens "at risk of" to "puede estar asociada con" (`es/cias-translations.ts` line 104). Videos English-only | Renders EN/ES. Merge in `module-04.ts` lines 46-49; app-written screens at lines 5-34 are unused; unused ES drafts (`es/modules/module-04.ts` lines 4-10) and unused CIAS recap translation (`cias-translations.ts` lines 139-143). Flags: module and all screens `not_reviewed`; `needsContentReview`/`reviewReason` not set; `sourceConfidence` HIGH on 8. 3 images `unknown/user-provided` (`image-registry.ts` lines 32-34), not listed in `docs/IMAGE_SOURCE_REGISTRY.md` (its m4 row, line 29, names an unused OpenMoji) | EZ-PAP p.16 newborn low blood sugar, APGAR, jaundice, NICU; preeclampsia "after 20 weeks"; heart failure, strokes, seizures, pulmonary edema; pp.17-18 odds ratios; infant mortality and neurobehavioral notes; OSA-severity nuance on birth weight; p.18 maternal-death share, fetal growth restriction rate; p.8 "baby's development"; CIAS M4-S09 recap labels | Answer keys for m4-q1, m4-04, m4-q4, m4-q6; any evidence that PAP improves fetal or neonatal outcomes; delivery or postpartum content | Yes: ungraded options include Autism, ADHD, stillbirth with no feedback; recap image (CIAS m3-04 drawing) shows arrows from PAP to well-controlled blood pressure and blood sugar beside text saying PAP is no guarantee; module description promises no "frightening conclusions" | Ready with caveats: verbatim CIAS, renders in both languages; present as unreviewed; explain ungraded questions; videos need internet |
| **m6** (display 7) | Pregnancy Comorbidities and PAP, short title "PAP Barriers" (`module-06.ts` line 46) | 11: m6-01, m6-02, m6-03, m6-04, m6-q1, m6-07, m6-05, m6-q2, m6-08, m6-q3, m6-recap | Nasal congestion (up to 42%) and PAP; saline, OTC fluticasone/budesonide, spray technique, Afrin 2-3 days max, PAP heat/humidity; GERD (30-80%), OSA-GERD mechanism, lifestyle, antacids, H2 blockers/PPIs with doctor; anxiety (~20%), mask claustrophobia strategies incl. humidity and ramp; lifestyle, CBT, medication via physician; 3 unkeyed questions; app recap | 10 of 11 CIAS app screenshots M6-S01 to S10, verbatim; 1 app-written recap; 0 ATS. EZ-PAP overlaps only on pp.14, 23, 25-26 and has no GERD-medication or anxiety-prevalence text | Prevalence numbers and medication pregnancy-safety statements have no citation in CIAS or app. Source screenshot 172142 (m6-03, medications) is `needs-review` (`source-manifest.ts` line 40). 3 questions unkeyed | 11/11 ES: 10 translated from approved English, 1 machine-drafted; all not reviewed. Infographics m6-07, m6-08 carry English text on ES screens | Renders EN/ES. Module `clinicalReviewStatus: 'needs_revision'`. App-written screens lines 5-40 unused; ES drafts lines 4-11 unused. Description and recap mention equipment barriers no live screen covers. m6-01 shows CIAS text describing a CIAS image ("The image here shows a woman blowing her nose...", `cias-source.ts` line 73) that the app does not show. 7 user-provided images unknown license (`image-registry.ts` lines 52-58); cpap-patient CC BY-SA (line 59); OpenMoji (line 60) | EZ-PAP p.14 sedating meds incl. antihistamines can worsen OSA; sprays/adhesives do not replace CPAP; raise head of bed 4-6 in.; p.23 CPAP can worsen allergies, nasal sprays preferred to oral meds; p.26 melatonin avoid in pregnancy; p.15 nicotine replacement check | Answer keys m6-q1 to q3; dedicated "Medication safety" content (overview label only) | Yes, already flagged: named medicines and safety claims (`docs/CLINICAL_REVIEW.md` line 12), statistics (line 9). Conflicts: m6-03/m6-05 let patients adjust heat, humidity, ramp; m8-05/m8-08 call them care-team decisions. m6-03 says sprays are safe in pregnancy; m9-08 adds "especially during pregnancy" as a caution | Ready with caveats: show only as unreviewed draft; medication advice unreviewed and module flagged `needs_revision` |
| **m8** (display 9) | Getting Started with PAP (`module-08.ts` lines 18-28) | 12: m8-01 to m8-05, m8-q1, m8-06 to m8-10, m8-q2 | Gradual acclimation (comfortable mask, ~1 h/day awake practice, resting practice, first part of night, whole night); is PAP helping; early discomfort; when to use PAP; who adjusts settings; 2 keyed checks. No pregnancy-specific content | EZ-PAP Section II pp.19-20 structure covered; 13 Section II omissions plus 3 related (`audit-m8.md` lines 147-166) | 100 claims: 76 CIAS-supported (25 match, 37 paraphrase, 14 from other CIAS sections), 21 not in CIAS (app or ATS, not separable), 3 contradict CIAS (`audit-m8.md` lines 9-19). Source IDs are module-wide (`helpers.ts` line 7). Keys app-authored but CIAS-supported | 12/12 ES machine-drafted, not reviewed; "tú" vs "usted" elsewhere, masculine forms (README line 123). Oct 21 ES fixes applied (README lines 40-44) | Renders EN/ES; tests enforce source IDs, counts, exclusions (`tests/cias-module-source-boundaries.test.ts` lines 13-31). Flags: all `not_reviewed`; no `needsContentReview`. 9 user-provided images unknown license (`image-registry.ts` lines 65-73). **m8-10 image is a table with rows "OXYGEN (%)" and "CYLINDER DURATION D Tank (415L)"**, i.e. an oxygen flow chart, not home PAP settings; it conflicts with m1-07 "not the same as receiving supplemental oxygen" | 3-5 days per step; 1-hour naps at home; take machine to bedroom; ask other CPAP users; reported benefits and "keep at it"; "first few weeks"; insurance limits on later mask changes; power naps under 30 min; partial use helps; not needed while awake (p.28); mask-fit videos; PAP machine types (p.10) | CIAS step 3 (source numbers 1, 2, 4, 5, 6); pregnancy-specific initiation or adjustment as pregnancy progresses (overview label only) | Yes: 3 contradictions (m8-02 fit with machine running, m8-08 humidity control, m8-09 power-nap and partial use), timing, ATS additions (`audit-m8.md` lines 187-193). Some CIAS items are test-locked out (test line 30) | Ready with caveats: coherent; note contradictions; consider hiding m8-10 chart (suggestion, not from any source) |
| **m9** (display 10) | Troubleshooting PAP (`module-09.ts` lines 29-39) | 14: m9-01 to m9-05, m9-q1, m9-06 to m9-10, m9-q2, m9-11, m9-q3 | Mask tightness, leaks and red eyes, water/whistling, skin, dryness, mouth opening, congestion/allergy, burping/bloating, cold air, cleaning; 3 keyed checks. Only pregnancy reference: m9-08 caution | All Section III pp.21-24 questions covered except travel and flying; 40 omissions (`audit-m9.md` lines 195-238) | 143 claims: 89 CIAS-supported (23 match, 61 paraphrase, 5 other section), 49 not in CIAS, 1 contradiction, 2 unresolved, 2 omissions (`audit-m9.md` lines 5-7). Keys CIAS-supported (lines 295-299) | 14/14 ES machine-drafted, not reviewed; open wording issues (`audit-m9.md` lines 163-178) | Renders EN/ES; test forbids travel/flying screens and mouth tape, insurance, rental, machine-on-floor (test lines 28, 30). 10 user-provided images unknown license (`image-registry.ts` lines 74-83). **m9-05 is a close-up of a real person's face with unknown origin** (README line 70); m9-04 has English text | Travel and flying (p.24); CIAS cleaning frequencies and vinegar method (p.24); petroleum creams, silicone mask, mouth tape (p.22); saline and nasal steroids safe in pregnancy, preferred to oral meds (p.23); allergy specifics, rental/insurance, head of bed up | Pregnancy-specific troubleshooting beyond nasal sprays; supply-replacement reminders (overview label only) | Yes: 13 items (`audit-m9.md` lines 279-293), incl. m9-05 contradiction and m9-08 pregnancy omission | Ready with caveats: hold m9-05 photo until origin confirmed; label ATS-derived content unreviewed |

### Context modules (not audited in depth)

| Module | Display | Screens | CIAS screenshot / app-written | Pregnancy content |
| --- | --- | --- | --- | --- |
| m1 Intro to Sleep Apnea | 1 | 10 | 3 / 7 | None in runtime text |
| m2 How Does Sleep Apnea Impact My Partner? | 2 | 8 | 7 / 1 | m2-01 newborn in bedroom; m2-04 untreated OSA "drastic effects on both the mother and the baby" (CIAS) |
| m3 OSA Outcomes and Motivation | 3 | 8 | 6 / 2 | Cesarean, heart problems at delivery, birth weight, GDM/BP/preeclampsia. m3-01, m3-04, m3-recap keep the CIAS tag but show app-rewritten text (`module-03.ts` lines 50-63); keys app-authored (lines 17-34) |
| m5 Sleep Hygiene Part 1 | 5 | 14 | 12 / 2 | m5-02, m5-q6, m5-11 |
| m5b Sleep Hygiene Part 2 | 6 | 17 | 14 / 3 | m5-17, m5-07 (CIAS tag, app-rewritten), m5-q3, m5-20, m5-10 |
| m7 Intimacy | 8 | 9 | 7 / 2 | m7-06, m7-q2 |

## Q1. Module IDs, titles, screens; module 10 or 11; legacy m8-m10

- **PAP initiation:** `m8` "Getting Started with PAP", display position 9. **PAP troubleshooting:** `m9` "Troubleshooting PAP", position 10. **Pregnancy and baby health:** `m4`, position 4 (outcome questions also in `m3`, position 3). **Pregnancy comorbidities:** `m6` "Pregnancy Comorbidities and PAP", position 7. Screen IDs are in the table; the IDs and display positions differ because `m5b` was inserted at position 6 (`docs/CURRICULUM_MIGRATION.md` line 5).
- **Module 10:** the tenth module shown is `m9` (`module-09.ts` line 31 `order: 10`; README line 23). There is no runtime module ID `m10` or `m11` (snapshot: m1, m2, m3, m4, m5, m5b, m6, m7, m8, m9).
- **Historical m10:** curricula older than v11 had PAP modules `m8`, `m9`, `m10`; migration discards their progress (`src/state/curriculum-migration.ts` lines 6, 11, 25, 37, 51-55; fixture IDs in `tests/content-and-progress.test.ts` lines 40-45). README line 83: `m5b` was used because `m10` is still removed by that migration.
- **m11:** no reference anywhere in `src`, `app`, `docs`, `tests`, `scripts`, `data`.
- **What legacy m8-m10 contained: no source found.** Docs say only "former PAP modules (m8–m10), which were replaced" (migration line 6) and that v11 removed "state from the earlier PAP modules" (`CURRICULUM_MIGRATION.md` line 9). Git history (12 commits) has no module-10 file; module-08/09 first appear in `b87023f`. `data/modules.ts` is an older 8-module structure with slug IDs (getting-started, troubleshooting, daily-care-travel, ...) that the learner route does not load (only a type import, `components/lessons/lesson-card.tsx` line 4), so it is not evidence of legacy m8-m10.

## Q2. Sources, fractions, flags, assets, Spanish

Covered per module in the table. Cross-cutting points:

- **Two different CIAS sources.** m4 and m6 come from CIAS app screenshots (`sourceIds: ['cias-screenshot-recovery']`, `helpers.ts` line 6). m8 and m9 come from the EZ-PAP planning document plus ATS (`helpers.ts` line 7). m4/m6 are not tagged to the EZ-PAP document even though EZ-PAP pp.16-19 covers the same outcomes.
- **ATS share cannot be measured.** The Oct 21 audit counts "not in CIAS (app or ATS)" together; no statement-level ATS mapping exists (`CLINICAL_SOURCE_REGISTRY.md` lines 9-11; `audit-m9.md` line 281).
- **Review flags.** No screen in the four modules sets `needsContentReview` or `reviewReason`. `clinicalReviewStatus` is `not_reviewed` on every screen; module-level `needs_revision` only on m6. `sourceConfidence` is set only on CIAS-screenshot screens (HIGH for all 18 in m4/m6).
- **Conflicting approval records.** `docs/BILINGUAL-CLINICAL-LANGUAGE-REVIEW.md` lines 7-9 (generated 2026-08-19, commit `e39e22c`) records clinical and Spanish status `APPROVED` for 101 screens, with no reviewer name or notes on any screen; it predates m8/m9 and approved the CIAS m4 recap that is no longer shown. Current runtime metadata says `not_reviewed`/`needs_revision`, `docs/CLINICAL_REVIEW.md` line 3 says "not clinically reviewed", and the Oct 21 README line 3 says nothing there is an approval. Treat the modules as unreviewed until this is reconciled.
- **Images.** Every m4, m8 and m9 image and 7 of 9 m6 images are `licenseStatus: 'unknown/user-provided'` in `src/content/image-registry.ts` (lines 32-34, 52-58, 65-83). `docs/IMAGE_SOURCE_REGISTRY.md` lines 31-62 say "Confirm reuse permissions before publication" for the m6-m9 ones and do not list the three m4 images at all.
- **Spanish.** Full screen parity in all four modules; nothing is bilingually reviewed; Spanish narration audio was not verified on a real voice (README line 118).

## Q3. Pregnancy and fetal content: CIAS vs app

### CIAS passages and whether the app includes them

| CIAS location | Quote (under 25 words) | In app? |
| --- | --- | --- |
| EZ-PAP p.1 | "Are you: not pregnant, pregnant, or postpartum (within 6 weeks of delivery)?" | No; no pregnancy-status branching or postpartum content |
| p.7 | "OSA is often linked to normal changes during pregnancy, such as weight gain and increased swelling." | No (similar app text at `module-04.ts` line 6 is overridden and not shown) |
| p.8 | "linked to complications during pregnancy, problems around delivery, and may negatively affect your baby’s development." | Partial: complications in m2-04, m3-01, m4-01; "baby's development" absent |
| p.9 | "Weight loss is generally not advised during pregnancy." | No |
| p.11 | "total weight gain of 25-35 lbs through the pregnancy" (BMI-based examples) | No |
| p.12 | "If you are pregnant, exercise is even more beneficial for you, your baby, and for decreasing the risk of complications" | Partial: m5-21 exercise targets and ACOG link only |
| p.12 | "regular exercise throughout pregnancy is associated with decreased need for Cesarean birth" | No |
| p.13 | "Some exercises to discontinue during pregnancy or engage in after consulting your doctor include" | No (source also has an unfilled "__ sea level") |
| p.13 | Warning signs: "Vaginal bleeding", "Abdominal pain", "Regular painful contractions", "Amniotic ﬂuid leakage" | No |
| p.14 | "If you are pregnant, side sleeping can decrease the pressure on your blood vessels" | Yes in substance (m5-20) |
| p.15 | "check with your doctor before using any products like nicotine replacement therapy if you’re pregnant." | No |
| p.15 | "smoking cessation at any point during pregnancy has health benefits for your baby." | No |
| p.16 | "High blood sugar during pregnancy has been associated with abnormally low blood sugar in newborn babies" | No |
| p.16 | "Untreated sleep apnea has also been shown to increase chances of needing a C-section" | Yes (m3-q1, m3-recap, m4-04 option) |
| p.16 | "low APGAR scores ... newborn baby jaundice, needing a newborn intensive-care unit (ICU)" | No (RDS, heavy birth weight appear only as unkeyed options in m4-q4) |
| p.16 | "Preeclampsia: high blood pressure after 20 weeks of pregnancy with some dysfunction in some organs." | Partial: organ effects in m4-06; "after 20 weeks" not in runtime text |
| p.16 | "Severe preeclampsia can lead to serious heart issues, severely high blood pressure, and heart-failure near the end of pregnancy." | Partial: heart failure absent |
| p.16 | "kidney failure, inability for your blood to clot, strokes, seizures, pulmonary edema" | Partial: kidney and platelets in m4-06; strokes, seizures, pulmonary edema absent |
| p.16 | "Preeclampsia also places the baby at risk for restricted growth" | Yes (m4-06) |
| p.17 | "OSA and Preeclampsia (OR = 2.63, 95% CI = 1.87-3.70)." (also GDM 1.71, PIH 1.93, preterm 1.75) | No statistics in app |
| p.17 | "PTB is a major cause of infant mortality" | No |
| p.17 | "gestational SDB was likely to affect the neurobehavioral development in infants" | No |
| p.17 | "mild OSA is associated with large for gestational age newborns, rather than increasing risk for SGA" | No. Conflicts in direction with the app's m3-q4 key "Abnormally low" and m3-recap "lower newborn birth weight" (`module-03.ts` lines 30-34, 57) |
| p.18 | "HDP, including preeclampsia, accounts for nearly 7% of all maternal deaths" | No |
| p.18 | "As many as ⅓ of fetuses of patients with preeclampsia will develop fetal growth restriction" | No (only the condition is named) |
| p.19 | "Children born after pregnancies affected by preeclampsia are noted to have higher systolic blood pressures and body mass indices." | No |
| p.25 | "Keeping the bedroom cool is particularly helpful for women and pregnant people undergoing night sweats" | Yes (m5-17) |
| p.26 | "sleeping about 6 hours or less has been linked to some adverse complications such as longer labor, Cesarean deliveries" | Partial (m5-q6 options only) |
| p.26 | "Feeling sleepy in the daytime may be related to normal pregnancy changes and hormonal shifts" | Partial (m5-10) |
| p.26 | "melatonin should be used with caution and avoided in pregnant and breastfeeding people." | No |
| p.27 | Outline headings: "Sleep postpartum", "Newborn sleep", "Postpartum sleep", "Physical activity postpartum" | No; headings only, **no source content** |
| CIAS screenshot M4-S09 (`cias-source.ts` line 38) | Recap label "Serious heart issues (heart disease, heart failure)" and 14 other labels | No longer shown (recap replaced) |
| CIAS screenshot m3-04 (`cias-source.ts` line 26) | "This ensures the health of both you and your baby during and after pregnancy!" | No (rewritten in app) |

No CIAS source (document or screenshots) gives evidence that PAP use improves fetal or neonatal outcomes; the m3-04 sentence above is an unreferenced assertion.

### App pregnancy or fetal claims with no CIAS text or no citation

| Screen | Claim | Status |
| --- | --- | --- |
| m4-recap image `pap-treatment-benefits` | Arrows from consistent PAP to well-controlled stress, blood pressure, blood sugar | CIAS-origin drawing (labels match m3-04), shown on m4. No EZ-PAP or literature support found; repo policy says not to infer the arrows (`cias-source.ts` line 26; `CIAS-ELI-REVIEW-QUEUE.md` M4-S09) |
| m4-q3, m4-recap | PAP treats obstructive breathing, no guarantee against complications; OSA associated with GDM and hypertensive disorders | App-written; consistent with EZ-PAP pp.16-17 but no statement-level citation |
| m3-q4 key, m3-recap | Lower newborn birth weight | App-authored key on a CIAS question with no recovered key; EZ-PAP p.17 says the direction depends on severity |
| m3-q1, m3-q3 explanations | Cesarean-linked conditions; cardiovascular strain; option explanations | App-written, no citation (`module-03.ts` lines 17-29) |
| m3-01, m3-04, m3-recap, m5-07, m5-08 | Outcome, PAP, caffeine and meal statements | Tagged CIAS but text is not in the screenshot archive (verbatim check) |
| m5-q3 | Caffeine limits in pregnancy | App-written; caffeine sources unresolved (`CLINICAL_SOURCE_REGISTRY.md` line 26) |
| m6-02, m6-04, m6-05 | Prevalence up to 42%, 30-80%, ~20% | CIAS text, no citation anywhere |
| m6-03, m6-07 | Fluticasone, budesonide, Afrin, H2 blockers, PPIs in pregnancy | CIAS text, no citation; EZ-PAP p.23 supports only saline and nasal steroids |
| m6-07, m6-08 images | Extra heartburn and anxiety advice | Third-party images, unknown origin, no citation |
| m9-08 | "especially during pregnancy" caution for nasal sprays | App-written; conflicts with EZ-PAP p.23 and m6-03 |

## Q4. CIAS PAP initiation and troubleshooting content not in m8/m9

The Oct 21 audit is complete and its quotes were script-checked; I re-read both reports and the EZ-PAP pages and found nothing to add except the overview-label gaps.

- **Initiation (m8), source available:** 3-5 days per step; 1-hour scheduled naps at home and "relax and unwind"; moving the machine to the bedroom; asking other CPAP users and "Support comes in many forms" (p.19); reported benefits and "keep at it"; "first few weeks"; insurance limits on later mask changes; power naps under 30 minutes may skip CPAP; partial use still helps (p.20); no need to wear CPAP awake or active (p.28); mask-fit and How CPAP Works videos (pp.27-28); machine types and cm H2O (p.10; m1-07 covers basics only). Source: `audit-m8.md` lines 147-166.
- **Troubleshooting (m9), source available:** travel CPAP, battery and RV power, flying (carry-on or checked, x-ray, TSA) (p.24); cleaning frequencies daily/weekly/monthly with vinegar and boiled-water options (p.24); petroleum creams and hypoallergenic silicone mask (p.22); mouth tape with doctor check (p.22); hear or feel a leak, "switch back to auto", whistling from condensation, room humidifier, humidifier types (pp.21-22); CPAP can worsen allergies, lift machine from dust, pets, vacuuming, oral allergy medicine, saline and steroids safe in pregnancy and preferred to oral meds, spray video (p.23); renting and insurance (p.21); head of bed up for bloating (p.23). Source: `audit-m9.md` lines 195-238.
- **Deliberately locked out by test:** travel/flying screens, "less than 30 minutes", "mouth tap", "insurance", "rental", "machine on the floor" (`tests/cias-module-source-boundaries.test.ts` lines 28, 30). Restoring any of these needs a content decision and a test change.
- **Internal CIAS conflicts to resolve before restoring:** machine on the floor (p.22) vs lift it from dust (p.23); "non-petroleum-based cream" vs "regular vaseline" (p.23); antihistamines worsen OSA (p.14) vs oral allergy medicine may help (p.23).
- **No source found:** pregnancy-specific PAP set-up or adjustment as pregnancy progresses, and supply reminders (overview labels only); CIAS acclimation step 3.

## Q5. Proposed later modules

**CIAS topic overview** (`Sleep_Apnea_CIAS_Overview.png`, labels only):

| Column | Implemented? | Source for content |
| --- | --- | --- |
| Sleep education | Yes (m5, m5b) | CIAS screenshots, EZ-PAP Section V |
| OSA, outcomes, motivation | Yes (m1, m3, m4) | CIAS screenshots, EZ-PAP pp.2-19 |
| Device education (incl. "Adjustments with pregnancy progression / seasons", "Reminders for supplies") | Partly (m8, m9) | EZ-PAP Sections II-III; the two quoted sub-topics: **no source found** |
| Pregnancy, comorbidities, and PAP (incl. "Medication safety") | Yes (m6) | CIAS screenshots |
| Partner and other family members role | Partly (m2) | EZ-PAP p.28-29; family-member and dating content (p.29) not in app |
| Intimacy | Yes (m7) | CIAS screenshots, EZ-PAP Section VI |
| **Planning for delivery hospitalization** (bring CPAP to hospital, anesthesia team, pain control and OSA, naps and CPAP) | **No** | **No source found.** SASM-SOAP-2023 is a candidate in `CLINICAL_SOURCE_REGISTRY.md` line 12; not read in this audit |
| **Planning for the postpartum period** (natural history of OSA, co-rooming, CPAP and co-rooming, social support, naps) | **No** | **No source found** (EZ-PAP p.27 headings only) |

**Next.js prototype topics.** The prototype was not found, so its list could not be confirmed. Against local sources:

| Topic | Source material | In app |
| --- | --- | --- |
| Anxiety and adjustment | CIAS m6-05, m6-08; EZ-PAP p.20 adjustment, p.26 stress | Yes (m6, m8-08) |
| Nasal congestion | CIAS m6-02, m6-03; EZ-PAP pp.14, 23 | Yes (m6, m9-08) |
| Reflux and sleep | CIAS m6-04, m6-07; EZ-PAP pp.25-26 | Yes (m6). The title "Reflux and Sleep" survives only in unused app-written m6-04 (`module-06.ts` line 24) |
| PAP comfort | EZ-PAP pp.20-23 | Yes (m8-08, m9) |
| Motivation and continued use | CIAS m3-04; EZ-PAP p.19, p.20 ("keep at it", partial use), p.29 partner accountability | Partly; no dedicated module, and the EZ-PAP encouragement and partial-use messages are absent from m8 |

## Items to resolve before any internal demo

1. m8-10 image is an oxygen flow/cylinder table on the PAP settings screen. **Withheld on this branch.**
2. m9-05 close-up face photo of unknown origin; a patient photo would need written authorization. **Withheld on this branch.**
3. m4 recap diagram implies PAP controls blood pressure and blood sugar.
4. 7 ungraded CIAS questions in m4 and m6 with no feedback, including options such as Autism, ADHD and stillbirth.
5. The August "APPROVED" packet conflicts with current `not_reviewed` metadata and `CLINICAL_REVIEW.md`.
6. Cross-module conflicts: who adjusts humidity and ramp (m6 vs m8), and nasal sprays in pregnancy (m6-03 vs m9-08).

No PHI was found in any file read. No medical content was added or changed.
