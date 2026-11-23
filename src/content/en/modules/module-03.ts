import { curriculumContent as c, curriculumMulti as multi, curriculumSingle as single } from '@/src/content/helpers';
import { ciasScreensByModule } from '@/src/content/en/cias-source';
import type { EducationModule, LessonScreen } from '@/src/types/content';

/*
 * Display Module 2, reworked on 2026-11-22 at the content owner's request: ten steps, four Check Your
 * Understanding questions, and one teaching step right before each question.
 *   1 intro  2 teach  3 check  4 teach  5 check  6 teach  7 check  8 teach  9 check  10 thanks
 * The CIAS birth-weight question (m3-q4) was retired: the papers checked did not support one keyed answer.
 * Content steps are kept near the app-wide average of about 100 words per content screen.
 */
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
const narrate = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(' ');
const CHECK = 'Check Your Understanding';

// Step 1
const intro: LessonScreen = (() => {
  const paragraphs = [
    'In this module, you will learn about health outcomes that research has linked to untreated obstructive sleep apnea (OSA) during pregnancy, and why treating OSA matters for you and your baby.',
    'You will learn about:',
    '• Pregnancy conditions linked to OSA\n• How OSA relates to cesarean birth\n• What untreated OSA can do to your heart\n• How a PAP machine helps',
    'These links describe patterns across large groups of people. They do not predict what will happen to you or your baby. Your care team can explain your personal risk.',
  ];
  return { ...requiredScreen('m3-01'), type: 'content', paragraphs, narrationText: narrate(...paragraphs.map((p) => p.replace(/•\s*/g, ''))) } as LessonScreen;
})();

// Step 2 teaches Step 3
const outcomesOverview = c('m3-05', 'Pregnancy Outcomes Associated With OSA', [
  'Research has found associations between OSA during pregnancy and conditions including gestational diabetes, high blood pressure, and preeclampsia.',
  '• Gestational diabetes is high blood sugar that starts during pregnancy.\n• High blood pressure during pregnancy puts extra strain on your heart and blood vessels.\n• Preeclampsia is high blood pressure during pregnancy along with signs that organs, such as the kidneys or liver, are affected.',
  'These outcomes occur more often in some groups with OSA, but OSA is not necessarily their only cause, and an association does not predict what will happen in an individual pregnancy.',
  'Your prenatal care team can explain screening and your personal risk.',
]);

// Step 3
const outcomesQuestion = multi('m3-q5', CHECK, 'Which conditions have been observed more often in some groups of pregnant people with OSA?', [
  'Preeclampsia', 'Urinary tract infection', 'Hemorrhoids', 'High blood pressure', 'Gestational diabetes',
], ['c1', 'c4', 'c5'], {
  correctSummary: 'Correct!', incorrectSummary: 'Well, not quite…',
  incorrectExplanation: 'Some choices are common in pregnancy but have not been linked to OSA. Think about the blood pressure and blood sugar conditions in the lesson, then try again.',
  generalExplanation: 'Research has found group-level associations with preeclampsia, high blood pressure, and gestational diabetes. These associations do not predict an individual outcome.',
});
outcomesQuestion.instructions = 'Select all that apply.';
outcomesQuestion.narrationText = narrate(outcomesQuestion.prompt, outcomesQuestion.instructions, ...outcomesQuestion.choices.map((choice) => choice.label));

// Step 4 teaches Step 5
const cesareanLesson = c('m3-06', 'Other Health Conditions and Cesarean Birth', [
  'A cesarean birth (also called a C-section) is when your baby is delivered through a surgical cut in your belly and uterus instead of through the vagina.',
  'Pregnant people with OSA often have other health conditions at the same time. Doctors call these co-morbid conditions. In a large U.S. study of more than 18 million hospital deliveries, people with OSA were more likely to also have:',
  '• Obesity\n• Asthma\n• High blood pressure that started before pregnancy',
  'Health conditions like these can raise the chance of a cesarean birth. In the same study, cesarean births were more common in people with OSA. This is a pattern across groups. It does not mean you will need a cesarean birth.',
]);

// Step 5
const cesareanStatement = 'Pregnant women with untreated OSA are more likely to have co-morbid illnesses, such as obesity or high blood pressure, that increase their risk for cesarean births.';
const q1 = { ...requiredSingle('m3-q1'), title: CHECK, prompt: 'True or false?', contextParagraphs: [cesareanStatement], instructions: undefined,
  narrationText: narrate('True or false?', cesareanStatement, 'True', 'False'),
  correctChoiceId: 'c1', answerBehaviorProvenance: 'CURRENT_APP_EXISTING_BEHAVIOR' as const, questionFeedback: {
    correctSummary: 'Correct!', incorrectSummary: 'Well, not quite…',
    generalExplanation: 'Untreated OSA often comes with conditions such as obesity and high blood pressure, and those conditions are linked with a higher chance of cesarean birth. This does not predict an individual outcome.',
  } };

