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
  bestStreak: number;
  lastLogin: string | null;
  xp: number;
  level: number;
  totalStudyTime: number; // em minutos
  weeklyGoals: {
    questions: number;
    studyTime: number;
  };
  stats: {
    totalQuestions: number;
    correctQuestions: number;
    sessionsCompleted: number;
  };
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
