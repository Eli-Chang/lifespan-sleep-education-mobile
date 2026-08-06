# Agent design workflow

This policy routes design work without changing production behavior by default. `AGENTS.md` remains the main project-level instruction source; `CLAUDE.md` references it.

## UI/UX Pro Max owns

- New design-system proposals and React Native component architecture.
- Screen layout, typography, color, spacing, touch interactions, and app-native motion specifications.
- Production implementation guidance for Expo React Native.

Always name the native stack explicitly: Expo React Native. Do not accept the skill's web-default output without translating it into native primitives.

## Impeccable owns

- Critique, anti-slop review, simplification, hierarchy, typography and spacing polish.
- Accessibility hardening, localization stress-testing, purposeful-motion review, and final refinement after implementation.

Impeccable remains opt-in and its design hook is disabled for this repository.

## HyperFrames owns

- Standalone educational animations, explainer videos, motion graphics, rendered charts/visuals, captions, and approved media exports.

HyperFrames does not own React Native navigation, buttons, quiz states, chat behavior, app-native transitions, application state, progress storage, or production UI implementation.

## Shared prohibitions

No skill may replace React Native components with HTML, add DOM APIs or CSS stylesheets to native screens, create hover-only behavior, use browser-only accessibility APIs, rewrite approved educational wording, alter saved progress/narration/AI limits, invent clinical claims, or publish/upload content without approval.

## Routing

Use UI/UX Pro Max first for a new or structural app design decision. Use Impeccable after an implementation exists for critique and refinement. Use HyperFrames only when the deliverable is a standalone media composition. Keep unrelated tasks from loading all three skills.
