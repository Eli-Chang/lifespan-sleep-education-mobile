# m8 Getting Started with PAP: CIAS audit

Source: CIAS EZ-PAP document, normalized text (cias-normalized.txt), Section II pp. 19-20, plus Section I (p10) and Section III (pp. 21-24) where relevant. App: m8-en.json / m8-es.json (curriculumVersion 11; EN translationStatus 'source'; ES 'machine_drafted', bilingualReviewStatus 'not_reviewed'). Audit date 2026-10-21. Read-only; no repository file was changed.

Status rules: MATCH = same meaning in Section II; PARAPHRASE_OK = reworded, same meaning; ORGANIZATIONAL = same meaning but taken from Section I or III; NOT_IN_CIAS = app- or ATS-authored (the ATS IDs are not clinically approved); CONTRADICTION = conflicts with CIAS. For distractor choices, MATCH means CIAS supports marking the choice wrong. Every CIAS quote was checked by script to be an exact substring of the stated page and at most 25 words.

## Counts

Claims audited: 100 across 12 screens.

| Status | Count |
| --- | --- |
| MATCH | 25 |
| PARAPHRASE_OK | 37 |
| ORGANIZATIONAL | 14 |
| NOT_IN_CIAS | 21 |
| CONTRADICTION | 3 |
| OMISSION | 0 |
| UNRESOLVED | 0 |

Claim-level actions: CLINICAL_REVIEW 11, NO_ACTION 89, FIX_UNAMBIGUOUS 0 (all fixes are in the Spanish file or narration; see Fixes). Section II omissions: 13 (one is the UNRESOLVED step-3 gap), plus 3 related items outside Section II.

Narration: all 12 EN screens match their visible text exactly (paragraphs then keyPoints; or prompt then choices). ES matches on 10 of 12; m8-q1 and m8-q2 add the answer explanation. Spanish parity: structure, choice IDs and answer keys are the same on all 12 screens. 4 screens have content issues (m8-03, m8-05, m8-q1, m8-q2). Media: no image, video or attribution fields on any m8 screen.

## Claim table

