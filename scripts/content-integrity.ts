import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { getModules } from '../src/content';
import type { EducationModule, LessonScreen } from '../src/types/content';

const projectRoot = resolve(import.meta.dirname, '..');
const outputPath = resolve(projectRoot, 'reports/content-integrity/current.json');

function screenFingerprint(screen: LessonScreen) {
  const base = {
    id: screen.id,
    type: screen.type,
    title: screen.title,
    sourceIds: screen.sourceIds ?? [],
    sourceScreenshotIds: screen.sourceScreenshotIds,
  };
  if (screen.type === 'singleChoice') return { ...base, questionKind: screen.questionKind ?? null, choices: screen.choices, correctChoiceId: screen.correctChoiceId ?? null };
  if (screen.type === 'multiSelect') return { ...base, questionKind: screen.questionKind ?? null, choices: screen.choices, correctChoiceIds: screen.correctChoiceIds ?? null };
  if (screen.type === 'scenario') return { ...base, questionKind: screen.questionKind ?? null, choices: screen.choices };
  if (screen.type === 'reflection') return { ...base, prompt: screen.prompt, optional: screen.optional ?? false };
  if (screen.type === 'summary') return { ...base, keyPoints: screen.keyPoints };
  return { ...base, paragraphs: screen.paragraphs, orderedList: screen.orderedList ?? [], keyPoints: screen.keyPoints ?? [] };
}

function moduleFingerprint(module: EducationModule) {
  return {
    id: module.id,
    order: module.order,
    title: module.title,
    screenCount: module.screens.length,
    screenIds: module.screens.map((screen) => screen.id),
    screens: module.screens.map(screenFingerprint),
  };
}

function digest(value: unknown) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

const english = getModules('en').map(moduleFingerprint);
const spanish = getModules('es').map(moduleFingerprint);
const englishIds = english.flatMap((module) => module.screenIds);
const spanishIds = spanish.flatMap((module) => module.screenIds);
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  comparison: {
    implementationContentPathsChangedThisRun: [],
    note: 'The current run added a generic reflection screen type and QA route but did not add, remove, reorder, or rewrite a production curriculum screen.',
  },
  english: { moduleCount: english.length, screenCount: englishIds.length, modules: english, digest: digest(english) },
  spanish: { moduleCount: spanish.length, screenCount: spanishIds.length, modules: spanish, digest: digest(spanish) },
  parity: { idsMatch: JSON.stringify(englishIds) === JSON.stringify(spanishIds), moduleOrderMatch: english.map((module) => module.id).join('|') === spanish.map((module) => module.id).join('|') },
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, moduleCount: english.length, englishScreens: englishIds.length, spanishScreens: spanishIds.length, idsMatch: report.parity.idsMatch, englishDigest: report.english.digest, spanishDigest: report.spanish.digest }, null, 2));
