# CIAS Spanish Curriculum Parity Implementation

## Source authority

The approved English learner-facing curriculum in `src/content/en`, including `src/content/en/cias-source.ts`, is the sole content authority for this parity task. The recovered screenshots establish English-visible CIAS content only; they do not establish original Spanish CIAS wording.

## Translation authority and provenance

The 71 active CIAS-backed Spanish screens are translated from the approved English curriculum. They are marked structurally with:

- `translationStatus: translated_from_approved_english`;
- `translationProvenance: approved-english-curriculum`;
- `bilingualReviewStatus: not_reviewed`.

This explicitly distinguishes the recovered English CIAS-backed source content from the newly translated Spanish wording. No Spanish screen is labeled as recovered or source-verbatim Spanish CIAS.

## Implemented coverage

- English screens: 103.
- Spanish screens: 103.
- Translated CIAS-backed screens: 71.
- Restored CIAS questions: 25; all retain the English interaction type, option IDs/order, unscored behavior, and absence of answer keys and correctness feedback.
- Held CIAS records: 6; none were promoted or reconstructed.
- Current app-only supplemental screens preserved: 28.
- Temporary English fallback screens: 0.

The existing Spanish content for current app-only and held-counterpart screens remains in place. It was not broadly rewritten.

## Fallback removal

The temporary fallback branch in `src/content/es/localize.ts` was replaced with a fail-closed lookup into `src/content/es/cias-translations.ts`. A missing CIAS translation now throws during content construction instead of silently exposing English learner-facing text.

The translated source screens preserve source screenshot IDs, source IDs, source confidence, source limitations, and answer-behavior provenance from English. Translation changes do not bump curriculum version 4 and do not erase learner progress.

## Verification

- `npm run validate:content`: PASS — 7 modules, 103 screens, matching English/Spanish IDs, and 77 historical source entries.
- `npm run typecheck`: PASS.
- `npm test`: PASS — 42 passed, 2 expected live Worker tests skipped, 0 failed.
- `npx --no-install tsx scripts/verify-cias-migration.ts`: PASS — 103 English/103 Spanish, 71 translated CIAS screens, 0 temporary fallbacks, 25 unscored questions, 6 holds, and 28 app-only screens.
- The deterministic verifier checks module order, per-module screen order, screen types, question option counts and IDs/order, source provenance, unscored behavior, translation provenance, and non-mechanical Spanish learner strings.

## Browser verification

The canonical local Expo runtime is verified at `http://127.0.0.1:8084`. The focused browser suite and the complete Spanish route traversal are run against that local runtime. Browser checks cover Spanish module entry routes, first and last screens, translated content, single-select and multi-select rendering, reflection/open-ended behavior, progress persistence, language switching, and absence of visible temporary fallback.

## Review limitations

The Spanish wording has not received final clinical review or native-speaker bilingual review. This implementation is locally complete but is not a claim of professional translation certification or production release readiness. No CIAS access, Worker/Groq/GPT-OSS/Cloudflare/AI-chat change, or deployment occurred.
