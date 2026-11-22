# Agent orchestration contract

This project uses a small, auditable agent workflow for approved work. This
document covers orchestration and configuration only; it does not grant
permission to change application behavior, clinical content, or assets.

## Mandatory baseline sequence

Run these stages in order for every substantial task. A stage may be marked
`blocked` or `skipped` only with a recorded reason; later stages must not be
reported as complete when a required earlier stage has not produced evidence.

| Order | Agent | Required responsibility | Access and gate |
| ---: | --- | --- | --- |
| 1 | `code_mapper` | Inspect the repository and return exact files, routes, symbols, and risks. | Read-only. Must identify the approved write boundary. |
| 2 | `app_planner` | Freeze requirements, acceptance criteria, file map, routing, and verification plan. | Read-only. Must produce the numbered task ledger. |
| 3 | `app_implementer` | Apply only the approved changes and run focused checks. | Sole overlapping application writer. Must report files, commands, and results. |
| 4 | `test_architect` | Map requirements to behavior-focused tests and identify native-only limits. | Read-only. Must check the implementation against the ledger. |
| 5 | `final_verifier` | Independently verify every requirement and evidence item. | Read-only. Final status is exactly `PASS`, `FAIL`, or `BLOCKED`. |

The sequence is a real-agent sequence, not a role-playing convention. A
`.codex/agents/*.toml` file, a prompt, or a claimed hand-off is not proof that
an agent ran. Evidence must come from the active runtime (for example a Codex
thread identifier or a locally captured CLI process record) and include the
observed start/end time and outcome.

## Task matrix and conditional routing

The baseline above is required even when the task is classified as
`configuration_workflow`. Add a specialist only when the task reaches its
concern; do not invoke the entire roster by default.

| Concern | Specialist | Required when | Access |
| --- | --- | --- | --- |
| Rendered browser flows, console, network, traces | `playwright_flow_tester` | A running Expo Web route or browser behavior changes | Workspace-write for test artifacts only |
| Phone/tablet/desktop visual parity or English/Spanish layout | `mobile_visual_qa` | User-facing UI or localization changes | Workspace-write for QA artifacts only |
| Accessibility semantics, focus, touch targets, language parity | `accessibility_localization_reviewer` | User-facing UI or localization changes | Read-only |
| Storage, external requests, logs, secrets, reset | `privacy_security_reviewer` | Persistence or network changes | Read-only |
| Health content | `clinical_ai_safety_reviewer` | Clinical lessons, quiz answers or feedback, or safety wording change | Read-only |
| Navigation, loading, persistence, offline behavior, performance | `reliability_performance_reviewer` | Runtime reliability or performance changes | Read-only |
| Android or iOS validation | `native_mobile_qa` | An existing emulator or device is available | Read-only; browser emulation is not native evidence |
| Product journey and cognitive load | `product_ux_reviewer` | A patient-facing journey changes | Read-only |

For this repository-orchestration change the required baseline is
`code_mapper`, `app_planner`, `app_implementer`, `test_architect`, and
`final_verifier`. No optional specialist is implied by configuration files.

The simulation classifications below are deterministic task routes. They add
the required specialists to the baseline ledger; the listed route order is the
specialist-facing hand-off order:

| Classification | Required route |
| --- | --- |
| `configuration_workflow` | `code_mapper → app_planner → app_implementer → test_architect → final_verifier` |
| `ui` | `code_mapper → app_implementer → product_ux_reviewer → playwright_flow_tester → mobile_visual_qa → accessibility_localization_reviewer → final_verifier` |
| `clinical` | `code_mapper → app_implementer → clinical_ai_safety_reviewer → accessibility_localization_reviewer → final_verifier` |
| `native` | `code_mapper → app_implementer → native_mobile_qa → accessibility_localization_reviewer → final_verifier` |
| `feature` | `code_mapper → app_implementer → product_ux_reviewer → playwright_flow_tester → reliability_performance_reviewer → final_verifier` |
| `ai_privacy` | `code_mapper → app_implementer → privacy_security_reviewer → reliability_performance_reviewer → final_verifier` |
| `test_only` | `code_mapper → app_implementer → test_architect → playwright_flow_tester → final_verifier` |
| `documentation` | `code_mapper → final_verifier` (implementation is skipped unless behavior or clinical claims are in scope) |
| `lesson_content` / `content` | `code_mapper → app_implementer → clinical_ai_safety_reviewer → accessibility_localization_reviewer → final_verifier` |

