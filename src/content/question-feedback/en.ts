import type { LocaleQuestionFeedback } from './types';

// One sentence per choice, shown inside that choice's card after the learner submits.
// Wording follows the CIAS feedback slides (docs/curriculum/CIAS_FEEDBACK_TRANSCRIPT.md); choices listed as
// `drafted` in keys.ts were written in the same voice because no slide covered them.
export const enQuestionFeedback: Record<string, LocaleQuestionFeedback> = {
  'm1-q1': { optionExplanations: {
    c1: 'Snoring is common with sleep apnea, but it isn’t required, so you can have sleep apnea without snoring.',
    c2: 'Snoring is common with sleep apnea, but it isn’t required, so not snoring doesn’t rule it out.',
  } },
  'm1-q2': { optionExplanations: {
    c1: 'PAP delivers pressurized air, not supplemental oxygen, to help keep your airway open.',
    c2: 'PAP uses gentle air pressure to help hold your airway open while you sleep.',
    c3: 'The mask is how the pressurized air from the PAP machine reaches your nose or mouth.',
    c4: 'Your PAP pressure is prescribed, so any change should go through your care team.',
    c5: 'Your PAP or sleep-care team can help with equipment and comfort questions.',
  } },
  'm3-q1': {
    optionExplanations: {
      c1: 'Untreated OSA often comes with other conditions, like diabetes, high blood pressure, and obesity, that raise the chance of a cesarean birth.',
      c2: 'Untreated OSA is more common alongside conditions like diabetes, high blood pressure, and obesity, and those raise the chance of a cesarean birth.',
    },
  },
  'm3-q3': { optionExplanations: {
    c1: 'The common cold is caused by contagious viruses that spread by exposure, and untreated OSA doesn’t meaningfully increase short-term infection risk.',
    c2: 'Untreated OSA causes repeated drops in oxygen and surges in stress hormones, which strain the heart and raise the risk of rhythm problems, heart failure, or other heart complications during delivery.',
    c3: 'Food poisoning comes from eating contaminated food, and sleep apnea doesn’t meaningfully increase the risk of getting it.',
    c4: 'Nosebleeds are usually caused by dry air, irritation, or blood thinners, and untreated OSA doesn’t increase the chance of them.',
  } },
  'm3-q4': { optionExplanations: {
    c1: 'Abnormally high birth weights are usually linked to maternal diabetes or obesity, while sleep-disordered breathing (SDB) is linked to the opposite.',
    c2: 'Studies have found a significant link between SDB and low birth weight, so normal birth weight isn’t the pattern they describe.',
    c3: 'Seven studies have linked SDB to low birth weight, likely because low oxygen and stress-hormone surges can reduce blood and nutrient flow through the placenta and slow the baby’s growth.',
  } },
  'm3-q5': { optionExplanations: {
    c1: 'Preeclampsia has been seen more often in pregnant people with sleep apnea, along with the high blood pressure that comes with it.',
    c2: 'Food allergies are important to manage, but research hasn’t shown that sleep apnea causes them.',
    c3: 'Lactose intolerance is important to manage, but research hasn’t shown that sleep apnea causes it.',
    c4: 'Low-oxygen events during sleep apnea raise your stress levels, which can push your blood pressure up.',
    c5: 'Low-oxygen events during sleep apnea raise your stress levels, which can increase insulin resistance and lead to high blood sugar.',
  } },
  'm4-q1': {
    generalExplanation: 'Sleep apnea during pregnancy puts you at risk for high blood pressure, high blood sugar, and preeclampsia, because low-oxygen events raise your stress levels.',
    optionExplanations: {
      c1: 'Preeclampsia is one of the conditions sleep apnea during pregnancy puts you at risk for, along with high blood pressure.',
      c2: 'Food allergies are important to manage, but research hasn’t shown that sleep apnea causes them.',
      c3: 'Lactose intolerance is important to manage, but research hasn’t shown that sleep apnea causes it.',
      c4: 'Low-oxygen events during sleep apnea raise your stress levels, which signals your body to raise your blood pressure.',
      c5: 'Low-oxygen events during sleep apnea raise your stress levels, which increases insulin resistance and leads to high blood sugar.',
    },
  },
  'm4-04': {
    generalExplanation: 'Gestational diabetes puts you at risk for high blood pressure and preeclampsia, obesity and type II diabetes, and needing a C-section for delivery.',
    optionExplanations: {
      c1: 'Asthma is an important problem to address, but research hasn’t shown that gestational diabetes causes it.',
      c2: 'Gestational diabetes raises the chance that you’ll need a C-section for delivery.',
      c3: 'Gestational diabetes puts you at higher risk for obesity and type II diabetes.',
      c4: 'Gestational diabetes puts you at higher risk for high blood pressure and preeclampsia.',
      c5: 'Broken bones are an important problem to address, but research hasn’t shown that gestational diabetes causes them.',
    },
  },
  'm4-q4': {
    generalExplanation: 'Gestational diabetes puts your baby at risk of Respiratory Distress Syndrome (RDS), excessive birth weight, premature birth, and stillbirth.',
    optionExplanations: {
      c1: 'Autism is an important condition to address, but research hasn’t shown that gestational diabetes increases the risk of it.',
      c2: 'Gestational diabetes puts your baby at risk of Respiratory Distress Syndrome (RDS), which makes it hard for a newborn to breathe.',
      c3: 'Extra sugar crosses the placenta and can make the baby grow larger than expected, which is called excessive birth weight.',
      c4: 'ADHD is an important condition to address, but research hasn’t shown that gestational diabetes increases the risk of it.',
      c5: 'Gestational diabetes puts your baby at risk of premature birth (born too early and underdeveloped) and stillbirth (born without any signs of life).',
    },
  },
  'm4-q6': {
    generalExplanation: 'Preeclampsia puts the mother at risk for serious heart issues and the baby at risk for fetal growth restriction.',
    optionExplanations: {
      c1: 'Tennis elbow is worth treating, but no research has shown that preeclampsia puts you at risk for it.',
      c2: 'Preeclampsia puts the mother at risk for serious heart issues, such as heart disease and heart failure, especially toward the end of pregnancy and even after it.',
      c3: 'Athlete’s foot is worth treating, but no research has shown that preeclampsia puts you at risk for it.',
      c4: 'Preeclampsia puts the baby at risk for fetal growth restriction, where the baby doesn’t grow enough in the womb.',
      c5: 'Cavities are worth treating, but no research has shown that preeclampsia puts you at risk for them.',
    },
  },
  'm4-q3': { optionExplanations: {
    c1: 'PAP keeps your airway open, which directly treats the blocked breathing of OSA during sleep.',
    c2: 'PAP treats OSA, but it can’t guarantee that every pregnancy complication will be prevented.',
    c3: 'PAP treats your breathing during sleep; gestational diabetes is managed with your prenatal care team.',
    c4: 'PAP works alongside your prenatal care and doesn’t replace it.',
  } },
  'm2-q2': {
    generalExplanation: 'Using CPAP when you sleep with your partner can improve energy for both of you and help your partner fall asleep faster.',
    optionExplanations: {
      c1: 'CPAP improves sleep quality for both of you, but it doesn’t sync up the times you fall asleep and wake up.',
      c2: 'You both sleep better when you use CPAP, and better sleep means better daytime energy for both of you.',
      c3: 'Using CPAP every night gives about double the partner benefit of using it every other night.',
      c4: 'CPAP can help prevent snoring, which gives your partner a more peaceful night and can help them fall asleep faster.',
    },
  },
  'm2-q1': {
    generalExplanation: 'True. Using CPAP when sleeping with a partner improves the partner’s sleep, and some couples also report higher relationship satisfaction.',
    optionExplanations: {
      c1: 'CPAP improves your partner’s sleep, and in one study 41% of bed partners also reported higher relationship satisfaction.',
      c2: 'This statement is true: CPAP improves your partner’s sleep, and some couples also report higher relationship satisfaction.',
    },
  },
  'm5-q5': { optionExplanations: {
    c1: 'Poor sleep weakens your immune system, because it lowers the production of helpful immune molecules.',
    c2: 'Poor sleep disrupts the chemicals that help keep your mood steady and keeps stress hormones high, which raises the risk of depression and low mood.',
    c3: 'Poor sleep won’t make a full-grown adult shorter, though it may blunt growth in people still going through puberty.',
    c4: 'Poor sleep has many consequences for both your physical and mental health.',
    c5: 'Poor sleep is consistently linked to body changes that raise the risk of diabetes, high blood pressure, high cholesterol, obesity, and more.',
    c6: 'Poor sleep can’t fully clear adenosine, the chemical that makes you sleepy, so you feel tired during the day even after sleeping.',
  } },
  'm5-q6': {
    generalExplanation: 'Poor sleep during pregnancy is linked with preterm birth, longer labors, and a higher chance of needing a C-section.',
    optionExplanations: {
      c1: 'Poor sleep may lower your pain tolerance and energy for contractions, which can lead to a labor that doesn’t progress and a C-section.',
      c2: 'Poor sleep won’t stop labor, though labor tends to be longer in women who sleep less than 6 hours.',
      c3: 'Sleep doesn’t affect the genes that decide physical traits like eye color.',
      c4: 'We don’t know yet whether a baby’s sleep habits are affected by mom’s sleep schedule.',
      c5: 'Studies show that pregnant women who sleep less than 6 hours often have significantly longer labors.',
      c6: 'Poor sleep is thought to increase inflammation throughout the body, which may signal early contractions.',
    },
  },
  'm5-q7': {
    generalExplanation: 'Regular exercise, nutritious meals, and daily sunshine all help improve your sleep.',
    optionExplanations: {
      c1: 'Exercise uses more of your body’s energy and builds up adenosine, the chemical that makes you sleepy, so you feel more tired at night.',
      c2: 'A big meal before bed makes your body work overtime to digest when it wants to slow down and rest.',
      c3: 'A long nap during the day makes it harder to fall asleep at bedtime and can throw off your body clock.',
      c4: 'A nutritious diet keeps your body out of an inflammatory state, which supports better sleep at night.',
      c5: 'Daily sunshine raises cortisol in the morning and holds off melatonin until bedtime, which sets your body clock.',
      c6: 'Caffeine blocks your ability to feel tired, so you’ll have a harder time falling asleep and get less deep sleep.',
    },
  },
  'm5-q1': {
    generalExplanation: 'A good sleep routine means avoiding blue light at night, keeping a consistent bedtime routine, and sleeping and waking at the same times.',
    optionExplanations: {
      c1: 'Avoiding blue light at night keeps your body from getting the signal to stay awake, so you feel sleepier.',
      c2: 'Your body clock thrives on consistency, and a steady bedtime routine helps your body and brain get ready for sleep.',
      c3: 'A consistent sleep and wake schedule lets your body release its sleepy chemicals at the right times each day.',
      c4: 'Besides the blue light, social media is designed to keep your brain active when it should be winding down.',
      c5: 'Like scrolling, streaming a show keeps your brain engaged and signals it to stay alert.',
      c6: 'Shifting your sleep by a few hours on weekends is like changing time zones every week, so Monday leaves you even more tired.',
    },
  },
  'm5-q9': { optionExplanations: {
    c1: 'Sunshine does contain blue light, which helps you stay awake during the day; blue light is only a problem at night.',
    c2: 'Sunshine holds back melatonin during the day, so more of it is released at night to get you ready for sleep.',
    c3: 'Melatonin is the sleepy chemical, so morning sunshine lowers it instead of raising it, which is what you want during the day.',
    c4: 'Morning sunshine tells your body when to be awake and when to sleep, which anchors your sleep schedule.',
    c5: 'Sunshine keeps you alert during the day, which builds the sleep drive that helps you fall asleep at night.',
    c6: 'Sunshine can warm your skin, but that isn’t how it helps you sleep.',
  } },
  'm5-q4': {
    generalExplanation: 'If you can’t fall asleep, get out of bed, do something quiet and relaxing in low light, and go back to bed when you feel sleepy.',
    optionExplanations: {
      c1: 'A quiet, relaxing activity keeps your heart rate low and helps you get sleepy enough to go back to bed soon.',
      c2: 'Leaving the bedroom keeps your brain linking your bed with sleep, not with lying awake.',
      c3: 'Checking the time raises your sleep anxiety and heart rate, which makes it much harder to fall asleep.',
      c4: 'Social media and news are designed to keep your brain awake and alert.',
      c5: 'Lying awake in bed teaches your brain to link your bed with worry and wakefulness, the opposite of what you want.',
      c6: 'Going back only when you feel sleepy helps your brain link your bed with sleep.',
    },
  },
  'm5-q3': { optionExplanations: {
    c1: 'Every pregnant person processes caffeine at a different speed, so some are advised to avoid it completely.',
    c2: 'In late pregnancy the liver processes caffeine more slowly, so it can stay in your bloodstream for 10 or more hours.',
    c3: '400 mg, about four 8 oz cups of coffee, is too much during pregnancy, because caffeine crosses the placenta and babies can’t process it the way adults do.',
    c4: 'Caffeine processing actually slows down, about 3-fold, in later pregnancy, so even morning caffeine can disrupt your sleep at night.',
    c5: 'The caffeine in your body is halved about every 5 hours, so about 25% of your morning coffee may still be there 10 hours later.',
    c6: 'Up to 200 mg a day is the general guidance, because at that amount your body can still clear caffeine and the dose isn’t high enough to affect the baby.',
  } },
  'm5-q2': {
    generalExplanation: 'A good sleep environment cuts out visual stimulation and noise disturbances and keeps the bedroom cool.',
    optionExplanations: {
      c1: 'Checking the time in bed makes you more anxious about lost sleep, raises your heart rate, and makes it harder to fall asleep.',
      c2: 'Your eyes can sense light even when they’re closed, which keeps your nervous system slightly alert and can hurt your sleep quality.',
      c3: 'Music keeps changing in volume and pitch, which stirs your brain even while you’re asleep and breaks up your sleep.',
      c4: 'A cool room (60–68°F) makes your body’s natural temperature drop easier, which lowers your heart rate and improves sleep.',
      c5: 'Your brain sleeps best with steady sound, like silence, white noise, or a fan, because it can tune it out.',
      c6: 'A warm room (75–82°F) makes your body work harder to cool down, so falling asleep and sleeping well get harder.',
    },
  },
  'm5-q11': { optionExplanations: {
    c1: 'Plain oatmeal is a good breakfast choice that’s high in fiber and low in calories.',
    c2: 'Too much caffeine can stay in your system until bedtime and make it harder to fall asleep.',
    c3: 'A quarter pounder is a highly processed burger, high in calories and saturated fat, which promote obesity and inflammation that worsen sleep.',
    c4: 'Leafy greens are rich in magnesium, which helps your muscles relax and supports better sleep.',
    c5: 'Potatoes are filling and rich in fiber, potassium, vitamin C, and vitamin B6.',
    c6: 'A Snickers bar is high in added sugar and saturated fat, which are linked with more night awakenings and less deep sleep.',
    c7: 'Berries are rich in fiber, polyphenols, and antioxidants, which are linked with less broken-up sleep and less inflammation.',
    c8: 'Chicken is a lean protein that helps you feel full and keeps your blood sugar steady.',
    c9: 'Plain Greek yogurt, ideally 0% fat, is a lean protein that keeps your blood sugar steady and helps you feel full.',
    c10: 'French fries are high in calories, saturated fat, and salt, much like chips; they’re fine once in a while.',
    c11: 'Chips are high in calories, saturated fat, and salt, and too much salt can make you wake up to pee at night.',
    c12: 'Alcohol, especially late at night, is known to break up sleep and worsen sleep quality.',
  } },
  'm5-q8': {
    generalExplanation: 'Current chrononutrition evidence supports eating more of your food earlier in the day and drinking more of your fluids earlier too.',
    optionExplanations: {
      c1: 'Your body signals fullness less well at night, so the opposite works better: breakfast like a king, dinner like a peasant.',
      c2: 'Drinking close to bedtime can make you wake up to pee, so hydrating earlier helps you go before bed.',
      c3: 'Your heart rate stays higher after a meal because digestion needs blood flow, so eating right before bed isn’t a good setup for sleep.',
      c4: 'Eating earlier actually improves your fullness signals, which reduces hunger late at night.',
      c5: 'Eating more of your calories early works with your body, which handles food better earlier and can then get ready for sleep.',
      c6: 'Research supports eating earlier in the day for fullness, diabetes prevention, and sleep quality.',
    },
  },
  'm5-q10': {
    generalExplanation: 'Use pillows for comfort, keep naps early and short, and sleep on your side after 28 weeks of pregnancy.',
    optionExplanations: {
      c1: 'Pillows are a great way to get comfortable, which helps improve your overall sleep quality.',
      c2: 'After 28 weeks, back sleeping lets the weight of the uterus press on major blood vessels, which can limit blood flow for you and your baby.',
      c3: 'Long naps late in the day can interfere with your sleep schedule and make it harder to fall asleep at night.',
      c4: 'A short, early nap of about 20 minutes gives you energy for the day without hurting your sleep that night.',
      c5: 'Don’t worry about clutter; being comfortable matters most, and pillows help with that.',
      c6: 'Side sleeping is often the most comfortable position later in pregnancy and keeps your uterus from pressing on your body.',
    },
  },
  'm6-q1': {
    generalExplanation: 'Heated humidity on your PAP machine, saline spray, and steroid nasal sprays are recommended for nasal congestion during pregnancy.',
    optionExplanations: {
      c1: 'Heated humidity on your PAP machine can help prevent dryness and nasal irritation while you sleep.',
      c2: 'Saline spray is a low-risk, over-the-counter option that moistens your nose, thins mucus, and flushes out allergens.',
      c3: 'Steroid nasal sprays like fluticasone or budesonide reduce swelling and mucus in your nose, which can ease congestion.',
      c4: 'Spraying straight up hits the middle wall of your nose, which can cause irritation and nosebleeds and misses the best spot, the outer lining.',
      c5: 'Using Afrin every night can cause rebound congestion, where you come to depend on the spray and get worse congestion when you stop.',
      c6: 'Antibiotics treat bacterial infections, so for nasal congestion they’re the wrong tool.',
    },
  },
  'm6-q2': {
    generalExplanation: 'Smaller, lower-fat meals, less caffeine, raising the head of the bed, and sleeping on your left side can all ease GERD during pregnancy.',
    optionExplanations: {
      c1: 'Smaller meals stretch your stomach less, and lower-fat meals digest faster, so food is less likely to sit in your stomach too long.',
      c2: 'Caffeine doesn’t cause GERD in everyone, but cutting back has helped some people’s symptoms.',
      c3: 'Raising the head of the bed helps keep stomach contents from flowing back up; raise your upper body with a wedge or bed frame, not just extra pillows under your head.',
      c4: 'Sleeping on your left side positions your stomach and esophagus in a way that reduces acid exposure and GERD symptoms.',
      c5: 'Antacids can help, but it’s generally healthier to try lifestyle changes first and avoid a medicine and its side effects if you can.',
      c6: 'Sleeping on your stomach doesn’t let gravity keep stomach contents down, and it gets harder as pregnancy goes on.',
    },
  },
  'm6-q3': {
    generalExplanation: 'Better sleep, diet, and exercise, less caffeine and alcohol, and counseling or CBT are recommended ways to treat anxiety during pregnancy.',
    optionExplanations: {
      c1: 'Good sleep, a healthy diet, and regular exercise lower stress and lift your mood, which are great ways to address anxiety.',
      c2: 'Caffeine can worsen restlessness and trouble sleeping, and alcohol’s calming effect is short-lived and can cause rebound anxiety.',
      c3: 'Counseling and CBT give you a safe space to work through fears and stress and to change thought patterns that feed anxiety.',
      c4: 'SSRIs are effective for anxiety, but they may not be needed if lifestyle changes and therapy help.',
      c5: 'Anxiety during pregnancy is common and worth addressing, especially when it causes distress or affects daily life.',
      c6: 'Cannabis can cause panic and paranoia, and its active chemical (THC) can pass to the baby and harm development.',
    },
  },
  'm7-04': {
    generalExplanation: 'Wear your PAP mask whenever you plan to sleep, including naps and any time you might doze off in bed.',
    optionExplanations: {
      c1: 'This is the main time to wear PAP: putting it on before sleep protects you from low-oxygen events while you’re unconscious.',
      c2: 'Sleep apnea happens when your airway collapses during sleep, so PAP doesn’t do much while you’re awake unless you’ll fall asleep right after.',
      c3: 'Naps count as sleep too, so wearing PAP for them matters for your health.',
      c4: 'Planning ahead for when you might doze off, and keeping your PAP machine within reach, is a smart idea.',
      c5: 'You can have sleep apnea without loud snoring, so wear PAP even if your partner doesn’t notice any symptoms.',
      c6: 'PAP treats breathing problems during sleep, so wearing it during sex gives no benefit, and no harm either.',
    },
  },
  'm7-q2': {
    generalExplanation: 'Pregnancy and sleep apnea can both change sex drive, and better sleep with CPAP may help restore energy and desire.',
    optionExplanations: {
      c1: 'Pregnancy brings big physical and emotional changes, and discomfort, stress, and fatigue can all affect desire.',
      c2: 'Poor sleep from sleep apnea can lower energy and desire, and it may also affect hormones, mood, and blood flow.',
      c3: 'CPAP can improve sleep quality over time, but it doesn’t always boost sex drive right away, and some people feel self-conscious wearing the mask.',
      c4: 'A change in sex drive during pregnancy is often normal and can come from body changes, fatigue, or stress.',
      c5: 'Better sleep with CPAP may help restore energy, desire, and blood flow, and reduce stress or anxiety.',
      c6: 'Sleep apnea can also affect sex drive through poor sleep, hormone changes, mood changes, and reduced blood flow.',
    },
  },
};
