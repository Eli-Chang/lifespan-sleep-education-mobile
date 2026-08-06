import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View, type PressableProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { depth, motion, palette, radius, spacing, touchTarget, type as typeScale } from '@/src/theme/tokens';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

export function AppScreen({ children, scroll = true }: React.PropsWithChildren<{ scroll?: boolean }>) {
  const body = <View style={styles.content}>{children}</View>;
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {scroll ? <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">{body}</ScrollView> : body}
    </SafeAreaView>
  );
}

export function Header({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return <View style={styles.header}>
    {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
    <Text accessibilityRole="header" style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>;
}

export function ProgressMeter({ value, label }: { value: number; label: string }) {
  return <View accessible accessibilityRole="progressbar" accessibilityLabel={`${label}: ${value}%`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} style={styles.meterWrap}>
    <View style={styles.meterLabelRow}><Text style={styles.meterLabel}>{label}</Text><Text style={styles.meterValue}>{value}%</Text></View>
    <View style={styles.track}><View style={[styles.fill, { width: `${Math.max(0, Math.min(100, value))}%` }]} /></View>
  </View>;
}

export function ActionButton({ label, icon, variant = 'primary', compact = false, ...props }: PressableProps & { label: string; icon?: keyof typeof MaterialCommunityIcons.glyphMap; variant?: 'primary' | 'secondary' | 'danger'; compact?: boolean }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const useNativeDriver = Platform.OS !== 'web';
  const animate = (value: number) => reducedMotion ? scale.setValue(1) : Animated.timing(scale, { toValue: value, duration: motion.quick, useNativeDriver }).start();
  return <Animated.View style={{ backgroundColor: 'transparent', transform: [{ scale }] }}><Pressable
    accessibilityRole="button"
    {...props}
    accessibilityLabel={props.accessibilityLabel ?? label}
    onFocus={(event) => { setFocused(true); props.onFocus?.(event); }}
    onBlur={(event) => { setFocused(false); props.onBlur?.(event); }}
    onPressIn={(event) => { animate(motion.pressScale); props.onPressIn?.(event); }}
    onPressOut={(event) => { animate(1); props.onPressOut?.(event); }}
    style={({ pressed }) => [styles.button, compact && styles.compactButton, depth.none, styles[`${variant}Button`], focused && styles.focused, pressed && styles.pressed, props.disabled && styles.disabled]}
    >
    {icon ? <MaterialCommunityIcons accessible={false} importantForAccessibility="no" name={icon} size={21} color={variant === 'primary' ? palette.white : variant === 'danger' ? palette.danger : palette.primaryDark} /> : null}
    {!compact && <Text style={[styles.buttonText, styles[`${variant}Text`]]}>{label}</Text>}
  </Pressable></Animated.View>;
}

export function StatusPill({ label, complete = false }: { label: string; complete?: boolean }) {
  return <View style={[styles.pill, complete && styles.completePill]}>
    <MaterialCommunityIcons accessible={false} importantForAccessibility="no" name={complete ? 'check-circle-outline' : 'progress-clock'} size={16} color={complete ? palette.success : palette.inkMuted} />
    <Text style={[styles.pillText, complete && { color: palette.success }]}>{label}</Text>
  </View>;
}

export const Card = ({ children }: React.PropsWithChildren) => <View style={styles.card}>{children}</View>;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  scroll: { flexGrow: 1, paddingBottom: 120 },
  content: { width: '100%', maxWidth: 900, alignSelf: 'center', padding: spacing.lg, gap: spacing.lg },
  header: { gap: spacing.sm, paddingTop: spacing.sm },
  eyebrow: { color: palette.primaryDark, fontSize: 13, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  title: { color: palette.ink, ...typeScale.title },
  subtitle: { color: palette.inkMuted, fontSize: 17, lineHeight: 27 },
  meterWrap: { gap: spacing.sm },
  meterLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  meterLabel: { color: palette.ink, fontSize: 14, fontWeight: '700' },
  meterValue: { color: palette.primaryDark, fontSize: 15, fontWeight: '800' },
  track: { height: 10, borderRadius: radius.pill, overflow: 'hidden', backgroundColor: palette.border },
  fill: { height: '100%', borderRadius: radius.pill, backgroundColor: palette.primary },
  button: { minHeight: touchTarget, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: 9, flexDirection: 'row', gap: spacing.sm, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  compactButton: { width: touchTarget, paddingHorizontal: 0, gap: 0 },
  primaryButton: { backgroundColor: palette.primary, borderColor: palette.primary },
  secondaryButton: { backgroundColor: palette.primarySoft, borderColor: palette.border },
  dangerButton: { backgroundColor: palette.surface, borderColor: palette.danger },
  buttonText: { fontSize: 16, fontWeight: '800' },
  primaryText: { color: palette.white },
  secondaryText: { color: palette.primaryDark },
  dangerText: { color: palette.danger },
  pressed: { opacity: 0.9 },
  disabled: { opacity: 0.62 },
  focused: { outlineWidth: 2, outlineColor: palette.focus, outlineOffset: 2 },
  card: { ...depth.none, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.border, borderRadius: radius.md, padding: spacing.lg, gap: spacing.md },
  pill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: palette.surfaceSoft, paddingHorizontal: 10, paddingVertical: 7, borderRadius: radius.pill },
  completePill: { backgroundColor: palette.successSoft },
  pillText: { color: palette.inkMuted, fontSize: 12, fontWeight: '800' },
});
