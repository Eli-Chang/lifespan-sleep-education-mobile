# Design System

## Direction

Warm, calm, patient-centered, and clinical without feeling institutional. The interface uses restrained cream, clay, sage, and espresso tones. It avoids stereotypical pink styling, heavy gradients, gamified rewards, and dense dashboard patterns.

## Color tokens

| Token | Value | Use |
|---|---:|---|
| Background | `#FBF7F1` | Warm cream app background |
| Surface | `#FFFDFC` | Cards and controls |
| Surface soft | `#F5EDE4` | Quiet grouped areas |
| Ink | `#302A27` | Primary text |
| Ink muted | `#665D57` | Secondary text |
| Primary | `#A4523D` | Clay accent and progress |
| Primary dark | `#783927` | Primary buttons and links |
| Primary soft | `#F4DDD3` | Selected states |
| Accent | `#65745B` | Sage support accent |
| Success | `#356348` | Correct and completed |
| Warning | `#855C18` | Missed choices and caution |
| Danger | `#9B3F3C` | Incorrect and destructive |
| Border | `#DDCFC3` | Dividers and outlines |

Contrast was checked for primary text and dark semantic colors on their intended light surfaces. Body copy targets WCAG AA 4.5:1. Semantic states always pair color with text and an icon.

## Typography and layout

- System fonts preserve native legibility and avoid a network font dependency.
- Page title: 32/39, weight 800.
- Question title: 20/30, weight 800.
- Body: 16–18 with 1.5–1.6 line height.
- Spacing scale: 4, 8, 16, 24, 32, 48.
- Radius scale: 10, 16, 24, pill.
- Minimum touch target: 48 points.
- Cards use a warm-white surface, one-pixel border, and restrained shadow.

## Interaction states

- Selected: clay outline plus label/icon.
- Correct: sage/green plus “Correct choice.”
- Incorrect selection: muted red plus “Selected, but not correct.”
- Missed correct choice: amber dashed outline plus “Correct choice not selected.”
- Disabled: reduced opacity while preserving legibility.
- Motion is brief (160–320 ms), functional, and should honor reduced-motion preferences.

## Accessibility principles

Predictable one-press Home navigation, labeled icon controls, live feedback regions, non-color semantic labels, 48-point controls, readable line length, and preserved browser/deep-link routes are required.
