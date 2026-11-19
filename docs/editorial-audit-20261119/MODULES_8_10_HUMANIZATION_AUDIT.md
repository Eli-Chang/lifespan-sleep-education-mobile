# Modules 8-10 humanization: editorial audit

Date: 2026-11-19. Branch `work/english-review-demo-20261116`. English text only. This is an editorial pass, not clinical approval. A model check is not independent clinical review.

## Scope and module identifiers

The request said "Modules 8, 9 and 10". In the code the learner-facing order is: order 8 is `m7` (CIAS screenshot transcription, verbatim, not AI-written), order 9 is `m8` Getting Started with PAP, order 10 is `m9` Troubleshooting PAP. The earlier provenance audit found AI-assisted text only in `m8` and `m9` (source ids `cias-ez-pap-document` and `ats-pap-*`). This pass therefore edited **`m8` and `m9` only**. `m7` was inspected as a style reference and left unchanged. There is no `m10` file. If Eli wants `m7` humanized too, that is a separate decision because it is CIAS source text.

## Skill used

`blader/humanizer` v4.0.0, commit `b48c832f0f809c1b5658edbb838c2521b72f2413` (2026-11-09), MIT. Only `SKILL.md` and `LICENSE` were copied (no scripts, hooks or plugin manifests), to `.agents/skills/humanizer/` and `.claude/skills/humanizer/`. Review: no network calls, no executables, no `allowed-tools`; the repository has only a package validator script, which was not copied. The rewrite was done by Claude (Sonnet 5.5) in this Claude Code session. Pass B was a separate Claude Opus reviewer agent that compared every before/after pair claim by claim, twice. Neither is a clinician.

## Counts

Text items reviewed: 157 (titles, paragraphs, key points, question prompts, choices and explanations in `m8` and `m9`). Keep: 141. Light edit: 12. Rewrite: 2. Clinical review (left unchanged): 2. Edits proposed first: 26. Reverted after independent review: 12. Final edits: 14.

Patterns found were few; the modules are mostly plain already. Corrected: em dashes, semicolon splices, passive "should be discussed rather than" constructions, a confusing "intended airflow is escaping", and stiff phrasing. Not touched: quiz prompts, choices, explanations, answer keys, "Correct." and "Not quite." feedback, module titles and descriptions, image alt text.

## Meaning-preservation record (final edits)

