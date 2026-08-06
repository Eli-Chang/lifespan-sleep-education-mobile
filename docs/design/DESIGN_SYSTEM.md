# Warm, modern clinical education design system

This is the active visual direction for the redesign audit. The implementation remains authoritative; this record explains the shared choices that should be applied consistently across the learning path, lessons, quizzes, reflection, chat, settings, and summary states.

## Platform and visual direction

- Expo SDK 54 / React Native 0.81 / React Native Web 0.21.
- Warm, calm, patient-centered, clinical without feeling institutional.
- Content-first hierarchy: reading surfaces are quieter than actions, and protected states (consent, feedback, reset) are the only places that receive stronger enclosure.
- Cream page ground, ink-led typography, terracotta reserved for primary actions and progress, sage/amber/danger for semantic states.
- Prefer thin borders and spacing over stacked cards, pills, and decorative shadows.
- Native system fonts; no network font dependency.
- Preserve native controls, safe areas, Dynamic Type, and platform navigation.

## Code tokens

The canonical tokens are exported from `src/theme/tokens.ts`: `palette`, `spacing`, `radius`, `touchTarget`, `depth`, and `motion`.

| Token group | Verified values |
| --- | --- |
| Spacing | 4, 8, 16, 24, 32, 48 |
| Radius | 10, 16, 24, pill (pill only for compact status) |
| Touch target | 48 points |
| Motion | 100, 140, 180, 260 ms; press scale 0.98; entry distance 8 |
| Core palette | `#FBF5EE`, `#FFFDFC`, `#332A26`, `#6D625B`, `#B96F58`, `#8D5041`, `#C98A55`, `#4D735A` |

The older `docs/DESIGN_SYSTEM.md` contains historical token values; treat `src/theme/tokens.ts` as the source of truth and flag drift rather than silently changing it.

## Type and layout roles

- Display: the route title, one clear sentence, 32–36px on phone with a restrained line length.
- Section: 22–25px, used for learning-path/module sections and question headings.
- Body: 16–17px with 1.5–1.75 line height for sustained reading.
- Meta/control: 12–14px, uppercase only for short indexed labels; never use all caps for paragraphs.
- Content width: keep reading text around 65–75 characters on large screens while allowing Spanish wrapping on phone widths.
- Vertical rhythm: use the 8px scale; reserve 24–32px for route-level transitions and 16px for related controls.

## Surface grammar

1. Page: cream background and safe-area padding.
2. Reading: open content with a thin border or divider only when grouping is necessary.
3. Protected: a bounded surface for consent, answer feedback, reset confirmation, and AI completion state.
4. Action: one primary terracotta action per decision point; secondary actions stay quiet and outlined.

Every interactive control keeps a 48pt minimum target, a visible keyboard focus ring on web, an accessible name, and a text/icon state that does not rely on color alone.

## Guardrails

Do not introduce web-only DOM/CSS patterns, hover-only interactions, emoji structural icons, unreviewed clinical claims, or hardcoded per-screen colors. Semantic states use text/icons as well as color.
