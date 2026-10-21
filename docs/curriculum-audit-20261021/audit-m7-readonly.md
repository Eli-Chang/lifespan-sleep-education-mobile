# m7 "Intimacy": CIAS fidelity audit (read-only)

**Mode:** READ-ONLY. Every finding below is **REPORT_ONLY**. The project owner has already reviewed and approved m7. This audit changes no app content and proposes no rewrites.
**Date:** 2026-10-21
**Auditor:** Claude (independent pass)

## Inputs

| Abbrev. | Source | What was used |
|---|---|---|
| Doc | `cias-normalized.txt` (CIAS EZ-PAP, normalized per page) | Section VI "Intimacy and Sleep Apnea", pp. 28-30. Also searched the whole document for naps (p. 20), low libido (p. 7) and hormones (pp. 25-26) |
| SS | `...\lifespan-sleep-education-mobile\docs\CIAS-SCREENSHOT-SOURCE-ARCHIVE.json` | The 7 records with `module_title` "Intimacy" (screenshots 172231, 172235, 172239, 172244, 172250, 172254, 172258) |
| EN / ES | `m7-en.json`, `m7-es.json` | All 9 screens |
| Renderer | `src\components\LessonRenderer.tsx`, `src\content\rich-presentation.ts`, `src\i18n\index.ts` | Used only to work out which text actually shows on screen, for the narration check |

**Status legend:** MATCH (same wording) / PARAPHRASE_OK (same meaning, reworded) / NOT_IN_CIAS (source has no support) / CONTRADICTION (source says the opposite) / UNRESOLVED (cannot be decided from the sources). Where both CIAS sources apply, each is graded separately as "SS x; Doc y".

**Headline:** 0 CONTRADICTION. The 7 CIAS-derived screens (m7-01 to m7-q2) match the SS transcription exactly: headings, body text, question stems, instructions, options and order were checked by script. The Doc is looser: 5 claims MATCH, 12 are PARAPHRASE_OK and 7 are NOT_IN_CIAS. Both answer keys are UNRESOLVED. The other 2 screens (m7-r1, m7-recap) and the module description were written for the app and do not come from CIAS.

---

## 1. Claim table

