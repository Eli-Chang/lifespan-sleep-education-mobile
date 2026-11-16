import { learnerVisibleText } from '@/src/content/locale-completeness';
import type { EducationModule, LessonScreen } from '@/src/types/content';

/**
 * Data for the development-only "English Curriculum Review - Internal Draft" screen. It lists six items that a
 * translation QA pass reported but deliberately did not fix. Nothing here changes curriculum content: the screen
 * text is read from the English modules at runtime, and the notes below are reviewer annotations, not curriculum.
 * Keep this file free of React and Expo imports so Node tests can load it.
 */
export interface ReviewScreenRef {
  screenId: string;
  role: 'affected' | 'comparison' | 'context';
  /** Short label explaining why this screen is shown. */
  why: string;
}

export interface ReviewHighlight { screenId: string; phrase: string }

export interface ReviewItem {
  number: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  /** Screens whose key metadata (answer key, question behaviour) is shown for this item. */
  keyScreens?: string[];
  affected: string;
  /** What the previous reviewer reported, quoted as a report, not as curriculum. */
  reported: string;
  /** What the actual source shows when it was inspected on 2026-11-16. */
  finding: string;
  /** Neutral readings of the passage. These are not decisions and not proposed corrections. */
  readings?: string[];
  screens: ReviewScreenRef[];
  highlights: ReviewHighlight[];
}

