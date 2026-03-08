import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, Subject, SavedQuestion } from '../types';
import { ENEM_DATA } from '../data/enemData';

interface AppContextType {
  // Profile
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  
  // Subjects
  subjects: Subject[];
  setSubjects: (subjects: Subject[]) => void;
  selectedSubjectId: string | null;
  setSelectedSubjectId: (id: string | null) => void;
  
  // Navigation
  currentTab: 'home' | 'achievements' | 'questions' | 'pomodoro' | 'tasks';
  setCurrentTab: (tab: 'home' | 'achievements' | 'questions' | 'pomodoro' | 'tasks') => void;
  
  // Theme
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  
  // Questions
  savedQuestions: SavedQuestion[];
  setSavedQuestions: (questions: SavedQuestion[]) => void;
  
  // Tasks
  tasks: { id: string; text: string; completed: boolean }[];
  setTasks: (tasks: { id: string; text: string; completed: boolean }[]) => void;
  
  // Online Status
  isOnline: boolean;
  
  // Loading
  isInitialized: boolean;
  initializationError: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Estudante',
    photo: null,
    achievements: [],
    streak: 0,
    bestStreak: 0,
    lastLogin: null,
    xp: 0,
    level: 1,
    totalStudyTime: 0,
    weeklyGoals: {
      questions: 50,
      studyTime: 300,
    },
    stats: {
      totalQuestions: 0,
      correctQuestions: 0,
      sessionsCompleted: 0,
    },
  });

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'home' | 'achievements' | 'questions' | 'pomodoro' | 'tasks'>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([]);
  const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    try {
      const savedSubjects = localStorage.getItem('enem_subjects');
      const savedProfile = localStorage.getItem('enem_profile');
      const savedTheme = localStorage.getItem('enem_theme');
      const savedQs = localStorage.getItem('enem_saved_questions');
      const savedTasks = localStorage.getItem('enem_tasks');

      if (savedSubjects) {
        const local = JSON.parse(savedSubjects) as Subject[];
        const merged = ENEM_DATA.map((originalSubject) => {
          const localSubject = local.find((ls) => ls.id === originalSubject.id);
          if (!localSubject) return originalSubject;

          return {
            ...localSubject,
            name: originalSubject.name,
            icon: originalSubject.icon,
            color: originalSubject.color,
            topics: [
              ...originalSubject.topics.map((originalTopic) => {
                const localTopic = localSubject.topics.find((lt) => lt.id === originalTopic.id);
                return {
                  ...originalTopic,
                  completed: localTopic ? localTopic.completed : false,
                  questions: originalTopic.questions,
                };
              }),
              ...localSubject.topics.filter((lt) => !originalSubject.topics.some((ot) => ot.id === lt.id)),
            ],
          };
        });

        const customSubjects = local.filter((ls) => !ENEM_DATA.some((os) => os.id === ls.id));
        setSubjects([...merged, ...customSubjects]);
      } else {
        setSubjects(ENEM_DATA);
      }

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }

      if (savedTheme) {
        setDarkMode(JSON.parse(savedTheme));
      }

      if (savedQs) {
        setSavedQuestions(JSON.parse(savedQs));
      }

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setInitializationError('Erro ao carregar dados do aplicativo');
      setSubjects(ENEM_DATA);
      setIsInitialized(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('enem_profile', JSON.stringify(profile));
  }, [profile]);

  // Save subjects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('enem_subjects', JSON.stringify(subjects));
  }, [subjects]);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('enem_theme', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save questions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('enem_saved_questions', JSON.stringify(savedQuestions));
  }, [savedQuestions]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('enem_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const value: AppContextType = {
    profile,
    setProfile,
    subjects,
    setSubjects,
    selectedSubjectId,
    setSelectedSubjectId,
    currentTab,
    setCurrentTab,
    darkMode,
    setDarkMode,
    savedQuestions,
    setSavedQuestions,
    tasks,
    setTasks,
    isOnline,
    isInitialized,
    initializationError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
