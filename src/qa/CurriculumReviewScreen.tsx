import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams, type Href } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getModules } from '@/src/content';
import { ActionButton, AppScreen, Card } from '@/src/components/ui';
import {
  REVIEW_ITEMS, answerKeyInfo, exactScreenText, findScreen, keylessObjectiveQuestions, splitHighlights, type ReviewItem,
} from '@/src/qa/curriculum-review';
import { fontFamily, palette, type as typeScale } from '@/src/theme/tokens';

// Development-only review surface. It is not linked from any learner screen, redirects home in a production
// build (where __DEV__ is false), reads English text straight from the curriculum, and never writes learner state.
const englishModules = getModules('en');

function Annotation({ label, children }: { label: string; children: React.ReactNode }) {
  return <View style={styles.annotation} accessibilityLabel={`Reviewer annotation: ${label}`}>
    <Text style={styles.annotationLabel}>REVIEWER ANNOTATION, NOT CURRICULUM · {label}</Text>
    {children}
  </View>;
}

function ScreenBlock({ item, screenId, role, why }: { item: ReviewItem; screenId: string; role: string; why: string }) {
  const found = findScreen(englishModules, screenId);
  if (!found) return <Annotation label="Not found"><Text style={styles.note}>Screen {screenId} was not found in the English curriculum.</Text></Annotation>;
  const { module, screen, index } = found;
  const phrases = item.highlights.filter((highlight) => highlight.screenId === screenId).map((highlight) => highlight.phrase);
  const rows = exactScreenText(screen);
  return <Card testID={`review-screen-${screenId}`}>
    <View style={styles.screenHeader}>
      <Text style={styles.screenId}>{screenId}</Text>
      <Text style={styles.roleChip}>{role}</Text>
    </View>
    <Text style={styles.where}>Module {module.id} · screen {index + 1} of {module.screens.length} · {screen.type} · {why}</Text>
    <Text style={styles.contentLabel}>APP CONTENT, EXACT TEXT (English)</Text>
    <View style={styles.contentBox}>
      {rows.map(([field, text]) => <View key={field} style={styles.fieldRow}>
        <Text style={styles.fieldName}>{field}</Text>
        <Text style={styles.contentText} selectable>
          {splitHighlights(text, phrases).map((part, partIndex) => part.mark
            ? <Text key={partIndex} style={styles.mark}>{part.text}</Text>
            : <Text key={partIndex}>{part.text}</Text>)}
        </Text>
      </View>)}
    </View>
    <ActionButton testID={`open-screen-${screenId}`} variant={role === 'affected' ? 'primary' : 'secondary'} label={`Open ${screenId} in the app`} icon="open-in-new" onPress={() => router.push(`/lesson/${module.id}/${screenId}` as Href)} />
  </Card>;
}

function KeyTable({ screenIds }: { screenIds: string[] }) {
  return <Annotation label="answer-key metadata read from the question definitions">
    {screenIds.map((screenId) => {
      const found = findScreen(englishModules, screenId);
      if (!found) return null;
      const info = answerKeyInfo(found.screen);
      return <View key={screenId} style={styles.keyBlock} testID={`key-${screenId}`}>
        <Text style={styles.keyTitle}>{screenId}</Text>
        <Text style={styles.note}>type: {info.type}</Text>
        <Text style={styles.note}>questionKind: {info.questionKind ?? 'none'}</Text>
        <Text style={styles.note}>correctChoiceId: {info.correctChoiceId ?? 'none stored'}</Text>
        <Text style={styles.note}>correctChoiceIds: {info.correctChoiceIds ? info.correctChoiceIds.join(', ') : 'none stored'}</Text>
        <Text style={styles.note}>answerBehaviorProvenance: {info.provenance ?? 'none'}</Text>
        <Text style={styles.note}>how the app treats it: {info.behaviour}</Text>
      </View>;
    })}
  </Annotation>;
}

