# Groq Upgrade Baseline

Recorded July 30, 2026 before the Groq upgrade.

## Architecture

- Expo SDK 54.0.35, React Native 0.81.5, React 19.1, and Expo Router 6.0.24.
- File-based routing under `app/`, with a root Stack and a three-item bottom Tabs navigator.
- Seven bilingual modules live under `src/content/{en,es}/modules`.
- `AppProvider` owns learning preferences and persists the version-2 state to AsyncStorage under `sleep_education_state_v2`.
- Lesson participation determines completion; answer correctness is not used to block progress.
- Narration uses `expo-speech` directly through `src/services/narration.ts`.

## Route structure

- `/(tabs)` is the application root.
- `/(tabs)/index` is Home.
- `/(tabs)/explore` is the separate Progress destination.
- `/(tabs)/settings` is Settings.
- `/module/[id]` is a module overview.
- `/lesson/[moduleId]/[screenId]` is a lesson step.
- `/about` is a modal.

## Baseline findings

- The likely two-press Home cause is hierarchical navigation: a lesson closes by replacing itself with the module route, and the module's “Home” control calls `router.back()`. When the module was pushed from Home, this requires one action to leave the lesson and another to leave the module. Direct root replacement is required.
- Home displays overall progress and module cards, but lacks a module progress bar, explicit per-card action, and a completed/total summary.
- Progress duplicates information in a dedicated tab.
- Single-choice and multi-select choices become disabled after submission. The renderer does not compare answers with answer keys, does not expose correct/incorrect state, and cannot resubmit.
- Questions without an established answer key are presented with neutral feedback but are not explicitly typed as reflections.
- Existing answer persistence stores only the latest string array and has no submitted-result or attempt history.
- Narration performs basic locale-prefix matching. It does not rank enhanced voices, validate a saved voice against locale, expose inventory, persist pitch, or report a reason when Spanish is unavailable.
- Spanish can fail when no compatible Spanish system voice is installed, a saved identifier is stale, browser speech is blocked, or the selected device voice is unavailable. The existing code also queues all chunks without provider-level lifecycle state.
- Existing theme colors are cool blue/teal (`#F4F8FA`, `#087C88`, `#075E68`) and do not meet the requested warm visual direction.

## Pre-change validation

- TypeScript: passed.
- ESLint: passed.
- Node tests: 6 passed.
- Content and English/Spanish ID parity validation: passed for 7 modules, 77 screens, and 77 source records.
- Expo Doctor: 18/18 checks passed.
- Web export: run as part of the baseline; result recorded in `docs/AI_QA_REPORT.md`.

## Existing worktree

The repository already contained extensive uncommitted app work before this upgrade, including app routes, content, assets, documentation, tests, theme work, and motion experiments. Generated Expo log files were also modified/untracked. Those changes are treated as user work and must be preserved. Nothing is to be committed or pushed.
