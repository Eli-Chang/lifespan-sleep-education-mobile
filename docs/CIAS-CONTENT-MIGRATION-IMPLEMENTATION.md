# CIAS English Curriculum Migration Implementation

## Scope

The recovered CIAS screenshot curriculum is now the active English learner-facing backbone in `src/content/en`. The implementation uses the recovered audit map and source archive as the content authority, preserves source provenance on promoted screens, holds source-limited records, retains the 28 current app-only supplemental screens, and does not deploy or modify the Worker/Groq/GPT-OSS/Cloudflare/AI-chat stack.

The migration manifest is persisted in `docs/CIAS-CONTENT-MIGRATION-MANIFEST.json` before the curriculum composition changes. It contains all 77 CIAS records, source screenshot IDs, counterpart IDs, action, runtime screen ID, change flags, answer-key provenance, and source limitations.

## Active English result

- Promoted CIAS records: 71 of 77.
- Held source-limited records: 6.
- Restored complete question/reflection records with no recovered answer key: 25.
- English screen count: 103.
- Spanish screen count: 103 with exact ID/type parity.
- Module counts: M1 12, M2 10, M3 11, M4 13, M5 33, M6 14, M7 10.
- Current app-only supplemental screens preserved: 28 of 28.
- Added missing CIAS screens: M4-S08, M5-S04, M5-S24, M5-S28, M5-S29, M6-S06.

The source sequence is defined in `src/content/en/cias-source.ts`; each English module composes that sequence first and appends only the explicitly preserved current app-only/held screens.

## Action coverage

- `RESTORE_FULL_SOURCE`: 37 records.
- `RESTORE_VISIBLE_TEXT_ONLY`: 24 records.
- `SPECIAL_REVIEW_POLICY`: M1-S03, M3-S06, M4-S09, M5-S32.
- `ADD_MISSING_CIAS_SCREEN`: 6 records.
- `HOLD_SOURCE_LIMITED`: M1-S05, M1-S06, M5-S18, M5-S22, M5-S26, M5-S30.
- `KEEP_EXISTING_APP_ONLY`: all 28 records are listed in the manifest and verified against the audit snapshots.

The special records follow the approved decisions:

- M1-S03 restores readable body text only; no embedded thumbnail, hidden video, or handout text is invented.
- M3-S06 is one final Module 3 screen. The visible PAP motivation text and labels render as text; diagram relationships are not inferred.
- M4-S09 renders the visible recap and labels as text; no hand-drawn diagram or arrow relationship is recreated.
- M5-S32 renders the visible recap, open-ended prompt, and visible instruction. No text below the screenshot boundary is added.

## Questions and answer behavior

For every promoted CIAS single-select or multi-select question, the implementation preserves the recovered stem, visible instructions, option wording, option order, and interaction type. The source does not recover answer keys, selected state, correctness feedback, or reveal behavior, so those screens have:

`answerBehaviorProvenance: CIAS_ANSWER_KEY_NOT_RECOVERED`

They remain selectable and save a response without correctness claims or answer-key feedback. Route progression does not block on an invented key. Existing scoring remains only on current app-only or explicitly held current counterparts, and is not attributed to CIAS.

The incomplete/cropped source interactions were not promoted. M1-S06, M5-S18, M5-S22, M5-S26, and M5-S30 remain held; M1-S05 is also held because its missing list cannot be reconstructed. M5-S18 and M5-S26 have no runtime source replacement.

## Spanish status

The separate Spanish parity phase translated all 71 promoted CIAS source screens from the approved English curriculum. They carry explicit `translated_from_approved_english` and `approved-english-curriculum` provenance. Existing Spanish drafts remain for the 32 retained current app-only/held screens. Original Spanish CIAS wording was not recovered or claimed.

## Provenance and validation changes

The content types and helpers now support source confidence, unresolved limitations, source-visible labels, source policies, question instructions/context, reflection context, and answer-behavior provenance. Restored screens carry actual `src-<timestamp>` IDs from the recovered screenshots; current app-only screens retain their existing curriculum provenance.

`scripts/verify-cias-migration.ts` performs deterministic checks for source headings/body/questions/options/order/type/provenance, held-record absence, visible-label policy, app-only snapshot preservation, English/Spanish structural parity, translated-source provenance, zero fallback count, and module totals.

Persisted curriculum-version-3 state now migrates to version 4. The migration filters removed screen IDs, preserves completion and navigation for valid current screens, clears stale answers/attempts/reflections for changed CIAS-backed screens, and resets completed-module flags so new source steps cannot be reported as already complete. Held source records have no runtime interaction group or fabricated replacement metadata.

## Verification results

- `npm run validate:content`: PASS — 7 modules, 103 curriculum screens, matching English/Spanish IDs, 77 historical source entries.
- `npm run typecheck`: PASS.
- `npm test`: PASS — 42 passed, 2 intentionally skipped live Worker tests, 0 failed.
- `npx --no-install tsx scripts/verify-cias-migration.ts`: PASS — 71 restored, 6 held, 25 restored questions unscored, 28 app-only present, 103 English/103 Spanish screens.
- Focused Playwright regression on the canonical local app: PASS — 6 passed, covering source link/step labels, restored unscored Module 1 question, reflections, language switching, and responsive overflow.
- `PLAYWRIGHT_PORT=8084 npx --no-install playwright test tests/e2e/spanish-parity.spec.ts`: PASS — all 103 active Spanish learner routes rendered their translated screen titles with no visible fallback marker and no console errors.
- `PLAYWRIGHT_PORT=8084 npx --no-install playwright test tests/e2e/app.spec.ts --grep "lesson step label|Module 1 restores|unscored reflection|language switching|mobile, tablet"`: PASS — 6 focused interaction, persistence, language, and responsive checks.
- `git diff --check`: repository-wide output is affected by pre-existing trailing whitespace in `.expo-motion.log`; no curriculum source-fidelity mismatch was reported by the deterministic verifier.

## Follow-up work

- Complete clinical and native-speaker review of the Spanish CIAS translations before production readiness.
- Revisit the six held source-limited records only when authoritative source evidence resolves the missing list/options/footer/content boundary.
- Conduct final clinical/content review of restored learner-facing text before any release decision.
- Keep deployment, publishing, and production Worker changes out of this migration.
