import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Plus, X } from 'lucide-react-native';
import { usePromptStore } from '../../store/promptStore';
import { useAppTheme } from '../../hooks/useAppTheme';

export default function CreateScreen() {
  const { isDark } = useAppTheme();
  const addPrompt = usePromptStore(state => state.addPrompt);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [promptText, setPromptText] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [examples, setExamples] = useState<{ input: string; output: string }[]>([
    { input: '', output: '' }
  ]);

  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleAddExample = () => {
    setExamples([...examples, { input: '', output: '' }]);
  };

  const handleExampleChange = (index: number, field: 'input' | 'output', value: string) => {
    const newExamples = [...examples];
    newExamples[index][field] = value;
    setExamples(newExamples);
  };

  const handleSubmit = () => {
    if (!title.trim() || !promptText.trim()) return;

    addPrompt({
      title: title.trim(),
      description: description.trim(),
      text: promptText.trim(),
      tags,
      llmType: 'gpt-4',
      examples: examples.filter(ex => ex.input.trim() || ex.output.trim()),
    });

    router.push('/');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#000000' : '#f2f2f7' }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.form, { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' }]}>
        <Text style={[styles.label, { color: isDark ? '#ffffff' : '#000000' }]}>Title</Text>
        <TextInput
          style={[styles.input, { color: isDark ? '#ffffff' : '#000000', backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter prompt title..."
          placeholderTextColor={isDark ? '#666666' : '#999999'}
        />

        <Text style={[styles.label, { color: isDark ? '#ffffff' : '#000000' }]}>Description</Text>
        <TextInput
          style={[styles.input, { color: isDark ? '#ffffff' : '#000000', backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter prompt description..."
          placeholderTextColor={isDark ? '#666666' : '#999999'}
          multiline
          numberOfLines={3}
        />

        <Text style={[styles.label, { color: isDark ? '#ffffff' : '#000000' }]}>Prompt Text</Text>
        <TextInput
          style={[styles.input, styles.promptInput, { color: isDark ? '#ffffff' : '#000000', backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}
          value={promptText}
          onChangeText={setPromptText}
          placeholder="Enter your prompt..."
          placeholderTextColor={isDark ? '#666666' : '#999999'}
          multiline
          numberOfLines={6}
        />

        <Text style={[styles.label, { color: isDark ? '#ffffff' : '#000000' }]}>Tags</Text>
        <View style={styles.tagInput}>
          <TextInput
            style={[styles.input, { flex: 1, color: isDark ? '#ffffff' : '#000000', backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}
            value={tag}
            onChangeText={setTag}
            placeholder="Add tags..."
            placeholderTextColor={isDark ? '#666666' : '#999999'}
            onSubmitEditing={handleAddTag}
          />
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]} 
            onPress={handleAddTag}
          >
            <Plus size={20} color={isDark ? '#007AFF' : '#0A84FF'} />
          </TouchableOpacity>
        </View>
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View
              key={index}
              style={[styles.tag, { backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}
            >
              <Text style={[styles.tagText, { color: isDark ? '#ffffff' : '#000000' }]}>{tag}</Text>
              <TouchableOpacity onPress={() => removeTag(index)}>
                <X size={16} color={isDark ? '#ffffff' : '#000000'} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Text style={[styles.label, { color: isDark ? '#ffffff' : '#000000' }]}>Examples</Text>
        {examples.map((example, index) => (
          <View key={index} style={styles.exampleContainer}>
            <TextInput
              style={[styles.input, { color: isDark ? '#ffffff' : '#000000', backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}
              value={example.input}
              onChangeText={(value) => handleExampleChange(index, 'input', value)}
              placeholder="Input example..."
              placeholderTextColor={isDark ? '#666666' : '#999999'}
              multiline
            />
            <TextInput
              style={[styles.input, { color: isDark ? '#ffffff' : '#000000', backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}
              value={example.output}
              onChangeText={(value) => handleExampleChange(index, 'output', value)}
              placeholder="Expected output..."
              placeholderTextColor={isDark ? '#666666' : '#999999'}
              multiline
            />
          </View>
        ))}
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7' }]}
          onPress={handleAddExample}
        >
          <Plus size={20} color={isDark ? '#007AFF' : '#0A84FF'} />
          <Text style={[styles.addButtonText, { color: isDark ? '#007AFF' : '#0A84FF' }]}>
            Add Example
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.submitButton,
            { opacity: !title.trim() || !promptText.trim() ? 0.5 : 1 }
          ]}
          onPress={handleSubmit}
          disabled={!title.trim() || !promptText.trim()}
        >
          <Text style={styles.submitButtonText}>Create Prompt</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  promptInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  tagInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 12,
    borderRadius: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  tagText: {
    fontSize: 14,
  },
  exampleContainer: {
    gap: 8,
    marginTop: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});