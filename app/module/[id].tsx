import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getModule } from '@/src/content';
import { useApp } from '@/src/state/AppProvider';
import { stopNarration } from '@/src/services/narration';
import { moduleProgress } from '@/src/utils/progress';
import { ActionButton, AppScreen, Card, Header, ProgressMeter } from '@/src/components/ui';
import { palette, radius, spacing, touchTarget } from '@/src/theme/tokens';
import { CurriculumImage } from '@/src/components/CurriculumImage';
import { imageForModule } from '@/src/content/image-registry';

export default function ModuleOverviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { state, saveNow } = useApp();
  const [backFocused, setBackFocused] = useState(false);
  const module = getModule(state.language, id);
  if (!module) return <AppScreen><Header title="Module not found" /></AppScreen>;
  const progress = moduleProgress(module, state.completedScreenIds);
  const saved = state.lastScreenByModule[module.id];
  const startScreen = module.screens.find((screen) => screen.id === saved) ?? module.screens[0];
  const action = progress.percentage === 100 ? t('review') : progress.percentage > 0 ? t('continue') : t('start');
  const asset = imageForModule(module.id);
  return <AppScreen>
    <Pressable accessibilityRole="button" accessibilityLabel={t('home')} onFocus={() => setBackFocused(true)} onBlur={() => setBackFocused(false)} onPress={() => { void (async () => { await saveNow(); await stopNarration(); router.replace('/' as Href); })(); }} style={({ pressed }) => [styles.back, backFocused && styles.focused, pressed && styles.pressed]}><MaterialCommunityIcons name="home-outline" size={24} color={palette.primaryDark} /><Text style={styles.backText}>{t('home')}</Text></Pressable>
    <View style={styles.hero}><View style={styles.heroCopy}><Header eyebrow={`${state.language === 'es' ? 'Módulo' : 'Module'} ${module.order}`} title={module.title} subtitle={module.description} /></View>{asset ? <CurriculumImage asset={asset} locale={state.language} compact /> : null}</View>
    <View style={styles.progressSurface}><Card><ProgressMeter value={progress.percentage} label={`${progress.completed}/${progress.total} ${t('steps')}`} />
      <View style={styles.progressMeta}><Text style={styles.estimate}>{state.language === 'es' ? 'Tiempo estimado' : 'Estimated time'}: {Math.max(3, Math.ceil(module.screens.length * 1.4))} min</Text><Text style={styles.stepCount}>{module.screens.length} {state.language === 'es' ? 'pasos' : 'steps'}</Text></View>
      <View style={styles.nextStep}><MaterialCommunityIcons name="bookmark-outline" size={20} color={palette.primaryDark} /><Text style={styles.nextStepText}>{state.language === 'es' ? 'Siguiente paso' : 'Next step'}: {startScreen.title}</Text></View>
    </Card></View>
    <ActionButton label={action} icon="arrow-right" onPress={() => router.push(`/lesson/${module.id}/${startScreen.id}` as Href)} />
    <View style={styles.noteRow}><MaterialCommunityIcons name="shield-check-outline" size={22} color={palette.accent} /><Text style={styles.note}>{state.language === 'es' ? 'Puede salir, volver atrás y repasar cualquier paso. Las respuestas incorrectas no bloquean el progreso.' : 'You can leave, go back, and revisit any step. Incorrect answers never block progress.'}</Text></View>
  </AppScreen>;
}
const styles = StyleSheet.create({
  back: { minHeight: touchTarget, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: spacing.sm, paddingHorizontal: spacing.sm, borderRadius: radius.sm },
  backText: { color: palette.primaryDark, fontWeight: '800' },
  focused: { outlineWidth: 2, outlineColor: palette.focus, outlineOffset: 2 },
  pressed: { opacity: 0.72 },
  hero: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, paddingBottom: spacing.sm },
  heroCopy: { flex: 1, minWidth: 0 },
  progressSurface: { borderTopWidth: 1, borderTopColor: palette.border, paddingTop: spacing.md },
  progressMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.md },
  estimate: { color: palette.inkMuted, fontSize: 14 },
  stepCount: { color: palette.primaryDark, fontSize: 13, fontWeight: '800' },
  nextStep: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, paddingTop: spacing.sm },
  nextStepText: { flex: 1, color: palette.ink, fontSize: 15, lineHeight: 22, fontWeight: '700' },
  noteRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start', backgroundColor: palette.surfaceSoft, padding: spacing.md, borderRadius: 16 },
  note: { flex: 1, color: palette.inkMuted, fontSize: 15, lineHeight: 23 },
});
