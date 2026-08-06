# Component inventory and visual contract

This is the implementation map for the warm, modern clinical direction. Shared primitives own spacing, type roles, focus treatment, and semantic color so routes do not drift.

| Area | Current implementation references |
| --- | --- |
| App shell/navigation | `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `components/ui/floating-dock.tsx` |
| Lesson flow | `app/lesson/[moduleId]/[screenId].tsx`, `src/components/LessonRenderer.tsx`, `components/lessons/lesson-card.tsx` |
| Shared visual primitives | `src/components/ui.tsx`, `src/theme/tokens.ts` |
| Symbols and links | `components/ui/icon-symbol.tsx`, `components/ui/icon-symbol.ios.tsx`, `components/external-link.tsx` |
| AI/lesson chat | `src/components/LessonChat.tsx`, `app/ai.tsx` |
| Content visuals | `src/components/CurriculumImage.tsx`, `components/visualizer/*`, `components/scrollytelling/*` |
| State and persistence | `src/state/AppProvider.tsx`, `src/utils/progress.ts`, `src/hooks/useReducedMotion.ts` |

## Route contracts

| Route | Visual contract | Behavior that must remain unchanged |
| --- | --- | --- |
| `/` | Indexed learning path, one progress surface, compact module rows | Module routing, progress calculation, language and saved state |
| `/module/[id]` | Compact hero, progress/reassurance, first-step action | Module selection and continuation |
| `/lesson/[moduleId]/[screenId]` | Stripped header, grouped listen controls, content-first reading | Directional navigation, narration, quiz/reflection/AI branching |
| `/settings` | Preference groups with isolated destructive reset | Language, narration, AI consent, reset semantics |
| `/ai` and inline chat | Transcript reading surface, protected consent, labelled composer | Consent gate, ephemeral session, max-turn/fallback behavior |

Experimental `components/scrollytelling/*`, `components/visualizer/*`, and `components/ui/floating-dock.tsx` are not part of the core route contract until separately reviewed; they must not silently replace the verified lesson flow.

Unknown or inconsistent areas should be recorded in `UI_REVIEW_LOG.md` before implementation work begins.
