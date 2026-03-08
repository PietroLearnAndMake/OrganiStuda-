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
  BarChart2,
  Filter,
  History,
  AlertTriangle,
  ArrowUpCircle,
  ArrowDownCircle
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
  Tooltip as RechartsTooltip
} from 'recharts';
import Confetti from 'react-confetti';

// --- DATA ---
import { ENEM_DATA } from './data/enemData';

// --- TYPES ---
interface Topic {
  id: string;
  title: string;
  completed: boolean;
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
  difficulty?: 'Muito Fácil' | 'Fácil' | 'Médio' | 'Difícil' | 'Muito Difícil';
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
  difficulty?: 'Muito Fácil' | 'Fácil' | 'Médio' | 'Difícil' | 'Muito Difícil';
  attempts: Attempt[];
}

interface UserProfile {
  name: string;
  photo: string | null;
  level: number;
  xp: number;
  totalXp: number;
  streak: number;
  bestStreak: number;
  lastStudyDate: string | null; // Data do último ganho de XP (YYYY-MM-DD)
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

// --- CONSTANTS ---
const XP_PER_TOPIC = 100;
const XP_PER_QUESTION = 50;
const BASE_LEVEL_XP = 1000;
const XP_MULTIPLIER = 1.2;

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

const QConcursosStats = React.memo(({ savedQuestions, darkMode }: { savedQuestions: SavedQuestion[], darkMode: boolean }) => {
  const stats = useMemo(() => {
    const attempts = savedQuestions.flatMap(q => q.attempts);
    const total = attempts.length;
    const correct = attempts.filter(a => a.isCorrect).length;
    const errors = total - correct;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    const difficultyStats = [
      { name: 'Muito Fácil', total: attempts.filter(a => a.difficulty === 'Muito Fácil').length, correct: attempts.filter(a => a.difficulty === 'Muito Fácil' && a.isCorrect).length },
      { name: 'Fácil', total: attempts.filter(a => a.difficulty === 'Fácil').length, correct: attempts.filter(a => a.difficulty === 'Fácil' && a.isCorrect).length },
      { name: 'Médio', total: attempts.filter(a => a.difficulty === 'Médio').length, correct: attempts.filter(a => a.difficulty === 'Médio' && a.isCorrect).length },
      { name: 'Difícil', total: attempts.filter(a => a.difficulty === 'Difícil').length, correct: attempts.filter(a => a.difficulty === 'Difícil' && a.isCorrect).length },
      { name: 'Muito Difícil', total: attempts.filter(a => a.difficulty === 'Muito Difícil').length, correct: attempts.filter(a => a.difficulty === 'Muito Difícil' && a.isCorrect).length },
    ].map(d => ({
      ...d,
      percent: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0
    }));

    return { total, correct, errors, accuracy, difficultyStats };
  }, [savedQuestions]);

  const pieData = [
    { name: 'Acertos', value: stats.correct, color: '#3b82f6' },
    { name: 'Erros', value: stats.errors, color: '#ef4444' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-[32px] border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-sm'}`}
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" startAngle={90} endAngle={450}>
                  {pieData.map((entry, index) => <Cell key={index} fill={entry.color} stroke="none" />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black">{stats.total}</span>
              <span className="text-[10px] font-bold text-stone-500 uppercase leading-none">Questões<br/>resolvidas</span>
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-blue-500">{stats.accuracy}% {stats.correct} acertos</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-red-500">{100 - stats.accuracy}% {stats.errors} erros</span></div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-stone-500 mb-2">Dificuldade das questões</h4>
          {stats.difficultyStats.map((d, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter"><span>{d.name}</span></div>
              <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${d.percent}%` }} className="h-full bg-blue-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

// --- MAIN APP COMPONENT ---

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTab, setCurrentTab] = useState('home');
  const [isInitialized, setIsInitialized] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Estudante',
    photo: null,
    level: 1,
    xp: 0,
    totalXp: 0,
    streak: 0,
    bestStreak: 0,
    lastStudyDate: null,
    weeklyGoal: 500,
    weeklyProgress: 0,
  });

  const [subjects, setSubjects] = useState<Subject[]>(ENEM_DATA);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([]);
  const [questionMode, setQuestionMode] = useState<'random' | 'filter' | 'history'>('random');
  const [filterQuery, setFilterQuery] = useState('');
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [tasks, setTasks] = useState<{ id: string, text: string, completed: boolean }[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // --- HELPERS ---
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

  const calculateLevelData = useCallback((totalXp: number) => {
    let level = 1;
    let xpInCurrentLevel = totalXp;
    let nextLevelXp = BASE_LEVEL_XP;

    while (xpInCurrentLevel >= nextLevelXp) {
      xpInCurrentLevel -= nextLevelXp;
      level++;
      nextLevelXp = Math.floor(nextLevelXp * XP_MULTIPLIER);
    }

    return { level, xpInCurrentLevel, nextLevelXp };
  }, []);

  // --- LOGIC: STREAK & XP (BLINDADO) ---
  
  const updateXp = useCallback((amount: number) => {
    setProfile(prev => {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      let newStreak = prev.streak;
      let newBestStreak = prev.bestStreak;
      let newLastStudyDate = prev.lastStudyDate;

      // Só incrementa ofensiva se for um ganho de XP positivo
      if (amount > 0) {
        if (!prev.lastStudyDate) {
          newStreak = 1;
          newLastStudyDate = today;
        } else if (prev.lastStudyDate === yesterday) {
          newStreak += 1;
          newLastStudyDate = today;
        } else if (prev.lastStudyDate !== today) {
          // Se não foi ontem nem hoje, resetou a ofensiva antes, mas agora começa uma nova
          newStreak = 1;
          newLastStudyDate = today;
        }
        if (newStreak > newBestStreak) newBestStreak = newStreak;
      }

      const newTotalXp = Math.max(0, prev.totalXp + amount);
      const oldData = calculateLevelData(prev.totalXp);
      const newData = calculateLevelData(newTotalXp);

      if (newData.level > oldData.level) {
        showToast('LEVEL UP!', `Nível ${newData.level}! 🎉`, '🎊', 'bg-indigo-600');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } else if (newData.level < oldData.level) {
        showToast('LEVEL DOWN', `Você voltou para o nível ${newData.level} 📉`, '⚠️', 'bg-red-600');
      }

      return {
        ...prev,
        totalXp: newTotalXp,
        level: newData.level,
        xp: newData.xpInCurrentLevel,
        streak: newStreak,
        bestStreak: newBestStreak,
        lastStudyDate: newLastStudyDate,
        weeklyProgress: Math.max(0, prev.weeklyProgress + amount)
      };
    });
  }, [calculateLevelData]);

  // --- PERSISTENCE & STREAK CHECK ---
  useEffect(() => {
    async function loadData() {
      try {
        const { value } = await Preferences.get({ key: 'organistuda_data_v384_final' });
        if (value) {
          const parsed = JSON.parse(value);
          let loadedProfile = parsed.profile;
          
          // Verificar se a ofensiva expirou (mais de 24h sem estudar)
          if (loadedProfile.lastStudyDate) {
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            
            if (loadedProfile.lastStudyDate !== today && loadedProfile.lastStudyDate !== yesterday) {
              loadedProfile.streak = 0;
              showToast('Ofensiva Perdida', 'Sua sequência de dias foi resetada. Volte a estudar! 🔥', '💔', 'bg-stone-700');
            }
          }

          if (loadedProfile) setProfile(loadedProfile);
          if (parsed.subjects) setSubjects(parsed.subjects);
          if (parsed.savedQuestions) setSavedQuestions(parsed.savedQuestions);
          if (parsed.tasks) setTasks(parsed.tasks);
          if (parsed.darkMode !== undefined) setDarkMode(parsed.darkMode);
        }
      } catch (e) { console.error(e); } finally { setIsInitialized(true); }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    Preferences.set({ key: 'organistuda_data_v384_final', value: JSON.stringify({ profile, subjects, savedQuestions, tasks, darkMode }) });
  }, [profile, subjects, savedQuestions, tasks, darkMode, isInitialized]);

  // --- ACTIONS ---
  const toggleTopic = useCallback((subjectId: string, topicId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          topics: s.topics.map(t => {
            if (t.id === topicId) {
              const becomingCompleted = !t.completed;
              updateXp(becomingCompleted ? XP_PER_TOPIC : -XP_PER_TOPIC);
              return { ...t, completed: becomingCompleted };
            }
            return t;
          })
        };
      }
      return s;
    }));
  }, [updateXp]);

  const handleToggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const becomingCompleted = !t.completed;
        updateXp(becomingCompleted ? 25 : -25);
        return { ...t, completed: becomingCompleted };
      }
      return t;
    }));
  }, [updateXp]);

  const generateBankQuestion = useCallback(() => {
    setLoadingQuestion(true);
    setTimeout(() => {
      const difficulties: SavedQuestion['difficulty'][] = ['Muito Fácil', 'Fácil', 'Médio', 'Difícil', 'Muito Difícil'];
      const newQ: SavedQuestion = {
        id: Math.random().toString(36).substr(2, 9),
        text: "Qual destas é uma característica do realismo?",
        options: ["Foco no subjetivismo", "Análise objetiva da realidade", "Uso excessivo de metáforas", "Foco no futuro"],
        correctOption: 1,
        explanation: "O realismo busca retratar a sociedade e o homem de forma objetiva e crua.",
        institution: "ENEM",
        discipline: "Linguagens",
        difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
        attempts: []
      };
      setSavedQuestions(prev => [newQ, ...prev]);
      setActiveQuestionId(newQ.id);
      setSelectedOption(null);
      setLoadingQuestion(false);
    }, 500);
  }, []);

  const handleAnswerQuestion = (id: string) => {
    if (selectedOption === null) return;
    const q = savedQuestions.find(sq => sq.id === id);
    if (!q) return;
    const isCorrect = selectedOption === q.correctOption;
    if (isCorrect) updateXp(XP_PER_QUESTION);
    setSavedQuestions(prev => prev.map(sq => sq.id === id ? { ...sq, attempts: [...sq.attempts, { date: new Date().toISOString(), selectedOption, isCorrect, difficulty: sq.difficulty }] } : sq));
  };

  const { nextLevelXp } = useMemo(() => calculateLevelData(profile.totalXp), [profile.totalXp, calculateLevelData]);

  if (!isInitialized) return <div className="fixed inset-0 flex items-center justify-center bg-stone-950"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>;

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${darkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <header className="p-6 safe-top">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center"><Flame className="text-white w-6 h-6" /></div>
            <h1 className="text-xl font-black tracking-tighter">OrganiStuda</h1>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-2xl bg-stone-900/50">{darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}</button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-stone-900 border-2 border-indigo-500 overflow-hidden">
              {profile.photo ? <img src={profile.photo} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 text-stone-700" />}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-1">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-500">Nível {profile.level}</span>
              <span className="text-[10px] font-bold text-stone-500">{profile.xp} / {nextLevelXp} XP</span>
            </div>
            <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
              <motion.div animate={{ width: `${(profile.xp / nextLevelXp) * 100}%` }} className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-orange-500">🔥 {profile.streak}</div>
            <div className="text-[8px] font-bold uppercase text-stone-500">Ofensiva</div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24 space-y-6">
        <AnimatePresence mode="wait">
          {currentTab === 'home' ? (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <QConcursosStats savedQuestions={savedQuestions} darkMode={darkMode} />
              <div className="grid grid-cols-1 gap-4">
                {subjects.map(s => {
                  const completed = s.topics.filter(t => t.completed).length;
                  const total = s.topics.length;
                  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                  return (
                    <button key={s.id} onClick={() => { setSelectedSubjectId(s.id); setCurrentTab('subjects'); }} className={`p-6 rounded-[32px] border flex items-center gap-5 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: `${s.color.replace('bg-', '')}20`, color: s.color.replace('bg-', 'text-') }}>
                        <IconComponent name={s.icon} className="w-8 h-8" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-black text-lg">{s.name}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-1.5 bg-stone-800 rounded-full overflow-hidden"><div className={`h-full ${s.color}`} style={{ width: `${percent}%` }} /></div>
                          <span className="text-[10px] font-bold text-stone-500">{percent}%</span>
                        </div>
                      </div>
                      <ChevronRight className="text-stone-500" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : currentTab === 'subjects' && selectedSubjectId ? (
            <motion.div key="subject-detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <button onClick={() => setCurrentTab('home')} className="flex items-center gap-2 text-stone-500 font-bold text-sm"><X className="w-4 h-4" /> Voltar</button>
              <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
                <h2 className="text-2xl font-black">{subjects.find(s => s.id === selectedSubjectId)?.name}</h2>
                <div className="space-y-3">
                  {subjects.find(s => s.id === selectedSubjectId)?.topics.map(t => (
                    <div key={t.id} className={`flex items-center gap-3 p-4 rounded-2xl border ${t.completed ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-stone-800 border-stone-700'}`}>
                      <button onClick={() => toggleTopic(selectedSubjectId, t.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${t.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-stone-600'}`}>
                        {t.completed && <Check className="w-4 h-4" />}
                      </button>
                      <span className={`flex-1 font-bold text-sm ${t.completed ? 'line-through text-stone-500' : ''}`}>{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : currentTab === 'questions' ? (
            <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800">
                <div className="flex p-1 bg-stone-800 rounded-2xl mb-6">
                  {['random', 'filter', 'history'].map(m => (
                    <button key={m} onClick={() => setQuestionMode(m as any)} className={`flex-1 py-3 rounded-xl text-xs font-bold ${questionMode === m ? 'bg-stone-700 text-indigo-400' : 'text-stone-500'}`}>
                      {m === 'random' ? 'Aleatória' : m === 'filter' ? 'Filtro' : 'Histórico'}
                    </button>
                  ))}
                </div>
                {questionMode === 'random' && <button onClick={generateBankQuestion} className="w-full py-4 rounded-xl bg-indigo-600 text-white font-black">GERAR QUESTÃO</button>}
                {questionMode === 'filter' && (
                  <div className="space-y-4">
                    <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" /><input value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} placeholder="Buscar..." className="w-full pl-12 p-4 rounded-xl bg-stone-800 border border-stone-700 outline-none text-sm" /></div>
                  </div>
                )}
                {questionMode === 'history' && (
                  <div className="space-y-3">
                    {savedQuestions.length === 0 ? <p className="text-center py-8 text-stone-500">Nenhum histórico.</p> : savedQuestions.map(q => (
                      <div key={q.id} className="p-4 rounded-xl bg-stone-800/50 border border-stone-800 flex justify-between items-center">
                        <div className="truncate flex-1">
                          <p className="text-sm font-bold truncate">{q.text}</p>
                          <span className="text-[10px] text-stone-500 uppercase">{q.institution} • {q.difficulty}</span>
                        </div>
                        <div className={q.attempts[q.attempts.length-1]?.isCorrect ? 'text-emerald-500' : 'text-red-500'}>
                          {q.attempts[q.attempts.length-1]?.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {activeQuestionId && (
                <div className="p-6 rounded-3xl border-2 border-indigo-500/30 bg-stone-900 space-y-6">
                  {(() => {
                    const q = savedQuestions.find(sq => sq.id === activeQuestionId);
                    if (!q) return null;
                    const answered = q.attempts.length > 0;
                    return (
                      <>
                        <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase text-indigo-500">{q.institution} • {q.difficulty}</span><button onClick={() => setActiveQuestionId(null)}><X className="w-5 h-5" /></button></div>
                        <p className="font-bold">{q.text}</p>
                        <div className="space-y-3">
                          {q.options.map((opt, idx) => (
                            <button key={idx} disabled={answered} onClick={() => setSelectedOption(idx)} className={`w-full p-4 rounded-xl border-2 text-left text-sm font-bold ${answered ? idx === q.correctOption ? 'bg-emerald-500 border-emerald-500 text-white' : idx === q.attempts[q.attempts.length-1].selectedOption ? 'bg-red-500 border-red-500 text-white' : 'opacity-40' : selectedOption === idx ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-stone-800 border-stone-700'}`}>
                              {opt}
                            </button>
                          ))}
                        </div>
                        {!answered && <button onClick={() => handleAnswerQuestion(q.id)} className="w-full py-4 rounded-xl bg-indigo-600 text-white font-black">CONFIRMAR</button>}
                      </>
                    );
                  })()}
                </div>
              )}
            </motion.div>
          ) : currentTab === 'pomodoro' ? (
            <motion.div key="pomodoro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="p-10 rounded-[40px] border border-stone-800 bg-stone-900 text-center">
                <Clock className="w-12 h-12 text-indigo-500 mx-auto mb-6" />
                <h2 className="text-7xl font-black mb-10 tracking-tighter">{Math.floor(pomodoroTime / 60)}:{(pomodoroTime % 60).toString().padStart(2, '0')}</h2>
                <button onClick={() => setPomodoroActive(!pomodoroActive)} className={`w-full py-5 rounded-3xl font-black text-lg transition-all ${pomodoroActive ? 'bg-stone-800 text-stone-400' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20'}`}>
                  {pomodoroActive ? 'PAUSAR' : 'COMEÇAR FOCO'}
                </button>
              </div>
            </motion.div>
          ) : currentTab === 'tasks' ? (
            <motion.div key="tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800">
                <h2 className="font-black text-lg mb-6 flex items-center gap-2"><List className="w-5 h-5 text-indigo-600" /> Tarefas</h2>
                <div className="flex gap-2 mb-6">
                  <input value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (setTasks(prev => [...prev, { id: Date.now().toString(), text: newTaskText, completed: false }]), setNewTaskText(''))} placeholder="O que vamos estudar?" className="flex-1 p-4 rounded-2xl bg-stone-800 border border-stone-700 outline-none text-sm" />
                  <button onClick={() => { if(newTaskText) { setTasks(prev => [...prev, { id: Date.now().toString(), text: newTaskText, completed: false }]); setNewTaskText(''); } }} className="bg-indigo-600 p-4 rounded-2xl"><Plus className="w-6 h-6 text-white" /></button>
                </div>
                <div className="space-y-3">
                  {tasks.map(t => (
                    <div key={t.id} className={`flex items-center gap-3 p-4 rounded-2xl border ${t.completed ? 'opacity-50 bg-stone-800/50' : 'bg-stone-800'}`}>
                      <button onClick={() => handleToggleTask(t.id)}>{t.completed ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <div className="w-6 h-6 border-2 border-stone-600 rounded-full" />}</button>
                      <span className={`flex-1 font-bold ${t.completed ? 'line-through' : ''}`}>{t.text}</span>
                      <button onClick={() => setTasks(prev => prev.filter(task => task.id !== t.id))}><Trash2 className="w-4 h-4 text-stone-500" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 p-4 safe-bottom border-t border-stone-800 bg-stone-900 flex justify-around items-center">
        {[
          { id: 'home', icon: <LayoutDashboard />, label: 'Início' },
          { id: 'questions', icon: <BrainCircuit />, label: 'Questões' },
          { id: 'achievements', icon: <Trophy />, label: 'Conquistas' },
          { id: 'pomodoro', icon: <Target />, label: 'Foco' },
          { id: 'tasks', icon: <List />, label: 'Tarefas' }
        ].map(tab => (
          <button key={tab.id} onClick={() => setCurrentTab(tab.id)} className={`flex flex-col items-center gap-1 ${currentTab === tab.id ? 'text-indigo-500' : 'text-stone-500'}`}>
            {React.cloneElement(tab.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
            <span className="text-[10px] font-black uppercase">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
