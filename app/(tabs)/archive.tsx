import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { usePromptStore } from '../../store/promptStore';
import { useAppTheme } from '../../hooks/useAppTheme';
import PromptCard from '../../components/PromptCard';

export default function ArchiveScreen() {
  const { isDark } = useAppTheme();
  const { prompts, deletePrompt, restorePrompt } = usePromptStore();
  const archivedPrompts = prompts.filter(p => p.isArchived);

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#000000' : '#f2f2f7' }
    ]}>
      <FlashList
        data={archivedPrompts}
        renderItem={({ item }) => (
          <PromptCard
            prompt={item}
            onArchive={() => restorePrompt(item.id)}
            onDelete={() => deletePrompt(item.id)}
          />
        )}
        estimatedItemSize={200}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
});