# Curriculum migration: version 2 to version 3

The version 3 curriculum replaces the 77-screen screenshot-derived sequence with the 82-screen master curriculum. Migration is deterministic and idempotent in `src/state/curriculum-migration.ts`.

| Module | Previous screens | Version 3 screens | Version 3 title | Clinical status |
| --- | ---: | ---: | --- | --- |
| 1 | 6 | 12 | Understanding Obstructive Sleep Apnea | Not reviewed |
| 2 | 7 | 9 | OSA, PAP, and Your Partner | Not reviewed |
| 3 | 6 | 9 | Treatment, Barriers, and Action Planning | Not reviewed |
| 4 | 9 | 12 | OSA and Pregnancy Health | Not reviewed |
| 5 | 32 | 19 | Sleep Hygiene, Routines, and Insomnia Support | Not reviewed |
| 6 | 10 | 12 | PAP Use During Pregnancy | Needs revision |
| 7 | 7 | 9 | Intimacy, Relationships, and OSA | Not reviewed |

## Screen mapping

Every historical screen is represented in `legacyScreenIdMap`. Historical IDs are mapped by module and original order to the closest version 3 screen; completion is preserved only for that mapped screen. Module-completion IDs remain module-completion IDs and do not falsely complete newly added screens. Answers and attempt history follow the same map.

| Historical IDs | Version 3 mapping | Rationale |
| --- | --- | --- |
| Module 1 positions 1-6 | `m1-01` through `m1-q2` | Expanded airway, oxygen, PAP, symptom, and teach-back concepts |
| Module 2 positions 1-7 | `m2-01` through `m2-q2` | Consolidated blame-free partner support and communication |
| Module 3 positions 1-6 | `m3-01` through `m3-q2` | Reframed treatment choices into barrier and action planning |
| Module 4 positions 1-9 | `m4-01` through `m4-q2` | Correctly separates association from individual prediction |
| Module 5 positions 1-32 | `m5-01` through `m5-18`, then `m5-recap` | Removes screenshot fragmentation while preserving topic coverage |
| Module 6 positions 1-10 | `m6-01` through `m6-q3` | Adds pregnancy-specific escalation and equipment guidance |
| Module 7 positions 1-7 | `m7-01` through `m7-q2` | Uses optional, non-assumptive relationship language |

No historical lesson is silently dropped: superseded fragments map to the nearest reviewed replacement. See `docs/CURRICULUM_REVIEW_GAPS.md` for content intentionally removed or deferred.

Spanish progress migrates with the same stable IDs. Version 3 Spanish content is a machine-assisted draft and is explicitly marked as awaiting bilingual review.