| Screen | Field | Original | Revised | Reason | Meaning | Flag |
|---|---|---|---|---|---|---|
| m8-01 | paragraphs[0] | Getting used to PAP can take time. Move through the acclimation stages at your own pace, and ask the prescribing healthcare provider when questions or problems arise. | Getting used to PAP can take time. Move through the acclimation stages at your own pace, and ask the prescribing healthcare provider when questions or problems come up. | Light: 'arise' to plain 'come up'. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m8-01 | paragraphs[1] | PAP is prescribed with a particular mask or interface and settings. At first, the goal is to make the mask, airflow, and routine familiar enough to use during sleep—not to force a perfect night immediately. | PAP is prescribed with a particular mask or interface and settings. At first, the goal is to make the mask, airflow, and routine familiar enough to use during sleep, not to force a perfect night immediately. | Removed the em dash only; the contrast corrects a real expectation, so it stays. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m8-04 | paragraphs[0] | Next, use PAP while lying down during a scheduled rest or nap. Put your head down and close your eyes. Actually falling asleep is not required for this practice to be useful. | Next, use PAP while lying down during a scheduled rest or nap. Put your head down and close your eyes. You do not have to fall asleep for this practice to help. | Light: removed stilted 'Actually ... is not required ... to be useful'. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m8-05 | paragraphs[2] | If falling asleep remains difficult, ask whether your device has a ramp or autoramp comfort feature that is appropriate for you. These settings should be reviewed with the sleep-care team rather than changed independently. | If falling asleep remains difficult, ask whether your device has a ramp or autoramp comfort feature that is appropriate for you. Review these settings with the sleep-care team instead of changing them on your own. | Light: passive 'should be reviewed ... rather than changed independently' made into a direct instruction. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m8-07 | paragraphs[2] | Symptoms and device data answer different questions: your notes describe how you feel, while the device can show use, leaks, and treatment information. Persistent sleepiness or worsening symptoms should be discussed with the healthcare provider rather than used as a reason to change pressure yourself. | Symptoms and device data answer different questions. Your notes describe how you feel, and the device can show use, leaks, and treatment information. If sleepiness persists or symptoms get worse, talk with the healthcare provider instead of changing the pressure yourself. | Split a colon-and-semicolon sentence; replaced the passive 'should be discussed ... rather than used as a reason'. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m8-08 | paragraphs[1] | Name the specific barrier—mask pressure, leaks, dryness, congestion, noise, claustrophobia, or difficulty exhaling—because each may have a different solution. | Name the specific barrier, whether it is mask pressure, leaks, dryness, congestion, noise, claustrophobia, or difficulty exhaling, because each may have a different solution. | Removed em dashes; kept the stated reason. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m8-09 | paragraphs[1] | Using it for every sleep period gives the treatment the best chance to support breathing across the time you are asleep. If you cannot use it for a particular sleep period, ask your healthcare team how to handle that situation safely. | Using it for every sleep period gives the treatment the best chance to support your breathing the whole time you are asleep. If you cannot use it for a particular sleep period, ask your healthcare team how to handle that safely. | Light: wordy 'across the time you are asleep' and 'that situation' tightened. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m8-09 | keyPoints[0] | Keep the mask and machine part of your sleep routine, not only a response to feeling tired. | Keep the mask and machine part of your regular sleep routine instead of using them only when you feel tired. | Removed the 'X, not only Y' contrast. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m8-10 | keyPoints[0] | PAP settings are part of treatment, not a self-directed experiment. | Do not change PAP settings on your own; they are part of your prescribed treatment. | Removed the 'not a self-directed experiment' contrast; states the instruction directly. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m9-02 | paragraphs[1] | With the machine running, gently reseat the mask and adjust one strap at a time. The goal is a seal that stays in place without painful pressure; overtightening can make pressure points and leaks worse. | With the machine running, gently reseat the mask and adjust one strap at a time. The goal is a seal that stays in place without painful pressure. Overtightening can make pressure points and leaks worse. | Split a semicolon sentence. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m9-03 | paragraphs[0] | Air leaks may mean intended airflow is escaping. Check fit and straps. Red or sore eyes after waking can signal air leaking from the top of the mask. If it persists, another mask style may be needed. | A leak may mean that air meant for you is escaping. Check the fit and straps. Red or sore eyes after waking can be a sign of air leaking from the top of the mask. If the leak or eye irritation continues, you may need another mask style. | Clarified the confusing 'intended airflow is escaping'; named what 'it' refers to. | Preserved (separate reviewer, claim by claim) | language review |
| m9-06 | paragraphs[0] | PAP airflow can feel drying. Nasal saline and PAP humidification may improve comfort, but too much humidity can cause unwanted moisture. Discuss persistent problems with the healthcare or equipment team. | PAP airflow can feel drying. Nasal saline and PAP humidification may improve comfort, but too much humidity can cause unwanted moisture. Talk with the healthcare or equipment team about problems that continue. | Light: 'Discuss persistent problems' made plain. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m9-09 | paragraphs[0] | Burping or bloating may be a sign of swallowing air. Some PAP devices have a ramp feature that reduces pressure while falling asleep. Discuss pressure changes with the healthcare provider rather than making them independently. | Burping or bloating may be a sign of swallowing air. Some PAP devices have a ramp feature that reduces pressure while falling asleep. Talk with the healthcare provider about pressure changes instead of making them yourself. | Light: 'Discuss ... rather than making them independently' made direct. | Preserved (separate reviewer, claim by claim) | none beyond existing register |
| m9-09 | paragraphs[2] | Persistent, painful, or worsening bloating needs prompt review of the mask, pressure, and device mode. The clinician may consider an expiratory comfort feature, auto-PAP, or bilevel PAP when appropriate—these are not self-directed changes. | Persistent, painful, or worsening bloating needs prompt review of the mask, pressure, and device mode. The clinician may consider an expiratory comfort feature, auto-PAP, or bilevel PAP when appropriate. These are not changes to make on your own. | Removed em dash. | Preserved (separate reviewer, claim by claim) | none beyond existing register |

## Proposed first, then reverted

