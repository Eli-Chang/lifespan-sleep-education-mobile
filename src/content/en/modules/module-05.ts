import { curriculumMulti as m, curriculumSummary as recap } from '@/src/content/helpers';
import { ciasScreensByModule } from '@/src/content/en/cias-source';
import type { EducationModule, LessonScreen } from '@/src/types/content';

const keyedScreens: LessonScreen[] = [
  m('m5-q5','Comprehension Check 1: The Pitfalls of Poor Sleep','What are some of the consequences of getting poor sleep? Select all that apply.',[
    'Your immune system will be strengthened by poor sleep','Increased risk of depression and worse mood symptoms','You will be shorter',
    "Poor sleep isn't that bad! There are very few consequences.",'Increased risk of chronic disease (diabetes, high blood pressure, high cholesterol)','Increased likelihood of daytime fatigue and lack of energy',
  ],['c2','c5','c6'],{correctSummary:'Correct.',incorrectSummary:'Not quite.',generalExplanation:'Poor sleep is associated with worse mood, greater chronic-disease risk, and more daytime fatigue or low energy.'}),
  m('m5-q9','Comprehension Check 6: The Importance of Sunshine','What are 3 reasons why daily morning sunshine is beneficial for sleep? Select all that apply.',[
    "Sunshine doesn't contain blue light, which helps with sleep during nighttime",'It boosts nighttime melatonin (sleepy chemical) production by strengthening day–night light cues',
    'It improves sleep because it immediately boosts melatonin levels in the morning, stabilizing the melatonin rhythm',"It helps set your circadian rhythm (body's internal clock) earlier and more consistently",
    'It can make it easier to fall asleep later by increasing daytime alertness and nighttime sleep drive','Morning sunlight works mainly by warming the skin, which directly prepares core body temperature for sleep later',
  ],['c2','c4','c5'],{correctSummary:'Correct.',incorrectSummary:'Not quite.',generalExplanation:'This source activity is pointing to stronger day–night cues, circadian timing, and daytime alertness. Clinically, morning light can shift the timing of the body clock; it does not guarantee more nighttime melatonin. Sleep pressure builds mainly with time awake, not from light itself.'}),
  m('m5-q3','Comprehension Check 8: Caffeine','Which of the following statements best reflects the recommended guidelines and physiological effects of caffeine consumption for pregnant women? Select all that apply.',[
    'Individual differences in metabolism mean some pregnant people may be advised to avoid caffeine.','Metabolic changes in late pregnancy can significantly delay the processing of caffeine.',
    'Consuming up to 400mg of caffeine is generally considered safe for women in the early stages of pregnancy.','Caffeine metabolism speeds up significantly during the later stages of pregnancy.',
    'The body processes caffeine instantly, so timing does not matter.','General guidance recommends staying below 200mg of caffeine per day during pregnancy.',
  ],['c1','c2','c6'],{correctSummary:'Correct.',incorrectSummary:'Not quite.',generalExplanation:'This source activity highlights individual differences and slower caffeine processing later in pregnancy. Major guidance generally recommends staying below 200 mg per day across pregnancy; that is an upper-limit recommendation, not a guarantee of safety, and avoiding caffeine entirely is not a universal recommendation. Ask your prenatal clinician about your situation.'}),
  m('m5-q11','Comprehension Check 10: The Importance of Nutrition','Select all the foods that can consistently be part of a healthy diet and support proper sleep.',[
    'Oatmeal','Highly caffeinated energy drinks','Quarter pounder','Leafy greens','Boiled potatoes','Snickers bar','Berries','Chicken','Greek yogurt','French fries','Chips','Alcohol',
  ],['c1','c4','c5','c7','c8','c9'],{correctSummary:'Correct.',incorrectSummary:'Not quite.',generalExplanation:'This activity illustrates generally nutrient-dense options that can fit a balanced eating pattern. It does not mean any food is universally healthy or unhealthy, and no individual food directly treats sleep problems. Preparation, portions, frequency, and individual pregnancy needs all matter.'}),
  recap('m5-recap','Thanks for completing this module','I hope you learned that sleep hygiene means creating habits and conditions that support sleep, including timing, wind-down routines, light, the sleep environment, caffeine, meal comfort, activity, and naps. These strategies do not cure OSA and may not be enough for persistent insomnia or other health problems.'),
];

const expectedOrder = ['m5-01','m5-02','m5-03','m5-q5','m5-q6','m5-04','m5-13','m5-05','m5-q7','m5-11','m5-q1','m5-14','m5-q9','m5-q4','m5-06','m5-15','m5-16','m5-17','m5-07','m5-q3','m5-q2','m5-08','m5-18','m5-q11','m5-q8','m5-21','m5-10','m5-19','m5-20','m5-q10','m5-recap'];
const screenById = new Map([...ciasScreensByModule.m5, ...keyedScreens].map((screen) => [screen.id, screen]));
const screens = expectedOrder.map((id) => {
  const screen = screenById.get(id);
  if (!screen) throw new Error(`Missing required Module 5 screen: ${id}`);
  return screen;
});

// The single 31-screen sleep hygiene sequence is taught as two modules. Part 1 covers why sleep
// matters, the bedtime routine, sleep/wake timing, light, and trouble falling asleep. Part 2 begins
// at the sleep environment and covers caffeine, meals, nutrition, exercise, naps, stress, and
// sleeping position. Screen IDs, content, and order are unchanged; only the module boundary is new.
export const SLEEP_HYGIENE_PART_TWO_FIRST_SCREEN_ID = 'm5-06';
const splitIndex = screens.findIndex((screen) => screen.id === SLEEP_HYGIENE_PART_TWO_FIRST_SCREEN_ID);
if (splitIndex <= 0) throw new Error('Module 5 split point is missing.');

export const module05: EducationModule = {id:'m5',order:5,title:'Healthy Sleep Hygiene, Part 1: Routine and Light',shortTitle:'Sleep Hygiene, Part 1',description:'Build a realistic sleep routine and use timing, light, and wind-down habits to support sleep without replacing OSA or insomnia care.',screens:screens.slice(0, splitIndex),sourceScreenshotIds:[],curriculumVersion:10,translationStatus:'source',clinicalReviewStatus:'not_reviewed'};
export const module05b: EducationModule = {id:'m5b',order:6,title:'Healthy Sleep Hygiene, Part 2: Environment and Daily Habits',shortTitle:'Sleep Hygiene, Part 2',description:'Shape the bedroom and daily habits such as caffeine, meals, activity, naps, and stress to support sleep without replacing OSA or insomnia care.',screens:screens.slice(splitIndex),sourceScreenshotIds:[],curriculumVersion:10,translationStatus:'source',clinicalReviewStatus:'not_reviewed'};
