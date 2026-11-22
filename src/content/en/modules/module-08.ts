import { easyPapContent as c, easyPapSourceIds } from '@/src/content/helpers';
import type { EducationModule, MultiSelectLesson } from '@/src/types/content';

// Display Module 9. Text written by Claude in the voice described in docs/curriculum/VOICE_GUIDE.md.
// Lines that start with "•" render as a bullet list (src/content/rich-presentation.ts).

/** A select-all-that-apply check: five options, two correct, explained per choice in src/content/question-feedback. */
export const easyPapCheck = (id: string, prompt: string, choices: string[], correctChoiceIds: string[], explanation: string): MultiSelectLesson => ({
  id,
  type: 'multiSelect',
  title: 'Check Your Understanding',
  prompt,
  instructions: 'Select all that apply. Hint: There are 2 correct answers.',
  choices: choices.map((label, index) => ({ id: `c${index + 1}`, label })),
  correctChoiceIds,
  questionKind: 'objective',
  questionFeedback: { correctSummary: 'Correct!', incorrectSummary: 'Well, not quite…', generalExplanation: explanation },
  narrationText: [prompt, ...choices].join(' '),
  sourceScreenshotIds: [],
  sourceIds: [...easyPapSourceIds],
  clinicalReviewStatus: 'not_reviewed',
  answerBehaviorProvenance: 'CLAUDE_DRAFTED_AT_OWNER_REQUEST',
});

