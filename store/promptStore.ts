import { create } from 'zustand';
import { PromptStore, Prompt } from '../types/prompt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@prompt_store';

const defaultPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Professional Email Writer',
    description: 'Generates professional and courteous email responses',
    text: 'Write a professional email response to the following message, maintaining a courteous and business-appropriate tone: {{input}}',
    tags: ['email', 'business', 'communication'],
    llmType: 'gpt-4',
    examples: [
      {
        input: 'Need to reschedule our meeting tomorrow due to an emergency.',
        output: 'Dear [Name],\n\nThank you for letting me know about the situation. I completely understand that emergencies can arise unexpectedly. Would you please suggest a few alternative times that work better for you, and I\'ll be happy to reschedule our meeting?\n\nBest regards,\n[Your name]'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isArchived: false,
    version: 1,
    versionHistory: []
  },
  {
    id: '2',
    title: 'Code Documentation Generator',
    description: 'Creates comprehensive documentation for code snippets',
    text: 'Generate detailed documentation for the following code, including description, parameters, return values, and usage examples:\n\n{{input}}',
    tags: ['programming', 'documentation', 'technical'],
    llmType: 'gpt-4',
    examples: [
      {
        input: 'function calculateTotal(items, taxRate) {\n  const subtotal = items.reduce((sum, item) => sum + item.price, 0);\n  return subtotal * (1 + taxRate);\n}',
        output: '/**\n * Calculates the total cost including tax for a collection of items\n * \n * @param {Array<Object>} items - Array of items with price property\n * @param {number} taxRate - Tax rate as a decimal (e.g., 0.1 for 10%)\n * @returns {number} Total cost including tax\n * \n * @example\n * const items = [{ price: 10 }, { price: 20 }];\n * const total = calculateTotal(items, 0.1);\n * // Returns: 33 (30 + 10% tax)\n */'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isArchived: false,
    version: 1,
    versionHistory: []
  },
  {
    id: '3',
    title: 'Blog Post Outline Creator',
    description: 'Generates structured outlines for blog posts',
    text: 'Create a detailed blog post outline for the topic: {{input}}. Include main sections, subsections, and key points to cover.',
    tags: ['writing', 'content', 'blog'],
    llmType: 'gpt-4',
    examples: [
      {
        input: 'The Impact of Artificial Intelligence on Modern Healthcare',
        output: '# The Impact of AI on Modern Healthcare\n\n1. Introduction\n   - Brief history of AI in healthcare\n   - Current state of healthcare technology\n\n2. Diagnostic Applications\n   - Medical imaging analysis\n   - Pattern recognition in patient data\n   - Early disease detection\n\n3. Treatment Planning\n   - Personalized medicine\n   - Drug development\n   - Robot-assisted surgery\n\n4. Patient Care\n   - Remote monitoring\n   - Virtual health assistants\n   - Predictive analytics\n\n5. Challenges and Concerns\n   - Data privacy\n   - Regulatory compliance\n   - Human oversight\n\n6. Future Prospects\n   - Emerging technologies\n   - Integration possibilities\n   - Potential impacts\n\n7. Conclusion\n   - Summary of benefits\n   - Call to action'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isArchived: false,
    version: 1,
    versionHistory: []
  }
];

export const usePromptStore = create<PromptStore>((set) => ({
  prompts: defaultPrompts,
  searchQuery: '',
  selectedTags: [],
  sortBy: 'date',

  addPrompt: (promptData) => set((state) => {
    const newPrompt: Prompt = {
      ...promptData,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      versionHistory: [],
      isArchived: false,
    };

    const updatedPrompts = [...state.prompts, newPrompt];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrompts));
    return { prompts: updatedPrompts };
  }),

  updatePrompt: (id, updates) => set((state) => {
    const prompt = state.prompts.find(p => p.id === id);
    if (!prompt) return state;

    const updatedPrompt = {
      ...prompt,
      ...updates,
      updatedAt: new Date().toISOString(),
      version: prompt.version + 1,
      versionHistory: [
        ...prompt.versionHistory,
        {
          version: prompt.version,
          text: prompt.text,
          updatedAt: prompt.updatedAt,
        },
      ],
    };

    const updatedPrompts = state.prompts.map(p => p.id === id ? updatedPrompt : p);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrompts));
    return { prompts: updatedPrompts };
  }),

  deletePrompt: (id) => set((state) => {
    const updatedPrompts = state.prompts.filter(p => p.id !== id);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrompts));
    return { prompts: updatedPrompts };
  }),

  archivePrompt: (id) => set((state) => {
    const updatedPrompts = state.prompts.map(p => p.id === id ? { ...p, isArchived: true } : p);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrompts));
    return { prompts: updatedPrompts };
  }),

  restorePrompt: (id) => set((state) => {
    const updatedPrompts = state.prompts.map(p => p.id === id ? { ...p, isArchived: false } : p);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrompts));
    return { prompts: updatedPrompts };
  }),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  setSortBy: (sortBy) => set({ sortBy }),

  deleteAllPrompts: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      set({ prompts: [] });
    } catch (error) {
      console.error('Delete all failed:', error);
      throw error;
    }
  }
}));

// Load stored prompts on initialization
AsyncStorage.getItem(STORAGE_KEY).then((data) => {
  if (data) {
    const storedPrompts = JSON.parse(data);
    if (storedPrompts.length === 0) {
      // If no stored prompts, initialize with default prompts
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPrompts));
      usePromptStore.setState({ prompts: defaultPrompts });
    } else {
      usePromptStore.setState({ prompts: storedPrompts });
    }
  } else {
    // If no data in storage, initialize with default prompts
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPrompts));
    usePromptStore.setState({ prompts: defaultPrompts });
  }
});