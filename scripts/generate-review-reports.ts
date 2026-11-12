// Generates the review reports that describe the curriculum and its translation state straight from code:
//   docs/curriculum/CURRICULUM_INVENTORY.md
//   docs/translation/TRANSLATION_STATUS.md
// Run `npx tsx scripts/generate-review-reports.ts` to rewrite them, or add `--check` to fail when the committed
// files no longer match the code (tests/review-reports.test.ts runs the check).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Module from 'node:module';

// Bundled media resolve through Metro in the app; here each require returns the asset path.
for (const extension of ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4']) {
  (Module as unknown as { _extensions: Record<string, (module: { exports: unknown }, filename: string) => void> })._extensions[extension] = (module, filename) => { module.exports = filename.split(/[\\/]assets[\\/]/)[1]; };
}

export interface ReviewReports { inventory: string; translation: string }

export async function buildReviewReports(): Promise<ReviewReports> {
  const { modulesByLocale, learnerSelectableLocales } = await import('../src/content');
  const { curriculumImages: imageRegistry } = await import('../src/content/image-registry');
  const { translationStatusReport } = await import('../src/content/translation-status');
  const { MODULE_CLINICAL_REVIEW } = await import('../src/content/clinical-review-register');
  const { LOCALE_DEFINITIONS, PLANNED_LOCALE_TARGETS, SUPPORTED_LOCALES } = await import('../src/i18n/locales');
  const english = modulesByLocale.en;
  const spanish = modulesByLocale.es;

  const inv: string[] = [
    '# Curriculum inventory (generated)', '',
    'Generated from the code by `scripts/generate-review-reports.ts`. Do not edit by hand; rerun the script.', '',
    '| # | ID | English title | Spanish title | Screens | Content | Single choice | Multi-select | Reflection items | Summary | Images (license not recorded) | Videos | CIAS-app screens | CIAS EZ-PAP doc | ATS supplement | App curriculum | Clinical status |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ];
  let totals = { screens: 0, images: 0 };
  for (const module of english) {
    const screens = module.screens;
    const count = (type: string) => screens.filter((screen) => screen.type === type).length;
    const reflections = screens.filter((screen) => screen.type === 'reflection' || ('questionKind' in screen && screen.questionKind === 'reflection')).length;
    const images = imageRegistry.filter((asset) => screens.some((screen) => asset.lessonIds.includes(screen.id)));
    const unlicensed = images.filter((asset) => asset.licenseStatus === 'unknown/user-provided' || /user-provided/i.test(asset.attribution)).length;
    const videos = screens.filter((screen) => screen.type === 'content' && screen.video).length;
    const source = (id: string) => screens.filter((screen) => screen.sourceIds?.includes(id)).length;
    const ats = screens.filter((screen) => screen.sourceIds?.some((id) => id.startsWith('ats-'))).length;
    const es = spanish.find((candidate) => candidate.id === module.id)!;
    totals = { screens: totals.screens + screens.length, images: totals.images + images.length };
    inv.push(`| ${module.order} | \`${module.id}\` | ${module.title} | ${es.title} | ${screens.length} | ${count('content')} | ${count('singleChoice')} | ${count('multiSelect')} | ${reflections} | ${count('summary')} | ${images.length} (${unlicensed}) | ${videos} | ${source('cias-screenshot-recovery')} | ${source('cias-ez-pap-document')} | ${ats} | ${source('curriculum-master-v3')} | ${module.clinicalReviewStatus} |`);
  }
  inv.push('', `Totals: ${english.length} modules, ${totals.screens} screens per language, ${totals.images} image placements.`, '',
    '"Reflection items" counts reflection screens plus ungraded choice questions. "Images (license not recorded)" counts images whose registry entry says user-provided or unknown license. Source columns count screens that cite each source ID; a screen can cite several.', '',
    '## Screen IDs by module', '');
  for (const module of english) inv.push(`- \`${module.id}\` (${module.screens.length}): ${module.screens.map((screen) => `\`${screen.id}\``).join(', ')}`);
  inv.push('', '## Clinical review domains', '', '| Module | Domains | Required reviewers | Open items |', '| --- | --- | --- | --- |');
  for (const entry of MODULE_CLINICAL_REVIEW) inv.push(`| \`${entry.moduleId}\` | ${entry.domains.join(', ')} | ${entry.requiredReviewers.join(', ')} | ${entry.openItems.length} |`);
  inv.push('');

  const report = translationStatusReport(modulesByLocale, learnerSelectableLocales);
  const tr: string[] = [
    '# Translation status (generated)', '',
    'Generated from the code by `scripts/generate-review-reports.ts`. Do not edit by hand; rerun the script.', '',
    'States: **source** is the authoring language. **approved** needs an entry in `src/content/review-register.ts` (there are none). **draft** means complete translated text that no qualified reviewer has approved. **missing** means no text. Clinical review is tracked separately and is still required for every screen in every language.', '',
    '| Language | Decided | Learner can select | Source | Approved | Draft awaiting native review | Missing | Screens still needing clinical review |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |',
  ];
  for (const row of report) {
    const label = (SUPPORTED_LOCALES as readonly string[]).includes(row.target) ? `${LOCALE_DEFINITIONS[row.target as 'en' | 'es'].englishName} (\`${row.target}\`)` : row.label;
    tr.push(`| ${label} | ${row.decided ? 'yes' : 'no'} | ${row.learnerSelectable ? 'yes' : 'no'} | ${row.counts.source} | ${row.counts.approved} | ${row.counts.draft_awaiting_native_review} | ${row.counts.missing} | ${row.clinicalReviewRequired} of ${row.totalScreens} |`);
  }
  tr.push('', '## By module', '', `| Module | ${report.map((row) => row.target).join(' | ')} |`, `| --- | ${report.map(() => '---').join(' | ')} |`);
  for (const module of english) {
    tr.push(`| \`${module.id}\` | ${report.map((row) => {
      const counts = row.modules.find((entry) => entry.moduleId === module.id)!.counts;
      return Object.entries(counts).filter(([, value]) => value > 0).map(([state, value]) => `${value} ${state.replace(/_/g, ' ')}`).join(', ');
    }).join(' | ')} |`);
  }
  tr.push('', '## Undecided languages', '');
  for (const target of PLANNED_LOCALE_TARGETS) tr.push(`- **${target.requestedAs}**: candidates ${target.candidateTags.map((candidate) => `\`${candidate.tag}\` ${candidate.name}`).join('; ')}. Decision needed: ${target.decisionNeeded}`);
  tr.push('');
  return { inventory: inv.join('\n'), translation: tr.join('\n') };
}

const TARGETS = { inventory: 'docs/curriculum/CURRICULUM_INVENTORY.md', translation: 'docs/translation/TRANSLATION_STATUS.md' } as const;
const normalize = (value: string) => value.replace(/\r\n/g, '\n').trim();

async function main() {
  const reports = await buildReviewReports();
  const check = process.argv.includes('--check');
  let stale = false;
  for (const [key, path] of Object.entries(TARGETS) as [keyof ReviewReports, string][]) {
    if (check) {
      let current = '';
      try { current = readFileSync(path, 'utf8'); } catch { /* missing */ }
      if (normalize(current) !== normalize(reports[key])) { console.error(`${path} is out of date; rerun scripts/generate-review-reports.ts`); stale = true; }
    } else {
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, reports[key] + '\n');
      console.log(`wrote ${path}`);
    }
  }
  if (stale) process.exit(1);
}

if (process.argv[1] && /generate-review-reports/.test(process.argv[1])) void main();
