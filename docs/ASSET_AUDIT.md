# Asset audit

Rights status (2026-11-22): Eli confirmed he has the rights to the outside images and the YouTube videos the app uses. The current per-item license record is in `docs/IMAGE_SOURCE_REGISTRY.md`. The table below is the 2026-07 audit of the original screenshots.

The original screenshots remain audit-only source material and are never rendered as lesson pages.

| Source visual | Classification | Implementation |
|---|---|---|
| CIAS avatar and authoring chrome across screenshots | Unclear ownership / decorative and unnecessary | Not reused |
| Airway diagram in `Screenshot 2026-07-29 171405.png` | Unclear ownership; should be recreated as an original simplified visual | Text-based open/blocked airway explanation only |
| Embedded American Thoracic Society media/handout in `171413.png` | Needs permission | Not embedded or linked |
| Symptom graphics in `171430.png` | Unclear ownership | Recreated as native text |
| Blue Cross Blue Shield of Michigan videos in `171649.png` and `171709.png` | Third-party branded media; rights confirmed by Eli 2026-11-22 | Linked, not embedded: YouTube short links for m4-03 and m4-05 (`src/content/en/modules/module-04.ts`) |
| Pregnancy outcome diagrams in `171727.png` and `171731.png` | Unclear ownership; do not trace | Recreated as native summary cards |
| Illustrated women in `172134.png` | Unclear ownership | Not reused |
| Nasal spray/product image in `172142.png` | Product/third-party image; needs permission | Not reused |
| Existing repository-generated CPAP artwork and video | Ownership not established by this screenshot set | Preserved in repository but not used by the new lesson UI |

The app uses system typography and `@expo/vector-icons` for interface icons. No institutional logos or branding are displayed.

