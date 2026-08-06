export type SupportedLocale = 'en' | 'es';
export type LessonScreenType = 'content' | 'singleChoice' | 'multiSelect' | 'scenario' | 'summary' | 'aiActivity';

export interface Choice {
  id: string;
  label: string;
}

export interface QuestionFeedback {
  correctSummary?: string;
  incorrectSummary?: string;
  generalExplanation?: string;
  optionExplanations?: Record<string, string>;
}

export type QuestionKind = 'objective' | 'reflection';

export interface LessonBase {
  id: string;
  type: LessonScreenType;
  title: string;
  sourceScreenshotIds: string[];
  narrationText?: string;
  needsContentReview?: boolean;
  reviewReason?: string;
  clinicalReviewStatus?: 'not_reviewed' | 'needs_revision';
  translationStatus?: 'source' | 'machine_drafted';
  bilingualReviewStatus?: 'not_reviewed';
  sourceIds?: string[];
}

export interface ContentLesson extends LessonBase {
  type: 'content';
  paragraphs: string[];
  orderedList?: string[];
  keyPoints?: string[];
}

export interface SingleChoiceLesson extends LessonBase {
  type: 'singleChoice';
  prompt: string;
  choices: Choice[];
  correctChoiceId?: string;
  feedback?: string;
  questionKind?: QuestionKind;
  questionFeedback?: QuestionFeedback;
}

export interface MultiSelectLesson extends LessonBase {
  type: 'multiSelect';
  prompt: string;
  choices: Choice[];
  correctChoiceIds?: string[];
  feedback?: string;
  questionKind?: QuestionKind;
  questionFeedback?: QuestionFeedback;
}

export interface ScenarioLesson extends LessonBase {
  type: 'scenario';
  scenario: string;
  prompt: string;
  choices: Choice[];
  outcomes?: Record<string, string>;
  questionKind?: 'reflection';
  feedback?: string;
  questionFeedback?: QuestionFeedback;
}

export interface SummaryLesson extends LessonBase {
  type: 'summary';
  keyPoints: string[];
}

export type AiActivityKind =
  | 'teach-back'
  | 'reflection'
  | 'lesson-question'
  | 'pap-barrier'
  | 'action-plan'
  | 'question-organizer'
  | 'timeline';

export interface AiActivityLesson extends LessonBase {
  type: 'aiActivity';
  activityKind: AiActivityKind;
  activityId: string;
  prompt: string;
  placeholder?: string;
  optional?: boolean;
  sensitive?: boolean;
}

export type LessonScreen =
  | ContentLesson
  | SingleChoiceLesson
  | MultiSelectLesson
  | ScenarioLesson
  | SummaryLesson
  | AiActivityLesson;

export interface EducationModule {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  description: string;
  screens: LessonScreen[];
  sourceScreenshotIds: string[];
  curriculumVersion: 3;
  translationStatus?: 'source' | 'machine_drafted';
  bilingualReviewStatus?: 'not_reviewed';
  clinicalReviewStatus: 'not_reviewed' | 'needs_revision';
}

export interface SourceManifestEntry {
  id: string;
  filePath: string;
  assignedModuleId: string;
  relatedLessonScreenIds: string[];
  interactionGroupId?: string;
  auditStatus: 'assigned-to-module';
  reviewStatus: 'reviewed' | 'needs-review';
}
