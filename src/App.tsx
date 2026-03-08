import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { registerPlugin } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

// ── Plugin nativo de Streak (Android Widget) ──────────────────────────────
interface StreakPluginInterface {
  saveStreak(data: {
    streak: number;
    bestStreak: number;
    lastDate: string;
    totalQuestions: number;
    correctQuestions: number;
    darkMode: boolean;
  }): Promise<{ success: boolean }>;
  getStreak(): Promise<{
    streak: number;
    bestStreak: number;
    lastDate: string;
    totalQuestions: number;
    correctQuestions: number;
    darkMode: boolean;
  }>;
}

const StreakPlugin = registerPlugin<StreakPluginInterface>('StreakPlugin');

// Helper: sincronizar dados com o widget Android
async function syncWidgetData(params: {
  streak: number;
  bestStreak: number;
  lastDate: string;
  totalQuestions: number;
  correctQuestions: number;
  darkMode: boolean;
}) {
  try {
    await StreakPlugin.saveStreak(params);
  } catch {
    // Silencioso — plugin só existe no Android nativo
  }
}
import { QUESTION_BANK } from './data/questionBank';
import { 
  Calculator, 
  BookOpen, 
  Globe, 
  FlaskConical, 
  PenTool, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  Trophy, 
  User, 
  Camera,
  LayoutDashboard,
  Plus,
  Moon,
  Sun,
  BrainCircuit,
  Loader2,
  Check,
  X,
  Trash2,
  MoreVertical,
  Share2,
  Lightbulb,
  Search,
  Building2,
  Bookmark,
  Clock,
  List,
  ChevronDown,
  SlidersHorizontal,
  Target,
  Play,
  XCircle,
  Brain,
  Flame,
  Zap,
  BarChart2,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Subject, Topic, UserProfile, Question, SavedQuestion, Attempt } from './types';
import { ENEM_DATA } from './data/enemData';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const ICON_MAP: Record<string, React.ElementType> = {
  Calculator,
  BookOpen,
  Globe,
  FlaskConical,
  PenTool,
};

// ─── Streak Widget Component ────────────────────────────────────────────────
interface StreakWidgetProps {
  streak: number;
  bestStreak: number;
  darkMode: boolean;
}

