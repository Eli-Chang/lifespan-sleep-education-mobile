# Project baseline

Date: 2026-07-29

## Verified repository

The authoritative Expo repository is:

the app workspace containing this document

The screenshot capture folder supplied with this build is:

`screenshots/`

The screenshot folder contains 77 PNG files. Each source file was inventoried with a SHA-256 hash before copying. The originals will remain in place and unchanged. A byte-for-byte copy will be kept in the repository at `screenshots/` for source traceability.

## Current project state

- Expo SDK 54.0.35
- React Native 0.81.5
- React 19.1
- Expo Router 6.0.24 with file-based routes
- Strict TypeScript 5.9
- ESLint through `expo lint`
- Reanimated 4.1 and React Native Gesture Handler are already installed
- No automated test runner or content-schema validator was configured
- No backend, account system, analytics, or remote content service is present

## Existing architecture and working features

The repository already contains a customized education prototype:

- `app/(tabs)/index.tsx` provides a lesson/module landing experience.
- `app/(tabs)/explore.tsx` provides a resources-oriented tab.
- `app/module/[id].tsx` provides a module route.
- `data/` contains earlier lesson and module models grounded in a CIAS PDF.
- `components/` contains cards, progress visuals, native SVG education visuals, and motion experiments.
- `hooks/use-progress-storage.ts` stores quiz answers only in browser `localStorage`.
- The app previously passed TypeScript, lint, web export, and headless web rendering.

The worktree already contains user-owned modified and untracked files. This build will preserve those files and avoid destructive cleanup. New implementation will be isolated under `src/` where practical, while existing route files will be adapted to use it.

## Necessary changes

- Add typed, screenshot-traceable English and Spanish content for all seven required modules.
- Add a source manifest and complete screenshot/content/asset review records.
- Replace web-only quiz storage with cross-platform AsyncStorage persistence.
- Add Home, Progress, Settings, About, module overview, and lesson flow routes.
- Add source-derived single-choice, multi-select, scenario, feedback, and summary rendering.
- Add locale-aware UI and content using i18next/react-i18next and expo-localization.
- Add device narration with expo-speech, locale-aware voice selection, chunking, and stop behavior.
- Add content validation, progress/evaluation tests, and final QA documentation.

## Potential conflicts and safeguards

- Existing route files are already modified. Their current content has been inspected and will be replaced only where required by the requested application shell.
- Existing generated images, videos, scrollytelling components, and experimental components will not be deleted.
- Existing institutional/source documents remain reference material only and will not be presented as authorized branding.
- The screenshots include CIAS authoring controls, embedded third-party video thumbnails, branded diagrams, and avatar artwork. These will not be reused as patient-facing lesson pages.
- Medical, pregnancy, medication, intimacy, and outcome statements require human clinical review. Extraction uncertainty will be marked rather than silently corrected.

## Gate 1 result

Passed. Repository architecture, dependencies, navigation, TypeScript, lint setup, existing components, dirty state, and all 77 source images were inspected. Screenshot originals remain untouched.
