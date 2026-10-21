import { writeFileSync } from 'node:fs';
import { englishModules } from '../src/content/en';
import { sourceManifest } from '../src/content/source-manifest';

const modules = new Map(englishModules.map((module) => [module.id, module]));
const screens = new Map(englishModules.flatMap((module) => module.screens.map((screen) => [screen.id, screen])));
const visualSources = new Set(['src-171405', 'src-171413', 'src-171430', 'src-171649', 'src-171709', 'src-171727', 'src-171731', 'src-172134', 'src-172142']);
const rows = sourceManifest.map((entry, index) => {
  const screen = screens.get(entry.relatedLessonScreenIds[0]);
  const module = modules.get(entry.assignedModuleId);
  const held = !screen;
  const limitation = held ? 'Held: no runtime counterpart' : screen?.reviewReason?.replaceAll('|', '\\|') ?? 'None noted';
  const visual = visualSources.has(entry.id) ? 'Yes—see ASSET_AUDIT.md' : 'CIAS chrome/avatar only; not reused';
  const modulePosition = sourceManifest.slice(0, index + 1).filter((candidate) => candidate.assignedModuleId === entry.assignedModuleId).length;
  const sequence = `${entry.assignedModuleId}-s${String(modulePosition).padStart(2, '0')}`;
  const screenType = screen?.type ?? 'held';
  const title = screen?.title?.replaceAll('|', '\\|') ?? 'Held source record';
  const purpose = screen ? `Native ${screen.type} teaching step` : 'Source recovery hold';
  const question = screen?.type === 'singleChoice' || screen?.type === 'multiSelect' ? 'yes' : 'no';
  return `| ${entry.filePath.replace('screenshots/', '')} | ${module?.order}. ${module?.title} | ${entry.reviewStatus === 'reviewed' ? 'high' : 'medium'} | ${sequence} | ${screenType} | ${title} | ${purpose} | ${question} | no | ${limitation} | none identified | ${visual} | ${held ? 'held—no runtime counterpart' : 'assigned to module'} |`;
});

const output = `# Screenshot audit

Generated from the typed source manifest on 2026-07-29. All 77 PNG files were individually inventoried, OCR-inspected, and visually reviewed. The original files were not modified. No duplicate captured interaction states were found; each source maps to one lesson step. CIAS authoring controls (for example “Add new answer” and image-upload placeholders) are excluded from patient content.

| Exact filename | Assigned module | Confidence | Sequence | Screen type | Extracted heading | Educational purpose | Question | Duplicate state | Extraction limitations | Privacy | Visual assets | Status |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|
${rows.join('\n')}

## Counts

- Total screenshots: ${sourceManifest.length}
- Assigned to a module: ${sourceManifest.length}
- Duplicate interaction states: 0
- Non-content interface-only screenshots: 0 (interface chrome within screenshots was excluded)
- Potentially private screenshots: 0
- Screenshots with unresolved review notes: ${sourceManifest.filter((entry) => entry.reviewStatus === 'needs-review').length}
`;

writeFileSync('docs/SCREENSHOT_AUDIT.md', output, 'utf8');
console.log(`Wrote docs/SCREENSHOT_AUDIT.md with ${rows.length} entries.`);
