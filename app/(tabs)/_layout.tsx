import { Tabs } from 'expo-router';
import { Library, Plus, Settings, Archive } from 'lucide-react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

export default function TabLayout() {
  const { isDark } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
        },
        tabBarActiveTintColor: isDark ? '#007AFF' : '#0A84FF',
        tabBarInactiveTintColor: isDark ? '#666666' : '#999999',
        headerStyle: {
          backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
        },
        headerTintColor: isDark ? '#ffffff' : '#000000',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => <Library size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          title: 'Archive',
          tabBarIcon: ({ color, size }) => <Archive size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}