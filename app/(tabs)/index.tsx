import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getModules } from '@/src/content';
import { useApp } from '@/src/state/AppProvider';
import { moduleProgress, overallProgress } from '@/src/utils/progress';
import { ActionButton, AppScreen, Card, Header, ProgressMeter, StatusPill } from '@/src/components/ui';
import { palette, radius, spacing } from '@/src/theme/tokens';

const moduleLooks = [
  { color: palette.primary, soft: palette.primarySoft, icon: 'weather-night' as const },
  { color: palette.accent, soft: palette.warningSoft, icon: 'account-heart-outline' as const },
  { color: palette.primaryDark, soft: palette.successSoft, icon: 'target' as const },
  { color: palette.accent, soft: palette.primarySoft, icon: 'mother-heart' as const },
  { color: palette.primary, soft: palette.warningSoft, icon: 'bed-clock' as const },
  { color: palette.primaryDark, soft: palette.primarySoft, icon: 'medical-bag' as const },
  { color: palette.accent, soft: palette.successSoft, icon: 'heart-multiple-outline' as const },
];

export default function HomeScreen() {
  const { t } = useTranslation();
  const { state, loaded } = useApp();
  const [focusedModuleId, setFocusedModuleId] = useState<string | null>(null);
  const modules = getModules(state.language);
  const overall = overallProgress(modules, state.completedScreenIds);
  if (!loaded) return <AppScreen><Header title={t('loading')} /></AppScreen>;
  const current = modules.find((module) => module.id === state.currentModuleId);

  return <AppScreen>
    <View style={styles.hero}><View style={styles.heroCopy}><Header eyebrow={t('appName')} title={state.language === 'es' ? 'Dormir mejor empieza con entender.' : 'Better sleep starts with understanding.'} subtitle={t('welcome')} /></View></View>
    <Card><Text style={styles.sectionEyebrow}>{state.language === 'es' ? 'TU RECORRIDO' : 'YOUR LEARNING PATH'}</Text><ProgressMeter value={overall.percentage} label={t('overallProgress')} />
      <Text style={styles.overallCount}>{overall.completed} / {overall.total} {t('steps')}</Text>
      {current && overall.completed > 0 ? <ActionButton label={t('continue')} icon="arrow-right" onPress={() => router.push(`/module/${current.id}` as Href)} /> : null}
    </Card>
    <View style={styles.sectionHeading}><View><Text style={styles.sectionEyebrow}>{state.language === 'es' ? 'ÍNDICE' : 'INDEX'}</Text><Text style={styles.sectionTitle}>{state.language === 'es' ? 'Módulos' : 'Modules'}</Text></View><Text style={styles.sectionHint}>{modules.length} {state.language === 'es' ? 'módulos' : 'modules'}</Text></View>
    <View style={styles.list}>{modules.map((module) => {
      const progress = moduleProgress(module, state.completedScreenIds);
      const look = moduleLooks[module.order - 1];
      const status = progress.percentage === 100 ? t('completed') : progress.percentage > 0 ? t('inProgress') : t('notStarted');
      return <Pressable key={module.id} accessibilityRole="button" accessibilityLabel={`${module.order}. ${module.title}. ${status}`} onFocus={() => setFocusedModuleId(module.id)} onBlur={() => setFocusedModuleId(null)} onPress={() => router.push(`/module/${module.id}` as Href)} style={({ pressed }) => [styles.moduleRow, focusedModuleId === module.id && styles.focusedRow, pressed && styles.pressedRow]}>
        <View style={[styles.moduleRail, { backgroundColor: look.color }]} />
        <View style={[styles.number, { backgroundColor: look.soft }]}><Text style={[styles.numberText, { color: look.color }]}>{String(module.order).padStart(2, '0')}</Text></View>
        <View style={styles.moduleCopy}>
          <View style={styles.moduleTop}><Text style={[styles.moduleKicker, { color: look.color }]}>{state.language === 'es' ? 'MÓDULO' : 'MODULE'} {module.order}</Text><StatusPill label={status} complete={progress.percentage === 100} /></View>
          <Text style={styles.moduleTitle}>{module.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{module.description}</Text>
          <View style={styles.moduleMeta}><Text style={styles.progressLabel}>{progress.completed}/{progress.total} {t('steps')}</Text><View style={styles.miniTrack}><View style={[styles.miniFill, { width: `${progress.percentage}%`, backgroundColor: look.color }]} /></View><Text style={styles.actionText}>{progress.percentage === 100 ? t('review') : progress.percentage ? t('continue') : t('start')}</Text><MaterialCommunityIcons name="arrow-right" size={20} color={palette.primaryDark} /></View>
        </View>
      </Pressable>;
    })}</View>
  </AppScreen>;
}

const styles = StyleSheet.create({
  hero: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, padding: spacing.lg, borderRadius: radius.lg, backgroundColor: '#F5E8DF', borderWidth: 1, borderColor: '#E9D5C7' },
  heroCopy: { flex: 1, minWidth: 0 },
  sectionEyebrow: { color: palette.primaryDark, fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  sectionHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: spacing.md },
  sectionTitle: { color: palette.ink, fontSize: 25, lineHeight: 32, fontWeight: '900' },
  sectionHint: { color: palette.inkMuted, fontSize: 14, paddingBottom: 3 },
  list: { gap: spacing.sm },
  moduleRow: { minHeight: 112, position: 'relative', flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, paddingVertical: spacing.md, paddingRight: spacing.sm, borderBottomWidth: 1, borderBottomColor: palette.border },
  moduleRail: { width: 4, alignSelf: 'stretch', borderRadius: radius.pill },
  number: { width: 42, height: 42, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  numberText: { fontSize: 14, fontWeight: '900', letterSpacing: 0.3 },
  moduleCopy: { flex: 1, gap: spacing.sm, minWidth: 0 },
  moduleTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  moduleKicker: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  moduleTitle: { color: palette.ink, fontSize: 21, lineHeight: 28, fontWeight: '800' },
  description: { color: palette.inkMuted, fontSize: 15, lineHeight: 23 },
  moduleMeta: { minHeight: 32, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  progressLabel: { color: palette.inkMuted, fontSize: 12, fontWeight: '700' },
  miniTrack: { flex: 1, maxWidth: 130, height: 6, borderRadius: radius.pill, overflow: 'hidden', backgroundColor: palette.border },
  miniFill: { height: '100%', borderRadius: radius.pill },
  overallCount: { color: palette.inkMuted, fontSize: 14, fontWeight: '700' },
  actionText: { color: palette.primaryDark, fontSize: 15, fontWeight: '800' },
  focusedRow: { outlineWidth: 2, outlineColor: palette.focus, outlineOffset: 3 },
  pressedRow: { opacity: 0.76 },
});
