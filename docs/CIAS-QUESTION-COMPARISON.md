# CIAS to Sleep App Recovered Question Comparison

This companion audit compares all 30 recovered CIAS question/reflection records with the canonical current English curriculum. CIAS answer keys, selected answers, feedback, and reveal states are recorded as NOT RECOVERED FROM SOURCE; any answer key shown below belongs only to the current app.

## Summary

- Total recovered questions/reflections: 30
- RESTORE_CIAS_EXACTLY: 0
- RESTORE_CIAS_WITH_SOURCE_REVIEW: 21
- KEEP_CURRENT: 0
- NO_CURRENT_COUNTERPART: 5
- NEEDS_ELI_DECISION: 4

## M1-S04 — Introduction to Sleep Apnea

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171424.png
- Source confidence: HIGH
- CIAS type: single_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: PARTIAL
- Current counterpart: m1-q1
- Current location: src/content/en/modules/module-01.ts#m1-q1
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: The upper airway repeatedly narrows or closes, reducing airflow during sleep.

### Exact CIAS question

True or false? You have obstructive sleep apnea even if you don’t snore.

Instruction: True or false? Let us know what you think below!

CIAS options:
- True – you can totally have sleep apnea without snoring
- False – you have to snore to have sleep apnea

### Current app counterpart

Counterpart 1 (singleChoice): A person’s throat muscles relax during sleep and airflow becomes limited. Which explanation best matches OSA?

Current app options:
Counterpart 1:
- The upper airway repeatedly narrows or closes, reducing airflow during sleep.
- The lungs stop working and cannot restart normal breathing during sleep.
- Dreaming causes the brain to stop sending breathing signals for long periods.
- The person intentionally holds their breath because the airway feels uncomfortable.

Difference: CIAS tests whether OSA can occur without snoring; current tests the mechanism of OSA and has four different choices.

Uncertainty: None recorded.

## M1-S06 — Introduction to Sleep Apnea

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171451.png
- Source confidence: MEDIUM
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: NEEDS_ELI_DECISION
- Implementation readiness: ELI_REVIEW_REQUIRED
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: DIFFERENT_PURPOSE
- Ordering fidelity: PARTIAL
- Current counterpart: m1-r1
- Current location: src/content/en/modules/module-01.ts#m1-r1
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

What are some of the symptoms of OSA you've noticed in your life?

CIAS options:
- Snoring
- Waking up not able to breathe, gasping, or choking
- Feeling fatigued or exhausted
- Sleepiness during the day
- Difficulty concentrating
- Decreased interest in sex (low libido)
- Difficulty with having or maintaining erections (erectile dysfunction)
- Headaches

### Current app counterpart

Counterpart 1 (multiSelect): Which experiences have you noticed?

Current app options:
Counterpart 1:
- Snoring.
- Waking up gasping or choking.
- Someone has noticed pauses in my breathing.
- Morning headache.
- Dry mouth when I wake.
- Daytime tiredness.
- Difficulty concentrating.
- None of these.
- I am not sure.

Difference: CIAS is a multi-select symptom question with eight visible options; current is a multi-select reflection with nine different choices and a different interaction purpose.

Uncertainty: The screenshot ends after the visible Headaches option; lower choices, if any, are CROPPED and not recoverable from this image.

## M2-S02 — How does sleep apnea impact my partner?

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171516.png
- Source confidence: HIGH
- CIAS type: single_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: NONE
- Interaction fidelity: DIFFERENT_TYPE
- Ordering fidelity: PARTIAL
- Current counterpart: m2-r1
- Current location: src/content/en/modules/module-02.ts#m2-r1
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

What aspect of your sleep apnea bothers your partner the most?

CIAS options:
- Snoring
- Night awakenings (anything that causes them to wake up at night)
- Changes in mood/energy
- Sleeping in separate rooms

### Current app counterpart

Counterpart 1 (multiSelect): Has sleep apnea affected anyone else’s sleep or sense of wellbeing?

Current app options:
Counterpart 1:
- Yes.
- No.
- I am not sure.
- I do not share a bed.
- I prefer not to answer.

Difference: CIAS asks which partner impact bothers the partner most as a single-select question with four options; current asks whether anyone was affected as a multi-select reflection with five options.

Uncertainty: None recorded.

## M2-S06 — How does sleep apnea impact my partner?

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171541.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: PARTIAL
- Current counterpart: m2-q2
- Current location: src/content/en/modules/module-02.ts#m2-q2
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: The mask is leaking air. / The mask causes discomfort. / The tubing repeatedly gets pulled. / The machine seems unusually loud. / The partner notices continued loud snoring while PAP is being used.

### Exact CIAS question

Question time! Which of the following statements is correct? (select all that apply).

Instruction: Which of the following statements is correct? (select all that apply).

