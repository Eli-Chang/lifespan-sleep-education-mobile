export interface LocaleQuestionFeedback {
  /** Replaces the question stem; used where the original app showed only a label instead of the statement. */
  prompt?: string;
  /** Short summary kept for screen readers and older views; questions with per-choice notes do not show it. */
  generalExplanation?: string;
  /** One sentence per choice ID, shown inside that choice's card after submitting. */
  optionExplanations: Record<string, string>;
}