The independent reviewer found a changed claim, hedge or instruction in these, so the original text stands.

| Screen | Field | Why reverted |
|---|---|---|
| m8-03 | paragraphs[2] | Lost the idea of repeating practice; "works better" claims more. |
| m8-06 | paragraphs[2] | "Bring that information" assumes the patient carries device data. |
| m8-06 | keyPoints[1] | Minor shift ("easier"), not worth the change. |
| m8-08 | keyPoints[1] | Turned an instruction into a statement. |
| m9-01 | paragraphs[0] | "These" had no referent and "steps" promised a procedure. |
| m9-02 | paragraphs[0] | "Marks that last" is vaguer than "persistent". |
| m9-03 | paragraphs[2] | Clunky and no gain. |
| m9-04 | paragraphs[0] | Picked one meaning of the ambiguous word "supported". |
| m9-05 | keyPoints[0] | "Keeps happening" narrows "persistent" and dropped "Treat ... as". |
| m9-06 | keyPoints[0] | "As well as" blurred the corrective point. |
| m9-07 | paragraphs[0] | "Keeps happening" narrows "persistent". |
| m9-07 | keyPoints[0] | Changed who reviews the interface. |

## Items left unchanged for clinical or author review

- `m9-11` paragraphs[0]: The phrase 'Compatible general guidance' is ambiguous (compatible with what?). Left unchanged; needs author or clinician wording.
- `m9-04` paragraphs[0]: The phrase 'supported humidification and tubing-warming controls' can mean device-supported or care-team-approved. Left unchanged.
- Existing clinical-review register items for these modules are unchanged and still open (`src/content/clinical-review-register.ts`): m8-02 mask fitted with machine running vs CIAS, m8-08 humidification as a care-team decision, m8-09 omitted nap and partial-use allowances, m8-03 and m8-04 vague practice timing, m9-04, m9-07 and m9-09 differences from CIAS, m9-05 omitted CIAS suggestions, m9-08 omitted pregnancy-safety statements, m9-11 cleaning schedule. This pass did not resolve or alter them.

## Translation dependencies

Spanish, Portuguese and Creole text for `m8` and `m9` is unchanged and keyed by unit id, so nothing broke. A bilingual reviewer should re-read the translations of these changed English units against the new English:

`m8-01::paragraphs[0]`, `m8-01::paragraphs[1]`, `m8-04::paragraphs[0]`, `m8-05::paragraphs[2]`, `m8-07::paragraphs[2]`, `m8-08::paragraphs[1]`, `m8-09::paragraphs[1]`, `m8-09::keyPoints[0]`, `m8-10::keyPoints[0]`, `m9-02::paragraphs[1]`, `m9-03::paragraphs[0]`, `m9-06::paragraphs[0]`, `m9-09::paragraphs[0]`, `m9-09::paragraphs[2]`

No translation approval exists in `review-register.ts`, so no approval became stale. Narration comes from `narrationText`, which is rebuilt from the paragraphs and key points, so it follows the English edits. The repository has no recorded audio or caption files.

## Classification of every inventoried item

The original wording of every item is in git history at `fb7497a`.