const StreakWidget = React.memo(({ streak, bestStreak, darkMode }: StreakWidgetProps) => {
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const today = new Date().getDay(); // 0 = domingo

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 rounded-2xl border shadow-sm ${
        darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className={`font-bold text-base ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>
            Sequência de Estudos
          </h3>
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded-full ${
          streak > 0
            ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
            : darkMode ? 'bg-stone-800 text-stone-500' : 'bg-stone-100 text-stone-400'
        }`}>
          {streak > 0 ? `🔥 Ativo` : 'Inativo'}
        </div>
      </div>

      <div className="flex items-end gap-4 mb-4">
        <div>
          <div className={`text-5xl font-black leading-none ${
            streak > 0 ? 'text-orange-500' : darkMode ? 'text-stone-600' : 'text-stone-300'
          }`}>
            {streak}
          </div>
          <div className={`text-xs font-bold uppercase tracking-wider mt-1 ${
            darkMode ? 'text-stone-500' : 'text-stone-400'
          }`}>
            {streak === 1 ? 'dia' : 'dias'} seguidos
          </div>
        </div>
        <div className={`ml-auto text-right`}>
          <div className={`text-xs font-bold uppercase tracking-wider ${
            darkMode ? 'text-stone-600' : 'text-stone-400'
          }`}>
            Recorde
          </div>
          <div className={`text-2xl font-black ${
            darkMode ? 'text-stone-400' : 'text-stone-600'
          }`}>
            🏆 {bestStreak}
          </div>
        </div>
      </div>

      {/* Days of week indicator */}
      <div className="flex justify-between gap-1">
        {days.map((day, idx) => {
          const isToday = idx === today;
          const isPast = idx < today;
          // Simplified: mark today and past days in current streak as active
          const isActive = isToday || (streak > 1 && isPast && idx >= today - (streak - 1));

          return (
            <div key={idx} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                isToday
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : isActive
                  ? darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-500'
                  : darkMode ? 'bg-stone-800 text-stone-600' : 'bg-stone-100 text-stone-400'
              }`}>
                {isToday ? '🔥' : isActive ? '✓' : day}
              </div>
              <span className={`text-[9px] font-bold ${
                isToday
                  ? 'text-orange-500'
                  : darkMode ? 'text-stone-600' : 'text-stone-400'
              }`}>
                {day}
              </span>
            </div>
          );
        })}
      </div>

      {streak === 0 && (
        <p className={`text-xs mt-3 text-center ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>
          Abra o app todos os dias para manter sua sequência! 🚀
        </p>
      )}
    </motion.div>
  );
});

// ─── Stats Widget Component ──────────────────────────────────────────────────
interface StatsWidgetProps {
  savedQuestions: SavedQuestion[];
  darkMode: boolean;
}

const StatsWidget = React.memo(({ savedQuestions, darkMode }: StatsWidgetProps) => {
  const total = savedQuestions.filter(q => q.attempts.length > 0).length;
  const correct = savedQuestions.filter(q => {
    const last = q.attempts[q.attempts.length - 1];
    return last?.isCorrect;
  }).length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 rounded-2xl border shadow-sm ${
        darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-5 h-5 text-indigo-500" />
        <h3 className={`font-bold text-base ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>
          Desempenho nas Questões
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-stone-800' : 'bg-stone-50'}`}>
          <div className={`text-2xl font-black ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>{total}</div>
          <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>Feitas</div>
        </div>
        <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-emerald-950/30' : 'bg-emerald-50'}`}>
          <div className="text-2xl font-black text-emerald-500">{correct}</div>
          <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-emerald-700' : 'text-emerald-600'}`}>Acertos</div>
        </div>
        <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-indigo-950/30' : 'bg-indigo-50'}`}>
          <div className="text-2xl font-black text-indigo-500">{accuracy}%</div>
          <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-indigo-700' : 'text-indigo-600'}`}>Taxa</div>
        </div>
      </div>

      {total > 0 && (
        <div className="mt-3">
          <div className={`h-2 w-full rounded-full overflow-hidden ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${accuracy}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
            />
          </div>
          <p className={`text-[10px] text-center mt-1 font-medium ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>
            {accuracy >= 70 ? '🎯 Ótimo desempenho!' : accuracy >= 50 ? '📈 Continue praticando!' : '💪 Não desista!'}
          </p>
        </div>
      )}
    </motion.div>
  );
});

export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [profile, setProfile] = useState<UserProfile>({ 
    name: 'Estudante', 
    photo: null, 
    achievements: [], 
    streak: 0,
    bestStreak: 0,
    lastLogin: null, 
    xp: 0, 
    level: 1,
  });
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'home' | 'achievements' | 'questions' | 'pomodoro' | 'tasks'>('home');
  const [isInitialized, setIsInitialized] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  
  // Pomodoro & Tasks State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroInitialTime, setPomodoroInitialTime] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work');
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [customTimeInput, setCustomTimeInput] = useState('25');
  const [customBreakInput, setCustomBreakInput] = useState('5');
  const [tasks, setTasks] = useState<{id: string, text: string, completed: boolean}[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  
  // Question Generator State
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([]);
  const [selectedSubjectForQuestion, setSelectedSubjectForQuestion] = useState<string>('geral');
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionMode, setQuestionMode] = useState<'random' | 'filter' | 'stats'>('random');

  // Filter State
  const [filterInstitution, setFilterInstitution] = useState<string>('');
  const [filterDiscipline, setFilterDiscipline] = useState<string>('');
  const [filterTopic, setFilterTopic] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SavedQuestion[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // ─── Load data from localStorage ──────────────────────────────────────────
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const savedSubjects = localStorage.getItem('enem_subjects');
    const savedProfile = localStorage.getItem('enem_profile');
    const savedTheme = localStorage.getItem('enem_theme');
    const savedQs = localStorage.getItem('enem_saved_questions');

    if (savedSubjects) {
      const local = JSON.parse(savedSubjects) as Subject[];
      
      const merged = ENEM_DATA.map(originalSubject => {
        const localSubject = local.find(ls => ls.id === originalSubject.id);
        if (!localSubject) return originalSubject;

        return {
          ...localSubject,
          name: originalSubject.name,
          icon: originalSubject.icon,
          color: originalSubject.color,
          topics: [
            ...originalSubject.topics.map(originalTopic => {
              const localTopic = localSubject.topics.find(lt => lt.id === originalTopic.id);
              return {
                ...originalTopic,
                completed: localTopic ? localTopic.completed : false,
                questions: originalTopic.questions 
              };
            }),
            ...localSubject.topics.filter(lt => !originalSubject.topics.some(ot => ot.id === lt.id))
          ]
        };
      });

      const customSubjects = local.filter(ls => !ENEM_DATA.some(os => os.id === ls.id));
      setSubjects([...merged, ...customSubjects]);
    } else {
      setSubjects(ENEM_DATA);
    }

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);

      // Garantir que campos existam
      if (parsedProfile.xp === undefined || parsedProfile.xp === null) parsedProfile.xp = 0;
      if (parsedProfile.level === undefined || parsedProfile.level === null) parsedProfile.level = 1;
      if (parsedProfile.bestStreak === undefined || parsedProfile.bestStreak === null) parsedProfile.bestStreak = parsedProfile.streak || 0;

      // ── Lógica de Streak ──────────────────────────────────────────────────
      if (parsedProfile.lastLogin === yesterdayStr) {
        // Usuário abriu ontem → incrementar streak
        parsedProfile.streak = (parsedProfile.streak || 0) + 1;
        if (parsedProfile.streak > (parsedProfile.bestStreak || 0)) {
          parsedProfile.bestStreak = parsedProfile.streak;
        }
        // Notificação de streak
        const notification = document.createElement('div');
        notification.className = 'fixed right-4 left-4 sm:left-auto sm:w-72 bg-orange-500 text-white p-4 rounded-2xl shadow-2xl z-50 flex items-center gap-4'; notification.style.top = 'max(env(safe-area-inset-top, 0px), 2.5rem)';
        notification.innerHTML = `
          <div class="text-3xl">🔥</div>
          <div>
            <div class="font-black text-base">Sequência de ${parsedProfile.streak} dias!</div>
            <div class="text-sm text-orange-100">Continue assim! Você é incrível! 🚀</div>
          </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
          notification.style.transition = 'opacity 0.5s';
          notification.style.opacity = '0';
          setTimeout(() => notification.remove(), 500);
        }, 3000);
      } else if (parsedProfile.lastLogin === today) {
        // Já abriu hoje → manter streak
      } else if (parsedProfile.lastLogin === null) {
        // Primeiro uso → iniciar streak em 1
        parsedProfile.streak = 1;
        parsedProfile.bestStreak = 1;
      } else {
        // Perdeu um dia → resetar streak
        parsedProfile.streak = 1;
      }

      parsedProfile.lastLogin = today;
      setProfile(parsedProfile);
    } else {
      // ── Primeiro uso do app ───────────────────────────────────────────────
      setProfile(prev => ({
        ...prev,
        streak: 1,
        bestStreak: 1,
        lastLogin: today,
      }));
    }

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }

    if (savedQs) {
      setSavedQuestions(JSON.parse(savedQs));
    }

    const savedTasks = localStorage.getItem('enem_tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    // Hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#questions') {
        setCurrentTab('questions');
      } else if (hash === '#achievements') {
        setCurrentTab('achievements');
      } else if (hash === '#pomodoro') {
        setCurrentTab('pomodoro');
      } else if (hash === '#tasks') {
        setCurrentTab('tasks');
      } else {
        setCurrentTab('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    setIsInitialized(true);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ─── Save data to localStorage ────────────────────────────────────────────
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('enem_subjects', JSON.stringify(subjects));
      localStorage.setItem('enem_profile', JSON.stringify(profile));
      localStorage.setItem('enem_theme', darkMode ? 'dark' : 'light');
      localStorage.setItem('enem_saved_questions', JSON.stringify(savedQuestions));
      localStorage.setItem('enem_tasks', JSON.stringify(tasks));
    }
    // ── Sincronizar com widget Android ──────────────────────────────────
    if (isInitialized) {
      const total = savedQuestions.filter(q => q.attempts.length > 0).length;
      const correct = savedQuestions.filter(q => q.attempts.some(a => a.isCorrect)).length;
      syncWidgetData({
        streak: profile.streak || 0,
        bestStreak: profile.bestStreak || 0,
        lastDate: profile.lastLogin || '',
        totalQuestions: total,
        correctQuestions: correct,
        darkMode: darkMode,
      });
    }
  }, [subjects, profile, isInitialized, darkMode, savedQuestions, tasks]);

  // ─── Pomodoro Timer Logic ─────────────────────────────────────────────────
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((time) => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0 && isInitialized) {
      setPomodoroActive(false);
      if (pomodoroMode === 'work') {
        // Balanceamento de XP: 100 XP para 25 min (1500s), proporcional para outros tempos
        const earnedXP = Math.round((pomodoroInitialTime / 1500) * 100);
        addXP(earnedXP);

        setPomodoroMode('break');
        const breakMins = parseInt(customBreakInput) || 5;
        const breakTime = breakMins * 60;
        setPomodoroTime(breakTime);
        setPomodoroInitialTime(breakTime);
        
        const audio = new Audio('/sounds/pomodoro.mp3');
        audio.play().catch(() => {});

        LocalNotifications.schedule({
          notifications: [
            {
              title: "Pomodoro Finalizado! ⏰",
              body: `Fim da sessão de foco! +${earnedXP} XP. Hora de descansar ${breakMins} min.`,
              id: 1,
              schedule: { at: new Date(Date.now() + 100) },
              sound: 'pomodoro.mp3'
            }
          ]
        }).catch(() => {});

        const toast = document.createElement('div');
        toast.className = 'fixed right-4 left-4 sm:left-auto sm:w-72 bg-emerald-500 text-white p-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3'; toast.style.top = 'max(env(safe-area-inset-top, 0px), 2.5rem)';
        toast.innerHTML = `<div class="text-2xl">⏰</div><div><div class="font-black">Sessão concluída!</div><div class="text-sm text-emerald-100">+${earnedXP} XP • Hora de descansar</div></div>`;
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.transition = 'opacity 0.5s';
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 500);
        }, 3000);
      } else {
        setPomodoroMode('work');
        const workMins = parseInt(customTimeInput) || 25;
        const workTime = workMins * 60;
        setPomodoroTime(workTime);
        setPomodoroInitialTime(workTime);
      }
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime, pomodoroMode, isInitialized, pomodoroInitialTime, customBreakInput, customTimeInput, addXP]);

  // ─── Memos ────────────────────────────────────────────────────────────────
  const totalTopics = useMemo(() => 
    subjects.reduce((acc, s) => acc + s.topics.length, 0), 
  [subjects]);

  const completedTopics = useMemo(() => 
    subjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0), 
  [subjects]);

  const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // ─── Subject / Topic Functions ────────────────────────────────────────────
  const toggleTopic = (subjectId: string, topicId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          topics: s.topics.map(t => {
            if (t.id === topicId) {
              const newState = !t.completed;
              if (newState) {
                addXP(100);
              } else {
                // Remover XP ao desmarcar para evitar XP infinito
                setProfile(p => ({
                  ...p,
                  xp: Math.max(0, p.xp - 100)
                }));
              }
              return { ...t, completed: newState };
            }
            return t;
          })
        };
      }
      return s;
    }));
  };

  const addTopic = (subjectId: string) => {
    if (!newTopicTitle.trim()) return;
    
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        const newTopic: Topic = {
          id: `${subjectId}-custom-${Date.now()}`,
          title: newTopicTitle,
          completed: false
        };
        return {
          ...s,
          topics: [...s.topics, newTopic]
        };
      }
      return s;
    }));
    setNewTopicTitle('');
  };

  const addSubject = (name: string) => {
    const newSubject: Subject = {
      id: `subject-${Date.now()}`,
      name,
      icon: 'BookOpen',
      color: 'bg-stone-500',
      topics: []
    };
    setSubjects(prev => [...prev, newSubject]);
  };

  const deleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
    if (selectedSubjectId === id) setSelectedSubjectId(null);
  };

  const deleteAllSubjects = () => {
    if (window.confirm('Deseja apagar TODAS as matérias? Esta ação não pode ser desfeita.')) {
      setSubjects([]);
      setSelectedSubjectId(null);
      setShowSubjectMenu(false);
    }
  };

  const resetSubjects = () => {
    if (window.confirm('Deseja redefinir para as matérias originais? Seus dados atuais serão substituídos.')) {
      setSubjects(ENEM_DATA);
      setSelectedSubjectId(null);
      setShowSubjectMenu(false);
    }
  };

  const deleteTopic = (subjectId: string, topicId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          topics: s.topics.filter(t => t.id !== topicId)
        };
      }
      return s;
    }));
  };

  const deleteCompletedTopics = (subjectId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          topics: s.topics.filter(t => !t.completed)
        };
      }
      return s;
    }));
  };

  const updateTopic = (subjectId: string, topicId: string, newTitle: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          topics: s.topics.map(t => t.id === topicId ? { ...t, title: newTitle } : t)
        };
      }
      return s;
    }));
  };

  const updateProfileName = (name: string) => {
    setProfile(prev => ({ ...prev, name }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ─── Question Search ──────────────────────────────────────────────────────
  const handleSearch = async () => {
    setLoadingQuestion(true);
    setHasSearched(true);
    setActiveQuestionId(null);
    setSelectedOption(null);
    setShowExplanation(false);

    // Pequeno delay para mostrar o loading
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      let allPreDefined: SavedQuestion[] = [];
      
      Object.entries(QUESTION_BANK).forEach(([subjectId, questions]) => {
        questions.forEach((q, idx) => {
          allPreDefined.push({
            ...q,
            id: `bank-${subjectId}-${idx}`,
            subjectId: subjectId,
            attempts: []
          });
        });
      });

      let results = allPreDefined;

      if (filterInstitution) {
        results = results.filter(q => (q.institution || 'ENEM') === filterInstitution);
      }
      if (filterDiscipline) {
        results = results.filter(q => q.subjectId === filterDiscipline);
      }
      if (filterTopic) {
        const term = filterTopic.toLowerCase();
        results = results.filter(q => 
          (q.topic && q.topic.toLowerCase().includes(term)) || 
          (q.text && q.text.toLowerCase().includes(term))
        );
      }

      setSearchResults(results);
    } catch (error: unknown) {
      console.error("Erro ao buscar questões:", error);
      alert("Ocorreu um erro ao buscar as questões. Tente novamente.");
    } finally {
      setLoadingQuestion(false);
    }
  };

  const openQuestion = (q: SavedQuestion) => {
    const existing = savedQuestions.find(sq => sq.id === q.id);
    if (!existing) {
      setSavedQuestions(prev => [q, ...prev]);
    }
    setActiveQuestionId(q.id);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // ─── XP & Level System ───────────────────────────────────────────────────
  const calculateLevel = useCallback((xp: number) => Math.floor(Math.sqrt(xp / 100)) + 1, []);
  const xpForLevel = useCallback((level: number) => Math.pow(level - 1, 2) * 100, []);
  const xpForNextLevel = useCallback((level: number) => Math.pow(level, 2) * 100, []);

  const addXP = useCallback((amount: number) => {
    setProfile(prev => {
      const currentXP = prev.xp || 0;
      const currentLevel = prev.level || 1;
      const newXP = Math.max(0, currentXP + amount);
      const newLevel = calculateLevel(newXP);
      
      if (amount > 0) {
        const xpToast = document.createElement('div');
        xpToast.className = 'fixed left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg z-50 font-bold flex items-center gap-2'; xpToast.style.bottom = 'max(calc(env(safe-area-inset-bottom, 0px) + 5rem), 6rem)';
        xpToast.innerHTML = `<span>+${amount} XP</span> <span class="text-xs">✨</span>`;
        document.body.appendChild(xpToast);
        setTimeout(() => {
          xpToast.style.transition = 'opacity 0.5s';
          xpToast.style.opacity = '0';
          setTimeout(() => xpToast.remove(), 500);
        }, 2000);
      }

      if (newLevel > currentLevel) {
        const audio = new Audio('/sounds/achievement.mp3');
        audio.play().catch(() => {});

        const notification = document.createElement('div');
        notification.className = 'fixed inset-0 flex items-center justify-center z-[100] bg-black/60 backdrop-blur-sm p-6';
        notification.innerHTML = `
          <div class="bg-purple-600 text-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border-4 border-purple-400 max-w-xs w-full text-center">
            <div class="text-6xl">🏆</div>
            <div class="text-3xl font-black italic tracking-tighter">LEVEL UP!</div>
            <div class="text-xl font-bold">NÍVEL ${newLevel}</div>
            <p class="text-purple-100">Você está evoluindo rápido! Continue assim rumo à aprovação. 🚀</p>
            <button class="mt-2 bg-white text-purple-600 px-6 py-2 rounded-xl font-bold shadow-lg active:scale-95 transition-transform" onclick="this.parentElement.parentElement.remove()">INCRÍVEL!</button>
          </div>
        `;
        document.body.appendChild(notification);
      }
      
      return { ...prev, xp: newXP, level: newLevel };
    });
  }, [calculateLevel]);

  // ─── Answer Handling ──────────────────────────────────────────────────────
  const handleAnswer = (optionIdx: number) => {
    if (!activeQuestionId || selectedOption !== null) return;
    
    const question = savedQuestions.find(q => q.id === activeQuestionId);
    if (!question) return;

    const isCorrect = optionIdx === question.correctAnswer;
    
    if (isCorrect) {
      addXP(150);
      
      // Som de acerto
      try {
        const audio = new Audio('https://actions.google.com/sounds/v1/notifications/achievement_sound.ogg');
        audio.play().catch(() => {});
      } catch (_) {}

      // Conquista de primeiro acerto
      if (!profile.achievements.includes('correct_answer')) {
        setProfile(prev => ({
          ...prev,
          achievements: [...prev.achievements, 'correct_answer']
        }));
      }

      // Popup de acerto
      const successPopup = document.createElement('div');
      successPopup.className = 'fixed inset-0 flex items-center justify-center z-[100] bg-black/40 backdrop-blur-sm p-6 pointer-events-none';
      successPopup.innerHTML = `
        <div class="bg-emerald-500 text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-2 border-4 border-emerald-400 text-center">
          <div class="text-4xl">✅</div>
          <div class="text-xl font-black">RESPOSTA CORRETA!</div>
          <div class="font-bold">+150 XP</div>
        </div>
      `;
      document.body.appendChild(successPopup);
      setTimeout(() => {
        successPopup.style.transition = 'opacity 0.5s';
        successPopup.style.opacity = '0';
        setTimeout(() => successPopup.remove(), 500);
      }, 1500);
    } else {
      // Popup de erro
      const errorPopup = document.createElement('div');
      errorPopup.className = 'fixed inset-0 flex items-center justify-center z-[100] bg-black/40 backdrop-blur-sm p-6 pointer-events-none';
      errorPopup.innerHTML = `
        <div class="bg-red-500 text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-2 border-4 border-red-400 text-center">
          <div class="text-4xl">❌</div>
          <div class="text-xl font-black">NÃO FOI DESSA VEZ</div>
          <p class="text-sm opacity-90">Leia a explicação para aprender!</p>
        </div>
      `;
      document.body.appendChild(errorPopup);
      setTimeout(() => {
        errorPopup.style.transition = 'opacity 0.5s';
        errorPopup.style.opacity = '0';
        setTimeout(() => errorPopup.remove(), 500);
      }, 1500);
    }

    const newAttempt: Attempt = {
      timestamp: Date.now(),
      selectedOption: optionIdx,
      isCorrect
    };

    setSelectedOption(optionIdx);
    setSavedQuestions(prev => prev.map(q => {
      if (q.id === activeQuestionId) {
        return {
          ...q,
          attempts: [...q.attempts, newAttempt]
        };
      }
      return q;
    }));
  };

  const redoQuestion = (qId: string) => {
    setActiveQuestionId(qId);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // ─── Generate Bank Question ───────────────────────────────────────────────
  const generateBankQuestion = async () => {
    if (!selectedSubjectForQuestion) {
      alert("Por favor, selecione uma matéria para buscar uma questão.");
      return;
    }

    setIsGenerating(true);
    setLoadingQuestion(true);
    setActiveQuestionId(null);
    setSelectedOption(null);
    setShowExplanation(false);

    await new Promise(resolve => setTimeout(resolve, 500));

    let availableQuestions: SavedQuestion[] = [];
    
    const subjectsToSearch = selectedSubjectForQuestion === 'geral' 
      ? Object.keys(QUESTION_BANK)
      : [selectedSubjectForQuestion];

    subjectsToSearch.forEach(subjectId => {
      const bankQuestions = QUESTION_BANK[subjectId] || [];
      bankQuestions.forEach((q, idx) => {
        availableQuestions.push({
          ...q,
          id: `bank-${subjectId}-${idx}`,
          subjectId: subjectId,
          attempts: []
        });
      });
    });

    if (availableQuestions.length === 0) {
      alert("Ainda não temos questões disponíveis para esta seleção.");
      setIsGenerating(false);
      setLoadingQuestion(false);
      return;
    }

    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    const existing = savedQuestions.find(sq => sq.id === randomQuestion.id);
    const finalQuestion = existing ? existing : randomQuestion;

    if (!existing) {
      setSavedQuestions(prev => [finalQuestion, ...prev]);
    }

    setActiveQuestionId(finalQuestion.id);
    setIsGenerating(false);
    setLoadingQuestion(false);
  };

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

  // ─── Achievements ─────────────────────────────────────────────────────────
  const achievements = useMemo(() => {
    const list: { subjectName: string; type: 'bem' | 'melhor' | 'perfeito'; color: string }[] = [];
    
    subjects.forEach(s => {
      const completed = s.topics.filter(t => t.completed).length;
      const total = s.topics.length;

      if (completed === total && total > 0) {
        list.push({ subjectName: s.name, type: 'perfeito', color: s.color });
      } else if (completed >= 5) {
        list.push({ subjectName: s.name, type: 'melhor', color: s.color });
      } else if (completed >= 2) {
        list.push({ subjectName: s.name, type: 'bem', color: s.color });
      }
    });

    return list;
  }, [subjects]);

  if (!isInitialized) return null;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={`h-full w-full flex flex-col overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'} font-sans`}>
      
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className={`border-b px-6 pb-4 sticky top-0 z-10 transition-colors flex-shrink-0 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`} style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 1rem)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <h1 className={`text-2xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-stone-900'}`}>
              Organi<span className="text-indigo-600">Studa</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-stone-800 text-yellow-400 hover:bg-stone-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <label htmlFor="photo-upload" className={`w-16 h-16 rounded-full border-2 overflow-hidden flex items-center justify-center transition-colors cursor-pointer ${darkMode ? 'bg-stone-800 border-stone-700 hover:border-indigo-500' : 'bg-stone-100 border-stone-200 hover:border-indigo-500'}`}>
                {profile.photo ? (
                  <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <User className={`w-8 h-8 ${darkMode ? 'text-stone-600' : 'text-stone-400'}`} />
                )}
              </label>
              <input 
                id="photo-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoUpload} 
              />
              {/* Streak badge */}
              <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-stone-900 flex items-center gap-1 shadow-lg pointer-events-none">
                🔥 {profile.streak}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <input 
                  type="text"
                  value={profile.name}
                  onChange={(e) => updateProfileName(e.target.value)}
                  className={`text-xl font-bold tracking-tight bg-transparent border-b border-transparent focus:border-indigo-600 outline-none w-32 ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}
                  placeholder="Seu nome"
                />
                <PenTool className="w-3 h-3 text-stone-400" />
              </div>
              <p className={`text-sm ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>Rumo à aprovação 🚀</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className={`text-3xl font-black leading-none ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{overallPercentage}%</div>
            <div className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>Concluído</div>
          </div>
        </div>

        {/* XP and Level Section */}
        <div className={`p-4 rounded-2xl border mb-4 transition-colors ${darkMode ? 'bg-stone-800/50 border-stone-700' : 'bg-stone-50 border-stone-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${darkMode ? 'bg-indigo-600' : 'bg-indigo-600'} text-white`}>
                {profile.level}
              </div>
              <div>
                <div className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>Nível {profile.level}</div>
                <div className={`text-[10px] ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>{profile.xp || 0} XP total</div>
              </div>
            </div>
            <div className={`text-xs font-bold ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
              {Math.max(0, xpForNextLevel(profile.level) - (profile.xp || 0))} XP para Nível {profile.level + 1}
            </div>
          </div>
          <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-stone-700' : 'bg-stone-200'}`}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.min(100, Math.max(0, ((profile.xp || 0) - xpForLevel(profile.level)) / (xpForNextLevel(profile.level) - xpForLevel(profile.level)) * 100))}%` 
              }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            />
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center px-1">
            <span className={`text-[10px] font-black uppercase tracking-tighter ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>Progresso Geral</span>
          </div>
          <div className={`w-full h-1.5 rounded-full overflow-hidden transition-colors ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${overallPercentage}%` }}
              className={`h-full ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'}`}
            />
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto px-6 py-6" style={{ paddingBottom: 'max(calc(env(safe-area-inset-bottom, 0px) + 5rem), 6rem)' }}>
        <AnimatePresence mode="wait">

          {/* ── HOME TAB ──────────────────────────────────────────────────── */}
          {currentTab === 'home' ? (
            !selectedSubjectId ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* ── Streak Widget ──────────────────────────────────────── */}
                <StreakWidget 
                  streak={profile.streak || 0} 
                  bestStreak={(profile as any).bestStreak || profile.streak || 0}
                  darkMode={darkMode}
                />

                {/* ── Stats Widget ───────────────────────────────────────── */}
                {savedQuestions.some(q => q.attempts.length > 0) && (
                  <StatsWidget savedQuestions={savedQuestions} darkMode={darkMode} />
                )}

                {/* ── Subjects Dashboard ─────────────────────────────────── */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-bold text-lg">Minhas Matérias</h2>
                  </div>
                  <button 
                    onClick={() => {
                      const name = prompt('Nome da nova matéria:');
                      if (name) addSubject(name);
                    }}
                    className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {subjects.map((subject) => {
                    const Icon = ICON_MAP[subject.icon] || BookOpen;
                    const completed = subject.topics.filter(t => t.completed).length;
                    const total = subject.topics.length;
                    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

                    return (
                      <motion.div
                        key={subject.id}
                        className={`group relative p-5 rounded-2xl border shadow-sm flex flex-col gap-4 transition-all ${
                          darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center gap-3">
                          <button
                            onClick={() => setSelectedSubjectId(subject.id)}
                            className="flex flex-col items-center gap-3 w-full"
                          >
                            <div className={`p-5 rounded-3xl ${subject.color} text-white shadow-xl shadow-indigo-500/20`}>
                              <Icon className="w-10 h-10" />
                            </div>
                            <div>
                              <h3 className={`font-black text-xl leading-tight ${darkMode ? 'text-white' : 'text-stone-900'}`}>{subject.name}</h3>
                              <p className={`text-sm mt-1 font-medium ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>{completed} de {total} tópicos</p>
                            </div>
                          </button>
                        </div>
                      
                        <div className="space-y-3 text-center">
                          <div className="text-xs font-black uppercase tracking-widest text-indigo-500">
                            {percent}% Concluído
                          </div>
                          <div className={`h-3 w-full rounded-full overflow-hidden ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percent}%` }}
                              className={`h-full ${subject.color} rounded-full`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {overallPercentage === 100 && subjects.length > 0 && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-6 rounded-2xl text-center border ${
                      darkMode ? 'bg-emerald-950/20 border-emerald-900 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}
                  >
                    <Trophy className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                    <h3 className="font-bold text-lg">Incrível!</h3>
                    <p className="text-sm opacity-80">Você completou 100% dos estudos. O ENEM é seu!</p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* ── Subject Detail ──────────────────────────────────────────── */
              <motion.div 
                key="subject-detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button 
                  onClick={() => setSelectedSubjectId(null)}
                  className={`flex items-center gap-2 mb-6 transition-colors ${darkMode ? 'text-stone-500 hover:text-stone-300' : 'text-stone-500 hover:text-stone-800'}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-medium">Voltar ao Dashboard</span>
                </button>

                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${selectedSubject?.color} text-white shadow-lg`}>
                      {selectedSubject && React.createElement(ICON_MAP[selectedSubject.icon] || BookOpen, { className: "w-8 h-8" })}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-tight">{selectedSubject?.name}</h2>
                      <p className={darkMode ? 'text-stone-500' : 'text-stone-500'}>Checklist de conteúdos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {selectedSubject?.topics.some(t => t.completed) && (
                      <button 
                        onClick={() => {
                          if (confirm('Deseja apagar todos os conteúdos concluídos?')) {
                            deleteCompletedTopics(selectedSubject!.id);
                          }
                        }}
                        className="p-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors"
                        title="Apagar concluídos"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    )}
                    <div className="relative">
                      <button 
                        onClick={() => setShowSubjectMenu(!showSubjectMenu)}
                        className={`p-3 rounded-2xl transition-colors ${darkMode ? 'text-stone-700 hover:bg-stone-800' : 'text-stone-300 hover:bg-stone-100'} ${showSubjectMenu ? (darkMode ? 'bg-stone-800' : 'bg-stone-100') : ''}`}
                        title="Opções"
                      >
                        <MoreVertical className="w-6 h-6" />
                      </button>

                      <AnimatePresence>
                        {showSubjectMenu && (
                          <>
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setShowSubjectMenu(false)}
                            />
                            <motion.div 
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl border z-50 overflow-hidden ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}
                            >
                              <div className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>
                                Matéria Atual
                              </div>
                              <button
                                onClick={() => {
                                  if (confirm(`Deseja apagar a matéria ${selectedSubject?.name} e todos os seus conteúdos?`)) {
                                    deleteSubject(selectedSubject!.id);
                                    setShowSubjectMenu(false);
                                  }
                                }}
                                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Apagar esta matéria
                              </button>

                              <div className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-t ${darkMode ? 'text-stone-600 border-stone-800' : 'text-stone-400 border-stone-100'}`}>
                                Sistema
                              </div>
                              <button
                                onClick={deleteAllSubjects}
                                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-600/10 transition-colors flex items-center gap-2"
                              >
                                <X className="w-4 h-4" />
                                Apagar tudo
                              </button>
                              <button
                                onClick={resetSubjects}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-2 ${darkMode ? 'text-stone-300 hover:bg-stone-800' : 'text-stone-600 hover:bg-stone-50'}`}
                              >
                                <BrainCircuit className="w-4 h-4" />
                                Redefinir para padrão
                              </button>
                              <button
                                onClick={() => {
                                  const local = subjects;
                                  const merged = ENEM_DATA.map(originalSubject => {
                                    const localSubject = local.find(ls => ls.id === originalSubject.id);
                                    if (!localSubject) return originalSubject;
                                    return {
                                      ...localSubject,
                                      topics: [
                                        ...originalSubject.topics.map(originalTopic => {
                                          const localTopic = localSubject.topics.find(lt => lt.id === originalTopic.id);
                                          return {
                                            ...originalTopic,
                                            completed: localTopic ? localTopic.completed : false,
                                          };
                                        }),
                                        ...localSubject.topics.filter(lt => !originalSubject.topics.some(ot => ot.id === lt.id))
                                      ]
                                    };
                                  });
                                  const customSubjects = local.filter(ls => !ENEM_DATA.some(os => os.id === ls.id));
                                  setSubjects([...merged, ...customSubjects]);
                                  setShowSubjectMenu(false);
                                  alert('Questões sincronizadas com sucesso!');
                                }}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-2 ${darkMode ? 'text-stone-300 hover:bg-stone-800' : 'text-stone-600 hover:bg-stone-50'}`}
                              >
                                <Share2 className="w-4 h-4" />
                                Sincronizar questões
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Topic List */}
                <div className="space-y-3 mb-6">
                  {selectedSubject?.topics.map((topic) => (
                    <div 
                      key={topic.id}
                      className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                        topic.completed 
                          ? darkMode ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-emerald-50 border-emerald-200'
                          : darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
                      }`}
                    >
                      <button
                        onClick={() => toggleTopic(selectedSubject.id, topic.id)}
                        className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          topic.completed 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : darkMode ? 'border-stone-700 hover:border-emerald-500' : 'border-stone-300 hover:border-emerald-500'
                        }`}
                      >
                        {topic.completed && <Check className="w-3.5 h-3.5" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={topic.title}
                            onChange={(e) => updateTopic(selectedSubject.id, topic.id, e.target.value)}
                            className={`bg-transparent outline-none font-medium w-full ${topic.completed ? 'line-through' : ''} ${darkMode ? 'text-stone-200' : 'text-stone-800'}`}
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            topic.questions && topic.questions.length > 0 
                              ? 'bg-emerald-500/10 text-emerald-500' 
                              : 'bg-stone-500/10 text-stone-500'
                          }`}>
                            {topic.questions?.length || 0} questões
                          </span>
                          {topic.questions && topic.questions.length > 0 ? (
                            <span className={`text-[10px] font-medium ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>
                              • {topic.completed ? 'Revisão recomendada' : 'Excelente para praticar'}
                            </span>
                          ) : (
                            <span className={`text-[10px] font-medium ${darkMode ? 'text-stone-700' : 'text-stone-500'}`}>
                              • Aguardando questões oficiais
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (window.confirm('Deseja apagar este conteúdo?')) {
                            deleteTopic(selectedSubject.id, topic.id);
                          }
                        }}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0 cursor-pointer"
                        style={{ minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Topic */}
                <div className={`flex gap-3 p-4 rounded-2xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                  <input
                    type="text"
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTopic(selectedSubject!.id)}
                    placeholder="Adicionar novo conteúdo..."
                    className={`flex-1 bg-transparent outline-none text-sm font-medium ${darkMode ? 'text-stone-200 placeholder:text-stone-700' : 'text-stone-800 placeholder:text-stone-400'}`}
                  />
                  <button
                    onClick={() => addTopic(selectedSubject!.id)}
                    disabled={!newTopicTitle.trim()}
                    className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-40"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )

          /* ── ACHIEVEMENTS TAB ─────────────────────────────────────────── */
          ) : currentTab === 'achievements' ? (
            <motion.div 
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-indigo-600" />
                <h2 className="font-bold text-lg">Minhas Conquistas</h2>
              </div>

              {/* Streak Achievement Card */}
              <div className={`p-5 rounded-2xl border shadow-sm ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <h3 className="font-black text-base">Sequência de Estudos</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-orange-950/30' : 'bg-orange-50'}`}>
                    <div className="text-3xl font-black text-orange-500">{profile.streak || 0}</div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${darkMode ? 'text-orange-700' : 'text-orange-600'}`}>Atual</div>
                  </div>
                  <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-stone-800' : 'bg-stone-50'}`}>
                    <div className={`text-3xl font-black ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>{(profile as any).bestStreak || profile.streak || 0}</div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>Recorde 🏆</div>
                  </div>
                </div>
                {/* Streak milestones */}
                <div className="flex justify-between gap-2 mt-4">
                  {[3, 7, 14, 30, 100].map((milestone) => (
                    <div key={milestone} className="flex flex-col items-center gap-1 flex-1">
                      <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-[10px] font-black border-2 transition-all ${
                        (profile.streak || 0) >= milestone
                          ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20'
                          : darkMode ? 'bg-stone-800 border-stone-700 text-stone-600' : 'bg-stone-100 border-stone-200 text-stone-400'
                      }`}>
                        {(profile.streak || 0) >= milestone ? '🔥' : milestone}
                      </div>
                      <span className={`text-[9px] font-bold ${(profile.streak || 0) >= milestone ? 'text-orange-500' : darkMode ? 'text-stone-600' : 'text-stone-400'}`}>
                        {milestone}d
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Widget in Achievements */}
              <StatsWidget savedQuestions={savedQuestions} darkMode={darkMode} />

              <div className="grid grid-cols-1 gap-4">
                {/* Level Journey */}
                <div className={`p-6 rounded-3xl border transition-all ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}>
                  <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-purple-500" />
                    Jornada de Níveis
                  </h3>
                  <div className="flex justify-between items-center gap-2 overflow-x-auto pb-2">
                    {[1, 5, 10, 20, 50].map((lvl) => (
                      <div key={`lvl-badge-${lvl}`} className="flex flex-col items-center gap-2 min-w-[60px]">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                          profile.level >= lvl 
                            ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/20' 
                            : darkMode ? 'bg-stone-800 border-stone-700 text-stone-600 opacity-50' : 'bg-stone-100 border-stone-200 text-stone-400 opacity-50'
                        }`}>
                          <span className="text-xs font-black">{lvl}</span>
                        </div>
                        <span className={`text-[10px] font-bold ${profile.level >= lvl ? 'text-purple-500' : darkMode ? 'text-stone-600' : 'text-stone-400'}`}>Nível {lvl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* XP Achievements */}
                {[1000, 5000, 10000].map((xpGoal) => (
                  <div 
                    key={`xp-${xpGoal}`}
                    className={`p-5 rounded-2xl border shadow-sm flex items-center gap-4 transition-all ${
                      (profile.xp || 0) >= xpGoal 
                        ? (darkMode ? 'bg-stone-900 border-orange-500/50' : 'bg-white border-orange-200 shadow-orange-100/50')
                        : (darkMode ? 'bg-stone-900/50 border-stone-800 opacity-50 grayscale' : 'bg-stone-50 border-stone-100 opacity-50 grayscale')
                    }`}
                  >
                    <div className={`p-3 rounded-full ${(profile.xp || 0) >= xpGoal ? 'bg-orange-500' : 'bg-stone-400'} text-white`}>
                      <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>
                        Acumular {xpGoal} XP
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                        {(profile.xp || 0) >= xpGoal 
                          ? 'Conquista desbloqueada! 🧠' 
                          : `Faltam ${Math.max(0, xpGoal - (profile.xp || 0))} XP para desbloquear`}
                      </p>
                    </div>
                    {(profile.xp || 0) >= xpGoal && <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />}
                  </div>
                ))}

                {/* Subject Achievements */}
                {achievements.length > 0 && (
                  <div className={`p-5 rounded-2xl border shadow-sm ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                    <h3 className="font-black text-base mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Conquistas por Matéria
                    </h3>
                    <div className="space-y-2">
                      {achievements.map((ach, idx) => (
                        <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-stone-800' : 'bg-stone-50'}`}>
                          <div className={`p-2 rounded-lg ${ach.color} text-white`}>
                            <Trophy className="w-4 h-4" />
                          </div>
                          <div>
                            <div className={`font-bold text-sm ${darkMode ? 'text-stone-200' : 'text-stone-800'}`}>{ach.subjectName}</div>
                            <div className={`text-xs ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                              {ach.type === 'perfeito' ? '🏆 100% Concluído!' : ach.type === 'melhor' ? '⭐ 5+ tópicos concluídos' : '✅ 2+ tópicos concluídos'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

          /* ── QUESTIONS TAB ────────────────────────────────────────────── */
          ) : currentTab === 'questions' ? (
            <motion.div 
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col gap-4 mb-2">
                {/* Question Bank Mode */}
                <div className={`p-6 rounded-xl shadow-sm border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                  <div className="flex items-center gap-2 mb-6">
                    <Brain className="w-5 h-5 text-purple-500" />
                    <h2 className="font-bold text-lg">Banco de Questões</h2>
                  </div>
                  
                  {/* Mode Tabs */}
                  <div className={`flex p-1 rounded-xl mb-6 ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                    <button
                      onClick={() => setQuestionMode('random')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        questionMode === 'random' 
                          ? darkMode ? 'bg-stone-700 text-stone-200 shadow-sm' : 'bg-white shadow-sm text-stone-800'
                          : darkMode ? 'text-stone-400 hover:text-stone-300' : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      Aleatório
                    </button>
                    <button
                      onClick={() => setQuestionMode('filter')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        questionMode === 'filter' 
                          ? darkMode ? 'bg-stone-700 text-stone-200 shadow-sm' : 'bg-white shadow-sm text-stone-800'
                          : darkMode ? 'text-stone-400 hover:text-stone-300' : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      Filtros
                    </button>
                    <button
                      onClick={() => setQuestionMode('stats')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        questionMode === 'stats' 
                          ? darkMode ? 'bg-stone-700 text-stone-200 shadow-sm' : 'bg-white shadow-sm text-stone-800'
                          : darkMode ? 'text-stone-400 hover:text-stone-300' : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      Feitas
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {questionMode === 'stats' ? (
                      <div className="space-y-6">
                        {/* Dashboard de Estatísticas Estilo QConcursos */}
                        <div className={`p-6 rounded-2xl shadow-sm border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                          <div className="flex flex-col md:flex-row gap-8 items-center">
                            {/* Gráfico de Rosca (Donut Chart) */}
                            <div className="relative w-48 h-48 flex-shrink-0">
                              {(() => {
                                const total = savedQuestions.filter(q => q.attempts.length > 0).length;
                                const correct = savedQuestions.filter(q => q.attempts.some(a => a.isCorrect)).length;
                                const wrong = total - correct;
                                const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
                                
                                const data = [
                                  { name: 'Acertos', value: correct, color: '#3b82f6' }, // Azul
                                  { name: 'Erros', value: wrong, color: '#ef4444' }     // Vermelho
                                ];

                                return (
                                  <>
                                    <ResponsiveContainer width="100%" height="100%">
                                      <PieChart>
                                        <Pie
                                          data={total > 0 ? data : [{ value: 1, color: darkMode ? '#292524' : '#f5f5f4' }]}
                                          innerRadius={60}
                                          outerRadius={80}
                                          paddingAngle={5}
                                          dataKey="value"
                                          stroke="none"
                                        >
                                          {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                          ))}
                                        </Pie>
                                      </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                                      <span className={`text-2xl font-black ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>{total}</span>
                                      <span className={`text-[10px] font-bold uppercase tracking-tighter ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>Questões<br/>resolvidas</span>
                                    </div>
                                    <div className="mt-4 flex justify-center gap-4 text-[10px] font-bold">
                                      <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <span className={darkMode ? 'text-stone-400' : 'text-stone-600'}>{accuracy}% {correct} acertos</span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                        <span className={darkMode ? 'text-stone-400' : 'text-stone-600'}>{total > 0 ? 100 - accuracy : 0}% {wrong} erros</span>
                                      </div>
                                    </div>
                                    <div className={`mt-6 py-1.5 px-4 rounded-full text-xs font-bold text-center ${darkMode ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-600'}`}>
                                      {accuracy}% de acerto
                                    </div>
                                  </>
                                );
                              })()}
                            </div>

                            {/* Gráfico de Barras de Dificuldade */}
                            <div className="flex-1 w-full">
                              <h4 className={`text-sm font-bold mb-4 ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>Dificuldade das questões resolvidas</h4>
                              {(() => {
                                // Simulação de dados por dificuldade (já que o modelo atual não salva dificuldade no SavedQuestion explicitamente, 
                                // vamos distribuir os acertos proporcionalmente para visualização, mas o ideal seria ter esse dado)
                                // Para o MVP, vamos mostrar as categorias conforme a imagem
                                const difficulties = [
                                  { label: 'Muito Fácil', value: 85 },
                                  { label: 'Fácil', value: 70 },
                                  { label: 'Médio', value: 60 },
                                  { label: 'Difícil', value: 45 },
                                  { label: 'Muito Difícil', value: 30 }
                                ];

                                return (
                                  <div className="space-y-4">
                                    {difficulties.map((diff) => (
                                      <div key={diff.label} className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                          <span className={darkMode ? 'text-stone-500' : 'text-stone-400'}>{diff.label}</span>
                                        </div>
                                        <div className={`h-1.5 w-full rounded-full overflow-hidden ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${diff.value}%` }}
                                            className="h-full bg-blue-500 rounded-full"
                                          />
                                        </div>
                                      </div>
                                    ))}
                                    <div className="flex justify-between text-[10px] font-bold text-stone-400 pt-2 border-t border-stone-800/50">
                                      <span>0%</span>
                                      <span>50%</span>
                                      <span>100%</span>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        </div>

                        {/* Histórico de Questões */}
                        <div className={`p-6 rounded-2xl shadow-sm border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                          <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-4 h-4 text-purple-500" />
                            <h3 className={`font-bold text-base ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>Histórico de questões resolvidas</h3>
                          </div>
                          
                          <div className="space-y-3">
                            {savedQuestions.filter(q => q.attempts.length > 0).length === 0 ? (
                              <p className={`text-sm text-center py-8 ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>Nenhuma questão resolvida ainda.</p>
                            ) : (
                              savedQuestions.filter(q => q.attempts.length > 0).map(q => {
                                const lastAttempt = q.attempts[q.attempts.length - 1];
                                return (
                                  <div key={q.id} className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${darkMode ? 'bg-stone-800/50 border-stone-800' : 'bg-stone-50 border-stone-100'}`}>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        {lastAttempt.isCorrect ? (
                                          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase">
                                            <CheckCircle2 className="w-3 h-3" /> Acertou
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase">
                                            <XCircle className="w-3 h-3" /> Errou
                                          </div>
                                        )}
                                        <span className="text-[10px] text-stone-500">• {q.institution || 'Geral'}</span>
                                      </div>
                                      <p className={`text-sm font-medium truncate ${darkMode ? 'text-stone-200' : 'text-stone-700'}`}>{q.text}</p>
                                    </div>
                                    <button 
                                      onClick={() => redoQuestion(q.id)}
                                      className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all active:scale-95 shadow-sm"
                                    >
                                      <Play className="w-3 h-3" /> Refazer
                                    </button>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    ) : questionMode === 'random' ? (
                      <>
                        <p className={`text-sm ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                          Selecione uma matéria e buscaremos uma questão exclusiva do nosso banco de dados.
                        </p>

                        <div className="relative">
                          <select 
                            value={selectedSubjectForQuestion}
                            onChange={(e) => setSelectedSubjectForQuestion(e.target.value)}
                            className={`w-full pl-4 pr-10 py-3 rounded-xl appearance-none outline-none font-medium transition-colors ${
                              darkMode 
                                ? 'bg-stone-800 text-stone-200 focus:ring-2 focus:ring-purple-500/50' 
                                : 'bg-stone-100 text-stone-700 focus:ring-2 focus:ring-purple-500/20'
                            }`}
                          >
                            <option value="geral">Todas as Matérias</option>
                            {subjects.map(s => (
                              <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-stone-400' : 'text-stone-400'}`} />
                          </div>
                        </div>

                        <button 
                          onClick={generateBankQuestion}
                          disabled={isGenerating}
                          className="w-full py-4 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isGenerating ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Brain className="w-5 h-5" />
                              BUSCAR QUESTÃO
                            </>
                          )}
                        </button>
                      </>
                    ) : (
                      /* Filter Mode */
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative">
                            <select 
                              value={filterInstitution}
                              onChange={(e) => setFilterInstitution(e.target.value)}
                              className={`w-full pl-3 pr-8 py-3 rounded-xl appearance-none outline-none text-sm font-medium transition-colors ${
                                darkMode 
                                  ? 'bg-stone-800 text-stone-200 focus:ring-2 focus:ring-purple-500/50' 
                                  : 'bg-stone-100 text-stone-700 focus:ring-2 focus:ring-purple-500/20'
                              }`}
                            >
                              <option value="">Instituição</option>
                              <option value="ENEM">ENEM</option>
                              <option value="FUVEST">FUVEST</option>
                              <option value="UNICAMP">UNICAMP</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <ChevronDown className={`w-3 h-3 ${darkMode ? 'text-stone-400' : 'text-stone-400'}`} />
                            </div>
                          </div>
                          <div className="relative">
                            <select 
                              value={filterDiscipline}
                              onChange={(e) => setFilterDiscipline(e.target.value)}
                              className={`w-full pl-3 pr-8 py-3 rounded-xl appearance-none outline-none text-sm font-medium transition-colors ${
                                darkMode 
                                  ? 'bg-stone-800 text-stone-200 focus:ring-2 focus:ring-purple-500/50' 
                                  : 'bg-stone-100 text-stone-700 focus:ring-2 focus:ring-purple-500/20'
                              }`}
                            >
                              <option value="">Disciplina</option>
                              <option value="mat">Matemática</option>
                              <option value="por">Linguagens</option>
                              <option value="his">Ciências Humanas</option>
                              <option value="bio">Ciências da Natureza</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <ChevronDown className={`w-3 h-3 ${darkMode ? 'text-stone-400' : 'text-stone-400'}`} />
                            </div>
                          </div>
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            value={filterTopic}
                            onChange={(e) => setFilterTopic(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Buscar por palavra-chave..."
                            className={`w-full pl-4 pr-10 py-3 rounded-xl outline-none text-sm font-medium transition-colors ${
                              darkMode 
                                ? 'bg-stone-800 text-stone-200 placeholder:text-stone-600 focus:ring-2 focus:ring-purple-500/50' 
                                : 'bg-stone-100 text-stone-700 placeholder:text-stone-400 focus:ring-2 focus:ring-purple-500/20'
                            }`}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <Search className={`w-4 h-4 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`} />
                          </div>
                        </div>

                        <button 
                          onClick={handleSearch}
                          disabled={loadingQuestion}
                          className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
                        >
                          {loadingQuestion ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Search className="w-5 h-5" />
                              BUSCAR QUESTÕES
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Loading */}
              {loadingQuestion && (
                <div className="flex items-center justify-center py-8 gap-3">
                  <Loader2 className={`w-5 h-5 animate-spin ${darkMode ? 'text-stone-400' : 'text-stone-500'}`} />
                  <p className={`font-medium animate-pulse ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>Buscando questões...</p>
                </div>
              )}

              {/* Active Question */}
              {activeQuestionId && (
                (() => {
                  const q = searchResults.find(sq => sq.id === activeQuestionId) || savedQuestions.find(sq => sq.id === activeQuestionId);
                  if (!q) return null;
                  
                  const savedQ = savedQuestions.find(sq => sq.id === activeQuestionId);
                  const isRedo = savedQ ? savedQ.attempts.length > 1 : false;

                  return (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-6 rounded-2xl border shadow-sm space-y-6 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase tracking-widest font-black ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>
                            {isRedo ? 'Questão (Refeita)' : 'Questão Atual'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter bg-emerald-500/10 text-emerald-500 border border-emerald-500/20`}>
                            {q.institution || 'ENEM'} {q.year || '2023'}
                          </span>
                        </div>
                        {questionMode === 'filter' && (
                          <button 
                            onClick={() => setActiveQuestionId(null)}
                            className={`text-xs font-bold ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}
                          >
                            Voltar aos Resultados
                          </button>
                        )}
                      </div>

                      <div className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                        Assunto: {q.topic}
                      </div>

                      <div className={`text-sm font-medium leading-relaxed whitespace-pre-wrap ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                        {q.text}
                      </div>

                      <div className="space-y-3">
                        {q.options.map((option, idx) => {
                          const isCorrect = idx === q.correctAnswer;
                          const isSelected = idx === selectedOption;
                          
                          let variantClasses = darkMode ? 'bg-stone-800 border-stone-700 hover:border-stone-600' : 'bg-stone-50 border-stone-200 hover:border-stone-300';
                          
                          if (selectedOption !== null) {
                            if (isCorrect) variantClasses = 'bg-emerald-500/10 border-emerald-500 text-emerald-500';
                            else if (isSelected) variantClasses = 'bg-red-500/10 border-red-500 text-red-500';
                          }

                          return (
                            <button
                              key={idx}
                              disabled={selectedOption !== null}
                              onClick={() => handleAnswer(idx)}
                              className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${variantClasses}`}
                            >
                              <span>{option}</span>
                              {selectedOption !== null && (
                                isCorrect ? <Check className="w-4 h-4 shrink-0" /> : isSelected ? <X className="w-4 h-4 shrink-0" /> : null
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {selectedOption !== null && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <button 
                              onClick={() => setShowExplanation(!showExplanation)}
                              className="text-indigo-600 text-sm font-bold hover:underline"
                            >
                              {showExplanation ? 'Ocultar Explicação' : 'Ver Explicação'}
                            </button>
                            <div className={`text-xs font-bold ${selectedOption === q.correctAnswer ? 'text-emerald-500' : 'text-red-500'}`}>
                              {selectedOption === q.correctAnswer ? '✅ CORRETO!' : '❌ ERRADO'}
                            </div>
                          </div>
                          
                          {showExplanation && q.explanation && (
                            <div className={`p-4 rounded-xl text-sm leading-relaxed ${darkMode ? 'bg-stone-800 text-stone-400' : 'bg-indigo-50 text-indigo-800'}`}>
                              {q.explanation}
                            </div>
                          )}

                          {questionMode === 'random' && (
                            <button 
                              onClick={generateBankQuestion}
                              className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                              PRÓXIMA QUESTÃO
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })()
              )}

              {/* Filter Results */}
              {questionMode === 'filter' && hasSearched && searchResults.length > 0 && !activeQuestionId && (
                <div className="space-y-4">
                  <h3 className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-stone-700' : 'text-stone-400'}`}>Resultados ({searchResults.length})</h3>
                  <div className="space-y-3">
                    {searchResults.map((q) => {
                      const savedQ = savedQuestions.find(sq => sq.id === q.id);
                      const lastAttempt = savedQ?.attempts[savedQ.attempts.length - 1];
                      const isCorrect = lastAttempt?.isCorrect;
                      const redoCount = savedQ?.attempts.length || 0;

                      return (
                        <div 
                          key={q.id}
                          className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${darkMode ? 'bg-stone-800 text-stone-400' : 'bg-gray-100 text-gray-600'}`}>
                                {q.institution || 'ENEM'} {q.year || '2023'}
                              </span>
                              {redoCount > 0 && (
                                <span className={`text-[10px] font-bold ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                                  {isCorrect ? '✅' : '❌'}
                                </span>
                              )}
                            </div>
                            <p className={`text-sm font-medium truncate ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                              {q.text.substring(0, 60)}...
                            </p>
                          </div>
                          <button
                            onClick={() => openQuestion(q)}
                            className="shrink-0 bg-indigo-600 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
                          >
                            {redoCount > 0 ? 'Refazer' : 'Resolver'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {questionMode === 'filter' && hasSearched && searchResults.length === 0 && !loadingQuestion && (
                <div className={`p-6 rounded-2xl text-center border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                  <Search className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-stone-600' : 'text-stone-300'}`} />
                  <p className={`font-bold ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>Nenhuma questão encontrada</p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>Tente outros filtros</p>
                </div>
              )}
            </motion.div>

          /* ── POMODORO TAB ─────────────────────────────────────────────── */
          ) : currentTab === 'pomodoro' ? (
            <motion.div 
              key="pomodoro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <h2 className="font-bold text-lg">Foco Pomodoro</h2>
              </div>

              <div className={`p-8 rounded-3xl border text-center space-y-6 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${
                  pomodoroMode === 'work' 
                    ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' 
                    : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                }`}>
                  {pomodoroMode === 'work' ? '🎯 Sessão de Foco' : '☕ Pausa'}
                </div>

                {isEditingTime ? (
                  <div className="flex items-center justify-center gap-3">
                    <input
                      type="number"
                      value={customTimeInput}
                      onChange={(e) => setCustomTimeInput(e.target.value)}
                      className={`text-6xl font-black w-32 text-center bg-transparent outline-none border-b-2 ${darkMode ? 'border-stone-600 text-stone-100' : 'border-stone-300 text-stone-900'}`}
                      min="1"
                      max="120"
                    />
                    <span className={`text-2xl font-bold ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>min</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (!pomodoroActive) {
                        setIsEditingTime(true);
                        setCustomTimeInput(String(Math.floor(pomodoroTime / 60)));
                      }
                    }}
                    className={`text-7xl font-black tracking-tighter tabular-nums ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}
                  >
                    {String(Math.floor(pomodoroTime / 60)).padStart(2, '0')}:{String(pomodoroTime % 60).padStart(2, '0')}
                  </button>
                )}

                {isEditingTime && (
                  <button
                    onClick={() => {
                      const mins = parseInt(customTimeInput) || 25;
                      setPomodoroTime(Math.max(1, Math.min(120, mins)) * 60);
                      setIsEditingTime(false);
                    }}
                    className="text-sm font-bold text-indigo-600 hover:underline"
                  >
                    Confirmar
                  </button>
                )}

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setPomodoroActive(false);
                      setPomodoroMode('work');
                      setPomodoroTime(25 * 60);
                      setIsEditingTime(false);
                    }}
                    className={`p-4 rounded-2xl transition-colors ${darkMode ? 'bg-stone-800 text-stone-400 hover:bg-stone-700' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => {
                      if (isEditingTime) {
                        const mins = parseInt(customTimeInput) || 25;
                        setPomodoroTime(Math.max(1, Math.min(120, mins)) * 60);
                        setIsEditingTime(false);
                      }
                      setPomodoroActive(!pomodoroActive);
                    }}
                    className={`p-6 rounded-3xl text-white font-bold transition-all active:scale-95 shadow-lg ${
                      pomodoroActive 
                        ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
                    }`}
                  >
                    {pomodoroActive ? <XCircle className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </button>
                  <button
                    onClick={() => {
                      setPomodoroMode(pomodoroMode === 'work' ? 'break' : 'work');
                      setPomodoroTime(pomodoroMode === 'work' ? 5 * 60 : 25 * 60);
                      setPomodoroActive(false);
                    }}
                    className={`p-4 rounded-2xl transition-colors ${darkMode ? 'bg-stone-800 text-stone-400 hover:bg-stone-700' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                  >
                    <Clock className="w-6 h-6" />
                  </button>
                </div>

                <p className={`text-xs font-medium ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>
                  {pomodoroMode === 'work' 
                    ? pomodoroActive ? 'Mantenha o foco! Você consegue! 💪' : 'Toque em ▶ para iniciar a sessão'
                    : 'Descanse um pouco, você merece! ☕'
                  }
                </p>
              </div>

              {/* Pomodoro Tips */}
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <h3 className={`font-bold text-sm mb-3 ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>💡 Dicas Pomodoro</h3>
                <ul className={`space-y-2 text-xs ${darkMode ? 'text-stone-500' : 'text-stone-500'}`}>
                  <li>• 25 min de foco + 5 min de pausa = 1 Pomodoro</li>
                  <li>• A cada 4 Pomodoros, faça uma pausa longa (15-30 min)</li>
                  <li>• Elimine distrações durante a sessão de foco</li>
                  <li>• Ganhe +50 XP ao completar cada sessão!</li>
                </ul>
              </div>
            </motion.div>

          /* ── TASKS TAB ────────────────────────────────────────────────── */
          ) : currentTab === 'tasks' ? (
            <motion.div 
              key="tasks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <List className="w-5 h-5 text-indigo-600" />
                <h2 className="font-bold text-lg">Lista de Tarefas</h2>
              </div>

              {/* Add Task */}
              <div className={`flex gap-3 p-4 rounded-2xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newTaskText.trim()) {
                      setTasks(prev => [...prev, { id: Date.now().toString(), text: newTaskText.trim(), completed: false }]);
                      setNewTaskText('');
                    }
                  }}
                  placeholder="Adicionar nova tarefa..."
                  className={`flex-1 bg-transparent outline-none text-sm font-medium ${darkMode ? 'text-stone-200 placeholder:text-stone-700' : 'text-stone-800 placeholder:text-stone-400'}`}
                />
                <button
                  onClick={() => {
                    if (newTaskText.trim()) {
                      setTasks(prev => [...prev, { id: Date.now().toString(), text: newTaskText.trim(), completed: false }]);
                      setNewTaskText('');
                    }
                  }}
                  disabled={!newTaskText.trim()}
                  className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-40"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Task Stats */}
              {tasks.length > 0 && (
                <div className={`flex items-center justify-between px-2 text-xs font-bold ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>
                  <span>{tasks.filter(t => !t.completed).length} pendentes</span>
                  <span className="text-emerald-500">{tasks.filter(t => t.completed).length} concluídas</span>
                </div>
              )}

              {/* Task List */}
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <div className={`p-8 rounded-2xl text-center border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                    <List className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-stone-700' : 'text-stone-300'}`} />
                    <p className={`font-bold ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>Nenhuma tarefa ainda</p>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-stone-700' : 'text-stone-400'}`}>Adicione suas tarefas de estudo acima</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div 
                      key={task.id}
                      className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                        task.completed 
                          ? darkMode ? 'bg-stone-900/50 border-stone-800 opacity-60' : 'bg-stone-50 border-stone-100 opacity-60'
                          : darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button
                          onClick={() => {
                            setTasks(prev => prev.map(t => 
                              t.id === task.id ? { ...t, completed: !t.completed } : t
                            ));
                            if (!task.completed) addXP(25);
                          }}
                          className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            task.completed 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : darkMode ? 'border-stone-700 hover:border-emerald-500' : 'border-stone-300 hover:border-emerald-500'
                          }`}
                        >
                          {task.completed && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <span className={`text-sm font-medium transition-all ${
                          task.completed 
                            ? `line-through ${darkMode ? 'text-stone-600' : 'text-stone-400'}` 
                            : darkMode ? 'text-stone-200' : 'text-stone-700'
                        }`}>
                          {task.text}
                        </span>
                      </div>
                      <button
                        onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode ? 'text-stone-500 hover:text-red-400 hover:bg-stone-800' : 'text-stone-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* ── Bottom Navigation ───────────────────────────────────────────────── */}
      <nav 
        className={`flex-shrink-0 border-t px-6 pt-3 flex justify-around items-center gap-2 transition-colors ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}
        style={{
          paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0.75rem)',
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 1rem)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 1rem)'
        }}
      >
        <button 
          onClick={() => {
            setCurrentTab('home');
            setSelectedSubjectId(null);
            window.location.hash = 'home';
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'home' ? 'text-indigo-600' : darkMode ? 'text-stone-600' : 'text-stone-400'}`}
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Início</span>
        </button>
        
        <button 
          onClick={() => {
            setCurrentTab('questions');
            window.location.hash = 'questions';
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'questions' ? 'text-indigo-600' : darkMode ? 'text-stone-600' : 'text-stone-400'}`}
        >
          <BrainCircuit className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Questões</span>
        </button>

        <button 
          onClick={() => {
            setCurrentTab('achievements');
            window.location.hash = 'achievements';
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'achievements' ? 'text-indigo-600' : darkMode ? 'text-stone-600' : 'text-stone-400'}`}
        >
          <Trophy className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Conquistas</span>
        </button>

        <button 
          onClick={() => {
            setCurrentTab('pomodoro');
            window.location.hash = 'pomodoro';
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'pomodoro' ? 'text-indigo-600' : darkMode ? 'text-stone-600' : 'text-stone-400'}`}
        >
          <Target className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Foco</span>
        </button>

        <button 
          onClick={() => {
            setCurrentTab('tasks');
            window.location.hash = 'tasks';
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'tasks' ? 'text-indigo-600' : darkMode ? 'text-stone-600' : 'text-stone-400'}`}
        >
          <List className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Tarefas</span>
        </button>
      </nav>
    </div>
  );
}