| Screen | CIAS locator | Concept | Status | Action | Note |
| --- | --- | --- | --- | --- | --- |
| m8-01 title | p19 | Section title | MATCH | NO_ACTION | App uses PAP as the umbrella term; CIAS p10 supports it: 'CPAP is just one type of Positive Airway Pressure (PAP) machine.' |
| m8-01 paragraphs[0] | p19 | Adjustment is gradual | MATCH | NO_ACTION |  |
| m8-01 paragraphs[0] | p19 | Own pace; contact prescriber | PARAPHRASE_OK | NO_ACTION | Second half matches CIAS p20: 'Reach out to the healthcare provider who prescribed you your machine if you have questions or would like more guidance.' |
| m8-01 paragraphs[1] | p10 | PAP is prescribed | ORGANIZATIONAL | NO_ACTION | Section I content. Slight tension with CIAS step 1 (p19), which says users often try several interfaces; 'prescribed with a particular mask' implies a fixed mask. Wording note only. |
| m8-01 paragraphs[1] | p19 | Goal is familiarity, not a perfect first night | PARAPHRASE_OK | NO_ACTION |  |
| m8-01 paragraphs[2] | p20 | Care team checks fit and data | PARAPHRASE_OK | NO_ACTION | Device-data part matches CIAS p20 settings bullet. 'Comfort adjustment' wording is app-authored. |
| m8-01 paragraphs[2] | p10 | No self-change of pressure | ORGANIZATIONAL | NO_ACTION | Section I content (p10). |
| m8-01 keyPoints[0] | p20 | Persistence after a hard night | PARAPHRASE_OK | NO_ACTION | 'Short' is app-authored; CIAS practice sessions are 1 hour (p19). |
| m8-01 keyPoints[1] | absent | Log difficulties for the team | NOT_IN_CIAS | NO_ACTION | App-authored. Consistent with the CIAS p20 diary (which is about symptoms) and reach-out guidance. |
| m8-02 title | p19 | Step 1 heading | PARAPHRASE_OK | NO_ACTION | Maps to CIAS acclimation step 1. |
| m8-02 paragraphs[0] | p19 | Find comfortable mask and headgear | MATCH | NO_ACTION |  |
| m8-02 paragraphs[0] | p19 | May need to try several interfaces | PARAPHRASE_OK | NO_ACTION | Faces/sleeping styles also supported by CIAS p20: 'Once people find their fit (based on their face, how they sleep)'. |
| m8-02 paragraphs[1] | p19 | Comfort first, machine later | PARAPHRASE_OK | NO_ACTION |  |
| m8-02 paragraphs[1] | p19 | Fit straps with machine running | CONTRADICTION | CLINICAL_REVIEW | CIAS step 1 says not to plug in the machine at this stage. The app adds a machine-running fit instruction to the step-1 screen, right after 'before worrying about using the machine', so the screen also conflicts with itself. Strap/seal advice exists in CIAS Section III (p21: 'You can try loosening the straps and seeing if you continue to have a good seal.') and probably comes from the ATS supplement. |
| m8-02 paragraphs[1] | p21 | Mask not too tight | ORGANIZATIONAL | NO_ACTION | Section III content. CIAS also says the mask should not leave long-lasting facial marks; that detail is not in m8. |
| m8-02 paragraphs[2] | p21 | Over-tightening means re-check the mask | ORGANIZATIONAL | NO_ACTION | Section III content. CIAS sends this to the 'healthcare provider' for 'a different type of mask'. The app sends it to the 'equipment team' (supported by p20 'medical equipment company') and adds size and cushion (not in CIAS). |
| m8-02 paragraphs[2] | p21 | Mask styles differ | ORGANIZATIONAL | NO_ACTION | Section III content. Nasal pillow on p21, full-face mask on p22. |
| m8-02 keyPoints[0] | p19 | Fit with airflow running; small adjustments | CONTRADICTION | CLINICAL_REVIEW | Same conflict with CIAS step 1 as paragraphs[1]. 'One small adjustment at a time' is not in CIAS (p21 only says 'play around with adjusting the straps'). |
| m8-02 keyPoints[1] | p21 | Ask for another size or interface | ORGANIZATIONAL | NO_ACTION | Section III content. |
| m8-03 title | p19 | Step 2 heading | PARAPHRASE_OK | NO_ACTION | Maps to CIAS acclimation step 2. |
| m8-03 paragraphs[0] | p19 | Awake upright practice about 1 hour a day | PARAPHRASE_OK | CLINICAL_REVIEW | 'Several days' replaces CIAS 'Try this for 3-5 days'. 'About' was added and 'at home' was dropped. The specific timing is lost (see clinicalReview: acclimation timing). |
| m8-03 paragraphs[0] | p19 | Read or watch TV | MATCH | NO_ACTION |  |
| m8-03 paragraphs[1] | absent | Machine on before mask | NOT_IN_CIAS | NO_ACTION | Instruction on device order that is not in CIAS. It is attributed to the ATS supplements, which are still waiting for statement-level review. Check it against the ATS source and the device manual during that review. |
| m8-03 paragraphs[1] | absent | Why a calm activity helps | NOT_IN_CIAS | NO_ACTION | App-authored reason, consistent with CIAS step 2. |
| m8-03 paragraphs[2] | absent | Pause and shorten sessions | NOT_IN_CIAS | CLINICAL_REVIEW | CIAS step 2 sets 1 hour each day and gives no option to shorten sessions. This fits 'at your own pace' but changes the CIAS schedule (see clinicalReview: acclimation timing). |
| m8-03 keyPoints[0] | p19 | Enjoyable activity during practice | PARAPHRASE_OK | NO_ACTION | Plain-language note: in a PAP lesson, 'low-pressure' could be read as low air pressure. The Spanish 'tranquila' avoids this. |
| m8-03 keyPoints[1] | p19 | Increase practice time gradually | NOT_IN_CIAS | CLINICAL_REVIEW | In CIAS, progress happens by stage, with fixed 1-hour sessions. Adding minutes bit by bit is app-added (see clinicalReview: acclimation timing). |
| m8-04 title | p19 | Step 4 heading | PARAPHRASE_OK | NO_ACTION | Maps to CIAS acclimation step '4' (the source has no step 3). |
| m8-04 paragraphs[0] | p19 | Use PAP during scheduled rest/nap | PARAPHRASE_OK | CLINICAL_REVIEW | CIAS says 'scheduled 1-hour naps at home'. The 1-hour length and 'at home' are dropped (see clinicalReview: acclimation timing). |
| m8-04 paragraphs[0] | p19 | Head down, eyes closed | MATCH | NO_ACTION |  |
| m8-04 paragraphs[0] | p19 | Sleep not required | PARAPHRASE_OK | NO_ACTION | CIAS says relaxing and unwinding is 'the key of this step'. The app keeps the 'sleep not required' part but drops the stress on relaxing. |
| m8-04 paragraphs[1] | p19 | Short rest; notice barriers | NOT_IN_CIAS | CLINICAL_REVIEW | 'Planned' matches 'scheduled'. 'Short' does not match the CIAS '1-hour' nap. Noticing barriers is app-added. |
| m8-04 paragraphs[1] | absent | Support tubing | NOT_IN_CIAS | NO_ACTION | Attributed to ATS. CIAS p21 covers the mask moving and a positioning pillow, but not tubing support. |
| m8-04 paragraphs[2] | absent | Break and shorter session | NOT_IN_CIAS | CLINICAL_REVIEW | Changes the CIAS 1-hour nap step (see clinicalReview: acclimation timing). |
| m8-04 paragraphs[2] | p20 | Ask the team for coaching | PARAPHRASE_OK | NO_ACTION |  |
| m8-04 keyPoints[0] | absent | Practice sleep position/setup | NOT_IN_CIAS | NO_ACTION | App-authored. |
| m8-04 keyPoints[1] | absent | Tubing support | NOT_IN_CIAS | NO_ACTION | Attributed to ATS. |
| m8-05 title | p19 | Step 5 heading | PARAPHRASE_OK | NO_ACTION | Maps to CIAS acclimation step 5. |
| m8-05 paragraphs[0] | p19 | First part of the night | MATCH | NO_ACTION | The 'once comfortable' condition matches CIAS p19: 'Once you are comfortable with that, move onto the next step.' CIAS 'take your machine to the bedroom' is not stated. |
| m8-05 paragraphs[1] | absent | Predictable setup; tubing routing | NOT_IN_CIAS | NO_ACTION | App/ATS-authored. |
| m8-05 paragraphs[2] | p23 | Ask about ramp/autoramp | ORGANIZATIONAL | NO_ACTION | CIAS names the ramp only in Section III (burping/bloating), but describes it as lowering pressure 'while you’re falling asleep', which fits this use. 'Autoramp' is not in CIAS. |
| m8-05 paragraphs[2] | p23 | Review settings with team | ORGANIZATIONAL | NO_ACTION | Consistent with p10 and p20. |
| m8-05 keyPoints[0] | p19 | First part, then build | MATCH | NO_ACTION |  |
| m8-05 keyPoints[1] | p10 | Ramp via care team, no self pressure change | ORGANIZATIONAL | NO_ACTION | 'Autoramp' is not in CIAS. |
| m8-q1 prompt | p19 | Scenario: finished awake stage | PARAPHRASE_OK | NO_ACTION | App-authored scenario built on CIAS step 2. Repo docs say the PAP knowledge checks are written by the app team, not recovered CIAS answer keys. |
| m8-q1 choices.c1 | p10 | Distractor: raise pressure | MATCH | NO_ACTION | CIAS supports marking this wrong. |
| m8-q1 choices.c2 | p19 | Correct: rest/nap practice | MATCH | NO_ACTION | Matches CIAS step '4' and m8-04. |
| m8-q1 choices.c3 | p19 | Distractor: skip stages | MATCH | NO_ACTION | CIAS lets people move at their own pace, but 'force' plus skipping goes against the gradual approach, so marking it wrong is defensible. |
| m8-q1 choices.c4 | p20 | Distractor: stop PAP | MATCH | NO_ACTION | CIAS supports marking this wrong. |
| m8-q1 correctChoiceId | p19 | Answer key c2 | MATCH | NO_ACTION | Supported by the CIAS order (step 2, then the listed '4' naps, then 5 and 6). The CIAS list skips step 3 (see clinicalReview). If a step 3 was lost, the 'next step' order could be affected, but c2 is still the only defensible choice offered. |
| m8-q1 questionFeedback.generalExplanation | p19 | Explanation: rest before night | MATCH | NO_ACTION | Matches the CIAS order of steps 4 then 5. |
| m8-06 title | p19 | Step 6 heading | PARAPHRASE_OK | NO_ACTION | Maps to CIAS acclimation step 6. |
| m8-06 paragraphs[0] | p19 | Work toward whole night | MATCH | NO_ACTION | The CIAS reason ('to get the full benefit of a good night's rest') is left out. |
| m8-06 paragraphs[0] | p19 | Own pace | MATCH | NO_ACTION |  |
| m8-06 paragraphs[1] | p19 | Whole sleep period | PARAPHRASE_OK | NO_ACTION | Wording note: this sits awkwardly next to 'work toward' in the paragraph before. It is also stricter than CIAS p20, which says partial use still helps ('even if it’s not every night or even for a few hours...'). |
| m8-06 paragraphs[1] | absent | Put it back on; note why removed | NOT_IN_CIAS | NO_ACTION | App/ATS-authored. |
| m8-06 paragraphs[2] | p20 | Device data shows patterns | PARAPHRASE_OK | NO_ACTION | CIAS lists sleep quality, duration and how well CPAP treats events. 'Leak' and 'pressure data' are app/ATS details. |
| m8-06 paragraphs[2] | p20 | Data guides the conversation, no self-change | PARAPHRASE_OK | NO_ACTION |  |
| m8-06 keyPoints[0] | absent | Track reasons for removal | NOT_IN_CIAS | NO_ACTION | App-authored list. Each problem on it also appears in CIAS Section III (pp. 21-23). |
| m8-06 keyPoints[1] | p20 | Raise barriers early | PARAPHRASE_OK | NO_ACTION | Also echoes p19 'Support comes in many forms.' |
| m8-07 title | p20 | Section II Q2 heading | MATCH | NO_ACTION |  |
| m8-07 paragraphs[0] | p20 | Symptom diary | PARAPHRASE_OK | NO_ACTION | 'Diary' becomes 'track', and 'and after' is added (implied by CIAS). |
| m8-07 paragraphs[0] | p20 | Symptoms change at different speeds | PARAPHRASE_OK | NO_ACTION | CIAS says symptoms 'will improve'. The app says they 'may change', which no longer says which way. This fits the repo policy against promising outcomes. A reviewer may prefer the CIAS direction. |
| m8-07 paragraphs[1] | p20 | Device collects data | PARAPHRASE_OK | NO_ACTION |  |
| m8-07 paragraphs[2] | p20 | Symptoms vs device data | PARAPHRASE_OK | NO_ACTION | 'Leaks' is an app/ATS detail. |
| m8-07 paragraphs[2] | p10 | Raise persistent sleepiness with provider | ORGANIZATIONAL | NO_ACTION | The two ideas are combined from p10 and p20. The escalation wording is app-authored. CIAS p26 (Section V) notes that daytime sleepiness in pregnancy can have pregnancy-related causes. m8 says nothing about this, and no change is proposed. |
| m8-07 keyPoints[0] | p20 | Log experience and usage | PARAPHRASE_OK | NO_ACTION | Logging hours of use is app-added. |
| m8-07 keyPoints[1] | absent | Follow-up review value | NOT_IN_CIAS | NO_ACTION | App/ATS-authored. |
| m8-08 title | p20 | Section II Q3 heading | PARAPHRASE_OK | NO_ACTION |  |
| m8-08 paragraphs[0] | p20 | Adjustment is normal | MATCH | NO_ACTION |  |
| m8-08 paragraphs[0] | p20 | Fit, air sensation, routine take time | PARAPHRASE_OK | NO_ACTION | Also p19 ('sensation of the air pressure') and p20 ('tweaking to find the right combination of mask and settings'). |
| m8-08 paragraphs[0] | p20 | Raise problems with provider/equipment company | PARAPHRASE_OK | NO_ACTION |  |
| m8-08 paragraphs[1] | absent | Name the specific barrier | NOT_IN_CIAS | NO_ACTION | App-authored list. Mask pressure, leaks, dryness, congestion and noise (whistling) appear in CIAS Section III (pp. 21-23). 'Claustrophobia' and 'difficulty exhaling' appear nowhere in the CIAS text. |
| m8-08 paragraphs[2] | p22 | Comfort options to ask about | ORGANIZATIONAL | NO_ACTION | Mask style (p21), heated humidification (p22, p23) and ramp (p23) are in CIAS Section III. Autoramp and expiratory comfort features are not in CIAS. |
| m8-08 paragraphs[2] | p23 | Comfort options are care-team decisions | CONTRADICTION | CLINICAL_REVIEW | This conflicts in part with CIAS. CIAS lets patients adjust humidification themselves (p21: 'Try turning down the setting or switching back to “auto”'; p23: try the humidifier with and without heat). m9 also tells learners to lower the heated-humidifier setting. Putting humidification under 'care-team decisions' is inconsistent across sources and modules. |
| m8-08 paragraphs[3] | p22 | Contact team; don't abandon | ORGANIZATIONAL | NO_ACTION | Also p20 'definitely keep at it'. |
| m8-08 keyPoints[0] | absent | Describe the problem | NOT_IN_CIAS | NO_ACTION | App-authored. |
| m8-08 keyPoints[1] | p20 | Early discomfort is not failure | PARAPHRASE_OK | NO_ACTION |  |
| m8-09 title | p20 | Section II Q4 heading | PARAPHRASE_OK | NO_ACTION | CIAS heading asks about naps only; the app widens it. |
| m8-09 paragraphs[0] | p20 | Use whenever sleeping | MATCH | NO_ACTION | Also p9: 'every time you sleep'. |
| m8-09 paragraphs[1] | p20 | Every sleep period is best | PARAPHRASE_OK | CLINICAL_REVIEW | The CIAS reason is that each use helps prevent long-term effects, even partial use ('even if it’s not every night or even for a few hours...'). The app keeps the 'every sleep' message and drops the 'partial use still counts' message. |
| m8-09 paragraphs[1] | p20 | Missed sleep periods: ask team | NOT_IN_CIAS | CLINICAL_REVIEW | Replaces the CIAS exception that it is sometimes OK to skip CPAP for power naps under 30 minutes. 'Safely' suggests a risk that CIAS does not describe. This is a real change in usage guidance (see clinicalReview). |
| m8-09 keyPoints[0] | p20 | Routine use, not only when tired | PARAPHRASE_OK | NO_ACTION |  |
| m8-09 keyPoints[1] | p24 | Barriers to naps/travel use | NOT_IN_CIAS | NO_ACTION | App-authored. CIAS gives specific travel advice in Section III (p24: travel CPAP machines, flying with CPAP), which m8 and m9 do not include. |
| m8-10 title | p20 | Section II Q5 heading | PARAPHRASE_OK | NO_ACTION |  |
| m8-10 paragraphs[0] | p20 | Provider sets and adjusts | MATCH | NO_ACTION |  |
| m8-10 paragraphs[0] | p10 | No self-change of pressure | ORGANIZATIONAL | NO_ACTION | Section I content. |
| m8-10 paragraphs[1] | p20 | Share notes and data at follow-up | PARAPHRASE_OK | NO_ACTION | Hours of use and leaks are app/ATS details. |
| m8-10 paragraphs[1] | absent | Mask/comfort change may beat pressure change | NOT_IN_CIAS | NO_ACTION | App/ATS-authored. |
| m8-10 paragraphs[2] | absent | Use only taught settings | NOT_IN_CIAS | NO_ACTION | App-authored. Fits CIAS humidification self-adjustment only if the learner was taught it (see the m8-08 humidification item). |
| m8-10 paragraphs[2] | p23 | Pressure discomfort: contact team | NOT_IN_CIAS | NO_ACTION | The symptom wording is app-authored. Sending it to the provider is supported by CIAS. |
| m8-10 keyPoints[0] | p10 | Settings are treatment | ORGANIZATIONAL | NO_ACTION |  |
| m8-10 keyPoints[1] | p20 | Observations + data inform adjustment | PARAPHRASE_OK | NO_ACTION |  |
| m8-q2 prompt | p20 | Scenario: plans to raise pressure | PARAPHRASE_OK | NO_ACTION | App-authored scenario. |
| m8-q2 choices.c1 | p10 | Distractor: self-increase pressure | MATCH | NO_ACTION | CIAS supports marking this wrong. |
| m8-q2 choices.c2 | p20 | Distractor: stop PAP | MATCH | NO_ACTION | CIAS supports marking this wrong. |
| m8-q2 choices.c3 | p20 | Correct: track and review with provider | MATCH | NO_ACTION | Also p20 diary. |
| m8-q2 choices.c4 | p20 | Distractor: use only when tired | MATCH | NO_ACTION | CIAS supports marking this wrong. |
| m8-q2 correctChoiceId | p20 | Answer key c3 | MATCH | NO_ACTION | This matters medically because the scenario is about changing pressure yourself. The key is the cautious answer and is supported by CIAS (p10, p20). CIAS p20 ('Some symptoms ... might take weeks to get better') also supports continuing after only several days. |
| m8-q2 questionFeedback.generalExplanation | p20 | Explanation | MATCH | NO_ACTION |  |

## Narration and Spanish parity by screen

| Screen | EN narration | ES parity | Spanish notes |
| --- | --- | --- | --- |
| m8-01 | match | OK | Meaning matches overall. Small drift in paragraphs[2]: EN 'decide whether a comfort adjustment is appropriate' became 'si corresponde hacer un cambio de comodidad', which drops 'decide'. Wording only. / Spanish uses the masculine generic for direct address (repo-wide convention). Bilingual reviewer may consider feminine forms for a pregnancy audience. |
| m8-02 | match | OK | Meaning matches. 'equipo de equipos médicos' (equipment team) reads awkwardly but keeps the meaning; this phrase repeats in m8-04, m8-08 and m8-10. |
| m8-03 | match | ISSUE | paragraphs[0] drops 'upright' (EN 'sitting upright'; CIAS p19 'sitting upright'). 'sentado en una posición cómoda' only says 'seated'. See fixes. / keyPoints[1] drops 'practice' ('Aumenta el tiempo gradualmente'). Small, meaning still clear. / Masculine forms ('despierto', 'sentado', 'dormido'): same convention note as m8-01. |
| m8-04 | match | OK | paragraphs[2] 'intenta otra sesión más corta' drops 'another time' (EN 'try a shorter session another time'). Small drift: it could be read as retrying right away. Note for the bilingual reviewer; not CIAS-backed text, so not listed as a fix. |
| m8-05 | match | ISSUE | paragraphs[2] leaves out 'autoramp': EN 'a ramp or autoramp comfort feature' became 'una función de aumento gradual, o rampa'. The keyPoint on the same screen does say 'la rampa o la rampa automática', so the screen is inconsistent. See fixes (parity only; autoramp itself is not in CIAS). |
| m8-q1 | match | ISSUE | Same structure, choice IDs c1-c4, and correctChoiceId c2. Choice meanings match. / narrationText adds the generalExplanation ('Desarrolla la comodidad gradualmente. Practica mientras descansas antes de avanzar hacia el uso nocturno.') after the choices. EN narration ends with the last choice. Because speakScreen plays this before the learner answers, Spanish narration hints at the answer. Root cause: src/content/es/localize.ts line 93. See fixes. |
| m8-06 | match | OK | Meaning matches. |
| m8-07 | match | OK | Meaning matches. |
| m8-08 | match | OK | Meaning matches. 'sensación de encierro' for claustrophobia is acceptable. |
| m8-09 | match | OK | Meaning matches. |
| m8-10 | match | OK | Meaning matches. |
| m8-q2 | match | ISSUE | Same structure, choice IDs c1-c4, and correctChoiceId c3. Choice meanings match. / narrationText adds the generalExplanation ('Sigue usando PAP según se te indicó y revisa ...') after the choices, so it hints at the answer before the learner responds. Same root cause as m8-q1. See fixes. |

## Section II omissions (CIAS content not in m8)

| CIAS page | CIAS quote | Note |
| --- | --- | --- |
| p19 | Congratulations on taking this important step to treating your OSA and taking care of your health! | Opening encouragement left out of m8-01. Content-owner decision. |
| p19 | we are confident once you have the right setup and settings you will feel better and be healthier for it. | Outcome promise left out. Fits the repo policy against promising outcomes; listed for completeness only. |
| p19 | If you know anyone using CPAP, ask for their experience. Support comes in many forms. | Advice to ask other CPAP users about their experience is not anywhere in m8. |
| p19 | we recommend taking 3-5 days at each step but you can certainly move through the steps at your own pace | The suggested 3-5 days per step is not in m8. m8-03 says 'several days' for the awake stage only, and no other stage gives a length. The CIAS wording is clear; whether to restore it is a content decision (see clinicalReview). |
| p19 | Use the CPAP during scheduled 1-hour naps at home. | The 1-hour nap length (and 'at home') are not in m8-04, which says 'a short, planned rest' instead. |
| p19 | If you can nap that is fine. If you just relax and unwind that is the key of this step. | Only partly kept. m8-04 keeps 'sleep not required' but drops 'relax and unwind' as 'the key of this step'. |
| p19 | Now it is time to take your machine to the bedroom. | Small omission: m8-05 keeps 'first part of the night' but not the move to the bedroom, which tells the learner that earlier stages happen elsewhere. |
| p19 | Try this for 3-5 days while reading a book, or watching TV. ○ 4: Use the CPAP during scheduled 1-hour naps at home. | UNRESOLVED source issue, not an m8 defect: the CIAS steps go 1, 2, 4, 5, 6 with no step 3. pypdf on the original PDF and both text extractions agree. Page images could not be rendered (no pdftoppm), so a step 3 that exists only as an image cannot be ruled out. m8 does not number its stages. |
| p20 | people report getting quality sleep, less fatigue, more energy and better focus when using CPAP. | Benefits people report (better sleep, less fatigue, more energy, better focus) and the 'keep at it because it's worth it' encouragement are not in m8-08. |
| p20 | Most people find a combination that works for them in the first few weeks. | The expected timeframe ('first few weeks') for finding a mask and settings that work is not in m8. |
| p20 | most insurance companies will cover ordering different equipment early on, but may have restrictions on trying new masks later | Practical insurance point not in m8: try different masks early, because insurance may limit new masks later. Not medical advice, and it affects when to raise mask problems. |
| p20 | Quick power naps, less than 30 min, sometimes it is ok to skip the CPAP. | The short-nap exception is not in m8-09, which replaces it with 'ask your healthcare team how to handle that situation safely' (see clinicalReview). |
| p20 | even if it’s not every night or even for a few hours and not the whole time you sleep. | The 'partial use still counts' message (with p20 'Each time you use your CPAP while sleeping helps prevent the long-term negative effects of untreated OSA.') is not in m8-09 (see clinicalReview). |
| p28 | if you’re using CPAP to treat sleep apnea, you do not need to wear your CPAP while you’re awake or active. | Outside Section II (Section VI), but it bears on m8-09 'When should I use PAP?'. Not in m8; listed as context only. |
| p27 | Video: How to ﬁt a Philips PAP mask (YouTube) | Outside Section II (Section IV resources): mask-fitting videos (Philips, ResMed) and 'How CPAP Works'. m8 has no video or link fields. Section IV also lists the ATS PAP troubleshooting PDF, which is relevant to the provenance of the ats-pap-troubleshooting supplement. |
| p24 | You can rent or purchase a travel CPAP machine. | Outside Section II (Section III): travel CPAP and flying advice (p24). m8-09 mentions travel only in general terms; neither m8 nor m9 has the CIAS travel specifics. |

## FIX_UNAMBIGUOUS

1. **m8-q1 (es) narrationText**
   - Current: `Una persona ya puede usar PAP cómodamente alrededor de una hora mientras está despierta, pero intentar usarlo toda la noche todavía se siente abrumador. Según la secuencia de adaptación de este módulo, ¿cuál es el mejor siguiente paso? Aumentar la presión indicada para dormirse más rápido. Practicar con PAP mientras está acostada durante un descanso o siesta programados. Omitir las etapas de práctica restantes y obligarse a usarlo toda la noche. Dejar de usar PAP hasta que se sienta completamente natural sin practicar. Desarrolla la comodidad gradualmente. Practica mientras descansas antes de avanzar hacia el uso nocturno.`
   - Proposed: `Una persona ya puede usar PAP cómodamente alrededor de una hora mientras está despierta, pero intentar usarlo toda la noche todavía se siente abrumador. Según la secuencia de adaptación de este módulo, ¿cuál es el mejor siguiente paso? Aumentar la presión indicada para dormirse más rápido. Practicar con PAP mientras está acostada durante un descanso o siesta programados. Omitir las etapas de práctica restantes y obligarse a usarlo toda la noche. Dejar de usar PAP hasta que se sienta completamente natural sin practicar.`
   - Why: Implementation error. ES question narration adds questionFeedback.generalExplanation, which is only shown after answering. EN narration (module-08.ts line 12) is [prompt, ...choices]. speakScreen() plays narrationText before the learner answers, so the hint is read aloud early. Root cause: src/content/es/localize.ts line 93 uses narrationText: draft.body.join(' '); it should use draft.body.slice(0, screen.choices.length + 1).join(' '). The same pattern appears in the exported ES JSON for m5 (q3, q5, q9, q11), m7 (r1) and m9 (q1-q3), outside this audit's scope.
2. **m8-q2 (es) narrationText**
   - Current: `Una persona ha usado PAP durante varios días. Todavía se siente cansada y decide que la presión debe estar demasiado baja, así que planea aumentarla por su cuenta. ¿Qué respuesta coincide mejor con el módulo? Aumentar la presión gradualmente hasta que desaparezca el cansancio durante el día. Dejar de usar PAP hasta que mejore el cansancio. Llevar un registro de los síntomas y el uso, y después revisar los datos de PAP y las configuraciones con el profesional de salud que indicó el tratamiento. Usar PAP solo las noches en que se sienta especialmente cansada. Sigue usando PAP según se te indicó y revisa los síntomas, los datos de uso y las configuraciones con el profesional de salud que indicó el tratamiento.`
   - Proposed: `Una persona ha usado PAP durante varios días. Todavía se siente cansada y decide que la presión debe estar demasiado baja, así que planea aumentarla por su cuenta. ¿Qué respuesta coincide mejor con el módulo? Aumentar la presión gradualmente hasta que desaparezca el cansancio durante el día. Dejar de usar PAP hasta que mejore el cansancio. Llevar un registro de los síntomas y el uso, y después revisar los datos de PAP y las configuraciones con el profesional de salud que indicó el tratamiento. Usar PAP solo las noches en que se sienta especialmente cansada.`
   - Why: Implementation error. ES question narration adds questionFeedback.generalExplanation, which is only shown after answering. EN narration (module-08.ts line 12) is [prompt, ...choices]. speakScreen() plays narrationText before the learner answers, so the hint is read aloud early. Root cause: src/content/es/localize.ts line 93 uses narrationText: draft.body.join(' '); it should use draft.body.slice(0, screen.choices.length + 1).join(' '). The same pattern appears in the exported ES JSON for m5 (q3, q5, q9, q11), m7 (r1) and m9 (q1-q3), outside this audit's scope.
3. **m8-05 (es) paragraphs[2] (same sentence also in narrationText)**
   - Current: `Si todavía te cuesta quedarte dormido, pregunta si tu dispositivo tiene una función de aumento gradual, o rampa, que sea adecuada para ti.`
   - Proposed: `Si todavía te cuesta quedarte dormido, pregunta si tu dispositivo tiene una función de aumento gradual (rampa o rampa automática) que sea adecuada para ti.`
   - Why: Parity fix only. The ES paragraph drops 'autoramp', which is in the EN paragraph and in the ES keyPoint on the same screen ('la rampa o la rampa automática'). CIAS mentions the ramp (p23) but not autoramp, so if clinical review drops autoramp from EN, drop it from both. Source: src/content/es/modules/module-08.ts line 44. ES narration is rebuilt from the body by localize.ts line 86.
4. **m8-03 (es) paragraphs[0] (same sentence also in narrationText)**
   - Current: `Practica usar PAP mientras estás despierto y sentado en una posición cómoda alrededor de una hora al día durante varios días.`
   - Proposed: `Practica usar PAP mientras estás despierto y sentado derecho en una posición cómoda alrededor de una hora al día durante varios días.`
   - Why: Dropped word in translation. EN says 'sitting upright in a comfortable position', and so does CIAS p19 ('while awake and sitting upright in a comfortable position'). The ES draft has only 'sentado'. The bilingual reviewer may prefer 'en posición erguida'; either way the word 'upright' should be restored.

## CLINICAL_REVIEW

1. **m8-02**: CONTRADICTION with CIAS step 1. CIAS p19: 'For this step, don't even worry about plugging in your machine. Focus only on comfort.' m8-02 says 'With the machine running, adjust the straps just enough to create a seal' and its keyPoint says 'Fit the mask with airflow running', right after 'Focus on mask comfort before worrying about using the machine'. Fitting with the machine running is probably from the unapproved ATS supplement. A reviewer should decide whether it belongs in the first stage, a later stage, or the troubleshooting module. No new wording is proposed.
2. **m8-08**: Partial CONTRADICTION about who controls humidification. m8-08 lists heated humidification with ramp, autoramp and expiratory comfort, then says 'These are care-team and device decisions.' CIAS lets patients adjust humidification themselves (p21: 'Try turning down the setting or switching back to “auto” if on a fixed setting'; p23: 'Try the CPAP humidifier with and without heat to see which is most comfortable for you'). m9 also tells learners to lower the heated-humidifier setting. A reviewer should decide which settings patients may adjust and make m8 and m9 agree.
3. **m8-09**: A real change in when-to-use guidance. CIAS p20 says 'Quick power naps, less than 30 min, sometimes it is ok to skip the CPAP' and that partial use still helps ('even if it’s not every night or even for a few hours...'; 'Each time you use your CPAP while sleeping helps prevent the long-term negative effects of untreated OSA'). m8-09 leaves out both and adds 'If you cannot use it for a particular sleep period, ask your healthcare team how to handle that situation safely', which is not in CIAS and suggests a risk CIAS does not describe. A reviewer should decide whether to bring back the CIAS exception and the partial-use message for a pregnancy audience.
4. **m8-03, m8-04**: The acclimation timing differs from CIAS. CIAS p19: 3-5 days per step, 1 hour each day for awake practice, and scheduled 1-hour naps. m8 uses 'several days' (awake stage only), 'a short, planned rest' (nap stage), 'return to a shorter practice period', 'try a shorter session another time' and 'Increase practice time gradually'. These change the CIAS schedule rather than restate it. A reviewer should decide whether to bring back the CIAS durations, keep the more flexible app wording, or use both.
5. **m8-q1 (source)**: Source check, not an m8 defect. The CIAS acclimation list skips step 3 (1, 2, 4, 5, 6) in every text extraction. m8-q1 asks for the 'best next step' after awake practice, and the key (c2, rest/nap practice) matches the CIAS list as it stands. If a step 3 was lost from the source, the expected sequence could change. Among the choices offered, c2 is still the only defensible answer. Ask the CIAS authors to confirm.

## Provenance notes (no action)

- Every m8 screen gets all four sourceIds from the shared constant easyPapSourceIds (src/content/helpers.ts line 7), which m9 also uses. No m8 text is about cleaning, so ats-pap-care-cleaning backs no m8 claim. The tagging is per module, not per claim, and docs/CIAS_SOURCE_TRACEABILITY.md describes it as intended. Mentioned so reviewers don't read it as claim-level backing.
- docs/CIAS_SOURCE_TRACEABILITY.md line 12 says m8 covers 'PAP purpose, mask/tubing/machine parts'. Current m8 covers neither. That Section I material (CIAS p10) is in m1-07 'How Does PAP Help?'. The traceability line is out of date.
- The repo says PAP knowledge checks are written by the app team, not recovered CIAS answer keys. Both m8 keys (q1 c2, q2 c3) are supported by CIAS text and the module's own screens.