| Screen | Field | Class |
|---|---|---|
| m8-01 | title | Keep |
| m8-01 | paragraphs[0] | Light edit |
| m8-01 | paragraphs[1] | Light edit |
| m8-01 | paragraphs[2] | Keep |
| m8-01 | keyPoints[0] | Keep |
| m8-01 | keyPoints[1] | Keep |
| m8-02 | title | Keep |
| m8-02 | paragraphs[0] | Keep |
| m8-02 | paragraphs[1] | Keep |
| m8-02 | paragraphs[2] | Keep |
| m8-02 | keyPoints[0] | Keep |
| m8-02 | keyPoints[1] | Keep |
| m8-03 | title | Keep |
| m8-03 | paragraphs[0] | Keep |
| m8-03 | paragraphs[1] | Keep |
| m8-03 | paragraphs[2] | Keep |
| m8-03 | keyPoints[0] | Keep |
| m8-03 | keyPoints[1] | Keep |
| m8-04 | title | Keep |
| m8-04 | paragraphs[0] | Light edit |
| m8-04 | paragraphs[1] | Keep |
| m8-04 | paragraphs[2] | Keep |
| m8-04 | keyPoints[0] | Keep |
| m8-04 | keyPoints[1] | Keep |
| m8-05 | title | Keep |
| m8-05 | paragraphs[0] | Keep |
| m8-05 | paragraphs[1] | Keep |
| m8-05 | paragraphs[2] | Light edit |
| m8-05 | keyPoints[0] | Keep |
| m8-05 | keyPoints[1] | Keep |
| m8-q1 | prompt | Keep |
| m8-q1 | choices[0] | Keep |
| m8-q1 | choices[1] | Keep |
| m8-q1 | choices[2] | Keep |
| m8-q1 | choices[3] | Keep |
| m8-q1 | generalExplanation | Keep |
| m8-06 | title | Keep |
| m8-06 | paragraphs[0] | Keep |
| m8-06 | paragraphs[1] | Keep |
| m8-06 | paragraphs[2] | Keep |
| m8-06 | keyPoints[0] | Keep |
| m8-06 | keyPoints[1] | Keep |
| m8-07 | title | Keep |
| m8-07 | paragraphs[0] | Keep |
| m8-07 | paragraphs[1] | Keep |
| m8-07 | paragraphs[2] | Light edit |
| m8-07 | keyPoints[0] | Keep |
| m8-07 | keyPoints[1] | Keep |
| m8-08 | title | Keep |
| m8-08 | paragraphs[0] | Keep |
| m8-08 | paragraphs[1] | Light edit |
| m8-08 | paragraphs[2] | Keep |
| m8-08 | paragraphs[3] | Keep |
| m8-08 | keyPoints[0] | Keep |
| m8-08 | keyPoints[1] | Keep |
| m8-09 | title | Keep |
| m8-09 | paragraphs[0] | Keep |
| m8-09 | paragraphs[1] | Light edit |
| m8-09 | keyPoints[0] | Light edit |
| m8-09 | keyPoints[1] | Keep |
| m8-10 | title | Keep |
| m8-10 | paragraphs[0] | Keep |
| m8-10 | paragraphs[1] | Keep |
| m8-10 | paragraphs[2] | Keep |
| m8-10 | keyPoints[0] | Rewrite |
| m8-10 | keyPoints[1] | Keep |
| m8-q2 | prompt | Keep |
| m8-q2 | choices[0] | Keep |
| m8-q2 | choices[1] | Keep |
| m8-q2 | choices[2] | Keep |
| m8-q2 | choices[3] | Keep |
| m8-q2 | generalExplanation | Keep |
| m9-01 | title | Keep |
| m9-01 | paragraphs[0] | Keep |
| m9-01 | paragraphs[1] | Keep |
| m9-01 | paragraphs[2] | Keep |
| m9-01 | keyPoints[0] | Keep |
| m9-01 | keyPoints[1] | Keep |
| m9-02 | title | Keep |
| m9-02 | paragraphs[0] | Keep |
| m9-02 | paragraphs[1] | Light edit |
| m9-02 | paragraphs[2] | Keep |
| m9-02 | keyPoints[0] | Keep |
| m9-02 | keyPoints[1] | Keep |
| m9-03 | title | Keep |
| m9-03 | paragraphs[0] | Rewrite |
| m9-03 | paragraphs[1] | Keep |
| m9-03 | paragraphs[2] | Keep |
| m9-03 | keyPoints[0] | Keep |
| m9-03 | keyPoints[1] | Keep |
| m9-04 | title | Keep |
| m9-04 | paragraphs[0] | Clinical review |
| m9-04 | paragraphs[1] | Keep |
| m9-04 | paragraphs[2] | Keep |
| m9-04 | keyPoints[0] | Keep |
| m9-04 | keyPoints[1] | Keep |
| m9-05 | title | Keep |
| m9-05 | paragraphs[0] | Keep |
| m9-05 | paragraphs[1] | Keep |
| m9-05 | paragraphs[2] | Keep |
| m9-05 | keyPoints[0] | Keep |
| m9-05 | keyPoints[1] | Keep |
| m9-q1 | prompt | Keep |
| m9-q1 | choices[0] | Keep |
| m9-q1 | choices[1] | Keep |
| m9-q1 | choices[2] | Keep |
| m9-q1 | choices[3] | Keep |
| m9-q1 | generalExplanation | Keep |
| m9-06 | title | Keep |
| m9-06 | paragraphs[0] | Light edit |
| m9-06 | paragraphs[1] | Keep |
| m9-06 | paragraphs[2] | Keep |
| m9-06 | keyPoints[0] | Keep |
| m9-06 | keyPoints[1] | Keep |
| m9-07 | title | Keep |
| m9-07 | paragraphs[0] | Keep |
| m9-07 | paragraphs[1] | Keep |
| m9-07 | paragraphs[2] | Keep |
| m9-07 | keyPoints[0] | Keep |
| m9-07 | keyPoints[1] | Keep |
| m9-08 | title | Keep |
| m9-08 | paragraphs[0] | Keep |
| m9-08 | paragraphs[1] | Keep |
| m9-08 | paragraphs[2] | Keep |
| m9-08 | keyPoints[0] | Keep |
| m9-08 | keyPoints[1] | Keep |
| m9-09 | title | Keep |
| m9-09 | paragraphs[0] | Light edit |
| m9-09 | paragraphs[1] | Keep |
| m9-09 | paragraphs[2] | Light edit |
| m9-09 | keyPoints[0] | Keep |
| m9-09 | keyPoints[1] | Keep |
| m9-10 | title | Keep |
| m9-10 | paragraphs[0] | Keep |
| m9-10 | paragraphs[1] | Keep |
| m9-10 | paragraphs[2] | Keep |
| m9-10 | keyPoints[0] | Keep |
| m9-10 | keyPoints[1] | Keep |
| m9-q2 | prompt | Keep |
| m9-q2 | choices[0] | Keep |
| m9-q2 | choices[1] | Keep |
| m9-q2 | choices[2] | Keep |
| m9-q2 | choices[3] | Keep |
| m9-q2 | generalExplanation | Keep |
| m9-11 | title | Keep |
| m9-11 | paragraphs[0] | Clinical review |
| m9-11 | paragraphs[1] | Keep |
| m9-11 | paragraphs[2] | Keep |
| m9-11 | paragraphs[3] | Keep |
| m9-11 | keyPoints[0] | Keep |
| m9-11 | keyPoints[1] | Keep |
| m9-q3 | prompt | Keep |
| m9-q3 | choices[0] | Keep |
| m9-q3 | choices[1] | Keep |
| m9-q3 | choices[2] | Keep |
| m9-q3 | choices[3] | Keep |
| m9-q3 | generalExplanation | Keep |

