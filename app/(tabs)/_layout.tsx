import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { palette } from '@/src/theme/tokens';

export default function TabLayout() {
  const { t } = useTranslation();
  return <Tabs screenOptions={{
    headerShown: false, tabBarActiveTintColor: palette.primaryDark, tabBarInactiveTintColor: palette.inkMuted,
    tabBarStyle: { height: 72, paddingTop: 8, paddingBottom: 10, backgroundColor: palette.surface, borderTopColor: palette.border },
    tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
  }}>
    <Tabs.Screen name="index" options={{ title: t('home'), tabBarAccessibilityLabel: t('home'), tabBarIcon: ({ color }) => <MaterialCommunityIcons accessible={false} importantForAccessibility="no" name="home-outline" color={color} size={25} /> }} />
    <Tabs.Screen name="explore" options={{ href: null }} />
    <Tabs.Screen name="settings" options={{ title: t('settings'), tabBarAccessibilityLabel: t('settings'), tabBarIcon: ({ color }) => <MaterialCommunityIcons accessible={false} importantForAccessibility="no" name="cog-outline" color={color} size={25} /> }} />
  </Tabs>;
}
