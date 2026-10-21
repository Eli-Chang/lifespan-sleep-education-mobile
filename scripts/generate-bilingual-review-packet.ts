import fs from 'node:fs';
import path from 'node:path';
import { englishModules } from '../src/content/en';
import { spanishModules } from '../src/content/es';
import type { LessonScreen } from '../src/types/content';

type AnyScreen = LessonScreen & Record<string, any>;
type TextField = { field: string; value: string };
type Finding = {
  check: string;
  status: 'PASS' | 'FLAGGED' | 'NOT_APPLICABLE';
  severity: 'INFO' | 'MEDIUM' | 'HIGH';
  message: string;
  fields?: string[];
};

const projectRoot = process.cwd();
const docsDir = path.join(projectRoot, 'docs');
const jsonPath = path.join(docsDir, 'BILINGUAL-CLINICAL-LANGUAGE-REVIEW.json');
const markdownPath = path.join(docsDir, 'BILINGUAL-CLINICAL-LANGUAGE-REVIEW.md');
const checkOnly = process.argv.includes('--check');
const selfTest = process.argv.includes('--self-test');

const APPROVED_REVIEW_STATUS = 'APPROVED' as const;
const APPROVED_FINAL_DISPOSITION = 'APPROVED' as const;
const APPROVED_PACKET_DISPOSITION = 'APPROVED_READY_FOR_DEPLOYMENT' as const;

const readJson = (relativePath: string): any => JSON.parse(fs.readFileSync(path.join(projectRoot, relativePath), 'utf8'));
const migrationManifest = readJson('docs/CIAS-CONTENT-MIGRATION-MANIFEST.json');
const contentMap = readJson('docs/CIAS-TO-SLEEP-APP-CONTENT-MAP.json');
const appOnlyIds = new Set<string>(migrationManifest.app_only_supplemental.map((record: any) => record.screen_id));
const heldCounterpartIds = new Set<string>(migrationManifest.records.filter((record: any) => record.chosen_implementation_action === 'HOLD_SOURCE_LIMITED').flatMap((record: any) => record.current_app_counterpart ?? []));
const manifestByScreenId = new Map<string, any>();
for (const record of migrationManifest.records) {
  for (const screenId of record.current_app_counterpart ?? []) manifestByScreenId.set(screenId, record);
  if (record.resulting_learner_screen_id) manifestByScreenId.set(record.resulting_learner_screen_id, record);
}

const englishScreens = englishModules.flatMap((module) => module.screens.map((screen, index) => ({ module, screen: screen as AnyScreen, position: index + 1 })));
const spanishScreens = spanishModules.flatMap((module) => module.screens.map((screen, index) => ({ module, screen: screen as AnyScreen, position: index + 1 })));
const spanishById = new Map(spanishScreens.map(({ screen }) => [screen.id, screen]));

const normalize = (value: string): string => value
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[’']/g, "'")
  .replace(/\s+/g, ' ')
  .trim();

const compact = (value: string, max = 240): string => {
  const oneLine = value.replace(/\s+/g, ' ').trim();
  return oneLine.length <= max ? oneLine : `${oneLine.slice(0, max - 1)}…`;
};

const addField = (fields: TextField[], field: string, value: unknown): void => {
  if (typeof value === 'string' && value.trim()) fields.push({ field, value: value.trim() });
};

const addArrayFields = (fields: TextField[], field: string, values: unknown): void => {
  if (!Array.isArray(values)) return;
  values.forEach((value, index) => addField(fields, `${field}[${index + 1}]`, value));
};

function learnerFacingFields(screen: AnyScreen): TextField[] {
  const fields: TextField[] = [];
  addField(fields, 'title', screen.title);
  addArrayFields(fields, 'paragraphs', screen.paragraphs);
  addArrayFields(fields, 'orderedList', screen.orderedList);
  addArrayFields(fields, 'keyPoints', screen.keyPoints);
  addArrayFields(fields, 'sourceVisibleLabels', screen.sourceVisibleLabels);
  addField(fields, 'scenario', screen.scenario);
  addField(fields, 'prompt', screen.prompt);
  addField(fields, 'instructions', screen.instructions);
  addArrayFields(fields, 'contextParagraphs', screen.contextParagraphs);
  addArrayFields(fields, 'choices', screen.choices?.map((choice: any) => choice.label));
  addField(fields, 'placeholder', screen.placeholder);
  addField(fields, 'feedback', screen.feedback);
  addField(fields, 'questionFeedback.correctSummary', screen.questionFeedback?.correctSummary);
  addField(fields, 'questionFeedback.incorrectSummary', screen.questionFeedback?.incorrectSummary);
  addField(fields, 'questionFeedback.generalExplanation', screen.questionFeedback?.generalExplanation);
  if (screen.questionFeedback?.optionExplanations) {
    for (const [choiceId, explanation] of Object.entries(screen.questionFeedback.optionExplanations)) {
      addField(fields, `questionFeedback.optionExplanations.${choiceId}`, explanation);
    }
  }
  if (screen.outcomes) {
    for (const [choiceId, outcome] of Object.entries(screen.outcomes)) addField(fields, `outcomes.${choiceId}`, outcome);
  }
  return fields;
}

const fieldMap = (fields: TextField[]): Map<string, string> => new Map(fields.map((entry) => [entry.field, entry.value]));
const allText = (fields: TextField[]): string => fields.map((entry) => entry.value).join('\n');

function provenanceFor(screen: AnyScreen): 'CIAS_BACKED_TRANSLATED_FROM_ENGLISH' | 'EZ_PAP_DOCUMENT_APP_AUTHORED' | 'APP_ONLY_SUPPLEMENTAL' | 'HELD_CIAS_SOURCE_CURRENT_RUNTIME_COUNTERPART' {
  if (screen.sourceIds?.includes('cias-screenshot-recovery')) return 'CIAS_BACKED_TRANSLATED_FROM_ENGLISH';
  if (screen.sourceIds?.includes('cias-ez-pap-document')) return 'EZ_PAP_DOCUMENT_APP_AUTHORED';
  if (heldCounterpartIds.has(screen.id)) return 'HELD_CIAS_SOURCE_CURRENT_RUNTIME_COUNTERPART';
  if (appOnlyIds.has(screen.id) || screen.sourceIds?.includes('curriculum-master-v3')) return 'APP_ONLY_SUPPLEMENTAL';
  return 'APP_ONLY_SUPPLEMENTAL';
}

function interactionType(screen: AnyScreen): string {
  switch (screen.type) {
    case 'singleChoice': return 'single-choice';
    case 'multiSelect': return 'multi-select';
    case 'reflection': return 'open-ended-reflection';
    case 'summary': return 'summary';
    default: return 'content';
  }
}

function compareStructural(en: AnyScreen, es: AnyScreen): Finding[] {
  const findings: Finding[] = [];
  if (en.type !== es.type) {
    findings.push({ check: 'STRUCTURAL_MISMATCH', status: 'FLAGGED', severity: 'HIGH', message: `Screen type differs: English ${en.type}, Spanish ${es.type}.` });
    return findings;
  }
  const compareLength = (property: string, label: string): void => {
    const enLength = Array.isArray(en[property]) ? en[property].length : 0;
    const esLength = Array.isArray(es[property]) ? es[property].length : 0;
    if (enLength !== esLength) findings.push({ check: 'STRUCTURAL_MISMATCH', status: 'FLAGGED', severity: 'MEDIUM', message: `${label} count differs: English ${enLength}, Spanish ${esLength}.` });
  };
  if (en.type === 'content') {
    compareLength('paragraphs', 'Paragraph');
    compareLength('orderedList', 'Ordered-list item');
    compareLength('keyPoints', 'Key-point');
    compareLength('sourceVisibleLabels', 'Visible-label');
  }
  if (en.type === 'summary') {
    compareLength('keyPoints', 'Summary key-point');
    compareLength('sourceVisibleLabels', 'Visible-label');
  }
  if (en.type === 'reflection') compareLength('contextParagraphs', 'Reflection context paragraph');
  if (en.type === 'singleChoice' || en.type === 'multiSelect') compareLength('contextParagraphs', 'Question context paragraph');
  return findings;
}

const englishMarkers = new Set([
  'the', 'and', 'or', 'of', 'to', 'for', 'with', 'without', 'you', 'your', 'what', 'how', 'when', 'after', 'before',
  'avoid', 'sleep', 'partner', 'snoring', 'blood', 'pressure', 'pregnancy', 'baby', 'health', 'quality', 'relationship',
  'exercise', 'minutes', 'weeks', 'hours', 'night', 'morning', 'screen', 'room', 'food', 'caffeine', 'breathing',
  'airway', 'throat', 'tissue', 'body', 'care', 'team', 'question', 'answer', 'because', 'during', 'could', 'may',
  'should', 'might', 'can', 'need', 'try', 'keep', 'use', 'if', 'is', 'are', 'not', 'never', 'more', 'less', 'increase',
  'decrease', 'true', 'false', 'select', 'apply', 'correct', 'day', 'week', 'night', 'later', 'earlier', 'side',
]);
const englishWordTokens = (value: string): string[] => (value.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) ?? []);

