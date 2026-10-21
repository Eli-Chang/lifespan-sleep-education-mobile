# CIAS to Sleep App Content Gap Audit

## Executive Summary

The recovered CIAS archive is the authority for prior learner-facing wording. The canonical current learner route is `app/lesson/[moduleId]/[screenId].tsx`, which reads `src/content/index.ts` and then the English or Spanish module files under `src/content`. The current English app contains 82 screens across the same 7 modules; the recovered CIAS archive contains 77 screens.

The comparison found **0 EXACT_MATCH**, **28 CLOSE_MATCH**, **40 MATERIAL_DRIFT**, **8 MISSING_FROM_APP**, **1 AMBIGUOUS_MAPPING**, and **28 current app-only screens**. This is a migration plan, not an implementation. No curriculum, application, Worker, Groq, GPT-OSS, Cloudflare, Spanish, or production files were changed.

The current curriculum uses `curriculum-master-v3` and its canonical constructors set `sourceScreenshotIds: []`; the recovered screenshots therefore do not have direct source-backed current-content links. Repository evidence supports calling this reconstructed/provenance drift, but does not establish which model or person generated the current wording.

## Source and Comparison Scope

### CIAS authority

- Archive: docs/CIAS-SCREENSHOT-SOURCE-ARCHIVE.json
- Human-readable recovery report: docs/CIAS-SCREENSHOT-CONTENT-REPORT.md
- Recovered records audited: 77
- Recovered questions/reflections audited: 30
- Recovered source confidence: 67 HIGH, 10 MEDIUM, 0 LOW
- CIAS answer key status: NOT RECOVERED FROM SOURCE

### Canonical current curriculum

- Learner route: app/lesson/[moduleId]/[screenId].tsx
- Locale selection: src/content/index.ts
- English registry: src/content/en/index.ts
- English modules: src/content/en/modules/module-01.ts through module-07.ts
- Spanish registry: src/content/es/index.ts
- Spanish modules: src/content/es/modules/module-01.ts through module-07.ts
- Spanish transformation: src/content/es/localize.ts
- Shared constructors: src/content/helpers.ts
`data/lessons.ts` was not treated as canonical learner curriculum because the active lesson route imports `src/content`; the only search hit for the old type is an unused-looking lesson-card component, not the active route.

### Excluded sources

Current-app render screenshots, QA/evaluation artifacts, generated image manifests, and other derived outputs were not used to fill CIAS gaps. No CIAS login, SSO, email verification, external CIAS access, or browser action occurred.

## Module-Level Comparison

| Module | CIAS Screens | App Screens | CIAS Questions | App Choice Questions | App Content | App AI Activities | App Summaries | App-Only Screens | Main Drift |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| M1 Introduction to Sleep Apnea | 6 | 12 | 2 | 3 | 7 | 1 | 1 | 6 | CLOSE_MATCH=3, MATERIAL_DRIFT=3 |
| M2 How does sleep apnea impact my partner? | 7 | 9 | 3 | 3 | 4 | 1 | 1 | 3 | CLOSE_MATCH=2, MATERIAL_DRIFT=5 |
| M3 OSA Outcomes & Motivations | 6 | 9 | 3 | 2 | 4 | 2 | 1 | 5 | CLOSE_MATCH=1, MATERIAL_DRIFT=4, AMBIGUOUS_MAPPING=1 |
| M4 Sleep Apnea And The Health Of Your Pregnancy and Baby | 9 | 12 | 4 | 3 | 6 | 2 | 1 | 4 | CLOSE_MATCH=2, MATERIAL_DRIFT=6, MISSING_FROM_APP=1 |
| M5 Healthy Sleep Hygiene | 32 | 19 | 13 | 4 | 11 | 3 | 1 | 3 | CLOSE_MATCH=12, MATERIAL_DRIFT=14, MISSING_FROM_APP=6 |
| M6 Pregnancy Co-morbidities and PAP | 10 | 12 | 3 | 3 | 6 | 2 | 1 | 4 | CLOSE_MATCH=4, MATERIAL_DRIFT=5, MISSING_FROM_APP=1 |
| M7 Intimacy | 7 | 9 | 2 | 3 | 4 | 1 | 1 | 3 | CLOSE_MATCH=4, MATERIAL_DRIFT=3 |

Totals: 77 CIAS screens; 82 current English screens; 30 CIAS questions/reflections; 21 current choice-question screens; 12 current AI activities; 7 current summaries. The current English and Spanish structures each contain 82 screens.