CIAS options:
- Using CPAP when sleeping with your partner helps ensure that you guys fall asleep and wake up at exactly the same times.
- Using CPAP when sleeping with your partner can help improve energy levels for both you and your partner.
- Using CPAP every other night when sleeping with your partner actually has the same partner benefits as using CPAP every night.
- Using CPAP when sleeping with your partner may help your partner fall asleep faster

### Current app counterpart

Counterpart 1 (multiSelect): Which concerns are reasonable to discuss with the PAP or equipment team? Select all that apply.

Current app options:
Counterpart 1:
- The mask is leaking air.
- The mask causes discomfort.
- The tubing repeatedly gets pulled.
- The machine seems unusually loud.
- The patient wants to change pressure without guidance.
- The partner notices continued loud snoring while PAP is being used.

Difference: Both use a multi-select PAP/partner topic, but current asks which concerns to discuss with the team and uses six choices instead of the four CIAS partner-benefit statements.

Uncertainty: None recorded.

## M2-S07 — How does sleep apnea impact my partner?

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171552.png
- Source confidence: HIGH
- CIAS type: single_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: PARTIAL
- Current counterpart: m2-q1
- Current location: src/content/en/modules/module-02.ts#m2-q1
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: “What made it difficult last night, and is there anything you want help discussing with the PAP team?”

### Exact CIAS question

True or False?

CIAS options:
- True
- False

### Current app counterpart

Counterpart 1 (singleChoice): Which is the most supportive response to a partner who is struggling with PAP?

Current app options:
Counterpart 1:
- “You failed again because you removed the mask.”
- “You should change the pressure yourself.”
- “What made it difficult last night, and is there anything you want help discussing with the PAP team?”
- “Stop talking about it and just use the machine.”

Difference: CIAS is a true/false relationship-satisfaction statement; current is a single-select supportive-response scenario.

Uncertainty: None recorded.

## M3-S02 — OSA Outcomes & Motivations

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171605.png
- Source confidence: HIGH
- CIAS type: single_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: PARTIAL
- Current counterpart: m3-q1
- Current location: src/content/en/modules/module-03.ts#m3-q1
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: The outcome occurs more often in groups with OSA, but it is not guaranteed for an individual.

### Exact CIAS question

True or False? (This question is for learning, not a comprehension check)

CIAS options:
- True
- False

### Current app counterpart

Counterpart 1 (singleChoice): What does it mean when OSA is “associated with” a health outcome?

Current app options:
Counterpart 1:
- Everyone with OSA will develop the outcome.
- The outcome occurs more often in groups with OSA, but it is not guaranteed for an individual.
- OSA has no possible connection to the outcome.
- PAP is guaranteed to prevent the outcome.

Difference: CIAS is a true/false statement about cesarean-risk comorbidity; current asks for the definition of an association.

Uncertainty: None recorded.

## M3-S03 — OSA Outcomes & Motivations

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171611.png
- Source confidence: HIGH
- CIAS type: single_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: PARTIAL
- Current counterpart: m3-q1
- Current location: src/content/en/modules/module-03.ts#m3-q1
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: The outcome occurs more often in groups with OSA, but it is not guaranteed for an individual.

### Exact CIAS question

Pregnant women with untreated OSA during their hospital admission at delivery are at significantly higher risk of:

Instruction: Select the right answer: (This question is for learning, not a comprehension check)

CIAS options:
- getting a cold
- having heart problems
- getting food poisoning
- having nosebleeds

### Current app counterpart

Counterpart 1 (singleChoice): What does it mean when OSA is “associated with” a health outcome?

Current app options:
Counterpart 1:
- Everyone with OSA will develop the outcome.
- The outcome occurs more often in groups with OSA, but it is not guaranteed for an individual.
- OSA has no possible connection to the outcome.
- PAP is guaranteed to prevent the outcome.

Difference: CIAS asks about higher heart-problem risk during delivery admission with four choices; current has no outcome-specific heart-problem question.

Uncertainty: None recorded.

## M3-S04 — OSA Outcomes & Motivations

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171621.png
- Source confidence: HIGH
- CIAS type: single_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: PARTIAL
- Current counterpart: m3-q1
- Current location: src/content/en/modules/module-03.ts#m3-q1
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: The outcome occurs more often in groups with OSA, but it is not guaranteed for an individual.

### Exact CIAS question

Clinical associations have been observed between pregnant women with sleep disordered breathing (SDB) and ______ newborn birth weights.

Instruction: Select the right answer: (This question is for learning, not a comprehension check)

CIAS options:
- Abnormally high
- Normal
- Abnormally low

### Current app counterpart

Counterpart 1 (singleChoice): What does it mean when OSA is “associated with” a health outcome?

