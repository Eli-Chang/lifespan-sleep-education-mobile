// Content-quality gate for learner-visible text.
//
//   npm.cmd run check:content-quality                 # compare the working tree with HEAD
//   npm.cmd run check:content-quality -- --base main  # compare with another git ref
//   npm.cmd run check:content-quality -- --reviewed   # after the humanizer and
//                                                      # sleep-app-content-quality review
//
// Deterministic checks block (exit 1): removed screens, changed or removed answer keys,
// changed choice IDs, English text whose translations were left as they were, a curriculum that does not
// build, failing content validation, stale generated review docs, failing tests.
// Semantic checks (naturalness, clinical meaning, understandability) cannot be proven by
// a script, so the gate lists every changed unit with its clinical anchors and requires
// an explicit --reviewed confirmation that the two skills were applied.
import { execFileSync, spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, symlinkSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { ContentSnapshot, ContentUnit } from './content-units';

export const TEXT_BEARING_PATTERNS: RegExp[] = [
  /^src\/content\//,
  /^src\/i18n\//,
  /^src\/components\/.+\.tsx$/,
  /^app\/.+\.tsx$/,
  /^app\.json$/,
];

export const isTextBearing = (path: string) => TEXT_BEARING_PATTERNS.some((pattern) => pattern.test(path.replace(/\\/g, '/')));

const NUMBER = /\d+(?:[.,]\d+)?(?:\s*(?:%|mg|°F|°C|weeks?|semanas?|hours?|horas?|minutes?|minutos?|days?|días?|nights?|noches?|cm H2O|mmHg))?/gi;
const QUALIFIERS = /\b(not|never|no|avoid|don't|do not|without|only|may|might|can|could|should|must|will|always|associated|risk|if|unless|as prescribed|no|nunca|evite|sin|solo|puede|podría|debe|siempre|riesgo|si|asociad[oa]s?)\b/gi;
export const CLINICAL_TERMS = ['OSA', 'obstructive sleep apnea', 'PAP', 'CPAP', 'preeclampsia', 'gestational diabetes', 'high blood pressure', 'pressure', 'mask', 'oxygen', 'airway', 'pregnan', 'baby', 'prescrib', 'care team', 'doctor', 'emergency', '911', 'caffeine', 'AOS', 'apnea obstructiva', 'preeclampsia', 'diabetes gestacional', 'presión', 'mascarilla', 'oxígeno', 'embaraz', 'bebé'];

export type Anchors = { numbers: string[]; qualifiers: string[]; terms: string[] };

export function extractAnchors(text: string): Anchors {
  const norm = (values: string[]) => values.map((value) => value.toLowerCase().replace(/\s+/g, ' ').trim()).sort();
  return {
    numbers: norm(text.match(NUMBER) ?? []),
    qualifiers: norm(text.match(QUALIFIERS) ?? []),
    terms: CLINICAL_TERMS.filter((term) => text.toLowerCase().includes(term.toLowerCase())).map((term) => term.toLowerCase()).sort(),
  };
}

const multisetDiff = (before: string[], after: string[]) => {
  const counts = new Map<string, number>();
  for (const value of before) counts.set(value, (counts.get(value) ?? 0) + 1);
  const added: string[] = [];
  for (const value of after) {
    const count = counts.get(value) ?? 0;
    if (count > 0) counts.set(value, count - 1); else added.push(value);
  }
  const removed = [...counts.entries()].flatMap(([value, count]) => Array(count).fill(value) as string[]);
  return { added, removed };
};

export type AnchorChange = { kind: keyof Anchors; added: string[]; removed: string[] };

export function anchorChanges(before: string, after: string): AnchorChange[] {
  const a = extractAnchors(before);
  const b = extractAnchors(after);
  return (Object.keys(a) as (keyof Anchors)[])
    .map((kind) => ({ kind, ...multisetDiff(a[kind], b[kind]) }))
    .filter((change) => change.added.length || change.removed.length);
}

export type UnitChange = { key: string; locale: string; before: string | null; after: string | null; sourceBacked: boolean; anchors: AnchorChange[] };
export type GateFindings = {
  changedUnits: UnitChange[];
  blocking: string[];
  review: string[];
};

const unitMap = (units: ContentUnit[]) => new Map(units.map((unit) => [`${unit.locale}|${unit.key}`, unit]));

export function compareSnapshots(base: ContentSnapshot, current: ContentSnapshot, options: { allowAnswerKeyChange?: boolean; allowRemovedScreens?: boolean; allowUnchangedTranslations?: boolean } = {}): GateFindings {
  const blocking: string[] = [];
  const review: string[] = [];
  const before = unitMap(base.units);
  const after = unitMap(current.units);
  const changedUnits: UnitChange[] = [];
  for (const id of new Set([...before.keys(), ...after.keys()])) {
    const b = before.get(id);
    const a = after.get(id);
    if (b?.text === a?.text) continue;
    const [locale, ...rest] = id.split('|');
    changedUnits.push({ key: rest.join('|'), locale, before: b?.text ?? null, after: a?.text ?? null, sourceBacked: Boolean(a?.sourceBacked ?? b?.sourceBacked), anchors: b && a ? anchorChanges(b.text, a.text) : [] });
  }

  for (const id of base.screenIds) {
    if (!current.screenIds.includes(id)) (options.allowRemovedScreens ? review : blocking).push(`Screen ${id} was removed.`);
  }

  for (const [id, was] of Object.entries(base.answers)) {
    const now = current.answers[id];
    if (!now) continue;
    if (was.choiceIds.join('|') !== now.choiceIds.join('|')) {
      (options.allowAnswerKeyChange ? review : blocking).push(`${id}: choice IDs or order changed (${was.choiceIds.join(',')} -> ${now.choiceIds.join(',')}).`);
    }
    const wasKey = was.correct?.slice().sort().join(',') ?? '';
    const nowKey = now.correct?.slice().sort().join(',') ?? '';
    if (wasKey && wasKey !== nowKey) {
      (options.allowAnswerKeyChange ? review : blocking).push(`${id}: answer key changed (${wasKey} -> ${nowKey || 'none'}).`);
    } else if (!wasKey && nowKey) {
      review.push(`${id}: new answer key ${nowKey}; confirm it comes from a source.`);
    }
  }

  const englishChanged = new Set(changedUnits.filter((change) => change.locale === 'en' && change.before !== null && change.after !== null).map((change) => change.key));
  const locales = [...new Set(current.units.map((unit) => unit.locale))].filter((locale) => locale !== 'en');
  for (const key of englishChanged) {
    const untouched = locales.filter((locale) => after.has(`${locale}|${key}`) && !changedUnits.some((change) => change.locale === locale && change.key === key));
    if (untouched.length) (options.allowUnchangedTranslations ? review : blocking).push(`${key}: English changed but ${untouched.join(', ')} did not. Update them, or rerun with --allow-unchanged-translations only if the English edit kept the meaning exactly, and say so in the handoff.`);
  }

  for (const change of changedUnits) {
    if (change.sourceBacked) review.push(`${change.locale} ${change.key}: CIAS source text changed; confirm the edit was authorized or only fixes a clear error.`);
    for (const anchor of change.anchors) {
      review.push(`${change.locale} ${change.key}: ${anchor.kind} changed (removed: ${anchor.removed.join(', ') || 'none'}; added: ${anchor.added.join(', ') || 'none'}).`);
    }
  }
  return { changedUnits, blocking, review };
}

function git(args: string[], cwd: string): string {
  return execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

function changedFiles(root: string, base: string): string[] {
  const tracked = git(['diff', '--name-only', base, '--'], root).split(/\r?\n/);
  const untracked = git(['ls-files', '--others', '--exclude-standard'], root).split(/\r?\n/);
  return [...new Set([...tracked, ...untracked].filter(Boolean))];
}

function snapshotAt(dir: string): ContentSnapshot {
  const tsx = resolve(dir, 'node_modules/.bin/tsx');
  const result = spawnSync(existsSync(`${tsx}.cmd`) ? `${tsx}.cmd` : 'npx', existsSync(`${tsx}.cmd`) ? ['scripts/content-units.ts', '--json'] : ['tsx', 'scripts/content-units.ts', '--json'], { cwd: dir, encoding: 'utf8', shell: process.platform === 'win32', maxBuffer: 64 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`Could not collect content in ${dir}: ${result.stderr}`);
  return JSON.parse(result.stdout) as ContentSnapshot;
}

function baseSnapshot(root: string, base: string): ContentSnapshot {
  const dir = join(root, '.content-gate-base');
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const archive = spawnSync('git', ['archive', '--format=tar', base, 'src', 'tsconfig.json'], { cwd: root, maxBuffer: 256 * 1024 * 1024 });
  if (archive.status !== 0) throw new Error(`git archive ${base} failed: ${archive.stderr}`);
  // Extract from inside the folder: Windows paths passed to GNU tar break on "C:" and backslashes.
  const untar = spawnSync('tar', ['-x'], { cwd: dir, input: archive.stdout, maxBuffer: 256 * 1024 * 1024 });
  if (untar.status !== 0) throw new Error(`tar failed: ${untar.stderr}`);
  mkdirSync(join(dir, 'scripts'), { recursive: true });
  cpSync(join(root, 'scripts/content-units.ts'), join(dir, 'scripts/content-units.ts'));
  // Asset requires only need the files to exist, so link the real asset folder instead of copying it.
  const assetsLink = join(dir, 'assets');
  symlinkSync(join(root, 'assets'), assetsLink, 'junction');
  try {
    return snapshotAt(dir);
  } finally {
    // Remove the link itself first so cleanup can never reach the real assets.
    unlinkSync(assetsLink);
    rmSync(dir, { recursive: true, force: true });
  }
}

function run(label: string, command: string, args: string[], root: string): boolean {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8', shell: process.platform === 'win32', maxBuffer: 64 * 1024 * 1024 });
  const ok = result.status === 0;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (!ok) console.log((result.stdout + result.stderr).split(/\r?\n/).filter((line) => /fail|error|not ok|out of date|Unexpected|Expected/i.test(line)).slice(0, 20).join('\n'));
  return ok;
}

async function main() {
  const root = resolve(import.meta.dirname, '..');
  const args = process.argv.slice(2);
  const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'HEAD';
  const reviewed = args.includes('--reviewed');
  const skipTests = args.includes('--no-tests');
  const options = { allowAnswerKeyChange: args.includes('--allow-answer-key-change'), allowRemovedScreens: args.includes('--allow-removed-screens'), allowUnchangedTranslations: args.includes('--allow-unchanged-translations') };

  const files = changedFiles(root, base).filter(isTextBearing);
  console.log(`Content-quality gate (base ${base})`);
  console.log(files.length ? `Text-bearing files changed:\n${files.map((file) => `  ${file}`).join('\n')}` : 'No text-bearing files changed.');

  let findings: GateFindings = { changedUnits: [], blocking: [], review: [] };
  if (files.length) {
    const { collectSnapshot } = await import('./content-units');
    let current: ContentSnapshot | undefined;
    try {
      current = await collectSnapshot();
    } catch (error) {
      // The curriculum refuses to build when a translation is missing, for example a new English
      // paragraph with no Spanish, Portuguese, or Creole text. Report that as a blocking problem.
      const message = error instanceof Error ? error.message : String(error);
      findings.blocking.push(`The curriculum does not build: ${message}. Add the matching text in every language.`);
    }
    if (current) findings = compareSnapshots(baseSnapshot(root, base), current, options);
    console.log(`\nChanged learner-visible units: ${findings.changedUnits.length}`);
    for (const change of findings.changedUnits.slice(0, 200)) {
      console.log(`- [${change.locale}] ${change.key}`);
      console.log(`    before: ${change.before ?? '(new)'}`);
      console.log(`    after:  ${change.after ?? '(removed)'}`);
    }
    if (findings.changedUnits.length > 200) console.log(`  ...and ${findings.changedUnits.length - 200} more`);
  }

  console.log('\nDeterministic checks');
  const checks = [run('content validation (npm run validate:content)', 'npm', ['run', 'validate:content', '--silent'], root),
    run('generated review docs are current', 'npx', ['tsx', 'scripts/generate-review-reports.ts', '--check'], root)];
  if (!skipTests) checks.push(run('unit tests (npm test)', 'npm', ['test', '--silent'], root));

  if (findings.review.length) {
    console.log('\nNeeds human or clinical review (does not block):');
    for (const item of findings.review) console.log(`  REVIEW ${item}`);
  }
  if (findings.blocking.length) {
    console.log('\nBlocking problems:');
    for (const item of findings.blocking) console.log(`  BLOCK ${item}`);
  }

  const textChanged = findings.changedUnits.length > 0;
  if (textChanged && !reviewed) {
    console.log('\nLearner-visible text changed. Apply the humanizer and sleep-app-content-quality skills to every unit above,');
    console.log('compare clinical anchors, update translations, then rerun with --reviewed.');
  }
  const failed = findings.blocking.length > 0 || checks.some((ok) => !ok) || (textChanged && !reviewed);
  console.log(`\nResult: ${failed ? 'FAIL' : 'PASS'}`);
  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && /scripts[\\/]content-quality-gate\.ts$/.test(process.argv[1])) void main();
