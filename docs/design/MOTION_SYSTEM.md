# App motion system

The implementation source is `src/theme/tokens.ts` and the existing detailed record is `docs/UI_MOTION_SYSTEM.md`.

- Use quick/fast/standard/slow timings of 100/140/180/260 ms.
- Press feedback uses scale 0.98 without overshoot or layout shift.
- Motion communicates state or spatial continuity; it is never required to understand content.
- Lesson transitions preserve the existing directional cue (forward/back) with a short fade/translate; controls and reading content do not bounce or overshoot.
- Use one meaningful entrance cue per route at most. Avoid animated decoration, looping UI, parallax, and scroll-jacking.
- Respect `src/hooks/useReducedMotion.ts`; reduced motion keeps all content and controls operable.
- Preserve native navigation and platform gestures. Do not add scroll-jacking, parallax, confetti, shaking, or looping decorative motion.
- App-native motion uses React Native/Reanimated/Expo APIs already present in the project; HyperFrames is for standalone media only.
- Reduced motion removes translate/scale effects while retaining instant state changes, focus movement, labels, and all controls.
- Media playback is never autoplay or a required source of meaning; a poster/static explanation remains available.