Current app options:
Counterpart 1:
- Everyone with OSA will develop the outcome.
- The outcome occurs more often in groups with OSA, but it is not guaranteed for an individual.
- OSA has no possible connection to the outcome.
- PAP is guaranteed to prevent the outcome.

Difference: CIAS asks whether SDB is associated with abnormally high, normal, or abnormally low newborn birth weight; current has no birth-weight choice.

Uncertainty: None recorded.

## M4-S02 — Sleep Apnea And The Health Of Your Pregnancy and Baby

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171641.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: NONE
- Interaction fidelity: DIFFERENT_TYPE
- Ordering fidelity: PARTIAL
- Current counterpart: m4-q1
- Current location: src/content/en/modules/module-04.ts#m4-q1
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: Gestational diabetes has been observed more often in groups with OSA, but this does not predict an individual outcome.

### Exact CIAS question

Which of the following conditions are you at risk of if you have sleep apnea during pregnancy? Give it your best guess!

Instruction: Hint: There are 3 correct answers.

CIAS options:
- Preeclampsia
- Food allergies
- Lactose intolerance
- High blood pressure
- High blood sugar

### Current app counterpart

Counterpart 1 (singleChoice): A study reports that OSA is associated with gestational diabetes. What is the best interpretation?

Current app options:
Counterpart 1:
- Every pregnant person with OSA will develop gestational diabetes.
- OSA always directly causes gestational diabetes.
- Gestational diabetes has been observed more often in groups with OSA, but this does not predict an individual outcome.
- PAP guarantees that gestational diabetes will not occur.

Difference: CIAS is a five-option multi-select risk-condition guess; current is a single-select interpretation of an OSA/gestational-diabetes association.

Uncertainty: None recorded.

## M4-S04 — Sleep Apnea And The Health Of Your Pregnancy and Baby

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171655.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: PARTIAL
- Current counterpart: m4-q2
- Current location: src/content/en/modules/module-04.ts#m4-q2
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: It is diabetes first diagnosed during pregnancy. / It involves blood glucose levels. / It is evaluated and managed with the prenatal healthcare team.

### Exact CIAS question

Which of the following are complications for the mother if she has gestational diabetes?

Instruction: Hint: There are 3 correct answers.

CIAS options:
- Asthma
- Requiring C-section
- Obesity & Type II Diabetes
- High blood pressure & preeclampsia
- Broken bones

### Current app counterpart

Counterpart 1 (multiSelect): Which statements about gestational diabetes are correct? Select all that apply.

Current app options:
Counterpart 1:
- It is diabetes first diagnosed during pregnancy.
- It involves blood glucose levels.
- It can be diagnosed from snoring alone.
- It is evaluated and managed with the prenatal healthcare team.
- Every person with OSA will develop it.

Difference: CIAS asks about maternal gestational-diabetes complications with five choices; current asks general gestational-diabetes statements with a different five-choice set.

Uncertainty: None recorded.

## M4-S05 — Sleep Apnea And The Health Of Your Pregnancy and Baby

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171701.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: SPLIT_OR_COMBINED
- Current counterpart: m4-q2, m4-04
- Current location: src/content/en/modules/module-04.ts#m4-q2, src/content/en/modules/module-04.ts#m4-04
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: It is diabetes first diagnosed during pregnancy. / It involves blood glucose levels. / It is evaluated and managed with the prenatal healthcare team.

### Exact CIAS question

Which of the following are complications for the baby if the mother has gestational diabetes?

Instruction: Hint: There are 3 correct answers.

CIAS options:
- Autism
- Respiratory Distress Syndrome (difficulty breathing)
- Excessive birth weight
- ADHD
- Premature birth or stillbirth

### Current app counterpart

Counterpart 1 (multiSelect): Which statements about gestational diabetes are correct? Select all that apply.
Counterpart 2 (content): null

Current app options:
Counterpart 1:
- It is diabetes first diagnosed during pregnancy.
- It involves blood glucose levels.
- It can be diagnosed from snoring alone.
- It is evaluated and managed with the prenatal healthcare team.
- Every person with OSA will develop it.
Counterpart 2:

Difference: CIAS asks about baby complications including respiratory distress, excessive birth weight, and premature birth/stillbirth; current discusses patient/developing-baby impact without that choice set.

Uncertainty: None recorded.

## M4-S08 — Sleep Apnea And The Health Of Your Pregnancy and Baby

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171719.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MISSING_FROM_APP
- Future action: NO_CURRENT_COUNTERPART
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: NONE
- Option fidelity: NONE
- Interaction fidelity: NO_COUNTERPART
- Ordering fidelity: NO_COUNTERPART
- Current counterpart: NONE
- Current location: NONE
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

Which of the following are complications for the mother or baby if the mother has preeclampsia?

Instruction: Hint: There are 2 correct answers.

