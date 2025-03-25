import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store/themeStore';

export function useAppTheme() {
  const systemColorScheme = useColorScheme();
  const { theme } = useThemeStore();

  const isDark = theme === 'system' 
    ? systemColorScheme === 'dark'
    : theme === 'dark';

  return { isDark, theme };
}