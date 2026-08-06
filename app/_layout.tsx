import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '@/src/i18n';
import { AppProvider } from '@/src/state/AppProvider';

export default function RootLayout() {
  return <AppProvider>
    <StatusBar style="dark" />
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="module/[id]" />
      <Stack.Screen name="lesson/[moduleId]/[screenId]" />
      <Stack.Screen name="about" options={{ presentation: 'modal' }} />
      <Stack.Screen name="settings/voice-lab" />
      <Stack.Screen name="ai" />
    </Stack>
  </AppProvider>;
}
