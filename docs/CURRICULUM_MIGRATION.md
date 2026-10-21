# Curriculum migration history and current version 9

## Current version 9 Module 5 restoration

Version 9 has 97 screens across seven modules; Module 5 has 33 screens. It restores the sunshine (`m5-q9`) and nutrition (`m5-q11`) checks, changes `m5-q3` to a keyed multi-select caffeine check, removes `m5-09`, and preserves `m5-q6` unchanged. The v8-to-v9 migration removes `m5-09` from every keyed persisted surface, redirects a last-screen pointer at `m5-09` to `m5-q10`, clears completion, answers, and attempts for changed screen `m5-q3`, and clears Module 5 completion for v8 users. Re-running the migration is idempotent.

## Version 8 Module 5 retirement

Version 8 has 96 screens across seven modules; Module 5 has 32 screens. It retires `m5-ai1` / `m5-bedtime-timeline`, removes those IDs from completion and every persisted keyed surface, clears matching pending Vela handoffs and action plans, and redirects a Module 5 last-screen pointer to `m5-ai2`. The migration is idempotent and preserves unrelated state.

Informational content screens derive structured paragraphs and unordered lists from unchanged plain clinical paragraphs. Bold emphasis is presentation-only, and narration continues to use markup-free source text.

## Current version 6 Module 3 rebuild

Version 6 has 100 screens across seven modules. Module 3 now contains ten bilingual screens in this order: `m3-01`, `m3-q1`, `m3-q3`, `m3-q4`, `m3-05`, `m3-q5`, `m3-recap`, `m3-04`, `m3-ai1`, `m3-ai2`.

The v5-to-v6 migration removes `m3-02`, `m3-03`, and `m3-q2` from completion and keyed state. Last-screen pointers at `m3-02` or `m3-03` move to `m3-ai1`; a pointer at `m3-q2` moves to `m3-ai2`. Answers, attempts, and completion for `m3-q1`, `m3-q3`, and `m3-q4` are cleared so learners can experience their restored scored feedback. Module completion and unrelated state are preserved. Re-running the migration is idempotent.

## Version 5 Module 2 cleanup

Version 5 had 101 screens across seven modules. Partner Impact contains nine screens in this order in English and Spanish: `m2-01`, `m2-r1`, `m2-03`, `m2-05`, `m2-04`, `m2-q2`, `m2-q1`, `m2-ai1`, `m2-recap`.

The v4-to-v5 migration removes `m2-02` from completed-screen and keyed answer, attempt, draft, and saved-reflection state. A Module 2 last-screen pointer at `m2-02` moves to `m2-ai1`. All unrelated state, including `completedModuleIds`, is preserved. Re-running the migration is idempotent. Existing v2 and v3 migration behavior remains unchanged before this surgical v5 step.

## Current version 4 CIAS restoration

Version 4 restored recovered CIAS records and retained the prior app-only supplements. The deterministic implementation is in `src/state/curriculum-migration.ts`; the source-fidelity record is in `docs/CIAS-CONTENT-MIGRATION-IMPLEMENTATION.md`.

Version-3 persisted state is migrated to version 4. Valid screen completion and navigation are retained, removed screen IDs are filtered, stale answers/attempts/reflection drafts/saved reflections for changed CIAS-backed screens are cleared, and completed-module flags are reset because the screen graph changed. The migration is idempotent after version 4 is written.

## Historical version 2 to version 3 record

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
| Module 5 positions 1-32 | Includes restored `m5-s18` to `m5-q9` and `m5-s26` to `m5-q11`; retired `m5-s30` is not restored | Preserves the frozen v9 sequence and removes the superseded `m5-09` runtime screen |
| Module 6 positions 1-10 | `m6-01` through `m6-q3` | Adds pregnancy-specific escalation and equipment guidance |
| Module 7 positions 1-7 | `m7-01` through `m7-q2` | Uses optional, non-assumptive relationship language |

No historical lesson is silently dropped: superseded fragments map to the nearest reviewed replacement. See `docs/CURRICULUM_REVIEW_GAPS.md` for content intentionally removed or deferred.

Spanish progress migrates with the same stable IDs. Version 3 Spanish content is a machine-assisted draft and is explicitly marked as awaiting bilingual review.
