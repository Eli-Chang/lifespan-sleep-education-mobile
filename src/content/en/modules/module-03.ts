import { curriculumContent as c, curriculumMulti as multi } from '@/src/content/helpers';
import { ciasScreensByModule } from '@/src/content/en/cias-source';
import type { EducationModule, LessonScreen } from '@/src/types/content';

const recovered = new Map(ciasScreensByModule.m3.map((screen) => [screen.id, screen]));
const requiredScreen = (id: string): LessonScreen => {
  const screen = recovered.get(id);
  if (!screen) throw new Error(`Missing recovered Module 3 screen: ${id}`);
  return screen;
};
const requiredSingle = (id: string): Extract<LessonScreen, { type: 'singleChoice' }> => {
  const screen = requiredScreen(id);
  if (screen.type !== 'singleChoice') throw new Error(`Expected a single-choice Module 3 screen: ${id}`);
  return screen;
};

const q1 = { ...requiredSingle('m3-q1'), correctChoiceId: 'c1', answerBehaviorProvenance: 'CURRENT_APP_EXISTING_BEHAVIOR' as const, questionFeedback: {
  correctSummary: 'Correct!', incorrectSummary: 'Well, not quite…',
  generalExplanation: 'Untreated OSA can coexist with conditions such as diabetes, high blood pressure, and obesity that are associated with an increased likelihood of cesarean birth. This does not predict an individual outcome.',
} };
const q3 = { ...requiredSingle('m3-q3'), correctChoiceId: 'c2', answerBehaviorProvenance: 'CURRENT_APP_EXISTING_BEHAVIOR' as const, questionFeedback: {
  correctSummary: 'Correct!', incorrectSummary: 'Well, not quite…',
  generalExplanation: 'Repeated airway obstruction can involve oxygen changes and physiologic stress associated with cardiovascular strain. This does not mean every person with OSA will develop a heart complication.',
  optionExplanations: {
    c1: 'Colds are caused by contagious viruses; untreated OSA is not known to meaningfully increase short-term infection risk.',
    c3: 'Food poisoning comes from contaminated food; untreated OSA is not known to meaningfully increase that risk.',
    c4: 'Nosebleeds are commonly related to dry air, irritation, or some medicines; untreated OSA is not known to meaningfully increase their likelihood.',
  },
} };
const q4 = { ...requiredSingle('m3-q4'), correctChoiceId: 'c3', answerBehaviorProvenance: 'CURRENT_APP_EXISTING_BEHAVIOR' as const, questionFeedback: {
  correctSummary: 'Correct!', incorrectSummary: 'Well, not quite…',
  incorrectExplanation: 'The observed relationship is about newborn growth, but it does not predict what will happen in an individual pregnancy. Review the choices and try again.',
  generalExplanation: 'Studies have observed an association between sleep-disordered breathing during pregnancy and lower newborn birth weight. This is a group-level association, not a prediction for an individual pregnancy.',
} };

const outcomesOverview = c('m3-05', 'Pregnancy Outcomes Associated With OSA', [
  'Research has found associations between OSA during pregnancy and conditions including gestational diabetes, high blood pressure, and preeclampsia.',
  'These outcomes occur more often in some groups with OSA, but OSA is not necessarily their only cause, and an association does not predict what will happen in an individual pregnancy.',
  'Your prenatal care team can explain screening and your personal risk.',
]);
const outcomesQuestion = multi('m3-q5', 'Pregnancy outcomes', 'Which conditions have been observed more often in some groups of pregnant people with OSA?', [
  'Preeclampsia', 'Food allergies', 'Lactose intolerance', 'High blood pressure', 'Gestational diabetes',
], ['c1', 'c4', 'c5'], {
  correctSummary: 'Correct!', incorrectSummary: 'Well, not quite…',
  incorrectExplanation: 'Some choices are not established pregnancy associations with OSA. Think about the blood-pressure and metabolic conditions discussed in the lesson, then try again.',
  generalExplanation: 'Research has found group-level associations with preeclampsia, high blood pressure, and elevated blood glucose or gestational diabetes. These associations do not predict an individual outcome.',
});
outcomesQuestion.instructions = 'Select all that apply.';

const unorderedScreens: LessonScreen[] = [
  { ...requiredScreen('m3-01'), type: 'content', paragraphs: [
    'In this module, you will learn about health outcomes that research has associated with untreated OSA during pregnancy and why treating OSA matters.',
    'Associations describe patterns across groups; they do not predict what will happen to you or your baby. Your care team can explain your personal risk.',
  ] },
  outcomesOverview, q1, q3, q4, outcomesQuestion,
  { ...requiredScreen('m3-recap'), title: 'Thanks for completing this module', type: 'summary', keyPoints: [
    'I hope you learned that untreated OSA during pregnancy has been associated with cesarean birth, cardiovascular strain, lower newborn birth weight, gestational diabetes, high blood pressure, and preeclampsia.',
    'PAP treats airway obstruction during sleep. Your prenatal and sleep-care teams can help you understand personal risk and treatment.',
  ] },
  { ...requiredScreen('m3-04'), type: 'content', paragraphs: [
    'A Positive Airway Pressure (PAP) machine delivers pressurized air that helps keep the airway open and reduce obstructive breathing events during sleep.',
    'Using PAP as prescribed treats OSA. Ask your sleep-care or prenatal team for help if discomfort or another barrier makes treatment difficult.',
  ] },
];
const screens = [...unorderedScreens.filter((screen) => screen.id !== 'm3-recap'), ...unorderedScreens.filter((screen) => screen.id === 'm3-recap')];

export const module03: EducationModule = { id: 'm3', order: 2, title: 'OSA Outcomes and Motivation', shortTitle: 'Outcomes & Motivation', description: 'Understand pregnancy-related OSA associations and build realistic next steps for PAP.', screens, sourceScreenshotIds: [], curriculumVersion: 10, translationStatus: 'source', clinicalReviewStatus: 'not_reviewed' };