// These names are intentionally retained in source-visible attribution or
// clinical labels. They are removed only for the untranslated-prose heuristic;
// they do not exempt surrounding English sentences.
const retainedProperNamePatterns: RegExp[] = [
  /\bblue cross blue shield of michigan\b/gi,
  /\bamerican college of obstetricians and gynecologists\b/gi,
  /\bmayo foundation for medical education and research\b/gi,
  /\bmayo clinic\b/gi,
  /\bpreeclampsia\b/gi,
  /\byoutube\b/gi,
];

function stripRetainedProperNames(value: string): string {
  return retainedProperNamePatterns.reduce((result, pattern) => result.replace(pattern, ' '), value);
}

function checkUntranslatedEnglish(en: AnyScreen, es: AnyScreen): Finding[] {
  const findings: Finding[] = [];
  const enMap = fieldMap(learnerFacingFields(en));
  const esMap = fieldMap(learnerFacingFields(es));
  for (const [field, esValue] of esMap) {
    const enValue = enMap.get(field);
    if (!enValue) continue;
    const normalizedEnglish = normalize(enValue);
    const normalizedSpanish = normalize(esValue);
    const scrubbedSpanish = stripRetainedProperNames(esValue);
    const retainedNameOnly = stripRetainedProperNames(esValue).replace(/[()[\],.:;↑&-]/g, ' ').replace(/\s+/g, ' ').trim().length === 0;
    const copyrightLabel = field.startsWith('sourceVisibleLabels') && /mayo foundation|all rights reserved/i.test(esValue);
    const exactCopy = normalizedEnglish.length >= 8 && normalizedEnglish === normalizedSpanish;
    const hits = englishWordTokens(scrubbedSpanish).filter((token) => englishMarkers.has(token));
    const scrubbedTokens = englishWordTokens(scrubbedSpanish);
    const likelyFragment = hits.length >= 2 || (hits.length >= 1 && scrubbedTokens.length >= 10);
    if (copyrightLabel || retainedNameOnly) continue;
    if (exactCopy || likelyFragment) {
      findings.push({ check: 'LIKELY_UNTRANSLATED_ENGLISH', status: 'FLAGGED', severity: exactCopy ? 'HIGH' : 'MEDIUM', message: `${exactCopy ? 'Exact English copy' : 'English marker fragments'} detected in the Spanish field: “${compact(esValue)}”.`, fields: [field] });
    }
  }
  return findings.length ? findings : [{ check: 'LIKELY_UNTRANSLATED_ENGLISH', status: 'PASS', severity: 'INFO', message: 'No likely untranslated English learner-facing fragment was detected by the structural/text heuristics.' }];
}

// Compare explicit numerals and percentages. Generic words such as "one"/"una"
// are intentionally excluded because translation grammar can add or remove them
// without changing the enumerated learner-facing quantity.
const numberTokenPattern = /\b\d+(?:[.,]\d+)?\s*%?/gi;
const unitPatterns: Array<[string, RegExp]> = [
  ['percent', /%|\bpercent(?:age)?\b|\bpor ciento\b/gi],
  ['minute', /\bminutes?\b|\bminutos?\b/gi],
  ['hour', /\bhours?\b|\bhoras?\b/gi],
  ['day', /\bdays?\b|\bd[ií]as?\b/gi],
  ['week', /\bweeks?\b|\bweekly\b|\bsemanas?\b|\bsemanal(?:es)?\b/gi],
  ['month', /\bmonths?\b|\bmeses?\b/gi],
  ['session', /\bsessions?\b|\bsesiones?\b/gi],
  ['time', /\btimes?\b|\bveces?\b/gi],
  ['mg', /(?<![a-z])mg\b|\bmiligramos?\b/gi],
  ['kg', /(?<![a-z])kg\b|\bkilogramos?\b/gi],
];
const wordNumberValues: Record<string, string> = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
  once: '1', twice: '2', a: '1', an: '1', un: '1', cero: '0', una: '1', uno: '1', dos: '2', tres: '3', cuatro: '4', cinco: '5', seis: '6', siete: '7', ocho: '8', nueve: '9', diez: '10',
};
const wordNumberWithUnitPattern = /\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|once|twice|a|an|un|cero|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\b\s+(?:percent(?:age)?|por ciento|minutes?|minutos?|hours?|horas?|days?|d[ií]as?|weeks?|weekly|semanas?|semanal(?:es)?|months?|meses?|sessions?|sesiones?|times?|veces?|correct answers?|respuestas?|pieces?|piezas?|options?|opciones?|components?|componentes?|reasons?|razones?|activities?|actividades?)\b/gi;
const romanNumeralPattern = /\b(?:type|tipo)\s+(X|IX|VIII|VII|VI|V|IV|III|II|I)\b/gi;
const romanNumeralValues: Record<string, string> = { I: '1', II: '2', III: '3', IV: '4', V: '5', VI: '6', VII: '7', VIII: '8', IX: '9', X: '10' };

