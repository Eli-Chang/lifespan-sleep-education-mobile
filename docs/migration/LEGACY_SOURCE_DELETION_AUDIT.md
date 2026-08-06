# Legacy Sleep-App Source Deletion Audit

Record status: COMPLETE

Recorded: 2026-08-06

The attached user request explicitly authorizes deletion of the exact obsolete
Documents repository after the listed safety checks. This audit records those
checks and the completed deletion. The canonical repository and the separate
HyperFrames media workspace were not deletion targets.

## Repository identity

| Field | Canonical | Obsolete baseline |
| --- | --- | --- |
| Exact root | `C:\Users\Eli\AI-OS\projects\lifespan-sleep-education-mobile` | `C:\Users\Eli\Documents\App Developments\lifespan-sleep-education-mobile` |
| Branch | `migrate-current-sleep-app-work-20260805` | `agent-design-media-skills-setup` |
| Commit | `071aabc3d056a14bd285d83873f7390d84d768aa` | `7c87657b2d9395792a3fb71c4df25d457dc38f4b` |
| Git status before deletion | Three pre-existing Expo log modifications | Clean; no remote |
| Total size before deletion | 754,856,116 bytes | 1,943,506,802 bytes |
| Tracked files | 1,008 | 997 |
| Nonignored untracked files | 0 | 0 |
| Ignored entries reviewed | Not applicable | 99,325 |

The two roots resolved to different physical directories. The canonical
migration commit exists and was used for parity. Canonical application source,
English and Spanish content, ID-based routes, tests, Cloudflare Worker,
Playwright configuration, project skills/agents, orchestration policy, visual
redesign and motion documentation, migration audit, and safety documentation
were present before deletion.

## Tracked parity

Git tree object hashes were compared, not timestamps or filenames alone.

| Source item | Canonical status | Evidence | Safe to delete |
| --- | --- | --- | --- |
| Runtime, content, assets, public media, scripts, and tests | Present or superseded | 989 common tracked paths had identical hashes; 0 legacy-only runtime/source/content/test/Worker paths | Yes |
| Cloudflare Worker | Present | Canonical Worker source, evidence, configuration, and 10-test suite present | Yes |
| `app/_layout.tsx` | Superseded | Canonical adds the `settings/voice-lab` route | Yes |
| `playwright.config.ts` | Superseded | Canonical isolates Playwright to port 19009; legacy used 19008 | Yes |
| `src/state/curriculum-migration.ts` | Superseded | Canonical maps all 77 historical screenshot IDs into curriculum version 3 | Yes |
| `src/components/LessonChat.tsx` | Superseded | Canonical has current consent/continuation behavior | Yes |
| `tests/content-and-progress.test.ts` | Superseded | Canonical validates all 77 historical source IDs | Yes |
| `tests/e2e/app.spec.ts` | Superseded | Canonical contains the current Settings-to-AI continuation check | Yes |
| `README.md` | Superseded | Canonical identifies the AI-OS repository as active | Yes |
| `docs/agents/agent-run-ledger.schema.json` | Superseded | Canonical schema includes current routing data | Yes |

Counts: 989 same-content paths, 8 intentional differing paths, 0 missing
canonical paths, and 11 canonical-only migration/protection paths.

## Ignored and private-file review

The obsolete checkout had no nonignored untracked files. Its ignored entries
were dominated by `.playwright-cli` (54,192), `node_modules` (40,964), Worker
dependencies, Expo/build output, artifacts, screenshots, and review
distributions.

- `docs/CIAS App_ EZ-PAP .pdf` and `docs/Pregnant Woman CPAP.mp4` already
  existed in canonical with identical SHA-256 hashes.
- `cloudflare-worker/.dev.vars.example` already existed in canonical with
  identical content.
- `.env.local` already existed in canonical with identical SHA-256. Its values
  were not read or migrated.
- `qa-designqa-snapshot.yaml`, browser state, traces, caches, dependencies,
  logs, artifacts, and build output were generated or local operational files,
  not required source.
- No unique required work remained only in the obsolete directory.

## References and process safety

The exact obsolete path appeared only in historical migration/audit records;
no active application import, runtime request, package script, workspace file,
agent instruction, or HyperFrames documentation depended on it. Historical
records were preserved.

The obsolete Expo tree on port 19008 was stopped. A later Playwright check
started an obsolete-folder tree on port 19011; it was identified by current
working directory and stopped by exact PID: the five Playwright daemons were
`36288`, `59128`, `61008`, `21900`, and `63816`. Port 19009, PID 51488,
remained canonical throughout final verification. No obsolete-folder current
working-directory match remained before final deletion.

## Recovery bundle

Bundle path:

`C:\Users\Eli\AI-OS\backups\lifespan-sleep-education-mobile-legacy-20260805.bundle`

`git bundle verify` passed and reported complete history. `git bundle
list-heads` listed the obsolete baseline as `HEAD` and
`refs/heads/agent-design-media-skills-setup`. Bundle size is 65,138,222 bytes;
SHA-256 is
`766EA0F7D133D74D282E3E0B56228B2B9560CC8D342D31AA3B5DE37E7D16306D`.

Recovery command:

```powershell
git clone "C:\Users\Eli\AI-OS\backups\lifespan-sleep-education-mobile-legacy-20260805.bundle" recovered-sleep-app
```

## Canonical validation evidence

- `npm.cmd run typecheck`: pass.
- `npm.cmd run lint`: pass.
- `npm.cmd test`: 18 passed, 1 live-AI test skipped, 0 failed.
- `npm.cmd run validate:content`: pass; 7 modules, 82 screens, 77 source entries.
- `npx.cmd expo-doctor`: 18/18 checks passed.
- Worker `npm.cmd run check`: typecheck and 10 tests passed.
- `npm.cmd run verify:agents`: pass after the current task ledger was restored.
  The operational ledger records blocked orchestration/final-verifier status
  and remains uncommitted under the requested docs-only commit boundary. This
  is a process limitation, not an application-test failure.
- Real Chrome Playwright smoke on canonical port 19009 loaded `/`, `/settings`,
  `/ai`, `/module/m1`, and `/lesson/m1/m1-01` with 0 console errors. The
  requested `/module/1` and `/lesson/m1/1` numeric aliases rendered the
  canonical not-found screens because current routes use IDs.

## Deletion result

The exact obsolete directory was deleted after its contents were removed and
five Playwright daemons holding its current working directory were stopped.
`Test-Path` and `[IO.Directory]::Exists` both returned `False`. The target
parent remained, the canonical repository remained, the HyperFrames media
workspace remained, and port 19009 remained owned by PID 51488.

The first delete attempt encountered 10 read-only Git pack files; their
read-only attributes were cleared only inside the authorized obsolete target.
The remaining empty directory was removed after the obsolete Playwright
daemons released their working-directory handles. No wildcard or parent-folder
cleanup was used.