## Verification (commands actually run, 2026-11-19)

- `npm test`: 89 of 89 pass.
- `npm run typecheck`: 0 errors. `npm run lint`: 0 errors, 2 existing warnings in `app/lesson/[moduleId]/[screenId].tsx`.
- `npm run validate:content`: passed (10 modules, 113 screens, English and Spanish ids match).
- `npx tsx scripts/generate-review-reports.ts --check`: clean.
- Structure walk of `m8` and `m9` before and after (script in the working notes, not committed): same keys, array lengths, screen ids, choice ids, `correctChoiceId` values, source ids and review flags. Only `paragraphs`, `keyPoints` and derived `narrationText` strings differ (25 strings: 14 edits plus 11 narration rebuilds).
- Content hashes of all English, Spanish, pt-BR and Creole modules before and after: only `en:m8` and `en:m9` changed. Modules `m1` to `m7`, so the six earlier English fixes in `m1`, `m2`, `m5` and `m6`, are byte-identical.
- `tests/e2e/humanize-m8-m9.spec.ts` (new): every paragraph and key point of all 26 screens of `m8` and `m9` renders on its lesson route; phone-width and desktop screenshots of `m8-01`, `m9-03` and `m9-09` saved to `artifacts/humanize/shots/` (not committed). Passed 1 of 1. The learner sees `m9` as "Module 10".
- Existing browser specs `app`, `locale-status` and `curriculum-review` (the six-fix review page): 8 of 8 passed.
- Not run in this pass: the full browser suite (the four-language spec takes about 15 minutes and does not touch English `m8` and `m9`), Spanish, Portuguese and Creole visual checks, device text-to-speech, and any clinician or bilingual review.
