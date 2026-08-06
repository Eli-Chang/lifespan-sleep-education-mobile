# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

For substantial app work, use the project-scoped `sleep-app-development` skill. Delegate explicitly to relevant agents, use parallel read-heavy investigation where useful, and keep one primary application-code writer. User-facing changes require running-app browser testing, phone-sized visual checks, English/Spanish checks, accessibility review, and privacy review for storage, consent, AI, or network changes. Use clinical/AI-safety review for health content or AI behavior, native testing when available, and final verification before claiming completion. Never write outside this project folder or claim one-thread role-playing as separate agents or browser emulation as native testing.

## Agent routing and response contract

The mandatory baseline is `code_mapper → app_planner → app_implementer → test_architect → final_verifier`; route optional reviewers only when their concern is in scope. The project orchestration contract is in `docs/agents/AGENT_ORCHESTRATION.md`; validate it with `npm.cmd run verify:agents`. A configured `.codex/agents/*.toml` is not evidence that an agent ran. Every participating agent reports the outcome, exact project-relative files, exact commands and results, runtime evidence reference, limitations, and whether the next gate may proceed. The app writer does not self-approve; only the final verifier may report `PASS`, `FAIL`, or `BLOCKED`.
The durable response format, including the required Agent Execution Report table and considered-but-not-invoked distinctions, is in `docs/agents/AGENT_ORCHESTRATION.md`.
