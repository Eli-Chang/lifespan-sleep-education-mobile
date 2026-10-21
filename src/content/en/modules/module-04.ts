import { curriculumContent as c, curriculumMulti as m, curriculumSingle as q, curriculumSummary as recap } from '@/src/content/helpers';
import { ciasScreensByModule } from '@/src/content/en/cias-source';
import type { EducationModule } from '@/src/types/content';
const currentScreens = [
  c('m4-01','Sleep Apnea During Pregnancy',[
    'Pregnancy can bring changes in body weight, fluid balance, hormones, nasal breathing, sleep position, and sleep quality. These changes may contribute to new OSA or make existing OSA more noticeable in some people.',
    'Symptoms such as snoring or tiredness can also have other causes. A healthcare professional can help determine whether sleep-apnea evaluation is appropriate.',
  ]),
  q('m4-q1','Knowledge check','A study reports that OSA is associated with gestational diabetes. What is the best interpretation?',[
    'Every pregnant person with OSA will develop gestational diabetes.','OSA always directly causes gestational diabetes.',
    'Gestational diabetes has been observed more often in groups with OSA, but this does not predict an individual outcome.',
    'PAP guarantees that gestational diabetes will not occur.',
  ],'c3',{correctSummary:'Correct.',incorrectSummary:'Not quite.',generalExplanation:'An association is a group-level pattern. It does not predict an individual outcome, prove a single cause, or guarantee prevention.'}),
  c('m4-03','What Is Gestational Diabetes?',[
    'Gestational diabetes is diabetes that is first diagnosed during pregnancy. It means blood glucose, often called blood sugar, is higher than recommended during pregnancy.',
    'It is usually identified through prenatal screening. Managing gestational diabetes can reduce health risks, but individual care decisions belong to the prenatal healthcare team.',
  ]),
  c('m4-04','Why Is Gestational Diabetes Monitored?',[
    'Gestational diabetes can affect the pregnant patient and the developing baby. The exact risks depend on the individual situation and how well blood glucose is managed.',
    'This app should not calculate personal risk or recommend treatment. It should help you understand the condition and prepare questions for your prenatal care team.',
  ]),
  m('m4-q2','Knowledge check','Which statements about gestational diabetes are correct? Select all that apply.',[
    'It is diabetes first diagnosed during pregnancy.','It involves blood glucose levels.','It can be diagnosed from snoring alone.',
    'It is evaluated and managed with the prenatal healthcare team.','Every person with OSA will develop it.',
  ],['c1','c2','c4'],{correctSummary:'Correct.',incorrectSummary:'Not quite.',generalExplanation:'Gestational diabetes is first diagnosed during pregnancy, involves blood glucose, and is evaluated and managed with the prenatal healthcare team. Snoring alone cannot diagnose it.'}),
  c('m4-05','What Is Preeclampsia?',[
    'Preeclampsia is a pregnancy complication involving high blood pressure and signs that other organs may be affected. It usually develops after 20 weeks of pregnancy, although individual presentations vary.',
    'Preeclampsia requires medical evaluation and monitoring. This app does not determine whether someone has preeclampsia.',
  ]),
  c('m4-06','Where Does OSA Fit?',[
    'OSA has been associated with gestational diabetes, hypertensive disorders of pregnancy, and other pregnancy outcomes.',
    'Several factors may contribute to these outcomes, and research continues to examine how OSA, oxygen changes, sleep disruption, inflammation, metabolism, and blood-vessel function may be connected.',
    'These findings support careful evaluation and treatment, but they do not allow the app to predict what will happen in an individual pregnancy.',
  ]),
  q('m4-q3','Knowledge check','What does PAP directly treat?',[
    'It directly treats obstructive breathing during sleep.','It guarantees that all pregnancy complications will be prevented.','It directly treats gestational diabetes.','It replaces prenatal care.',
  ],'c1',{correctSummary:'Correct.',incorrectSummary:'Not quite.',generalExplanation:'PAP directly treats obstructive breathing during sleep. It should not be presented as a guarantee against pregnancy complications or as a replacement for prenatal care.'}),
  recap('m4-recap','Thanks for completing this module','I hope you learned that pregnancy can affect sleep and breathing. OSA has been associated with gestational diabetes and hypertensive disorders, but an association does not predict an individual outcome. PAP treats obstructive breathing during sleep; it does not guarantee prevention or relief of pregnancy complications, which require care from the appropriate healthcare team.'),
];
const preservedCurrentScreenIds = new Set(['m4-q3', 'm4-recap']);
const removedScreenIds = new Set(['m4-02', 'm4-ai1', 'm4-ai2']);
const videoByScreen = {
  'm4-03': { url: 'https://youtu.be/VCM9jwZBRNM?si=aka8e6qbZLMX3qKz', thumbnailUrl: 'https://i.ytimg.com/vi/VCM9jwZBRNM/hqdefault.jpg', title: { en: 'What You NEED To Know About Gestational Diabetes', es: 'Video en inglés: What You NEED To Know About Gestational Diabetes' }, altText: { en: 'Video thumbnail for an overview of gestational diabetes.', es: 'Miniatura de un video en inglés sobre la diabetes gestacional.' } },
  'm4-05': { url: 'https://youtu.be/lB25PRLyqDg?si=WAk9zpO8IWeSAi5H', thumbnailUrl: 'https://i.ytimg.com/vi/lB25PRLyqDg/hqdefault.jpg', title: { en: 'Chronic Conditions: What is Preeclampsia? #shorts', es: 'Video en inglés: Chronic Conditions: What is Preeclampsia? #shorts' }, altText: { en: 'Video thumbnail for a short overview of preeclampsia.', es: 'Miniatura de un video en inglés sobre la preeclampsia.' } },
} as const;
const merged = [...ciasScreensByModule.m4.filter((screen) => screen.id !== 'm4-recap'), ...currentScreens.filter((screen) => preservedCurrentScreenIds.has(screen.id))]
  .filter((screen, index, all) => !removedScreenIds.has(screen.id) && all.findIndex((candidate) => candidate.id === screen.id) === index)
  .map((screen) => screen.type === 'content' && screen.id in videoByScreen ? { ...screen, video: videoByScreen[screen.id as keyof typeof videoByScreen] } : screen);
const screens = [...merged.filter((screen) => screen.id !== 'm4-recap'), ...merged.filter((screen) => screen.id === 'm4-recap')];
export const module04: EducationModule = {id:'m4',order:4,title:'Sleep Apnea and Health of Your Pregnancy and Baby',shortTitle:'Pregnancy & Baby',description:'Understand pregnancy-related associations without deterministic or frightening conclusions.',screens,sourceScreenshotIds:[],curriculumVersion:10,translationStatus:'source',clinicalReviewStatus:'not_reviewed'};
