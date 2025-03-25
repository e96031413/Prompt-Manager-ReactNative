import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { usePromptStore } from '../../store/promptStore';

export default function PromptDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { prompts } = usePromptStore();
  
  const prompt = prompts.find(p => p.id === id);

  if (!prompt) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#f2f2f7' }]}>
        <Text style={[styles.errorText, { color: isDark ? '#ff453a' : '#ff3b30' }]}>
          Prompt not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#000000' : '#f2f2f7' }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.card, { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' }]}>
        <Text style={[styles.title, { color: isDark ? '#ffffff' : '#000000' }]}>
          {prompt.title}
        </Text>
        
        <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
          Description
        </Text>
        <Text style={[styles.description, { color: isDark ? '#cccccc' : '#666666' }]}>
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

        <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
          Prompt Text
        </Text>
        <View style={[styles.promptBox, { backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}>
          <Text style={[styles.promptText, { color: isDark ? '#ffffff' : '#000000' }]}>
            {prompt.text}
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
          Examples
        </Text>
        {prompt.examples.map((example, index) => (
          <View key={index} style={styles.example}>
            <View style={[styles.exampleBox, { backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}>
              <Text style={[styles.exampleLabel, { color: isDark ? '#666666' : '#999999' }]}>
                Input:
              </Text>
              <Text style={[styles.exampleText, { color: isDark ? '#ffffff' : '#000000' }]}>
                {example.input}
              </Text>
            </View>
            <View style={[styles.exampleBox, { backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}>
              <Text style={[styles.exampleLabel, { color: isDark ? '#666666' : '#999999' }]}>
                Output:
              </Text>
              <Text style={[styles.exampleText, { color: isDark ? '#ffffff' : '#000000' }]}>
                {example.output}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.metadata}>
          <Text style={[styles.metadataText, { color: isDark ? '#666666' : '#999999' }]}>
            Created: {new Date(prompt.createdAt).toLocaleDateString()}
          </Text>
          <Text style={[styles.metadataText, { color: isDark ? '#666666' : '#999999' }]}>
            Last updated: {new Date(prompt.updatedAt).toLocaleDateString()}
          </Text>
          <Text style={[styles.metadataText, { color: isDark ? '#666666' : '#999999' }]}>
            Version: {prompt.version}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
  },
  promptBox: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  promptText: {
    fontSize: 16,
    lineHeight: 24,
  },
  example: {
    marginBottom: 16,
  },
  exampleBox: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  exampleLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 16,
    lineHeight: 24,
  },
  metadata: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#cccccc',
  },
  metadataText: {
    fontSize: 14,
    marginBottom: 4,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});