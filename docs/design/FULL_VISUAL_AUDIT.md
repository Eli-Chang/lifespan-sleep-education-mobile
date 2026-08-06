# Lifespan Sleep Education — full visual audit

Date: 2026-08-05  
Mode: Operate + Read (patient-facing clinical education)  
Evidence: live Expo Web at `http://127.0.0.1:19008`, Chrome through Playwright CLI, 390×844, 430×932, 768×1024, and 1440×900. Baseline screenshots are in `artifacts/design-redesign/20260805-visual-design-redesign/baseline/`.

## Strongest existing elements

- Warm, high-contrast palette is recognisable and appropriate for adult education.
- Curriculum imagery is local, attributed, and paired with descriptive accessibility text.
- Content, quiz, reflection, narration, progress, bilingual, and AI states are already represented by reusable components.
- Reduced-motion and 48px touch-target foundations exist.
- Lesson progress and answer feedback are understandable without relying on colour alone.

## Global design-system issues

| Issue | Screens affected | Evidence | Severity | Design skill finding | Recommended treatment |
|---|---|---|---|---|---|
| Repeated elevated containers flatten the visual hierarchy. | Home, module overview, lesson, quiz, settings, AI | Baseline screenshots show hero, progress, lesson surface, and controls all sharing rounded bordered surfaces. | P1 | Impeccable craft floor: cards should not become the page scaffold; elevation should be declared once. | Make the page background and typography carry structure; reserve surfaces for content groups, feedback, and protected consent. |
| Typography has strong weight but limited role differentiation. | All routes | Eyebrows, labels, headings, prompts, and body copy often use the same heavy geometric voice. | P1 | UI/UX Pro Max: use a consistent type scale and line-height hierarchy. | Establish display, section, body, metadata, and control roles in tokens; use weight before colour for hierarchy. |
| Accent colour is repeated at every hierarchy level. | Home modules, progress, buttons, links, feedback | Terracotta appears on CTA, progress fill, accent edge, kicker, and status emphasis. | P2 | Semantic colour should communicate state, not decorate every surface. | Keep terracotta for primary action/progress; use ink, muted ink, and module accents elsewhere. |
| Motion is centralised but the web bundle still emits React Native Web warnings. | Lesson transitions and buttons | Playwright console reports legacy `shadow*` and `pointerEvents`; lesson transition uses native-driver fallback on web. | P2 | Motion must be purposeful, reduced-motion aware, and platform-adaptive. | Keep movement restrained; use platform-safe properties and preserve the existing reduced-motion branch. |

## Repeated component issues

| Issue | Screens affected | Evidence | Severity | Design skill finding | Recommended treatment |
|---|---|---|---|---|---|
| Module cards repeat the same icon/status/title/description/progress/action anatomy seven times. | Home | `baseline/home-390.png` shows only the first card before the fold and a floating utility control competes with it. | P1 | Repetition without enough structural contrast reads as a template. | Turn modules into a calmer indexed learning path with a thin accent rail, compact metadata, and one clear action row. |
| The floating lightning control has no visible label or explanatory context. | Home, module, lesson, quiz | Baseline screenshots show a black floating lightning button at the lower-left edge. | P1 | Icon-only controls require a descriptive native accessibility label and a clear purpose. | Replace the unexplained floating control with an in-flow, labelled utility surface or remove it if it is not an approved task. |
| Narration controls look disabled and occupy three separate pills before the lesson content. | Lesson, quiz, reflection | Baseline lesson and quiz screenshots show three low-contrast controls and a helper line above the content. | P2 | Secondary controls should be subordinate but still legible and grouped by purpose. | Use a compact “Listen” control group with clear disabled state and preserve the existing actions. |
| Chat consent, composer, and messages use the same card/bubble vocabulary as curriculum content. | AI teach-back, reflection, lesson Q&A | `baseline/ai-teachback.png` shows a large consent card plus a separate bordered composer. | P1 | Educational content and AI interaction need distinct visual grammar. | Use a transcript-like reading surface, keep consent protected, and make the learner composer a clearly labelled action area. |

## Screen-specific issues

