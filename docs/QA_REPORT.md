# QA report

Date: 2026-07-29

## Actually executed

- Source integrity: 77 originals and 77 repository copies; SHA-256 comparison found 0 mismatches.
- Windows OCR-assisted inventory and visual review of all 77 screenshots.
- `npm.cmd run validate:content`: passed with 7 modules, 77 lesson screens, matching locale IDs, and 77 source entries.
- `npm.cmd test`: 6/6 tests passed (progress math, set comparison, schema/traceability, locale ID parity, participation completion, persistence serialization).
- `npm.cmd run typecheck`: passed.
- `npm.cmd run lint`: passed after resolving one import warning.
- `npx.cmd expo-doctor`: 18/18 checks passed.
- `npx.cmd expo export --platform web --clear`: passed; 12 static routes and a 2.45 MB web JavaScript bundle were produced.
- Local Expo web server: HTTP 200 at `http://localhost:19006`.
- Headless Chrome at 375×812: rendered Home with all seven module titles, opened Module 1, advanced to step 4, selected and submitted a single-choice answer, switched to Spanish, preserved 4/6 module progress, and logged no console or page errors.

## Inspected or simulated

- Source review confirmed all seven module cards and typed content files exist.
- Route code was inspected for entering/leaving modules, previous/next, resume IDs, question submission, completion, reset confirmation, language switching, and narration stop behavior.
- Small-screen resilience uses scrollable safe-area layouts, 48-point controls, wrapping text, and no fixed content heights.
- Spanish strings were checked structurally for matching screen and choice counts; this is not human translation review.

## Not executable in this environment

- Physical iOS/Android installation, TTS audio output, installed-voice behavior, silent-mode behavior, VoiceOver/TalkBack, largest Dynamic Type, and device restart persistence.
- Native offline behavior on an installed build.
- Clinical accuracy, professional Spanish translation, asset permissions, regulatory review, and app-store submission.

## Known risks

- Medical and pregnancy content has not been clinically reviewed.
- Spanish is a machine-drafted development translation.
- TTS voice availability varies by device.
- Source ambiguities and missing answer states are listed in `CONTENT_REVIEW.md`.
- Existing dependency audit reports vulnerabilities in the broader dependency tree; no force-upgrade was attempted because it could break Expo compatibility.