export const module08: EducationModule = {
  id: 'm8',
  order: 9,
  title: 'Getting Started with PAP',
  shortTitle: 'Getting Started with PAP',
  description: 'Get comfortable with PAP step by step, and lean on your care team for treatment questions.',
  sourceScreenshotIds: [],
  curriculumVersion: 11,
  translationStatus: 'source',
  clinicalReviewStatus: 'not_reviewed',
  screens: [
    // Part 1: getting comfortable
    c('m8-01', 'Getting Started with PAP', [
      'Congratulations on taking this important step to treat your OSA! Getting used to PAP can take time, and that\'s okay. Move through the practice steps in this module at your own pace.',
      'Your PAP comes with a mask (also called an interface) and settings chosen for you. At first, the goal is to get comfortable with the mask and the airflow so you can use them while you sleep. You don\'t need a perfect night right away.',
      'Keep your healthcare team involved. They can:',
      '• Check how your mask fits\n• Review your device data\n• Decide whether a comfort change makes sense for you',
      'Don\'t change your prescribed pressure on your own. Reach out to the healthcare provider who prescribed your PAP when questions or problems come up.',
    ], [
      'Short practice sessions you can repeat are real progress. One hard night doesn\'t mean PAP has failed.',
      'Write down what feels hard so you can bring a specific question to your PAP or sleep care team.',
    ]),
    c('m8-02', 'Start with a Comfortable Mask', [
      'First, find a mask and headgear that feel comfortable. Masks fit different faces and sleeping styles, so you may need to try more than one, and that\'s normal.',
      'Focus on comfort before you worry about using the machine. With the machine running, adjust the straps just enough to make a seal. The mask should feel secure, not painfully tight.',
      'If the mask only seals when the straps are very tight, ask your equipment team to check the size, cushion, or style. Common mask styles fit differently:',
      '• Nasal pillows\n• Nasal mask\n• Full-face mask',
    ], [
      'Fit the mask with the air running, and make one small adjustment at a time.',
      'Ask for a different size or style if the mask only seals when you over-tighten it.',
    ]),
    c('m8-03', 'Practice While You\'re Awake', [
      'Start by using PAP while you\'re awake. Sit upright in a comfortable spot for about one hour a day for several days. Reading or watching TV at the same time can help!',
      'Turn the machine on before you put on the mask, then notice how the airflow feels. A calm activity gives you time to practice breathing with the mask without also trying to fall asleep.',
      'If it starts to feel like too much, take a break and come back for a shorter session later. Repeating practice you can manage helps more than pushing through distress.',
    ], [
      'Pick something you enjoy doing so practice becomes a predictable part of your day.',
      'Add practice time little by little as the mask and airflow feel more familiar.',
    ]),
    c('m8-04', 'Practice While Resting', [
      'Next, use PAP while lying down for a planned rest or nap. Put your head down and close your eyes. You don\'t have to fall asleep for this practice to help.',
      'During a short, planned rest, notice what feels like the biggest barrier, such as:',
      '• Your sleeping position\n• The air pressure\n• The mask seal\n• The tubing',
      'Support the tubing so it doesn\'t pull on the mask when you move. If you feel uncomfortable, take a break and try a shorter session another time. If it keeps being hard, ask your equipment or healthcare team for coaching.',
    ], [
      'Practice in the position and setup you plan to use for sleep.',
      'Keep the tubing supported so moving around doesn\'t pull the mask out of place.',
    ]),
    easyPapCheck(
      'm8-q1',
      'You can wear your PAP comfortably for about an hour while you\'re awake, but a whole night still feels like a lot. What could you do next?',
      [
        'Turn the pressure up a little so the air feels more natural.',
        'Practice with PAP while lying down for a planned rest or nap.',
        'Skip the rest practice and try sleeping a full night with it right away.',
        'Take a week off from PAP, then start over from the beginning.',
        'Keep practice sessions short and add time as they get easier.',
      ],
      ['c2', 'c5'],
      'Build comfort step by step. Practice while resting, and keep sessions short enough to repeat.',
    ),
    // Part 2: moving PAP into the night
    c('m8-05', 'Bring PAP Into Your Bedtime Routine', [
      'Once practicing while awake and resting feels comfortable, it\'s time to bring PAP to bed! Start by using it during the first part of your nighttime sleep.',
      'Make setup easy on yourself. Have the mask, tubing, and machine ready before you feel sleepy, and place the tubing where it won\'t tug on the mask.',
      'If falling asleep is still hard, ask your sleep care team whether your device has a ramp or autoramp feature that\'s right for you. A ramp lowers the starting pressure while you fall asleep. Go over these settings with your team instead of changing them on your own.',
    ], [
      'Start with the first part of the night, then build from there.',
      'Ask your care team about ramp or autoramp instead of changing the pressure yourself.',
    ]),
    c('m8-06', 'Build Toward the Whole Night', [
      'After you\'ve practiced during the first part of the night, work toward using PAP the whole night. You can go at your own pace.',
      'If you take the mask off during the night, put it back on once you\'re awake enough to do it safely. Make a note of what made you take it off, such as:',
      '• Discomfort\n• Dryness\n• Leaks\n• Congestion\n• Noise\n• Pressure',
      'Your device also tracks your hours of use, leaks, and pressure, which help your care team spot patterns. Use this information to start a conversation with your team, not to change settings on your own.',
    ], [
      'Bring problems that keep coming back to your care team early. Support can make the next step easier.',
      'Notes about what bothers you help your team find the right fix.',
    ]),
    c('m8-07', 'How Can I Tell if PAP Is Helping?', [
      'Keep track of your symptoms before and after you start PAP, such as:',
      '• Sleepiness\n• Daytime naps\n• Insomnia (trouble falling or staying asleep)',
      'Some symptoms may get better quickly, while others may take weeks.',
      'Your PAP device also collects treatment and use data that your healthcare team can review. Your notes show how you feel, and the device shows use, leaks, and treatment information. If you\'re still sleepy or your symptoms get worse, talk with your healthcare provider instead of changing the pressure yourself.',
    ], [
      'Write down how you feel and the nights or hours you used PAP.',
      'A follow-up visit can catch mask, leak, comfort, or setting problems that your symptoms alone might not show.',
    ]),
    easyPapCheck(
      'm8-q2',
      'You\'ve started using PAP for the first part of the night. Which of these can help you build toward using it all night?',
      [
        'Only use PAP on nights when you feel very tired.',
        'Put the mask back on if you wake up and find it came off.',
        'Lower your pressure on nights when it\'s hard to fall asleep.',
        'Ask your sleep team whether a ramp feature is right for you.',
        'Wait until you feel better before you start tracking symptoms.',
      ],
      ['c2', 'c4'],
      'Keep building at your own pace. Put the mask back on if it comes off, and ask your team about a ramp feature.',
    ),
    // Part 3: comfort, timing, and settings
    c('m8-08', 'What if PAP Feels Uncomfortable at First?', [
      'Don\'t be surprised if PAP takes some getting used to. That\'s normal! Getting the mask to fit, feeling the air pressure, and adding PAP to your bedtime routine all take time. Talk to your healthcare provider or equipment team about problems that don\'t go away.',
      'Try to name the exact problem, because each one may have a different fix:',
      '• Mask pressure\n• Leaks\n• Dryness\n• Congestion\n• Noise\n• Feeling closed in (claustrophobia)\n• Trouble breathing out',
      'Ask whether any of these are available and right for your device:',
      '• A different mask size or style\n• Heated humidification\n• Ramp or autoramp\n• A comfort feature that makes breathing out easier',
      'Your care team makes these decisions with you. If a problem keeps stopping you from using PAP, contact them right away instead of giving up on treatment or changing settings without guidance.',
    ], [
      'Tell your team when the problem starts and what it feels like. Details help them troubleshoot.',
      'Early discomfort doesn\'t mean PAP can\'t work for you.',
    ]),
    c('m8-09', 'When Should I Use PAP?', [
      'Use PAP any time you sleep, including:',
      '• Nighttime sleep\n• Naps\n• When you travel',
      'Using it every time you sleep gives the treatment the best chance to support your breathing the whole time you\'re asleep. If you can\'t use it for a certain sleep period, ask your healthcare team how to handle that safely.',
    ], [
      'Make your mask and machine part of your regular sleep routine, not just something you use when you feel tired.',
      'Ask your care team for help with anything that makes naps or sleeping away from home harder.',
    ]),
    c('m8-10', 'Who Adjusts My PAP Settings?', [
      'Your healthcare provider recommends your starting settings and may adjust them based on how you feel and your PAP data. Please don\'t change your prescribed pressure on your own.',
      'At follow-up visits, share your symptom notes and ask your team to review your hours of use, leaks, and other treatment data. Your team may decide that a mask change or a comfort feature will help more than a pressure change.',
      'Only use the comfort features and settings you\'ve been taught to use. If the air feels too strong, too weak, or hard to breathe out against, contact the provider who prescribed your PAP or your equipment team.',
    ], [
      'Your PAP settings are part of your prescribed treatment, so leave changes to your care team.',
      'Your notes and device data help your care team make a safe adjustment.',
    ]),
    easyPapCheck(
      'm8-q3',
      'You\'ve used PAP for a few days, but you still feel tired. You wonder if your pressure is too low. What should you do?',
      [
        'Turn up the pressure a little more each night until you feel rested.',
        'Take a break from PAP until the tiredness goes away.',
        'Keep using PAP every time you sleep, including naps.',
        'Tighten your mask straps so more air reaches your airway.',
        'Bring your symptom notes and PAP data to your provider.',
      ],
      ['c3', 'c5'],
      'Keep using PAP, and bring your notes and data to your healthcare provider, who decides whether a setting change is needed.',
    ),
  ],
};
