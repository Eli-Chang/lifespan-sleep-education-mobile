# Shared design and media skill architecture

Status: installation plan and audit record, 2026-08-04/2026-08-05

## Boundaries

The Expo application remains the production codebase. The separate media workspace remains the only place for HyperFrames compositions and rendered media. Neither skill family is allowed to replace native React Native UI with HTML or to rewrite approved sleep-education content.

## Repository routing

| Repository | Codex project skills | Claude Code project skills | Owned artifacts |
| --- | --- | --- | --- |
| `lifespan-sleep-education-mobile` | `.agents/skills/ui-ux-pro-max/`, `.agents/skills/impeccable/`, existing `.agents/skills/sleep-app-development/` | `.claude/skills/ui-ux-pro-max/`, `.claude/skills/impeccable/` | Expo UI system, component inventory, motion, accessibility, localization, review records |
| `lifespan-sleep-education-media` | existing `.agents/skills/hyperframes*/` and `media-use/` | `.claude/skills/hyperframes*/` and `media-use/` | Standalone animation source, storyboards, media exports, validation reports |

HyperFrames is intentionally absent from the mobile repository. UI/UX Pro Max and Impeccable are intentionally absent from the media workspace.

## Conflict analysis

- UI/UX Pro Max is the primary app-design skill: native React Native architecture, layout, type, color, spacing, touch interaction, and app-native motion guidance.
- Impeccable is the secondary app-design review skill: critique, simplification, hierarchy, accessibility, localization stress-testing, and purposeful-motion review. It must not auto-run for every task.
- HyperFrames owns standalone animation and rendered media only. It does not own navigation, buttons, quiz/chat behavior, app state, progress, or production UI.
- Existing project agents under `.codex/agents/` and the `sleep-app-development` skill are preserved. No existing skill is overwritten.
- No new hooks are enabled. Impeccable's installer-generated Codex hook was removed immediately after inspection because hook activation requires deliberate review; Live Mode and browser extensions remain disabled.
- The official UI/UX Pro Max and Impeccable installers do not require Expo dependencies. HyperFrames is not installed in the Expo package tree.

## Access and privacy

The project-local skills are plain files under each harness's project directory. They do not receive credentials, cookies, browser sessions, cloud configuration, or app uploads. Verification uses local metadata, CLI help, file checks, and offline/read-only scripts. No accounts are connected.

## Version synchronization

Each repository has a harness lock file recording the official repository, pinned package/release, commit, installation paths, and checksums. The sync scripts read those locks and support `-CheckOnly`; write mode is not executed during setup.

## Rollback

The app directory did not contain a Git repository at audit time, so the requested Git branch could not exist. A local repository and the `agent-design-media-skills-setup` branch were created before the skill/configuration work; nothing was committed or pushed. Target paths were absent except for the pre-existing `sleep-app-development` skill; no existing target file requires a backup. Rollback commands are documented in `docs/design/AGENT_SKILL_SETUP_REPORT.md`.
