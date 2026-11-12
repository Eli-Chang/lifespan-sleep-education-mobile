# Canonical project audit (2026-11-11 to 2026-11-12)

Which copy of the sleep education app is the private research source of truth, what every other copy contains, and what should eventually happen to each. Nothing was deleted, archived, renamed, moved between accounts, or force-pushed during this audit.

Path placeholders: `<Personal Drive>` is the My Drive folder of the personal Google account on the Windows PC (`C:\Users\Eli\My Drive (<personal Google account>)`); `<Old Drive>` is `C:\Users\Eli\My Drive`, an older local Drive folder last updated about 2026-10-01; `<User home>` is `C:\Users\Eli`.

## 1. Decision

**Canonical private research source:** GitHub `Eli-Chang/lifespan-sleep-education-mobile` (private; the account was formerly named `RangerX042`, and the old URL still redirects), branch `dev/ten-module-curriculum-20261021`, commit `0071c30e17889b38bc2f006e4df193270927ceba` (2026-10-21). Its working copy is `<Personal Drive>\AIOS\Projects (1)\Sleep Education App`, which is the same folder that earlier records and the Mac call `AIOS/PROJECTS/lifespan-sleep-education-mobile`. Its local branch is identical to GitHub.

**This task's working branch:** `work/canonical-multilingual-20261111`, created from `0071c30` and checked out in a separate Git worktree at `<User home>\Projects\lifespan-sleep-education-mobile-wt-20261111` so the Drive working copy and its uncommitted files were not touched. The branch lives in the canonical repository's `.git` folder in Drive. It has not been pushed.

The decision is firm, not provisional. Evidence against the five priority criteria:

| Criterion | Evidence |
| --- | --- |
| 1. Explicit source-of-truth documentation and research boundaries | The canonical README says "This AI-OS Projects checkout is the canonical Lifespan Sleep Education repository." AIOS `config/project-boundaries.json` and `AGENTS.md` name `lifespan-sleep-education-mobile` as the separate nested research project. The public portfolio README calls itself an organization-neutral public demonstration. |
| 2. Complete, recoverable clinical content | 10 modules and 113 screens per language, including the private PAP modules `m8` and `m9` and the CIAS source documents. The public portfolio has 8 modules. The other copies are older subsets. |
| 3. The latest intended cleanup | The Daybreak redesign, the Healthy Sleep Hygiene split, the narration fixes, and the PAP audit are committed on this branch (Oct 21). The public portfolio's Nov 1 commit ported that work from this branch. No newer research-app work exists anywhere else. |
| 4. Progress schemas and unique private material | Curriculum version 12 with a tested migration from every earlier version. The only copy with the PAP modules, the CIAS sources, and the Oct 21 audit. |
| 5. Tested, maintainable architecture | Typecheck, lint, content validation, unit tests, and Playwright suites all pass (see `docs/RESEARCH_PILOT_READINESS.md` for the current numbers). |

## 2. The three named projects

| Name given | What it is | Where |
| --- | --- | --- |
| `lifespan-sleep-education` | The first prototype: a Next.js 16 web app from 2026-07-16 with 9 placeholder modules ("Placeholder content awaiting researcher-approved educational content"). No real lesson content. | GitHub `Eli-Chang/lifespan-sleep-education` (private), `main` at `1e0c8d7`. No local copy found. |
| `lifespan-sleep-education-mobile` | The private research app (Expo). **Canonical.** | GitHub `Eli-Chang/lifespan-sleep-education-mobile` (private); working copy `<Personal Drive>\AIOS\Projects (1)\Sleep Education App`. |
| `sleep-education-app-portfolio` | The public, organization-neutral portfolio (Expo), 8 modules, with an optional consent-gated AI companion. | GitHub `Eli-Chang/sleep-education-app-portfolio` (public), `main` at `1cca66d` (2026-11-01). |

Why the two `lifespan-...` repositories looked missing: both are private. Unauthenticated GitHub API calls return 404 for private repositories, and the `gh` command-line token on this PC is invalid. `git ls-remote` with the stored Git Credential Manager login reached both. A fourth private repository, `Eli-Chang/AIOS-Backup` (`daily-checkpoint` at `833a0e1`), was seen but not inspected.

## 3. Comparison matrix

Reproduce with `node scripts/compare-candidate-projects.mjs <candidates.json> <out-dir>`. It is read-only, and it counts a file as "preserved" when the same bytes (Git blob hash) exist in the canonical working copy or anywhere in the canonical repository's history. Screen-ID counts in the script are distinct ID strings in English content files, an approximation; the canonical count of 113 comes from `npm run validate:content`.

