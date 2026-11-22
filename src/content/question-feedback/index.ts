import type { SupportedLocale } from '@/src/i18n/locales';
import type { EducationModule, LessonScreen } from '@/src/types/content';
import { enQuestionFeedback } from './en';
import { esQuestionFeedback } from './es';
import { htQuestionFeedback } from './ht';
import { QUESTION_KEYS } from './keys';
import { ptBRQuestionFeedback } from './pt-BR';
import type { LocaleQuestionFeedback } from './types';

export { QUESTION_KEYS } from './keys';
export type { LocaleQuestionFeedback } from './types';

export const QUESTION_FEEDBACK: Record<SupportedLocale, Record<string, LocaleQuestionFeedback>> = {
  en: enQuestionFeedback,
  es: esQuestionFeedback,
  'pt-BR': ptBRQuestionFeedback,
  ht: htQuestionFeedback,
};

// The same short result lines the CIAS slides used ("Correct!", "Well, not quite...").
export const RESULT_SUMMARIES: Record<SupportedLocale, { correct: string; incorrect: string }> = {
  en: { correct: 'Correct!', incorrect: 'Well, not quite…' },
  es: { correct: '¡Correcto!', incorrect: 'Bueno, no del todo…' },
  'pt-BR': { correct: 'Correto!', incorrect: 'Bem, não exatamente…' },
  ht: { correct: 'Kòrèk!', incorrect: 'Enben, pa tout afè…' },
};

function withFeedback(screen: LessonScreen, locale: SupportedLocale): LessonScreen {
  const key = QUESTION_KEYS[screen.id];
  if (!key || (screen.type !== 'singleChoice' && screen.type !== 'multiSelect')) return screen;
  const entry = QUESTION_FEEDBACK[locale][screen.id];
  if (!entry) throw new Error(`Missing ${locale} per-choice feedback for ${screen.id}`);
  const choiceIds = screen.choices.map((choice) => choice.id);
  const missing = choiceIds.filter((id) => !entry.optionExplanations[id]?.trim());
  const unknown = Object.keys(entry.optionExplanations).filter((id) => !choiceIds.includes(id));
  if (missing.length || unknown.length) throw new Error(`${locale} feedback for ${screen.id} does not match its choices (missing ${missing.join(',') || 'none'}; unknown ${unknown.join(',') || 'none'})`);
  if (key.correct.some((id) => !choiceIds.includes(id))) throw new Error(`Answer key for ${screen.id} names a choice that does not exist`);
  const prompt = entry.prompt ?? screen.prompt;
  // When the statement moves into the prompt, the stand-in context line that used to carry it is dropped
  // (for m2-q1 that line had been reworded into the true version, which gave the answer away).
  const contextParagraphs = entry.prompt ? [] : screen.contextParagraphs;
  const narrationText = entry.prompt
    ? [screen.title !== prompt ? screen.title : undefined, screen.instructions, prompt, ...screen.choices.map((choice) => choice.label)].filter(Boolean).join(' ')
    : screen.narrationText;
  const questionFeedback = {
    ...screen.questionFeedback,
    correctSummary: RESULT_SUMMARIES[locale].correct,
    incorrectSummary: RESULT_SUMMARIES[locale].incorrect,
    generalExplanation: entry.generalExplanation ?? screen.questionFeedback?.generalExplanation,
    optionExplanations: entry.optionExplanations,
  };
  const common = { prompt, contextParagraphs, narrationText, questionKind: 'objective' as const, answerBehaviorProvenance: key.provenance, questionFeedback };
  return screen.type === 'singleChoice'
    ? { ...screen, ...common, correctChoiceId: key.correct[0] }
    : { ...screen, ...common, correctChoiceIds: [...key.correct] };
}

/** Applies answer keys and per-choice explanations to a locale's modules. */
export function withQuestionFeedback(modules: EducationModule[], locale: SupportedLocale): EducationModule[] {
  return modules.map((module) => ({ ...module, screens: module.screens.map((screen) => withFeedback(screen, locale)) }));
}