## Screen-Level Findings

Each row below preserves the CIAS record ID, source heading, defensible current location, fidelity dimensions, readiness, and the concrete difference summary. Full source-visible text remains in the recovery archive; full question stems/options and current counterparts are in the companion question audit.

| CIAS ID | Source heading | Current app location | Mapping | Text | Options | Interaction | Ordering | Readiness | Difference |
|---|---|---|---|---|---|---|---|---|---|
| M1-S01 | Introduction to Sleep Apnea | m1-01 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | CIAS is a module-opening overview; current m1-01 is an expanded OSA introduction with different wording and added explanation. |
| M1-S02 | Obstructive sleep apnea (OSA) | m1-02, m1-03 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | SPLIT_OR_COMBINED | SAFE_TO_RESTORE | CIAS uses a Mayo diagram contrasting typical and obstructive airways; current replaces it with prose and a five-step explanation, with no matching graphic reference. |
| M1-S03 | Physiology of Sleep Apnea | m1-03 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | ELI_REVIEW_REQUIRED | Both explain throat relaxation, obstruction, and repeated interruptions; current uses a numbered physiology explanation and omits the CIAS video/graphic context. |
| M1-S04 | True or false? You have obstructive sleep apnea even if you don’t snore. | m1-q1 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | PARTIAL | RESTORE_TEXT_ONLY | CIAS tests whether OSA can occur without snoring; current tests the mechanism of OSA and has four different choices. |
| M1-S05 | Symptoms of Sleep Apnea | m1-05 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | ELI_REVIEW_REQUIRED | Both present OSA symptoms; current reorganizes the symptom lists, removes the CIAS graphic labels/source, and adds a diagnostic caution. |
| M1-S06 | What are some of the symptoms of OSA you've noticed in your life? | m1-r1 | MATERIAL_DRIFT | LOW | PARTIAL | DIFFERENT_PURPOSE | PARTIAL | ELI_REVIEW_REQUIRED | CIAS is a multi-select symptom question with eight visible options; current is a multi-select reflection with nine different choices and a different interaction purpose. |
| M2-S01 | How does sleep apnea impact my partner? | m2-01 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both introduce partner/shared-sleep impact; current broadens the discussion of worry and fatigue while omitting the CIAS newborn, CPAP, and intimacy preview. |
| M2-S02 | What aspect of your sleep apnea bothers your partner the most? | m2-r1 | MATERIAL_DRIFT | LOW | NONE | DIFFERENT_TYPE | PARTIAL | RESTORE_TEXT_ONLY | CIAS asks which partner impact bothers the partner most as a single-select question with four options; current asks whether anyone was affected as a multi-select reflection with five options. |
| M2-S03 | How can CPAP help improve your partner's sleeping experience? | m2-03 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both explain that PAP/CPAP can reduce snoring and improve a partner's sleep; current uses conditional, non-guaranteed wording. |
| M2-S04 | How can CPAP help improve intimacy? (continued) | m2-03, m2-04 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | SPLIT_OR_COMBINED | SAFE_TO_RESTORE | CIAS gives a specific 41%/71% study and increased-intimacy claim; current splits shared-sleep adjustment across screens and contains no corresponding statistics. |
| M2-S05 | Using CPAP while sleeping with your partner | m2-03, m2-04 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | SPLIT_OR_COMBINED | SAFE_TO_RESTORE | CIAS describes adaptation, improved intimacy, adherence/accountability, and pregnancy urgency; current gives general concerns and support guidance without those visible claims. |
| M2-S06 | Question time! Which of the following statements is correct? (select all that apply). | m2-q2 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | PARTIAL | RESTORE_TEXT_ONLY | Both use a multi-select PAP/partner topic, but current asks which concerns to discuss with the team and uses six choices instead of the four CIAS partner-benefit statements. |
| M2-S07 | True or False? | m2-q1 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | PARTIAL | RESTORE_TEXT_ONLY | CIAS is a true/false relationship-satisfaction statement; current is a single-select supportive-response scenario. |
| M3-S01 | OSA Outcomes & Motivations | m3-01 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both introduce OSA outcomes and motivation; current reframes the material around health associations and PAP barriers without the CIAS baby/cesarean focus. |
| M3-S02 | True or False? (This question is for learning, not a comprehension check) | m3-q1 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | PARTIAL | RESTORE_TEXT_ONLY | CIAS is a true/false statement about cesarean-risk comorbidity; current asks for the definition of an association. |
| M3-S03 | Select the right answer: (This question is for learning, not a comprehension check) | m3-q1 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | PARTIAL | RESTORE_TEXT_ONLY | CIAS asks about higher heart-problem risk during delivery admission with four choices; current has no outcome-specific heart-problem question. |
| M3-S04 | Select the right answer: (This question is for learning, not a comprehension check) | m3-q1 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | PARTIAL | RESTORE_TEXT_ONLY | CIAS asks whether SDB is associated with abnormally high, normal, or abnormally low newborn birth weight; current has no birth-weight choice. |
| M3-S05 | Overview | m3-recap | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both provide a recap, but current covers risk, barriers, and realistic plans and omits the CIAS cesarean, heart-problem, and low-birth-weight bullets. |
| M3-S06 | Motivations: Why is it so important to use a PAP machine during pregnancy? | m3-01, m3-04 | AMBIGUOUS_MAPPING | PARTIAL_UNCERTAIN | NOT_APPLICABLE | NOT_APPLICABLE | UNCERTAIN | ELI_REVIEW_REQUIRED | CIAS motivation content includes PAP mechanism and a diagram of stress, blood pressure, and blood sugar; current distributes motivation across general OSA-treatment and planning screens. Source module grouping/order is explicitly uncertain. |
| M4-S01 | Sleep Apnea And The Health Of Your Pregnancy and Baby | m4-01 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both introduce pregnancy and OSA; current adds symptom caveats and removes the CIAS interactive framing. |
| M4-S02 | Which of the following conditions are you at risk of if you have sleep apnea during pregnancy? Give it your best guess! | m4-q1 | MATERIAL_DRIFT | LOW | NONE | DIFFERENT_TYPE | PARTIAL | RESTORE_TEXT_ONLY | CIAS is a five-option multi-select risk-condition guess; current is a single-select interpretation of an OSA/gestational-diabetes association. |
| M4-S03 | What is gestational diabetes (high blood sugar during pregnancy)? | m4-03, m4-04 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | SPLIT_OR_COMBINED | SAFE_TO_RESTORE | CIAS points to a Blue Cross Blue Shield video; current replaces it with app-authored gestational-diabetes definition and monitoring prose. |
| M4-S04 | Which of the following are complications for the mother if she has gestational diabetes? | m4-q2 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | PARTIAL | RESTORE_TEXT_ONLY | CIAS asks about maternal gestational-diabetes complications with five choices; current asks general gestational-diabetes statements with a different five-choice set. |
| M4-S05 | Which of the following are complications for the baby if the mother has gestational diabetes? | m4-q2, m4-04 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | SPLIT_OR_COMBINED | RESTORE_TEXT_ONLY | CIAS asks about baby complications including respiratory distress, excessive birth weight, and premature birth/stillbirth; current discusses patient/developing-baby impact without that choice set. |
| M4-S06 | What is preeclampsia? | m4-05 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both cover preeclampsia; current defines it in prose instead of using the CIAS video context. |
| M4-S07 | What is preeclampsia? (continued) | m4-05, m4-06 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | SPLIT_OR_COMBINED | SAFE_TO_RESTORE | CIAS gives organ-damage and fetal-growth-restriction details; current gives a cautious definition/association overview and omits those visible details. |
| M4-S08 | Which of the following are complications for the mother or baby if the mother has preeclampsia? | NONE | MISSING_FROM_APP | NONE | NONE | NO_COUNTERPART | NO_COUNTERPART | RESTORE_TEXT_ONLY | CIAS asks about maternal or fetal preeclampsia complications with five options; no current preeclampsia-complication question is present. |
| M4-S09 | Let's recap! | m4-recap | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | ELI_REVIEW_REQUIRED | Both recap pregnancy/OSA, but CIAS uses a labeled diagram while current provides prose and no equivalent diagram. |
| M5-S01 | Healthy Sleep Hygiene | m5-01 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | CIAS opens the sleep-hygiene module; current m5-01 defines sleep hygiene and adds an OSA/insomnia boundary. |
| M5-S02 | Why is getting good sleep so important during pregnancy? | m5-02 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | CIAS emphasizes pregnancy benefits and adverse-outcome links; current discusses sleep disruption during pregnancy without the CIAS benefit list. |
| M5-S03 | What is Sleep Hygiene? | m5-01 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both define sleep hygiene, but current is shorter and does not preserve the complete CIAS topic list. |
| M5-S04 | Comprehension Check 1: The Pitfalls of Poor Sleep | NONE | MISSING_FROM_APP | NONE | NONE | NO_COUNTERPART | NO_COUNTERPART | RESTORE_TEXT_ONLY | CIAS asks about consequences of poor sleep; no current choice question covers the CIAS depression, chronic-disease, and daytime-fatigue options. |
| M5-S05 | Comprehension Check 2: The Pitfalls of Poor Sleep During Pregnancy | m5-02 | MATERIAL_DRIFT | LOW | NONE | DIFFERENT_TYPE | PARTIAL | RESTORE_TEXT_ONLY | CIAS asks about consequences of poor sleep during pregnancy; current has related pregnancy-sleep prose but no equivalent question or option set. |
| M5-S06 | Establishing a Good Sleep Routine Part 1: Bedtime Routine | m5-04 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both cover a calming bedtime/wind-down routine; current uses different examples and more cautious wording. |
| M5-S07 | Establishing a Good Sleep Routine Part 2: Sleep/Wake Times | m5-03 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both cover consistent sleep/wake timing; current reframes the advice around a wake-time anchor and flexibility. |
| M5-S08 | Establishing a Good Sleep Routine Part 3: Avoiding Blue Light Exposure Close to Bedtime | m5-05 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both cover light/blue-light timing; current preserves the day/night signal concept but removes the CIAS detailed night-shift/red-filter instructions. |
| M5-S09 | Comprehension Check 3: Sleep Hygiene Components | m5-q2 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | PARTIAL | RESTORE_TEXT_ONLY | CIAS asks for three sleep-hygiene activities; current has a sleep-environment question with a different purpose and choices. |
| M5-S10 | Addressing Difficulty When Falling Asleep | m5-11 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both advise a quiet, low-light activity and returning to bed when sleepy; current removes the CIAS 20-minute threshold and several explicit prohibitions. |
| M5-S11 | Comprehension Check 4: Sleep Routine | m5-q1 | MATERIAL_DRIFT | LOW | NONE | DIFFERENT_TYPE | PARTIAL | RESTORE_TEXT_ONLY | CIAS asks for three sleep-routine components; current asks which change supports a consistent sleep-wake pattern and uses a different single-select format. |
| M5-S12 | The Importance of Sunshine | m5-05 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | CIAS has a dedicated sunshine screen; current includes daytime bright-light guidance inside the light screen without the same standalone screen or wording. |
| M5-S13 | Comprehension Check 5: Difficulty When Falling Asleep | m5-q4 | MATERIAL_DRIFT | LOW | NONE | DIFFERENT_TYPE | PARTIAL | RESTORE_TEXT_ONLY | Both address difficulty falling asleep, but CIAS is a six-option multi-select question and current is a four-option single-select question. |
| M5-S14 | Establishing a Good Sleep Environment | m5-06 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both address bedroom use/environment; current combines stimulus control, light, noise, temperature, and PAP setup instead of preserving the separate CIAS screen. |
| M5-S15 | Establishing a Good Sleep Environment | m5-06 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both address noise disturbance; current retains the topic but combines it into a broader environment screen. |
| M5-S16 | Establishing a Good Sleep Environment | m5-06 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both address visual darkness/light; current retains the general point but removes the CIAS safety and neighborhood-light details. |
| M5-S17 | Establishing a Good Sleep Environment | m5-06 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both address a cool bedroom; current retains comfort/temperature guidance without the CIAS ~65°F pregnancy-specific explanation. |
| M5-S18 | Comprehension Check 6: The Importance of Sunshine | NONE | MISSING_FROM_APP | NONE | NONE | NO_COUNTERPART | NO_COUNTERPART | ELI_REVIEW_REQUIRED | CIAS asks why morning sunshine benefits sleep; current has no dedicated sunshine question and the visible CIAS option set is potentially cropped. |
| M5-S19 | Caffeine | m5-07 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both discuss caffeine and sleep, but CIAS includes pregnancy-stage timing and a visible 200mg statement while current avoids a personalized amount. |
| M5-S20 | Comprehension Check 7: Sleep Environment | m5-q2 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | PARTIAL | RESTORE_TEXT_ONLY | CIAS asks for three sleep-environment components; current has a different six-option environment question. |
| M5-S21 | Chrononutrition (Meal Timing for Sleep) | m5-08 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | CIAS presents chrononutrition, earlier meals/hydration, and a 4–5-hour meal cutoff; current only provides general meal comfort/reflux guidance. |
| M5-S22 | Comprehension Check 8: Caffeine | m5-q3 | MATERIAL_DRIFT | LOW | NONE | DIFFERENT_TYPE | PARTIAL | ELI_REVIEW_REQUIRED | Both ask about caffeine, but current is a four-option single-select question and does not preserve the CIAS pregnancy-stage option set. |
| M5-S23 | The Importance of Nutrition | m5-08 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | CIAS gives nutrition and meal-quality guidance; current has no dedicated nutrition screen and only discusses meals in relation to comfort/reflux. |
| M5-S24 | Comprehension Check 9: Chrononutrition | NONE | MISSING_FROM_APP | NONE | NONE | NO_COUNTERPART | NO_COUNTERPART | RESTORE_TEXT_ONLY | CIAS asks for three chrononutrition tips; no current chrononutrition question is present. |
| M5-S25 | The Importance of Regular Exercise | m5-09 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both address exercise and sleep, but current removes the CIAS explicit 150-minute/2-session recommendations and source link. |
| M5-S26 | Comprehension Check 10: The Importance of Nutrition | NONE | MISSING_FROM_APP | NONE | NONE | NO_COUNTERPART | NO_COUNTERPART | ELI_REVIEW_REQUIRED | CIAS asks which foods support a healthy diet and sleep; no current nutrition-choice question is present and the visible CIAS options may continue below the crop. |
| M5-S27 | Addressing Naps | m5-10 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both address naps and their effect on nighttime sleep; current keeps the topic but avoids a fixed 20-minute rule. |
| M5-S28 | Stress Management for Sleep | NONE | MISSING_FROM_APP | NONE | NOT_APPLICABLE | NOT_APPLICABLE | NO_COUNTERPART | SAFE_TO_RESTORE | CIAS provides a dedicated stress-management screen with therapy, medication, and mindfulness; current has no dedicated stress-management screen. |
| M5-S29 | Sleeping Position | NONE | MISSING_FROM_APP | NONE | NOT_APPLICABLE | NOT_APPLICABLE | NO_COUNTERPART | SAFE_TO_RESTORE | CIAS provides a dedicated post-28-week side-sleeping/position screen; current has no dedicated sleeping-position screen. |
| M5-S30 | Comprehension Check 11: The Importance of Regular Exercise | m5-09 | MATERIAL_DRIFT | LOW | NONE | DIFFERENT_TYPE | PARTIAL | ELI_REVIEW_REQUIRED | CIAS asks for three exercise recommendations; current has exercise prose but no equivalent exercise question, and the source option set is cropped during review. |
| M5-S31 | Comprehension Check 12: Addressing Naps and Sleeping Position | m5-10 | MATERIAL_DRIFT | LOW | NONE | DIFFERENT_TYPE | PARTIAL | RESTORE_TEXT_ONLY | CIAS combines naps and sleeping position in a six-option question; current has nap prose but no position counterpart. |
| M5-S32 | Final Recap | m5-recap | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | PARTIAL | ELI_REVIEW_REQUIRED | Both recap sleep hygiene, but CIAS includes a long practice list and an open-ended prompt; current is a summary only with no open-ended counterpart. |
| M6-S01 | Pregnancy Co-morbidities and PAP | m6-01 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both introduce pregnancy-related barriers to PAP; current reframes the section around describing and solving barriers. |
| M6-S02 | Nasal Congestion | m6-02 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both cover pregnancy nasal congestion and PAP comfort; current is more cautious about cause and asks the learner to record patterns. |
| M6-S03 | Nasal Congestion Treatment | m6-03 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | CIAS gives specific saline, steroid-spray, spray-direction, and Afrin guidance; current preserves the topic but moves to cautious team-guided support without those exact recommendations. |
| M6-S04 | Gastroesophageal Reflux Disease (GERD) | m6-04 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both explain pregnancy-related reflux and its sleep impact; current uses a shorter general definition and explicitly avoids diagnosis. |
| M6-S05 | Comprehension Check 1: | m6-q1 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | PARTIAL | RESTORE_TEXT_ONLY | CIAS asks for recommended nasal-congestion treatments; current asks what information to record and changes both purpose and choices. |
| M6-S06 | Gastroesophageal Reflux Disease (GERD) Treatment | NONE | MISSING_FROM_APP | NONE | NOT_APPLICABLE | NOT_APPLICABLE | NO_COUNTERPART | SAFE_TO_RESTORE | CIAS provides a dedicated GERD-treatment screen with diet, bed elevation, left-side sleeping, antacids, and medication discussion; current has no treatment counterpart. |
| M6-S07 | Anxiety | m6-05 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both cover anxiety/claustrophobia and PAP; current preserves the barrier concept but omits the CIAS specific mask-practice, breathing, humidity, and ramp details. |
| M6-S08 | Comprehension Check 2: GERD Treatments | m6-q2 | MATERIAL_DRIFT | LOW | NONE | DIFFERENT_TYPE | PARTIAL | RESTORE_TEXT_ONLY | Both ask about GERD treatment, but current asks for the most appropriate general statement and uses four choices rather than the six CIAS treatment options. |
| M6-S09 | Anxiety Treatment | m6-03, m6-05 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | SPLIT_OR_COMBINED | SAFE_TO_RESTORE | CIAS gives lifestyle, counseling/CBT, and medication-escalation guidance; current separates barrier description from team-guidance and does not preserve those details. |
| M6-S10 | Comprehension Check 3: Anxiety Treatments | m6-q3 | MATERIAL_DRIFT | LOW | NONE | DIFFERENT_TYPE | PARTIAL | RESTORE_TEXT_ONLY | CIAS asks which anxiety treatments are recommended; current asks who should guide pregnancy-safe medication decisions and uses a different four-choice purpose. |
| M7-S01 | Intimacy | m7-01 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both introduce intimacy and its relationship to OSA/PAP; current expands the definition and explicitly permits skipping personal questions. |
| M7-S02 | What is Intimacy? | m7-01, m7-02 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | SPLIT_OR_COMBINED | SAFE_TO_RESTORE | Both define intimacy as more than intercourse and include closeness/communication; current distributes the relationship effects across two screens. |
| M7-S03 | How does sleep apnea impact my partner? | m7-02, m7-03, m7-04 | MATERIAL_DRIFT | LOW | NOT_APPLICABLE | NOT_APPLICABLE | SPLIT_OR_COMBINED | SAFE_TO_RESTORE | CIAS explains PAP use during sleep versus intimacy and includes 90%/75% partner statistics; current distributes practical adjustment and usage guidance without those statistics. |
| M7-S04 | Comprehension Check 1: | m7-04 | MATERIAL_DRIFT | LOW | NONE | DIFFERENT_TYPE | PARTIAL | RESTORE_TEXT_ONLY | CIAS is a six-option multi-select question about when to wear PAP; current has prose usage guidance but no equivalent question. |
| M7-S05 | Tips for Intimacy with Sleep Apnea | m7-03 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | PARTIAL | SAFE_TO_RESTORE | Both give practical intimacy/PAP adjustment advice; current uses broader, non-prescriptive language and omits the CIAS little-spoon example. |
| M7-S06 | How does sleep apnea impact my sex life? | m7-02, m7-03 | CLOSE_MATCH | PARTIAL | NOT_APPLICABLE | NOT_APPLICABLE | SPLIT_OR_COMBINED | SAFE_TO_RESTORE | Both discuss pregnancy, sleep apnea, PAP, energy, mood, body image, and sexual health; current preserves the themes but changes the wording and structure. |
| M7-S07 | Comprehension Check 1: | m7-q1, m7-q2 | MATERIAL_DRIFT | LOW | PARTIAL | SAME_CONTROL_DIFFERENT_CONTENT | SPLIT_OR_COMBINED | RESTORE_TEXT_ONLY | CIAS asks which statements describe pregnancy/OSA/CPAP effects on sex drive; current uses a general PAP-intimacy question and a professional-discussion topics question. |

