export interface Topic {
  id: string;
  title: string;
  completed: boolean;
  questions?: Question[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: Topic[];
}

export interface UserProfile {
  name: string;
  photo: string | null;
  achievements: string[];
  streak: number;
  lastLogin: string | null;
  xp: number;
  level: number;
  totalCorrect: number;
  totalAnswered: number;
  consecutiveCorrect: number;
  bestConsecutive: number;
}

export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic?: string;
  institution?: string;
  year?: number;
}

export interface Attempt {
  timestamp: number;
  selectedOption: number;
  isCorrect: boolean;
}

export interface SavedQuestion extends Question {
  id: string;
  subjectId: string;
  attempts: Attempt[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'questions' | 'topics' | 'streak' | 'accuracy' | 'special';
  condition: (profile: UserProfile, subjects: Subject[], savedQuestions: SavedQuestion[]) => boolean;
}

export interface ToastNotification {
  id: string;
  type: 'achievement' | 'levelup' | 'streak' | 'info' | 'error';
  title: string;
  message: string;
  icon?: string;
  duration?: number;
}