| Screen | CIAS locator | Concept | Status | Note |
|---|---|---|---|---|
| m7 (meta) | none | Module description: "Explore intimacy broadly and respectfully without promises or required disclosure." | NOT_IN_CIAS | Written for the app. Not a clinical claim. |
| m7-01 | SS 172231 (screen 1); Doc p28 section title "Section VI Intimacy and Sleep Apnea" | Intro: learn what intimacy is and how it intersects with OSA and PAP use | SS MATCH; Doc NOT_IN_CIAS | Orientation sentence only. The Doc has the section title but no intro sentence. |
| m7-02 | SS 172235 ¶1; Doc p30 "a feeling of being close, and emotionally connected" | Definition quote of intimacy | SS MATCH; Doc MATCH | Doc follows it with a literal "Citation" placeholder. Neither source gives a reference. |
| m7-02 | SS 172235 ¶2; Doc p30 "doesn't necessarily only refer to intercourse" | Intimacy includes conversation, quality time, cuddling, touching, expressing emotions | SS MATCH; Doc MATCH | Doc's next line ("Understanding the type of intimacy that you need...") is not carried. It is also absent from SS. |
| m7-03 | SS 172239 heading; Doc p28 heading "How does sleep apnea impact my partner?" | Screen heading | SS MATCH; Doc PARAPHRASE_OK | In the Doc this heading sits over partner sleep disruption and the 90%/75% statistic. The first three statements on this screen come from the Doc's earlier block "Will wearing the CPAP prevent me from becoming intimate or having sex?". The screen follows SS exactly. |
| m7-03 | SS 172239 ¶1; Doc p28 "CPAP should not prevent you from becoming intimate" | PAP should not prevent intimacy or sex | SS MATCH; Doc PARAPHRASE_OK | The app generalizes CPAP to PAP. "Or having sex" comes from the Doc's block heading. |
| m7-03 | SS 172239 ¶2; Doc p28 "use CPAP every time you sleep ... awake or active" | Wear PAP every time you sleep; not needed when awake or active | SS MATCH; Doc PARAPHRASE_OK | SS wording "important to wear every time you sleep" has no object; the app keeps it as SS has it. Doc's "You can start and stop CPAP at any time" and "may take some time to get used to" are not carried. |
| m7-03 | SS 172239 ¶3; Doc p28 "might be helpful to discuss with bed partners" | Discuss the importance of PAP with your bed partner | SS MATCH; Doc PARAPHRASE_OK | The wording is stronger than the Doc: "might be helpful" (Doc) becomes "it is important" (SS). The Doc's purpose, "to protect your health", is dropped. |
| m7-03 | SS 172239 ¶4; Doc p28 "90% of bed partners were happy ... 75% would recommend" | Bed-partner satisfaction statistic | SS MATCH; Doc MATCH | The Doc has only a "Citation" placeholder, so neither source names a study. SS is missing its final period. |
| m7-04 | SS 172244 (stem, instructions, 6 options exact) | Question: "When is it recommended to wear your PAP mask?" (3 correct) | SS MATCH; Doc NOT_IN_CIAS | The Doc has no questions in Section VI. |
| m7-04 | SS 172244 `correct_answer: NOT VISIBLE IN SOURCE SCREENSHOT`; app `answerBehaviorProvenance: CIAS_ANSWER_KEY_NOT_RECOVERED`, `questionFeedback: {}` | Answer key | UNRESOLVED | Neither app file has a key. See section 2 for how far the Doc supports each option. |
| m7-05 | SS 172250 ¶1; Doc p29 heading "What are some tips for intimacy with sleep apnea?" | Intimacy with sleep apnea "can be tricky" | SS MATCH; Doc PARAPHRASE_OK | Closest Doc text: "it is common adjusting to the look of the machine and being intimate" (p29). |
| m7-05 | SS 172250 ¶2; Doc p29 "take off the mask during times of intimacy" | You can remove the mask when not sleeping, for example during intimacy | SS MATCH; Doc MATCH | Doc's "or even initiate intimacy before putting the mask on" is not carried. |
| m7-05 | SS 172250 ¶3; Doc p29 "Being the 'little spoon' can have your masks face away" | "Little spoon" position keeps the mask out of the partner's way | SS MATCH; Doc PARAPHRASE_OK | The app adds "when sleeping". |
| m7-05 | SS 172250 ¶4; Doc p30 "Talking through your thoughts with a loved one is helpful" | Talking with a loved one or partner helps with concerns | SS MATCH; Doc PARAPHRASE_OK | The Doc limits this to concerns about appearance and opens with "It is completely normal to have some concerns about your appearance". SS widens it to all thoughts and concerns and adds "or your partner". |
| m7-06 | SS 172254 ¶1; Doc none | Pregnancy: it is very normal for sex drive to change (body changes, discomfort, stress, fatigue) | SS MATCH; Doc NOT_IN_CIAS | Only the CIAS app has this. No Doc text links pregnancy to sex drive or libido (whole document searched). |
| m7-06 | SS 172254 ¶2; Doc p28 "Sleep apnea can reduce your sex drive"; Doc p7 "Less interest in sex (low libido)" | Sleep apnea itself can reduce sex drive | SS MATCH; Doc MATCH | |
| m7-06 | SS 172254 ¶2; Doc p28 lists "breathing and oxygen issues", "body-image concerns", "poor mood due to a lack of sleep" | Reduced sex drive is "primarily because sleep quality is worsened" | SS MATCH; Doc NOT_IN_CIAS | The Doc does not rank its causes. Its first mechanism (breathing and oxygen problems affecting organ function) is not on the screen. This is a difference in framing, not a contradiction. |
| m7-06 | SS 172254 ¶3; Doc p28 "CPAP may improve energy levels ... leading to greater libido" | Less energy and desire | SS MATCH; Doc PARAPHRASE_OK | The Doc states the reverse (CPAP improves energy, which raises libido). The screen's version follows from it. |
| m7-06 | SS 172254 ¶4; Doc none in Section VI | Hormone disruption | SS MATCH; Doc NOT_IN_CIAS | The Doc mentions hormones only for pregnancy sleepiness, night sweats and melatonin (pp. 25-26), never for sex drive. |
| m7-06 | SS 172254 ¶5; Doc p28 "poor mood due to a lack of sleep"; Doc p7 "Mood changes (especially depression and anxiety)" | Increased stress, anxiety or depression | SS MATCH; Doc PARAPHRASE_OK | The Doc does not name "stress" as a sex-drive pathway. |
| m7-06 | SS 172254 ¶6; Doc p28 "blood flow, which can stimulate sex drive" | Reduced blood flow | SS MATCH; Doc PARAPHRASE_OK | The Doc states the reverse (CPAP improves blood flow). |
| m7-06 | SS 172254 ¶7; Doc p28 "normal to have a negative perception of your body once you start treatment with CPAP" | CPAP can bring negative body image, which can lower sex drive | SS MATCH; Doc PARAPHRASE_OK | SS hedges more than the Doc ("it can be normal" vs "It is normal"). |
| m7-06 | SS 172254 ¶8; Doc p28 "Using CPAP may improve: energy levels ... blood flow" | CPAP improves sleep quality, which helps restore energy, desire and blood flow | SS MATCH; Doc PARAPHRASE_OK | Doc: "may improve". SS: "plays a crucial role". The SS wording is stronger. |
| m7-06 | SS 172254 ¶8; Doc none | CPAP helps "reduce feelings of stress/anxiety"; "crucial role" | SS MATCH; Doc NOT_IN_CIAS | Section VI does not say CPAP reduces stress or anxiety. |
| m7-q2 | SS 172258 (stem, instructions, 6 options exact) | Question: how pregnancy, OSA and CPAP may affect sex drive (3 correct) | SS MATCH; Doc NOT_IN_CIAS | Its title, "Comprehension Check 1:", repeats m7-04's title. SS numbers it the same way. |
| m7-q2 | SS 172258 `correct_answer: NOT VISIBLE IN SOURCE SCREENSHOT`; app `CIAS_ANSWER_KEY_NOT_RECOVERED`, `questionFeedback: {}` | Answer key | UNRESOLVED | See section 2. |
| m7-r1 | none (`sourceIds: curriculum-master-v3`, no screenshot) | Optional reflection: topics to raise with a healthcare professional (8 options) | NOT_IN_CIAS | Written for the app and makes no clinical claim. The topics overlap CIAS themes such as body image (Doc p28, p30) and energy (Doc p28). |
| m7-r1 | none | Feedback: no correct answer; stays on device; not sent to AI automatically | NOT_IN_CIAS | Statement about how the app handles data; outside CIAS scope. This audit did not check device behavior. |
| m7-recap | Doc p30 (forms of intimacy); no SS summary record exists for Intimacy | Intimacy includes many forms of closeness | SS NOT_IN_CIAS; Doc PARAPHRASE_OK | The SS archive has 7 Intimacy records and none is a recap. |
| m7-recap | Doc p28 (sex drive, energy, mood, partner sleep disruption); Doc p29 (CPAP "may first seem like a barrier") | OSA and PAP may affect energy, shared sleep, emotions, comfort and sexual health | Doc PARAPHRASE_OK | |
| m7-recap | none | "but experiences differ" | NOT_IN_CIAS | Framing added for the app. Consistent with CIAS, not contradictory. |
| m7-recap | Doc p28, p30 point to partners and loved ones, not clinicians | These concerns can be discussed with healthcare professionals | NOT_IN_CIAS | Not contradictory. Section VI never tells the reader to talk to a clinician. |
| m7-recap | none | Personal disclosure in the app is never required | NOT_IN_CIAS | App policy statement. |