### Representative exact differences

- M1-S04 CIAS asks: “True or false? You have obstructive sleep apnea even if you don’t snore.” The current counterpart asks which mechanism best matches OSA and has four different choices.
- M2-S02 CIAS asks which aspect bothers the partner most, with Snoring / Night awakenings / Changes in mood/energy / Sleeping in separate rooms. The current counterpart is a five-option reflection about whether anyone was affected.
- M3-S03 CIAS asks about higher heart-problem risk during delivery admission; current m3-q1 asks what “associated with” means and does not preserve the outcome-specific question.
- M4-S04 CIAS asks about maternal gestational-diabetes complications; current m4-q2 asks general gestational-diabetes statements with a different option set.
- M5-S22 CIAS visibly includes the 200mg early-pregnancy option and late-pregnancy metabolic-delay option; current m5-q3 instead asks a general caffeine-sensitivity question and does not preserve that choice set.
- M6-S05 CIAS asks for nasal-congestion treatments including saline, intranasal steroids, and Afrin-related choices; current m6-q1 asks what symptom information to record.
- M7-S04 CIAS asks when to wear the PAP mask with six options; current m7-04 provides prose usage guidance but no equivalent question.

## Recovered Question Comparison

All 30 recovered question/reflection records are audited in:

- docs/CIAS-QUESTION-COMPARISON.md
- question_comparison in docs/CIAS-TO-SLEEP-APP-CONTENT-MAP.json

