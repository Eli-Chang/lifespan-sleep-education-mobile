import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import type { LessonScreen } from '@/src/types/content';
import { useApp } from '@/src/state/AppProvider';
import { evaluateQuestion, questionChoiceState } from '@/src/utils/questions';
import { ActionButton } from './ui';
import { palette, radius, spacing, touchTarget } from '@/src/theme/tokens';
import { CurriculumImage } from './CurriculumImage';
import { imageForLesson } from '@/src/content/image-registry';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import LessonChat from './LessonChat';

export function LessonRenderer({ screen, onSubmitted }: { screen: LessonScreen; onSubmitted: () => void }) {
  const { t } = useTranslation();
  const { state, saveAnswer, submitAnswer } = useApp();
  const reducedMotion = useReducedMotion();
  const saved = useMemo(() => state.answers[screen.id] ?? [], [screen.id, state.answers]);
  const priorAttempt = state.answerAttempts[screen.id]?.at(-1);
  const [selected, setSelected] = useState<string[]>(saved);
  const [submitted, setSubmitted] = useState(Boolean(priorAttempt));
  const [editing, setEditing] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [focusedChoice, setFocusedChoice] = useState<string | null>(null);

  useEffect(() => {
    if (editing) return;
    setSelected(saved);
    setSubmitted(Boolean(state.answerAttempts[screen.id]?.length));
    setEditing(false);
  }, [editing, saved, screen.id, state.answerAttempts]);

  if (screen.type === 'content') {
    const asset = imageForLesson(screen.id);
    const numbered = screen.paragraphs.some((paragraph) => /\b1\.\s/.test(paragraph));
    return <View style={styles.stack}>
    {asset ? <CurriculumImage asset={asset} locale={state.language} /> : null}
    {screen.paragraphs.map((paragraph, index) => <View key={index} style={numbered ? styles.timelineRow : undefined}>
      {numbered ? <View style={styles.timelineDot}><Text style={styles.timelineNumber}>{index + 1}</Text></View> : null}
      <Text style={[styles.body, numbered && styles.timelineCopy]}>{paragraph}</Text>
    </View>)}
    {screen.orderedList ? <View accessibilityRole="list" accessibilityLabel={`${screen.orderedList.length}-item ordered list`} style={styles.orderedList}>{screen.orderedList.map((item, index) => <View key={item} style={styles.orderedItem}><Text style={styles.orderedNumber}>{index + 1}.</Text><Text style={styles.orderedText}>{item}</Text></View>)}</View> : null}
    {screen.keyPoints?.length ? <View style={styles.takeaway}><Text style={styles.takeawayLabel}>{state.language === 'es' ? 'PUNTO CLAVE' : 'KEY POINT'}</Text>{screen.keyPoints.map((point, index) => <View key={index} style={styles.point}><MaterialCommunityIcons accessible={false} importantForAccessibility="no" name="check-circle-outline" size={22} color={palette.accent} /><Text style={styles.pointText}>{point}</Text></View>)}</View> : null}
    {['m1-01', 'm1-07'].includes(screen.id) ? <Pressable accessibilityRole="link" accessibilityLabel={state.language === 'es' ? 'Fuente de apoyo: NHLBI sobre la apnea del sueño' : 'Supporting source: NHLBI Sleep Apnea'} onPress={() => void Linking.openURL('https://www.nhlbi.nih.gov/health/sleep-apnea')} style={styles.sourceLinkButton}><Text style={styles.sourceLink}>{state.language === 'es' ? 'Fuente de apoyo: NHLBI sobre la apnea del sueño' : 'Supporting source: NHLBI Sleep Apnea'}</Text></Pressable> : null}
    <View style={styles.aiActions}>
      <ActionButton variant="secondary" label={chatOpen ? t('closeLessonChat') : t('askLesson')} icon="comment-question-outline" onPress={() => setChatOpen(value => !value)} />
      {chatOpen ? <LessonChat inline inlineActivityId={screen.id} inlineKind="lesson-question" /> : null}
    </View>
  </View>;
  }

  if (screen.type === 'summary') return <View style={styles.summaryList}>{screen.keyPoints.map((point, index) =>
    <View key={index} style={[styles.summaryRow, index > 0 && styles.summaryDivider]}><MaterialCommunityIcons name="check-circle-outline" size={24} color={palette.success} /><Text style={styles.pointText}>{point}</Text></View>)}
  </View>;

  if (screen.type === 'aiActivity') return <View style={styles.stack}>
    <Text style={styles.prompt}>{screen.prompt}</Text>
    <Text style={styles.body}>{state.aiConsent
      ? (state.language === 'es' ? 'Su respuesta solo se envía cuando decide enviarla.' : 'Your response is sent only when you choose to submit it.')
      : (state.language === 'es' ? 'Se requiere consentimiento de IA antes de enviar algo. Puede continuar sin usar esta actividad.' : 'AI consent is required before anything is sent. You may continue without using this activity.')}</Text>
    <ActionButton
      label={screen.optional ? t('openOptionalAiActivity') : t('openAiActivity')}
      icon="comment-text-outline"
      onPress={() => setChatOpen(value => !value)}
    />
    {chatOpen ? <LessonChat inline inlineActivityId={screen.activityId} inlineKind={screen.activityKind} /> : null}
  </View>;

  const question = screen;
  const currentResult = submitted && !editing ? evaluateQuestion(question, selected) : undefined;
  const objective = evaluateQuestion(question, selected) !== undefined || (
    question.type !== 'scenario' && question.questionKind === 'objective'
  );
  const toggle = (id: string) => {
    if (Platform.OS !== 'web' && !reducedMotion) void Haptics.selectionAsync();
    setSelected((current) => {
      const updated = question.type === 'singleChoice'
        ? [id]
        : current.includes(id) ? current.filter((value) => value !== id) : [...current, id];
      saveAnswer(question.id, updated);
      return updated;
    });
  };
  const submit = () => {
    const correct = evaluateQuestion(question, selected);
    submitAnswer(question.id, selected, correct);
    setSubmitted(true);
    setEditing(false);
    onSubmitted();
    if (Platform.OS !== 'web' && !reducedMotion) void Haptics.notificationAsync(correct === true ? Haptics.NotificationFeedbackType.Success : correct === false ? Haptics.NotificationFeedbackType.Warning : Haptics.NotificationFeedbackType.Success);
  };

  const summary = currentResult === true
    ? question.questionFeedback?.correctSummary ?? t('correct')
    : currentResult === false
      ? question.questionFeedback?.incorrectSummary ?? t('notQuite')
      : t('reflectionSaved');
  const explanation = question.questionFeedback?.generalExplanation ?? question.feedback ?? t('answerSaved');

  return <View style={styles.stack}>
    {question.type === 'scenario' ? <Text style={styles.body}>{question.scenario}</Text> : null}
    <Text style={styles.questionCue}>{question.questionKind === 'reflection' ? (state.language === 'es' ? 'REFLEXIÓN' : 'REFLECTION') : (state.language === 'es' ? 'COMPROBAR COMPRENSIÓN' : 'CHECK YOUR UNDERSTANDING')}</Text>
    <Text style={styles.prompt}>{question.prompt}</Text>
    {question.choices.map((choice) => {
      const active = selected.includes(choice.id);
      const showResults = submitted && !editing && objective;
      const choiceState = questionChoiceState(question, selected, choice.id);
      const missed = showResults && choiceState.missed;
      const incorrectSelected = showResults && choiceState.incorrectSelected;
      const correctSelected = showResults && choiceState.correctSelected;
      return <Pressable
        key={choice.id}
        accessibilityRole={question.type === 'singleChoice' ? 'radio' : 'checkbox'}
        accessibilityState={{ selected: active, checked: active }}
        aria-checked={active}
        aria-selected={active}
        accessibilityLabel={`${choice.label}${active ? `, ${t('selected')}` : ''}${missed ? `, ${t('missedCorrectChoice')}` : ''}`}
        onFocus={() => setFocusedChoice(choice.id)}
        onBlur={() => setFocusedChoice(null)}
        onPress={() => toggle(choice.id)}
        style={({ pressed }) => [
          styles.choice,
          active && styles.choiceActive,
          missed && styles.choiceMissed,
          incorrectSelected && styles.choiceIncorrect,
          correctSelected && styles.choiceCorrect,
          focusedChoice === choice.id && styles.choiceFocused,
          pressed && styles.pressed,
        ]}>
        <MaterialCommunityIcons accessible={false} importantForAccessibility="no"
          name={question.type === 'singleChoice' ? (active ? 'radiobox-marked' : 'radiobox-blank') : (active ? 'checkbox-marked' : 'checkbox-blank-outline')}
          size={25}
          color={correctSelected ? palette.success : incorrectSelected ? palette.danger : missed ? palette.missed : active ? palette.primaryDark : palette.inkMuted}
        />
        <View style={styles.choiceCopy}><Text style={[styles.choiceText, active && styles.choiceTextActive]}>{choice.label}</Text>
          {correctSelected ? <Text style={styles.correctLabel}>{t('correctChoice')}</Text> : null}
          {incorrectSelected ? <Text style={styles.incorrectLabel}>{t('incorrectChoice')}</Text> : null}
          {missed ? <Text style={styles.missedLabel}>{t('missedCorrectChoice')}</Text> : null}
          {showResults && !missed && question.questionFeedback?.optionExplanations?.[choice.id] ? <Text style={styles.optionExplanation}>{question.questionFeedback.optionExplanations[choice.id]}</Text> : null}
        </View>
      </Pressable>;
    })}
    {(!submitted || editing) ? <ActionButton label={t('submit')} icon="check" disabled={selected.length === 0} onPress={submit} /> : <>
      <View accessibilityLiveRegion="polite" style={[
        styles.feedback,
        currentResult === true && styles.feedbackCorrect,
        currentResult === false && styles.feedbackIncorrect,
      ]}>
        <MaterialCommunityIcons accessible={false} importantForAccessibility="no" name={currentResult === true ? 'check-circle-outline' : currentResult === false ? 'alert-circle-outline' : 'heart-outline'} size={24} color={currentResult === true ? palette.success : currentResult === false ? palette.danger : palette.primaryDark} />
        <View style={styles.feedbackCopy}><Text style={styles.feedbackTitle}>{summary}</Text><Text style={styles.feedbackText}>{explanation}</Text></View>
      </View>
      <ActionButton variant="secondary" label={currentResult === false ? t('retry') : t('changeAnswer')} icon="pencil-outline" onPress={() => setEditing(true)} />
    </>}
    {question.questionKind === 'reflection' ? <>
      <ActionButton variant="secondary" label={chatOpen ? t('closeLessonChat') : t('reflectTutor')} icon="comment-question-outline" onPress={() => setChatOpen(value => !value)} />
      {chatOpen ? <LessonChat inline inlineActivityId={question.id} inlineKind="reflection" /> : null}
    </> : null}
  </View>;
}