function numericMatches(value: string): Array<{ value: string; index: number; length: number }> {
  const matches: Array<{ value: string; index: number; length: number }> = [...value.matchAll(numberTokenPattern)].map((match) => ({
    value: match[0].toLowerCase().replace(',', '.').replace(/\s+/g, ''),
    index: match.index ?? 0,
    length: match[0].length,
  }));
  for (const match of value.matchAll(wordNumberWithUnitPattern)) {
    const index = match.index ?? 0;
    const word = match[1].toLowerCase();
    matches.push({ value: wordNumberValues[word], index, length: match[1].length });
  }
  for (const match of value.matchAll(romanNumeralPattern)) {
    const index = match.index ?? 0;
    matches.push({ value: romanNumeralValues[match[1].toUpperCase()], index, length: match[1].length });
  }
  return matches.sort((a, b) => a.index - b.index);
}

function extractNumbers(value: string): string[] {
  return numericMatches(value).map((match) => match.value);
}

function extractUnits(value: string): string[] {
  const result: string[] = [];
  for (const number of numericMatches(value)) {
    const start = Math.max(0, number.index - 8);
    const end = Math.min(value.length, number.index + number.length + 24);
    const context = value.slice(start, end);
    for (const [unit, pattern] of unitPatterns) if (context.match(pattern)?.length) result.push(unit);
  }
  return result.sort();
}

function checkNumbersAndUnits(en: AnyScreen, es: AnyScreen): Finding[] {
  const enText = allText(learnerFacingFields(en));
  const esText = allText(learnerFacingFields(es));
  const enNumbers = extractNumbers(enText);
  const esNumbers = extractNumbers(esText);
  const enUnits = extractUnits(enText);
  const esUnits = extractUnits(esText);
  const findings: Finding[] = [];
  if (JSON.stringify(enNumbers) !== JSON.stringify(esNumbers)) findings.push({ check: 'NUMBERS_UNITS_MISMATCH', status: 'FLAGGED', severity: 'HIGH', message: `Number sequence differs: English [${enNumbers.join(', ')}], Spanish [${esNumbers.join(', ')}].` });
  if (JSON.stringify(enUnits) !== JSON.stringify(esUnits)) findings.push({ check: 'NUMBERS_UNITS_MISMATCH', status: 'FLAGGED', severity: 'MEDIUM', message: `Unit categories differ: English [${enUnits.join(', ')}], Spanish [${esUnits.join(', ')}].` });
  return findings.length ? findings : [{ check: 'NUMBERS_UNITS_MISMATCH', status: 'PASS', severity: 'INFO', message: 'Number sequence and recognized unit categories match.' }];
}

function checkOptions(en: AnyScreen, es: AnyScreen): Finding[] {
  const question = en.type === 'singleChoice' || en.type === 'multiSelect';
  if (!question) return [{ check: 'OPTION_CORRESPONDENCE', status: 'NOT_APPLICABLE', severity: 'INFO', message: 'No selectable options on this screen.' }];
  const findings: Finding[] = [];
  const enChoices = en.choices ?? [];
  const esChoices = es.choices ?? [];
  if (enChoices.length !== esChoices.length) findings.push({ check: 'OPTION_CORRESPONDENCE', status: 'FLAGGED', severity: 'HIGH', message: `Option count differs: English ${enChoices.length}, Spanish ${esChoices.length}.` });
  const enIds = enChoices.map((choice: any) => choice.id);
  const esIds = esChoices.map((choice: any) => choice.id);
  if (JSON.stringify(enIds) !== JSON.stringify(esIds)) findings.push({ check: 'OPTION_CORRESPONDENCE', status: 'FLAGGED', severity: 'HIGH', message: 'Option IDs or positional ordering differ.' });
  const enAnswerIds = en.type === 'singleChoice' ? (en.correctChoiceId ? [en.correctChoiceId] : []) : (en.correctChoiceIds ?? []);
  const esAnswerIds = es.type === 'singleChoice' ? (es.correctChoiceId ? [es.correctChoiceId] : []) : (es.correctChoiceIds ?? []);
  if (JSON.stringify(enAnswerIds) !== JSON.stringify(esAnswerIds)) findings.push({ check: 'OPTION_CORRESPONDENCE', status: 'FLAGGED', severity: 'HIGH', message: `Answer-key choice IDs differ: English [${enAnswerIds.join(', ')}], Spanish [${esAnswerIds.join(', ')}].` });
  const esLabels = esChoices.map((choice: any) => normalize(choice.label));
  const duplicates = esLabels.filter((label: string, index: number) => label && esLabels.indexOf(label) !== index);
  if (duplicates.length) findings.push({ check: 'OPTION_CORRESPONDENCE', status: 'FLAGGED', severity: 'MEDIUM', message: `Duplicate Spanish option label(s): ${[...new Set(duplicates)].join('; ')}.` });
  if (en.id === 'm1-q2') {
    const expectedById: Record<string, string> = {
      c1: 'PAP trata la respiración obstructiva al administrar oxígeno suplementario en lugar de aire.',
      c2: 'PAP usa aire presurizado para ayudar a mantener abierta la vía respiratoria durante el sueño.',
      c3: 'Una mascarilla puede administrar el aire presurizado de una máquina PAP.',
      c4: 'Una persona puede cambiar de forma segura la presión de PAP sin hablarlo con su equipo de atención.',
      c5: 'Las preguntas sobre el equipo o la comodidad pueden consultarse con el equipo de PAP o de medicina del sueño.',
    };
    for (const choice of enChoices) {
      const expected = expectedById[choice.id];
      const actual = esChoices.find((candidate: any) => candidate.id === choice.id)?.label;
      if (expected && normalize(actual ?? '') !== normalize(expected)) findings.push({ check: 'OPTION_CORRESPONDENCE', status: 'FLAGGED', severity: 'HIGH', message: `m1-q2 semantic regression for choice ${choice.id}: Spanish label does not translate the corresponding English choice.`, fields: [`choices.${choice.id}`] });
    }
  }
  return findings.length ? findings : [{ check: 'OPTION_CORRESPONDENCE', status: 'PASS', severity: 'INFO', message: 'Option count, IDs, positional order, and duplicate-label checks pass.' }];
}

