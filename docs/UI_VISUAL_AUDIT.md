# UI Visual Audit

Reviewed in Chromium at 390×844, 430×932, 768×1024, and 1440×900 on 2026-07-30. Baseline evidence is in `artifacts/ui-visual-upgrade/20260730-160555/before`; matching after evidence is in the sibling `after` folder.

| Current problem | Affected screens | Improvement | Kind | Evidence |
|---|---|---|---|---|
| The Home hierarchy began with copy and repeated white cards, so the next action and module identity were visually weak. | Home | Warm hero, learning-path section, seven restrained module accents/icons, clearer status and action hierarchy. | Visual, functional | `before/home-*` → `after/home-*` |
| Module overview felt interchangeable and visually empty. | Module overview | Module illustration, stronger split hero, simplified reassurance row. | Visual, educational | `before/module-*` → `after/module-*` |
| Paragraph-only lessons repeated the same composition. | Content, comparison, step-by-step | Lesson-aware bundled image, highlighted key-point panel, numbered timeline treatment where numbered source content exists. | Educational, visual | `before/content-*`, `before/timeline-*` → corresponding `after` |
| Question choices changed abruptly and press feedback was mostly opacity. | Single-choice, multi-select, reflection | Consistent scale/contrast press response, stable selection controls, calm feedback surfaces, native-only haptics. | Functional, accessibility | `before/question-*`, `before/reflection-*` → corresponding `after` |
| Buttons lacked a coherent motion policy. | All primary workflows | Central durations and press scale; reduced-motion preference disables movement. | Functional, accessibility | `docs/UI_MOTION_SYSTEM.md` |
| Recaps were nested cards inside another card. | Module recap | Cleaner lesson surface with less card nesting and existing concise takeaways preserved. | Visual | `before/recap-*` → `after/recap-*` |
| Attribution had no reusable presentation. | Informative curriculum images | Reusable, low-prominence attribution below full lesson images; bundled metadata registry. | Legal, accessibility | `docs/IMAGE_SOURCE_REGISTRY.md` |
| AI diagnostics and tools are dense but functional. | AI consent/tools/diagnostics | Preserved in this focused pass to avoid changing consent, Worker calls, fallbacks, or safety behavior. | Safety | `before/ai-*`, `after/ai-*` |

No horizontal overflow was detected on the reviewed routes. Baseline console output contained only React Native Web framework deprecation warnings; no application console error or failed application request was observed.
