import { module01 } from './modules/module-01';
import { module02 } from './modules/module-02';
import { module03 } from './modules/module-03';
import { module04 } from './modules/module-04';
import { module05, module05b } from './modules/module-05';
import { module06 } from './modules/module-06';
import { module07 } from './modules/module-07';
import { module08 } from './modules/module-08';
import { module09 } from './modules/module-09';

import { withQuestionFeedback } from '@/src/content/question-feedback';

// Learner order: OSA outcomes (m3) and pregnancy outcomes (m4) come before the partner module (m2), which refers back to them.
// Answer keys and per-choice explanations for check-your-understanding questions come from src/content/question-feedback.
// The overlay locales (pt-BR, ht) translate the base curriculum and then get the same layer in their own language.
export const englishBaseModules = [module01, module03, module04, module02, module05, module05b, module06, module07, module08, module09];
export const englishModules = withQuestionFeedback(englishBaseModules, 'en');
