export type Role = 'user' | 'model';

export interface Message {
  id: string;
  role: Role;
  text: string;
  isStreaming?: boolean;
}

export type ViewState = 'chat' | 'mood' | 'resources';

export interface MoodEntry {
  id: string;
  timestamp: number;
  rating: number; // 1-5
  note?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'breathing' | 'grounding' | 'sleep' | 'affirmation';
  duration?: string;
}
