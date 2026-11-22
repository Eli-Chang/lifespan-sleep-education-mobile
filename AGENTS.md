# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

For substantial app work, use the project-scoped `sleep-app-development` skill. Delegate explicitly to relevant agents, use parallel read-heavy investigation where useful, and keep one primary application-code writer. User-facing changes require running-app browser testing, phone-sized visual checks, English/Spanish checks, accessibility review, and privacy review for storage, consent, AI, or network changes. Use clinical/AI-safety review for health content or AI behavior, native testing when available, and final verification before claiming completion. Never write outside this project folder or claim one-thread role-playing as separate agents or browser emulation as native testing.

## Patient-facing text (human voice and clinical copy)

Whenever you add, edit, rewrite, translate, or generate text a learner can see anywhere in the app (lessons, questions, choices, feedback and per-choice explanations, summaries, narration text, alt text, interface strings, `app.json` copy, and the es, pt-BR, and ht translations), load and apply both project skills before finalizing the change, including during small UI edits and refactors:

1. `.agents/skills/humanizer/SKILL.md` (Codex) or the `humanizer` skill (Claude Code), for natural, non-formulaic writing.
2. `.agents/skills/sleep-app-content-quality/SKILL.md` (Codex) or the `sleep-app-content-quality` skill (Claude Code), for plain language, clinical anchors, quiz integrity, and translations.

Preserve all clinically meaningful information, including hedges such as "may" and "associated with". Any added or changed English text needs its Spanish, Brazilian Portuguese, and Haitian Creole version in the same change, even when the request only mentions English. Run `npm.cmd run check:content-quality`, fix every `BLOCK` and `REVIEW` it lists, then rerun with `-- --reviewed`; the change is not finished until that prints `Result: PASS`. Never edit learner-entered text. Report which skills you applied and any item left for clinical review. The app has no AI companion or runtime text generation; do not add one without an explicit request.

## Agent routing and response contract

The mandatory baseline is `code_mapper → app_planner → app_implementer → test_architect → final_verifier`; route optional reviewers only when their concern is in scope. The project orchestration contract is in `docs/agents/AGENT_ORCHESTRATION.md`; validate it with `npm.cmd run verify:agents`. A configured `.codex/agents/*.toml` is not evidence that an agent ran. Every participating agent reports the outcome, exact project-relative files, exact commands and results, runtime evidence reference, limitations, and whether the next gate may proceed. The app writer does not self-approve; only the final verifier may report `PASS`, `FAIL`, or `BLOCKED`.
The durable response format for intermediate agent reports, including the required Agent Execution Report table and considered-but-not-invoked distinctions, is in `docs/agents/AGENT_ORCHESTRATION.md`. The automatic `$codex-chatgpt-handoff` skill and one-block transport are disabled; use the ordinary Codex final-response style unless Eli explicitly requests a handoff packet. This does not change app behavior or the project's intermediate agent-report format.

## Codex task-boundary board

- This repository uses the opt-in Codex task-boundary board in `.codex/coordination/project.yaml`.
- Before substantial writes, load the installed `codex-coordinator` skill, list active claims from the primary worktree, and publish only this task's bounded claim.
- Native Codex tasks remain the execution, messaging, and transcript authority; an explicitly requested goal Coordinator is on demand, with no heartbeat or mandatory pull-request workflow.
- Reject cross-project notices and never store transcripts, reasoning, prompts, or tool output in Coordinator state.

## Preview selection

- For requests to open or show the Sleep Expo web app preview, inspect `C:\Users\Eli\AppData\Local\LifespanSleepEducation\current-preview-*` first and select the newest valid preview workspace by its actual timestamp and runtime/dependency health.
- Prefer the selected workspace's live Expo web server and preserve its exact URL and route. The canonical Drive checkout's `dist` export at `http://127.0.0.1:8084/` is an older fallback, not the default latest preview.
- If the selected preview is not running, start it from the selected workspace when its dependencies are usable; do not silently substitute the older export. Record the chosen workspace, port, route, and verification evidence in the task handoff.
- Reuse the visible Codex in-app browser tab and navigate it to the selected latest preview rather than leaving an older preview open or creating a duplicate.
