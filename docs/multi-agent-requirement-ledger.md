# Multi-agent setup requirement ledger

1. Boundary: verify workspace final segment and restrict writes to the project. Evidence: `validate-agent-setup.ps1`; pass when root is exact.
2. Configuration: create project `.codex/config.toml` and thirteen unique agent TOMLs. Evidence: files and validator; pass when fields and names validate.
3. Skill: create `sleep-app-development` with routing, QA, safety references, and validator. Evidence: skill metadata and script; pass when validator succeeds.
4. Governance: preserve one app writer, read-only reviewers, explicit routing, browser/native distinction, privacy and clinical rules. Evidence: agent instructions and routing matrix.
5. QA infrastructure: create source-derived inventory and document visual, accessibility, native, AI, narration, persistence, and release checks. Evidence: `qa/app-surface-inventory.json`, `docs/multi-agent-development.md`.
6. Smoke test: requires fresh-session custom-agent loading if this session cannot load project agents. Evidence must be actual thread records, never inferred from files.
