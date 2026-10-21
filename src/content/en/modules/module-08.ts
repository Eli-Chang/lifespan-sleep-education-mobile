import { easyPapContent as c, easyPapSourceIds } from '@/src/content/helpers';
import type { EducationModule, SingleChoiceLesson } from '@/src/types/content';
const q = (id: string, prompt: string, choices: string[], correctChoiceId: string, explanation: string): SingleChoiceLesson => ({
  id,
  type: 'singleChoice',
  title: 'Check Your Understanding',
  prompt,
  choices: choices.map((label, index) => ({ id: `c${index + 1}`, label })),
  correctChoiceId,
  questionKind: 'objective',
  questionFeedback: { correctSummary: 'Correct.', incorrectSummary: 'Not quite.', generalExplanation: explanation },
  narrationText: [prompt, ...choices].join(' '),
  sourceScreenshotIds: [],
  sourceIds: [...easyPapSourceIds],
  clinicalReviewStatus: 'not_reviewed',
});

export const module08: EducationModule = {
  id: 'm8',
  order: 9,
  title: 'Getting Started with PAP',
  shortTitle: 'Getting Started with PAP',
  description: 'Build comfort with PAP gradually and use the care team for treatment questions.',
  sourceScreenshotIds: [],
  curriculumVersion: 11,
  translationStatus: 'source',
  clinicalReviewStatus: 'not_reviewed',
  screens: [
    c('m8-01', 'Getting Started with PAP', [
      'Getting used to PAP can take time. Move through the acclimation stages at your own pace, and ask the prescribing healthcare provider when questions or problems arise.',
      'PAP is prescribed with a particular mask or interface and settings. At first, the goal is to make the mask, airflow, and routine familiar enough to use during sleep—not to force a perfect night immediately.',
      'Keep the care team involved. They can check the fit, review device data, and decide whether a comfort adjustment is appropriate. Do not change prescribed pressure on your own.',
    ], [
      'Short, repeatable practice is progress; one difficult night does not mean PAP has failed.',
      'Write down what feels difficult so you can bring a specific question to the PAP or sleep-care team.',
    ]),
    c('m8-02', 'Start with a Comfortable Mask', [
      'Begin by finding a mask or interface and headgear that feel comfortable. Different interfaces fit different faces and sleeping styles, and it may take trying more than one.',
      'Focus on mask comfort before worrying about using the machine. With the machine running, adjust the straps just enough to create a seal. A mask should feel secure, not painfully tight.',
      'If the mask only seals when the straps are very tight, ask the equipment team to check the size, cushion, or style. Nasal pillows, a nasal mask, and a full-face mask fit differently.',
    ], [
      'Fit the mask with airflow running and make one small adjustment at a time.',
      'Ask for a different size or interface when comfort depends on over-tightening.',
    ]),
    c('m8-03', 'Practice While You’re Awake', [
      'Practice using PAP while awake and sitting upright in a comfortable position for about one hour a day for several days. Pair it with reading or watching television.',
      'Turn the machine on before placing the mask, then notice how the airflow feels while you are awake. A calm activity gives you time to practice breathing with the mask without also trying to fall asleep.',
      'If the sensation becomes too much, pause and return to a shorter practice period later. Repeating manageable practice is more useful than forcing yourself through distress.',
    ], [
      'Use an enjoyable, low-pressure activity to make practice predictable.',
      'Increase practice time gradually as the mask and airflow become more familiar.',
    ]),
    c('m8-04', 'Practice While Resting', [
      'Next, use PAP while lying down during a scheduled rest or nap. Put your head down and close your eyes. Actually falling asleep is not required for this practice to be useful.',
      'Use a short, planned rest and notice whether your position, pressure, mask seal, or tubing feels like the main barrier. Support the tubing so it does not pull on the mask as you move.',
      'If you become uncomfortable, take a break and try a shorter session another time. Persistent difficulty is a reason to ask the equipment or healthcare team for coaching.',
    ], [
      'Practice the position and setup you expect to use for sleep.',
      'Keep tubing supported so movement does not pull the mask out of place.',
    ]),
    c('m8-05', 'Bring PAP Into Your Bedtime Routine', [
      'Once awake and resting practice feel comfortable, begin using PAP during the first part of nighttime sleep.',
      'Make setup predictable: keep the mask, tubing, and machine ready before you feel sleepy, and avoid routing the tubing where it can tug on the mask.',
      'If falling asleep remains difficult, ask whether your device has a ramp or autoramp comfort feature that is appropriate for you. These settings should be reviewed with the sleep-care team rather than changed independently.',
    ], [
      'Start with the first part of sleep, then build from there.',
      'Ask the care team about ramp or autoramp instead of changing pressure yourself.',
    ]),
    q('m8-q1', 'A person can now wear their PAP comfortably for about an hour while awake, but trying to use it for an entire night still feels overwhelming. Based on the acclimation sequence in this module, what is the best next step?', ['Increase the prescribed pressure so they fall asleep faster.', 'Practice with PAP while lying down during a scheduled rest or nap.', 'Skip the remaining practice stages and force themselves to wear it all night.', 'Stop using PAP until it feels completely natural without practice.'], 'c2', 'Build comfort gradually. Practice while resting before moving toward nighttime use.'),
    c('m8-06', 'Build Toward the Whole Night', [
      'After practicing during the first part of nighttime sleep, work toward using PAP throughout the entire night. Progress can happen at your own pace.',
      'Use PAP for the whole sleep period as you build tolerance. If you remove it during the night, put it back on when you wake enough to do so safely and note what prompted you to remove it.',
      'Hours of use, leak information, and pressure data can help the care team see patterns. Use those data to guide a conversation rather than changing settings on your own.',
    ], [
      'Track what happens before you remove the mask: discomfort, dryness, leaks, congestion, noise, or pressure.',
      'Bring repeated barriers to the care team early; support can make the next step more manageable.',
    ]),
    c('m8-07', 'How Can I Tell if PAP Is Helping?', [
      'Track symptoms before and after starting therapy, including sleepiness, daytime naps, or insomnia. Some symptoms may change quickly, while others may take weeks.',
      'PAP devices collect treatment and use data that the healthcare team can review when assessing therapy.',
      'Symptoms and device data answer different questions: your notes describe how you feel, while the device can show use, leaks, and treatment information. Persistent sleepiness or worsening symptoms should be discussed with the healthcare provider rather than used as a reason to change pressure yourself.',
    ], [
      'Record both your experience and the nights or hours you used PAP.',
      'A follow-up review can identify mask, leak, comfort, or setting problems that are not obvious from symptoms alone.',
    ]),
    c('m8-08', 'What if PAP Feels Uncomfortable at First?', [
      'An adjustment period is normal. Mask fit, the sensation of air pressure, and adding PAP to a bedtime routine can take time. Discuss persistent problems with the healthcare provider or equipment team.',
      'Name the specific barrier—mask pressure, leaks, dryness, congestion, noise, claustrophobia, or difficulty exhaling—because each may have a different solution.',
      'Ask whether another mask size or style, heated humidification, ramp or autoramp, or an expiratory comfort feature is available and appropriate for your device. These are care-team and device decisions.',
      'If a problem repeatedly prevents use, contact the team promptly instead of abandoning treatment or changing settings without guidance.',
    ], [
      'Describe when the problem starts and what it feels like; details help the team troubleshoot.',
      'Do not interpret early discomfort as proof that PAP cannot work for you.',
    ]),
    c('m8-09', 'When Should I Use PAP?', [
      'Use PAP whenever sleeping, including nighttime sleep, naps, and travel.',
      'Using it for every sleep period gives the treatment the best chance to support breathing across the time you are asleep. If you cannot use it for a particular sleep period, ask your healthcare team how to handle that situation safely.',
    ], [
      'Keep the mask and machine part of your sleep routine, not only a response to feeling tired.',
      'Ask the care team about barriers that make naps or sleep away from home difficult.',
    ]),
    c('m8-10', 'Who Adjusts My PAP Settings?', [
      'The healthcare provider recommends the initial settings and may adjust them based on how you feel and PAP data. Do not independently change prescribed pressure.',
      'At follow-up, share your symptom notes and ask the team to review hours of use, leaks, and other available treatment data. The team may decide that a mask change or a comfort feature is more useful than a pressure change.',
      'Use only the comfort features and settings you have been taught to use. If the device feels too strong, too weak, or difficult to exhale against, contact the prescribing provider or equipment team.',
    ], [
      'PAP settings are part of treatment, not a self-directed experiment.',
      'Your observations and device data give the care team better information for a safe adjustment.',
    ]),
    q('m8-q2', 'A person has been using PAP for several days. They still feel tired and decide that the pressure must be too low, so they plan to increase it themselves. Which response best matches the module?', ['Increase the pressure gradually until daytime tiredness disappears.', 'Stop using PAP until the tiredness improves.', 'Keep track of symptoms and use, then review the PAP data and settings with the prescribing healthcare provider.', 'Use PAP only on nights when they feel especially tired.'], 'c3', 'Keep using PAP as directed and review symptoms, use data, and settings with the prescribing healthcare provider.'),
  ],
};
