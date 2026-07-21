import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import Animated, {
  Easing,
  Extrapolation,
  FadeInDown,
  FadeInUp,
  interpolate,
  type SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type Lesson = {
  id: string;
  section: string;
  title: string;
  summary: string;
  bullets: string[];
  check: {
    prompt: string;
    answer: string;
    choices: string[];
  };
};

const lessons: Lesson[] = [
  {
    id: 'osa-definition',
    section: 'OSA Basics',
    title: 'What is obstructive sleep apnea or OSA?',
    summary:
      'OSA is a sleep disorder where breathing is repeatedly interrupted during sleep because the airway narrows or becomes blocked.',
    bullets: [
      'Apnea means a pause in breathing. Sleep apnea means those pauses happen while sleeping.',
      'In OSA, the throat relaxes enough to narrow the airway, like pinching a straw while trying to breathe through it.',
      'The brain senses low oxygen and briefly wakes the body enough to breathe again, often without the person remembering.',
      'Those repeated interruptions can leave sleep unrefreshing and strain the body over time.',
    ],
    check: {
      prompt: 'What makes OSA obstructive?',
      answer: 'A narrowed or blocked airway interrupts breathing during sleep.',
      choices: [
        'A narrowed or blocked airway interrupts breathing during sleep.',
        'The lungs stop working during the day.',
        'The body needs less oxygen while asleep.',
      ],
    },
  },
  {
    id: 'symptoms-risk',
    section: 'OSA Basics',
    title: 'What are symptoms and risk factors for OSA?',
    summary:
      'Snoring is common, but OSA can show up in several ways and can happen even when someone does not snore.',
    bullets: [
      'Symptoms can include snoring, waking up gasping or choking, morning headaches, fatigue, daytime sleepiness, trouble focusing, mood changes, and high blood pressure over time.',
      'It is possible to have OSA even if you do not snore.',
      'Risk can increase with weight gain, pregnancy-related swelling, heart problems, difficult-to-control blood pressure, diabetes, stroke history, or family history of sleep apnea.',
      'A sleep study at home or in a sleep clinic checks breathing, oxygen level, heart rate, and other sleep signals.',
    ],
    check: {
      prompt: 'Which symptom belongs on an OSA watch list?',
      answer: 'Waking up gasping or choking.',
      choices: ['Waking up gasping or choking.', 'Always feeling refreshed.', 'Needing less sleep than usual.'],
    },
  },
  {
    id: 'why-treat',
    section: 'Why Treatment Matters',
    title: 'What happens if I do not treat my sleep apnea?',
    summary:
      'Treating OSA matters because untreated OSA can affect quality of life, long-term health, and pregnancy-related outcomes.',
    bullets: [
      'Untreated OSA can worsen daytime sleepiness, energy, focus, mood, and overall quality of life.',
      'Long-term risks discussed in the source include heart disease, stroke, type II diabetes, cognitive problems, and driving accidents related to sleepiness.',
      'During pregnancy, the document highlights additional concern because OSA has been associated with gestational diabetes, pregnancy-induced hypertension, preeclampsia, preterm birth, cesarean delivery, and newborn growth outcomes.',
      'The app should encourage patients to follow their clinician guidance and use treatment consistently.',
    ],
    check: {
      prompt: 'Why is treatment emphasized?',
      answer: 'Untreated OSA can affect daily function and long-term health.',
      choices: [
        'Untreated OSA can affect daily function and long-term health.',
        'OSA only matters if someone snores loudly.',
        'OSA usually resolves by ignoring symptoms.',
      ],
    },
  },
  {
    id: 'treatment-options',
    section: 'Treating OSA',
    title: 'How do I treat my OSA?',
    summary:
      'The document centers positive airway pressure therapy while also noting lifestyle, positional, medication, dental, and surgical options that clinicians may discuss.',
    bullets: [
      'Positive airway pressure, including CPAP, is a core treatment approach.',
      'A healthy body weight, regular movement, side sleeping, bed positioning, and treating nasal congestion may help some patients.',
      'Alcohol near bedtime, smoking, vaping, and sedating medications can worsen OSA for some people.',
      'Medication, dental devices, or surgery may be options for specific patients, but they require clinician guidance.',
    ],
    check: {
      prompt: 'Which treatment is central to this app?',
      answer: 'Positive airway pressure such as CPAP.',
      choices: ['Positive airway pressure such as CPAP.', 'Skipping sleep studies.', 'Using alcohol to relax before bed.'],
    },
  },
  {
    id: 'cpap-machine',
    section: 'CPAP Basics',
    title: 'What is a CPAP machine?',
    summary:
      'A CPAP machine is a medical device that sends prescribed pressurized air through tubing and a mask to help keep the airway open during sleep.',
    bullets: [
      'CPAP stands for continuous positive airway pressure.',
      'Basic parts include the machine, tubing, and a mask that fits over the nose or nose and mouth.',
      'CPAP is one type of positive airway pressure. Some patients may use auto-CPAP or another PAP mode.',
      'The goal is to reduce breathing interruptions so sleep is safer and more restorative.',
    ],
    check: {
      prompt: 'What does CPAP help do?',
      answer: 'Keep the airway open with pressurized air.',
      choices: ['Keep the airway open with pressurized air.', 'Replace normal breathing.', 'Diagnose OSA without a sleep study.'],
    },
  },
  {
    id: 'getting-started',
    section: 'Getting Started',
    title: 'How do I get started using a CPAP machine?',
    summary:
      'Getting used to CPAP is gradual. The source recommends practicing before expecting full-night comfort.',
    bullets: [
      'Start by getting familiar with the mask, tubing, and machine while awake.',
      'Try using CPAP while sitting upright at home before moving it into the bedroom.',
      'Build toward short rest periods, scheduled naps, part of the night, and then a full night of sleep.',
      'Use CPAP anytime you sleep when possible, including naps, because untreated sleep periods still allow OSA events.',
    ],
    check: {
      prompt: 'What is a realistic CPAP start?',
      answer: 'Practice gradually while awake, then build toward sleep use.',
      choices: [
        'Practice gradually while awake, then build toward sleep use.',
        'Expect perfect comfort on the first night.',
        'Use it only after symptoms become severe.',
      ],
    },
  },
  {
    id: 'comfort-troubleshooting',
    section: 'Troubleshooting',
    title: 'What if the mask feels uncomfortable or leaks air?',
    summary:
      'Mask fit problems are common and fixable. The app should normalize troubleshooting instead of treating discomfort as failure.',
    bullets: [
      'If the mask presses too hard, moves around, or leaks, the fit, strap tension, or mask style may need adjustment.',
      'Air leaking toward the eyes can cause redness or soreness and should be addressed.',
      'Dry nose or mouth may improve with humidification, mask adjustments, or clinician-recommended changes.',
      'Skin irritation, possible allergy, bloating, cold air, whistling, or water leaks are reasons to check setup and ask the care team or equipment supplier for help.',
    ],
    check: {
      prompt: 'What should a patient do with persistent mask leak?',
      answer: 'Adjust fit and contact the care team or equipment supplier.',
      choices: [
        'Adjust fit and contact the care team or equipment supplier.',
        'Stop treatment permanently.',
        'Tighten straps as much as possible every time.',
      ],
    },
  },
  {
    id: 'cleaning-travel',
    section: 'Daily Use',
    title: 'How do I clean CPAP and continue when traveling?',
    summary:
      'Cleaning and travel planning help CPAP remain practical as part of normal life.',
    bullets: [
      'The source includes cleaning frequency, cleaning steps, travel use, and flying with CPAP as dedicated app topics.',
      'Patients should follow the device maker and equipment supplier instructions for cleaning the mask, tubing, humidifier chamber, and filters.',
      'For travel, pack the CPAP, mask, tubing, power supply, and needed accessories together.',
      'CPAP machines can typically be brought when flying, but patients should check airline and security guidance before travel.',
    ],
    check: {
      prompt: 'What makes CPAP travel easier?',
      answer: 'Packing the machine, mask, tubing, power supply, and accessories together.',
      choices: [
        'Packing the machine, mask, tubing, power supply, and accessories together.',
        'Leaving the power supply at home.',
        'Skipping CPAP for all trips.',
      ],
    },
  },
  {
    id: 'healthy-sleep',
    section: 'Healthy Sleep',
    title: 'How can I improve sleep quality?',
    summary:
      'The source treats healthy sleep as a separate section because CPAP works best alongside consistent sleep habits.',
    bullets: [
      'Prioritize regular, good-quality sleep, especially when OSA is present.',
      'A steady sleep schedule, a comfortable sleep environment, and attention to congestion or allergies can support better nights.',
      'Pregnancy can increase sleepiness, but severe or unsafe sleepiness should be discussed with a clinician.',
      'Avoid alcohol close to bedtime and ask about medications that may worsen drowsiness or breathing during sleep.',
    ],
    check: {
      prompt: 'Which habit supports OSA care?',
      answer: 'Avoiding alcohol close to bedtime.',
      choices: ['Avoiding alcohol close to bedtime.', 'Ignoring nasal congestion.', 'Changing medications without clinician input.'],
    },
  },
  {
    id: 'intimacy-support',
    section: 'Intimacy and Support',
    title: 'How can CPAP fit into relationships and intimacy?',
    summary:
      'The document includes intimacy, dating, partner impact, and communication because OSA treatment affects real home life.',
    bullets: [
      'OSA can affect energy, mood, libido, and partner sleep.',
      'Wearing CPAP does not need to prevent closeness or sex; timing, communication, and confidence can help.',
      'Partners may need reassurance and practical information about the machine, sound, mask, and treatment benefits.',
      'Dating with sleep apnea can include honest, simple explanations when the patient feels ready.',
    ],
    check: {
      prompt: 'What helps CPAP fit into relationships?',
      answer: 'Clear communication and practical planning.',
      choices: ['Clear communication and practical planning.', 'Hiding treatment from everyone.', 'Assuming CPAP ends intimacy.'],
    },
  },
];

const sections = ['All', ...Array.from(new Set(lessons.map((lesson) => lesson.section)))];
const { width: screenWidth } = Dimensions.get('window');
const HERO_HEIGHT = 462;
const HEADER_TRIGGER = 132;
const STORY_SCENE_HEIGHT = 620;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedImage = Animated.createAnimatedComponent(Image);

const storyScenes: {
  kicker: string;
  title: string;
  body: string;
  image: ImageSource;
  color: string;
  secondaryColor: string;
  imageAnchor: 'left' | 'center' | 'right';
}[] = [
  {
    kicker: 'Breathe',
    title: 'CPAP turns breathing into a steady rhythm.',
    body: 'A full-face mask, hose, and bedside machine stay recognizable while airflow builds in layers.',
    image: require('@/assets/images/sleep-cartoon-fullface-pregnant.png'),
    color: '#67e8f9',
    secondaryColor: '#c4b5fd',
    imageAnchor: 'left',
  },
  {
    kicker: 'Fit',
    title: 'Mask fit is the visual focus.',
    body: 'A nasal mask and headgear become a close-up moment for comfort and patient confidence.',
    image: require('@/assets/images/sleep-cartoon-nasal-pregnant.png'),
    color: '#bae6fd',
    secondaryColor: '#99f6e4',
    imageAnchor: 'center',
  },
  {
    kicker: 'Setup',
    title: 'The bedtime routine becomes a sequence.',
    body: 'Machine, humidifier chamber, tubing, and mask animate as a practical setup checklist.',
    image: require('@/assets/images/sleep-cartoon-setup-pregnant.png'),
    color: '#fde68a',
    secondaryColor: '#67e8f9',
    imageAnchor: 'right',
  },
];

function FloatingOrb({
  scrollY,
  ambient,
  reduceMotion,
  size,
  color,
  top,
  left,
  speed,
  driftX,
  driftY,
}: {
  scrollY: SharedValue<number>;
  ambient: SharedValue<number>;
  reduceMotion: boolean;
  size: number;
  color: string;
  top: number;
  left: number;
  speed: number;
  driftX: number;
  driftY: number;
}) {
  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: reduceMotion
          ? 0
          : interpolate(ambient.value, [0, 1], [driftX * -0.5, driftX], Extrapolation.CLAMP),
      },
      {
        translateY:
          interpolate(scrollY.value, [-80, 0, HERO_HEIGHT], [22, 0, -HERO_HEIGHT * speed], Extrapolation.CLAMP) +
          (reduceMotion ? 0 : interpolate(ambient.value, [0, 1], [driftY, driftY * -0.7], Extrapolation.CLAMP)),
      },
      { scale: interpolate(scrollY.value, [0, HERO_HEIGHT], [1, 0.86], Extrapolation.CLAMP) },
    ],
    opacity: interpolate(scrollY.value, [0, HERO_HEIGHT * 0.85], [1, 0.18], Extrapolation.CLAMP),
  }));

  return <Animated.View pointerEvents="none" style={[styles.orb, { backgroundColor: color, height: size, left, top, width: size }, style]} />;
}

