# UI Motion System

Motion tokens live in `src/theme/tokens.ts`: quick 100 ms, fast 140 ms, standard 180 ms, slow 260 ms, press scale 0.98, and entry distance 8 px.

- Buttons scale to 0.98 on press and return without overshoot.
- Images use Expo Image's 180 ms opacity transition and reserve their aspect ratio.
- Question selection keeps text and layout stable.
- Feedback uses calm state color and live-region semantics; no confetti, shaking, looping, parallax, or scroll-jacking.
- Native answer selection/submission uses light Expo Haptics feedback. Web never triggers haptics.
- `useReducedMotion` observes the platform preference. Press movement becomes immediate/no-motion when enabled; all content remains present and operable.

Motion is enhancement only. Meaning never depends on movement, color, or haptics.
