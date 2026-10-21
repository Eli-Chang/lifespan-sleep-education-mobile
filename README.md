# Sleep Education

A patient-facing Expo React Native education app about obstructive sleep apnea, pregnancy, PAP therapy, sleep health, relationships, and intimacy. It contains ten modules in English and Spanish (Healthy Sleep Hygiene is taught in two parts, followed by Pregnancy Comorbidities, Intimacy, Getting Started with PAP, and Troubleshooting PAP; see `docs/curriculum-audit-20261021/README.md`), offline written content, local progress, interactive questions, and device text-to-speech.

Status: development build. The medical content is not clinically validated and the Spanish draft is not professionally reviewed.

## Visual and image system

The curriculum uses a reusable local image registry (`src/content/image-registry.ts`) with bundled, licensed assets, bilingual alt text, stable aspect ratios, and subtle Expo Image loading transitions. No curriculum image is fetched at runtime. Source, license, attribution, and selection details are recorded in `docs/IMAGE_SOURCE_REGISTRY.md`.

The warm UI system includes distinct module accents, varied lesson treatments, centralized restrained motion, native-only haptics, and reduced-motion handling. Review evidence and remaining native-device checks are documented in `docs/UI_VISUAL_AUDIT.md`, `docs/UI_MOTION_SYSTEM.md`, `docs/ACCESSIBILITY_REVIEW.md`, and `docs/UI_QA_REPORT.md`.

## Technology

- Expo SDK 54, React Native 0.81, React 19, TypeScript
- Expo Router for iOS, Android, and web navigation
- AsyncStorage for device-local progress and preferences
- i18next/react-i18next with expo-localization
- expo-speech for installed system voices
- No backend, account, analytics, ads, cloud translation, or remote content API

## Install and run on Windows

Open PowerShell in:

```powershell
cd lifespan-sleep-education-mobile
```

Install:

```powershell
npm.cmd install
```

Canonical local development runtime:

```powershell
npm.cmd run dev:canonical
```

This repository-owned command stops stale Lifespan Sleep Expo/Worker processes,
starts the app at `http://127.0.0.1:8084`, starts the Worker at
`http://127.0.0.1:8789`, and prints both URLs. Do not use stale sleep-app
instances on other ports for verification. Historical checkouts are protected
artifacts and are not active runtimes.

Start Expo:

```powershell
npm.cmd start
```

Start web directly:

```powershell
npm.cmd run web
```

Start Android with a configured emulator or connected device:

```powershell
npm.cmd run android
```

The `npm.cmd` spelling avoids PowerShell execution-policy problems that can affect `npm.ps1`.

`npm.cmd run ios` can open a compatible Expo client on an iPhone on the same network, but Windows cannot run the iOS Simulator or make a local Xcode build. Physical iOS verification still requires an iPhone; native release builds require macOS/Xcode or an explicitly approved cloud build workflow.

## Validation

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run validate:content
npm.cmd test
npx.cmd expo-doctor
npx.cmd expo export --platform web --clear
```

## Structure

```text
app/                         Expo Router routes
src/components/              patient-facing lesson and UI components
src/content/en/modules/      canonical English module files (module-05.ts exports both sleep hygiene parts)
src/content/es/modules/      Spanish draft module files built from the English modules
src/content/source-manifest.ts
src/services/                narration
src/state/                   persisted learning state
src/types/                   typed lesson schema
src/utils/                   progress and content validation
screenshots/                 unchanged source copies; never rendered as lessons
docs/                        audit, clinical, translation, asset, and QA records
tests/                       automated content/progress tests
```

## Content model and traceability

Every lesson is typed as content, single choice, multi-select, scenario, or summary. Every screen has a stable ID such as `m5-s12` and at least one source screenshot ID. `src/content/source-manifest.ts` maps every one of the 77 PNG files to its module and lesson.

To add a lesson, create a typed item in the correct English module file, give it a unique ID and valid source ID, then add the same ID to the Spanish module. Add questions with ordered choices and only set `correctChoiceId`/`correctChoiceIds` when the source establishes the answer. Run content validation and tests.

To add a module, add matching English and Spanish files, import both from their locale index, add every source to the manifest, and update the expected title/order list in the validator.

To add a language, add a locale content index with identical IDs, add UI strings to `src/i18n/index.ts`, add it to `modulesByLocale`, and extend the language settings. Written content is bundled; no runtime translation occurs.

## Progress and persistence

A required step completes when the learner continues from content/summary or submits an interaction. Accuracy does not affect completion. Overall progress is completed required screen IDs divided by all required screen IDs. AsyncStorage keeps completed screens/modules, last screen per module, answers, language, narration setting/rate, and selected voices. Reset removes learning progress/answers but keeps language and narration preferences.

## Narration

Narration is off by default. Lesson controls provide Play, Stop, and Replay. The app looks for `en-US` then another `en` voice, or `es-US` then another `es` voice, chunks long text, and stops when navigating or switching language. Written content remains available if no compatible voice exists. On physical iOS devices, expo-speech may be silent while the mute switch is on.

## Offline behavior and privacy

All written content, questions, feedback, translations, icons, and progress logic are bundled. Core learning requires no network. TTS depends on voices already installed by the operating system. The MVP stores only educational progress and preferences locally and collects no personal health information.

## Required human review

Before patient release, complete clinical review, source/citation verification, professional bilingual review, asset-permission review, accessibility review, and the iOS/Android checklist in `docs/PHYSICAL_DEVICE_TEST_CHECKLIST.md`. See the audit documents for known ambiguities and omitted third-party media.

## Deterministic evaluation system

The `evaluation/` directory contains ten fixed synthetic personas, a versioned scenario library covering all seven active modules, fixture and fail-closed live AI runners, Playwright browser tests, raw JSONL runs, SQLite/SQL analysis, a local workbook, human-review queues, and baseline/rerun comparison reports. Deterministic personas are repeatable test constructs; they are not real users and do not establish clinical effectiveness, real-user usability, PAP adherence, or patient understanding.

Run the safe fixture workflow in PowerShell:

```powershell
npm.cmd run evaluation:validate
npm.cmd run evaluation:ai:fixture
npm.cmd run evaluation:db
npm.cmd run evaluation:dashboard
npm.cmd run evaluation:report
npm.cmd run evaluation:ui
```

`npm.cmd run evaluation:all` combines fixture AI, Playwright, SQLite, workbook, and report generation without calling a paid live endpoint. Live AI requires explicit `LIVE_AI_TESTS=true` and a configured development endpoint; it is never enabled by the default workflow. Use `evaluation/docs/google-sheets-setup.md` for the dry-run-only Google Sheets path, and `evaluation/docs/human-review-guide.md` for medical, safety, and Spanish review.
Key upgrade documents:

- `docs/GROQ_UPGRADE_BASELINE.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/QUESTION_REVIEW.md`
- `docs/AI_ARCHITECTURE.md`
- `docs/AI_SAFETY_BOUNDARIES.md`
- `docs/AI_QA_REPORT.md`
# Canonical repository

This AI-OS Projects checkout is the canonical Lifespan Sleep Education
repository. The former Documents checkout is a temporary legacy mirror and
must not be used for future edits. See
`docs/migration/DUPLICATE_REPOSITORY_AUDIT.md` for the protected merge record.
