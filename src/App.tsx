import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { QUESTION_BANK } from './data/questionBank';
import {
  Calculator,
  BookOpen,
  Globe,
  FlaskConical,
  PenTool,
  CheckCircle2,
  ChevronRight,
  Trophy,
  User,
  LayoutDashboard,
  Plus,
  Moon,
  Sun,
  BrainCircuit,
  Loader2,
  Check,
  X,
  Trash2,
  Share2,
  Search,
  Bookmark,
  Clock,
  List,
  ChevronDown,
  Target,
  Play,
  Brain,
  Star,
  Zap,
  RotateCcw,
  TrendingUp,
  Award,
  Flame,
  ChevronUp,
  Edit3,
  CheckSquare,
  BarChart2,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Subject, Topic, UserProfile, Question, SavedQuestion, Attempt, ToastNotification } from './types';
import { ENEM_DATA } from './data/enemData';
import {
  ACHIEVEMENTS,
  getLevelFromXp,
  getXpProgressInLevel,
  RARITY_COLORS,
  RARITY_LABELS,
} from './data/achievements';

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

// ─── Toast Component ──────────────────────────────────────────────────────────
function ToastContainer({ toasts, onRemove }: { toasts: ToastNotification[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none" style={{ maxWidth: 340 }}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`pointer-events-auto rounded-2xl shadow-2xl p-4 flex items-start gap-3 border ${
              toast.type === 'achievement'
                ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/80 dark:border-amber-700'
                : toast.type === 'levelup'
                ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/80 dark:border-indigo-700'
                : toast.type === 'streak'
                ? 'bg-orange-50 border-orange-200 dark:bg-orange-950/80 dark:border-orange-700'
                : toast.type === 'error'
                ? 'bg-red-50 border-red-200 dark:bg-red-950/80 dark:border-red-700'
                : 'bg-white border-stone-200 dark:bg-stone-900 dark:border-stone-700'
            }`}
          >
            {toast.icon && (
              <span className="text-2xl leading-none shrink-0">{toast.icon}</span>
            )}
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-sm leading-tight ${
                toast.type === 'achievement' ? 'text-amber-800 dark:text-amber-200' :
                toast.type === 'levelup' ? 'text-indigo-800 dark:text-indigo-200' :
                toast.type === 'streak' ? 'text-orange-800 dark:text-orange-200' :
                toast.type === 'error' ? 'text-red-800 dark:text-red-200' :
                'text-stone-800 dark:text-stone-200'
              }`}>{toast.title}</p>
              <p className={`text-xs mt-0.5 leading-snug ${
                toast.type === 'achievement' ? 'text-amber-600 dark:text-amber-400' :
                toast.type === 'levelup' ? 'text-indigo-600 dark:text-indigo-400' :
                toast.type === 'streak' ? 'text-orange-600 dark:text-orange-400' :
                toast.type === 'error' ? 'text-red-600 dark:text-red-400' :
                'text-stone-500 dark:text-stone-400'
              }`}>{toast.message}</p>
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="shrink-0 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────
function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  darkMode,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  darkMode: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`relative rounded-3xl p-6 shadow-2xl max-w-sm w-full border ${
          darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
        }`}
      >
        <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-stone-900'}`}>{title}</h3>
        <p className={`text-sm mb-6 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${
              darkMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl font-bold text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Prompt Modal ─────────────────────────────────────────────────────────────
function PromptModal({
  open,
  title,
  placeholder,
  onConfirm,
  onCancel,
  darkMode,
}: {
  open: boolean;
  title: string;
  placeholder?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
  darkMode: boolean;
}) {
  const [value, setValue] = useState('');
  useEffect(() => { if (open) setValue(''); }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`relative rounded-3xl p-6 shadow-2xl max-w-sm w-full border ${
          darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
        }`}
      >
        <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-stone-900'}`}>{title}</h3>
        <input
          autoFocus
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && value.trim()) onConfirm(value.trim()); }}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 mb-4 transition-colors ${
            darkMode ? 'bg-stone-800 border-stone-700 text-white placeholder-stone-500' : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400'
          }`}
        />
        <div className="flex gap-3">
          <button onClick={onCancel} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${darkMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}>
            Cancelar
          </button>
          <button
            onClick={() => { if (value.trim()) onConfirm(value.trim()); }}
            className="flex-1 py-3 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── XP Bar Component ─────────────────────────────────────────────────────────
function XpBar({ xp, darkMode }: { xp: number; darkMode: boolean }) {
  const level = getLevelFromXp(xp);
  const progress = getXpProgressInLevel(xp);
  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center justify-center w-9 h-9 rounded-xl font-black text-sm shadow-inner ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
        {level}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
            Nível {level}
          </span>
          <span className={`text-[10px] font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            {progress.current}/{progress.needed} XP
          </span>
        </div>
        <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress.percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Estudante',
    photo: null,
    achievements: [],
    streak: 0,
    lastLogin: null,
    xp: 0,
    level: 1,
    totalCorrect: 0,
    totalAnswered: 0,
    consecutiveCorrect: 0,
    bestConsecutive: 0,
  });
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'home' | 'achievements' | 'questions' | 'pomodoro' | 'tasks'>('home');
  const [isInitialized, setIsInitialized] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [editingTopicTitle, setEditingTopicTitle] = useState('');

  // Modals
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; title: string; message: string; onConfirm: () => void } | null>(null);
  const [promptModal, setPromptModal] = useState<{ open: boolean; title: string; placeholder?: string; onConfirm: (v: string) => void } | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const toastTimeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Pomodoro & Tasks State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work');
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [customTimeInput, setCustomTimeInput] = useState('25');
  const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [pomodoroSessions, setPomodoroSessions] = useState(0);

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

  // ── Toast helpers ──────────────────────────────────────────────────────────
  const addToast = useCallback((toast: Omit<ToastNotification, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const duration = toast.duration ?? 4000;
    setToasts((prev) => [...prev.slice(-4), { ...toast, id }]);
    toastTimeouts.current[id] = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    clearTimeout(toastTimeouts.current[id]);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Achievement checker ────────────────────────────────────────────────────
  const checkAchievements = useCallback(
    (updatedProfile: UserProfile, updatedSubjects: Subject[], updatedQuestions: SavedQuestion[]) => {
      const newlyUnlocked: string[] = [];
      let xpGained = 0;

      ACHIEVEMENTS.forEach((achievement) => {
        if (
          !updatedProfile.achievements.includes(achievement.id) &&
          achievement.condition(updatedProfile, updatedSubjects, updatedQuestions)
        ) {
          newlyUnlocked.push(achievement.id);
          xpGained += achievement.xpReward;
          setTimeout(() => {
            addToast({
              type: 'achievement',
              title: `Conquista Desbloqueada!`,
              message: `${achievement.icon} ${achievement.title} — +${achievement.xpReward} XP`,
              icon: '🏆',
              duration: 5000,
            });
          }, newlyUnlocked.length * 600);
        }
      });

      if (newlyUnlocked.length > 0 || xpGained > 0) {
        setProfile((prev) => {
          const newXp = prev.xp + xpGained;
          const oldLevel = getLevelFromXp(prev.xp);
          const newLevel = getLevelFromXp(newXp);
          if (newLevel > oldLevel) {
            setTimeout(() => {
              addToast({
                type: 'levelup',
                title: `Subiu para o Nível ${newLevel}!`,
                message: 'Continue assim e conquiste o ENEM!',
                icon: '⬆️',
                duration: 5000,
              });
            }, (newlyUnlocked.length + 1) * 600);
          }
          return {
            ...prev,
            achievements: [...prev.achievements, ...newlyUnlocked],
            xp: newXp,
            level: newLevel,
          };
        });
      }
    },
    [addToast]
  );

  // ── Load data from localStorage ────────────────────────────────────────────
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const savedSubjects = localStorage.getItem('enem_subjects');
    const savedProfile = localStorage.getItem('enem_profile');
    const savedTheme = localStorage.getItem('enem_theme');
    const savedQs = localStorage.getItem('enem_saved_questions');
    const savedTasks = localStorage.getItem('enem_tasks');
    const savedPomodoro = localStorage.getItem('enem_pomodoro_sessions');

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
      const parsedProfile = JSON.parse(savedProfile) as UserProfile;
      // Ensure new fields exist for old profiles
      if (parsedProfile.xp === undefined) parsedProfile.xp = 0;
      if (parsedProfile.level === undefined) parsedProfile.level = 1;
      if (parsedProfile.totalCorrect === undefined) parsedProfile.totalCorrect = 0;
      if (parsedProfile.totalAnswered === undefined) parsedProfile.totalAnswered = 0;
      if (parsedProfile.consecutiveCorrect === undefined) parsedProfile.consecutiveCorrect = 0;
      if (parsedProfile.bestConsecutive === undefined) parsedProfile.bestConsecutive = 0;

      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (parsedProfile.lastLogin === yesterdayStr) {
        parsedProfile.streak += 1;
        setTimeout(() => {
          addToast({
            type: 'streak',
            title: `🔥 Sequência de ${parsedProfile.streak} dias!`,
            message: 'Você está arrasando! Continue assim.',
            icon: '🔥',
            duration: 5000,
          });
        }, 1000);
      } else if (parsedProfile.lastLogin !== today) {
        if (parsedProfile.streak > 1) {
          parsedProfile.streak = 1;
        }
      }
      parsedProfile.lastLogin = today;
      setProfile(parsedProfile);
    }

    if (savedTheme) setDarkMode(savedTheme === 'dark');
    if (savedQs) setSavedQuestions(JSON.parse(savedQs));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedPomodoro) setPomodoroSessions(parseInt(savedPomodoro) || 0);

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#questions') setCurrentTab('questions');
      else if (hash === '#achievements') setCurrentTab('achievements');
      else if (hash === '#pomodoro') setCurrentTab('pomodoro');
      else if (hash === '#tasks') setCurrentTab('tasks');
      else setCurrentTab('home');
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    setIsInitialized(true);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [addToast]);

  // ── Save data to localStorage ──────────────────────────────────────────────
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('enem_subjects', JSON.stringify(subjects));
      localStorage.setItem('enem_profile', JSON.stringify(profile));
      localStorage.setItem('enem_theme', darkMode ? 'dark' : 'light');
      localStorage.setItem('enem_saved_questions', JSON.stringify(savedQuestions));
      localStorage.setItem('enem_tasks', JSON.stringify(tasks));
      localStorage.setItem('enem_pomodoro_sessions', String(pomodoroSessions));
    }
  }, [subjects, profile, isInitialized, darkMode, savedQuestions, tasks, pomodoroSessions]);

  // ── Pomodoro Timer ─────────────────────────────────────────────────────────
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => setPomodoroTime((t) => t - 1), 1000);
    } else if (pomodoroTime === 0) {
      setPomodoroActive(false);
      if (pomodoroMode === 'work') {
        setPomodoroSessions((s) => s + 1);
        setPomodoroMode('break');
        setPomodoroTime(5 * 60);
        addToast({ type: 'info', title: 'Sessão concluída!', message: 'Hora de uma pausa de 5 minutos.', icon: '☕', duration: 5000 });
      } else {
        setPomodoroMode('work');
        setPomodoroTime(25 * 60);
        addToast({ type: 'info', title: 'Pausa encerrada!', message: 'Vamos voltar ao foco!', icon: '💪', duration: 4000 });
      }
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime, pomodoroMode, addToast]);

  // ── Computed values ────────────────────────────────────────────────────────
  const totalTopics = useMemo(() => subjects.reduce((acc, s) => acc + s.topics.length, 0), [subjects]);
  const completedTopics = useMemo(() => subjects.reduce((acc, s) => acc + s.topics.filter((t) => t.completed).length, 0), [subjects]);
  const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);
  const unlockedCount = profile.achievements.length;
  const totalAchievements = ACHIEVEMENTS.length;
  const accuracyRate = profile.totalAnswered > 0 ? Math.round((profile.totalCorrect / profile.totalAnswered) * 100) : 0;

  // ── Actions ────────────────────────────────────────────────────────────────
  const toggleTopic = (subjectId: string, topicId: string) => {
    setSubjects((prev) => {
      const updated = prev.map((s) => {
        if (s.id !== subjectId) return s;
        return { ...s, topics: s.topics.map((t) => (t.id === topicId ? { ...t, completed: !t.completed } : t)) };
      });
      checkAchievements(profile, updated, savedQuestions);
      return updated;
    });
  };

  const addTopic = (subjectId: string) => {
    if (!newTopicTitle.trim()) return;
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id !== subjectId) return s;
        const newTopic: Topic = { id: `${subjectId}-custom-${Date.now()}`, title: newTopicTitle, completed: false };
        return { ...s, topics: [...s.topics, newTopic] };
      })
    );
    setNewTopicTitle('');
  };

  const addSubject = (name: string) => {
    const newSubject: Subject = { id: `subject-${Date.now()}`, name, icon: 'BookOpen', color: 'bg-stone-500', topics: [] };
    setSubjects((prev) => [...prev, newSubject]);
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    if (selectedSubjectId === id) setSelectedSubjectId(null);
  };

  const deleteTopic = (subjectId: string, topicId: string) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === subjectId ? { ...s, topics: s.topics.filter((t) => t.id !== topicId) } : s))
    );
  };

  const updateProfileName = (name: string) => setProfile((prev) => ({ ...prev, name }));

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile((prev) => ({ ...prev, photo: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    setLoadingQuestion(true);
    setHasSearched(true);
    setActiveQuestionId(null);
    setSelectedOption(null);
    setShowExplanation(false);
    try {
      let allPreDefined: SavedQuestion[] = [];
      Object.entries(QUESTION_BANK).forEach(([subjectId, questions]) => {
        questions.forEach((q, idx) => {
          allPreDefined.push({ ...q, id: `bank-${subjectId}-${idx}`, subjectId, attempts: [] });
        });
      });
      let results = allPreDefined;
      if (filterInstitution) results = results.filter((q) => (q.institution || 'ENEM') === filterInstitution);
      if (filterDiscipline) results = results.filter((q) => q.subjectId === filterDiscipline);
      if (filterTopic) {
        const term = filterTopic.toLowerCase();
        results = results.filter(
          (q) => (q.topic && q.topic.toLowerCase().includes(term)) || (q.text && q.text.toLowerCase().includes(term))
        );
      }
      setSearchResults(results);
    } catch (error) {
      console.error('Erro ao buscar questões:', error);
      addToast({ type: 'error', title: 'Erro na busca', message: 'Ocorreu um erro ao buscar as questões. Tente novamente.', icon: '❌' });
    } finally {
      setLoadingQuestion(false);
    }
  };

  const openQuestion = (q: SavedQuestion) => {
    const existing = savedQuestions.find((sq) => sq.id === q.id);
    if (!existing) setSavedQuestions((prev) => [q, ...prev]);
    setActiveQuestionId(q.id);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const handleAnswer = (optionIdx: number) => {
    if (!activeQuestionId) return;
    const question = savedQuestions.find((q) => q.id === activeQuestionId);
    if (!question) return;

    const isCorrect = optionIdx === question.correctAnswer;
    const newAttempt: Attempt = { timestamp: Date.now(), selectedOption: optionIdx, isCorrect };

    setSavedQuestions((prev) =>
      prev.map((q) => (q.id === activeQuestionId ? { ...q, attempts: [...q.attempts, newAttempt] } : q))
    );
    setSelectedOption(optionIdx);

    setProfile((prev) => {
      const newConsecutive = isCorrect ? prev.consecutiveCorrect + 1 : 0;
      const newBest = Math.max(prev.bestConsecutive, newConsecutive);
      const xpGain = isCorrect ? (newConsecutive >= 5 ? 30 : newConsecutive >= 3 ? 20 : 10) : 2;
      const updated: UserProfile = {
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
        consecutiveCorrect: newConsecutive,
        bestConsecutive: newBest,
        xp: prev.xp + xpGain,
        level: getLevelFromXp(prev.xp + xpGain),
      };

      // Show consecutive streak toast
      if (isCorrect && newConsecutive > 0 && newConsecutive % 3 === 0) {
        setTimeout(() => {
          addToast({
            type: 'streak',
            title: `${newConsecutive} acertos seguidos!`,
            message: `+${xpGain} XP de bônus por sequência!`,
            icon: '🔥',
          });
        }, 300);
      }

      // Check achievements after state update
      setTimeout(() => {
        checkAchievements(updated, subjects, savedQuestions);
      }, 100);

      return updated;
    });
  };

  const redoQuestion = (qId: string) => {
    setActiveQuestionId(qId);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuestionMode('random');
  };

  const generateBankQuestion = async () => {
    setIsGenerating(true);
    setLoadingQuestion(true);
    setActiveQuestionId(null);
    setSelectedOption(null);
    setShowExplanation(false);
    await new Promise((resolve) => setTimeout(resolve, 400));

    let availableQuestions: SavedQuestion[] = [];
    const subjectsToSearch = selectedSubjectForQuestion === 'geral' ? Object.keys(QUESTION_BANK) : [selectedSubjectForQuestion];
    subjectsToSearch.forEach((subjectId) => {
      (QUESTION_BANK[subjectId] || []).forEach((q, idx) => {
        availableQuestions.push({ ...q, id: `bank-${subjectId}-${idx}`, subjectId, attempts: [] });
      });
    });

    if (availableQuestions.length === 0) {
      addToast({ type: 'error', title: 'Sem questões', message: 'Ainda não temos questões disponíveis para esta seleção.', icon: '📭' });
      setIsGenerating(false);
      setLoadingQuestion(false);
      return;
    }

    // Prefer unanswered questions
    const unanswered = availableQuestions.filter((q) => !savedQuestions.find((sq) => sq.id === q.id && sq.attempts.length > 0));
    const pool = unanswered.length > 0 ? unanswered : availableQuestions;
    const randomQuestion = pool[Math.floor(Math.random() * pool.length)];
    const existing = savedQuestions.find((sq) => sq.id === randomQuestion.id);
    const finalQuestion = existing ?? randomQuestion;
    if (!existing) setSavedQuestions((prev) => [finalQuestion, ...prev]);
    setActiveQuestionId(finalQuestion.id);
    setIsGenerating(false);
    setLoadingQuestion(false);
  };

  // ── Confirm / Prompt helpers ───────────────────────────────────────────────
  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModal({ open: true, title, message, onConfirm });
  };

  const showPrompt = (title: string, placeholder: string, onConfirm: (v: string) => void) => {
    setPromptModal({ open: true, title, placeholder, onConfirm });
  };

  if (!isInitialized) return null;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-stone-950 text-stone-100' : 'bg-slate-50 text-stone-900'} font-sans`}>
      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Modals */}
      {confirmModal && (
        <ConfirmModal
          open={confirmModal.open}
          title={confirmModal.title}
          message={confirmModal.message}
          onConfirm={() => { confirmModal.onConfirm(); setConfirmModal(null); }}
          onCancel={() => setConfirmModal(null)}
          darkMode={darkMode}
        />
      )}
      {promptModal && (
        <PromptModal
          open={promptModal.open}
          title={promptModal.title}
          placeholder={promptModal.placeholder}
          onConfirm={(v) => { promptModal.onConfirm(v); setPromptModal(null); }}
          onCancel={() => setPromptModal(null)}
          darkMode={darkMode}
        />
      )}

      {/* ── Header ── */}
      <header className={`sticky top-0 z-10 border-b transition-colors ${darkMode ? 'bg-stone-900/95 border-stone-800 backdrop-blur-md' : 'bg-white/95 border-stone-200 backdrop-blur-md'}`}>
        <div className="px-5 pt-10 pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <label htmlFor="photo-upload" className={`w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer transition-all ring-2 ring-offset-2 ${darkMode ? 'bg-stone-800 ring-stone-700 ring-offset-stone-900 hover:ring-indigo-500' : 'bg-stone-100 ring-stone-200 ring-offset-white hover:ring-indigo-500'}`}>
                  {profile.photo ? (
                    <img src={profile.photo} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <User className={`w-7 h-7 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`} />
                  )}
                </label>
                <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                <div className="absolute -bottom-1.5 -right-1.5 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-stone-900 shadow-lg flex items-center gap-0.5">
                  <Flame className="w-2.5 h-2.5" />
                  {profile.streak}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => updateProfileName(e.target.value)}
                    className={`text-lg font-black tracking-tight bg-transparent border-b border-transparent focus:border-indigo-500 outline-none w-36 transition-colors ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}
                    placeholder="Seu nome"
                  />
                  <Edit3 className="w-3 h-3 text-stone-400 shrink-0" />
                </div>
                <p className={`text-xs font-medium ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                  {!isOnline && <span className="text-red-500 mr-1">● Offline</span>}
                  Rumo à aprovação 🚀
                </p>
              </div>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin + window.location.pathname);
                  addToast({ type: 'info', title: 'Link copiado!', message: 'Compartilhe o app com seus colegas.', icon: '🔗' });
                }}
                className={`p-2.5 rounded-xl transition-colors ${darkMode ? 'bg-stone-800 text-stone-400 hover:bg-stone-700' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
              >
                <Share2 className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-xl transition-colors ${darkMode ? 'bg-stone-800 text-yellow-400 hover:bg-stone-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* XP Bar */}
          <XpBar xp={profile.xp} darkMode={darkMode} />

          {/* Overall Progress */}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                Progresso Geral — {completedTopics}/{totalTopics} tópicos
              </span>
              <span className={`text-[10px] font-black ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{overallPercentage}%</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallPercentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="px-5 pt-6 pb-32">
        <AnimatePresence mode="wait">

          {/* ══ HOME TAB ══ */}
          {currentTab === 'home' && !selectedSubjectId && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-6">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Questões', value: profile.totalAnswered, icon: Brain, color: 'text-purple-500' },
                  { label: 'Acertos', value: `${accuracyRate}%`, icon: Target, color: 'text-emerald-500' },
                  { label: 'Conquistas', value: `${unlockedCount}/${totalAchievements}`, icon: Trophy, color: 'text-amber-500' },
                ].map((stat) => (
                  <div key={stat.label} className={`p-4 rounded-2xl border text-center ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                    <stat.icon className={`w-5 h-5 mx-auto mb-1.5 ${stat.color}`} />
                    <div className={`text-xl font-black ${darkMode ? 'text-white' : 'text-stone-900'}`}>{stat.value}</div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Subjects */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className={`font-black text-base ${darkMode ? 'text-white' : 'text-stone-900'}`}>Minhas Matérias</h2>
                  <button
                    onClick={() => showPrompt('Nova Matéria', 'Nome da matéria...', (name) => addSubject(name))}
                    className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {subjects.map((subject) => {
                    const Icon = ICON_MAP[subject.icon] || BookOpen;
                    const completed = subject.topics.filter((t) => t.completed).length;
                    const total = subject.topics.length;
                    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                    const isComplete = percent === 100 && total > 0;

                    return (
                      <motion.div
                        key={subject.id}
                        layout
                        className={`rounded-2xl border overflow-hidden transition-all ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'} ${isComplete ? (darkMode ? 'border-emerald-800' : 'border-emerald-200') : ''}`}
                      >
                        <button
                          onClick={() => setSelectedSubjectId(subject.id)}
                          className="w-full p-5 flex items-center gap-4 text-left"
                        >
                          <div className={`p-3.5 rounded-2xl ${subject.color} text-white shadow-lg shrink-0`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className={`font-black text-base leading-tight truncate ${darkMode ? 'text-white' : 'text-stone-900'}`}>{subject.name}</h3>
                              {isComplete && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                            </div>
                            <p className={`text-xs mt-0.5 font-medium ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>{completed} de {total} tópicos</p>
                            <div className={`h-1.5 w-full rounded-full overflow-hidden mt-2 ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                className={`h-full ${subject.color} rounded-full`}
                              />
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <span className={`text-lg font-black ${isComplete ? 'text-emerald-500' : darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{percent}%</span>
                            <ChevronRight className={`w-4 h-4 mx-auto mt-1 ${darkMode ? 'text-stone-600' : 'text-stone-300'}`} />
                          </div>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {overallPercentage === 100 && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`p-6 rounded-2xl text-center border ${darkMode ? 'bg-emerald-950/20 border-emerald-900 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
                  <Trophy className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <h3 className="font-black text-lg">Incrível! Você está pronto!</h3>
                  <p className="text-sm opacity-80 mt-1">Completou 100% dos estudos. O ENEM é seu!</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ══ SUBJECT DETAIL ══ */}
          {currentTab === 'home' && selectedSubjectId && selectedSubject && (
            <motion.div key={`subject-${selectedSubjectId}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedSubjectId(null)}
                  className={`p-2.5 rounded-xl transition-colors ${darkMode ? 'bg-stone-800 hover:bg-stone-700' : 'bg-stone-100 hover:bg-stone-200'}`}
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <div>
                  <h2 className={`font-black text-xl ${darkMode ? 'text-white' : 'text-stone-900'}`}>{selectedSubject.name}</h2>
                  <p className={`text-xs font-medium ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                    {selectedSubject.topics.filter((t) => t.completed).length} de {selectedSubject.topics.length} tópicos concluídos
                  </p>
                </div>
                <button
                  onClick={() => showConfirm('Excluir Matéria', `Deseja excluir "${selectedSubject.name}"? Esta ação não pode ser desfeita.`, () => deleteSubject(selectedSubjectId))}
                  className={`ml-auto p-2.5 rounded-xl transition-colors ${darkMode ? 'text-stone-500 hover:text-red-400 hover:bg-stone-800' : 'text-stone-400 hover:text-red-500 hover:bg-red-50'}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Topics list */}
              <div className="space-y-2">
                {selectedSubject.topics.map((topic) => (
                  <motion.div
                    key={topic.id}
                    layout
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                      topic.completed
                        ? darkMode ? 'bg-emerald-950/20 border-emerald-900' : 'bg-emerald-50 border-emerald-200'
                        : darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
                    }`}
                  >
                    <button
                      onClick={() => toggleTopic(selectedSubjectId, topic.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        topic.completed ? 'bg-emerald-500 border-emerald-500 text-white' : darkMode ? 'border-stone-600 hover:border-emerald-500' : 'border-stone-300 hover:border-emerald-500'
                      }`}
                    >
                      {topic.completed && <Check className="w-3.5 h-3.5" />}
                    </button>

                    {editingTopicId === topic.id ? (
                      <input
                        autoFocus
                        type="text"
                        value={editingTopicTitle}
                        onChange={(e) => setEditingTopicTitle(e.target.value)}
                        onBlur={() => {
                          if (editingTopicTitle.trim()) {
                            setSubjects((prev) =>
                              prev.map((s) =>
                                s.id === selectedSubjectId
                                  ? { ...s, topics: s.topics.map((t) => (t.id === topic.id ? { ...t, title: editingTopicTitle.trim() } : t)) }
                                  : s
                              )
                            );
                          }
                          setEditingTopicId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                          if (e.key === 'Escape') setEditingTopicId(null);
                        }}
                        className={`flex-1 bg-transparent border-b outline-none text-sm font-medium ${darkMode ? 'border-stone-600 text-white' : 'border-stone-300 text-stone-900'}`}
                      />
                    ) : (
                      <span
                        onDoubleClick={() => { setEditingTopicId(topic.id); setEditingTopicTitle(topic.title); }}
                        className={`flex-1 text-sm font-medium leading-snug transition-all ${topic.completed ? (darkMode ? 'line-through text-stone-500' : 'line-through text-stone-400') : darkMode ? 'text-stone-200' : 'text-stone-700'}`}
                      >
                        {topic.title}
                      </span>
                    )}

                    <button
                      onClick={() => showConfirm('Excluir Tópico', `Deseja excluir "${topic.title}"?`, () => deleteTopic(selectedSubjectId, topic.id))}
                      className={`p-1.5 rounded-lg transition-colors shrink-0 ${darkMode ? 'text-stone-600 hover:text-red-400 hover:bg-stone-800' : 'text-stone-300 hover:text-red-500 hover:bg-red-50'}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Add topic */}
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') addTopic(selectedSubjectId); }}
                  placeholder="Novo tópico..."
                  className={`flex-1 px-4 py-3 rounded-xl text-sm border outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors ${darkMode ? 'bg-stone-900 border-stone-800 text-white placeholder-stone-600' : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400'}`}
                />
                <button
                  onClick={() => addTopic(selectedSubjectId)}
                  className="px-4 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ══ ACHIEVEMENTS TAB ══ */}
          {currentTab === 'achievements' && (
            <motion.div key="achievements" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-6">
              {/* Header stats */}
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl ${darkMode ? 'bg-amber-900/30' : 'bg-amber-50'}`}>
                    <Trophy className="w-7 h-7 text-amber-500" />
                  </div>
                  <div>
                    <h2 className={`font-black text-xl ${darkMode ? 'text-white' : 'text-stone-900'}`}>Conquistas</h2>
                    <p className={`text-sm ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>{unlockedCount} de {totalAchievements} desbloqueadas</p>
                  </div>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((unlockedCount / totalAchievements) * 100)}%` }}
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  />
                </div>
                <p className={`text-xs mt-2 font-bold text-right ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                  {Math.round((unlockedCount / totalAchievements) * 100)}% completo
                </p>
              </div>

              {/* Stats summary */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total Respondidas', value: profile.totalAnswered, icon: Brain, color: 'text-purple-500' },
                  { label: 'Taxa de Acerto', value: `${accuracyRate}%`, icon: Target, color: 'text-emerald-500' },
                  { label: 'Melhor Sequência', value: `${profile.bestConsecutive}x`, icon: Flame, color: 'text-orange-500' },
                  { label: 'Dias Seguidos', value: profile.streak, icon: Star, color: 'text-amber-500' },
                ].map((stat) => (
                  <div key={stat.label} className={`p-4 rounded-2xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                    <stat.icon className={`w-5 h-5 mb-2 ${stat.color}`} />
                    <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-stone-900'}`}>{stat.value}</div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Learning curve */}
              {savedQuestions.filter((q) => q.attempts.length > 0).length >= 3 && (
                <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    <h3 className={`font-black text-base ${darkMode ? 'text-white' : 'text-stone-900'}`}>Curva de Aprendizado</h3>
                  </div>
                  {(() => {
                    const answered = savedQuestions.filter((q) => q.attempts.length > 0);
                    const windowSize = 5;
                    const points: number[] = [];
                    for (let i = 0; i < answered.length; i++) {
                      const slice = answered.slice(Math.max(0, i - windowSize + 1), i + 1);
                      const rate = slice.filter((q) => q.attempts[q.attempts.length - 1]?.isCorrect).length / slice.length;
                      points.push(rate);
                    }
                    const maxPoints = Math.min(points.length, 20);
                    const displayPoints = points.slice(-maxPoints);
                    const svgW = 300;
                    const svgH = 80;
                    const pathD = displayPoints
                      .map((p, i) => {
                        const x = (i / (displayPoints.length - 1)) * svgW;
                        const y = svgH - p * svgH;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      })
                      .join(' ');
                    const lastRate = displayPoints[displayPoints.length - 1] ?? 0;
                    const trend = displayPoints.length > 1 ? lastRate - displayPoints[0] : 0;
                    return (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs font-medium ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                            Últimas {answered.length} questões respondidas
                          </span>
                          <span className={`text-xs font-bold flex items-center gap-1 ${trend >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {trend >= 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            {trend >= 0 ? 'Melhorando' : 'Atenção'}
                          </span>
                        </div>
                        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
                          <defs>
                            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#6366f1" />
                              <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                          </defs>
                          {displayPoints.length > 1 && (
                            <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          )}
                          {displayPoints.map((p, i) => (
                            <circle
                              key={i}
                              cx={(i / (displayPoints.length - 1)) * svgW}
                              cy={svgH - p * svgH}
                              r="3"
                              fill={p >= 0.7 ? '#10b981' : p >= 0.4 ? '#f59e0b' : '#ef4444'}
                            />
                          ))}
                        </svg>
                        <div className="flex justify-between mt-2">
                          <span className={`text-[10px] ${darkMode ? 'text-stone-600' : 'text-stone-300'}`}>0%</span>
                          <span className={`text-[10px] ${darkMode ? 'text-stone-600' : 'text-stone-300'}`}>100%</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Achievements grid */}
              {(['questions', 'accuracy', 'topics', 'streak'] as const).map((category) => {
                const catAchievements = ACHIEVEMENTS.filter((a) => a.category === category);
                const catLabels: Record<string, string> = { questions: 'Questões Respondidas', accuracy: 'Precisão & Sequências', topics: 'Conteúdo Estudado', streak: 'Consistência' };
                return (
                  <div key={category}>
                    <h3 className={`font-black text-sm uppercase tracking-widest mb-3 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>{catLabels[category]}</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {catAchievements.map((achievement) => {
                        const unlocked = profile.achievements.includes(achievement.id);
                        const colors = RARITY_COLORS[achievement.rarity];
                        return (
                          <motion.div
                            key={achievement.id}
                            layout
                            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                              unlocked
                                ? `${colors.bg} ${colors.border}`
                                : darkMode ? 'bg-stone-900 border-stone-800 opacity-50' : 'bg-stone-50 border-stone-200 opacity-60'
                            }`}
                          >
                            <div className={`text-3xl leading-none ${!unlocked ? 'grayscale opacity-40' : ''}`}>
                              {unlocked ? achievement.icon : <Lock className="w-7 h-7 text-stone-400" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`font-black text-sm ${unlocked ? colors.text : darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                                  {achievement.title}
                                </span>
                                <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full ${colors.badge}`}>
                                  {RARITY_LABELS[achievement.rarity]}
                                </span>
                              </div>
                              <p className={`text-xs mt-0.5 ${unlocked ? (darkMode ? 'text-stone-400' : 'text-stone-500') : darkMode ? 'text-stone-600' : 'text-stone-400'}`}>
                                {achievement.description}
                              </p>
                            </div>
                            <div className="shrink-0 text-right">
                              <div className={`text-xs font-black ${unlocked ? 'text-amber-500' : darkMode ? 'text-stone-600' : 'text-stone-300'}`}>
                                +{achievement.xpReward} XP
                              </div>
                              {unlocked && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto mt-1" />}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ══ QUESTIONS TAB ══ */}
          {currentTab === 'questions' && (
            <motion.div key="questions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-5">
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-3 rounded-2xl ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                    <BrainCircuit className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className={`font-black text-lg ${darkMode ? 'text-white' : 'text-stone-900'}`}>Banco de Questões</h2>
                    <p className={`text-xs ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                      {profile.totalAnswered} respondidas · {profile.totalCorrect} acertos
                    </p>
                  </div>
                </div>

                {/* Mode tabs */}
                <div className={`flex p-1 rounded-xl mb-5 ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                  {(['random', 'filter', 'stats'] as const).map((mode) => {
                    const labels = { random: 'Aleatório', filter: 'Filtros', stats: 'Histórico' };
                    return (
                      <button
                        key={mode}
                        onClick={() => setQuestionMode(mode)}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                          questionMode === mode
                            ? darkMode ? 'bg-stone-700 text-white shadow-sm' : 'bg-white text-stone-800 shadow-sm'
                            : darkMode ? 'text-stone-500 hover:text-stone-300' : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        {labels[mode]}
                      </button>
                    );
                  })}
                </div>

                {/* Random mode */}
                {questionMode === 'random' && (
                  <div className="space-y-4">
                    <p className={`text-sm ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                      Selecione uma matéria e pratique com questões do nosso banco de dados.
                    </p>
                    <div className="relative">
                      <select
                        value={selectedSubjectForQuestion}
                        onChange={(e) => setSelectedSubjectForQuestion(e.target.value)}
                        className={`w-full pl-4 pr-10 py-3.5 rounded-xl appearance-none outline-none font-medium text-sm transition-colors ${darkMode ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}
                      >
                        <option value="geral">Todas as Matérias</option>
                        {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    </div>
                    <button
                      onClick={generateBankQuestion}
                      disabled={isGenerating}
                      className="w-full py-4 rounded-xl font-black text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Brain className="w-5 h-5" /> BUSCAR QUESTÃO</>}
                    </button>
                  </div>
                )}

                {/* Filter mode */}
                {questionMode === 'filter' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <select
                          value={filterInstitution}
                          onChange={(e) => setFilterInstitution(e.target.value)}
                          className={`w-full pl-3 pr-8 py-3 rounded-xl appearance-none outline-none text-sm font-medium ${darkMode ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}
                        >
                          <option value="">Instituição</option>
                          <option value="ENEM">ENEM</option>
                          <option value="FUVEST">FUVEST</option>
                          <option value="UNICAMP">UNICAMP</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-stone-400 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <select
                          value={filterDiscipline}
                          onChange={(e) => setFilterDiscipline(e.target.value)}
                          className={`w-full pl-3 pr-8 py-3 rounded-xl appearance-none outline-none text-sm font-medium ${darkMode ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}
                        >
                          <option value="">Disciplina</option>
                          {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-stone-400 pointer-events-none" />
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Assunto ou palavra-chave..."
                      value={filterTopic}
                      onChange={(e) => setFilterTopic(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                      className={`w-full px-4 py-3 rounded-xl outline-none text-sm font-medium ${darkMode ? 'bg-stone-800 text-stone-200 placeholder-stone-600' : 'bg-stone-100 text-stone-700 placeholder-stone-400'}`}
                    />
                    <button
                      onClick={handleSearch}
                      disabled={isGenerating}
                      className="w-full py-4 rounded-xl font-black text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-70"
                    >
                      {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5" /> FILTRAR QUESTÕES</>}
                    </button>
                  </div>
                )}

                {/* Stats mode */}
                {questionMode === 'stats' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Feitas', value: profile.totalAnswered, color: 'text-indigo-500' },
                        { label: 'Acertos', value: profile.totalCorrect, color: 'text-emerald-500' },
                        { label: 'Erros', value: profile.totalAnswered - profile.totalCorrect, color: 'text-red-500' },
                      ].map((s) => (
                        <div key={s.label} className={`p-3 rounded-xl text-center ${darkMode ? 'bg-stone-800' : 'bg-stone-50'}`}>
                          <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                          <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                    {savedQuestions.filter((q) => q.attempts.length > 0).length === 0 ? (
                      <p className={`text-sm text-center py-6 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                        Nenhuma questão respondida ainda. Comece a praticar!
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {savedQuestions.filter((q) => q.attempts.length > 0).map((q) => {
                          const last = q.attempts[q.attempts.length - 1];
                          return (
                            <div key={q.id} className={`flex items-center gap-3 p-3 rounded-xl border ${darkMode ? 'bg-stone-800 border-stone-700' : 'bg-stone-50 border-stone-200'}`}>
                              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${last.isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`} />
                              <span className={`flex-1 text-xs font-medium truncate ${darkMode ? 'text-stone-300' : 'text-stone-600'}`}>{q.text.substring(0, 45)}...</span>
                              <button onClick={() => { redoQuestion(q.id); setCurrentTab('questions'); }} className="text-[10px] font-bold text-indigo-500 hover:text-indigo-400 shrink-0 flex items-center gap-1">
                                <RotateCcw className="w-3 h-3" /> Refazer
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Loading */}
              {loadingQuestion && (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                  <p className={`text-sm font-medium ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>Buscando questão...</p>
                </div>
              )}

              {/* Active question */}
              {activeQuestionId && (() => {
                const q = searchResults.find((sq) => sq.id === activeQuestionId) || savedQuestions.find((sq) => sq.id === activeQuestionId);
                if (!q) return null;
                const savedQ = savedQuestions.find((sq) => sq.id === activeQuestionId);
                const lastAttempt = savedQ?.attempts[savedQ.attempts.length - 1];
                const isAnswered = !!lastAttempt && selectedOption !== null;
                const isCorrectAnswer = selectedOption === q.correctAnswer;

                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-5 rounded-2xl border shadow-sm space-y-5 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] uppercase tracking-widest font-black ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>
                          Questão Atual
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          {q.institution || 'ENEM'} {q.year || '2023'}
                        </span>
                        {q.topic && (
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight ${darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                            {q.topic}
                          </span>
                        )}
                      </div>
                      {questionMode === 'filter' && (
                        <button onClick={() => setActiveQuestionId(null)} className={`text-xs font-bold ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                          ← Voltar
                        </button>
                      )}
                    </div>

                    <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-stone-200' : 'text-stone-700'}`}>{q.text}</p>

                    <div className="space-y-2.5">
                      {q.options.map((option, idx) => {
                        const isCorrect = idx === q.correctAnswer;
                        const isSelected = idx === selectedOption;
                        let cls = darkMode ? 'bg-stone-800 border-stone-700 hover:border-stone-500 text-stone-200' : 'bg-stone-50 border-stone-200 hover:border-stone-300 text-stone-700';
                        if (selectedOption !== null) {
                          if (isCorrect) cls = 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400';
                          else if (isSelected) cls = 'bg-red-500/10 border-red-500 text-red-600 dark:text-red-400';
                          else cls = darkMode ? 'bg-stone-800 border-stone-700 text-stone-500 opacity-60' : 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                        }
                        return (
                          <button
                            key={idx}
                            disabled={selectedOption !== null}
                            onClick={() => handleAnswer(idx)}
                            className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 ${cls}`}
                          >
                            <span className="leading-snug">{option}</span>
                            {selectedOption !== null && (isCorrect ? <Check className="w-4 h-4 shrink-0" /> : isSelected ? <X className="w-4 h-4 shrink-0" /> : null)}
                          </button>
                        );
                      })}
                    </div>

                    {selectedOption !== null && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className={`flex items-center justify-between p-3 rounded-xl ${isCorrectAnswer ? (darkMode ? 'bg-emerald-950/30 border border-emerald-900' : 'bg-emerald-50 border border-emerald-200') : (darkMode ? 'bg-red-950/30 border border-red-900' : 'bg-red-50 border border-red-200')}`}>
                          <div className="flex items-center gap-2">
                            {isCorrectAnswer ? <Check className="w-5 h-5 text-emerald-500" /> : <X className="w-5 h-5 text-red-500" />}
                            <span className={`font-black text-sm ${isCorrectAnswer ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                              {isCorrectAnswer ? 'Resposta Correta!' : 'Resposta Incorreta'}
                            </span>
                          </div>
                          <span className={`text-xs font-bold ${isCorrectAnswer ? 'text-emerald-500' : 'text-red-500'}`}>
                            {isCorrectAnswer ? `+${profile.consecutiveCorrect >= 5 ? 30 : profile.consecutiveCorrect >= 3 ? 20 : 10} XP` : '+2 XP'}
                          </span>
                        </div>

                        <button
                          onClick={() => setShowExplanation(!showExplanation)}
                          className={`w-full py-3 rounded-xl text-sm font-bold border transition-colors flex items-center justify-center gap-2 ${darkMode ? 'border-stone-700 text-stone-300 hover:bg-stone-800' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                        >
                          <BookOpen className="w-4 h-4" />
                          {showExplanation ? 'Ocultar Explicação' : 'Ver Explicação'}
                        </button>

                        <AnimatePresence>
                          {showExplanation && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className={`p-4 rounded-xl text-sm leading-relaxed overflow-hidden ${darkMode ? 'bg-stone-800 text-stone-300' : 'bg-indigo-50 text-indigo-800'}`}
                            >
                              {q.explanation}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {questionMode === 'random' && (
                          <button
                            onClick={generateBankQuestion}
                            className="w-full py-4 rounded-xl font-black text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
                          >
                            PRÓXIMA QUESTÃO <ChevronRight className="w-5 h-5" />
                          </button>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })()}

              {/* Search results */}
              {questionMode === 'filter' && hasSearched && !activeQuestionId && (
                <div className="space-y-3">
                  {searchResults.length === 0 ? (
                    <div className={`p-12 rounded-2xl border border-dashed text-center ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-300'}`}>
                      <Search className={`w-10 h-10 mx-auto mb-3 ${darkMode ? 'text-stone-700' : 'text-stone-200'}`} />
                      <h3 className={`font-bold text-base mb-1 ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>Nenhuma questão encontrada</h3>
                      <p className={`text-sm ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>Tente ajustar os filtros.</p>
                    </div>
                  ) : (
                    <>
                      <p className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>{searchResults.length} resultado(s)</p>
                      {searchResults.map((q) => {
                        const savedQ = savedQuestions.find((sq) => sq.id === q.id);
                        const last = savedQ?.attempts[savedQ.attempts.length - 1];
                        return (
                          <div key={q.id} className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${darkMode ? 'bg-stone-800 text-stone-400' : 'bg-stone-100 text-stone-500'}`}>
                                  {q.institution || 'ENEM'} {q.year}
                                </span>
                                {last && (
                                  <span className={`text-[9px] font-black uppercase ${last.isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {last.isCorrect ? '✓ Acertou' : '✗ Errou'}
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm font-medium truncate ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>{q.text}</p>
                            </div>
                            <button
                              onClick={() => openQuestion(q)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 ${darkMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                            >
                              {last ? 'Refazer' : 'Responder'}
                            </button>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* ══ POMODORO TAB ══ */}
          {currentTab === 'pomodoro' && (
            <motion.div key="pomodoro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-5">
              <div className={`p-6 rounded-3xl border text-center ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${pomodoroActive ? 'bg-emerald-500 animate-pulse' : darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
                  <h2 className={`font-black text-lg ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                    {pomodoroMode === 'work' ? 'Tempo de Foco' : 'Pausa Curta'}
                  </h2>
                </div>
                <p className={`text-xs mb-6 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                  {pomodoroSessions} sessão(ões) concluída(s) hoje
                </p>

                <div className="relative w-52 h-52 mx-auto mb-8 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 208 208">
                    <circle cx="104" cy="104" r="96" className={`stroke-current ${darkMode ? 'text-stone-800' : 'text-stone-100'}`} strokeWidth="10" fill="none" />
                    <circle
                      cx="104" cy="104" r="96"
                      className={`stroke-current transition-all duration-1000 ease-linear ${pomodoroMode === 'work' ? 'text-indigo-500' : 'text-emerald-500'}`}
                      strokeWidth="10" fill="none"
                      strokeDasharray={2 * Math.PI * 96}
                      strokeDashoffset={2 * Math.PI * 96 * (1 - pomodoroTime / (pomodoroMode === 'work' ? 25 * 60 : 5 * 60))}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className={`text-5xl font-black font-mono tracking-tighter relative z-10 ${darkMode ? 'text-white' : 'text-stone-800'}`}>
                    {isEditingTime ? (
                      <input
                        type="number"
                        value={customTimeInput}
                        onChange={(e) => setCustomTimeInput(e.target.value)}
                        onBlur={() => {
                          setIsEditingTime(false);
                          const t = parseInt(customTimeInput);
                          if (!isNaN(t) && t > 0) setPomodoroTime(t * 60);
                          else setCustomTimeInput(Math.floor(pomodoroTime / 60).toString());
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setIsEditingTime(false);
                            const t = parseInt(customTimeInput);
                            if (!isNaN(t) && t > 0) setPomodoroTime(t * 60);
                          }
                        }}
                        className={`w-24 text-center bg-transparent border-b-2 outline-none ${darkMode ? 'border-stone-600 text-white' : 'border-stone-300 text-stone-800'}`}
                        autoFocus
                      />
                    ) : (
                      <span
                        onClick={() => { if (!pomodoroActive) { setIsEditingTime(true); setCustomTimeInput(Math.floor(pomodoroTime / 60).toString()); } }}
                        className={!pomodoroActive ? 'cursor-pointer hover:opacity-70 transition-opacity' : ''}
                        title={!pomodoroActive ? 'Clique para editar' : ''}
                      >
                        {Math.floor(pomodoroTime / 60).toString().padStart(2, '0')}:{(pomodoroTime % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>
                </div>

                {!pomodoroActive && !isEditingTime && (
                  <p className={`text-xs mb-5 ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>Clique no tempo para editar (em minutos)</p>
                )}

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => { setPomodoroActive(false); setPomodoroTime(pomodoroMode === 'work' ? 25 * 60 : 5 * 60); }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${darkMode ? 'border-stone-700 text-stone-400 hover:bg-stone-800' : 'border-stone-200 text-stone-500 hover:bg-stone-50'}`}
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setPomodoroActive(!pomodoroActive)}
                    className={`w-18 h-18 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all active:scale-95 ${pomodoroMode === 'work' ? (pomodoroActive ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600') : (pomodoroActive ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-500 hover:bg-emerald-600')}`}
                  >
                    {pomodoroActive ? <X className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </button>
                  <button
                    onClick={() => { setPomodoroMode(pomodoroMode === 'work' ? 'break' : 'work'); setPomodoroActive(false); setPomodoroTime(pomodoroMode === 'work' ? 5 * 60 : 25 * 60); }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${darkMode ? 'border-stone-700 text-stone-400 hover:bg-stone-800' : 'border-stone-200 text-stone-500 hover:bg-stone-50'}`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Pomodoro tips */}
              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <h3 className={`font-bold text-sm mb-3 flex items-center gap-2 ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                  <Zap className="w-4 h-4 text-yellow-500" /> Dicas de Foco
                </h3>
                <ul className={`text-xs space-y-2 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                  <li>• Trabalhe por 25 minutos sem interrupções.</li>
                  <li>• Após 4 sessões, faça uma pausa longa de 15-30 min.</li>
                  <li>• Desligue notificações durante o foco.</li>
                  <li>• Anote distrações para resolver depois.</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* ══ TASKS TAB ══ */}
          {currentTab === 'tasks' && (
            <motion.div key="tasks" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-4">
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className={`font-black text-lg flex items-center gap-2 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                    <CheckSquare className="w-5 h-5 text-indigo-500" /> Tarefas de Hoje
                  </h3>
                  {tasks.length > 0 && (
                    <span className={`text-xs font-bold ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                      {tasks.filter((t) => t.completed).length}/{tasks.length}
                    </span>
                  )}
                </div>

                {tasks.length > 0 && (
                  <div className={`h-1.5 rounded-full overflow-hidden mb-5 ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                    <motion.div
                      animate={{ width: `${tasks.length > 0 ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100) : 0}%` }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                    />
                  </div>
                )}

                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTaskText.trim()) {
                        setTasks([...tasks, { id: Date.now().toString(), text: newTaskText.trim(), completed: false }]);
                        setNewTaskText('');
                      }
                    }}
                    placeholder="Adicionar nova tarefa..."
                    className={`flex-1 px-4 py-3 rounded-xl text-sm border outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors ${darkMode ? 'bg-stone-800 border-stone-700 text-white placeholder-stone-600' : 'bg-stone-50 border-stone-200 text-stone-800 placeholder-stone-400'}`}
                  />
                  <button
                    onClick={() => {
                      if (newTaskText.trim()) {
                        setTasks([...tasks, { id: Date.now().toString(), text: newTaskText.trim(), completed: false }]);
                        setNewTaskText('');
                      }
                    }}
                    className="px-4 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {tasks.length === 0 ? (
                    <div className="py-10 text-center">
                      <CheckSquare className={`w-10 h-10 mx-auto mb-3 ${darkMode ? 'text-stone-700' : 'text-stone-200'}`} />
                      <p className={`text-sm font-medium ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>Nenhuma tarefa. Adicione uma acima!</p>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          layout
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-colors ${darkMode ? `border-stone-800 ${task.completed ? 'bg-stone-900/50' : 'bg-stone-800/50'}` : `border-stone-100 ${task.completed ? 'bg-stone-50' : 'bg-white'}`}`}
                        >
                          <button
                            onClick={() => setTasks(tasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)))}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : darkMode ? 'border-stone-600 hover:border-emerald-500' : 'border-stone-300 hover:border-emerald-500'}`}
                          >
                            {task.completed && <Check className="w-3.5 h-3.5" />}
                          </button>
                          <span className={`flex-1 text-sm font-medium transition-all ${task.completed ? `line-through ${darkMode ? 'text-stone-600' : 'text-stone-400'}` : darkMode ? 'text-stone-200' : 'text-stone-700'}`}>
                            {task.text}
                          </span>
                          <button
                            onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
                            className={`p-1.5 rounded-lg transition-colors shrink-0 ${darkMode ? 'text-stone-600 hover:text-red-400 hover:bg-stone-800' : 'text-stone-300 hover:text-red-500 hover:bg-red-50'}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {tasks.filter((t) => t.completed).length > 0 && (
                  <button
                    onClick={() => showConfirm('Limpar Concluídas', 'Remover todas as tarefas concluídas?', () => setTasks(tasks.filter((t) => !t.completed)))}
                    className={`mt-4 w-full py-2.5 rounded-xl text-xs font-bold border transition-colors ${darkMode ? 'border-stone-700 text-stone-500 hover:bg-stone-800' : 'border-stone-200 text-stone-400 hover:bg-stone-50'}`}
                  >
                    Limpar concluídas
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Bottom Navigation ── */}
      <nav
        className={`fixed bottom-0 left-0 right-0 border-t flex justify-around items-center z-20 transition-colors ${darkMode ? 'bg-stone-900/95 border-stone-800 backdrop-blur-md' : 'bg-white/95 border-stone-200 backdrop-blur-md'}`}
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))', paddingTop: '0.75rem', paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))' }}
      >
        {([
          { tab: 'home', icon: LayoutDashboard, label: 'Início' },
          { tab: 'questions', icon: BrainCircuit, label: 'Questões' },
          { tab: 'achievements', icon: Trophy, label: 'Conquistas' },
          { tab: 'pomodoro', icon: Target, label: 'Foco' },
          { tab: 'tasks', icon: List, label: 'Tarefas' },
        ] as const).map(({ tab, icon: Icon, label }) => {
          const active = currentTab === tab;
          return (
            <button
              key={tab}
              onClick={() => { setCurrentTab(tab); if (tab === 'home') setSelectedSubjectId(null); window.location.hash = tab === 'home' ? '' : tab; }}
              className={`flex flex-col items-center gap-1 transition-all relative ${active ? 'text-indigo-600' : darkMode ? 'text-stone-500 hover:text-stone-300' : 'text-stone-400 hover:text-stone-600'}`}
            >
              {active && (
                <motion.div layoutId="nav-indicator" className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-indigo-600" />
              )}
              <Icon className={`w-6 h-6 transition-transform ${active ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-black uppercase tracking-wider">{label}</span>
              {tab === 'achievements' && unlockedCount < totalAchievements && (
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