---

## 2. Answer-key support (m7-04, m7-q2)

Neither the app (EN or ES) nor the SS transcription has a recovered key. The column "Doc reading" is the auditor's reading of the CIAS text. **It is not a recovered key and is not a requirement.** It is included only to show that a 3-correct key consistent with the source exists.

### m7-04 "When is it recommended to wear your PAP mask?"

| Choice | Doc reading | CIAS locator | Status | Note |
|---|---|---|---|---|
| c1 When you are planning to fall asleep | Supported as correct | Doc p28 "use CPAP every time you sleep"; SS 172239 ¶2 | UNRESOLVED (key) / supported | |
| c2 When you are being intimate with your partner | Supported as incorrect | Doc p29 "take off the mask during times of intimacy"; SS 172250 ¶2 | UNRESOLVED (key) / supported | |
| c3 During naps | Supported as correct, with a nuance | Doc p20 "anytime you sleep, including at night, during naps" | UNRESOLVED (key) / supported | Doc p20 also says that for quick power naps under 30 minutes "sometimes it is ok to skip the CPAP". No m7 screen mentions naps. |
| c4 If you think you might fall asleep while relaxing in bed with your partner | Inferred correct (no explicit text) | Follows from Doc p28 "every time you sleep" | UNRESOLVED | Inference only. |
| c5 Only if your partner says your snoring is loud | Supported as incorrect | Doc p28 "every time you sleep" | UNRESOLVED (key) / supported | |
| c6 During sexual activity | Supported as incorrect | Doc p28 "do not need to wear your CPAP while you're awake or active"; Doc p29 | UNRESOLVED (key) / supported | |

