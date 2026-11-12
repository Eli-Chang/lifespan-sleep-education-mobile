// Exports the English source text as translation units for a qualified translator, without choosing a
// language variety. Output contains the private curriculum, so it goes to the git-ignored artifacts/ folder
// by default and must not be committed or uploaded to an unapproved tool.
//
//   npx tsx scripts/export-translation-source.ts --target portuguese [--out artifacts/translation-export]
//
// --target is a label for the file name (for example "portuguese", "creole", or a decided tag such as
// "pt-BR"); it does not select or imply a variety. Each unit carries its screen, field path, question
// context, and whether a choice is the keyed answer, so meaning and choice order can be preserved.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { englishModules } from '../src/content/en';
import { learnerVisibleText } from '../src/content/locale-completeness';
import { MODULE_CLINICAL_REVIEW } from '../src/content/clinical-review-register';

export interface TranslationUnit {
  unitId: string;
  moduleId: string;
  screenId: string;
  screenType: string;
  field: string;
  source: string;
  /** For choice labels: true when the English answer key marks this choice correct. Order must not change. */
  isKeyedAnswer?: boolean;
  clinicalDomains: string[];
  target: '';
  translatorNote: '';
  status: 'missing';
}

export function buildTranslationUnits(): TranslationUnit[] {
  return englishModules.flatMap((module) => {
    const domains = MODULE_CLINICAL_REVIEW.find((entry) => entry.moduleId === module.id)?.domains ?? [];
    const meta: TranslationUnit[] = (['title', 'shortTitle', 'description'] as const).map((field) => ({
      unitId: `${module.id}::module.${field}`, moduleId: module.id, screenId: '', screenType: 'module', field: `module.${field}`,
      source: module[field], clinicalDomains: domains, target: '', translatorNote: '', status: 'missing',
    }));
    const screens = module.screens.flatMap((screen) => Object.entries(learnerVisibleText(screen))
      .filter(([field]) => field !== 'narrationText' && !field.startsWith('presentation'))
      .map(([field, source]) => {
        const choiceIndex = field.match(/^choices\[(\d+)\]$/)?.[1];
        const choice = choiceIndex !== undefined && 'choices' in screen ? screen.choices[Number(choiceIndex)] : undefined;
        // Only report keyed answers for questions that have an answer key (some CIAS questions do not).
        const keyed = !choice ? undefined
          : screen.type === 'singleChoice' && screen.correctChoiceId ? screen.correctChoiceId === choice.id
          : screen.type === 'multiSelect' && screen.correctChoiceIds?.length ? screen.correctChoiceIds.includes(choice.id)
          : undefined;
        return {
          unitId: `${screen.id}::${field}`, moduleId: module.id, screenId: screen.id, screenType: screen.type, field, source,
          ...(keyed === undefined ? {} : { isKeyedAnswer: keyed }),
          clinicalDomains: domains, target: '' as const, translatorNote: '' as const, status: 'missing' as const,
        };
      }));
    return [...meta, ...screens];
  });
}

const csvCell = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;

function main() {
  const args = process.argv.slice(2);
  const targetIndex = args.indexOf('--target');
  const outIndex = args.indexOf('--out');
  const target = targetIndex >= 0 ? args[targetIndex + 1] : undefined;
  if (!target || !/^[A-Za-z][A-Za-z0-9-]{1,30}$/.test(target)) {
    console.error('Usage: npx tsx scripts/export-translation-source.ts --target <label> [--out <dir>]');
    process.exit(2);
  }
  const outDir = outIndex >= 0 ? args[outIndex + 1] : join('artifacts', 'translation-export');
  const units = buildTranslationUnits();
  mkdirSync(outDir, { recursive: true });
  const base = join(outDir, `translation-source-${target}`);
  writeFileSync(`${base}.json`, JSON.stringify({ target, generatedAt: new Date().toISOString(), varietyDecided: false, units }, null, 2));
  const header = ['unitId', 'moduleId', 'screenId', 'screenType', 'field', 'isKeyedAnswer', 'clinicalDomains', 'source', 'target', 'translatorNote', 'status'];
  writeFileSync(`${base}.csv`, '﻿' + [header.join(','), ...units.map((unit) => [unit.unitId, unit.moduleId, unit.screenId, unit.screenType, unit.field, unit.isKeyedAnswer ?? '', unit.clinicalDomains.join(' '), unit.source, '', '', unit.status].map(csvCell).join(','))].join('\r\n'));
  console.log(`Wrote ${units.length} units to ${base}.json and ${base}.csv (private curriculum; do not commit or upload to unapproved tools).`);
}

if (process.argv[1] && /export-translation-source/.test(process.argv[1])) main();
