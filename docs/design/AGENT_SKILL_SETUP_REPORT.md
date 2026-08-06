# Shared agent-skill setup report

Date: 2026-08-04
Approval checkpoint: installation, documentation, and read-only verification only

## Outcome

The two workspaces now have explicit, project-local skill boundaries:

| Workspace | Codex | Claude Code | Explicit exclusion |
| --- | --- | --- | --- |
| app workspace | UI/UX Pro Max and Impeccable under `.agents/skills/` | Matching copies under `.claude/skills/` | HyperFrames and media rendering |
| sibling media workspace | Existing HyperFrames core set under `.agents/skills/` | Byte-identical copies under `.claude/skills/` | UI/UX Pro Max and Impeccable |

No production app source, dependency manifest, lesson content, navigation, assets, animation, render, integration, cloud connection, or publishing action was performed for this setup. Existing media prototypes and exports were preserved.

## Sources, versions, and installation records

Official source repositories used for the audit and pinned records:

- [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): CLI `ui-ux-pro-max-cli@2.13.0`, release/tag commit `4d140cf8ff6842de13213c7214eff3810371beb2`.
- [Impeccable](https://github.com/pbakaus/impeccable): CLI `impeccable@3.5.0`, repository commit `ae5e95101a6979e7f7973a4ff57680b3c7adc1ec`, installed skill bundle reports `4.0.4`.
- [HyperFrames](https://github.com/heygen-com/hyperframes#quick-start): current repository head observed at `b390b71bde982ffbf55c9ec93f1491d99011bfc3`; existing media project pin `hyperframes@0.7.90`, tag commit `1e51eaec2cb6c058fbb5349c8c3dae9770d7f30c`; latest observed package was `0.7.92` (commit `ac6fd5363bdc8a3a1ee208c5dccccf7a2149a4b5`) but was not used to update the existing project.
- Expo reference required by the repository instructions: [Expo SDK 54 documentation](https://docs.expo.dev/versions/v54.0.0/). Local package metadata remains Expo `~54.0.35`, Expo Router `~6.0.24`, React Native `0.81.5`, React `19.1`, and React Native Web `0.21`.

Commands used (all project-scoped or read-only):

```powershell
npx.cmd --yes ui-ux-pro-max-cli@2.13.0 init --ai codex --offline
npx.cmd --yes ui-ux-pro-max-cli@2.13.0 init --ai claude --offline
npx.cmd --yes impeccable@3.5.0 install --providers=claude --scope=project --no-hooks
npx.cmd skills list --agent codex --json
npx.cmd skills list --agent claude-code --json
npx.cmd hyperframes --version
npx.cmd hyperframes skills --help
```

Installer surface audit:

- UI/UX Pro Max created project-local `.agents/skills/` and `.claude/skills/` bundles plus its documented companion design skill folders; it did not change the Expo package tree.
- Impeccable created a harness skill folder and can create optional local config/hook state. The optional state was not retained, hooks are disabled, and no browser extension or Live Mode was enabled.
- HyperFrames exposes explicit `skills update`, `upgrade`, `telemetry`, `auth`, `cloud`, `lambda`, and `cloudrun` commands. None of the update, cloud, account, publishing, or render commands was run. `npx hyperframes telemetry status` reported `disabled`; `npx hyperframes auth status` reported not signed in.
- No background updater, scheduled hook, telemetry enablement, account credential, cloud configuration, or automatic upload was observed. Explicit `npx` installation commands can contact the npm registry; all later skill checks were local/read-only.
- Safe uninstall is project-scoped removal of the named skill directories after review. Safe update is an explicit versioned installer/`hyperframes skills update` operation after reviewing the lock; the local sync scripts intentionally do not implement write mode.

The Impeccable installer was inspected for its default hook behavior. Its generated `.codex/hooks.json` was removed immediately; no hooks, Live Mode, browser extension, credentials, or cloud integration are enabled. The app `.gitignore` now excludes optional Impeccable local state and hook manifests.

## App workspace

Root: the app workspace

Codex skills:

- `.agents/skills/ui-ux-pro-max/`
- `.agents/skills/impeccable/`
- Existing `.agents/skills/sleep-app-development/` (preserved)
- Official UI/UX Pro Max companion folders installed by its CLI (`banner-design`, `brand`, `design`, `design-system`, `slides`, `ui-styling`)

Claude Code skills:

- `.claude/skills/ui-ux-pro-max/`
- `.claude/skills/impeccable/`
- Matching official UI/UX Pro Max companion folders

The app lock is [tools/agent-skills/skill-lock.json](../../tools/agent-skills/skill-lock.json). It records release, package, repository commit, harness paths, SHA-256 directory checksums, and disabled hook/browser settings. The check-only verifier is [scripts/sync-agent-design-skills.ps1](../../scripts/sync-agent-design-skills.ps1); it rejects missing or changed skill bundles, reparse links, and unexpected Codex hooks. Write mode intentionally throws and was not executed.

The scripts are deliberately read-only verifiers rather than untested updaters. The official installers have different harness targets and can create optional hook/config state; the prompt explicitly allows a verification script when a reliable safe write mode cannot be produced. Any update must therefore be an explicit, reviewed, versioned installer operation followed by `-CheckOnly`.

Shared design documentation created:

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): verified token baseline from `src/theme/tokens.ts`; historical token drift is called out without rewriting the existing reference.
- [MOTION_SYSTEM.md](MOTION_SYSTEM.md): existing motion/reduced-motion policy and native-only constraints.
- [COMPONENT_INVENTORY.md](COMPONENT_INVENTORY.md): routes, shared UI, lessons, chat, state, and accessibility touchpoints.
- [AGENT_DESIGN_WORKFLOW.md](AGENT_DESIGN_WORKFLOW.md): routing rules for UI/UX Pro Max, Impeccable, the preserved sleep-app workflow, and explicit HyperFrames separation.
- [UI_REVIEW_LOG.md](UI_REVIEW_LOG.md): setup baseline and a follow-up item for existing token drift; no redesign was performed.
- [ARCHITECTURE_REPORT.md](ARCHITECTURE_REPORT.md): workspace boundary and rollback context.

## Media workspace

Root: the sibling media workspace

HyperFrames remains project-local and pinned. Core skills recorded in the media lock are:

`hyperframes`, `hyperframes-animation`, `hyperframes-cli`, `hyperframes-core`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-registry`, and existing workflow skills `media-use` and `motion-graphics`.

All other optional HyperFrames workflow/plugin skills were excluded. The matching Claude copies are under `.claude/skills/`; the Codex copies remain under `.agents/skills/`. The sibling media workspace `tools/agent-skills/skill-lock.json` records the pin, observed latest release, source commit, skill set, checksums, and disabled cloud/publishing/credential flags. Its `scripts/sync-hyperframes-skills.ps1` is check-only and rejects credential/cloud folders.

Media governance files created:

- The sibling media workspace `AGENTS.md` and `CLAUDE.md` route work to HyperFrames only.
- The sibling media workspace `concepts/ANIMATION_BACKLOG.md` keeps future concepts separate from implementation.
- The sibling media workspace `sources/SOURCE_POLICY.md` defines approved source handling.
- The sibling media workspace `reports/VALIDATION_POLICY.md` defines local validation and approval gates.
- `README.md` documents the two-harness paths, local-only rendering policy, and the no-integration boundary.

The media workspace already contained animation source and rendered evidence from earlier work. This task created no new animation, frame, video, or export.

## Change inventory

App created or modified by this setup:

- `.git/` (local repository metadata and branch only; no commit)
- `.agents/skills/ui-ux-pro-max/`, `.agents/skills/impeccable/`, and the UI/UX Pro Max companion skill folders
- `.claude/skills/ui-ux-pro-max/`, `.claude/skills/impeccable/`, and the matching companion folders
- `.gitignore`
- `docs/design/ARCHITECTURE_REPORT.md`, `DESIGN_SYSTEM.md`, `MOTION_SYSTEM.md`, `COMPONENT_INVENTORY.md`, `AGENT_DESIGN_WORKFLOW.md`, `UI_REVIEW_LOG.md`, and this report
- `tools/agent-skills/skill-lock.json`
- `scripts/sync-agent-design-skills.ps1`

Media created or modified by this setup:

- `.claude/skills/` HyperFrames copies (the existing `.agents/skills/` tree was preserved)
- `AGENTS.md`, `CLAUDE.md`, and `README.md`
- `concepts/ANIMATION_BACKLOG.md`, `sources/SOURCE_POLICY.md`, and `reports/VALIDATION_POLICY.md`
- `tools/agent-skills/skill-lock.json`
- `scripts/sync-hyperframes-skills.ps1`

No other app or media production files were intentionally edited. Because both workspaces lacked a baseline commit, `git diff --stat` is empty and the complete status is shown below as untracked-file status.

## Discovery and behavior verification

- Codex discovery: `npx skills list --agent codex --json` found the expected app skills and the expected media HyperFrames skills.
- Claude discovery: the skills CLI inventory recognized the Claude Code agent, but because the Claude CLI is absent its generic inventory reports the Codex `.agents/skills` path. Physical harness-specific `.claude/skills/` copies were independently checked and match their lock checksums. A real Claude Code runtime check is **Blocked** because `Get-Command claude` returned `NOT_FOUND`. The installed VS Code `anthropic.claude-code` extension is not treated as CLI runtime proof.
- UI/UX Pro Max behavior: the bundled search script was run from both Codex and Claude copies with `--stack react-native`; both returned React Native accessibility results (roles, labels, and screen readers).
- Impeccable behavior: `npx impeccable@3.5.0 detect docs\design\DESIGN_SYSTEM.md --json` completed and returned an empty finding list.
- HyperFrames behavior: `npx hyperframes skills check --dir .agents/skills --json` resolved the Codex project path with `coreMissing: 0`, 7 current core skills, 2 outdated pre-existing workflow add-ons, and 10 missing optional workflows; no optional skill was installed and no render command was run. The equivalent auto-detected check resolved `.claude/skills` for the Claude target.
- Safety inspection: `.codex/hooks.json`, `.claude/settings.local.json`, `.claude/hooks.json`, and `.impeccable/config.json` are absent. No cloud credential folders are present in the media workspace.
- Link inspection: no symbolic links, junctions, or directory links were found in the installed skill trees; Codex and Claude Code each have real file copies.

Suggested manual Claude Code verification after installing the CLI:

```text
In the mobile repo, list project skills and confirm UI/UX Pro Max, Impeccable, and sleep-app-development. Do not edit files.
In the media repo, list project skills and confirm HyperFrames only. Do not render or edit files.
```

## Regression checks

Run from the app root:

| Command | Result |
| --- | --- |
| `npm.cmd run typecheck` | Pass (exit 0) |
| `npm.cmd run lint` | Pass (exit 0) |
| `npm.cmd test` | Pass: 15 tests, 14 passed, 1 intentionally skipped, 0 failed |
| `npx.cmd expo-doctor` | Pass: 18/18 checks |
| `npm.cmd run validate:content` | Pass: 7 modules, 82 screens, English/Spanish parity, 77 historical source entries preserved |
| App package/lock inspection | Unchanged; timestamps remain 2026-07-30 |
| App sync script `-CheckOnly` | Pass; all four harness/skill checksums match |
| Media sync script `-CheckOnly` | Pass; both skill-tree checksums match and credential checks pass |
| `npx.cmd hyperframes skills check --dir .agents/skills --json` | Read-only Codex-path check: `coreMissing: 0`, 7 current, 2 pre-existing workflow add-ons (`media-use`, `motion-graphics`) outdated, 10 optional workflows missing; no update run |
| HyperFrames telemetry/auth status | Telemetry disabled; not signed in to HeyGen |

No Playwright flow was changed or added because this was a configuration/documentation task with no production UI or route change. Existing web/e2e configuration remains untouched and native Android/iOS validation remains outside this checkpoint.

## Environment and prerequisites

Audit values: Windows 10 Pro build 26200, Codex CLI `0.146.0-alpha.3`, Claude CLI unavailable, VS Code CLI `1.131.0`, Git `2.55.0.windows.3`, Node `24.18.0`, npm/npx `11.16.0`, Python `3.14.6`. The app uses npm/package-lock and Expo SDK 54. Media requires Node >=22, FFmpeg/FFprobe, and a local Chromium/Chrome renderer. Node satisfies the requirement; FFmpeg/FFprobe are not currently on PATH. Docker is optional and was not installed. Current C: free space is approximately 13.74 GB; the initial audit was approximately 13.63 GB. Exact installer-only delta was not captured. Measured skill-file sizes are approximately 1.77 MB per UI/UX copy, 3.10 MB for the Codex Impeccable copy, 6.14 MB for the Claude Impeccable copy, and 4.95 MB per media skill tree.

## Git, backups, and rollback

- App branch: `agent-design-media-skills-setup`; the app originally had no Git repository, so a local repository was initialized. It has no commits and no remote. All files therefore appear untracked; this is not evidence that existing app files were rewritten.
- Media branch: existing `master`; no commits and no remote. Existing files are untracked and were preserved.
- No backup was required: target skill directories were absent at the initial audit except for the existing `sleep-app-development` skill, which was not touched.
- No staging, commit, push, deployment, or publish occurred.

Do not use `git clean` in either workspace because there is no baseline commit. After an explicit review, remove only setup files with targeted commands such as:

```powershell
$app = (Get-Location).Path
Remove-Item -LiteralPath "$app\.agents\skills\ui-ux-pro-max","$app\.agents\skills\impeccable","$app\.claude\skills\ui-ux-pro-max","$app\.claude\skills\impeccable","$app\docs\design\AGENT_SKILL_SETUP_REPORT.md","$app\docs\design\AGENT_DESIGN_WORKFLOW.md","$app\docs\design\COMPONENT_INVENTORY.md","$app\docs\design\DESIGN_SYSTEM.md","$app\docs\design\MOTION_SYSTEM.md","$app\docs\design\UI_REVIEW_LOG.md","$app\docs\design\ARCHITECTURE_REPORT.md","$app\tools\agent-skills\skill-lock.json","$app\scripts\sync-agent-design-skills.ps1" -Recurse -Force
```

Review the target list and preserve `.agents/skills/sleep-app-development/` before running any rollback. Media rollback must similarly target only the newly copied `.claude/skills/` tree and the named setup docs/scripts/lock; do not remove existing `.agents/skills/`, animations, exports, or reports.

## Approval gate

This setup is ready for review. The next phase would require explicit approval before using either design skill to critique or modify UI, and before using HyperFrames to create, render, validate, or integrate media. Claude Code runtime verification is the only environment check that cannot be completed until its CLI is installed.