function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Animated.View entering={FadeInUp.delay(delay).duration(420).springify().damping(18).stiffness(130)}>
      {children}
    </Animated.View>
  );
}

function ScrollyScene({
  scene,
  index,
  scrollY,
  ambient,
  reduceMotion,
}: {
  scene: (typeof storyScenes)[number];
  index: number;
  scrollY: SharedValue<number>;
  ambient: SharedValue<number>;
  reduceMotion: boolean;
}) {
  const start = HERO_HEIGHT + 72 + index * STORY_SCENE_HEIGHT;
  const end = start + STORY_SCENE_HEIGHT;

  const frameStyle = useAnimatedStyle(() => {
    const enter = interpolate(scrollY.value, [start - 260, start + 80], [52, 0], Extrapolation.CLAMP);
    const exit = interpolate(scrollY.value, [end - 140, end + 90], [0, -46], Extrapolation.CLAMP);
    return {
      opacity: interpolate(scrollY.value, [start - 260, start + 40, end - 120, end + 80], [0.18, 1, 1, 0.28], Extrapolation.CLAMP),
      transform: [{ translateY: enter + exit }],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    const scrub = interpolate(scrollY.value, [start - 220, end + 120], [-92, 92], Extrapolation.CLAMP);
    const idleY = reduceMotion ? 0 : interpolate(ambient.value, [0, 1], [-16, 16], Extrapolation.CLAMP);
    const idleRotate = reduceMotion ? 0 : interpolate(ambient.value, [0, 1], [-1.4, 1.4], Extrapolation.CLAMP);
    return {
      transform: [
        { translateY: scrub * 0.46 + idleY },
        { translateX: reduceMotion ? 0 : interpolate(ambient.value, [0, 1], [10, -10], Extrapolation.CLAMP) },
        { scale: interpolate(scrollY.value, [start - 180, start + 180, end], [1.12, 1, 1.2], Extrapolation.CLAMP) },
        { rotate: `${interpolate(scrollY.value, [start, end], [-3, 3], Extrapolation.CLAMP) + idleRotate}deg` },
      ],
    };
  });

  const glowStyle = useAnimatedStyle(() => ({
    opacity: reduceMotion ? 0.42 : interpolate(ambient.value, [0, 1], [0.28, 0.64], Extrapolation.CLAMP),
    transform: [
      { translateY: reduceMotion ? 0 : interpolate(ambient.value, [0, 1], [18, -18], Extrapolation.CLAMP) },
      { scale: reduceMotion ? 1 : interpolate(ambient.value, [0, 1], [0.92, 1.18], Extrapolation.CLAMP) },
    ],
  }));

  const airflowStyle = useAnimatedStyle(() => {
    const scrollSweep = interpolate(scrollY.value, [start - 120, end], [-150, 170], Extrapolation.CLAMP);
    const idleSweep = reduceMotion ? 0 : interpolate(ambient.value, [0, 1], [-22, 22], Extrapolation.CLAMP);
    return {
      opacity: interpolate(scrollY.value, [start - 220, start + 90, end - 80, end + 80], [0, 0.82, 0.82, 0], Extrapolation.CLAMP),
      transform: [
        { translateX: scrollSweep + idleSweep },
        { translateY: reduceMotion ? 0 : interpolate(ambient.value, [0, 1], [8, -8], Extrapolation.CLAMP) },
        { rotate: '-18deg' },
        { scaleX: interpolate(scrollY.value, [start, end], [0.8, 1.35], Extrapolation.CLAMP) },
      ],
    };
  });

  const maskRevealStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [start - 180, start + 100, end - 120], [0.12, 0.5, 0.18], Extrapolation.CLAMP),
    transform: [
      { translateX: interpolate(scrollY.value, [start - 140, end], [-90, 80], Extrapolation.CLAMP) },
      { scale: reduceMotion ? 1 : interpolate(ambient.value, [0, 1], [0.96, 1.06], Extrapolation.CLAMP) },
    ],
  }));

  const checkmarkStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [start + 120, start + 260, end - 80], [0, 1, 1], Extrapolation.CLAMP),
    transform: [
      { translateY: interpolate(scrollY.value, [start + 80, start + 260], [32, 0], Extrapolation.CLAMP) },
      { scale: reduceMotion ? 1 : interpolate(ambient.value, [0, 1], [0.94, 1.08], Extrapolation.CLAMP) },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [start - 180, start + 80, end - 140], [0, 1, 1], Extrapolation.CLAMP),
    transform: [
      { translateY: interpolate(scrollY.value, [start - 180, start + 90, end], [36, 0, -18], Extrapolation.CLAMP) },
    ],
  }));

  return (
    <Animated.View style={[styles.storyScene, frameStyle]}>
      <View style={styles.storyVisualClip}>
        <AnimatedImage
          accessibilityLabel={`${scene.title} ${scene.body}`}
          contentFit="cover"
          source={scene.image}
          style={[
            styles.storyImage,
            scene.imageAnchor === 'left' && styles.storyImageLeft,
            scene.imageAnchor === 'right' && styles.storyImageRight,
            imageStyle,
          ]}
        />
        <Animated.View style={[styles.storyMaskReveal, { backgroundColor: scene.secondaryColor }, maskRevealStyle]} />
        <Animated.View style={[styles.airflowRibbon, { backgroundColor: scene.color }, airflowStyle]} />
        <Animated.View style={[styles.airflowRibbonSmall, { backgroundColor: scene.secondaryColor }, airflowStyle]} />
        <Animated.View style={[styles.storyGlow, { backgroundColor: scene.color }, glowStyle]} />
        <Animated.View style={[styles.storyOrbit, glowStyle]} />
        <Animated.View style={[styles.storyCheck, { borderColor: scene.color }, checkmarkStyle]}>
          <View style={[styles.storyCheckStem, { backgroundColor: scene.color }]} />
          <View style={[styles.storyCheckArm, { backgroundColor: scene.color }]} />
        </Animated.View>
      </View>

      <Animated.View style={[styles.storyTextPanel, textStyle]}>
        <Text style={[styles.storyKicker, { color: scene.color }]}>{scene.kicker}</Text>
        <Text style={styles.storyTitle}>{scene.title}</Text>
        <Text style={styles.storyBody}>{scene.body}</Text>
      </Animated.View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const [activeSection, setActiveSection] = useState('All');
  const [activeLessonId, setActiveLessonId] = useState(lessons[0].id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const visibleLessons = useMemo(
    () => lessons.filter((lesson) => activeSection === 'All' || lesson.section === activeSection),
    [activeSection],
  );

  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) ?? visibleLessons[0] ?? lessons[0];
  const completedChecks = lessons.filter((lesson) => selectedAnswers[lesson.id] === lesson.check.answer).length;
  const progress = Math.round((completedChecks / lessons.length) * 100);
  const scrollY = useSharedValue(0);
  const ambient = useSharedValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      ambient.value = withTiming(0, { duration: 180 });
      return;
    }

    ambient.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [ambient, reduceMotion]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const heroStyle = useAnimatedStyle(() => {
    const motionScale = reduceMotion ? 0 : 1;
    return {
      opacity: interpolate(scrollY.value, [0, HERO_HEIGHT * 0.88], [1, 0.12], Extrapolation.CLAMP),
      transform: [
        { translateY: interpolate(scrollY.value, [-120, 0, HERO_HEIGHT], [-22, 0, HERO_HEIGHT * -0.22 * motionScale], Extrapolation.CLAMP) },
        { scale: interpolate(scrollY.value, [-120, 0, HERO_HEIGHT], [1.08, 1, 0.96], Extrapolation.CLAMP) },
      ],
    };
  });

  const heroImageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          interpolate(scrollY.value, [-120, 0, HERO_HEIGHT], [-34, 0, HERO_HEIGHT * -0.36], Extrapolation.CLAMP) +
          (reduceMotion ? 0 : interpolate(ambient.value, [0, 1], [0, -10], Extrapolation.CLAMP)),
      },
      {
        rotate: `${interpolate(scrollY.value, [0, HERO_HEIGHT], [-7, 4], Extrapolation.CLAMP) +
          (reduceMotion ? 0 : interpolate(ambient.value, [0, 1], [-1.2, 1.2], Extrapolation.CLAMP))}deg`,
      },
      { scale: interpolate(scrollY.value, [-120, 0, HERO_HEIGHT], [1.12, 1, 0.92], Extrapolation.CLAMP) },
    ],
  }));

  const ringOuterStyle = useAnimatedStyle(() => ({
    opacity: reduceMotion ? 1 : interpolate(ambient.value, [0, 1], [0.82, 1], Extrapolation.CLAMP),
    transform: [{ scale: reduceMotion ? 1 : interpolate(ambient.value, [0, 1], [0.94, 1.08], Extrapolation.CLAMP) }],
  }));

  const ringMiddleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: reduceMotion ? 1 : interpolate(ambient.value, [0, 1], [1.04, 0.94], Extrapolation.CLAMP) }],
  }));

  const ringInnerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: reduceMotion ? 1 : interpolate(ambient.value, [0, 1], [0.98, 1.06], Extrapolation.CLAMP) }],
  }));

  const headerBarStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [HEADER_TRIGGER - 42, HEADER_TRIGGER], [0, 1], Extrapolation.CLAMP),
    transform: [{ translateY: interpolate(scrollY.value, [80, HEADER_TRIGGER], [-14, 0], Extrapolation.CLAMP) }],
  }));

  const progressFillStyle = useAnimatedStyle(() => ({
    width: `${progress}%`,
  }), [progress]);

  const selectSection = (section: string) => {
    setActiveSection(section);
    const firstLesson = lessons.find((lesson) => section === 'All' || lesson.section === section);
    if (firstLesson) {
      setActiveLessonId(firstLesson.id);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View pointerEvents="none" style={[styles.floatingHeader, headerBarStyle]}>
        <Text style={styles.floatingHeaderTitle}>EZ-PAP Learn</Text>
        <Text style={styles.floatingHeaderProgress}>{progress}% complete</Text>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.content}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}>
        <Animated.View style={[styles.hero, heroStyle]}>
          <FloatingOrb
            ambient={ambient}
            color="#7dd3fc"
            driftX={10}
            driftY={-12}
            left={screenWidth - 178}
            reduceMotion={reduceMotion}
            scrollY={scrollY}
            size={178}
            speed={0.18}
            top={-52}
          />
          <FloatingOrb
            ambient={ambient}
            color="#99f6e4"
            driftX={-8}
            driftY={14}
            left={-42}
            reduceMotion={reduceMotion}
            scrollY={scrollY}
            size={126}
            speed={0.32}
            top={174}
          />
          <FloatingOrb
            ambient={ambient}
            color="#fef3c7"
            driftX={14}
            driftY={8}
            left={screenWidth * 0.1}
            reduceMotion={reduceMotion}
            scrollY={scrollY}
            size={84}
            speed={0.48}
            top={218}
          />

          <View style={styles.heroTextBlock}>
            <Text style={styles.eyebrow}>CIAS EZ-PAP education</Text>
            <Text style={styles.title}>Learn OSA and CPAP one question at a time.</Text>
            <Text style={styles.subtitle}>
              Clickable lessons, short teaching points, and quick checks for CPAP readiness.
            </Text>
          </View>

          <Animated.View style={[styles.deviceCard, heroImageStyle]}>
            <View style={styles.deviceTopBar}>
              <View style={styles.deviceDot} />
              <View style={styles.devicePill} />
            </View>
            <View style={styles.breathingRings}>
              <Animated.View style={[styles.ringOuter, ringOuterStyle]}>
                <Animated.View style={[styles.ringMiddle, ringMiddleStyle]}>
                  <Animated.View style={[styles.ringInner, ringInnerStyle]}>
                    <Text style={styles.ringText}>{progress}%</Text>
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            </View>
            <Text style={styles.deviceLabel}>Nightly progress</Text>
          </Animated.View>

          <View style={styles.progressPanel}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Knowledge checks</Text>
              <Text style={styles.progressValue}>{progress}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, progressFillStyle]} />
            </View>
          </View>
        </Animated.View>

        <View style={styles.storyRail}>
          {storyScenes.map((scene, index) => (
            <ScrollyScene
              ambient={ambient}
              index={index}
              key={scene.title}
              reduceMotion={reduceMotion}
              scene={scene}
              scrollY={scrollY}
            />
          ))}
        </View>

        <View style={styles.stickyTabs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sectionTabs}>
          {sections.map((section) => {
            const selected = section === activeSection;
            return (
              <AnimatedPressable
                key={section}
                onPress={() => selectSection(section)}
                entering={FadeInDown.delay(70).duration(300)}
                style={[styles.sectionTab, selected && styles.sectionTabActive]}>
                <Text style={[styles.sectionTabText, selected && styles.sectionTabTextActive]}>{section}</Text>
              </AnimatedPressable>
            );
          })}
          </ScrollView>
        </View>

        <View style={styles.lessonList}>
          {visibleLessons.map((lesson, index) => {
            const selected = lesson.id === activeLesson.id;
            const isComplete = selectedAnswers[lesson.id] === lesson.check.answer;
            return (
              <Reveal key={lesson.id} delay={Math.min(index * 55, 360)}>
                <AnimatedPressable
                  onPress={() => setActiveLessonId(lesson.id)}
                  style={({ pressed }) => [
                    styles.lessonRow,
                    selected && styles.lessonRowActive,
                    pressed && styles.pressed,
                  ]}>
                  <View style={[styles.lessonNumber, selected && styles.lessonNumberActive]}>
                    <Text style={[styles.lessonNumberText, selected && styles.lessonNumberTextActive]}>{index + 1}</Text>
                  </View>
                  <View style={styles.lessonRowText}>
                    <Text style={styles.lessonSection}>{lesson.section}</Text>
                    <Text style={styles.lessonRowTitle}>{lesson.title}</Text>
                  </View>
                  <Text style={[styles.checkStatus, isComplete && styles.checkStatusDone]}>{isComplete ? 'Done' : 'Open'}</Text>
                </AnimatedPressable>
              </Reveal>
            );
          })}
        </View>

        <Reveal>
          <View style={styles.lessonCard}>
            <Text style={styles.cardSection}>{activeLesson.section}</Text>
            <Text style={styles.cardTitle}>{activeLesson.title}</Text>
            <Text style={styles.cardSummary}>{activeLesson.summary}</Text>

            <View style={styles.bulletList}>
              {activeLesson.bullets.map((bullet, index) => (
                <Animated.View
                  entering={FadeInUp.delay(index * 70).duration(320)}
                  key={bullet}
                  style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{bullet}</Text>
                </Animated.View>
              ))}
            </View>
          </View>
        </Reveal>

        <Reveal>
          <View style={styles.checkCard}>
            <Text style={styles.checkLabel}>Quick check</Text>
            <Text style={styles.checkPrompt}>{activeLesson.check.prompt}</Text>
            {activeLesson.check.choices.map((choice) => {
              const selected = selectedAnswers[activeLesson.id] === choice;
              const correct = selected && choice === activeLesson.check.answer;
              const incorrect = selected && choice !== activeLesson.check.answer;
              return (
                <Pressable
                  key={choice}
                  onPress={() => setSelectedAnswers((current) => ({ ...current, [activeLesson.id]: choice }))}
                  style={({ pressed }) => [
                    styles.answerButton,
                    correct && styles.answerCorrect,
                    incorrect && styles.answerIncorrect,
                    pressed && styles.pressed,
                  ]}>
                  <Text style={styles.answerText}>{choice}</Text>
                </Pressable>
              );
            })}
            {selectedAnswers[activeLesson.id] ? (
              <Animated.Text
                entering={FadeInUp.duration(260)}
                style={styles.feedbackText}>
                {selectedAnswers[activeLesson.id] === activeLesson.check.answer
                  ? 'Correct. Keep going through the EZ-PAP questions.'
                  : 'Review the teaching points above, then try another answer.'}
              </Animated.Text>
            ) : null}
          </View>
        </Reveal>

        <Reveal>
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>Source basis</Text>
            <Text style={styles.noteText}>
              This screen follows the CIS/CIAS EZ-PAP document structure: OSA basics, treatment, CPAP onboarding,
              troubleshooting, healthy sleep, travel/cleaning, and intimacy support. It is educational and should not replace a clinician&apos;s instructions.
            </Text>
          </View>
        </Reveal>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 112,
  },
  floatingHeader: {
    position: 'absolute',
    top: 8,
    left: 18,
    right: 18,
    zIndex: 20,
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(15,118,110,0.18)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 7,
  },
  floatingHeaderTitle: {
    color: '#12343b',
    fontWeight: '900',
  },
  floatingHeaderProgress: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '900',
  },
  hero: {
    backgroundColor: '#12343b',
    minHeight: HERO_HEIGHT,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    padding: 22,
    marginHorizontal: -18,
    marginBottom: 0,
    overflow: 'hidden',
    paddingTop: 28,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.16,
  },
  heroTextBlock: {
    maxWidth: 318,
    zIndex: 2,
  },
  eyebrow: {
    color: '#9fd8d2',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    color: '#dbe9ea',
    fontSize: 15,
    lineHeight: 22,
  },
  deviceCard: {
    position: 'absolute',
    right: 18,
    bottom: 76,
    width: 152,
    height: 194,
    borderRadius: 24,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',
    padding: 12,
    shadowColor: '#020617',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  deviceTopBar: {
    height: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  deviceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#14b8a6',
  },
  devicePill: {
    width: 46,
    height: 7,
    borderRadius: 999,
    backgroundColor: '#cbd5e1',
  },
  breathingRings: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringOuter: {
    width: 106,
    height: 106,
    borderRadius: 53,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringMiddle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#99f6e4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#0f766e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    color: '#ffffff',
    fontWeight: '900',
  },
  deviceLabel: {
    color: '#164e63',
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },
  progressPanel: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 18,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    zIndex: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#25444a',
    fontWeight: '800',
  },
  progressValue: {
    color: '#0f766e',
    fontWeight: '900',
  },
  progressTrack: {
    height: 9,
    backgroundColor: '#dbe9ea',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0f766e',
    borderRadius: 999,
  },
  storyRail: {
    gap: 18,
    marginHorizontal: -18,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#071f26',
  },
  storyScene: {
    minHeight: STORY_SCENE_HEIGHT,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#0b2a32',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.18)',
    shadowColor: '#020617',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.28,
    shadowRadius: 28,
    elevation: 10,
  },
  storyVisualClip: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  storyImage: {
    position: 'absolute',
    top: -72,
    left: -34,
    right: -34,
    height: STORY_SCENE_HEIGHT + 154,
  },
  storyImageLeft: {
    left: -52,
    right: -12,
  },
  storyImageRight: {
    left: -62,
    right: -56,
  },
  storyMaskReveal: {
    position: 'absolute',
    left: -70,
    top: 120,
    width: 230,
    height: 430,
    borderRadius: 120,
    opacity: 0.4,
  },
  airflowRibbon: {
    position: 'absolute',
    left: -40,
    top: 330,
    width: 260,
    height: 22,
    borderRadius: 999,
    opacity: 0.58,
  },
  airflowRibbonSmall: {
    position: 'absolute',
    left: 82,
    top: 382,
    width: 150,
    height: 10,
    borderRadius: 999,
    opacity: 0.5,
  },
  storyGlow: {
    position: 'absolute',
    right: -42,
    bottom: 136,
    width: 178,
    height: 178,
    borderRadius: 89,
  },
  storyOrbit: {
    position: 'absolute',
    left: 24,
    bottom: 220,
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  storyCheck: {
    position: 'absolute',
    right: 24,
    top: 44,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(4,18,24,0.56)',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyCheckStem: {
    position: 'absolute',
    left: 28,
    top: 16,
    width: 9,
    height: 24,
    borderRadius: 999,
    transform: [{ rotate: '45deg' }],
  },
  storyCheckArm: {
    position: 'absolute',
    left: 18,
    top: 24,
    width: 9,
    height: 15,
    borderRadius: 999,
    transform: [{ rotate: '-45deg' }],
  },
  storyTextPanel: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    borderRadius: 22,
    padding: 18,
    backgroundColor: 'rgba(4,18,24,0.78)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  storyKicker: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  storyTitle: {
    color: '#ffffff',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '900',
    marginBottom: 8,
  },
  storyBody: {
    color: '#dbeafe',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  stickyTabs: {
    backgroundColor: '#f5f7fb',
    marginHorizontal: -18,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 8,
    zIndex: 10,
  },
  sectionTabs: {
    gap: 8,
    paddingVertical: 4,
    paddingRight: 18,
  },
  sectionTab: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 9,
    justifyContent: 'center',
  },
  sectionTabActive: {
    backgroundColor: '#0f766e',
    borderColor: '#0f766e',
  },
  sectionTabText: {
    color: '#334155',
    fontWeight: '800',
    fontSize: 12,
  },
  sectionTabTextActive: {
    color: '#ffffff',
  },
  lessonList: {
    gap: 10,
    marginTop: 12,
    marginBottom: 14,
  },
  lessonRow: {
    minHeight: 74,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  lessonRowActive: {
    borderColor: '#0f766e',
    backgroundColor: '#eefdfa',
    shadowColor: '#0f766e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 4,
  },
  pressed: {
    opacity: 0.78,
  },
  lessonNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
  },
  lessonNumberActive: {
    backgroundColor: '#0f766e',
  },
  lessonNumberText: {
    color: '#334155',
    fontWeight: '900',
  },
  lessonNumberTextActive: {
    color: '#ffffff',
  },
  lessonRowText: {
    flex: 1,
  },
  lessonSection: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 2,
  },
  lessonRowTitle: {
    color: '#0f172a',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
  },
  checkStatus: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '800',
  },
  checkStatusDone: {
    color: '#0f766e',
  },
  lessonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 14,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  cardSection: {
    color: '#0f766e',
    fontWeight: '900',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#0f172a',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  cardSummary: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  bulletList: {
    gap: 11,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 10,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0f766e',
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    color: '#1e293b',
    fontSize: 15,
    lineHeight: 22,
  },
  checkCard: {
    backgroundColor: '#fff7ed',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#fed7aa',
    marginBottom: 14,
  },
  checkLabel: {
    color: '#9a3412',
    fontWeight: '900',
    marginBottom: 6,
  },
  checkPrompt: {
    color: '#111827',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '900',
    marginBottom: 12,
  },
  answerButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fdba74',
    borderRadius: 12,
    padding: 12,
    marginBottom: 9,
  },
  answerCorrect: {
    borderColor: '#0f766e',
    backgroundColor: '#ecfdf5',
  },
  answerIncorrect: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  answerText: {
    color: '#1f2937',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  feedbackText: {
    color: '#7c2d12',
    fontWeight: '800',
    marginTop: 2,
  },
  noteCard: {
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  noteTitle: {
    color: '#075985',
    fontWeight: '900',
    marginBottom: 6,
  },
  noteText: {
    color: '#164e63',
    lineHeight: 21,
  },
});