| Issue | Screens affected | Evidence | Severity | Design skill finding | Recommended treatment |
|---|---|---|---|---|---|
| Home first viewport is a stack of cards rather than a learning-path thesis. | Home | `baseline/home-390.png`, `home-430.png`, `home-1440.png` | P1 | First viewport should make the product mechanism and next action obvious. | Keep the warm hero, but use a single learning-path header and a more editorial module list. |
| Module overview leaves a large quiet lower region while the floating control sits detached from the task. | Module overview | `baseline/module-m1.png` | P2 | Whitespace should separate meaningful groups, not expose missing structure. | Rebalance the overview into a compact hero, progress row, reassurance note, and visible first-step preview. |
| Lesson header, narration, and content surface compete for the same vertical attention. | Standard and image lessons | `baseline/lesson-standard.png`, `baseline/lesson-image.png` | P1 | Hierarchy should be established by spacing and type before chrome. | Reduce header chrome, group narration with the lesson header, and let the educational content lead. |
| Quiz prompt and options are readable but feel like a generic form. | Single- and multi-select quizzes | `baseline/quiz-single.png`, `baseline/quiz-multi.png` | P2 | State clarity and native control language should distinguish learning interactions. | Add a quiet question-progress cue, improve option-state contrast, and preserve radio/checkbox semantics. |
| Settings reset is visually mixed with ordinary preferences. | Settings and reset confirmation | Source inspection of `app/(tabs)/settings.tsx`; reset is in the same Card as About. | P2 | Destructive actions must be separated and clearly labelled. | Give reset its own destructive section and confirmation hierarchy without changing reset behavior. |

## Accessibility and localization issues

| Issue | Screens affected | Evidence | Severity | Design skill finding | Recommended treatment |
|---|---|---|---|---|---|
| The floating lightning control is visually icon-only in the captured flow. | All primary routes | Playwright screenshots; accessible purpose is not apparent visually. | P1 | Icon-only controls need a descriptive accessible name and visible context when non-obvious. | Remove or replace with a labelled control. |
| Spanish expansion is not represented in the design system contract. | Home, module, lesson, settings, AI | Existing Spanish routes are functional, but spacing/measure rules are not documented. | P2 | Localization must be designed, not inferred from English. | Add explicit Spanish expansion checks, wrapping rules, and screenshots to QA. |
| Web focus is present on buttons but visual grouping does not consistently show focus hierarchy. | Home, forms, quizzes, settings | Source uses a shared focus outline, but grouped controls use mixed borders and surfaces. | P2 | Focus state should be visible and predictable across all interactive primitives. | Keep the shared focus token and verify every changed control in keyboard traversal. |

## Motion issues

| Issue | Screens affected | Evidence | Severity | Design skill finding | Recommended treatment |
|---|---|---|---|---|---|
| Lesson transition direction is implemented, but the rest of the screen does not reinforce the navigation relationship. | Lesson progression and back navigation | `app/lesson/[moduleId]/[screenId].tsx` uses a short translate/fade transition. | P2 | Spatial continuity should make forward/back movement legible without delaying access. | Keep the existing directional transition and pair it with calmer progress/header changes only. |
| The app contains several experimental animation components that are not part of the approved lesson path. | `components/scrollytelling/*`, `components/visualizer/*` | Source inventory includes multiple visualizers and emoji-labelled prototype copy. | P2 | Decorative motion and alternate visual grammars create implementation drift. | Document the approved animation boundary; do not route core lessons through experimental components in this pass. |

## Educational-media opportunities

The strongest low-risk opportunity is a short, language-neutral schematic for Module 1: an open airway versus an airway that becomes too narrow or closes, with airflow markers reducing or stopping. It is directly supported by `src/content/en/modules/module-01.ts` screen `m1-02`, does not require diagnosis or treatment claims, and can be understood without audio. Existing media workspace source `animations/open-vs-obstructed-airway` is the correct starting point, pending a fresh HyperFrames check and clinical review before app integration.

## Direction

**Warm, modern clinical education:** paper-like cream background, ink-led typography, terracotta used as a deliberate progress/primary-action accent, thin borders instead of decorative depth, compact indexed learning-path navigation, clear separation between reading, progress, controls, quizzes, and tutor chat. The direction preserves the current identity while removing generic wellness/AI-card conventions.