CIAS options:
- Tennis elbow
- Serious heart issues
- Athlete's foot
- Fetal growth restriction
- Cavities

### Current app counterpart

No current question stem is present at the mapped location.

Current app options:
- None at the mapped location.

Difference: CIAS asks about maternal or fetal preeclampsia complications with five options; no current preeclampsia-complication question is present.

Uncertainty: None recorded.

## M5-S04 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171839.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MISSING_FROM_APP
- Future action: NO_CURRENT_COUNTERPART
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: NONE
- Option fidelity: NONE
- Interaction fidelity: NO_COUNTERPART
- Ordering fidelity: NO_COUNTERPART
- Current counterpart: NONE
- Current location: NONE
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

What are some of the consequences of getting poor sleep?

Instruction: Let's check your knowledge real quick! Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- Your immune system will be strengthened by poor sleep
- Increased risk of depression and worse mood symptoms
- You will be shorter
- Poor sleep isn't that bad! There are very few consequences.
- Increased risk of chronic disease (diabetes, high blood pressure, high cholesterol)
- Increased likelihood of daytime fatigue and lack of energy

### Current app counterpart

No current question stem is present at the mapped location.

Current app options:
- None at the mapped location.

Difference: CIAS asks about consequences of poor sleep; no current choice question covers the CIAS depression, chronic-disease, and daytime-fatigue options.

Uncertainty: None recorded.

## M5-S05 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171845.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: NONE
- Interaction fidelity: DIFFERENT_TYPE
- Ordering fidelity: PARTIAL
- Current counterpart: m5-02
- Current location: src/content/en/modules/module-05.ts#m5-02
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

What are some of the consequences of getting poor sleep during pregnancy?

Instruction: Let's check your knowledge real quick! Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- Increased chance of needing a C-section
- Labor will stop entirely
- Your baby's eye color might change
- The baby is more likely to be nocturnal
- Higher chance of longer labors
- Increased risk of preterm birth

### Current app counterpart

No current question stem is present at the mapped location.

Current app options:
- None at the mapped location.

Difference: CIAS asks about consequences of poor sleep during pregnancy; current has related pregnancy-sleep prose but no equivalent question or option set.

Uncertainty: None recorded.

## M5-S09 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171904.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: PARTIAL
- Current counterpart: m5-q2
- Current location: src/content/en/modules/module-05.ts#m5-q2
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: Reduce unwanted light. / Address disruptive noise. / Arrange PAP tubing so it is less likely to pull. / Keep the room at a personally comfortable temperature. / Keep frequently needed nighttime items within safe reach.

### Exact CIAS question

What are 3 activities that you can implement in your life to help improve your sleep?

Instruction: Let's check your knowledge real quick! Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- Getting regular exercise every week
- Eating a big meal before bed
- Taking a long nap throughout the day
- Eating nutritious meals every week
- Getting sunshine in the morning and throughout the day
- Having caffeine before bed to wake up refreshed

### Current app counterpart

Counterpart 1 (multiSelect): Which changes could support a sleep-friendly environment? Select all that apply.

Current app options:
Counterpart 1:
- Reduce unwanted light.
- Address disruptive noise.
- Arrange PAP tubing so it is less likely to pull.
- Keep the room at a personally comfortable temperature.
- Use the bed as the main place for stressful work.
- Keep frequently needed nighttime items within safe reach.

Difference: CIAS asks for three sleep-hygiene activities; current has a sleep-environment question with a different purpose and choices.

Uncertainty: None recorded.

## M5-S11 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171918.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: NONE
- Interaction fidelity: DIFFERENT_TYPE
- Ordering fidelity: PARTIAL
- Current counterpart: m5-q1
- Current location: src/content/en/modules/module-05.ts#m5-q1
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: Using a reasonably consistent wake time while allowing flexibility when needed.

### Exact CIAS question

What are the 3 important components you can implement to improve your sleep routine?

Instruction: Let's check your knowledge real quick! Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- Avoiding blue light at night and instead using warmer hues
- Establishing a consistent bedtime routine
- Sleeping and waking up at the same times of day
- Scrolling on your phone before bed to help you fall asleep
- Stream your favorite show around bedtime
- Sleeping in on weekends by a couple of hours to “catch up”

### Current app counterpart

Counterpart 1 (singleChoice): Which change is most likely to support a consistent sleep-wake pattern?

Current app options:
Counterpart 1:
- Changing wake time by several hours every day.
- Using a reasonably consistent wake time while allowing flexibility when needed.
- Staying in bed for as long as possible whenever sleep is difficult.
- Using bright screens until the exact moment of sleep.

Difference: CIAS asks for three sleep-routine components; current asks which change supports a consistent sleep-wake pattern and uses a different single-select format.

Uncertainty: None recorded.