export const REVIEW_ITEMS: ReviewItem[] = [
  {
    number: 1,
    title: 'OSA wording in the snoring question',
    affected: 'm1-q1 (Module 1, "Sleep Apnea")',
    reported: 'The prompt says "You have OSA" while the answer choices imply "you can have it".',
    finding: 'Reproduced as a wording mismatch, not as a flat contradiction. The prompt states "You have obstructive sleep apnea even if you don’t snore" as a statement about the reader, while the first choice says "you can totally have sleep apnea without snoring". The statement reads as "have", the choice as "can have". No correct answer is stored for this question (see item 3 for how the app treats that).',
    keyScreens: ['m1-q1'],
    screens: [
      { screenId: 'm1-03', role: 'context', why: 'Lesson screen immediately before the question' },
      { screenId: 'm1-q1', role: 'affected', why: 'The question with its answer choices' },
      { screenId: 'm1-04', role: 'context', why: 'Lesson screen immediately after the question' },
    ],
    highlights: [{ screenId: 'm1-q1', phrase: 'You have obstructive sleep apnea even if you don’t snore' }],
  },
  {
    number: 2,
    title: 'Relationship satisfaction: question versus lesson',
    affected: 'm2-q1 and m2-05 (Module 2)',
    reported: 'm2-q1 says satisfaction "did not change for any couples", but m2-05 reports that 41% experienced an increase.',
    finding: 'Reproduced. The m2-q1 statement says relationship satisfaction "did not change for any of the couples". m2-05 says 41% of bed partners reported increased relationship satisfaction and 47% said no change. The two screens cannot both be read as true of the same study. m2-q1 stores no answer key.',
    keyScreens: ['m2-q1'],
    screens: [
      { screenId: 'm2-05', role: 'comparison', why: 'Lesson that reports the 41% and 47% figures' },
      { screenId: 'm2-q1', role: 'affected', why: 'The true/false question that says satisfaction did not change' },
    ],
    highlights: [
      { screenId: 'm2-05', phrase: '41% of bed partners reported increased relationship satisfaction (47% said no change)' },
      { screenId: 'm2-q1', phrase: 'relationship satisfaction did not change for any of the couples' },
    ],
  },
  {
    number: 3,
    title: 'Answer keys for m2-q1 and m2-q2',
    affected: 'm2-q1 and m2-q2 (Module 2)',
    reported: 'm2-q1 and m2-q2 have no answer key.',
    finding: 'Reproduced, with a precise reading of what it means. Neither question stores a correct answer (no correctChoiceId or correctChoiceIds). Both carry answerBehaviorProvenance "CIAS_ANSWER_KEY_NOT_RECOVERED": the original CIAS answer key was not recovered. The app has a supported behaviour for exactly this case: such questions are shown as saved-response questions with no right or wrong feedback and never block Next. In the running app they appear under a "Personal reflection" label with the text "Select one response. This response is never graded." and a Save response button, even though their questionKind is "objective" (they are not declared as reflections). The same applies to m1-q1, which the earlier report did not list, and to other questions listed at the bottom of this item.',
    keyScreens: ['m2-q1', 'm2-q2'],
    screens: [
      { screenId: 'm2-q2', role: 'affected', why: 'Multi-select question (select all that apply)' },
      { screenId: 'm2-q1', role: 'affected', why: 'True/false question' },
    ],
    highlights: [],
  },
  {
    number: 4,
    title: 'Broken sentence in the bedtime routine lesson',
    affected: 'm5-04 (Module 5, "Sleep Hygiene")',
    reported: 'A sentence in m5-04 is broken.',
    finding: 'Reproduced. The last sentence of the third paragraph reads "…leading to reduced stress and anxiety, and improve sleep quality, and even cognitive function." The list that follows "leading to" changes from "reduced stress and anxiety" to the verb phrase "improve sleep quality", so the sentence is not parallel. On screen the app shows the bedtime activities as a bulleted list and the final sentence below it.',
    screens: [
      { screenId: 'm5-q6', role: 'context', why: 'Screen immediately before' },
      { screenId: 'm5-04', role: 'affected', why: 'The lesson with the sentence' },
      { screenId: 'm5-13', role: 'context', why: 'Screen immediately after' },
    ],
    highlights: [{ screenId: 'm5-04', phrase: 'leading to reduced stress and anxiety, and improve sleep quality, and even cognitive function' }],
  },
  {
    number: 5,
    title: 'Six-hour nap rule',
    affected: 'm5-10 (Module 5 Part 2, "Addressing Naps")',
    reported: 'The "avoid any naps at least 6 hours before bedtime" rule is ambiguous.',
    finding: 'Reproduced as a wording ambiguity. The exact sentence is "If you are having difficulty falling asleep at night, avoid any naps at least 6 hours before bedtime." The second paragraph then says to limit a nap to "a quick 20-minute nap before the afternoon". The readings below are neutral: this review does not choose between them, and none of them is approved.',
    readings: [
      'Cutoff reading: do not nap during the 6 hours before bedtime (a nap should end at least 6 hours before bed).',
      'Literal reading: "avoid naps at least 6 hours before bedtime" could be read as avoiding naps that happen 6 or more hours before bed, which is the opposite of the cutoff reading.',
      'Scope: the sentence begins "If you are having difficulty falling asleep at night", so it may apply only to people with that difficulty, while the next paragraph speaks to pregnancy in general.',
      'Interaction: the second paragraph limits a nap to "before the afternoon", which is stricter than a 6-hour cutoff for most bedtimes, and the first paragraph calls afternoon/evening naps a problem.',
    ],
    screens: [
      { screenId: 'm5-21', role: 'context', why: 'Screen immediately before' },
      { screenId: 'm5-10', role: 'affected', why: 'The passage' },
      { screenId: 'm5-19', role: 'context', why: 'Screen immediately after' },
    ],
    highlights: [
      { screenId: 'm5-10', phrase: 'avoid any naps at least 6 hours before bedtime' },
      { screenId: 'm5-10', phrase: 'a quick 20-minute nap before the afternoon' },
    ],
  },
  {
    number: 6,
    title: '"simply saline spray" wording',
    affected: 'm6-03 (Module 6, "Nasal Congestion Treatment")',
    reported: 'm6-03 says "simply saline spray"; the previous reviewer suggested "simple". That correction has not been approved.',
    finding: 'Reproduced. The exact text is "Consider starting with a simply saline spray before bed." The next sentence uses "Saline spray or foams". The suggested replacement "simple" is a reviewer suggestion only and is not applied anywhere. Not part of this item, but visible in the same paragraph group: the last paragraph reads "a topical decongestant sprays".',
    screens: [
      { screenId: 'm6-02', role: 'context', why: 'Screen immediately before' },
      { screenId: 'm6-03', role: 'affected', why: 'The passage' },
      { screenId: 'm6-04', role: 'context', why: 'Screen immediately after' },
    ],
    highlights: [{ screenId: 'm6-03', phrase: 'simply saline spray' }],
  },
];

