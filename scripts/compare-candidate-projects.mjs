#!/usr/bin/env node
// Reproducible, read-only comparison of sleep-education project candidates.
//
// Usage:
//   node scripts/compare-candidate-projects.mjs <candidates.json> <out-dir>
//
// candidates.json: { "canonical": { "label", "path" }, "candidates": [ { "label", "path" } | { "label", "gitDir", "refs": ["all"] } ] }
//
// For every candidate the script records Git identity (remote, HEAD, branch, refs, dirty count), stack versions,
// curriculum module/screen IDs found in English content files, locale folders, test and doc counts, and which file
// contents are NOT present anywhere in the canonical working copy or the canonical repository's object database.
// Content identity uses Git blob SHA-1, so a file counts as preserved if the same bytes exist in any canonical
// commit or in the canonical working tree, regardless of path. Nothing is written inside any candidate.
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SKIP_DIRS = new Set(['node_modules', '.git', '.expo', 'dist', 'web-build', '.playwright-cli', 'node_modules.junction-broken-20260901']);
const SKIP_FILES = new Set(['desktop.ini']);
const SOURCE_PREFIXES = ['src/', 'app/', 'scripts/', 'tests/', 'shared/', 'cloudflare-worker/src/', 'cloudflare-worker/tests/', 'docs/', 'components/', 'hooks/', 'constants/', 'assets/'];

const [, , configPath, outDir] = process.argv;
if (!configPath || !outDir) {
  console.error('Usage: node scripts/compare-candidate-projects.mjs <candidates.json> <out-dir>');
  process.exit(2);
}
const config = JSON.parse(readFileSync(configPath, 'utf8'));
mkdirSync(outDir, { recursive: true });

const git = (cwd, args) => {
  const result = spawnSync('git', ['-c', 'safe.directory=*', ...args], { cwd, encoding: 'utf8', maxBuffer: 1 << 28 });
  return result.status === 0 ? result.stdout.split('\n').filter((line) => line && !line.includes('ignoring broken ref')).join('\n').trim() : '';
};
const blobSha = (buffer) => createHash('sha1').update(`blob ${buffer.length}\0`).update(buffer).digest('hex');

function walk(root) {
  const files = [];
  const stack = [''];
  while (stack.length) {
    const rel = stack.pop();
    let entries = [];
    try { entries = readdirSync(join(root, rel), { withFileTypes: true }); } catch { continue; }
    for (const entry of entries) {
      const childRel = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) { if (!SKIP_DIRS.has(entry.name)) stack.push(childRel); }
      else if (entry.isFile() && !SKIP_FILES.has(entry.name)) files.push(childRel);
    }
  }
  return files.sort();
}

function hashTree(root) {
  const map = new Map();
  for (const rel of walk(root)) {
    try { const buffer = readFileSync(join(root, rel)); map.set(rel, { sha: blobSha(buffer), bytes: buffer.length }); } catch { /* unreadable */ }
  }
  return map;
}

function gitTreeBlobs(gitDir, refs) {
  const map = new Map();
  const refList = refs.includes('all') ? git(gitDir, ['for-each-ref', '--format=%(refname)']).split('\n').filter(Boolean) : refs;
  for (const ref of refList) {
    for (const line of git(gitDir, ['ls-tree', '-r', '-l', ref]).split('\n')) {
      const match = line.match(/^\d+ blob ([0-9a-f]{40})\s+(\d+|-)\t(.+)$/);
      if (match && !map.has(match[3])) map.set(match[3], { sha: match[1], bytes: Number(match[2]) || 0, ref });
    }
  }
  return map;
}

function objectDbHas(repoPath, shas) {
  if (!shas.length) return new Set();
  const result = spawnSync('git', ['-c', 'safe.directory=*', 'cat-file', '--batch-check'], { cwd: repoPath, input: shas.join('\n') + '\n', encoding: 'utf8', maxBuffer: 1 << 28 });
  const present = new Set();
  for (const line of result.stdout.split('\n')) { const [sha, type] = line.split(' '); if (type === 'blob') present.add(sha); }
  return present;
}

