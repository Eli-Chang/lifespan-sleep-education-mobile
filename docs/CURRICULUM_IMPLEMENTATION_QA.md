# Curriculum version 8 implementation QA

## Delivered

- Seven English modules and a 96-screen stable-ID curriculum.
- Spanish structural parity, marked `machine_drafted` and `not_reviewed`.
- Objective questions with explicit keys, per-choice feedback, retry, and answer editing.
- Reflections that are saved but never scored.
- Four bounded teach-back rubrics, two PAP-barrier activities, action planning, and question organizers.
- Lesson-level Ask and Explain actions using only server-controlled module context.
- Explicit AI consent, revocation, bounded payloads, local action-plan editing, and deletion.
- Idempotent progress migrations through version 8, including the Module 5 activity retirement and keyed-state cleanup.
- A ten-step OSA Outcomes and Motivation module with a user-provided pregnancy infographic, three restored single-answer questions, and one new select-all question.
- Shared question rendering that removes controlled boilerplate duplication and shows non-answer-revealing explanations after correct and incorrect scored submissions.

## Automated gates

Run:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run validate:content
npm.cmd test
npm.cmd --prefix cloudflare-worker run check
npm.cmd run test:e2e
npx.cmd expo-doctor
npx.cmd expo export --platform web --clear
```

## Release blockers

- Clinical approval has not occurred.
- Spanish bilingual review has not occurred.
- Native Android and iOS physical-device testing remains required.
- Production Worker/Groq behavior must be revalidated in the intended release environment without recording secrets or sensitive user text.