## M5-S13 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 171931.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: NONE
- Interaction fidelity: DIFFERENT_TYPE
- Ordering fidelity: PARTIAL
- Current counterpart: m5-q4
- Current location: src/content/en/modules/module-05.ts#m5-q4
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: Use a quiet activity in dim light and return to bed when sleepier.

### Exact CIAS question

What should you do if you're having difficulty falling asleep at night?

Instruction: Let's check your knowledge real quick! Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- Engage in a quiet, relaxing activity in low-light conditions
- Get out of bed and go to a different room
- Check the time and calculate the amount of sleep you're losing
- Scroll the news on your phone until you're sleepy
- Stay in bed and be as still as possible until you fall asleep
- Return to bed when you feel sleepy

### Current app counterpart

Counterpart 1 (singleChoice): Which response is most consistent with the lesson when you are awake and increasingly frustrated in bed?

Current app options:
Counterpart 1:
- Keep forcing yourself to sleep for as long as possible.
- Use a quiet activity in dim light and return to bed when sleepier.
- Change PAP pressure without guidance.
- Assume the problem must be OSA.

Difference: Both address difficulty falling asleep, but CIAS is a six-option multi-select question and current is a four-option single-select question.

Uncertainty: None recorded.

## M5-S18 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172001.png
- Source confidence: MEDIUM
- CIAS type: multi_select_question
- Mapping: MISSING_FROM_APP
- Future action: NO_CURRENT_COUNTERPART
- Implementation readiness: ELI_REVIEW_REQUIRED
- Text fidelity: NONE
- Option fidelity: NONE
- Interaction fidelity: NO_COUNTERPART
- Ordering fidelity: NO_COUNTERPART
- Current counterpart: NONE
- Current location: NONE
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

What are 3 reasons why daily morning sunshine is beneficial for sleep?