export interface FoundScreen { module: EducationModule; screen: LessonScreen; index: number }

export function findScreen(modules: EducationModule[], screenId: string): FoundScreen | undefined {
  for (const module of modules) {
    const index = module.screens.findIndex((screen) => screen.id === screenId);
    if (index >= 0) return { module, screen: module.screens[index], index };
  }
  return undefined;
}

/** Learner-visible fields exactly as stored, in a stable order, without narration or presentation duplicates. */
export function exactScreenText(screen: LessonScreen): [string, string][] {
  return Object.entries(learnerVisibleText(screen)).filter(([field]) => field !== 'narrationText' && !field.startsWith('presentation'));
}

export interface AnswerKeyInfo {
  screenId: string;
  type: string;
  questionKind: string | undefined;
  provenance: string | undefined;
  correctChoiceId: string | null;
  correctChoiceIds: string[] | null;
  hasKey: boolean;
  /** How the app treats the question, derived from the same fields the lesson screen reads. */
  behaviour: 'graded' | 'saved response, not graded (source answer key not recovered)' | 'reflection, never graded' | 'not a question';
}

export function answerKeyInfo(screen: LessonScreen): AnswerKeyInfo {
  const choiceType = screen.type === 'singleChoice' || screen.type === 'multiSelect' || screen.type === 'scenario';
  const correctChoiceId = screen.type === 'singleChoice' ? screen.correctChoiceId ?? null : null;
  const correctChoiceIds = screen.type === 'multiSelect' ? screen.correctChoiceIds ?? null : null;
  const hasKey = Boolean(correctChoiceId) || Boolean(correctChoiceIds?.length);
  const questionKind = 'questionKind' in screen ? screen.questionKind : undefined;
  const provenance = screen.answerBehaviorProvenance;
  const behaviour: AnswerKeyInfo['behaviour'] = !choiceType ? 'not a question'
    : questionKind === 'reflection' || screen.type === 'scenario' ? 'reflection, never graded'
      : provenance === 'CIAS_ANSWER_KEY_NOT_RECOVERED' ? 'saved response, not graded (source answer key not recovered)'
        : hasKey ? 'graded' : 'saved response, not graded (source answer key not recovered)';
  return { screenId: screen.id, type: screen.type, questionKind, provenance, correctChoiceId, correctChoiceIds, hasKey, behaviour };
}

/** Every objective question in the curriculum that has no stored answer key, for context on item 3. */
export function keylessObjectiveQuestions(modules: EducationModule[]): AnswerKeyInfo[] {
  return modules.flatMap((module) => module.screens)
    .filter((screen) => (screen.type === 'singleChoice' || screen.type === 'multiSelect') && screen.questionKind === 'objective')
    .map(answerKeyInfo).filter((info) => !info.hasKey);
}

/** Splits text around exact occurrences of the highlight phrases. The text itself is never altered. */
export function splitHighlights(text: string, phrases: string[]): { text: string; mark: boolean }[] {
  const matches = phrases.flatMap((phrase) => { const index = text.indexOf(phrase); return index >= 0 ? [{ index, phrase }] : []; })
    .sort((a, b) => a.index - b.index);
  const out: { text: string; mark: boolean }[] = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.index < cursor) continue;
    if (match.index > cursor) out.push({ text: text.slice(cursor, match.index), mark: false });
    out.push({ text: match.phrase, mark: true });
    cursor = match.index + match.phrase.length;
  }
  if (cursor < text.length) out.push({ text: text.slice(cursor), mark: false });
  return out.length ? out : [{ text, mark: false }];
}
