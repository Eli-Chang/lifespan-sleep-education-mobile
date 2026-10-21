import { easyPapContent as c, easyPapSourceIds } from '@/src/content/helpers';
import type { EducationModule, SingleChoiceLesson } from '@/src/types/content';

const q = (
  id: string,
  prompt: string,
  choices: string[],
  correctChoiceId: string,
  explanation: string,
): SingleChoiceLesson => ({
  id,
  type: 'singleChoice',
  title: 'Check Your Understanding',
  prompt,
  choices: choices.map((label, index) => ({ id: `c${index + 1}`, label })),
  correctChoiceId,
  questionKind: 'objective',
  questionFeedback: {
    correctSummary: 'Correct.',
    incorrectSummary: 'Not quite.',
    generalExplanation: explanation,
  },
  narrationText: [prompt, ...choices].join(' '),
  sourceScreenshotIds: [],
  sourceIds: [...easyPapSourceIds],
  clinicalReviewStatus: 'not_reviewed',
});

export const module09: EducationModule = {
  id: 'm9',
  order: 10,
  title: 'Troubleshooting PAP',
  shortTitle: 'Troubleshooting PAP',
  description: 'Practical guidance for common PAP problems.',
  sourceScreenshotIds: [],
  curriculumVersion: 11,
  translationStatus: 'source',
  clinicalReviewStatus: 'not_reviewed',
  screens: [
    c('m9-01', 'Troubleshooting PAP', [
      'This module offers practical guidance for common PAP problems. Discuss persistent concerns with the healthcare provider or equipment team.',
      'Start by checking one category at a time: mask fit, tubing and connections, humidification, nasal comfort, or the device data. Small, supported changes are easier to evaluate than changing several things at once.',
      'This app cannot diagnose a problem or prescribe a setting. If a problem repeatedly prevents PAP use, ask the prescribing provider or equipment team for help. Seek prompt medical care for severe or rapidly worsening symptoms.',
    ], [
      'Use the manufacturer instructions for your particular mask and device.',
      'Write down when the problem starts, what it feels like, and what you already tried.',
    ]),
    c('m9-02', 'My Mask Feels Too Tight or Uncomfortable', [
      'The mask should not need to be painfully tight or leave persistent facial marks. Adjusting straps may help while maintaining a seal. If it only seals when extremely tight, ask about another mask style.',
      'With the machine running, gently reseat the mask and adjust one strap at a time. The goal is a seal that stays in place without painful pressure; overtightening can make pressure points and leaks worse.',
      'If comfort remains poor, ask the equipment team to check the size, cushion, headgear, and mask style. Nasal pillows, a nasal mask, and a full-face mask distribute contact differently.',
    ], [
      'Fit the mask with airflow on and use the smallest adjustment that improves the seal.',
      'Ask for a refit when the mask only works if it is painfully tight.',
    ]),
    c('m9-03', 'My Mask Leaks or Moves Around', [
      'Air leaks may mean intended airflow is escaping. Check fit and straps. Red or sore eyes after waking can signal air leaking from the top of the mask. If it persists, another mask style may be needed.',
      'While the machine is running, lift the mask slightly away from your face and let it reseal, then adjust the headgear gradually. Check that the cushion is not folded and that the tubing and connectors are seated.',
      'Reduce tugging by routing the tubing over your chest or using a tubing holder. A pillow designed with space for the mask may help some side sleepers. Persistent leaks or eye irritation deserve a mask-fit review.',
    ], [
      'A good seal should not require blocking the mask vents or tightening until your skin hurts.',
      'Bring repeated leaks, red eyes, or frequent mask movement to the PAP team.',
    ]),
    c('m9-04', 'There Is Water in My Mask or I Hear Whistling', [
      'Condensation can occur with too much humidification or a large temperature difference between tubing and surrounding air. Use supported humidification and tubing-warming controls as directed for comfort.',
      'If water collects, try lowering the heated-humidifier setting, warming the room, insulating the tubing, or using heated PAP tubing when your device supports it. Change one setting at a time and follow the device manual.',
      'A whistle can come from a small leak, a loose connection, or a vent or cushion that needs checking. Do not cover the intentional exhalation vents; ask the equipment team to inspect unusual sounds that persist.',
    ], [
      'Water in the tubing is often called rainout and can improve when tubing and room temperatures are closer.',
      'Use only the humidification and tubing options supported by your machine.',
    ]),
    c('m9-05', 'My Skin Is Irritated', [
      'Persistent irritation may relate to mask contact, fit, or material. If it continues or a reaction is suspected, discuss another interface or mask option with the healthcare provider or equipment team.',
      'Check that the mask is secure but not painfully tight. Clean and dry your face and mask components according to the manufacturer instructions; skin oils or residue can interfere with the seal.',
      'Ask about a different size or style, a mask liner, or another approved cushion if rubbing continues. An open sore, spreading redness, or worsening reaction needs prompt review by a healthcare professional.',
    ], [
      'Treat persistent skin injury as a fit or skin-care problem to review, not something to push through.',
      'Do not apply an unapproved product to the mask or skin without checking the manufacturer or care team.',
    ]),
    q(
      'm9-q1',
      'A PAP user wakes with red, sore eyes and notices air blowing near the top edge of the mask. What is the best first interpretation and response based on this module?',
      [
        'Lower the prescribed pressure immediately and reassess after one night.',
        'Check the mask fit and seek mask support if the leak continues.',
        'Stop PAP altogether because any eye irritation means the treatment is unsafe.',
        'Increase humidification before checking whether air is leaking.',
      ],
      'c2',
      'Air near the top of the mask can indicate a leak. Check fit first and seek mask support if it persists.',
    ),
    c('m9-06', 'My Nose or Mouth Feels Dry', [
      'PAP airflow can feel drying. Nasal saline and PAP humidification may improve comfort, but too much humidity can cause unwanted moisture. Discuss persistent problems with the healthcare or equipment team.',
      'Check for a mask or mouth leak first, especially if you use a nasal mask or nasal pillows. If your device has humidification, ask whether a higher heat setting or heated tubing is appropriate; balance comfort against condensation.',
      'Saline spray or gel can help some people with nasal dryness, and artificial-saliva products may help some people with dry mouth. Ask the care team before adding a chin strap or changing mask type.',
    ], [
      'Dryness can be a clue to a leak, not only a need for more humidity.',
      'Change humidification gradually and record whether dryness or condensation improves.',
    ]),
    c('m9-07', 'My Mouth Opens While I Sleep', [
      'Persistent mouth opening may contribute to dry mouth and PAP problems. A full-face mask may be needed for some people; the prescribing healthcare team can help troubleshoot.',
      'When a nasal mask or nasal pillows are used, mouth opening can let air escape and dry the mouth. Nasal congestion can make this more likely, so address congestion as part of the troubleshooting conversation.',
      'Ask the care team whether a chin strap or a clinician-fitted full-face mask is appropriate. Mask choice depends on fit, breathing comfort, leak, and your treatment plan.',
    ], [
      'Mouth leak is a reason to review the interface, not to tighten every strap.',
      'Have the PAP team help choose and fit any alternate interface.',
    ]),
    c('m9-08', 'I Have Congestion, Allergies, or Nasal Irritation', [
      'Keep PAP filters clean. Use humidifier and heat options according to device setup and comfort, and use distilled water as directed. Reduce allergens and discuss medications or persistent symptoms with the healthcare provider.',
      'Heated humidification or heated tubing may improve comfort for some people. Saline spray or gel can help nasal irritation; ask the healthcare provider whether a nasal spray is appropriate when congestion persists, especially during pregnancy.',
      'Reduce dust, smoke, fragrances, and other known irritants where you sleep. Replace or clean filters on the schedule in the device manual, and ask whether another interface would be easier while your nose is blocked.',
    ], [
      'Medication choices belong with the healthcare provider; the app does not select or dose them.',
      'Persistent congestion, nosebleeds, or worsening breathing needs clinical review.',
    ]),
    c('m9-09', 'I’m Burping or Feeling Bloated', [
      'Burping or bloating may be a sign of swallowing air. Some PAP devices have a ramp feature that reduces pressure while falling asleep. Discuss pressure changes with the healthcare provider rather than making them independently.',
      'Changing your sleeping position or pillow arrangement may help some people. If available on your device, a ramp can lower the starting pressure while you fall asleep; ask the care team how to use it.',
      'Persistent, painful, or worsening bloating needs prompt review of the mask, pressure, and device mode. The clinician may consider an expiratory comfort feature, auto-PAP, or bilevel PAP when appropriate—these are not self-directed changes.',
    ], [
      'Do not keep lowering or raising prescribed pressure to chase a symptom.',
      'Contact the care team if bloating is painful, recurrent, or stopping you from using PAP.',
    ]),
    c('m9-10', 'The Air Feels Too Cold', [
      'Changing room temperature or using heated humidification when available may help.',
      'You can also ask about a heated tube or an insulating tube cover. Routing the tubing over your chest or under a blanket may reduce heat loss when the device instructions allow it.',
      'If cold air comes with a leak, whistling, or nasal irritation, check the mask seal and connections and ask the equipment team to review the setup.',
    ], [
      'Use only heated tubing or humidification options made for your device.',
      'Comfort changes should not replace a fit check when symptoms continue.',
    ]),
    q(
      'm9-q2',
      'A person using PAP has frequent burping and bloating. They think the easiest solution is to lower the prescribed pressure themselves. What should they do instead?',
      [
        'Lower the prescribed pressure on their own, then keep adjusting it until the bloating stops.',
        'Stop PAP each time bloating occurs and wait to restart until the discomfort has completely resolved.',
        'Check for a ramp feature and review symptoms and prescribed settings with the care team.',
        'Tighten the mask as much as possible to prevent swallowed air.',
      ],
      'c3',
      'A ramp feature may help comfort, while symptoms and prescribed settings should be discussed with the prescribing healthcare provider.',
    ),
    c('m9-11', 'Cleaning PAP Equipment', [
      'Follow the manufacturer’s instructions first. Compatible general guidance includes mild soap, thorough rinsing, and air drying relevant mask and humidifier components, with weekly tubing cleaning and periodic broader cleaning. Use distilled water in the humidifier as directed.',
      'A practical routine is to empty the humidifier chamber each morning, refill it with fresh distilled water before sleep, and wipe or wash the mask cushion as the manual directs. Wash mask parts, tubing, and headgear with warm water and mild soap on the schedule supplied with your device, then rinse and air-dry away from direct heat or sunlight.',
      'Wipe the outside of the machine as directed, and clean or replace filters and other supplies on the manufacturer schedule. Do not immerse the machine or use bleach, alcohol, harsh cleaners, household wipes, or an unapproved cleaning device on PAP equipment.',
      'Parts and materials vary, so the manufacturer instructions take priority over a universal online schedule.',
    ], [
      'Fresh distilled water and a consistent empty-and-refill routine help reduce buildup in the humidifier chamber.',
      'Never put the machine itself in water; ask the equipment team when a part is damaged or overdue for replacement.',
    ]),
    q(
      'm9-q3',
      'A PAP user wants to clean the equipment correctly but finds instructions online that differ from the instructions supplied with the machine. What should guide the cleaning routine first?',
      [
        'Choose the online method that uses the strongest cleaning solution.',
        'Start with the manufacturer’s instructions; use compatible general guidance only as a supplement.',
        'Use one universal PAP cleaning schedule because all devices require the same products, timing, and steps.',
        'Clean the equipment only when it looks visibly dirty or smells unusual.',
      ],
      'c2',
      'Manufacturer instructions are primary because cleaning requirements can differ by device.',
    ),
  ],
};
