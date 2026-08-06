import type { AiActivityKind, AiActivityLesson, Choice, ContentLesson, MultiSelectLesson, QuestionFeedback, SingleChoiceLesson, SummaryLesson } from '@/src/types/content';

export const sourceId = (timestamp: string) => `src-${timestamp}`;
export const source = (timestamp: string) => [sourceId(timestamp)];
const curriculumSource = ['curriculum-master-v3'];

export const choices = (...labels: string[]): Choice[] =>
  labels.map((label, index) => ({ id: `c${index + 1}`, label }));

export const content = (
  id: string,
  timestamp: string,
  title: string,
  paragraphs: string[],
  keyPoints?: string[],
  reviewReason?: string,
): ContentLesson => ({
  id,
  type: 'content',
  title,
  paragraphs,
  keyPoints,
  sourceScreenshotIds: source(timestamp),
  needsContentReview: Boolean(reviewReason),
  reviewReason,
});

export const single = (
  id: string,
  timestamp: string,
  title: string,
  prompt: string,
  labels: string[],
  correctChoiceId?: string,
  reviewReason?: string,
): SingleChoiceLesson => ({
  id,
  type: 'singleChoice',
  title,
  prompt,
  choices: choices(...labels),
  correctChoiceId,
  questionKind: correctChoiceId ? 'objective' : 'reflection',
  feedback: correctChoiceId
    ? 'Review the explanation in this lesson and continue when you are ready.'
    : 'Your response has been saved. This question is for learning.',
  questionFeedback: {
    correctSummary: 'Correct.',
    incorrectSummary: 'Not quite.',
    generalExplanation: correctChoiceId
      ? 'Review the approved lesson explanation above, then change your answer or continue when ready.'
      : undefined,
  },
  sourceScreenshotIds: source(timestamp),
  needsContentReview: Boolean(reviewReason),
  reviewReason,
});

export const multi = (
  id: string,
  timestamp: string,
  title: string,
  prompt: string,
  labels: string[],
  correctChoiceIds?: string[],
  reviewReason?: string,
): MultiSelectLesson => ({
  id,
  type: 'multiSelect',
  title,
  prompt,
  choices: choices(...labels),
  correctChoiceIds,
  questionKind: correctChoiceIds ? 'objective' : 'reflection',
  feedback: correctChoiceIds
    ? 'Review the teaching points above. Progress is based on participation, not correctness.'
    : 'Your selections have been saved. The source does not establish a reliable answer key.',
  questionFeedback: {
    correctSummary: 'Correct.',
    incorrectSummary: 'Not quite. One or more choices need another look.',
    generalExplanation: correctChoiceIds
      ? 'Review the approved teaching points above. You can change any selection and submit again.'
      : undefined,
  },
  sourceScreenshotIds: source(timestamp),
  needsContentReview: Boolean(reviewReason),
  reviewReason,
});

export const summary = (
  id: string,
  timestamp: string,
  title: string,
  keyPoints: string[],
  reviewReason?: string,
): SummaryLesson => ({
  id,
  type: 'summary',
  title,
  keyPoints,
  sourceScreenshotIds: source(timestamp),
  needsContentReview: Boolean(reviewReason),
  reviewReason,
});

export const curriculumContent = (
  id: string,
  title: string,
  paragraphs: string[],
  keyPoints?: string[],
  clinicalReviewStatus: 'not_reviewed' | 'needs_revision' = 'not_reviewed',
  orderedList?: string[],
): ContentLesson => ({
  id, type: 'content', title, paragraphs, keyPoints, orderedList,
  narrationText: [...paragraphs, ...(keyPoints ?? [])].join(' '),
  sourceScreenshotIds: [], sourceIds: curriculumSource, clinicalReviewStatus,
});

export const curriculumSingle = (
  id: string,
  title: string,
  prompt: string,
  labels: string[],
  correctChoiceId: string | undefined,
  questionFeedback: QuestionFeedback,
  reflection = false,
): SingleChoiceLesson => ({
  id, type: 'singleChoice', title, prompt, choices: choices(...labels), correctChoiceId,
  questionKind: reflection ? 'reflection' : 'objective', questionFeedback,
  feedback: reflection ? questionFeedback.generalExplanation : undefined,
  narrationText: [prompt, ...labels].join(' '), sourceScreenshotIds: [], sourceIds: curriculumSource,
  clinicalReviewStatus: 'not_reviewed',
});

export const curriculumMulti = (
  id: string,
  title: string,
  prompt: string,
  labels: string[],
  correctChoiceIds: string[] | undefined,
  questionFeedback: QuestionFeedback,
  reflection = false,
): MultiSelectLesson => ({
  id, type: 'multiSelect', title, prompt, choices: choices(...labels), correctChoiceIds,
  questionKind: reflection ? 'reflection' : 'objective', questionFeedback,
  feedback: reflection ? questionFeedback.generalExplanation : undefined,
  narrationText: [prompt, ...labels].join(' '), sourceScreenshotIds: [], sourceIds: curriculumSource,
  clinicalReviewStatus: 'not_reviewed',
});

export const curriculumSummary = (id: string, title: string, text: string): SummaryLesson => ({
  id, type: 'summary', title, keyPoints: [text], narrationText: text,
  sourceScreenshotIds: [], sourceIds: curriculumSource, clinicalReviewStatus: 'not_reviewed',
});

export const aiActivity = (
  id: string,
  title: string,
  activityKind: AiActivityKind,
  activityId: string,
  prompt: string,
  options: Pick<AiActivityLesson, 'placeholder' | 'optional' | 'sensitive'> = {},
): AiActivityLesson => ({
  id, type: 'aiActivity', title, activityKind, activityId, prompt, ...options,
  narrationText: prompt, sourceScreenshotIds: [], sourceIds: curriculumSource,
  clinicalReviewStatus: 'not_reviewed',
});