function readText(source, rel) {
  if (source.path) { const file = join(source.path, rel); return existsSync(file) ? readFileSync(file, 'utf8') : undefined; }
  const out = git(source.gitDir, ['show', `${source.primaryRef}:${rel}`]);
  return out || undefined;
}

function curriculum(source, files) {
  const enModuleFiles = [...files.keys()].filter((rel) => /^src\/content\/en\/modules\/[^/]+\.ts$/.test(rel));
  const enContentFiles = [...files.keys()].filter((rel) => /^src\/content\/en\/.+\.ts$/.test(rel));
  const moduleIds = new Set();
  const screenIds = [];
  for (const rel of enModuleFiles) {
    const text = readText(source, rel) ?? '';
    for (const match of text.matchAll(/\bid\s*:\s*['"](m\d+b?)['"]/g)) moduleIds.add(match[1]);
  }
  // Screen IDs are declared through helper calls (for example c('m1-01', ...)) or CIAS source maps, so count
  // distinct quoted screen-ID literals across all English content files. This approximates candidates that
  // cannot be executed; the canonical count is confirmed separately by `npm run validate:content`.
  for (const rel of enContentFiles) {
    const text = readText(source, rel) ?? '';
    for (const match of text.matchAll(/['"](m\d+b?-[A-Za-z0-9-]+)['"]/g)) screenIds.push(match[1]);
  }
  const prototypeModules = [...files.keys()].filter((rel) => /^content\/modules\/[^/]+\.ts$/.test(rel) && !rel.endsWith('index.ts'));
  const locales = [...new Set([...files.keys()].map((rel) => rel.match(/^src\/content\/([a-z]{2}(?:-[A-Z]{2})?)\//)?.[1]).filter(Boolean))].sort();
  return {
    englishModuleFiles: enModuleFiles.length,
    moduleIds: [...moduleIds].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
    screenIdCount: new Set(screenIds).size,
    contentLocales: locales,
    prototypeModuleFiles: prototypeModules,
  };
}

function stack(source) {
  const pkgText = readText(source, 'package.json');
  if (!pkgText) return {};
  try {
    const pkg = JSON.parse(pkgText);
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const pick = ['expo', 'react-native', 'react', 'next', 'expo-router', 'i18next', 'expo-speech', '@playwright/test', 'typescript'];
    return { name: pkg.name, versions: Object.fromEntries(pick.filter((name) => deps[name]).map((name) => [name, deps[name]])), scripts: Object.keys(pkg.scripts ?? {}).length };
  } catch { return {}; }
}

function identity(source) {
  if (source.path && !existsSync(join(source.path, '.git'))) return { git: false };
  const cwd = source.path ?? source.gitDir;
  const gitFile = source.path ? join(source.path, '.git') : undefined;
  let worktreePointer;
  if (gitFile && statSync(gitFile).isFile()) worktreePointer = readFileSync(gitFile, 'utf8').trim();
  const head = git(cwd, ['rev-parse', 'HEAD']);
  return {
    git: true,
    worktreePointer,
    headResolvable: Boolean(head),
    head,
    branch: git(cwd, ['rev-parse', '--abbrev-ref', 'HEAD']),
    remotes: git(cwd, ['remote', '-v']).split('\n').filter(Boolean),
    refs: git(cwd, ['for-each-ref', '--format=%(refname:short) %(objectname:short) %(committerdate:iso8601)']).split('\n').filter(Boolean),
    latestCommit: git(cwd, ['log', '-1', '--date=iso', '--format=%h %ad %an | %s']),
    dirtyEntries: source.path ? git(cwd, ['status', '--porcelain']).split('\n').filter(Boolean).length : 0,
  };
}

const canonicalPath = config.canonical.path;
console.error(`Hashing canonical working copy ${canonicalPath} ...`);
const canonicalFiles = hashTree(canonicalPath);
const canonicalShas = new Set([...canonicalFiles.values()].map((value) => value.sha));
const results = [];

for (const candidate of config.candidates) {
  console.error(`Comparing ${candidate.label} ...`);
  const source = candidate.gitDir ? { gitDir: candidate.gitDir, primaryRef: candidate.primaryRef ?? 'HEAD' } : { path: candidate.path };
  if (source.path && !existsSync(source.path)) { results.push({ label: candidate.label, path: candidate.path, exists: false }); continue; }
  const files = source.path ? hashTree(source.path) : gitTreeBlobs(source.gitDir, candidate.refs ?? ['all']);
  const candidateShas = [...new Set([...files.values()].map((value) => value.sha))];
  const inDb = objectDbHas(canonicalPath, candidateShas.filter((sha) => !canonicalShas.has(sha)));
  const unique = [...files.entries()].filter(([, value]) => !canonicalShas.has(value.sha) && !inDb.has(value.sha));
  const byTop = {};
  for (const [rel, value] of unique) { const top = rel.split('/')[0]; byTop[top] ??= { files: 0, bytes: 0 }; byTop[top].files += 1; byTop[top].bytes += value.bytes; }
  const uniqueSource = unique.filter(([rel]) => SOURCE_PREFIXES.some((prefix) => rel.startsWith(prefix))).map(([rel, value]) => ({ path: rel, bytes: value.bytes, sameNameInCanonical: canonicalFiles.has(rel) }));
  results.push({
    label: candidate.label,
    path: candidate.path ?? candidate.gitDir,
    remoteUrl: candidate.remoteUrl,
    exists: true,
    identity: identity(source),
    stack: stack(source),
    curriculum: curriculum(source, files),
    counts: {
      files: files.size,
      tests: [...files.keys()].filter((rel) => /^tests\/|\.test\.|\.spec\./.test(rel) && !rel.startsWith('node_modules')).length,
      docs: [...files.keys()].filter((rel) => rel.startsWith('docs/')).length,
    },
    uniqueVsCanonical: { files: unique.length, bytes: unique.reduce((sum, [, value]) => sum + value.bytes, 0), byTopLevel: byTop, sourceFiles: uniqueSource },
  });
}

const canonicalSource = { path: canonicalPath };
const report = {
  generatedAt: new Date().toISOString(),
  canonical: { label: config.canonical.label, path: canonicalPath, identity: identity(canonicalSource), stack: stack(canonicalSource), curriculum: curriculum(canonicalSource, canonicalFiles), counts: { files: canonicalFiles.size } },
  candidates: results,
};
writeFileSync(join(outDir, 'candidate-comparison.json'), JSON.stringify(report, null, 2));
const line = (value) => String(value ?? '').replace(/\|/g, '\\|');
const md = ['# Candidate comparison (generated)', '', `Generated ${report.generatedAt} by scripts/compare-candidate-projects.mjs. Canonical reference: ${config.canonical.label}.`, '',
  '| Candidate | Git HEAD / branch | Remote | Modules found | Screen IDs | Locales | Files | Unique files vs canonical | Unique source/doc files |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ...results.map((r) => r.exists === false ? `| ${line(r.label)} | path missing | | | | | | | |` : `| ${line(r.label)} | ${line(r.identity.git ? `${(r.identity.head || 'unresolvable').slice(0, 7)} ${r.identity.branch || ''}` : 'not a Git repo')} | ${line(r.identity.remotes?.[0]?.split(/\s+/)[1] ?? r.remoteUrl ?? '')} | ${line(r.curriculum.moduleIds.join(', ') || (r.curriculum.prototypeModuleFiles.length ? `${r.curriculum.prototypeModuleFiles.length} prototype modules` : ''))} | ${r.curriculum.screenIdCount} | ${line(r.curriculum.contentLocales.join(', '))} | ${r.counts.files} | ${r.uniqueVsCanonical.files} | ${r.uniqueVsCanonical.sourceFiles.length} |`),
  ''];
writeFileSync(join(outDir, 'candidate-comparison.md'), md.join('\n'));
console.log(md.join('\n'));