| # | Copy | Type | Git state | Modules | Unique content vs canonical | Recommended role |
| --- | --- | --- | --- | --- | --- | --- |
| A | `<Personal Drive>\AIOS\Projects (1)\Sleep Education App` | Private research working copy | `dev/ten-module-curriculum-20261021` at `0071c30`, equal to GitHub. 88 uncommitted entries: Cloudflare Worker and AI-evaluation work, settings, logs (kept on purpose by the Oct 21 milestone) | m1 to m9 plus m5b (10) | Reference | **Canonical private research source** |
| B | GitHub `Eli-Chang/lifespan-sleep-education-mobile` | Private remote of A | `master` `33ecaf7` (Jul 21), `migrate-current-sleep-app-work-20260805` `e39e22c` (Aug 17), `dev/ten-module-curriculum-20261021` `0071c30` (Oct 21). Default branch is still `master`. | 10 on the dev branch | None | Canonical remote. Consider making the dev branch the default after review. |
| C | `<User home>\Projects\lifespan-sleep-education-mobile-wt-20261111` | Worktree of A for this task | `work/canonical-multilingual-20261111` from `0071c30`, not pushed | 10 | This task's commits only | Merge into the canonical branch after review, then remove the worktree. |
| D | `<Old Drive>\AIOS\PROJECTS\lifespan-sleep-education-mobile` | Older local mirror of A | `migrate-current-sleep-app-work-20260805` at `e39e22c`, 924 uncommitted entries | 9 (before the m5 split) | 10 files: 5 in `project-state/`, 3 in `artifacts/`, `.gitignore`, `eslint.config.js`. No unique source, content, or docs. | **Redundant after verified migration.** Archive the 10 files first. |
| E | `<User home>\.codex\worktrees\d5eb\lifespan-sleep-education-mobile` | Orphaned Codex worktree (its `.git` points to `<User home>\AI-OS\...`, which no longer exists) | No usable Git state; files dated 2026-08-30 | 7 | 993 files, including 167 source or doc files. 11 exist nowhere else: the AI companion implementation from the August research build (`app/ai.tsx`, `src/components/LessonChat.tsx`, `VelaMascot.tsx`, `vela-layout.ts`, `src/services/ai-client.ts`, `ai-privacy.ts`, `tests/privacy-safety.test.ts`, `tests/live-ai-smoke.test.ts`, `tests/nocturnal-contracts.test.ts`, `tests/e2e/local-ai-canary.spec.ts`, `assets/vela/README.md`). Not in the canonical repository or the public portfolio history. | **Archived historical source.** Zip it with a manifest before any cleanup; it is the only copy of that AI version. Do not merge it: the research build removed the AI chat on purpose. |
| F | `<Personal Drive>\AIOS\handoffs\lifespan-sleep-app-20260922-094252` and `...-clean` | Handoff snapshots (not Git) | Copies from 2026-09-22 | 9 | 8 and 4 files: `BOURJEILY-EMAIL-DRAFT.md`, `HANDOFF-PROVENANCE.md`, an older `docs/CLINICAL_SOURCE_REGISTRY.md`, logs | **Archived historical source** (keep as handoff records). |
| G | `<User home>\Documents\App Developments\lifespan-sleep-education-media` | Separate media project (local Git, no remote) | `master` at `58c78cd` (Aug 5) | None | 930 files of animations, reports, and skill copies; no curriculum | Keep as its own media source project. Consider a private remote. |
| H | GitHub `Eli-Chang/sleep-education-app-portfolio` | Public portfolio | `main` at `1cca66d` (Nov 1) | 8: m1 to m7 plus m5b, 102 screens | 104 files: the AI companion, the Cloudflare Worker, public docs, neutralized names, screenshots | **Preserved public portfolio.** Never copy private research material into it. |
| I | `<Personal Drive>\AIOS\portfolio-repositories\sleep-education-app-portfolio` | Local clone of H | `main` at `da92026` (Aug 19), **one commit behind GitHub**; uncommitted changes are only Drive `desktop.ini` files, `.codex/`, and `AGENTS.md` | 7 | None beyond H's history (`da92026` is an ancestor of `1cca66d`) | Fast-forward to `1cca66d` before the next automated portfolio sync (the AIOS sync helper requires the local head to equal the remote). |
| J | `<Old Drive>\AIOS\portfolio-repositories\sleep-education-app-portfolio`, `<Personal Drive>\review-artifacts\clone-sleep-education-app-portfolio`, `<Personal Drive>\portfolio-refresh-snapshots\20260819-210521\sleep-education-app-portfolio` | Older portfolio clones | `da92026` or `ea92728`, both in H's history | 7 | None | **Redundant.** |
| K | GitHub `Eli-Chang/lifespan-sleep-education` | Private Next.js prototype | `main` at `1e0c8d7` (Jul 16), 3 commits | 9 placeholder modules | 40 files, all placeholder text and prototype code | **Archived historical source.** Its topic list (anxiety and adjustment, nasal congestion, reflux, PAP comfort, motivation and continued use) is covered by m6, m8, and m9 except a dedicated "continued use" module. |
| L | `<User home>\AI-OS` | Former local AI-OS root | **Does not exist any more.** The Nov 1 portfolio work was done in `<User home>\AI-OS\portfolio-repositories\...`, and E's Git link points here. | n/a | Lost locally; H on GitHub has the Nov 1 commit | Note only. |
| M | `<User home>\.codex\tmp\lifespan-migration-20260805`, `<Personal Drive>\lifespan-sleep-education-mobile.node_modules.partial-20260826T1936Z`, `<Personal Drive>\knowledge-system\*lifespan*` | Migration diffs, a partial dependency copy, retired knowledge notes | Not Git | n/a | Records only; not compared file by file | Archive or leave; no app content. |

