import { create } from 'zustand';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const THEME_STORAGE_KEY = '@theme_store';

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'system',
  setTheme: async (theme) => {
    set({ theme });
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  },
}));

// Load stored theme on initialization
if (Platform.OS === 'web') {
  AsyncStorage.getItem(THEME_STORAGE_KEY).then((storedTheme) => {
    if (storedTheme) {
      useThemeStore.setState({ theme: storedTheme as Theme });
    }
  });
}