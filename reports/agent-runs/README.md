# Agent run reports

Store one local JSON ledger per orchestrated task as
`reports/agent-runs/<task-id>.json`. The format is defined by
[`../../docs/agents/agent-run-ledger.schema.json`](../../docs/agents/agent-run-ledger.schema.json).
Keep the report project-relative, redact secrets and health information, and
do not include credentials, tokens, or external URLs as evidence references.

## What counts as evidence

An evidence reference must point to an observed runtime event, such as a Codex
thread identifier or a locally captured CLI process record. A TOML file, prompt,
agent roster entry, or human assertion is not proof that an agent ran. A
completed required stage must have a corresponding run with
`invocationEvidence`, observed timestamps, commands, and check results. A
`blocked` or `skipped` stage must include a reason. The final verifier is the
only stage that can produce a final `pass` result.

## Current report checks

From the project root, run:

```powershell
npm.cmd run verify:agents
```

The dependency-free verifier reads this README, the schema, the routing
contract, the existing `.codex` roster, and every `*.json` report in this
directory. It validates JSON shape and the baseline sequence, rejects absolute
or parent-traversing changed paths, and reports malformed or contradictory
status/evidence. With no task reports present it passes the configuration
checks and states that runtime evidence is still required for a task run.

The verifier does not invoke agents, make network requests, write reports, or
claim that a simulated classification is an actual run. Use the read-only
simulation CLI to inspect routing:

```powershell
node scripts/verify-agent-orchestration.mjs --classify
node scripts/verify-agent-orchestration.mjs --classify app_implementer
node scripts/verify-agent-orchestration.mjs --classify ui
node scripts/verify-agent-orchestration.mjs --classify clinical
```

Do not commit a generated report containing invented thread IDs. Capture the
actual run first, then add the smallest report needed for auditability.

When a verified Git `HEAD` exists, the verifier reads `git status` and selects
the newest report by `createdAt`; current relevant app, content, asset, test,
script, documentation, package/config, or `.codex` changes must appear in that
report's `changed_files`/`filesChanged` and the report must not be stale. A
clean status is a no-change pass. If no `HEAD` is available, it reports that
limitation rather than treating the workspace's all-untracked files as a task
diff.

Reports for `ui` and `clinical` must include a completed, passing run with
runtime evidence for every required route agent. A `not-exposed-by-client`
evidence reference is allowed only when its source is an observed runtime
(`codex_thread` or `cli_process`); it does not turn a skipped gate into a
passing final result.

## Template

Use the schema rather than copying an invented evidence reference. A minimal
report must include the canonical fields `task`, `timestamp`, `codex_session`,
`changed_files`, `required_agents`, `invoked_agents`, `skipped_agents`,
`tests`, and `final_verifier_status`, plus `result` when a final result is
recorded. Richer fields such as `workflow`, `baselineSequence`, and `runs` may
be included. Every `invoked_agents` item is completed and carries a real
`thread_or_run_id`, summary, and runtime evidence. `final_verifier_status` must
be `passed` for a final `pass` result.