const styles = StyleSheet.create({
  stack: { gap: spacing.md },
  body: { color: palette.ink, fontSize: 18, lineHeight: 29 },
  point: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  pointText: { flex: 1, color: palette.ink, fontSize: 17, lineHeight: 27 },
  summaryList: { gap: 0, borderTopWidth: 1, borderTopColor: palette.border },
  summaryRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start', paddingVertical: spacing.md },
  summaryDivider: { borderTopWidth: 1, borderTopColor: palette.border },
  questionCue: { color: palette.primaryDark, fontSize: 12, lineHeight: 18, fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase' },
  prompt: { color: palette.ink, fontSize: 20, lineHeight: 30, fontWeight: '800' },
  takeaway: { gap: spacing.sm, borderLeftWidth: 4, borderLeftColor: palette.accent, backgroundColor: '#EDF1EA', borderRadius: radius.md, padding: spacing.md },
  takeawayLabel: { color: palette.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  timelineDot: { width: 30, height: 30, borderRadius: 15, backgroundColor: palette.primarySoft, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  timelineNumber: { color: palette.primaryDark, fontSize: 13, fontWeight: '900' },
  timelineCopy: { flex: 1 },
  orderedList: { gap: spacing.md, paddingLeft: spacing.md },
  orderedItem: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  orderedNumber: { width: 28, color: palette.primaryDark, fontSize: 18, lineHeight: 29, fontWeight: '900' },
  orderedText: { flex: 1, color: palette.ink, fontSize: 18, lineHeight: 29 },
  sourceLinkButton: { minHeight: touchTarget, justifyContent: 'center' },
  sourceLink: { color: '#1D5FA7', textDecorationLine: 'underline', fontSize: 14, lineHeight: 21, fontWeight: '700' },
  choice: { minHeight: touchTarget, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1.5, borderColor: palette.border, backgroundColor: palette.surface, borderRadius: radius.md, padding: spacing.md },
  choiceActive: { borderColor: palette.primaryDark, backgroundColor: palette.primarySoft },
  choiceCorrect: { borderColor: palette.success, backgroundColor: palette.successSoft },
  choiceIncorrect: { borderColor: palette.danger, backgroundColor: palette.dangerSoft },
  choiceMissed: { borderColor: palette.warning, borderStyle: 'dashed', backgroundColor: palette.warningSoft },
  choiceFocused: { outlineWidth: 2, outlineColor: palette.focus, outlineOffset: 2 },
  choiceCopy: { flex: 1, gap: spacing.xs },
  choiceText: { color: palette.ink, fontSize: 16, lineHeight: 24, fontWeight: '600' },
  choiceTextActive: { color: palette.ink, fontWeight: '800' },
  correctLabel: { color: palette.success, fontSize: 13, fontWeight: '800' },
  incorrectLabel: { color: palette.danger, fontSize: 13, fontWeight: '800' },
  missedLabel: { color: palette.warning, fontSize: 13, fontWeight: '800' },
  optionExplanation: { color: palette.inkMuted, fontSize: 14, lineHeight: 20 },
  feedback: { flexDirection: 'row', gap: spacing.md, backgroundColor: palette.primarySoft, borderRadius: radius.md, padding: spacing.md },
  feedbackCorrect: { backgroundColor: palette.successSoft },
  feedbackIncorrect: { backgroundColor: palette.dangerSoft },
  feedbackCopy: { flex: 1, gap: spacing.xs },
  feedbackTitle: { color: palette.ink, fontSize: 17, fontWeight: '900' },
  feedbackText: { color: palette.ink, fontSize: 16, lineHeight: 24 },
  pressed: { opacity: 0.72 },
  aiActions: { gap: spacing.sm, marginTop: spacing.sm },
});