export function CurriculumReviewScreen() {
  const { issue } = useLocalSearchParams<{ issue?: string }>();
  const number = Math.min(6, Math.max(1, Number(Array.isArray(issue) ? issue[0] : issue) || 1));
  const item = REVIEW_ITEMS[number - 1];
  const go = (target: number) => router.replace(`/qa/curriculum-review?issue=${target}` as Href);
  const keyless = item.number === 3 ? keylessObjectiveQuestions(englishModules) : [];
  return <AppScreen contentStyle={{ gap: 14 }}>
    <View style={styles.banner} testID="review-banner">
      <MaterialCommunityIcons accessible={false} importantForAccessibility="no" name="clipboard-search-outline" size={22} color={palette.dawnInk} />
      <View style={{ flex: 1 }}>
        <Text style={styles.bannerTitle} accessibilityRole="header">English Curriculum Review — Internal Draft</Text>
        <Text style={styles.bannerBody}>Development build only. Nothing here corrects or changes the curriculum. Opening a screen does not change progress; pressing Next or submitting an answer on a real lesson screen does.</Text>
      </View>
    </View>
    <View style={styles.tabs} accessibilityRole="tablist">
      {REVIEW_ITEMS.map((candidate) => <Pressable key={candidate.number} testID={`review-tab-${candidate.number}`} accessibilityRole="tab" accessibilityLabel={`Issue ${candidate.number}: ${candidate.title}`} accessibilityState={{ selected: candidate.number === number }} onPress={() => go(candidate.number)} style={[styles.tab, candidate.number === number && styles.tabActive]}>
        <Text style={[styles.tabText, candidate.number === number && styles.tabTextActive]}>{candidate.number}</Text>
      </Pressable>)}
    </View>
    <Text style={styles.issueTitle} accessibilityRole="header" testID="review-issue-title">Issue {item.number} of 6 · {item.title}</Text>
    <Text style={styles.where}>Affected: {item.affected}</Text>
    <Annotation label="what was reported"><Text style={styles.note}>{item.reported}</Text></Annotation>
    <Annotation label="what the source shows"><Text style={styles.note} testID="review-finding">{item.finding}</Text></Annotation>
    {item.readings ? <Annotation label="possible readings, none chosen or approved">
      {item.readings.map((reading, index) => <Text key={index} style={styles.note}>{index + 1}. {reading}</Text>)}
    </Annotation> : null}
    {item.keyScreens ? <KeyTable screenIds={item.keyScreens} /> : null}
    {item.screens.map((ref) => <ScreenBlock key={ref.screenId} item={item} screenId={ref.screenId} role={ref.role} why={ref.why} />)}
    {item.number === 2 ? <View style={styles.pair}>
      <ActionButton testID="jump-m2-05" variant="secondary" label="Go to m2-05 (the 41% lesson)" icon="swap-vertical" onPress={() => router.push('/lesson/m2/m2-05' as Href)} />
      <ActionButton testID="jump-m2-q1" variant="secondary" label="Go to m2-q1 (the question)" icon="swap-vertical" onPress={() => router.push('/lesson/m2/m2-q1' as Href)} />
    </View> : null}
    {item.number === 3 ? <Annotation label={`all ${keyless.length} objective questions with no stored answer key`}>
      <Text style={styles.note} testID="keyless-list">{keyless.map((info) => info.screenId).join(', ')}</Text>
    </Annotation> : null}
    <View style={styles.pair}>
      <ActionButton testID="review-previous" variant="secondary" label="Previous issue" icon="arrow-left" disabled={number === 1} onPress={() => go(number - 1)} />
      <ActionButton testID="review-next" label="Next issue" icon="arrow-right" iconPosition="trailing" disabled={number === 6} onPress={() => go(number + 1)} />
    </View>
  </AppScreen>;
}

const styles = StyleSheet.create({
  banner: { flexDirection: 'row', gap: 12, padding: 14, borderRadius: 16, backgroundColor: palette.dawnSoft, borderWidth: 1, borderColor: palette.dawn },
  bannerTitle: { ...typeScale.section, fontSize: 20, lineHeight: 26, color: palette.dawnInk },
  bannerBody: { fontFamily: fontFamily.body, fontSize: 14.5, lineHeight: 21, color: palette.body, marginTop: 4 },
  tabs: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tab: { minWidth: 48, minHeight: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.borderStrong },
  tabActive: { backgroundColor: palette.primary, borderColor: palette.primaryDark },
  tabText: { fontFamily: fontFamily.bodyBold, fontSize: 18, color: palette.ink },
  tabTextActive: { color: palette.onPrimary },
  issueTitle: { ...typeScale.section, color: palette.ink },
  where: { fontFamily: fontFamily.body, fontSize: 14, lineHeight: 20, color: palette.inkMuted },
  annotation: { padding: 12, borderRadius: 14, backgroundColor: palette.warningSoft, borderLeftWidth: 4, borderLeftColor: palette.warning, gap: 6 },
  annotationLabel: { fontFamily: fontFamily.bodyBold, fontSize: 12, letterSpacing: 0.4, color: palette.warning },
  note: { fontFamily: fontFamily.body, fontSize: 15.5, lineHeight: 23, color: palette.ink },
  keyBlock: { gap: 2, paddingVertical: 6 },
  keyTitle: { fontFamily: fontFamily.bodyBold, fontSize: 16, color: palette.ink },
  screenHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  screenId: { ...typeScale.section, fontSize: 20, color: palette.ink },
  roleChip: { fontFamily: fontFamily.bodyBold, fontSize: 12, color: palette.primary, backgroundColor: palette.primarySoft, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, overflow: 'hidden' },
  contentLabel: { fontFamily: fontFamily.bodyBold, fontSize: 12, letterSpacing: 0.4, color: palette.success, marginTop: 8 },
  contentBox: { padding: 12, borderRadius: 14, backgroundColor: palette.raised, borderWidth: 1, borderColor: palette.border, gap: 10, marginBottom: 10 },
  fieldRow: { gap: 2 },
  fieldName: { fontFamily: fontFamily.bodyBold, fontSize: 12, color: palette.inkMuted },
  contentText: { fontFamily: fontFamily.body, fontSize: 16.5, lineHeight: 25, color: palette.ink },
  mark: { backgroundColor: '#FFE08A', color: palette.ink },
  pair: { gap: 10 },
});
