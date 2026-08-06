import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams, type Href } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getModule } from '@/src/content';
import { useApp } from '@/src/state/AppProvider';
import { LessonRenderer } from '@/src/components/LessonRenderer';
import { ActionButton, AppScreen, ProgressMeter } from '@/src/components/ui';
import { replayNarration, speakFeedback, speakScreen, stopNarration } from '@/src/services/narration';
import { palette, radius, spacing, touchTarget } from '@/src/theme/tokens';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

export default function LessonScreen() {
  const { moduleId, screenId, direction } = useLocalSearchParams<{ moduleId: string; screenId: string; direction?: 'forward' | 'backward' }>();
  const { t } = useTranslation();
  const { state, completeScreen, setVoice, saveNow } = useApp();
  const module = getModule(state.language, moduleId);
  const index = module?.screens.findIndex((screen) => screen.id === screenId) ?? -1;
  const screen = index >= 0 ? module?.screens[index] : undefined;
  const [submittedNow, setSubmittedNow] = useState(Boolean(state.answers[screenId]?.length));
  const [homeFocused, setHomeFocused] = useState(false);
  const navigationLocked = useRef(false);
  const reducedMotion = useReducedMotion();
  const transition = React.useRef(new Animated.Value(0)).current;
  const entryOffset = direction === 'backward' ? -12 : 12;
  useEffect(() => { transition.setValue(reducedMotion ? 1 : 0); if (!reducedMotion) Animated.timing(transition, { toValue: 1, duration: 260, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }).start(); }, [screenId, reducedMotion, transition]);
  useEffect(() => () => { void stopNarration(); }, [screenId, state.language]);
  if (!module || !screen || index < 0) return <AppScreen><Text>Lesson not found</Text></AppScreen>;
  const previous = module.screens[index - 1];
  const next = module.screens[index + 1];
  const requiresSubmit = screen.type === 'singleChoice' || screen.type === 'multiSelect' || screen.type === 'scenario';
  const canContinue = !requiresSubmit || submittedNow || Boolean(state.answers[screen.id]?.length);
  const navigate = (targetId: string, move: 'forward' | 'backward') => { if (navigationLocked.current) return; navigationLocked.current = true; void stopNarration(); router.replace({ pathname: `/lesson/${module.id}/${targetId}`, params: { direction: move } } as Href); setTimeout(() => { navigationLocked.current = false; }, 320); };
  const continueNext = () => {
    completeScreen(screen.id, module.id, next?.id, !next);
    void stopNarration();
    if (next) navigate(next.id, 'forward'); else router.replace(`/module/${module.id}` as Href);
  };
  const play = async () => {
    const voice = await speakScreen(screen, state.language, state.narrationRate, state.voiceByLocale[state.language], state.narrationPitch);
    if (voice) setVoice(state.language, voice);
    else Alert.alert(
      state.language === 'es' ? 'Voz no disponible' : 'Narration voice unavailable',
      state.language === 'es' ? 'Revise los ajustes de idioma o voz del dispositivo. Puede continuar leyendo la lección.' : 'Check the device language or speech settings. You can continue reading the lesson.',
    );
  };
  return <AppScreen>
    <View style={styles.topRow}><Pressable accessibilityRole="button" accessibilityLabel={t('home')} onFocus={() => setHomeFocused(true)} onBlur={() => setHomeFocused(false)} onPress={() => { void (async () => { await saveNow(); await stopNarration(); router.replace('/' as Href); })(); }} style={({ pressed }) => [styles.iconButton, homeFocused && styles.focused, pressed && styles.pressed]}><MaterialCommunityIcons name="home-outline" size={25} color={palette.primaryDark} /></Pressable><Text numberOfLines={2} style={styles.moduleTitle}>{module.shortTitle}</Text><Text style={styles.step}>{index + 1}/{module.screens.length}</Text></View>
    <ProgressMeter value={Math.round(((index + 1) / module.screens.length) * 100)} label={`${state.language === 'es' ? 'Paso' : 'Step'} ${index + 1} ${state.language === 'es' ? 'de' : 'of'} ${module.screens.length}`} />
    <View style={styles.lessonIntro}><Text style={styles.eyebrow}>{screen.type === 'content' ? (state.language === 'es' ? 'Aprender' : 'Learn') : (state.language === 'es' ? 'Reflexionar' : 'Reflect')}</Text><Text accessibilityRole="header" style={styles.title}>{screen.title}</Text>
      <View style={styles.listenPanel}><View style={styles.listenHeading}><MaterialCommunityIcons name="volume-high" size={19} color={palette.primaryDark} /><Text style={styles.listenLabel}>{state.language === 'es' ? 'Escuchar este paso' : 'Listen to this step'}</Text></View><View style={styles.narrationRow}>
        <ActionButton variant="secondary" label={t('play')} icon="play" disabled={!state.narrationEnabled} onPress={() => void play()} />
        <ActionButton variant="secondary" label={t('stop')} icon="stop" disabled={!state.narrationEnabled} onPress={() => void stopNarration()} />
        <ActionButton variant="secondary" label={t('replay')} icon="replay" disabled={!state.narrationEnabled} onPress={() => void replayNarration()} />
      </View>
    </View></View>
    {!state.narrationEnabled ? <Text style={styles.narrationHint}>{state.language === 'es' ? 'Active la narración en Ajustes para escuchar este paso.' : 'Enable narration in Settings to hear this step.'}</Text> : null}
    <Animated.View style={[styles.lessonSurface, { opacity: transition, transform: [{ translateX: transition.interpolate({ inputRange: [0, 1], outputRange: [entryOffset, 0] }) }] }]}><LessonRenderer screen={screen} onSubmitted={() => {
      setSubmittedNow(true);
      completeScreen(screen.id, module.id, next?.id, !next);
      if (state.narrationEnabled && 'feedback' in screen && screen.feedback && screen.questionKind !== 'reflection') void speakFeedback(screen.feedback, state.language, state.narrationRate, state.voiceByLocale[state.language], state.narrationPitch);
    }} /></Animated.View>
    <View style={styles.actions}>{previous ? <ActionButton variant="secondary" label={t('previous')} icon="arrow-left" onPress={() => navigate(previous.id, 'backward')} /> : <View style={styles.spacer} />}<ActionButton label={next ? t('next') : t('completed')} icon={next ? 'arrow-right' : 'check'} disabled={!canContinue} onPress={continueNext} /></View>
  </AppScreen>;
}
const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md }, iconButton: { width: touchTarget, height: touchTarget, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: palette.border, borderRadius: radius.md }, focused: { outlineWidth: 2, outlineColor: palette.focus, outlineOffset: 2 }, pressed: { opacity: 0.72 },
  moduleTitle: { flex: 1, color: palette.ink, fontSize: 15, fontWeight: '800' }, step: { color: palette.inkMuted, fontSize: 14, fontWeight: '800' },
  eyebrow: { color: palette.primaryDark, fontSize: 13, fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase', marginBottom: spacing.sm },
  lessonIntro: { gap: spacing.md },
  title: { color: palette.ink, fontSize: 29, lineHeight: 36, fontWeight: '900', letterSpacing: -0.4 },
  listenPanel: { gap: spacing.sm, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: palette.border },
  listenHeading: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  listenLabel: { color: palette.ink, fontSize: 14, fontWeight: '800' },
  narrationRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, narrationHint: { color: palette.inkMuted, fontSize: 13, lineHeight: 19 },
  actions: { flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' }, spacer: { flex: 1 },
  lessonSurface: { backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.border, borderRadius: radius.lg, padding: spacing.lg },
});
