import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Moon, Sun, Trash2, Laptop } from 'lucide-react-native';
import { usePromptStore } from '../../store/promptStore';
import { useThemeStore } from '../../store/themeStore';
import { useAppTheme } from '../../hooks/useAppTheme';

export default function SettingsScreen() {
  const { isDark, theme } = useAppTheme();
  const setTheme = useThemeStore(state => state.setTheme);
  const { deleteAllPrompts } = usePromptStore();

  const handleDeleteAll = () => {
    if (Platform.OS === 'web' && window.confirm('Are you sure you want to delete all prompts? This action cannot be undone.')) {
      deleteAllPrompts();
    }
  };

  const getThemeIcon = (themeType: 'light' | 'dark' | 'system') => {
    switch (themeType) {
      case 'light':
        return <Sun size={20} color={isDark ? '#ffffff' : '#000000'} />;
      case 'dark':
        return <Moon size={20} color={isDark ? '#ffffff' : '#000000'} />;
      case 'system':
        return <Laptop size={20} color={isDark ? '#ffffff' : '#000000'} />;
    }
  };

  const getThemeLabel = (themeType: 'light' | 'dark' | 'system') => {
    switch (themeType) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
    }
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#000000' : '#f2f2f7' }
    ]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
          Settings
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
          Appearance
        </Text>
        <View style={[styles.card, { backgroundColor: isDark ? '#2c2c2e' : '#f8f8f8' }]}>
          {(['light', 'dark', 'system'] as const).map((themeType) => (
            <TouchableOpacity
              key={themeType}
              style={[
                styles.row,
                theme === themeType && styles.selectedRow,
                { borderBottomColor: isDark ? '#38383A' : '#e5e5e5' }
              ]}
              onPress={() => setTheme(themeType)}
            >
              {getThemeIcon(themeType)}
              <Text style={[styles.rowText, { color: isDark ? '#ffffff' : '#000000' }]}>
                {getThemeLabel(themeType)}
              </Text>
              {theme === themeType && (
                <View style={[styles.checkmark, { backgroundColor: isDark ? '#007AFF' : '#0A84FF' }]} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
          Danger Zone
        </Text>
        <View style={[styles.card, { backgroundColor: isDark ? '#2c2c2e' : '#f8f8f8' }]}>
          <TouchableOpacity
            style={[styles.row, styles.dangerRow]}
            onPress={handleDeleteAll}
          >
            <Trash2 size={20} color="#ff3b30" />
            <Text style={styles.dangerText}>Delete All Prompts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selectedRow: {
    backgroundColor: Platform.select({
      web: 'rgba(0, 122, 255, 0.1)',
      default: 'transparent'
    }),
  },
  rowText: {
    fontSize: 17,
    marginLeft: 16,
    flex: 1,
  },
  checkmark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#38383A',
  },
  dangerText: {
    color: '#ff3b30',
    fontSize: 17,
    marginLeft: 16,
    flex: 1,
  },
});