On this reading c1, c3 and c4 are correct: 3 correct options, matching the on-screen hint.

### m7-q2 "Which statements correctly describe how pregnancy, OSA, and CPAP may affect sex drive?"

| Choice | Doc reading | CIAS locator | Status | Note |
|---|---|---|---|---|
| c1 Pregnancy sex drive can normally change | Correct per SS only | SS 172254 ¶1; Doc none | UNRESOLVED (key) / SS only | Rests on the claim that only SS contains (section 1). |
| c2 OSA reduces sex drive by worsening sleep quality (energy, desire) | Correct | SS 172254 ¶2-3; Doc p28 (sex drive reduced, but different mechanisms) | UNRESOLVED (key) / supported | |
| c3 CPAP always immediately increases sex drive, never affects body image | Incorrect | SS 172254 ¶7; Doc p28 body-image statement | UNRESOLVED (key) / supported | |
| c4 Pregnancy change always means something is medically wrong | Incorrect | SS 172254 ¶1 ("very normal"); Doc silent | UNRESOLVED (key) / SS only | |
| c5 CPAP improves sleep quality: energy, desire, blood flow, stress or anxiety | Correct | SS 172254 ¶8; Doc p28 (no stress or anxiety) | UNRESOLVED (key) / partly supported | |
| c6 OSA affects sex drive only through body image | Incorrect | SS 172254 list; Doc p28 lists several causes | UNRESOLVED (key) / supported | The option names "hormones", which only SS supports. |

On this reading c1, c2 and c5 are correct: 3 correct options, matching the hint.

**How the app behaves today (from LessonRenderer.tsx, lines 158-160 and 271-279):** questions marked `CIAS_ANSWER_KEY_NOT_RECOVERED` are drawn as reflections. They show a "PERSONAL REFLECTION" cue, the line "Select any that apply. This response is never graded." and "This stays on your device." They are never scored. The hint "There are 3 correct answers" still shows directly above "never graded".

---

## 3. narrationText vs visible content (in order)

Content and summary screens narrate the paragraphs or key points and leave out the title. That is how `helpers.ts` and `localize.ts` are built, and it is the same in both languages.