Question future-action counts:

- RESTORE_CIAS_EXACTLY: 0
- RESTORE_CIAS_WITH_SOURCE_REVIEW: 21
- KEEP_CURRENT: 0
- NO_CURRENT_COUNTERPART: 5
- NEEDS_ELI_DECISION: 4

Every recovered question records `answer_key_source_status: NOT RECOVERED FROM SOURCE`. Current answer keys, where present, are labeled current-app-only state and are never represented as original CIAS answers.

## Safe-to-Restore Content

Implementation readiness counts:

- SAFE_TO_RESTORE: 43
- RESTORE_TEXT_ONLY: 24
- ELI_REVIEW_REQUIRED: 10
- NO_REPLACEMENT_NEEDED: 0

SAFE_TO_RESTORE is limited to HIGH-confidence, visible non-question CIAS records. The IDs are:

- M1-S01
- M1-S02
- M2-S01
- M2-S03
- M2-S04
- M2-S05
- M3-S01
- M3-S05
- M4-S01
- M4-S03
- M4-S06
- M4-S07
- M5-S01
- M5-S02
- M5-S03
- M5-S06
- M5-S07
- M5-S08
- M5-S10
- M5-S12
- M5-S14
- M5-S15
- M5-S16
- M5-S17
- M5-S19
- M5-S21
- M5-S23
- M5-S25
- M5-S27
- M5-S28
- M5-S29
- M6-S01
- M6-S02
- M6-S03
- M6-S04
- M6-S06
- M6-S07
- M6-S09
- M7-S01
- M7-S02
- M7-S03
- M7-S05
- M7-S06

