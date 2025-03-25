import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Archive, Pencil, Trash2 } from 'lucide-react-native';
import { Prompt } from '../types/prompt';
import { useAppTheme } from '../hooks/useAppTheme';

interface PromptCardProps {
  prompt: Prompt;
  onArchive: () => void;
  onDelete: () => void;
}

export default function PromptCard({ prompt, onArchive, onDelete }: PromptCardProps) {
  const { isDark } = useAppTheme();

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' }
    ]}>
      <Link href={`/prompt/${prompt.id}`} asChild>
        <TouchableOpacity style={styles.content}>
          <Text style={[styles.title, { color: isDark ? '#ffffff' : '#000000' }]}>
            {prompt.title}
          </Text>
          <Text 
            style={[styles.description, { color: isDark ? '#cccccc' : '#666666' }]}
            numberOfLines={2}
          >
            {prompt.description}
          </Text>
          <View style={styles.tags}>
            {prompt.tags.map((tag, index) => (
              <View 
                key={index} 
                style={[styles.tag, { backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}
              >
                <Text style={[styles.tagText, { color: isDark ? '#ffffff' : '#000000' }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </Link>

      <View style={[
        styles.actions,
        { borderTopColor: isDark ? '#38383A' : '#e5e5e5' }
      ]}>
        <Link href={`/prompt/edit/${prompt.id}`} asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Pencil size={20} color={isDark ? '#007AFF' : '#0A84FF'} />
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.actionButton} onPress={onArchive}>
          <Archive size={20} color={isDark ? '#007AFF' : '#0A84FF'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
          <Trash2 size={20} color="#ff3b30" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});