| Screen | EN | ES | Note |
|---|---|---|---|
| m7-01 | Equal | Equal | |
| m7-02 | Equal | Equal | An image shows on screen; its alt text is not narrated (both languages). |
| m7-03 | Equal | Equal | The narration keeps the literal "•" characters. On screen the bullets are drawn as styled dots and the glyph is removed. |
| m7-04 | **Differs** | **Differs** | EN narration order is title, instructions, prompt, choices. On screen the EN title "Comprehension Check 1:" is visually hidden and `aria-hidden`, because it matches the boilerplate filter. The prompt shows before the instructions. So EN narrates a hidden title and reads the instructions before the prompt (the reverse of the screen and of SS). ES narration is prompt, instructions, choices. On screen ES **shows** the title "Comprobación de conocimientos 1:", because the filter has no numbered Spanish variant (checked with a regex test), so the ES narration leaves out a visible title. Neither language narrates the reflection lines (cue, "never graded", privacy). |
| m7-05 | Equal | Equal | Same image and "•" notes as above. |
| m7-06 | Equal | Equal | Same image and "•" notes as above. |
| m7-q2 | **Differs** | **Differs** | Same pattern as m7-04. |
| m7-r1 | Equal, except the visible title "Optional reflection" is not narrated | **Differs** | ES narration adds "No hay respuesta correcta. Esta reflexión permanece local..." at the end. That text never shows on screen, because the explanation is hidden for saved responses (LessonRenderer.tsx line 290). EN does not narrate it. The two languages differ. |
| m7-recap | Equal | Equal | |

---

## 4. Spanish parity (mechanical)

Checked by script (a temporary audit script, plus inline checks):

- **Screens:** 9 in each file, with the same IDs, order, `type`, `questionKind` and `answerBehaviorProvenance`. `sourceScreenshotIds` are identical.
- **Choice IDs:** identical (m7-04 c1-c6, m7-q2 c1-c6, m7-r1 c1-c8), with options in the same order and meaning.
- **Answer keys:** neither file has any answer-key field on any question, so they are trivially equal. `questionFeedback` is `{}` in both for m7-04 and m7-q2. m7-r1 `generalExplanation` exists in both.
- **Paragraph and key-point counts:** identical on every content and summary screen. No sentences are missing. The only differences in sentence-end counts are periods ES adds where EN and SS have none (m7-03 ¶4; m7-q2 instructions).
- **Untranslated English:** none found. The only ES string identical to EN is "No." (valid Spanish). Acronyms kept as-is: PAP, CPAP. "AOS" stands for OSA, "IA" for AI, and "app" is the usual loanword.
- **Status metadata:** m7-01 to m7-q2 are `translated_from_approved_english`. m7-r1 and m7-recap are `machine_drafted`. `bilingualReviewStatus` is `not_reviewed` on every screen.

Differences in meaning (REPORT_ONLY, not mechanical failures):

| Screen | EN | ES | Observation |
|---|---|---|---|
| m7-03 ¶2, ¶3 | "important to wear every time you sleep"; "importance of using PAP therapy" | "mantener la adherencia al tratamiento" (twice) | ES adds the idea of "treatment adherence", which EN and SS do not have. |
| m7-03 ¶4 | "see you that way" | "verle con la máquina" | ES adds "with the machine" to make the meaning explicit. |
| m7-04 c1, c4 | "fall asleep" | "quedarse dormido" | Masculine form, although the audience is pregnant patients. |
| m7-06 ¶1 | "very normal" | "completamente normal" | Stronger in ES. |
| m7-06 ¶2 | "Sleep apnea itself" | "La apnea del sueño" | ES drops "itself". |
| m7-06 ¶7 | "it can be normal to have" | "es normal que algunas personas tengan" | The hedge moves from "can be" to "some people". |
| m7-06 ¶8 | "crucial role" | "papel importante" | Softer in ES. |
| m7-r1 prompt | "from this module ... healthcare professional" | "¿Hay un tema que quizá quiera tratar con un profesional?" | ES drops "de este módulo" and "de la salud". |
| m7-r1 c4 | "Relationship or shared-sleep concerns." | "Relación o sueño compartido." | ES drops "concerns". |
| m7-recap | "healthcare professionals" | "profesionales" | ES drops "de la salud". |
| m7-recap | (formal) | "Espero que hayas aprendido" | Informal tú here; the rest of the module uses usted. |
| m7 meta | "broadly and respectfully" | "con respeto" | ES drops "broadly". |