RESTORE_TEXT_ONLY is used for HIGH-confidence question/reflection records because the visible stem/options are reliable but hidden answer/reveal logic is not established:

- M1-S04
- M2-S02
- M2-S06
- M2-S07
- M3-S02
- M3-S03
- M3-S04
- M4-S02
- M4-S04
- M4-S05
- M4-S08
- M5-S04
- M5-S05
- M5-S09
- M5-S11
- M5-S13
- M5-S20
- M5-S24
- M5-S31
- M6-S05
- M6-S08
- M6-S10
- M7-S04
- M7-S07

## Eli Review Required

The focused queue is in docs/CIAS-ELI-REVIEW-QUEUE.md and contains 10 items only. It includes M1-S03, M1-S05, M1-S06, M3-S06, M4-S09, M5-S18, M5-S22, M5-S26, M5-S30, and M5-S32.

Cropped or medium-confidence source was not silently completed. Current app wording was not used to resolve any source gap.

## Current App Content With No CIAS Counterpart

The current English curriculum contains 28 screen records not used as defensible counterparts to a recovered CIAS record. They are recorded as `APP_ONLY_CONTENT` in the machine-readable map:

- m1 m1-04 [content] Apnea and Hypopnea — src/content/en/modules/module-01.ts#m1-04
- m1 m1-06 [content] How Is OSA Evaluated? — src/content/en/modules/module-01.ts#m1-06
- m1 m1-07 [content] How Does PAP Help? — src/content/en/modules/module-01.ts#m1-07
- m1 m1-q2 [multiSelect] Knowledge check — src/content/en/modules/module-01.ts#m1-q2
- m1 m1-ai1 [aiActivity] Explain it in your own words — src/content/en/modules/module-01.ts#m1-ai1
- m1 m1-recap [summary] Module recap — src/content/en/modules/module-01.ts#m1-recap
- m2 m2-02 [content] What Might a Partner Experience? — src/content/en/modules/module-02.ts#m2-02
- m2 m2-ai1 [aiActivity] Shared-sleep teach-back — src/content/en/modules/module-02.ts#m2-ai1
- m2 m2-recap [summary] Module recap — src/content/en/modules/module-02.ts#m2-recap
- m3 m3-02 [content] Understanding Health Risk — src/content/en/modules/module-03.ts#m3-02
- m3 m3-03 [content] Struggling With PAP Is Common — src/content/en/modules/module-03.ts#m3-03
- m3 m3-ai1 [aiActivity] Describe a PAP barrier — src/content/en/modules/module-03.ts#m3-ai1
- m3 m3-ai2 [aiActivity] Build a realistic next step — src/content/en/modules/module-03.ts#m3-ai2
- m3 m3-q2 [singleChoice] Knowledge check — src/content/en/modules/module-03.ts#m3-q2
- m4 m4-02 [content] Risk Does Not Mean Destiny — src/content/en/modules/module-04.ts#m4-02
- m4 m4-q3 [singleChoice] Knowledge check — src/content/en/modules/module-04.ts#m4-q3
- m4 m4-ai1 [aiActivity] Association teach-back — src/content/en/modules/module-04.ts#m4-ai1
- m4 m4-ai2 [aiActivity] Prepare a care-team question — src/content/en/modules/module-04.ts#m4-ai2
- m5 m5-ai2 [aiActivity] Make one sleep-habit plan — src/content/en/modules/module-05.ts#m5-ai2
- m5 m5-ai3 [aiActivity] Sleep-hygiene teach-back — src/content/en/modules/module-05.ts#m5-ai3
- m6 m6-06 [content] Becoming Familiar With the Equipment — src/content/en/modules/module-06.ts#m6-06
- m6 m6-ai1 [aiActivity] Describe a PAP barrier — src/content/en/modules/module-06.ts#m6-ai1
- m6 m6-ai2 [aiActivity] Build a discussion summary — src/content/en/modules/module-06.ts#m6-ai2
- m6 m6-recap [summary] Module recap — src/content/en/modules/module-06.ts#m6-recap
- m7 m7-r1 [multiSelect] Optional reflection — src/content/en/modules/module-07.ts#m7-r1
- m7 m7-ai1 [aiActivity] Organize an optional question — src/content/en/modules/module-07.ts#m7-ai1
- m7 m7-recap [summary] Module recap — src/content/en/modules/module-07.ts#m7-recap

