import type { AnswerBehaviorProvenance } from '@/src/types/content';

/**
 * Answer keys for every check-your-understanding question that shows per-choice explanations.
 *
 * `CIAS_SCREEN_RECORDING` keys come from the CIAS editor walkthrough recorded on 2026-11-21: each
 * question's "Correct!" branch slide names the right choices and its "Well, not quite..." slide names the
 * wrong ones (transcript: docs/curriculum/CIAS_FEEDBACK_TRANSCRIPT.md). The other keys were already set
 * before this change and are only listed here so their choices can carry explanations too.
 *
 * `drafted` lists choices whose explanation was written in the CIAS voice because no CIAS slide covered
 * that choice. Those sentences need the same clinical review as the rest.
 */
export interface QuestionKey {
  correct: string[];
  provenance: AnswerBehaviorProvenance;
  drafted: string[];
  /** Display order of the choices when the source order clustered the correct answers. Choice IDs do not change. */
  displayOrder?: string[];
}

export const QUESTION_KEYS: Record<string, QuestionKey> = {
  'm1-q1': { correct: ['c1'], provenance: 'PRODUCT_OWNER_ANSWER_KEY', drafted: ['c1', 'c2'] },
  'm1-q2': { correct: ['c2', 'c3', 'c5'], provenance: 'CURRENT_APP_EXISTING_BEHAVIOR', drafted: ['c1', 'c2', 'c3', 'c4', 'c5'] },
  'm3-q1': { correct: ['c1'], provenance: 'CIAS_SCREEN_RECORDING', drafted: ['c1', 'c2'] },
  // m3-q3 and m3-q5: wrong choices replaced on 2026-11-22 (Module 2 rework) with outcomes that PubMed searches did
  // not link to OSA in pregnancy; their explanations are drafted. The CIAS birth-weight question (m3-q4) was retired.
  'm3-q3': { correct: ['c2'], provenance: 'CIAS_SCREEN_RECORDING', drafted: ['c1', 'c3', 'c4'] },
  'm3-q5': { correct: ['c1', 'c4', 'c5'], provenance: 'CURRENT_APP_EXISTING_BEHAVIOR', drafted: ['c2', 'c3'] },
  'm3-q6': { correct: ['c3'], provenance: 'CLAUDE_DRAFTED_AT_OWNER_REQUEST', drafted: ['c1', 'c2', 'c3', 'c4'] },
  'm4-q1': { correct: ['c1', 'c4', 'c5'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm4-04': { correct: ['c2', 'c3', 'c4'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm4-q4': { correct: ['c2', 'c3', 'c5'], provenance: 'CIAS_SCREEN_RECORDING', drafted: ['c3'] },
  'm4-q6': { correct: ['c2', 'c4'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm4-q3': { correct: ['c1'], provenance: 'CURRENT_APP_EXISTING_BEHAVIOR', drafted: ['c1', 'c2', 'c3', 'c4'] },
  'm2-q2': { correct: ['c2', 'c4'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  // m2-q1: CIAS keyed False for its original wording ("satisfaction did not change for any of the couples").
  // That wording was replaced on 2026-11-16 to match the m2-05 lesson (some couples report higher
  // satisfaction), which makes the statement true, so the key is True.
  'm2-q1': { correct: ['c1'], provenance: 'CIAS_SCREEN_RECORDING', drafted: ['c1', 'c2'] },
  'm5-q5': { correct: ['c2', 'c5', 'c6'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm5-q6': { correct: ['c1', 'c5', 'c6'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm5-q7': { correct: ['c1', 'c4', 'c5'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm5-q1': { correct: ['c1', 'c2', 'c3'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [], displayOrder: ['c2', 'c5', 'c1', 'c6', 'c3', 'c4'] },
  'm5-q9': { correct: ['c2', 'c4', 'c5'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm5-q4': { correct: ['c1', 'c2', 'c6'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm5-q3': { correct: ['c1', 'c2', 'c6'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm5-q2': { correct: ['c2', 'c4', 'c5'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm5-q11': { correct: ['c1', 'c4', 'c5', 'c7', 'c8', 'c9'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm5-q8': { correct: ['c2', 'c5', 'c6'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm5-q10': { correct: ['c1', 'c4', 'c6'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  // Owner request 2026-11-22: the three correct answers were the first three options; shuffle the display order.
  'm6-q1': { correct: ['c1', 'c2', 'c3'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [], displayOrder: ['c2', 'c4', 'c5', 'c1', 'c6', 'c3'] },
  'm6-q2': { correct: ['c1', 'c2', 'c3', 'c4'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [], displayOrder: ['c1', 'c5', 'c2', 'c6', 'c3', 'c4'] },
  'm6-q3': { correct: ['c1', 'c2', 'c3'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [], displayOrder: ['c4', 'c1', 'c5', 'c2', 'c6', 'c3'] },
  'm7-04': { correct: ['c1', 'c3', 'c4'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm7-q2': { correct: ['c1', 'c2', 'c5'], provenance: 'CIAS_SCREEN_RECORDING', drafted: [] },
  'm8-q1': { correct: ['c2', 'c5'], provenance: 'CLAUDE_DRAFTED_AT_OWNER_REQUEST', drafted: ['c1', 'c2', 'c3', 'c4', 'c5'] },
  'm8-q2': { correct: ['c2', 'c4'], provenance: 'CLAUDE_DRAFTED_AT_OWNER_REQUEST', drafted: ['c1', 'c2', 'c3', 'c4', 'c5'] },
  'm8-q3': { correct: ['c3', 'c5'], provenance: 'CLAUDE_DRAFTED_AT_OWNER_REQUEST', drafted: ['c1', 'c2', 'c3', 'c4', 'c5'] },
  'm9-q1': { correct: ['c2', 'c4'], provenance: 'CLAUDE_DRAFTED_AT_OWNER_REQUEST', drafted: ['c1', 'c2', 'c3', 'c4', 'c5'] },
  'm9-q2': { correct: ['c1', 'c5'], provenance: 'CLAUDE_DRAFTED_AT_OWNER_REQUEST', drafted: ['c1', 'c2', 'c3', 'c4', 'c5'] },
  'm9-q3': { correct: ['c1', 'c4'], provenance: 'CLAUDE_DRAFTED_AT_OWNER_REQUEST', drafted: ['c1', 'c2', 'c3', 'c4', 'c5'] },
};
