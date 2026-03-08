import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Trophy, 
  Target, 
  List, 
  Plus, 
  Check, 
  X, 
  ChevronRight, 
  Clock, 
  Flame, 
  Star, 
  BookOpen, 
  Search, 
  Settings, 
  Moon, 
  Sun, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Lightbulb, 
  Loader2, 
  ChevronDown, 
  Trash2, 
  Share2, 
  Bookmark,
  Calendar,
  BarChart3,
  Award,
  Zap,
  Calculator,
  Globe,
  FlaskConical,
  PenTool,
  User,
  Camera,
  BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Preferences } from '@capacitor/preferences';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

// --- DATA ---
import { ENEM_DATA } from './data/enemData';

// --- TYPES ---
interface Topic {
  id: string;
  title: string;
  completed: boolean;
  questions?: any[];
}

interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: Topic[];
}

interface Attempt {
  date: string;
  selectedOption: number;
  isCorrect: boolean;
}

interface SavedQuestion {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
  institution?: string;
  discipline?: string;
  year?: string;
  attempts: Attempt[];
}

interface UserProfile {
  name: string;
  photo: string | null;
  level: number;
  xp: number;
  nextLevelXp: number;
  streak: number;
  bestStreak: number;
  lastLogin: string | null;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  goal: number;
}

// --- ICON MAPPER ---
const IconComponent = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, any> = {
    Calculator,
    BookOpen,
    Globe,
    FlaskConical,
    PenTool,
    Zap,
    BrainCircuit,
    Target
  };
  const Icon = icons[name] || BookOpen;
  return <Icon className={className} />;
};

// --- SUB-COMPONENTS ---

const StreakWidget = React.memo(({ streak, bestStreak, darkMode }: { streak: number, bestStreak: number, darkMode: boolean }) => {
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const today = new Date().getDay();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={`p-5 rounded-3xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="font-black text-sm uppercase tracking-widest">Sequência</h3>
        </div>
        <div className="text-xs font-black text-orange-500">Recorde: {bestStreak}</div>
      </div>
      <div className="flex items-end gap-3 mb-4">
        <span className="text-5xl font-black text-orange-500 leading-none">{streak}</span>
        <span className="text-xs font-bold text-stone-500 mb-1 uppercase tracking-widest">Dias Seguidos</span>
      </div>
      <div className="flex justify-between gap-1">
        {days.map((day, idx) => {
          const isToday = idx === today;
          const isActive = isToday || (streak > 0 && idx < today && idx >= today - streak);
          return (
            <div key={idx} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-full aspect-square rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${
                isToday ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 
                isActive ? 'bg-orange-500/20 text-orange-500' : 
                darkMode ? 'bg-stone-800 text-stone-600' : 'bg-stone-100 text-stone-400'
              }`}>
                {isActive ? '🔥' : day}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});

