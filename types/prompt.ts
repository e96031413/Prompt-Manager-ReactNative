export type LLMType = 'gpt-4' | 'gpt-3.5-turbo' | 'claude-2' | 'claude-instant' | 'custom';

export interface Prompt {
  id: string;
  title: string;
  text: string;
  tags: string[];
  llmType: LLMType;
  description: string;
  examples: {
    input: string;
    output: string;
  }[];
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  version: number;
  versionHistory: {
    version: number;
    text: string;
    updatedAt: string;
  }[];
}

export interface PromptStore {
  prompts: Prompt[];
  searchQuery: string;
  selectedTags: string[];
  sortBy: 'date' | 'title' | 'category';
  addPrompt: (prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'versionHistory'>) => void;
  updatePrompt: (id: string, updates: Partial<Prompt>) => void;
  deletePrompt: (id: string) => void;
  archivePrompt: (id: string) => void;
  restorePrompt: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  setSortBy: (sortBy: 'date' | 'title' | 'category') => void;
}