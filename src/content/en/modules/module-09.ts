import { easyPapContent as c } from '@/src/content/helpers';
import { easyPapCheck } from '@/src/content/en/modules/module-08';
import type { EducationModule } from '@/src/types/content';

// Display Module 10. Text written by Claude in the voice described in docs/curriculum/VOICE_GUIDE.md.
// Lines that start with "•" render as a bullet list (src/content/rich-presentation.ts).

export const module09: EducationModule = {
  id: 'm9',
  order: 10,
  title: 'Troubleshooting PAP',
  shortTitle: 'Troubleshooting PAP',
  description: 'Practical tips for common PAP problems.',
  sourceScreenshotIds: [],
  curriculumVersion: 11,
  translationStatus: 'source',
  clinicalReviewStatus: 'not_reviewed',
  screens: [
    // Part 1: mask fit, leaks, water, and noise
    c('m9-01', 'Troubleshooting PAP', [
      'Below, you\'ll find our advice for common PAP problems. If a concern doesn\'t go away, talk with your healthcare provider or equipment team.',
      'Check one area at a time so you can tell what helped:',
      '• Mask fit\n• Tubing and connections\n• Humidification\n• Nasal comfort\n• Device data',
      'Small changes made with your team\'s support are easier to judge than changing several things at once.',
      'This app can\'t diagnose a problem or prescribe a setting. If a problem keeps stopping you from using PAP, ask the provider who prescribed it or your equipment team for help. Get medical care right away for severe or quickly worsening symptoms.',
    ], [
      'Follow the manufacturer\'s instructions for your mask and device.',
      'Write down when the problem starts, what it feels like, and what you\'ve already tried.',
    ]),
    c('m9-02', 'My Mask Feels Too Tight or Uncomfortable', [
      'Your mask shouldn\'t need to be painfully tight or leave marks that last on your face. Adjusting the straps may help while still keeping a seal. If it only seals when it\'s extremely tight, ask about another mask style.',
      'With the machine running, gently reseat the mask and adjust one strap at a time. You\'re looking for a seal that stays in place without hurting. Over-tightening can make pressure points and leaks worse.',
      'If the mask is still uncomfortable, ask your equipment team to check:',
      '• The size\n• The cushion\n• The headgear\n• The mask style',
      'Each mask style touches your face in different places, so a different one may feel better.',
    ], [
      'Fit the mask with the air on, and use the smallest change that improves the seal.',
      'Ask for a refit if the mask only works when it\'s painfully tight.',
    ]),
    c('m9-03', 'My Mask Leaks or Moves Around', [
      'You might hear or feel air leaking around your mask. A leak may mean that air meant for your airway is escaping, so check the fit and straps.',
      'Red or sore eyes after waking up can be a sign that air is leaking from the top of the mask. If the leak or eye irritation keeps happening, you may need a different mask style.',
      'To fix a leak while the machine is running:',
      '• Lift the mask slightly away from your face and let it reseal\n• Adjust the headgear a little at a time\n• Check that the cushion isn\'t folded\n• Make sure the tubing and connectors are pushed in all the way',
      'To keep the tubing from tugging, run it over your chest or use a tubing holder. If you sleep on your side, a pillow made with space for the mask may help. Leaks or eye irritation that keep happening are a good reason to have your mask fit checked.',
    ], [
      'A good seal shouldn\'t require blocking the mask vents or tightening until your skin hurts.',
      'Let your PAP team know about repeated leaks, red eyes, or a mask that keeps moving.',
    ]),
    c('m9-04', 'There Is Water in My Mask or I Hear Whistling', [
      'Water can collect (condense) when there\'s too much humidification or a big temperature difference between the tubing and the air around it. Use your humidifier and tubing-warming controls as directed.',
      'If water collects, try one of these, changing one setting at a time and following your device manual:',
      '• Lower the heated humidifier setting\n• Warm up the room\n• Cover the tubing to keep it warm\n• Use heated tubing if your device supports it',
      'A whistling sound can come from a small leak, a loose connection, or a vent or cushion that needs checking. Don\'t cover the vents that let air out on purpose. If an unusual sound doesn\'t go away, ask your equipment team to take a look.',
    ], [
      'Water in the tubing is often called rainout. It can get better when the tubing and room temperatures are closer.',
      'Only use the humidification and tubing options made for your machine.',
    ]),
    easyPapCheck(
      'm9-q1',
      'You wake up with red, sore eyes and notice air blowing near the top edge of your mask. What should you do?',
      [
        'Lower your pressure for a night and see if your eyes feel better.',
        'Reseat your mask and adjust the straps with the machine on.',
        'Turn up the humidifier to soothe your eyes before checking the fit.',
        'Ask about a different mask style if the leak keeps happening.',
        'Cover the mask vents so less air escapes near your eyes.',
      ],
      ['c2', 'c4'],
      'Air blowing near the top of the mask can mean a leak. Check the fit first, and ask about another mask style if it keeps happening.',
    ),
    // Part 2: skin, dryness, mouth leaks, and congestion
    c('m9-05', 'My Skin Is Irritated', [
      'Skin irritation that doesn\'t go away may come from how the mask touches your face, how it fits, or what it\'s made of. If it continues or you think you might be having a reaction, talk with your healthcare provider or equipment team about another mask option.',
      'Make sure the mask is secure but not painfully tight. Clean and dry your face and mask parts as the manufacturer directs, since skin oils or leftover residue can affect the seal.',
      'If rubbing continues, ask about:',
      '• A different size or style\n• A mask liner\n• Another approved cushion',
      'An open sore, redness that\'s spreading, or a reaction that\'s getting worse needs a healthcare professional to look at it soon.',
    ], [
      'Skin injury that doesn\'t heal is a fit or skin-care problem to check, not something to push through.',
      'Check with the manufacturer or your care team before putting any new product on your mask or skin.',
    ]),
    c('m9-06', 'My Nose or Mouth Feels Dry', [
      'PAP airflow can feel drying. Nasal saline and PAP humidification may make you more comfortable, but too much humidity can cause extra moisture in the mask. Talk with your healthcare or equipment team about dryness that doesn\'t go away.',
      'Check for a mask or mouth leak first, especially if you use a nasal mask or nasal pillows. If your device has a humidifier, ask whether a higher heat setting or heated tubing is right for you. Try to find a balance between comfort and water buildup.',
      'Saline spray or gel can help some people with a dry nose, and artificial saliva products may help some people with a dry mouth. Ask your care team before adding a chin strap or changing your mask type.',
    ], [
      'Dryness can be a sign of a leak, not just a need for more humidity.',
      'Change humidification a little at a time, and note whether the dryness or water buildup gets better.',
    ]),
    c('m9-07', 'My Mouth Opens While I Sleep', [
      'If your mouth often opens while you sleep, it may add to dry mouth and other PAP problems. Some people may need a full-face mask, and the healthcare team that prescribed your PAP can help you figure it out.',
      'With a nasal mask or nasal pillows, an open mouth can let air escape and dry your mouth. A stuffy nose can make this more likely, so bring up congestion when you talk with your team about it.',
      'Ask your care team whether a chin strap or a full-face mask fitted by a clinician is right for you. The best mask depends on fit, breathing comfort, leaks, and your treatment plan.',
    ], [
      'A mouth leak is a reason to review your mask, not to tighten every strap.',
      'Have your PAP team help you choose and fit any new mask.',
    ]),
    c('m9-08', 'I Have Congestion, Allergies, or Nasal Irritation', [
      'If your nose is stuffy or irritated, these steps may help:',
      '• Keep your PAP filters clean, and clean or replace them on the schedule in your device manual\n• Use the humidifier and heat options that fit your device and your comfort\n• Use distilled water as directed\n• Reduce dust, smoke, fragrances, and other irritants where you sleep',
      'Heated humidification or heated tubing may make you more comfortable. Saline spray or gel can help with nasal irritation. If congestion doesn\'t go away, ask your healthcare provider whether a nasal spray is right for you, especially during pregnancy.',
      'You can also ask whether a different mask would be easier to use while your nose is blocked.',
    ], [
      'Medication choices belong with your healthcare provider. This app doesn\'t choose or dose them.',
      'Congestion that doesn\'t go away, nosebleeds, or breathing that\'s getting worse needs a clinician to check it.',
    ]),
    easyPapCheck(
      'm9-q2',
      'You use a nasal mask, and your mouth feels dry every morning. Which of these could help?',
      [
        'Check whether air escapes through your mouth as you sleep.',
        'Tighten every strap on your mask as far as it will go.',
        'Turn off the humidifier so less water builds up in your mask.',
        'Skip PAP on nights when your mouth feels the driest.',
        'Ask your care team about a chin strap or a full-face mask.',
      ],
      ['c1', 'c5'],
      'Dry mouth with a nasal mask can come from air leaking through your mouth. Check for a mouth leak, and ask your care team about a chin strap or full-face mask.',
    ),
    // Part 3: bloating, cold air, and cleaning
    c('m9-09', 'I\'m Burping or Feeling Bloated', [
      'Burping or bloating may be a sign that you\'re swallowing air. Some PAP devices have a ramp feature that lowers the pressure while you fall asleep. Talk with your healthcare provider about pressure changes instead of making them yourself.',
      'Changing your sleep position or how you arrange your pillows may help some people. If your device has a ramp, ask your care team how to use it.',
      'Bloating that doesn\'t go away, is painful, or is getting worse needs a prompt review of your mask, pressure, and device mode. Your clinician may consider a comfort feature for breathing out, auto-PAP, or bilevel PAP when it\'s appropriate. These aren\'t changes to make on your own.',
    ], [
      'Don\'t keep raising or lowering your prescribed pressure to chase a symptom.',
      'Contact your care team if bloating is painful, keeps coming back, or stops you from using PAP.',
    ]),
    c('m9-10', 'The Air Feels Too Cold', [
      'The air from your PAP can feel cold. Changing the room temperature or using heated humidification, if you have it, may help.',
      'You can also ask about a heated tube or an insulating tube cover. Running the tubing over your chest or under a blanket may keep it warmer, if your device instructions allow it.',
      'If the cold air comes with a leak, whistling, or an irritated nose, check the mask seal and connections, and ask your equipment team to look at your setup.',
    ], [
      'Only use heated tubing or humidification options made for your device.',
      'Comfort changes don\'t replace a fit check when symptoms keep happening.',
    ]),
    c('m9-11', 'Cleaning PAP Equipment', [
      'Always check your machine\'s manual first. In general, cleaning includes mild soap, a good rinse, and air-drying the mask and humidifier parts, plus cleaning the tubing weekly and a deeper clean from time to time. Use distilled water in the humidifier as directed.',
      'Here\'s a simple routine:',
      '• Each morning, empty the humidifier chamber\n• Before bed, refill it with fresh distilled water\n• Wipe or wash the mask cushion as your manual directs\n• Wash mask parts, tubing, and headgear with warm water and mild soap on your device\'s schedule, then rinse and air-dry away from direct heat or sunlight',
      'Wipe the outside of the machine as directed, and clean or replace filters and other supplies on the manufacturer\'s schedule.',
      'Never put the machine in water, and don\'t use bleach, alcohol, harsh cleaners, household wipes, or cleaning devices that aren\'t approved for PAP equipment.',
      'Parts and materials vary, so your manufacturer\'s instructions come before any general schedule you find online.',
    ], [
      'Fresh distilled water and a steady empty-and-refill routine help reduce buildup in the humidifier chamber.',
      'Ask your equipment team when a part is damaged or due to be replaced.',
    ]),
    easyPapCheck(
      'm9-q3',
      'You\'ve been burping a lot, and it\'s also time to clean your PAP equipment. Which of these are good choices?',
      [
        'Ask your care team if a ramp feature could help the bloating.',
        'Lower your pressure yourself until the burping stops.',
        'Wash the machine itself in warm, soapy water once a week.',
        'Check your machine\'s manual first before you clean anything.',
        'Soak the tubing in diluted bleach to make sure it\'s fully clean.',
      ],
      ['c1', 'c4'],
      'A ramp feature and your care team can help with bloating, and your machine\'s manual should guide how you clean it.',
    ),
  ],
};
