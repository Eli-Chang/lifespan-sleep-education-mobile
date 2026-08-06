# Duplicate Repository Audit and Migration Record

Recorded: 2026-08-05

## Canonical decision

The canonical application repository is:

`C:\Users\Eli\AI-OS\projects\lifespan-sleep-education-mobile`

The source mirror used for this migration is:

`C:\Users\Eli\Documents\App Developments\lifespan-sleep-education-mobile`

The source mirror remains untouched. Future application, Worker, content,
test, and documentation work must be made in the AI-OS project only. The
Documents copy is a temporary legacy backup/mirror and must not receive new
work.

Source pre-migration state: branch `agent-design-media-skills-setup`, HEAD
`7c87657b2d9395792a3fb71c4df25d457dc38f4b`, clean, no remote.

Target pre-migration state: branch `master`, HEAD
`33ecaf72338982c4ceffe1fe360e07835e71204e`, dirty with existing tracked and
untracked work, remote preserved as
`https://github.com/RangerX042/lifespan-sleep-education-mobile.git`.

Migration branch: `migrate-current-sleep-app-work-20260805`.

## Duplicate discovery

The following same-name paths were found during the audit:

| Path | Classification | Action |
| --- | --- | --- |
| `Documents/App Developments/lifespan-sleep-education-mobile` | Source mirror | Preserved; no edits after source snapshot |
| `AI-OS/projects/lifespan-sleep-education-mobile` | Canonical target | Promoted on the migration branch |
| `Documents/App Developments/lifespan-sleep-education-mobile/design-system/lifespan-sleep-education-mobile` | Nested design-system document folder, not a Git repository | Preserved; not a project root |
| `AI-OS/projects/lifespan-sleep-education-mobile/design-system/lifespan-sleep-education-mobile` | Nested design-system document folder, not a Git repository | Preserved; not a project root |

No additional top-level project copy was found under the inspected
`C:\Users\Eli\Documents`, `C:\Users\Eli\AI-OS`, or `C:\Users\Eli\Projects`
search roots.

## Protection and merge rules

Before the overlay, non-destructive backups were written outside both
repositories under
`C:\Users\Eli\.codex\tmp\lifespan-migration-20260805`:

- `source-working.patch` and `source-status.txt`
- `target-working.patch` and `target-status.txt`
- source/target HEAD and remote records
- tracked-file manifests
- `source-sha256.csv`
- `inventory-comparison.csv`

An earlier AI-OS pre-move archive remains at
`C:\Users\Eli\AI-OS\migration-backups\lifespan-sleep-education-mobile-20260805-133317-pre-move.tar.gz`.

Neither `.git` directory was copied. Target `.git`, remote, existing dirty
worktree, `.claude/settings.json`, `.vscode/`, `.env.local`,
`app/settings/voice-lab.tsx`, and the zero-byte `Developments/lifespan-sleep-education-mobile`
marker were preserved. No reset, clean, stash, delete, push, deployment, or
secret read was performed.

The source runtime tree was merged by reviewed relative paths. Source project
skills and orchestration were explicitly included: `.agents/skills/`,
`.claude/skills/`, `.codex/agents/`, `tools/agent-skills/skill-lock.json`,
`docs/agents/`, `qa/`, and `reports/agent-runs/`. Source `.codex/tmp/`, caches,
logs, browser state, environment secrets, and generated build output were
excluded. Committed Playwright/design screenshots are retained only as
deliberate QA evidence.

## Conflict decisions

- Source `app/`, `src/`, `components/`, `data/`, `assets/`, `public/`, Worker,
  tests, scripts, docs, and package configuration are the current application
  implementation and were promoted into the target.
- The target-only `app/settings/voice-lab.tsx` route was retained and its
  route registration was merged into `app/_layout.tsx`.
- Target IDE metadata and `.claude/settings.json` were retained byte-for-byte.
- Target `.env.local` was retained and never copied or logged; only the
  non-secret `.env.example` template is part of the application tree.
- Source and target design-system document folders were retained; neither is
  treated as a second repository.
- The separate HyperFrames/media workspace remains at
  `C:\Users\Eli\Documents\App Developments\lifespan-sleep-education-media`.
  Its approved assets are represented in the canonical app's relative
  `assets/` and `public/` paths; the media workspace itself was not moved.

## Path policy

Operational documentation and scripts in the canonical project must use
project-relative paths or the canonical AI-OS root above. The old Documents
path may appear only in this audit and historical evidence that identifies the
source mirror. No application import or runtime request may depend on the old
absolute path.

## Verification record

The migration branch must pass the canonical target checks before its migration
commit is created: agent verification, typecheck, lint, unit/content tests,
Expo Doctor/export, Worker checks, and Playwright. The source repository is
not changed by those checks. Native Android/iOS validation remains separate
from Expo Web evidence unless a real device or emulator is available.
