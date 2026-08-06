import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { CurriculumImageAsset } from '@/src/content/image-registry';
import { palette, radius, spacing } from '@/src/theme/tokens';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

export function CurriculumImage({ asset, locale, compact = false }: { asset: CurriculumImageAsset; locale: 'en' | 'es'; compact?: boolean }) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  return <View style={[styles.frame, compact && styles.compact]}>
    <Image
      source={asset.source}
      accessibilityLabel={asset.decorative ? undefined : asset.altText[locale]}
      accessible={!asset.decorative}
      contentFit="contain"
      transition={reducedMotion ? 0 : 180}
      style={[styles.image, { aspectRatio: asset.aspectRatio }]}
    />
    {!asset.decorative && !compact ? <Text style={styles.attribution}>{t('imageSource')}: {asset.attribution}</Text> : null}
  </View>;
}

const styles = StyleSheet.create({
  frame: { alignSelf: 'stretch', overflow: 'hidden', borderRadius: radius.lg, backgroundColor: palette.surfaceSoft, borderWidth: 1, borderColor: palette.border, padding: spacing.md },
  compact: { width: 82, alignSelf: 'center' },
  image: { width: '100%', maxHeight: 320 },
  attribution: { color: palette.inkMuted, fontSize: 11, lineHeight: 16, marginTop: spacing.sm },
});
