import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ActionButton, AppScreen, Header } from '@/src/components/ui';
import { getModules } from '@/src/content';
import { callAi, createEphemeralSessionId, SafeAiError } from '@/src/services/ai-client';
import { containsLikelyIdentifier } from '@/src/services/privacy';
import { useApp, type LessonChatMessage } from '@/src/state/AppProvider';
import { palette, radius, spacing } from '@/src/theme/tokens';
import type { AiActivityKind } from '@/src/types/content';

export default function LessonChat({ inlineActivityId, inlineKind, inline }: { inlineActivityId?: string; inlineKind?: AiActivityKind; inline?: boolean } = {}) {
  const params = useLocalSearchParams<{ activityId?: string; kind?: AiActivityKind }>();
  const { state, setAiConsent } = useApp();
  const { t } = useTranslation();
  const screen = useMemo(() => getModules(state.language).flatMap(m => m.screens).find(s => s.id === params.activityId || (s.type === 'aiActivity' && s.activityId === params.activityId)), [params.activityId, state.language]);
  const requestedId = inlineActivityId ?? params.activityId;
  const activeScreen = inlineActivityId ? getModules(state.language).flatMap(m => m.screens).find(s => s.id === inlineActivityId || (s.type === 'aiActivity' && s.activityId === inlineActivityId)) : screen;
  const lessonId = activeScreen?.id ?? requestedId ?? 'lesson';
  const activityId = activeScreen?.type === 'aiActivity' ? activeScreen.activityId : requestedId;
  const kind = inlineKind ?? params.kind ?? (activeScreen?.type === 'aiActivity' ? activeScreen.activityKind : 'lesson-question');
  const [messages, setMessages] = useState<LessonChatMessage[]>([]);
  const [aiTurns, setAiTurns] = useState(0);
  const [complete, setComplete] = useState(false);
  const [input, setInput] = useState('');
  const [consent, setConsent] = useState(state.aiConsent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const sessionId = useRef(createEphemeralSessionId());
  const maxTurns = 3;
  const sending = useRef(false);
  const send = async () => {
    const text = input.trim();
    if (!text || loading || sending.current || complete || aiTurns >= maxTurns || !consent) return;
    if (containsLikelyIdentifier(text)) { setError(t('chatPrivacyWarning')); return; }
    sending.current = true;
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next); setInput(''); setLoading(true); setError('');
    try {
      const result = await callAi<{ message?: string; conversationComplete?: boolean; shouldAllowLearnerReply?: boolean; understandingStatus?: string; feedback?: string; followUpQuestion?: string }>('lesson-chat', { activityId, lessonId, kind, locale: state.language, sessionId: sessionId.current, messages: [{ role: 'user', content: text }] }, consent);
      const nextTurn = aiTurns + 1;
      const done = nextTurn >= maxTurns || result.conversationComplete === true || result.shouldAllowLearnerReply === false || result.understandingStatus === 'understood';
      const raw = result.message ?? result.feedback ?? '';
      const assistant = done ? raw.replace(/\?[^\n]*$/g, '.').replace(/\?\s*$/g, '.') : [raw, result.followUpQuestion].filter(Boolean).join('\n\n');
      const updated = [...next, { role: 'assistant' as const, content: assistant }];
      setMessages(updated); setAiTurns(nextTurn); setComplete(done);
    } catch (e) { setError(e instanceof SafeAiError ? e.message : t('chatUnavailable')); }
    finally { setLoading(false); sending.current = false; }
  };
  return <AppScreen scroll={false}>
    {!inline && <><Pressable accessibilityRole="button" accessibilityLabel={t('back')} onPress={() => router.back()} style={styles.back}><Text>‹ {t('back')}</Text></Pressable><Header title={screen?.type === 'aiActivity' ? screen.title : t('askLesson')} /></>}
    <View style={styles.transcriptHeader}><MaterialCommunityIcons name="message-text-outline" size={19} color={palette.primaryDark} /><Text style={styles.transcriptTitle}>{state.language === 'es' ? 'Conversación de la lección' : 'Lesson conversation'}</Text></View>
    <ScrollView style={styles.thread} contentContainerStyle={styles.content} accessibilityLiveRegion="polite">
      {!consent && <View accessibilityRole="alert" style={styles.consentSurface}><View style={styles.consentHeading}><MaterialCommunityIcons name="shield-lock-outline" size={21} color={palette.primaryDark} /><Text style={styles.title}>{t('chatConsent')}</Text></View><Text style={styles.consentText}>{t('educationalDisclaimer')}</Text><Text style={styles.consentText}>{t('chatPrivacy')}</Text><ActionButton label={t('continue')} icon="arrow-right" onPress={() => { setConsent(true); setAiConsent(true); }} /></View>}
      {messages.map((m, i) => <View key={`${i}-${m.role}`} accessibilityRole="text" style={[styles.bubble, m.role === 'user' ? styles.user : styles.assistant]}><Text style={styles.role}>{m.role === 'user' ? t('you') : t('chatTutor')}</Text><Text style={styles.message}>{m.content}</Text></View>)}
      {loading && <Text accessibilityLiveRegion="polite">{t('chatThinking')}</Text>}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
    {!complete && <View style={styles.composer}><Text style={styles.composerLabel}>{state.language === 'es' ? 'Su respuesta' : 'Your response'}</Text><Text style={styles.privacyNotice}>{t('chatPrivacyNotice')}</Text><View style={styles.composerRow}><TextInput accessibilityLabel={t('chatPlaceholder')} placeholder={t('chatPlaceholder')} value={input} onChangeText={setInput} editable={consent && !loading} maxLength={1200} onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)} style={[styles.input, inputFocused && styles.inputFocused]} multiline /><ActionButton compact icon="send" accessibilityLabel={t('chatSend')} label={t('chatSend')} onPress={send} disabled={!input.trim() || loading || !consent} /></View></View>}
    {complete && <Text style={styles.closing}>{t('chatComplete')}</Text>}
    {activeScreen ? <ActionButton label={t('chatContinue')} onPress={() => router.replace(`/lesson/${lessonId.slice(0, 2)}/${lessonId}` as never)} /> : null}
  </AppScreen>;
}
const styles = StyleSheet.create({
  back: { minHeight: 48, paddingHorizontal: spacing.sm, justifyContent: 'center', alignSelf: 'flex-start' },
  transcriptHeader: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md, borderBottomWidth: 1, borderBottomColor: palette.border },
  transcriptTitle: { color: palette.ink, fontSize: 15, fontWeight: '800' },
  thread: { flex: 1 },
  content: { gap: spacing.sm, padding: spacing.md },
  consentSurface: { gap: spacing.md, padding: spacing.lg, borderWidth: 1, borderColor: palette.primaryDark, borderRadius: radius.lg, backgroundColor: palette.primarySoft },
  consentHeading: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  consentText: { color: palette.ink, fontSize: 15, lineHeight: 23 },
  bubble: { padding: spacing.md, borderRadius: radius.md, maxWidth: '90%', borderWidth: 1 },
  user: { alignSelf: 'flex-end', backgroundColor: palette.primarySoft, borderColor: palette.primary },
  assistant: { alignSelf: 'flex-start', backgroundColor: palette.surfaceSoft, borderColor: palette.border },
  role: { color: palette.inkMuted, fontSize: 12, fontWeight: '900', letterSpacing: 0.3, marginBottom: 4 },
  message: { color: palette.ink, fontSize: 16, lineHeight: 24 },
  composer: { gap: spacing.sm, padding: spacing.md, borderTopWidth: 1, borderTopColor: palette.border, backgroundColor: palette.surface },
  composerLabel: { color: palette.ink, fontSize: 14, fontWeight: '800' },
  composerRow: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm },
  privacyNotice: { color: palette.inkMuted, fontSize: 12, lineHeight: 17 },
  input: { flex: 1, minHeight: 48, maxHeight: 128, borderWidth: 1, borderColor: palette.border, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, color: palette.ink, backgroundColor: palette.background },
  inputFocused: { borderColor: palette.focus, outlineWidth: 2, outlineColor: palette.focus, outlineOffset: 1 },
  title: { color: palette.ink, fontWeight: '800', fontSize: 18 },
  closing: { color: palette.primaryDark, fontWeight: '800', padding: spacing.md },
  error: { color: palette.danger, paddingHorizontal: spacing.md },
});
