import type { EducationModule, LessonScreen, QuestionFeedback } from '@/src/types/content';

/**
 * Builds a translated curriculum from the English modules plus a translation catalog keyed by the unit IDs
 * produced by scripts/export-translation-source.ts (`<screenId>::<field>` and `<moduleId>::module.<field>`).
 *
 * Only learner-visible text is replaced. IDs, order, screen types, choice IDs, answer keys, source IDs,
 * media, and review flags are copied from English unchanged, so a translation cannot alter grading or
 * progress identifiers. A missing catalog entry throws: there is no fallback to English.
 */
export type TranslationCatalog = Readonly<Record<string, string>>;

export interface OverlayOptions {
  /** Locale label used in error messages, for example 'pt-BR'. */
  locale: string;
  catalog: TranslationCatalog;
}

export function overlayModules(source: EducationModule[], { locale, catalog }: OverlayOptions): EducationModule[] {
  const used = new Set<string>();
  const get = (key: string): string => {
    const value = catalog[key];
    if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing ${locale} translation for ${key}`);
    used.add(key);
    return value;
  };
  const opt = (key: string, english: string | undefined) => (english && english.trim() ? get(key) : english);
  const list = (prefix: string, english: string[] | undefined) => english?.map((_, index) => get(`${prefix}[${index}]`));

  const modules = source.map((module): EducationModule => ({
    ...module,
    title: get(`${module.id}::module.title`),
    shortTitle: get(`${module.id}::module.shortTitle`),
    description: get(`${module.id}::module.description`),
    translationStatus: 'machine_drafted',
    bilingualReviewStatus: 'not_reviewed',
    screens: module.screens.map((screen) => overlayScreen(screen, (field) => `${screen.id}::${field}`, get, opt, list)),
  }));

  const unused = Object.keys(catalog).filter((key) => !used.has(key));
  if (unused.length) throw new Error(`${locale} catalog has ${unused.length} entries with no English source, for example ${unused[0]}`);
  return modules;
}

type Get = (key: string) => string;
type Opt = (key: string, english: string | undefined) => string | undefined;
type List = (prefix: string, english: string[] | undefined) => string[] | undefined;

function overlayFeedback(feedback: QuestionFeedback | undefined, key: (field: string) => string, opt: Opt): QuestionFeedback | undefined {
  if (!feedback) return feedback;
  return {
    correctSummary: opt(key('questionFeedback.correctSummary'), feedback.correctSummary),
    incorrectSummary: opt(key('questionFeedback.incorrectSummary'), feedback.incorrectSummary),
    generalExplanation: opt(key('questionFeedback.generalExplanation'), feedback.generalExplanation),
    incorrectExplanation: opt(key('questionFeedback.incorrectExplanation'), feedback.incorrectExplanation),
    optionExplanations: feedback.optionExplanations
      ? Object.fromEntries(Object.entries(feedback.optionExplanations).map(([id, text]) => [id, opt(key(`questionFeedback.optionExplanations.${id}`), text) ?? text]))
      : undefined,
  };
}

const joinNarration = (parts: (string | undefined)[]) => parts.filter((part): part is string => Boolean(part && part.trim())).join(' ');

function overlayScreen(screen: LessonScreen, key: (field: string) => string, get: Get, opt: Opt, list: List): LessonScreen {
  const common = { title: get(key('title')), translationStatus: 'machine_drafted' as const, bilingualReviewStatus: 'not_reviewed' as const };
  switch (screen.type) {
    case 'content': {
      const paragraphs = list(key('paragraphs'), screen.paragraphs) ?? [];
      const orderedList = list(key('orderedList'), screen.orderedList);
      const keyPoints = list(key('keyPoints'), screen.keyPoints);
      const sourceVisibleLabels = list(key('sourceVisibleLabels'), screen.sourceVisibleLabels);
      return {
        ...screen, ...common, paragraphs, orderedList, keyPoints, sourceVisibleLabels,
        // Bold emphasis is rebuilt per locale by rich-presentation.ts; an English presentation must not leak.
        presentation: undefined,
        narrationText: joinNarration([...paragraphs, ...(orderedList ?? []), ...(keyPoints ?? []), ...(sourceVisibleLabels ?? [])]),
      };
    }
    case 'summary': {
      const keyPoints = list(key('keyPoints'), screen.keyPoints) ?? [];
      const sourceVisibleLabels = list(key('sourceVisibleLabels'), screen.sourceVisibleLabels);
      return { ...screen, ...common, keyPoints, sourceVisibleLabels, narrationText: joinNarration([...keyPoints, ...(sourceVisibleLabels ?? [])]) };
    }
    case 'reflection': {
      const prompt = get(key('prompt'));
      const instructions = opt(key('instructions'), screen.instructions);
      const contextParagraphs = list(key('contextParagraphs'), screen.contextParagraphs);
      return {
        ...screen, ...common, prompt, instructions, contextParagraphs,
        placeholder: opt(key('placeholder'), screen.placeholder),
        narrationText: joinNarration([...(contextParagraphs ?? []), prompt, instructions]),
      };
    }
    case 'scenario': {
      const scenario = get(key('scenario'));
      const prompt = get(key('prompt'));
      const choices = screen.choices.map((choice, index) => ({ ...choice, label: get(key(`choices[${index}]`)) }));
      return {
        ...screen, ...common, scenario, prompt, choices,
        feedback: opt(key('feedback'), screen.feedback),
        outcomes: screen.outcomes ? Object.fromEntries(Object.entries(screen.outcomes).map(([id, text]) => [id, opt(key(`outcomes.${id}`), text) ?? text])) : undefined,
        questionFeedback: overlayFeedback(screen.questionFeedback, key, opt),
        narrationText: joinNarration([scenario, prompt, ...choices.map((choice) => choice.label)]),
      };
    }
    case 'singleChoice':
    case 'multiSelect': {
      const prompt = get(key('prompt'));
      const instructions = opt(key('instructions'), screen.instructions);
      const contextParagraphs = list(key('contextParagraphs'), screen.contextParagraphs);
      const choices = screen.choices.map((choice, index) => ({ ...choice, label: get(key(`choices[${index}]`)) }));
      return {
        ...screen, ...common, prompt, instructions, contextParagraphs, choices,
        feedback: opt(key('feedback'), screen.feedback),
        questionFeedback: overlayFeedback(screen.questionFeedback, key, opt),
        narrationText: joinNarration([common.title, instructions, ...(contextParagraphs ?? []), prompt, ...choices.map((choice) => choice.label)]),
      } as LessonScreen;
    }
  }
}