## 4. Unique content and consolidation

- **Everything in D, F, I, and J that matters is already in A or H.** The comparison found no unique source, lesson content, or docs in them beyond the files listed.
- **E holds the only copy of the August AI companion.** It was not merged: the research build removed in-app AI before the Daybreak redesign, the public portfolio carries a later AI companion, and re-adding AI to the research build would need a separately approved consent and data design. It is recorded here so it is archived, not lost.
- **One fix moved from the portfolio to the research app:** the narration sentence splitter that keeps closing quotes with their sentence (commit "Keep closing quotes with their sentence in narration"). Nothing private moved toward the portfolio.

## 5. Discrepancies between copies, sources, docs, and tests

| Area | Discrepancy | Status |
| --- | --- | --- |
| Public vs private curriculum | Public: 8 modules, 102 screens (m1 11, m2 10, m3 11, m4 13, m5 13, m5b 20, m6 14, m7 10). Private: the same 8 module IDs have 87 screens (m1 10, m2 8, m3 8, m4 10, m5 14, m5b 17, m6 11, m7 9) plus m8 (12) and m9 (14). The public build keeps 12 AI-activity screens (`m1-ai1` to `m7-ai1`) that the private migration removes, and its two sleep hygiene parts have different screen counts. Public curriculum version 5; private 12. | Expected: the builds have different AI boundaries. Recorded, not changed. |
| Spanish approval | Commit `e39e22c` (Aug 17) says "Clinical and Spanish-language approval finalized", and `docs/BILINGUAL-CLINICAL-LANGUAGE-REVIEW.md` (Aug 19) records "APPROVED" for 101 screens with no reviewer or notes. It predates m8 and m9 and does not match 10 later-changed screens. The README, `docs/TRANSLATION_REVIEW.md`, `docs/CLINICAL_REVIEW.md`, and every screen's metadata say not reviewed. | Treated as **not reviewed**. Approval can now only be recorded in `src/content/review-register.ts`. |
| CIAS source vs app | Recorded in `docs/curriculum-audit-20261021/`, `docs/PAP_PREGNANCY_CONTENT_AUDIT.md`, and `docs/curriculum-audit-20261112/README.md`, including the m3 birth-weight direction (CIAS p.17) and m8 and m9 contradictions. | For clinical review; no clinical text changed. |
| Tests and tooling | `playwright.config.ts` passed `--port` to `scripts/dev-web-preview.mjs`, which ignored it, so the self-started test server never came up on the expected port (earlier runs worked only because a server was already running). `scripts/verify-cias-migration.ts` fails its first check and is not part of `npm test`. | Port bug fixed on this branch; the CIAS script is recorded only. |
| README | Says the evaluation system covers "seven active modules", and that every screen has an ID "such as `m5-s12`" and a screenshot source; current IDs look like `m5-04`, and many screens cite `sourceIds` instead. | README updated on this branch. |
| AIOS paths | AIOS `AGENTS.md` and `config/project-boundaries.json` refer to `projects/lifespan-sleep-education-mobile`; on this PC the folder is `Projects (1)\Sleep Education App`. | AIOS files are outside this repository and were not changed; recorded for Eli. |

## 6. Repository cleanup recommendation (not performed)

1. **Keep** A and B as the canonical private research source. After review, merge `work/canonical-multilingual-20261111` into `dev/ten-module-curriculum-20261021` (or open a pull request on the private repository), and consider making that branch the default instead of `master`.
2. **Keep** H as the public portfolio. Fast-forward I to `1cca66d`.
3. **Archive, then retire** E, F, and K: zip E (it holds the only copy of the August AI companion) and F with a short manifest into a private archive location; mark K archived on GitHub after Eli confirms nothing else depends on it.
4. **Retire after verified migration** D and J: archive D's 10 unique files, confirm nothing references the folders, then remove them.
5. **Keep** G as a separate media project.
6. Ask before any deletion. GitHub repository archiving and deleting local folders are outside this task.