The UI, clinical, native, feature, privacy, and test routes carry the full
baseline sequence in the ledger; documentation-only work uses the minimal
`code_mapper → final_verifier` baseline. A truly small, obvious edit may record
`app_planner` as skipped with a non-empty reason only when its route does not
require planning. For test-only work with an existing native device, a
`native_mobile_qa` execution gate may replace the browser execution gate; do
not claim native evidence from browser emulation. The route table names the
task-specific specialist gates.

## Ledger and evidence rules

Each completed task may have one JSON ledger under
`reports/agent-runs/<task-id>.json`, validated by
[`agent-run-ledger.schema.json`](agent-run-ledger.schema.json). Keep paths
relative to this project and redact secrets and health information.

The canonical ledger fields are `task`, `timestamp`, `codex_session`,
`changed_files`, `required_agents`, `invoked_agents`, `skipped_agents`,
`tests`, and `final_verifier_status`. Each invoked item must be completed and
include `name`, `thread_or_run_id`, `purpose`, `summary`, and runtime evidence.
`final_verifier_status: "passed"` is required before a ledger may have
`result: "pass"`.

Every run record includes:

- a stable `runId`, `agentId`, role, status, and observed start/end times;
- `invocationEvidence` with a runtime source and reference (never merely a TOML
  path), plus the observer timestamp;
- changed paths, commands, focused-check results, blockers, and artifact paths;
- an explicit network policy. The verifier itself is read-only and performs no
  network requests or external writes.

`completed` requires actual invocation evidence. `blocked` and `skipped` require
a reason. A final `pass` requires all five baseline stages to be completed and
the final verifier to have independently observed the evidence. Do not use a
report to manufacture an agent run after the fact.

## Verification and simulation

Run the local, dependency-free check from the project root:

```powershell
npm.cmd run verify:agents
```

The command checks the required policy files, schema, routing roster, and any
current JSON ledgers in `reports/agent-runs/`. The verifier does not write a report. To
inspect a classification without invoking an agent or persisting state, use:

```powershell
node scripts/verify-agent-orchestration.mjs --classify
node scripts/verify-agent-orchestration.mjs --classify configuration_workflow
node scripts/verify-agent-orchestration.mjs --classify app_implementer
node scripts/verify-agent-orchestration.mjs --classify ui
node scripts/verify-agent-orchestration.mjs --classify clinical
```

The verifier also reads `git status` without modifying it. With a verified
repository baseline, current relevant changes in app, component, source,
content/data, assets/public, design-system, tests, scripts,
docs, package/config, or `.codex` paths require a fresh report whose listed paths and `createdAt` cover the
changes; a clean status is an explicit no-change pass. This checkout has no
verified `HEAD`, so the check records that limitation and does not infer a task
diff from its all-untracked workspace. Simulation output is explanatory only
and is not runtime evidence.

## Hooks and trust boundary

No project Stop hook is installed. Although official Codex documentation and
the CLI expose hook concepts, project-level discovery, trust prompts, and hook
execution were not verified in this IDE session. A hook would therefore be
untrusted automation and cannot be used as completion evidence. The durable
controls are this routing contract, the run ledger schema, the local verifier,
and the final verifier's independent result.

## Response contract

Every edit response includes an **Agent Execution Report** table with exactly
these columns: `Agent | Invoked | Purpose | Result | Evidence`. Follow the
table with the considered-but-not-invoked agents and the reason for each,
changed files, commands and tests, ledger path, `npm.cmd run verify:agents`
result, final verifier result, and limitations. Distinguish actual subagents,
fallback reviews, unavailable agents, and not-relevant agents; never collapse
those states into a generic "done".

Every participating agent otherwise reports in complete prose:

1. the outcome and any blocker;
2. exact files read or changed (project-relative);
3. exact commands and focused-check results;
4. runtime evidence references and limitations; and
5. whether the next gate may proceed.

The application writer does not self-approve. The final verifier is the only
stage that may report `PASS`, and it must cite evidence for every mandatory
requirement.
