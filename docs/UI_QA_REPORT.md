# UI QA Report

## Environment

- Project: this app workspace.
- Expo SDK 54.0.35; Expo Router 6.0.24
- Web server: `npm.cmd run web -- --port 19008`
- URL: `http://127.0.0.1:19008`
- Browser: Chromium through Playwright CLI
- Evidence: `artifacts/ui-visual-upgrade/20260730-160555`

## Routes and workflows

Home, Module 1 overview, ordinary content, numbered event content, single-choice question, unscored reflection, recap, AI consent/tool shell, Settings, and Voice Lab were inspected at 390×844, 430×932, 768×1024, and 1440×900. Navigation, Home return, choice selection, submission, retry/edit, AI pre-consent state, settings, and narration controls were exercised without sending live AI content.

## Results

- No horizontal overflow on inspected routes.
- No clipped image, obscured primary action, or text-over-image condition.
- No application console errors.
- Framework warnings: React Native Web `shadow*` and `pointerEvents` deprecations in the Expo bundle. App-owned card shadow was migrated to `boxShadow`; the remaining warning is upstream/runtime code.
- No failed application network request.
- Curriculum assets are local; lessons remain usable offline.
- Lesson progress now reads “Step 1 of N” (or the localized equivalent), Home no longer shows “7 focused topics” or “Continue Learning,” and official NHLBI supporting links render blue and underlined on the relevant OSA lessons.
- Teach-back responses expose only learner-facing feedback and an optional follow-up question; structured analysis fields are not rendered.
- Before and after full-page screenshots and trace/network/console evidence are in the artifact folder.

Native Android/iOS testing is still required for real safe areas, software-keyboard avoidance, haptic strength, system narration voices, TalkBack/VoiceOver, and device-level reduced-motion settings.