const StatsWidget = React.memo(({ savedQuestions, darkMode }: { savedQuestions: SavedQuestion[], darkMode: boolean }) => {
  const stats = useMemo(() => {
    const total = savedQuestions.filter(q => q.attempts.length > 0).length;
    const correct = savedQuestions.filter(q => q.attempts[q.attempts.length - 1]?.isCorrect).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { total, correct, accuracy };
  }, [savedQuestions]);

  const chartData = [
    { name: 'Acertos', value: stats.correct, color: '#10b981' },
    { name: 'Erros', value: stats.total - stats.correct, color: '#ef4444' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={`p-5 rounded-3xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-5 h-5 text-indigo-500" />
        <h3 className="font-black text-sm uppercase tracking-widest">Desempenho</h3>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-24 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} innerRadius={30} outerRadius={45} paddingAngle={5} dataKey="value">
                {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2">
          <div className="text-center p-2 rounded-2xl bg-stone-100 dark:bg-stone-800">
            <div className="text-lg font-black">{stats.total}</div>
            <div className="text-[8px] font-bold uppercase text-stone-500">Feitas</div>
          </div>
          <div className="text-center p-2 rounded-2xl bg-indigo-500/10">
            <div className="text-lg font-black text-indigo-500">{stats.accuracy}%</div>
            <div className="text-[8px] font-bold uppercase text-indigo-500">Taxa</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const AchievementCard = React.memo(({ achievement, darkMode }: { achievement: Achievement, darkMode: boolean }) => (
  <div className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
    achievement.unlocked 
      ? darkMode ? 'bg-stone-800/50 border-stone-700' : 'bg-white border-stone-200 shadow-sm'
      : 'opacity-50 grayscale bg-stone-100 dark:bg-stone-900 border-transparent'
  }`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
      achievement.unlocked ? 'bg-yellow-500/20 text-yellow-500' : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
    }`}>
      {achievement.icon}
    </div>
    <div className="flex-1">
      <h4 className={`text-sm font-bold ${darkMode ? 'text-stone-200' : 'text-stone-800'}`}>{achievement.title}</h4>
      <p className={`text-[10px] ${darkMode ? 'text-stone-500' : 'text-stone-500'}`}>{achievement.description}</p>
      <div className="mt-2 h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-yellow-500 transition-all duration-500" 
          style={{ width: `${Math.min(100, (achievement.progress / achievement.goal) * 100)}%` }}
        />
      </div>
    </div>
  </div>
));

// --- MAIN APP COMPONENT ---

export default function App() {
  // State: Theme & UI
  const [darkMode, setDarkMode] = useState(true);
  const [currentTab, setCurrentTab] = useState('home');
  const [isInitialized, setIsInitialized] = useState(false);

  // State: Profile & Progress
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Estudante',
    photo: null,
    level: 1,
    xp: 0,
    nextLevelXp: 1000,
    streak: 0,
    bestStreak: 0,
    lastLogin: null,
    weeklyGoal: 500,
    weeklyProgress: 0
  });

  // State: Subjects & Topics
  const [subjects, setSubjects] = useState<Subject[]>(ENEM_DATA);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');

  // State: Questions
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([]);
  const [questionMode, setQuestionMode] = useState<'random' | 'filter' | 'history'>('random');
  const [selectedSubjectForQuestion, setSelectedSubjectForQuestion] = useState('geral');
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [filterInstitution, setFilterInstitution] = useState('');
  const [filterDiscipline, setFilterDiscipline] = useState('');

  // State: Pomodoro
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroInitialTime, setPomodoroInitialTime] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work');

  // State: Tasks
  const [tasks, setTasks] = useState<{id: string, text: string, completed: boolean}[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // --- AUDIO HELPERS ---
  const playSound = (url: string) => {
    try {
      const audio = new Audio(url);
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const showToast = (title: string, message: string, icon: string = '🏆', color: string = 'bg-indigo-600') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-10 left-6 right-6 p-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 text-white transition-all duration-500 transform translate-y-0 ${color}`;
    toast.innerHTML = `<div class="text-2xl">${icon}</div><div><div class="font-black">${title}</div><div class="text-xs opacity-90">${message}</div></div>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  // --- PERSISTENCE ---

  useEffect(() => {
    async function loadData() {
      try {
        const { value: storedData } = await Preferences.get({ key: 'organistuda_data_v381' });
        if (storedData) {
          const parsed = JSON.parse(storedData);
          if (parsed.profile) {
            const today = new Date().toISOString().split('T')[0];
            const last = parsed.profile.lastLogin;
            
            if (last !== today) {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              const yesterdayStr = yesterday.toISOString().split('T')[0];
              
              if (last === yesterdayStr) {
                parsed.profile.streak += 1;
                if (parsed.profile.streak > parsed.profile.bestStreak) {
                  parsed.profile.bestStreak = parsed.profile.streak;
                }
                showToast('Ofensiva Mantida!', `Você está há ${parsed.profile.streak} dias estudando! 🔥`, '🔥', 'bg-orange-500');
              } else if (last !== null) {
                parsed.profile.streak = 1;
              }
              parsed.profile.lastLogin = today;
            }
            setProfile(parsed.profile);
          }
          if (parsed.subjects) setSubjects(parsed.subjects);
          if (parsed.savedQuestions) setSavedQuestions(parsed.savedQuestions);
          if (parsed.tasks) setTasks(parsed.tasks);
          if (parsed.darkMode !== undefined) setDarkMode(parsed.darkMode);
        }
      } catch (e) {
        console.error('Error loading data:', e);
      } finally {
        setIsInitialized(true);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    async function saveData() {
      const data = { profile, subjects, savedQuestions, tasks, darkMode };
      await Preferences.set({ key: 'organistuda_data_v381', value: JSON.stringify(data) });
    }
    saveData();
  }, [profile, subjects, savedQuestions, tasks, darkMode, isInitialized]);

  // --- ACTIONS ---

  const addXP = useCallback((amount: number) => {
    setProfile(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newNextLevelXp = prev.nextLevelXp;

      if (newXp >= newNextLevelXp) {
        newXp -= newNextLevelXp;
        newLevel += 1;
        newNextLevelXp = Math.floor(newNextLevelXp * 1.2);
        playSound('https://actions.google.com/sounds/v1/notifications/achievement_sound.ogg');
        showToast('Nível Subiu!', `Parabéns! Você agora é Nível ${newLevel} 🚀`, '🎊', 'bg-indigo-600');
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        nextLevelXp: newNextLevelXp,
        weeklyProgress: prev.weeklyProgress + amount
      };
    });
  }, []);

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

  const handleAnswerQuestion = useCallback((id: string) => {
    if (selectedOption === null) return;
    const q = savedQuestions.find(sq => sq.id === id);
    if (!q) return;

    const isCorrect = selectedOption === q.correctOption;
    if (isCorrect) {
      addXP(50);
      playSound('https://actions.google.com/sounds/v1/cartoon/pop.ogg');
    }

    setSavedQuestions(prev => prev.map(sq => {
      if (sq.id === id) {
        return {
          ...sq,
          attempts: [...sq.attempts, {
            date: new Date().toISOString(),
            selectedOption,
            isCorrect
          }]
        };
      }
      return sq;
    }));
  }, [selectedOption, savedQuestions, addXP]);

  const generateBankQuestion = useCallback(() => {
    setLoadingQuestion(true);
    setTimeout(() => {
      const newQ: SavedQuestion = {
        id: Math.random().toString(36).substr(2, 9),
        text: "Qual a principal característica do Humanismo no Brasil?",
        options: ["Foco no teocentrismo", "Valorização do homem e da razão", "Busca pelo escapismo", "Culto à natureza"],
        correctOption: 1,
        explanation: "O Humanismo marca a transição da Idade Média para o Renascimento, colocando o homem no centro (antropocentrismo).",
        institution: "ENEM",
        discipline: "Linguagens",
        attempts: []
      };
      setSavedQuestions(prev => [newQ, ...prev]);
      setActiveQuestionId(newQ.id);
      setSelectedOption(null);
      setShowExplanation(false);
      setLoadingQuestion(false);
    }, 800);
  }, []);

  const toggleTopic = useCallback((subjectId: string, topicId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          topics: s.topics.map(t => {
            if (t.id === topicId) {
              const newState = !t.completed;
              if (newState) addXP(100);
              return { ...t, completed: newState };
            }
            return t;
          })
        };
      }
      return s;
    }));
  }, [addXP]);

  const addTopic = useCallback((subjectId: string) => {
    if (!newTopicTitle.trim()) return;
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          topics: [...s.topics, { id: Date.now().toString(), title: newTopicTitle, completed: false }]
        };
      }
      return s;
    }));
    setNewTopicTitle('');
  }, [newTopicTitle]);

  const deleteTopic = useCallback((subjectId: string, topicId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        return { ...s, topics: s.topics.filter(t => t.id !== topicId) };
      }
      return s;
    }));
  }, []);

  const handleAddTask = useCallback(() => {
    if (!newTaskText.trim()) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), text: newTaskText, completed: false }]);
    setNewTaskText('');
  }, [newTaskText]);

  const handleToggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        if (!t.completed) addXP(25);
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  }, [addXP]);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  // --- POMODORO TIMER ---

  useEffect(() => {
    let interval: any;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => setPomodoroTime(prev => prev - 1), 1000);
    } else if (pomodoroTime === 0) {
      setPomodoroActive(false);
      if (pomodoroMode === 'work') {
        const earnedXP = Math.round((pomodoroInitialTime / 1500) * 100);
        addXP(earnedXP);
        showToast('Foco Concluído!', `Sessão finalizada! +${earnedXP} XP ⏰`, '⏰', 'bg-emerald-500');
        setPomodoroMode('break');
        setPomodoroTime(5 * 60);
        setPomodoroInitialTime(5 * 60);
      } else {
        setPomodoroMode('work');
        setPomodoroTime(25 * 60);
        setPomodoroInitialTime(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime, pomodoroMode, addXP, pomodoroInitialTime]);

  // --- RENDER HELPERS ---

  const selectedSubject = useMemo(() => 
    subjects.find(s => s.id === selectedSubjectId), 
  [subjects, selectedSubjectId]);

  const achievements = useMemo(() => [
    { id: '1', title: 'Primeiros Passos', description: 'Complete seu primeiro tópico de estudo.', icon: <Zap />, unlocked: subjects.some(s => s.topics.some(t => t.completed)), progress: subjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0), goal: 1 },
    { id: '2', title: 'Mestre das Questões', description: 'Resolva 10 questões corretamente.', icon: <BrainCircuit />, unlocked: savedQuestions.filter(q => q.attempts[q.attempts.length - 1]?.isCorrect).length >= 10, progress: savedQuestions.filter(q => q.attempts[q.attempts.length - 1]?.isCorrect).length, goal: 10 },
    { id: '3', title: 'Foco de Aço', description: 'Complete 5 sessões de Pomodoro.', icon: <Target />, unlocked: false, progress: 0, goal: 5 },
  ], [subjects, savedQuestions]);

  if (!isInitialized) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center ${darkMode ? 'bg-stone-950' : 'bg-stone-50'}`}>
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      
      {/* ── HEADER & PROFILE ─────────────────────────────────────────── */}
      <header className="flex-shrink-0 p-6 safe-top">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Flame className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-black tracking-tighter leading-none">OrganiStuda</h1>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-2xl transition-all active:scale-90 ${darkMode ? 'bg-stone-900 text-yellow-400' : 'bg-white text-stone-400 shadow-sm border border-stone-100'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <label htmlFor="photo-upload" className={`w-16 h-16 rounded-full border-2 overflow-hidden flex items-center justify-center cursor-pointer transition-all ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}>
                {profile.photo ? (
                  <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className={`w-8 h-8 ${darkMode ? 'text-stone-700' : 'text-stone-300'}`} />
                )}
              </label>
              <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full border-2 border-stone-950">
                <Camera className="w-3 h-3" />
              </div>
            </div>
            <div>
              <input 
                type="text" value={profile.name} onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="text-xl font-black bg-transparent outline-none w-32 tracking-tight"
              />
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Nível {profile.level}</span>
                <div className="w-20 h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${(profile.xp / profile.nextLevelXp) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-orange-500 flex items-center gap-1 justify-end">
              🔥 {profile.streak}
            </div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-stone-500">Ofensiva</div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 scroll-smooth">
        <AnimatePresence mode="wait">
          {currentTab === 'home' ? (
            <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              {!selectedSubjectId ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StreakWidget streak={profile.streak} bestStreak={profile.bestStreak} darkMode={darkMode} />
                    <StatsWidget savedQuestions={savedQuestions} darkMode={darkMode} />
                  </div>
                  
                  <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-black text-sm uppercase tracking-widest text-stone-500">Progresso Semanal</h3>
                      <span className="text-xs font-bold text-indigo-500">{profile.weeklyProgress} / {profile.weeklyGoal} XP</span>
                    </div>
                    <div className="h-3 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000" style={{ width: `${Math.min(100, (profile.weeklyProgress / profile.weeklyGoal) * 100)}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {subjects.map((subject) => {
                      const completed = subject.topics.filter(t => t.completed).length;
                      const total = subject.topics.length;
                      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

                      return (
                        <button 
                          key={subject.id} onClick={() => setSelectedSubjectId(subject.id)}
                          className={`p-6 rounded-[32px] border text-left transition-all active:scale-[0.98] flex items-center gap-5 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}
                        >
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner`} style={{ backgroundColor: `${subject.color.replace('bg-', '')}20`, color: subject.color.includes('bg-') ? '' : subject.color }}>
                            <IconComponent name={subject.icon} className={`w-8 h-8 ${subject.color.replace('bg-', 'text-')}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-black text-lg">{subject.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                                <div className={`h-full transition-all duration-500 ${subject.color}`} style={{ width: `${percent}%` }} />
                              </div>
                              <span className="text-[10px] font-bold text-stone-500">{percent}%</span>
                            </div>
                          </div>
                          <ChevronRight className="text-stone-300 w-5 h-5" />
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <button onClick={() => setSelectedSubjectId(null)} className="flex items-center gap-2 text-stone-500 font-bold text-sm">
                    <X className="w-4 h-4" /> Voltar para matérias
                  </button>
                  <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl bg-indigo-500/10 text-indigo-500">
                        <IconComponent name={selectedSubject?.icon || ''} className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-black">{selectedSubject?.name}</h2>
                    </div>
                    <div className="space-y-3">
                      {selectedSubject?.topics.map(topic => (
                        <div key={topic.id} className={`flex items-center gap-3 p-4 rounded-2xl border ${topic.completed ? 'bg-emerald-500/10 border-emerald-500/20' : darkMode ? 'bg-stone-800 border-stone-700' : 'bg-stone-50 border-stone-100'}`}>
                          <button onClick={() => toggleTopic(selectedSubject.id, topic.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${topic.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-stone-300'}`}>
                            {topic.completed && <Check className="w-4 h-4" />}
                          </button>
                          <span className={`flex-1 font-bold text-sm ${topic.completed ? 'line-through text-stone-500' : ''}`}>{topic.title}</span>
                          <button onClick={() => deleteTopic(selectedSubject.id, topic.id)} className="text-stone-400"><X className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-2">
                      <input 
                        value={newTopicTitle} onChange={(e) => setNewTopicTitle(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addTopic(selectedSubject!.id)}
                        placeholder="Novo tópico..." className={`flex-1 p-4 rounded-2xl border outline-none text-sm ${darkMode ? 'bg-stone-800 border-stone-700' : 'bg-stone-50 border-stone-200'}`}
                      />
                      <button onClick={() => addTopic(selectedSubject!.id)} className="bg-indigo-600 text-white p-4 rounded-2xl flex-shrink-0 shadow-lg shadow-indigo-500/30 active:scale-90 transition-all"><Plus className="w-6 h-6" /></button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : currentTab === 'achievements' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}>
                  <div className="text-3xl font-black text-blue-500 mb-1">{savedQuestions.filter(q => q.attempts[q.attempts.length - 1]?.isCorrect).length}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Acertos Totais</div>
                </div>
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}>
                  <div className="text-3xl font-black text-purple-500 mb-1">{profile.bestStreak}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Maior Streak</div>
                </div>
              </div>
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}>
                <h3 className="font-black text-lg mb-6 flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500" /> Suas Conquistas</h3>
                <div className="space-y-4">
                  {achievements.map((a: Achievement) => (
                    <AchievementCard key={a.id} achievement={a} darkMode={darkMode} />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : currentTab === 'questions' ? (
            <div className="space-y-6 pb-20">
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}>
                <div className="flex p-1 bg-stone-100 dark:bg-stone-800 rounded-2xl mb-6">
                  {['random', 'filter', 'history'].map(mode => (
                    <button key={mode} onClick={() => setQuestionMode(mode as any)} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${questionMode === mode ? 'bg-white dark:bg-stone-700 shadow-sm text-indigo-600' : 'text-stone-500'}`}>
                      {mode === 'random' ? 'Aleatória' : mode === 'filter' ? 'Filtrar' : 'Histórico'}
                    </button>
                  ))}
                </div>
                {questionMode === 'random' && (
                  <div className="space-y-4">
                    <select value={selectedSubjectForQuestion} onChange={(e) => setSelectedSubjectForQuestion(e.target.value)} className={`w-full p-4 rounded-xl outline-none font-bold ${darkMode ? 'bg-stone-800 border-stone-700' : 'bg-stone-50 border-stone-200'} border`}>
                      <option value="geral">Todas as Matérias</option>
                      {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    <button onClick={generateBankQuestion} disabled={loadingQuestion} className="w-full py-4 rounded-xl bg-indigo-600 text-white font-black shadow-lg active:scale-95 transition-all">
                      {loadingQuestion ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'GERAR QUESTÃO'}
                    </button>
                  </div>
                )}
                {questionMode === 'history' && (
                  <div className="space-y-3">
                    {savedQuestions.length === 0 ? <p className="text-center py-8 text-stone-500">Nenhuma questão resolvida.</p> : savedQuestions.map(q => (
                      <div key={q.id} className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-stone-800/50 border-stone-800' : 'bg-stone-50 border-stone-100'}`}>
                        <div className="flex-1 truncate mr-4">
                          <p className={`text-sm font-bold truncate ${darkMode ? 'text-stone-200' : 'text-stone-800'}`}>{q.text}</p>
                          <span className="text-[10px] text-stone-500 uppercase font-black">{q.institution || 'Geral'}</span>
                        </div>
                        <button onClick={() => { setActiveQuestionId(q.id); setSelectedOption(null); setQuestionMode('random'); }} className="p-2 text-indigo-600"><Play className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <AnimatePresence>
                {activeQuestionId && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className={`p-6 rounded-3xl border-2 ${darkMode ? 'bg-stone-900 border-indigo-500/30' : 'bg-white border-indigo-100 shadow-xl'}`}>
                    {(() => {
                      const q = savedQuestions.find(sq => sq.id === activeQuestionId);
                      if (!q) return null;
                      const lastAttempt = q.attempts[q.attempts.length - 1];
                      const answered = lastAttempt !== undefined;
                      return (
                        <div className="space-y-6">
                          <div className="flex justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{q.institution}</span>
                            <button onClick={() => setActiveQuestionId(null)}><X className="w-5 h-5" /></button>
                          </div>
                          <p className="font-bold leading-relaxed">{q.text}</p>
                          <div className="space-y-3">
                            {q.options.map((opt, idx) => (
                              <button key={idx} disabled={answered} onClick={() => setSelectedOption(idx)} className={`w-full p-4 rounded-xl border-2 text-left text-sm font-bold transition-all ${answered ? idx === q.correctOption ? 'bg-emerald-500 border-emerald-500 text-white' : idx === lastAttempt.selectedOption ? 'bg-red-500 border-red-500 text-white' : 'opacity-40' : selectedOption === idx ? 'bg-indigo-600 border-indigo-600 text-white' : darkMode ? 'bg-stone-800 border-stone-700' : 'bg-stone-50 border-stone-200'}`}>
                                {opt}
                              </button>
                            ))}
                          </div>
                          {answered ? (
                            <div className="space-y-4">
                              <div className={`p-4 rounded-xl font-bold text-sm ${lastAttempt.isCorrect ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                {lastAttempt.isCorrect ? 'Correto! +50 XP' : 'Incorreto. Tente novamente!'}
                              </div>
                              <button onClick={() => setShowExplanation(!showExplanation)} className="text-xs font-bold text-stone-500 underline">Ver Explicação</button>
                              {showExplanation && <p className="text-xs leading-relaxed text-stone-500 p-4 bg-stone-100 dark:bg-stone-800 rounded-xl">{q.explanation}</p>}
                            </div>
                          ) : (
                            <button onClick={() => handleAnswerQuestion(q.id)} disabled={selectedOption === null} className="w-full py-4 rounded-xl bg-indigo-600 text-white font-black disabled:opacity-50">CONFIRMAR</button>
                          )}
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : currentTab === 'pomodoro' ? (
            <div className="space-y-6">
              <div className={`p-10 rounded-[40px] border text-center ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}>
                <div className={`inline-flex p-4 rounded-3xl mb-6 ${pomodoroMode === 'work' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  <Clock className="w-8 h-8" />
                </div>
                <h2 className="text-7xl font-black mb-2 tracking-tighter">{Math.floor(pomodoroTime / 60)}:{(pomodoroTime % 60).toString().padStart(2, '0')}</h2>
                <p className={`text-xs font-black uppercase tracking-[0.2em] mb-10 ${pomodoroMode === 'work' ? 'text-indigo-500' : 'text-emerald-500'}`}>{pomodoroMode === 'work' ? 'Modo Foco' : 'Descanso'}</p>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => setPomodoroActive(!pomodoroActive)} className={`px-10 py-5 rounded-3xl font-black text-lg transition-all active:scale-95 ${pomodoroActive ? 'bg-stone-200 text-stone-600' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20'}`}>
                    {pomodoroActive ? 'Pausar' : 'Começar'}
                  </button>
                  <button onClick={() => { setPomodoroActive(false); setPomodoroTime(pomodoroInitialTime); }} className="p-5 rounded-3xl border border-stone-200 dark:border-stone-800"><Loader2 className="w-6 h-6 text-stone-400" /></button>
                </div>
              </div>
            </div>
          ) : currentTab === 'tasks' ? (
            <div className="space-y-6">
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}>
                <h2 className="font-black text-lg mb-6 flex items-center gap-2"><List className="w-5 h-5 text-indigo-600" /> Suas Tarefas</h2>
                <div className="flex items-center gap-2 mb-6 w-full">
                  <div className="flex-1 relative">
                    <input 
                      value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                      placeholder="O que vamos estudar?" className={`w-full p-4 rounded-2xl border outline-none text-sm pr-12 ${darkMode ? 'bg-stone-800 border-stone-700 text-white' : 'bg-stone-50 border-stone-200'}`}
                    />
                  </div>
                  <button onClick={handleAddTask} className="bg-indigo-600 text-white p-4 rounded-2xl flex-shrink-0 shadow-lg shadow-indigo-500/30 active:scale-90 transition-all">
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div key={task.id} className={`flex items-center gap-3 p-4 rounded-2xl border ${task.completed ? 'opacity-50' : ''} ${darkMode ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-200 shadow-sm'}`}>
                      <button onClick={() => handleToggleTask(task.id)} className={task.completed ? 'text-emerald-500' : 'text-stone-300'}>
                        {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <div className="w-6 h-6 border-2 border-current rounded-full" />}
                      </button>
                      <span className={`flex-1 font-bold ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
                      <button onClick={() => handleDeleteTask(task.id)} className="text-stone-400"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* ── NAVIGATION ──────────────────────────────────────────────── */}
      <nav className={`flex-shrink-0 border-t p-4 safe-bottom flex justify-around items-center ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
        {[
          { id: 'home', icon: <LayoutDashboard />, label: 'Início' },
          { id: 'questions', icon: <BrainCircuit />, label: 'Questões' },
          { id: 'achievements', icon: <Trophy />, label: 'Conquistas' },
          { id: 'pomodoro', icon: <Target />, label: 'Foco' },
          { id: 'tasks', icon: <List />, label: 'Tarefas' }
        ].map(tab => (
          <button 
            key={tab.id} onClick={() => setCurrentTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${currentTab === tab.id ? 'text-indigo-600 scale-110' : 'text-stone-400 opacity-60'}`}
          >
            {React.cloneElement(tab.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
            <span className="text-[10px] font-black uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