These include newly structured knowledge checks, AI activities, summaries, barrier/planning content, and other reconstructed screens. This list is not a claim that every app-only screen is clinically wrong; it means no source-backed CIAS counterpart was established in this audit.

## Spanish / Language Implications

The recovered screenshot archive independently establishes English-visible CIAS content only. It does not establish Spanish CIAS wording. The current Spanish modules are machine-drafted from the current English modules through src/content/es/localize.ts, and the repository marks the Spanish translation/bilingual review status as not reviewed.

Do not automatically replace Spanish text from this audit. After English/source restoration, Spanish requires a separate translation and content-validation step.

## Proposed Migration Sequence

1. Restore HIGH-confidence CIAS instructional text and visible lists represented by SAFE_TO_RESTORE records.
2. Restore HIGH-confidence CIAS question stems/options as text and visible interaction structure, while keeping original answer keys marked NOT RECOVERED FROM SOURCE.
3. Resolve the 10-item Eli queue, including cropped options, incomplete text, graphic labels, diagram interpretation, and M3-S06 placement.
4. Reconcile current interaction logic only after deciding whether questions remain unscored/reflection-based; do not invent CIAS answer keys, feedback, or reveal states.
5. Validate Spanish separately against approved English/source decisions; do not treat current machine-drafted Spanish as recovered CIAS evidence.
6. Run curriculum regression, screen-order, interaction, accessibility, and visual checks after implementation.

This sequence is proposed only. No migration step was executed.

## Unresolved Questions

- Whether high-confidence CIAS screens with no current counterpart should be inserted as new screens or merged into an existing current screen.
- What interaction and progression behavior Eli wants for CIAS questions when no original answer key or reveal state is visible.
- Whether CIAS video/graphic references should be restored as media, represented as reviewed text, or held for separate asset review.
- Whether the current app-only AI activities and expanded summaries should be removed, retained as supplemental material, or reviewed independently.
- Spanish translation and clinical/content validation remain separate future gates.

## Audit Boundaries

- No curriculum source data changed.
- No app UI, Worker, Groq, GPT-OSS, Cloudflare, Spanish, or production changes.
- No CIAS login or external CIAS access.
- No answer keys inferred.
- No cropped source completed from current-app wording or medical knowledge.
- Existing dirty repository work was preserved.
