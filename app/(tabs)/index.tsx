import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { usePromptStore } from '../../store/promptStore';
import { useAppTheme } from '../../hooks/useAppTheme';
import PromptCard from '../../components/PromptCard';

export default function LibraryScreen() {
  const { isDark } = useAppTheme();
  const [searchText, setSearchText] = useState('');
  
  const { prompts, setSearchQuery } = usePromptStore();
  const activePrompts = prompts.filter(p => !p.isArchived);

  const filteredPrompts = activePrompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchText.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchText.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#000000' : '#f2f2f7' }
    ]}>
      <View style={styles.searchContainer}>
        <View style={[
          styles.searchBar,
          { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' }
        ]}>
          <Search size={20} color={isDark ? '#ffffff' : '#000000'} />
          <TextInput
            style={[
              styles.searchInput,
              { color: isDark ? '#ffffff' : '#000000' }
            ]}
            placeholder="Search prompts..."
            placeholderTextColor={isDark ? '#666666' : '#999999'}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              setSearchQuery(text);
            }}
          />
          <SlidersHorizontal size={20} color={isDark ? '#ffffff' : '#000000'} />
        </View>
      </View>

      <FlashList
        data={filteredPrompts}
        renderItem={({ item }) => (
          <PromptCard
            prompt={item}
            onArchive={() => archivePrompt(item.id)}
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
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
  },
  list: {
    paddingBottom: 16,
  },
});