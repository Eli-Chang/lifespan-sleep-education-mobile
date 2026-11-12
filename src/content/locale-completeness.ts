import type { EducationModule, LessonScreen } from '@/src/types/content';

/**
 * Structural and textual completeness of a translated locale against the source (English) curriculum.
 * Used at runtime to decide which locales a learner may select, and in tests to fail the build when a
 * translation is partial. It checks shape and obvious untranslated text; it cannot judge translation quality,
 * which needs a qualified human reviewer.
 */
export interface LocaleContentGap {
  moduleId: string;
  screenId?: string;
  problem: string;
}

/** Learner-visible text fields of a screen, keyed by a stable field path. */
export function learnerVisibleText(screen: LessonScreen): Record<string, string> {
  const out: Record<string, string> = {};
  const add = (path: string, value: unknown) => { if (typeof value === 'string' && value.trim()) out[path] = value; };
  const addList = (path: string, values: unknown) => { if (Array.isArray(values)) values.forEach((value, index) => add(`${path}[${index}]`, value)); };
  add('title', screen.title);
  add('narrationText', screen.narrationText);
  if (screen.type === 'content') {
    addList('paragraphs', screen.paragraphs); addList('orderedList', screen.orderedList); addList('keyPoints', screen.keyPoints);
    screen.presentation?.forEach((block, blockIndex) => {
      if (block.type === 'paragraph') add(`presentation[${blockIndex}]`, block.segments.map((segment) => segment.text).join(''));
      else block.items.forEach((item, itemIndex) => add(`presentation[${blockIndex}][${itemIndex}]`, item.map((segment) => segment.text).join('')));
    });
  }
  if (screen.type === 'summary') addList('keyPoints', screen.keyPoints);
  // Labels transcribed from a source image are rendered under the lesson, so they are learner-visible text.
  if (screen.type === 'content' || screen.type === 'summary') addList('sourceVisibleLabels', screen.sourceVisibleLabels);
  if (screen.type === 'reflection') { add('prompt', screen.prompt); add('instructions', screen.instructions); add('placeholder', screen.placeholder); addList('contextParagraphs', screen.contextParagraphs); }
  if (screen.type === 'scenario') {
    add('scenario', screen.scenario); add('prompt', screen.prompt); add('feedback', screen.feedback);
    screen.choices.forEach((choice, index) => add(`choices[${index}]`, choice.label));
    Object.entries(screen.outcomes ?? {}).forEach(([key, value]) => add(`outcomes.${key}`, value));
  }
  if (screen.type === 'singleChoice' || screen.type === 'multiSelect') {
    add('prompt', screen.prompt); add('instructions', screen.instructions); add('feedback', screen.feedback); addList('contextParagraphs', screen.contextParagraphs);
    screen.choices.forEach((choice, index) => add(`choices[${index}]`, choice.label));
    const feedback = screen.questionFeedback;
    if (feedback) {
      add('questionFeedback.correctSummary', feedback.correctSummary); add('questionFeedback.incorrectSummary', feedback.incorrectSummary);
      add('questionFeedback.generalExplanation', feedback.generalExplanation); add('questionFeedback.incorrectExplanation', feedback.incorrectExplanation);
      Object.entries(feedback.optionExplanations ?? {}).forEach(([key, value]) => add(`questionFeedback.optionExplanations.${key}`, value));
    }
  }
  return out;
}

const wordCount = (value: string) => (value.match(/\p{L}{3,}/gu) ?? []).length;

/** A text identical to the English text with three or more words is treated as untranslated. */
export const looksUntranslated = (source: string, target: string) => source === target && wordCount(target) >= 3;

const choiceShape = (screen: LessonScreen) => ('choices' in screen ? screen.choices.map((choice) => choice.id).join('|') : '');
const answerShape = (screen: LessonScreen) =>
  screen.type === 'singleChoice' ? String(screen.correctChoiceId ?? '') : screen.type === 'multiSelect' ? (screen.correctChoiceIds ?? []).join('|') : '';

export function localeContentGaps(source: EducationModule[], target: EducationModule[] | undefined): LocaleContentGap[] {
  const gaps: LocaleContentGap[] = [];
  if (!target) return [{ moduleId: '*', problem: 'No content bundled for this locale.' }];
  if (target.length !== source.length) gaps.push({ moduleId: '*', problem: `Expected ${source.length} modules; found ${target.length}.` });
  source.forEach((sourceModule, moduleIndex) => {
    const module = target[moduleIndex];
    if (!module || module.id !== sourceModule.id || module.order !== sourceModule.order) { gaps.push({ moduleId: sourceModule.id, problem: 'Module missing or out of order.' }); return; }
    if (!module.title.trim() || module.title === sourceModule.title) gaps.push({ moduleId: module.id, problem: 'Module title missing or untranslated.' });
    if (!module.description.trim() || looksUntranslated(sourceModule.description, module.description)) gaps.push({ moduleId: module.id, problem: 'Module description missing or untranslated.' });
    if (module.screens.length !== sourceModule.screens.length) gaps.push({ moduleId: module.id, problem: `Expected ${sourceModule.screens.length} screens; found ${module.screens.length}.` });
    sourceModule.screens.forEach((sourceScreen, screenIndex) => {
      const screen = module.screens[screenIndex];
      if (!screen || screen.id !== sourceScreen.id || screen.type !== sourceScreen.type) { gaps.push({ moduleId: module.id, screenId: sourceScreen.id, problem: 'Screen missing, out of order, or a different type.' }); return; }
      if (screen.translationStatus === 'temporary_english_fallback') gaps.push({ moduleId: module.id, screenId: screen.id, problem: 'Screen is marked as a temporary English fallback.' });
      if (choiceShape(screen) !== choiceShape(sourceScreen)) gaps.push({ moduleId: module.id, screenId: screen.id, problem: 'Choice IDs or order differ from the source.' });
      if (answerShape(screen) !== answerShape(sourceScreen)) gaps.push({ moduleId: module.id, screenId: screen.id, problem: 'Answer key differs from the source.' });
      const sourceText = learnerVisibleText(sourceScreen);
      const targetText = learnerVisibleText(screen);
      for (const [path, text] of Object.entries(sourceText)) {
        if (path === 'narrationText') continue;
        const translated = targetText[path];
        // A narration-only or presentation-only difference is not a learner-visible gap; required text is.
        if (translated === undefined && !path.startsWith('presentation')) gaps.push({ moduleId: module.id, screenId: screen.id, problem: `Missing translated text for ${path}.` });
        else if (translated !== undefined && looksUntranslated(text, translated)) gaps.push({ moduleId: module.id, screenId: screen.id, problem: `Text for ${path} is identical to the source (untranslated).` });
      }
    });
  });
  return gaps;
}
