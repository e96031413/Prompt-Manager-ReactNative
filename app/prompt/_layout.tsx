import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function PromptLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
        },
        headerTintColor: isDark ? '#ffffff' : '#000000',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Prompt Details',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          title: 'Edit Prompt',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}