Bold emphasis on screen (rich-presentation.ts):
- **m7-03:** none of the EN bold phrases ("PAP treatment", "treatment adherence") appears in the EN text, so EN shows no bold. ES shows both phrases in bold.
- **m7-06:** the EN phrase "sleep apnea can reduce sexual desire" is not in the EN text, so EN bolds one phrase and ES bolds two.

---

## 5. Noteworthy (all REPORT_ONLY)

1. **For a clinician: the comprehension checks never correct a wrong answer.** Neither the app nor SS has a key for m7-04 or m7-q2, so the app shows them as never-graded reflections while still saying "There are 3 correct answers." A learner who selects "During sexual activity" or "When you are being intimate with your partner" gets no correction. The CIAS Doc does support a 3-correct key for each question (section 2), but that is the auditor's reading, not a recovered key.
2. **The two CIAS sources differ on m7-06.** Only the CIAS app screenshot has the pregnancy sex-drive sentence, "hormone disruption", "primarily because sleep quality is worsened", "crucial role" and "reduce stress/anxiety". The EZ-PAP Doc gives breathing and oxygen problems, body image and poor mood as the causes. None of this contradicts the Doc, but a clinician may want to say which source is authoritative.
3. **The statistic has no citation.** The 90%/75% bed-partner figure (m7-03) has no reference in either source; the Doc shows a literal "Citation" placeholder.
4. **Naps nuance.** m7 teaches "every time you sleep". Doc p20 allows skipping CPAP for quick power naps under 30 minutes. This is not a contradiction, but it matters if "During naps" is ever keyed as correct.
5. **Heading placement.** m7-03's heading "How does sleep apnea impact my partner?" sits over content that the Doc files under "Will wearing the CPAP prevent me from becoming intimate or having sex?". The app follows SS exactly here.
6. **Narration.** It does not match the screen on m7-04 and m7-q2 in either language (the errors run in opposite directions in EN and ES), or on m7-r1 in ES (section 3).
7. **Rendering differs between languages.** EN hides the "Comprehension Check 1:" title and ES shows "Comprobación de conocimientos 1:". Bold emphasis also differs on m7-03 and m7-06 (section 4).
8. **Spanish wording drift.** Items are listed in section 4: added "adherence" wording, shifts in strength, words dropped from the m7-r1 prompt and the recap, tú vs usted, and masculine "dormido".
9. **Review metadata is out of date.** Every screen, and the module, still says `clinicalReviewStatus: not_reviewed` in both files, even though the module has owner approval. This is metadata only.
10. **CIAS Doc content not in m7:** dating guidance, travel CPAP and one-night stands (p29); "Individuals with partners experienced better adherence" (p29); relationship satisfaction (p29); partner sleep disruption including a newborn (p28); "CPAP reduces snoring and will be appreciated by bed partners" (p28). None of it is in the SS Intimacy records either, so m7 is faithful to the CIAS app. Some of it appears in m2 (`src\content\en\cias-source.ts` m2-04, m2-05).
11. **Not verified: saved answers may carry over.** `src\state\curriculum-migration.ts` keeps saved answers by screen ID. An older version of the app's m7-q2 (still present, but filtered out, in `src\content\en\modules\module-07.ts`) had different option text under the same IDs (c1 to c6). If that version ever reached users, their old selections would show pre-selected on the new question. This audit did not check whether that version shipped.
12. **No PHI.** Nothing in any input contained PHI or identifiers; all of it is curriculum text.