// Step 6 teaches Step 7
const heartLesson = c('m3-07', 'What Untreated OSA Can Do to Your Heart', [
  'When your airway closes during sleep, your oxygen level drops and your body releases stress hormones that raise your heart rate and blood pressure. With untreated OSA, this can happen many times a night, which puts extra strain on your heart and blood vessels.',
  'A national study of more than 1.5 million deliveries found that people with OSA had a higher risk of rare but serious heart problems, such as cardiomyopathy and heart failure.',
  '• Cardiomyopathy is a weakening of the heart muscle.\n• Heart failure means the heart cannot pump blood as well as your body needs.',
  'These problems are rare, and most people with OSA do not develop them.',
]);

// Step 7
const q3Prompt = 'Pregnant women with untreated OSA during their hospital admission at delivery are at significantly higher risk of:';
const q3Choices = ['getting appendicitis', 'having heart problems', 'getting a urinary tract infection', 'having hemorrhoids'];
const q3 = { ...requiredSingle('m3-q3'), title: CHECK, prompt: q3Prompt, instructions: 'Select the right answer.',
  choices: q3Choices.map((label, index) => ({ id: `c${index + 1}`, label })),
  narrationText: narrate(q3Prompt, 'Select the right answer.', ...q3Choices),
  correctChoiceId: 'c2', answerBehaviorProvenance: 'CURRENT_APP_EXISTING_BEHAVIOR' as const, questionFeedback: {
    correctSummary: 'Correct!', incorrectSummary: 'Well, not quite…',
    generalExplanation: 'Large studies of hospital deliveries found that people with OSA had a higher risk of heart problems such as cardiomyopathy and heart failure. These problems are rare, and this does not mean every person with OSA will have one.',
  } };

// Step 8 teaches Step 9
const papLesson: LessonScreen = (() => {
  const paragraphs = [
    'A Positive Airway Pressure (PAP) machine delivers pressurized air that helps keep the airway open and reduce obstructive breathing events during sleep.',
    'PAP does not give you extra oxygen or medicine. It takes in air from your room and gently pushes it through a mask. The air pressure holds your airway open, a bit like a splint made of air.',
    'When your airway stays open, your oxygen level stays steadier through the night, and your body has fewer stress responses during sleep.',
    'Using PAP as prescribed treats OSA. Ask your sleep-care or prenatal team for help if discomfort or another barrier makes treatment difficult.',
  ];
  return { ...requiredScreen('m3-04'), type: 'content', paragraphs, narrationText: narrate(...paragraphs) } as LessonScreen;
})();

// Step 9 (new; replaces the birth-weight question)
const papQuestion = single('m3-q6', CHECK, 'What does a PAP machine do while you sleep?', [
  'Gives you extra oxygen from a tank', 'Sends small electric pulses to your tongue', 'Uses air pressure to hold your airway open', 'Delivers a mild medicine through the mask',
], 'c3', {
  correctSummary: 'Correct!', incorrectSummary: 'Well, not quite…',
  generalExplanation: 'PAP uses air from your room, gently pressurized, to hold your airway open while you sleep.',
});
papQuestion.instructions = 'Select the right answer.';
papQuestion.narrationText = narrate(papQuestion.prompt, papQuestion.instructions, ...papQuestion.choices.map((choice) => choice.label));

// Step 10
const recap = { ...requiredScreen('m3-recap'), title: 'Thanks for completing this module', type: 'summary', keyPoints: [
  'I hope you learned that untreated OSA during pregnancy has been linked with preeclampsia, high blood pressure, gestational diabetes, cesarean birth, and rare heart problems such as cardiomyopathy and heart failure.',
  'PAP uses air pressure to hold your airway open during sleep. Your prenatal and sleep-care teams can help you understand your personal risk and treatment.',
] } as LessonScreen;
recap.narrationText = narrate(recap.title, ...(recap.type === 'summary' ? recap.keyPoints : []));

const screens: LessonScreen[] = [intro, outcomesOverview, outcomesQuestion, cesareanLesson, q1, heartLesson, q3, papLesson, papQuestion, recap];

export const module03: EducationModule = { id: 'm3', order: 2, title: 'OSA Outcomes and Motivation', shortTitle: 'Outcomes & Motivation', description: 'Understand pregnancy-related OSA associations and build realistic next steps for PAP.', screens, sourceScreenshotIds: [], curriculumVersion: 10, translationStatus: 'source', clinicalReviewStatus: 'not_reviewed' };