Instruction: Let's check your knowledge real quick! Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- Sunshine doesn't contain blue light, which helps with sleep during nighttime
- It boosts nighttime melatonin (sleepy chemical) production by strengthening day–night light cues
- It improves sleep because it immediately boosts melatonin levels in the morning, stabilizing the melatonin rhythm
- It helps set your circadian rhythm (body's internal clock) earlier and more consistently
- It can make it easier to fall asleep later by increasing daytime alertness and nighttime sleep drive
- Morning sunlight works mainly by warming the skin, which directly prepares core body temperature for sleep later

### Current app counterpart

No current question stem is present at the mapped location.

Current app options:
- None at the mapped location.

Difference: CIAS asks why morning sunshine benefits sleep; current has no dedicated sunshine question and the visible CIAS option set is potentially cropped.

Uncertainty: The screenshot ends after the sixth option; the Add new answer/footer is not visible. No additional option can be assumed.

## M5-S20 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172012.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: PARTIAL
- Current counterpart: m5-q2
- Current location: src/content/en/modules/module-05.ts#m5-q2
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: Reduce unwanted light. / Address disruptive noise. / Arrange PAP tubing so it is less likely to pull. / Keep the room at a personally comfortable temperature. / Keep frequently needed nighttime items within safe reach.

### Exact CIAS question

What are 3 important components you can implement to improve your sleep environment?

Instruction: Let's check your knowledge real quick! Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- Keep a bright digital clock facing the bed so you can always check the time
- Eliminate any visual stimulation
- Sleep with music playing on shuffle all night
- Keep the bedroom at a cool temperature (60–68°F)
- Eliminate all noise disturbances
- Keep the bedroom at a warm temperature (75–82°F)

### Current app counterpart

Counterpart 1 (multiSelect): Which changes could support a sleep-friendly environment? Select all that apply.

Current app options:
Counterpart 1:
- Reduce unwanted light.
- Address disruptive noise.
- Arrange PAP tubing so it is less likely to pull.
- Keep the room at a personally comfortable temperature.
- Use the bed as the main place for stressful work.
- Keep frequently needed nighttime items within safe reach.

Difference: CIAS asks for three sleep-environment components; current has a different six-option environment question.

Uncertainty: None recorded.

## M5-S22 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172023.png
- Source confidence: MEDIUM
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: NEEDS_ELI_DECISION
- Implementation readiness: ELI_REVIEW_REQUIRED
- Text fidelity: LOW
- Option fidelity: NONE
- Interaction fidelity: DIFFERENT_TYPE
- Ordering fidelity: PARTIAL
- Current counterpart: m5-q3
- Current location: src/content/en/modules/module-05.ts#m5-q3
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: Caffeine can affect sleep for several hours, and sensitivity differs between people.

### Exact CIAS question

Which of the following statements best reflects the recommended guidelines and physiological effects of caffeine consumption for pregnant women?

Instruction: Let's check your knowledge real quick! Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- Individual differences in metabolism lead many experts to recommend zero caffeine intake.
- Metabolic changes in late pregnancy can significantly delay the processing of caffeine.
- Consuming up to 400mg of caffeine is generally considered safe for women in the early stages of pregnancy.
- Caffeine metabolism speeds up significantly during the later stages of pregnancy.
- The body processes caffeine instantly, so timing does not matter.
- Consuming up to 200mg of caffeine is generally considered safe for women in the early stages of pregnancy.

### Current app counterpart

Counterpart 1 (singleChoice): Which statement about caffeine is most accurate?

Current app options:
Counterpart 1:
- Caffeine affects everyone for exactly the same amount of time.
- Caffeine can affect sleep for several hours, and sensitivity differs between people.
- Energy drinks do not contain caffeine.
- The app can determine a personalized safe pregnancy dose.

Difference: Both ask about caffeine, but current is a four-option single-select question and does not preserve the CIAS pregnancy-stage option set.

Uncertainty: The screenshot ends after the sixth option; the Add new answer/footer is not visible.

## M5-S24 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172035.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MISSING_FROM_APP
- Future action: NO_CURRENT_COUNTERPART
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: NONE
- Option fidelity: NONE
- Interaction fidelity: NO_COUNTERPART
- Ordering fidelity: NO_COUNTERPART
- Current counterpart: NONE
- Current location: NONE
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

What are 3 nutritional tips you can follow that are supported by current chrononutrition evidence?

Instruction: Let's check your knowledge real quick! Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- Eat breakfast like a peasant, lunch like a prince, and dinner like a king.
- Hydrating earlier in the day may help reduce nocturia (peeing in the middle of the night).
- Finishing your last meal closer to bedtime may improve sleep quality by lowering your resting heart rate.
- Eating earlier may worsen night cravings by lowering satiety hormones.
- Eat breakfast like a king, lunch like a prince, and dinner like a peasant.
- The human body processes food better earlier in the day, from a metabolic, hormonal, and fullness standpoint.

### Current app counterpart

No current question stem is present at the mapped location.

Current app options:
- None at the mapped location.

Difference: CIAS asks for three chrononutrition tips; no current chrononutrition question is present.

Uncertainty: None recorded.

## M5-S26 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172047.png
- Source confidence: MEDIUM
- CIAS type: multi_select_question
- Mapping: MISSING_FROM_APP
- Future action: NO_CURRENT_COUNTERPART
- Implementation readiness: ELI_REVIEW_REQUIRED
- Text fidelity: NONE
- Option fidelity: NONE
- Interaction fidelity: NO_COUNTERPART
- Ordering fidelity: NO_COUNTERPART
- Current counterpart: NONE
- Current location: NONE
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

Select all the foods that can consistently be part of a healthy diet and support proper sleep.

Instruction: Select all that apply. (Hint: There are 6 correct answers.)

CIAS options:
- Oatmeal
- Highly caffeinated energy drinks
- Quarter pounder
- Leafy greens
- Boiled potatoes
- Snickers bar
- Berries
- Chicken

### Current app counterpart

No current question stem is present at the mapped location.

Current app options:
- None at the mapped location.

Difference: CIAS asks which foods support a healthy diet and sleep; no current nutrition-choice question is present and the visible CIAS options may continue below the crop.

Uncertainty: The screenshot ends at the eighth visible option, Chicken. Lower choices and the interaction footer are CROPPED; no additional choices are invented.

## M5-S30 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172107.png
- Source confidence: MEDIUM
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: NEEDS_ELI_DECISION
- Implementation readiness: ELI_REVIEW_REQUIRED
- Text fidelity: LOW
- Option fidelity: NONE
- Interaction fidelity: DIFFERENT_TYPE
- Ordering fidelity: PARTIAL
- Current counterpart: m5-09
- Current location: src/content/en/modules/module-05.ts#m5-09
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

What 3 pieces of advice you can implement regarding regular exercise for sleep?

Instruction: Let's check your knowledge real quick! Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- Try to aim for around ~60 minutes/week of aerobic exercise to maximize sleep benefits.
- Aim for ≥150 minutes/week of moderate–intensity aerobic exercise.
- Strenuous exercise close to bedtime may improve sleep quality by making you really tired.
- Exercise doesn't significantly affect mental tension or stress, so it doesn't meaningfully affect sleep.
- Try to include ~2 resistance training sessions per week.
- Exercise can reduce mental tension, stress, and help you feel more tired at night.

### Current app counterpart

No current question stem is present at the mapped location.

Current app options:
- None at the mapped location.

Difference: CIAS asks for three exercise recommendations; current has exercise prose but no equivalent exercise question, and the source option set is cropped during review.

Uncertainty: The source screenshot ends during the sixth option after the visible tag begins; any lower options or footer are CROPPED.

## M5-S31 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172112.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: NONE
- Interaction fidelity: DIFFERENT_TYPE
- Ordering fidelity: PARTIAL
- Current counterpart: m5-10
- Current location: src/content/en/modules/module-05.ts#m5-10
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

What 3 pieces of advice you can implement regarding naps and sleeping position?

Instruction: Let's check your knowledge real quick! Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- Try using pillows between bent knees or a full-length body pillow for comfort/support.
- Back sleeping after 28 weeks of gestation may improve health outcomes by keeping the baby relatively elevated.
- If napping is necessary, consider napping later in the day for at least 30 minutes.
- If napping is necessary, nap earlier in the day and keep it to ~20 minutes.
- Avoid using pillows, as they can often over clutter the bedroom.
- Try to sleep on your side if you are past 28 weeks of gestation.

### Current app counterpart

No current question stem is present at the mapped location.

Current app options:
- None at the mapped location.

Difference: CIAS combines naps and sleeping position in a six-option question; current has nap prose but no position counterpart.

Uncertainty: None recorded.

## M5-S32 — Healthy Sleep Hygiene

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172121.png
- Source confidence: MEDIUM
- CIAS type: open_ended_reflection_summary
- Mapping: MATERIAL_DRIFT
- Future action: NEEDS_ELI_DECISION
- Implementation readiness: ELI_REVIEW_REQUIRED
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: PARTIAL
- Current counterpart: m5-recap
- Current location: src/content/en/modules/module-05.ts#m5-recap
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

What are some sleep hygiene practices you learned that you feel confident in implementing in your routine?

Instruction: This question is supposed to be very open-ended and get you thinking about steps you can take to improve your sleep.

CIAS options:
- None recorded.

### Current app counterpart

No current question stem is present at the mapped location.

Current app options:
- None at the mapped location.

Difference: Both recap sleep hygiene, but CIAS includes a long practice list and an open-ended prompt; current is a summary only with no open-ended counterpart.

Uncertainty: The lower illustration continues to the bottom edge of the screenshot; any text below the visible image is CROPPED/not present.

## M6-S05 — Pregnancy Co-morbidities and PAP

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172151.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: PARTIAL
- Current counterpart: m6-q1
- Current location: src/content/en/modules/module-06.ts#m6-q1
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: Whether the congestion starts before or after PAP is applied. / Whether dryness or mask leak is also present. / When symptoms occur and what seems to make them better or worse.

### Exact CIAS question

What are the recommended ways for treating nasal congestion during pregnancy?

Instruction: Select all that apply (Hint: there are 3 correct answers.)

CIAS options:
- Using heat or humidifier elements on the PAP machine
- Simply saline spray before bed
- OTC intranasal steroid sprays such as fluticasone or budesonide
- Using nasal sprays and pointing them straight up the nostril
- Consider using Afrin on a nightly basis.
- Oral antibiotics

### Current app counterpart

Counterpart 1 (multiSelect): Which information would be useful to record about nasal congestion?

Current app options:
Counterpart 1:
- Whether the congestion starts before or after PAP is applied.
- Whether dryness or mask leak is also present.
- Which pressure setting the patient independently decides to use.
- When symptoms occur and what seems to make them better or worse.

Difference: CIAS asks for recommended nasal-congestion treatments; current asks what information to record and changes both purpose and choices.

Uncertainty: None recorded.

## M6-S08 — Pregnancy Co-morbidities and PAP

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172208.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: NONE
- Interaction fidelity: DIFFERENT_TYPE
- Ordering fidelity: PARTIAL
- Current counterpart: m6-q2
- Current location: src/content/en/modules/module-06.ts#m6-q2
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: Tracking when symptoms occur may help the learner discuss the problem with a healthcare professional.

### Exact CIAS question

What are the recommended ways for treating GERD during pregnancy?

Instruction: Select all that apply (Hint: there are 4 correct answers.)

CIAS options:
- Eating smaller meals with LOW fat content
- Reducing caffeine intake
- Elevating the head of the bed
- Sleeping primarily on your left side
- Take antacids medications before lifestyle modifications
- Sleeping on your stomach

### Current app counterpart

Counterpart 1 (singleChoice): Which statement about reflux is most appropriate?

Current app options:
Counterpart 1:
- The app can diagnose GERD from one symptom.
- Tracking when symptoms occur may help the learner discuss the problem with a healthcare professional.
- Every episode of chest discomfort is harmless reflux.
- The learner should independently start any medication suggested online.

Difference: Both ask about GERD treatment, but current asks for the most appropriate general statement and uses four choices rather than the six CIAS treatment options.

Uncertainty: None recorded.

## M6-S10 — Pregnancy Co-morbidities and PAP

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172218.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: NONE
- Interaction fidelity: DIFFERENT_TYPE
- Ordering fidelity: PARTIAL
- Current counterpart: m6-q3
- Current location: src/content/en/modules/module-06.ts#m6-q3
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: The appropriate healthcare professional.

### Exact CIAS question

What are the recommended ways for treating anxiety during pregnancy?

Instruction: Select all that apply (Hint: there are 3 correct answers.)

CIAS options:
- Improving sleep, diet, and exercise
- Reducing caffeine and alcohol intake
- Counseling and Cognitive Behavior Therapy
- Immediately asking your doctor for an SSRI prescription
- Ignoring it and hoping it will go away
- Smoking weed to calm yourself down

### Current app counterpart

Counterpart 1 (singleChoice): Who is the most appropriate person to guide pregnancy-safe medication decisions?

Current app options:
Counterpart 1:
- The AI chatbot.
- Another app user.
- The appropriate healthcare professional.
- The patient should decide without guidance.

Difference: CIAS asks which anxiety treatments are recommended; current asks who should guide pregnancy-safe medication decisions and uses a different four-choice purpose.

Uncertainty: None recorded.

## M7-S04 — Intimacy

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172244.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: NONE
- Interaction fidelity: DIFFERENT_TYPE
- Ordering fidelity: PARTIAL
- Current counterpart: m7-04
- Current location: src/content/en/modules/module-07.ts#m7-04
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: NOT AVAILABLE

### Exact CIAS question

When is it recommended to wear your PAP mask?

Instruction: Select all that apply. (Hint: There are 3 correct answers.)

CIAS options:
- When you are planning to fall asleep
- When you are being intimate with your partner
- During naps
- If you think you might fall asleep while relaxing in bed with your partner
- Only if your partner says your snoring is loud
- During sexual activity

### Current app counterpart

No current question stem is present at the mapped location.

Current app options:
- None at the mapped location.

Difference: CIAS is a six-option multi-select question about when to wear PAP; current has prose usage guidance but no equivalent question.

Uncertainty: None recorded.

## M7-S07 — Intimacy

- Source screenshot: projects/lifespan-sleep-education-mobile/screenshots/Screenshot 2026-07-29 172258.png
- Source confidence: HIGH
- CIAS type: multi_select_question
- Mapping: MATERIAL_DRIFT
- Future action: RESTORE_CIAS_WITH_SOURCE_REVIEW
- Implementation readiness: RESTORE_TEXT_ONLY
- Text fidelity: LOW
- Option fidelity: PARTIAL
- Interaction fidelity: SAME_CONTROL_DIFFERENT_CONTENT
- Ordering fidelity: SPLIT_OR_COMBINED
- Current counterpart: m7-q1, m7-q2
- Current location: src/content/en/modules/module-07.ts#m7-q1, src/content/en/modules/module-07.ts#m7-q2
- CIAS answer key: NOT RECOVERED FROM SOURCE
- Current answer key: PAP can create practical or emotional adjustments, and experiences differ. / PAP discomfort affecting closeness. / Fatigue affecting interest in intimacy. / Concerns about sexual function. / Questions about treatment effects. / Relationship stress connected to sleep problems.

### Exact CIAS question

Which statements correctly describe how pregnancy, obstructive sleep apnea, and CPAP may affect sex drive?

Instruction: Select all that apply (Hint: There are 3 correct answers.)

CIAS options:
- During pregnancy, sex drive can normally change because of body changes, discomfort, stress, or fatigue.
- Sleep apnea can reduce sex drive by worsening sleep quality, which may lower energy and desire.
- CPAP always immediately increases sex drive and never affects body image.
- A change in sex drive during pregnancy always means something is medically wrong.
- CPAP can improve sleep quality, which may help restore energy, desire, blood flow, and reduce stress or anxiety.
- Sleep apnea affects sex drive only because of body image concerns, not because of sleep quality, hormones, mood, or blood flow.

### Current app counterpart

Counterpart 1 (singleChoice): Which statement is most accurate?
Counterpart 2 (multiSelect): Which topics could reasonably be discussed with a healthcare professional? Select all that apply.

Current app options:
Counterpart 1:
- PAP always improves intimacy.
- PAP always harms intimacy.
- PAP can create practical or emotional adjustments, and experiences differ.
- Relationship concerns are not appropriate to discuss with a clinician.
Counterpart 2:
- PAP discomfort affecting closeness.
- Fatigue affecting interest in intimacy.
- Concerns about sexual function.
- Questions about treatment effects.
- A desire to change PAP settings without guidance.
- Relationship stress connected to sleep problems.

Difference: CIAS asks which statements describe pregnancy/OSA/CPAP effects on sex drive; current uses a general PAP-intimacy question and a professional-discussion topics question.

Uncertainty: None recorded.