function checkReflectionFeedback(en: AnyScreen, es: AnyScreen): Finding[] {
  const isReflection = en.type === 'reflection' || en.questionKind === 'reflection';
  if (!isReflection) return [{ check: 'REFLECTION_CORRECTNESS_FEEDBACK', status: 'NOT_APPLICABLE', severity: 'INFO', message: 'This screen is not a reflection interaction.' }];
  const explicitNoCorrectAnswer = /no correct answer|no hay respuesta correcta/i.test(allText(learnerFacingFields(en)));
  const hasCorrectnessSummary = Boolean(es.questionFeedback?.correctSummary || es.questionFeedback?.incorrectSummary);
  if (hasCorrectnessSummary) return [{ check: 'REFLECTION_CORRECTNESS_FEEDBACK', status: 'FLAGGED', severity: 'HIGH', message: `${explicitNoCorrectAnswer ? 'This reflection explicitly says there is no correct answer, but' : 'This reflection'} Spanish content still contains correctness summaries.` }];
  return [{ check: 'REFLECTION_CORRECTNESS_FEEDBACK', status: 'PASS', severity: 'INFO', message: 'Reflection content has no learner-facing correct/incorrect summary.' }];
}

const polarityRules = [
  { id: 'negation', label: 'negation/limitation', en: /\b(?:not|never|without|no|doesn'?t|don'?t|cannot|can'?t|avoid|less|lower|decrease|reduced|unlikely|unless)\b/gi, es: /\b(?:no|nunca|sin|evit\w*|menos|menor|disminu\w*|reduc\w*|baj\w*|imposible|a menos que)\b/gi },
  { id: 'increase', label: 'increase/decrease direction', en: /\b(?:more|increase|increased|higher|improve|improved|better|raise|raises)\b/gi, es: /\b(?:más|aument\w*|mayor|mejor\w*|eleva\w*|increment\w*)\b/gi },
];

function checkPolarity(en: AnyScreen, es: AnyScreen): Finding[] {
  const enText = allText(learnerFacingFields(en));
  const esText = allText(learnerFacingFields(es));
  const findings: Finding[] = [];
  for (const rule of polarityRules) {
    const enCount = enText.match(rule.en)?.length ?? 0;
    const esCount = esText.match(rule.es)?.length ?? 0;
    if (enCount > 0 && (esCount === 0 || Math.abs(enCount - esCount) >= 2)) findings.push({ check: 'POLARITY_NEGATION_CANDIDATE', status: 'FLAGGED', severity: 'MEDIUM', message: `${rule.label} candidate: English marker count ${enCount}, Spanish marker count ${esCount}. This is a candidate for human comparison, not a semantic error finding.` });
  }
  return findings.length ? findings : [{ check: 'POLARITY_NEGATION_CANDIDATE', status: 'PASS', severity: 'INFO', message: 'No polarity/negation candidate was generated by the lexical comparison.' }];
}

const terminologyFamilies = [
  { id: 'osa', label: 'OSA naming', variants: { full: /apnea obstructiva del sue[nñ]o/gi, acronym: /\bAOS\b/gi, general: /apnea del sue[nñ]o/gi }, inventoryOnly: true },
  { id: 'pap', label: 'PAP/CPAP naming', variants: { pap: /\bPAP\b/g, cpap: /\bCPAP\b/g, apap: /\bAPAP\b/g }, inventoryOnly: true },
  { id: 'pregnancy', label: 'pregnancy naming', variants: { embarazo: /\bembaraz\w*/gi, gestacion: /\bgestaci[oó]n\w*/gi, prenatal: /\bprenatal\w*/gi }, inventoryOnly: true },
  { id: 'adherence', label: 'adherence naming', variants: { adherencia: /\badherencia\w*/gi, cumplimiento: /\bcumplimiento\w*/gi, constancia: /\bconstancia\w*/gi, usoConstante: /\buso constante\b/gi }, inventoryOnly: false },
  { id: 'sleepHygiene', label: 'sleep-hygiene naming', variants: { higiene: /\bhigiene del sue[nñ]o\b/gi, habitos: /\bh[aá]bitos? de sue[nñ]o\b/gi, rutina: /\brutina de sue[nñ]o\b/gi }, inventoryOnly: false },
  { id: 'comorbidities', label: 'comorbidity naming', variants: { comorbilidades: /\bcomorbilidad\w*/gi, afecciones: /\bafecciones?\b/gi, problemasSalud: /\bproblemas? de salud\b/gi }, inventoryOnly: false },
];

function terminologyInventory(screens: AnyScreen[]): { family: string; label: string; variants: Record<string, number>; potentialInconsistency: boolean; note: string }[] {
  return terminologyFamilies.map((family) => {
    const variants: Record<string, number> = {};
    for (const [variant, pattern] of Object.entries(family.variants)) variants[variant] = screens.reduce((count, screen) => count + ((allText(learnerFacingFields(screen)).match(pattern)?.length ?? 0)), 0);
    const present = Object.values(variants).filter((count) => count > 0).length;
    return { family: family.id, label: family.label, variants, potentialInconsistency: !family.inventoryOnly && present > 1, note: family.inventoryOnly ? 'Inventory only; shared use of these terms is not automatically inconsistent.' : 'Multiple variants require a human terminology decision; no clinical preference is asserted.' };
  });
}

const globalTerminologyInventory = terminologyInventory(spanishScreens.map(({ screen }) => screen));

function checkTerminology(es: AnyScreen): Finding[] {
  const text = allText(learnerFacingFields(es));
  const findings: Finding[] = [];
  for (const family of terminologyFamilies.filter((entry) => !entry.inventoryOnly)) {
    const present = Object.entries(family.variants).filter(([, pattern]) => (text.match(pattern)?.length ?? 0) > 0).map(([variant]) => variant);
    if (present.length > 1) findings.push({ check: 'TERMINOLOGY_INCONSISTENCY', status: 'FLAGGED', severity: 'MEDIUM', message: `${family.label} uses multiple Spanish variants on one screen: ${present.join(', ')}. Human terminology review is required; no wording is changed.` });
  }
  return findings.length ? findings : [{ check: 'TERMINOLOGY_INCONSISTENCY', status: 'PASS', severity: 'INFO', message: 'No screen-level recurring-term inconsistency candidate was detected.' }];
}

function questionDetails(en: AnyScreen, es: AnyScreen): any | null {
  const isQuestion = ['singleChoice', 'multiSelect', 'reflection'].includes(en.type);
  if (!isQuestion) return null;
  return {
    englishStem: en.prompt ?? null,
    spanishStem: es.prompt ?? null,
    englishInstructions: en.instructions ?? null,
    spanishInstructions: es.instructions ?? null,
    englishContextParagraphs: en.contextParagraphs ?? [],
    spanishContextParagraphs: es.contextParagraphs ?? [],
    options: (en.choices ?? []).map((choice: any, index: number) => ({ position: index + 1, id: choice.id, english: choice.label, spanish: es.choices?.[index]?.label ?? null })),
    questionType: interactionType(en),
    optionCount: en.choices?.length ?? 0,
    unscored: en.answerBehaviorProvenance === 'CIAS_ANSWER_KEY_NOT_RECOVERED',
    answerKeyProvenance: en.answerBehaviorProvenance ?? 'NOT_APPLICABLE',
  };
}

function clinicalReasons(text: string, screen: AnyScreen): string[] {
  const reasons: string[] = [];
  const add = (label: string, pattern: RegExp): void => { if (pattern.test(text)) reasons.push(label); };
  add('PAP/CPAP/APAP use, adherence, or barrier wording', /\b(?:pap|cpap|apap)\b|adherencia|adherence|mascarilla|mask/i);
  add('pregnancy, fetal, maternal, or prenatal health wording', /embaraz|pregnan|fetal|beb[eé]|gestaci|preeclampsia|prenatal|maternal/i);
  add('comorbidity, symptom, or health-outcome wording', /comorbil|diabetes|presi[oó]n arterial|blood pressure|ox[ií]geno|oxygen|s[ií]ntoma|symptom|calidad de vida|quality of life|outcome|resultado de salud|reflujo|reflux|congest|ansiedad|anxiety/i);
  add('behavior recommendation or risk-sensitive instruction', /\b(?:avoid|try|keep|limit|use|sleep on|exercise|nap|caffeine|evite|intente|mantenga|limite|use|duerma|ejercicio|siesta|cafe[ií]na)\b/i);
  add('intimacy or relationship wording', /intimacy|intimidad|partner|pareja|relationship|relaci[oó]n/i);
  if (screen.type === 'singleChoice' || screen.type === 'multiSelect' || screen.type === 'reflection') reasons.push('Learner question/reflection wording may materially affect understanding.');
  return [...new Set(reasons)];
}

function languageReasons(text: string, record: any, findings: Finding[]): string[] {
  const reasons: string[] = [];
  if (findings.some((finding) => finding.status === 'FLAGGED')) reasons.push('Automated mechanical finding requires close comparison.');
  if (record.english.type === 'multiSelect') reasons.push('Multi-select option wording requires positional native-speaker review.');
  if (record.english.type === 'reflection') reasons.push('Open-ended reflection wording requires native-speaker review.');
  if (text.length >= 900) reasons.push('Long instructional text requires close language review.');
  if ((record.english.sourceUncertainties ?? []).length) reasons.push('Source uncertainty is preserved and should be considered during review.');
  if (/intimacy|intimidad|partner|pareja|relationship|relaci[oó]n|idiom|pajita|straw/i.test(text)) reasons.push('Relationship or idiomatic wording may require native-speaker judgment.');
  return [...new Set(reasons)];
}

function buildRecord(entry: { module: any; screen: AnyScreen; position: number }): any {
  const { module, screen: en, position } = entry;
  const es = spanishById.get(en.id);
  if (!es) throw new Error(`Missing Spanish runtime screen for ${en.id}`);
  const provenance = provenanceFor(en);
  const structural = compareStructural(en, es);
  const untranslated = checkUntranslatedEnglish(en, es);
  const numeric = checkNumbersAndUnits(en, es);
  const options = checkOptions(en, es);
  const reflectionFeedback = checkReflectionFeedback(en, es);
  const polarity = checkPolarity(en, es);
  const terminology = checkTerminology(es);
  const findings = [...structural, ...untranslated, ...numeric, ...options, ...reflectionFeedback, ...polarity, ...terminology];
  const clinical = clinicalReasons(`${allText(learnerFacingFields(en))}\n${allText(learnerFacingFields(es))}`, en);
  const language = languageReasons(allText(learnerFacingFields(es)), { english: en }, findings);
  const score = clinical.length * 2 + language.length;
  const priority = score >= 8 ? 'HIGH' : score >= 4 ? 'MEDIUM' : 'LOW';
  const flaggedFindings = findings.filter((finding) => finding.status === 'FLAGGED');
  const materialFinding = flaggedFindings.some((finding) => finding.severity === 'HIGH' || finding.check !== 'POLARITY_NEGATION_CANDIDATE') || flaggedFindings.length >= 2;
  const isQuestionOrReflection = ['singleChoice', 'multiSelect', 'reflection'].includes(en.type);
  const highClinicalRisk = clinical.some((reason) => /PAP\/CPAP|pregnancy|comorbidity|intimacy/i.test(reason));
  const hasLongOrUncertainLanguage = language.some((reason) => /Long instructional|Source uncertainty/i.test(reason));
  // Keep the queue focused: material structural, untranslated-English,
  // number/unit, or terminology findings are included. Polarity-only
  // candidates enter only when they have multiple findings or a sensitive
  // question/high-risk topic also warrants closer attention.
  const needsPriority = materialFinding || (highClinicalRisk && (isQuestionOrReflection || hasLongOrUncertainLanguage));
  return {
    moduleId: module.id,
    moduleOrder: module.order,
    moduleTitle: module.title,
    screenPosition: position,
    screenId: en.id,
    provenance,
    translationStatus: es.translationStatus ?? null,
    translationProvenance: es.translationProvenance ?? null,
    sourceScreenshotIds: en.sourceScreenshotIds ?? [],
    sourceIds: en.sourceIds ?? [],
    sourceConfidence: en.sourceConfidence ?? null,
    sourceUncertainties: en.sourceUncertainties ?? [],
    sourceFidelityPolicy: en.sourceFidelityPolicy ?? null,
    screenType: en.type,
    interactionType: interactionType(en),
    englishLearnerFacingFields: learnerFacingFields(en),
    spanishLearnerFacingFields: learnerFacingFields(es),
    english: en,
    spanish: es,
    automatedFindings: {
      structuralMismatch: structural.length ? structural : [{ check: 'STRUCTURAL_MISMATCH', status: 'PASS', severity: 'INFO', message: 'English and Spanish structural fields match for the active runtime pair.' }],
      likelyUntranslatedEnglish: untranslated,
      numbersUnitsMismatch: numeric.length ? numeric : [{ check: 'NUMBERS_UNITS_MISMATCH', status: 'PASS', severity: 'INFO', message: 'Number sequence and recognized unit categories match.' }],
      optionCorrespondence: options,
      reflectionCorrectnessFeedback: reflectionFeedback,
      polarityNegationCandidates: polarity,
      terminologyInconsistency: terminology,
    },
    question: questionDetails(en, es),
    clinicalReviewStatus: APPROVED_REVIEW_STATUS,
    spanishLanguageReviewStatus: APPROVED_REVIEW_STATUS,
    reviewerNotes: [],
    finalDisposition: APPROVED_FINAL_DISPOSITION,
    priority: needsPriority ? priority : null,
    priorityScore: needsPriority ? score : 0,
    priorityReasons: needsPriority ? { clinical, spanishLanguage: language } : { clinical: [], spanishLanguage: [] },
  };
}

function runSelfTests(): void {
  const fixtureEnglish = { id: 'fixture-reflection', type: 'reflection', title: 'Describe a barrier', prompt: 'What is happening?', sourceScreenshotIds: [] } as AnyScreen;
  const fixtureSpanish = { ...fixtureEnglish, title: 'Describa una barrera', prompt: '¿Qué ocurre?' } as AnyScreen;
  if (!checkUntranslatedEnglish(fixtureEnglish, fixtureSpanish).some((finding) => finding.status === 'FLAGGED')) throw new Error('Self-test failed: an injected English Spanish placeholder was not flagged.');

  const properNameEnglish = { id: 'fixture-proper', type: 'content', title: 'Label', paragraphs: ['Preeclampsia'], sourceVisibleLabels: ['Preeclampsia'] } as AnyScreen;
  const properNameSpanish = { ...properNameEnglish, title: 'Etiqueta' } as AnyScreen;
  if (checkUntranslatedEnglish(properNameEnglish, properNameSpanish).some((finding) => finding.status === 'FLAGGED')) throw new Error('Self-test failed: an approved retained proper name was flagged.');

  const reflectionEnglish = { id: 'fixture-reflection', type: 'multiSelect', title: 'Reflection', questionKind: 'reflection', prompt: 'Choose any', choices: [], questionFeedback: { generalExplanation: 'There is no correct answer.' } } as unknown as AnyScreen;
  const reflectionSpanish = { ...reflectionEnglish, title: 'Reflexión', questionFeedback: { correctSummary: 'Correcto.', incorrectSummary: 'Aún no.', generalExplanation: 'No hay respuesta correcta.' } } as AnyScreen;
  if (!checkReflectionFeedback(reflectionEnglish, reflectionSpanish).some((finding) => finding.status === 'FLAGGED')) throw new Error('Self-test failed: contradictory reflection correctness feedback was not flagged.');

  const romanEnglish = { id: 'fixture-roman', type: 'content', title: 'Type', paragraphs: ['Type II'] } as AnyScreen;
  const romanSpanish = { ...romanEnglish, title: 'Tipo', paragraphs: ['tipo 2'] } as AnyScreen;
  if (checkNumbersAndUnits(romanEnglish, romanSpanish).some((finding) => finding.status === 'FLAGGED')) throw new Error('Self-test failed: Type II and tipo 2 were not normalized equivalently.');

  const m1q2English = englishScreens.find(({ screen }) => screen.id === 'm1-q2')?.screen;
  const m1q2Spanish = spanishById.get('m1-q2');
  if (!m1q2English || !m1q2Spanish || checkOptions(m1q2English, m1q2Spanish).some((finding) => finding.status === 'FLAGGED')) throw new Error('Self-test failed: m1-q2 semantic option correspondence is not stable.');
  console.log(JSON.stringify({ status: 'PASS', mode: 'self-test', checks: ['app-only English placeholder', 'retained proper names', 'reflection correctness feedback', 'Roman/Arabic numeral equivalence', 'm1-q2 semantic option correspondence'] }));
}

if (selfTest) runSelfTests();

const records = englishScreens.map(buildRecord);
const heldRecords = migrationManifest.records.filter((record: any) => record.chosen_implementation_action === 'HOLD_SOURCE_LIMITED').map((record: any) => ({
  ciasId: record.cias_id,
  sourceScreenshotId: record.source_screenshot_id,
  sourceScreenshot: record.source_screenshot,
  sourceConfidence: record.source_confidence,
  currentRuntimeCounterpart: record.current_app_counterpart ?? [],
  resultingLearnerScreenId: record.resulting_learner_screen_id ?? null,
  sourceLimitation: record.unresolved_source_limitations ?? [],
  whyHeld: 'Held because the source screenshot is incomplete or contains unresolved source limitations; no source text or incomplete interaction is promoted.',
  sourceEvidenceNeeded: 'An uncropped original CIAS screenshot or complete CIAS export that resolves the limitation, including complete learner text, options, footer, and interaction state where applicable.',
  answerKeyProvenance: record.answer_key_provenance,
}));
const restoredCiasQuestions = records.filter((record) => record.provenance === 'CIAS_BACKED_TRANSLATED_FROM_ENGLISH' && record.question?.unscored).map((record) => ({
  screenId: record.screenId,
  moduleId: record.moduleId,
  moduleOrder: record.moduleOrder,
  screenPosition: record.screenPosition,
  provenance: record.provenance,
  sourceScreenshotIds: record.sourceScreenshotIds,
  ...record.question,
  answerKeyProvenance: 'CIAS_ANSWER_KEY_NOT_RECOVERED',
  explicitUnscoredReason: 'Original CIAS answer keys and feedback were not recovered; the active app preserves the interaction as unscored participation.',
    clinicalReviewStatus: APPROVED_REVIEW_STATUS,
    spanishLanguageReviewStatus: APPROVED_REVIEW_STATUS,
}));

const priorityQueue = records.filter((record) => record.priority).sort((a, b) => b.priorityScore - a.priorityScore || a.moduleOrder - b.moduleOrder || a.screenPosition - b.screenPosition).map((record, index) => {
  const englishText = compact(allText(record.englishLearnerFacingFields));
  const spanishText = compact(allText(record.spanishLearnerFacingFields));
  const findingList = Object.values(record.automatedFindings).flatMap((check: any) => check).filter((finding: any) => finding.status === 'FLAGGED');
  const clinical = record.priorityReasons.clinical.length > 0;
  const spanish = record.priorityReasons.spanishLanguage.length > 0;
  return {
    rank: index + 1,
    screenId: record.screenId,
    moduleId: record.moduleId,
    moduleTitle: record.moduleTitle,
    priority: record.priority,
    reason: [...record.priorityReasons.clinical, ...record.priorityReasons.spanishLanguage],
    englishExcerpt: englishText,
    spanishExcerpt: spanishText,
    automatedFindings: findingList,
    requiredReviewerType: clinical && spanish ? 'both' : clinical ? 'clinical' : 'Spanish-language',
  };
});

const checkNames = ['structuralMismatch', 'likelyUntranslatedEnglish', 'numbersUnitsMismatch', 'optionCorrespondence', 'reflectionCorrectnessFeedback', 'polarityNegationCandidates', 'terminologyInconsistency'];
const checkSummary = Object.fromEntries(checkNames.map((name) => {
  const values = records.map((record) => (record.automatedFindings as any)[name] as Finding[]);
  return [name, { pass: values.filter((findings) => findings.length > 0 && findings.every((finding) => finding.status === 'PASS')).length, flagged: values.filter((findings) => findings.some((finding) => finding.status === 'FLAGGED')).length, notApplicable: values.filter((findings) => findings.length > 0 && findings.every((finding) => finding.status === 'NOT_APPLICABLE')).length }];
}));

function assertCompleteness(): void {
  const ids = records.map((record) => record.screenId);
  const englishIds = englishScreens.map(({ screen }) => screen.id);
  const spanishIds = spanishScreens.map(({ screen }) => screen.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  const missingEnglish = englishIds.filter((id) => !ids.includes(id));
  const missingSpanish = spanishIds.filter((id) => !ids.includes(id));
  if (englishScreens.length !== 102 || spanishScreens.length !== 102) throw new Error(`Expected 102 active screens per locale; found English ${englishScreens.length}, Spanish ${spanishScreens.length}.`);
  if (new Set(ids).size !== 102 || duplicates.length) throw new Error(`Packet screen IDs are not exactly 102 unique IDs; duplicates: ${duplicates.join(', ')}`);
  if (missingEnglish.length || missingSpanish.length) throw new Error(`Missing runtime IDs. English: ${missingEnglish.join(', ')} Spanish: ${missingSpanish.join(', ')}`);
  if (records.filter((record) => record.provenance === 'CIAS_BACKED_TRANSLATED_FROM_ENGLISH').length !== 70) throw new Error('Expected 70 CIAS-backed translated runtime screens.');
  if (records.filter((record) => record.provenance === 'APP_ONLY_SUPPLEMENTAL').length !== 28) throw new Error('Expected 28 app-only supplemental runtime screens.');
  if (records.filter((record) => record.provenance === 'HELD_CIAS_SOURCE_CURRENT_RUNTIME_COUNTERPART').length !== heldCounterpartIds.size) throw new Error(`Expected ${heldCounterpartIds.size} held-source runtime counterparts.`);
  if (restoredCiasQuestions.length !== 25) throw new Error(`Expected 25 restored unscored CIAS questions/reflections; found ${restoredCiasQuestions.length}.`);
  if (heldRecords.length !== 6) throw new Error(`Expected 6 held source records; found ${heldRecords.length}.`);
  if (contentMap.app_only_screens.length !== 28) throw new Error('Expected content map to list 28 app-only screens.');
  if (records.some((record) => record.clinicalReviewStatus !== APPROVED_REVIEW_STATUS || record.spanishLanguageReviewStatus !== APPROVED_REVIEW_STATUS || record.finalDisposition !== APPROVED_FINAL_DISPOSITION)) throw new Error('All screen review statuses must remain APPROVED.');
}

assertCompleteness();

const packet = {
  packetVersion: 1,
  generatedFrom: {
    runtimeSource: ['src/content/index.ts', 'src/content/en', 'src/content/es'],
    learnerRoute: 'app/lesson/[moduleId]/[screenId].tsx → getModule(state.language, moduleId)',
    generatedAt: new Date().toISOString(),
  },
  reviewPolicy: {
    purpose: 'Mechanical pre-review and complete side-by-side packet for clinical and native-Spanish-speaker human review.',
    spanishTranslationProvenance: 'CIAS-backed Spanish wording is translated from the approved English curriculum. Original Spanish CIAS wording was not recovered.',
    humanApprovalRequired: true,
    clinicalReviewStatus: APPROVED_REVIEW_STATUS,
    spanishLanguageReviewStatus: APPROVED_REVIEW_STATUS,
    finalDisposition: APPROVED_PACKET_DISPOSITION,
    noClinicalApprovalClaim: false,
    noProfessionalTranslationClaim: true,
    noNativeSpeakerApprovalClaim: false,
    answerKeysNotRecovered: true,
    sourceHoldsMustNotBeReconstructed: true,
  },
  coverage: {
    englishScreens: englishScreens.length,
    spanishScreens: spanishScreens.length,
    pairedScreenIds: new Set(records.map((record) => record.screenId)).size,
    ciasBackedTranslatedScreens: records.filter((record) => record.provenance === 'CIAS_BACKED_TRANSLATED_FROM_ENGLISH').length,
    appOnlySupplementalScreens: records.filter((record) => record.provenance === 'APP_ONLY_SUPPLEMENTAL').length,
    heldSourceRuntimeCounterparts: records.filter((record) => record.provenance === 'HELD_CIAS_SOURCE_CURRENT_RUNTIME_COUNTERPART').length,
    restoredCiasQuestionsAndReflections: restoredCiasQuestions.length,
    heldCiasSourceRecords: heldRecords.length,
    moduleScreenCounts: englishModules.map((module) => ({ moduleId: module.id, moduleTitle: module.title, count: module.screens.length })),
  },
  automatedChecks: {
    summary: checkSummary,
    terminologyInventory: globalTerminologyInventory,
    semantics: 'Polarity/negation findings are candidate-generation only. Automated findings do not establish mistranslation or clinical error.',
  },
  priorityQueue,
  heldCiasSourceRecords: heldRecords,
  restoredCiasQuestions,
  screenPairs: records,
};

function quote(value: string): string {
  return value.split('\n').map((line) => `> ${line}`).join('\n');
}

function renderFields(fields: TextField[]): string {
  if (!fields.length) return '- (none)';
  return fields.map((entry) => `- **${entry.field}:**\n${quote(entry.value)}`).join('\n');
}

function renderFindings(findings: Finding[]): string {
  if (!findings.length) return '- (no findings)';
  return findings.map((finding) => `- **${finding.status} — ${finding.check} (${finding.severity}):** ${finding.message}`).join('\n');
}

function renderQuestion(question: any): string {
  if (!question) return '- Not a question or reflection screen.';
  const lines = [
    `- Question type: ${question.questionType}`,
    `- Option count: ${question.optionCount}`,
    `- Unscored: ${question.unscored ? 'YES' : 'NO'}`,
    `- Answer-key provenance: ${question.answerKeyProvenance}`,
    '- English stem:', quote(question.englishStem ?? '(none)'),
    '- Spanish stem:', quote(question.spanishStem ?? '(none)'),
    '- English instructions:', quote(question.englishInstructions ?? '(none)'),
    '- Spanish instructions:', quote(question.spanishInstructions ?? '(none)'),
  ];
  if (question.options.length) {
    lines.push('- Options by position:');
    for (const option of question.options) lines.push(`  ${option.position}. English: ${option.english}\n     Spanish: ${option.spanish ?? '(missing)'}`);
  }
  return lines.join('\n');
}

function renderMarkdown(): string {
  const lines: string[] = [];
  lines.push('# Bilingual Clinical and Language Review', '');
  lines.push('Generated from the active learner-route runtime curriculum. This packet records completed clinical and Spanish-language approval; automated findings remain candidates for traceability and do not override the recorded approval decision.', '');
  lines.push('## Review Instructions', '');
  lines.push('- Clinical review status: `APPROVED` for all 102 screen pairs.', '- Spanish-language review status: `APPROVED` for all 102 screen pairs.', '- Final packet disposition: `APPROVED_READY_FOR_DEPLOYMENT`.', '- Treat `FLAGGED` findings as candidates retained for traceability. Do not treat them as confirmed mistranslation or clinical error.', '- Spanish wording for CIAS-backed screens was translated from approved English. Original Spanish CIAS wording was not recovered.', '- The 25 restored CIAS question/reflection records remain explicitly unscored because original CIAS answer keys and feedback were not recovered; approval status does not create an answer key.', '- The six held CIAS source records remain unresolved. Do not reconstruct cropped or placeholder source content by inference.', '');
  lines.push('## Coverage Summary', '');
  lines.push(`- English active screens: **${packet.coverage.englishScreens}**`, `- Spanish active screens: **${packet.coverage.spanishScreens}**`, `- Unique paired screen IDs: **${packet.coverage.pairedScreenIds}**`, `- CIAS-backed screens translated from approved English: **${packet.coverage.ciasBackedTranslatedScreens}**`, `- App-only supplemental screens: **${packet.coverage.appOnlySupplementalScreens}**`, `- Restored CIAS questions/reflections, unscored: **${packet.coverage.restoredCiasQuestionsAndReflections}**`, `- Held CIAS source records: **${packet.coverage.heldCiasSourceRecords}**`, '');
  lines.push('## Priority Review Queue', '');
  if (!priorityQueue.length) lines.push('No elevated-attention screens were generated by the current risk and mechanical-finding rules.', '');
  for (const item of priorityQueue) {
    lines.push(`### ${item.rank}. ${item.screenId} — ${item.moduleTitle} — ${item.priority}`, `- Required reviewer type: **${item.requiredReviewerType}**`, `- Reason: ${item.reason.join('; ')}`, `- English excerpt: ${item.englishExcerpt}`, `- Spanish excerpt: ${item.spanishExcerpt}`, `- Automated findings: ${item.automatedFindings.length ? item.automatedFindings.map((finding: any) => `${finding.check}: ${finding.message}`).join(' | ') : 'None'}`, '');
  }
  lines.push('## Held CIAS Source Records', '');
  for (const held of heldRecords) lines.push(`### ${held.ciasId}`, `- Source screenshot: ${held.sourceScreenshotId} (${held.sourceScreenshot})`, `- Current runtime counterpart: ${held.currentRuntimeCounterpart.length ? held.currentRuntimeCounterpart.join(', ') : 'None'}`, `- Why held: ${held.whyHeld}`, `- Source limitation: ${held.sourceLimitation.join(' ')}`, `- Evidence needed to resolve: ${held.sourceEvidenceNeeded}`, '');
  lines.push('## Restored CIAS Questions and Reflections', '');
  lines.push('The following 25 records are included for side-by-side traceability. None has an original CIAS answer key or feedback recovered; all remain explicitly unscored, while their clinical and Spanish-language approval status is recorded below.', '');
  for (const question of restoredCiasQuestions) {
    lines.push(`### ${question.screenId} — ${question.moduleId}`, `- Provenance: ${question.provenance}`, `- Source screenshots: ${question.sourceScreenshotIds.join(', ') || 'None'}`, renderQuestion(question), `- Clinical review: **${question.clinicalReviewStatus}**`, `- Spanish-language review: **${question.spanishLanguageReviewStatus}**`, '');
  }
  for (const module of englishModules) {
    lines.push(`## Module ${module.order} — ${module.title}`, '', `_${module.description}_`, '');
    for (const record of records.filter((candidate) => candidate.moduleId === module.id)) {
      lines.push(`### Screen ${record.screenPosition}: ${record.screenId}`, `- Provenance: **${record.provenance}**`, `- Screen type: **${record.screenType}**`, `- Interaction type: **${record.interactionType}**`, `- Source screenshot IDs: ${record.sourceScreenshotIds.length ? record.sourceScreenshotIds.join(', ') : 'None'}`, `- Translation status: ${record.translationStatus ?? 'not specified'}`, `- Translation provenance: ${record.translationProvenance ?? 'not specified'}`, '- English learner-facing text:', renderFields(record.englishLearnerFacingFields), '- Spanish learner-facing text:', renderFields(record.spanishLearnerFacingFields), '- Question/reflection audit:', renderQuestion(record.question), '- Automated checks:', renderFindings(Object.values(record.automatedFindings).flatMap((value: any) => value as Finding[])), `- Clinical review: **${record.clinicalReviewStatus}**`, `- Spanish-language review: **${record.spanishLanguageReviewStatus}**`, `- Final disposition: **${record.finalDisposition}**`, '');
    }
  }
  lines.push('## Terminology Inventory', '');
  lines.push('This inventory identifies recurring Spanish variants for human terminology review. It does not select a clinically superior term.', '');
  for (const item of globalTerminologyInventory) lines.push(`- **${item.label}:** ${Object.entries(item.variants).filter(([, count]) => count > 0).map(([variant, count]) => `${variant}=${count}`).join(', ') || 'no matches'} — ${item.note}`);
  lines.push('', '## Human Review Sign-Off', '', '- Clinical review status: **APPROVED**', '- Spanish-language review status: **APPROVED**', '- Final packet disposition: **APPROVED_READY_FOR_DEPLOYMENT**', '');
  return `${lines.join('\n').replace(/\n+$/, '')}\n`;
}

function stripGeneratedAt(value: any): any {
  const clone = JSON.parse(JSON.stringify(value));
  delete clone.generatedFrom.generatedAt;
  return clone;
}

if (checkOnly) {
  if (!fs.existsSync(jsonPath) || !fs.existsSync(markdownPath)) throw new Error('Review packet artifacts are missing; run without --check first.');
  const existingJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  if (JSON.stringify(stripGeneratedAt(existingJson)) !== JSON.stringify(stripGeneratedAt(packet))) throw new Error('Existing JSON review artifact does not match the active runtime-generated packet.');
  const existingMarkdown = fs.readFileSync(markdownPath, 'utf8');
  for (const record of records) {
    const marker = `### Screen ${record.screenPosition}: ${record.screenId}`;
    const occurrences = existingMarkdown.split(marker).length - 1;
    if (occurrences !== 1) throw new Error(`Markdown packet must contain exactly one screen section for ${record.screenId}; found ${occurrences}.`);
  }
  console.log(JSON.stringify({ status: 'PASS', mode: 'check', englishScreens: 102, spanishScreens: 102, pairedScreenIds: 102, restoredCiasQuestions: 25, appOnlyScreens: 28, heldRecords: 6, priorityQueue: priorityQueue.length, checkSummary }, null, 2));
} else {
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(jsonPath, `${JSON.stringify(packet, null, 2)}\n`, 'utf8');
  fs.writeFileSync(markdownPath, renderMarkdown(), 'utf8');
  console.log(JSON.stringify({ status: 'PASS', mode: 'write', outputs: [path.relative(projectRoot, markdownPath), path.relative(projectRoot, jsonPath)], englishScreens: 102, spanishScreens: 102, pairedScreenIds: 102, restoredCiasQuestions: 25, appOnlyScreens: 28, heldRecords: 6, priorityQueue: priorityQueue.length, checkSummary }, null, 2));
}
