import React, { useState, useEffect, useMemo } from 'react';
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
  Brain
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

export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [profile, setProfile] = useState<UserProfile>({ name: 'Estudante', photo: null, achievements: [], streak: 0, lastLogin: null });
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'home' | 'achievements' | 'questions' | 'pomodoro' | 'tasks'>('home');
  const [isInitialized, setIsInitialized] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  
  // Pomodoro & Tasks State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work');
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [customTimeInput, setCustomTimeInput] = useState('25');
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

  // Load data from localStorage
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
      
      // Merge logic:
      // 1. Keep local progress (completed status)
      // 2. Update questions from ENEM_DATA
      // 3. Add new topics from ENEM_DATA if they don't exist locally
      // 4. Keep custom topics added by the user
      
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
                // Always take questions from ENEM_DATA as it's the source of truth for official questions
                questions: originalTopic.questions 
              };
            }),
            // Add custom topics that are not in ENEM_DATA
            ...localSubject.topics.filter(lt => !originalSubject.topics.some(ot => ot.id === lt.id))
          ]
        };
      });

      // Add custom subjects that are not in ENEM_DATA
      const customSubjects = local.filter(ls => !ENEM_DATA.some(os => os.id === ls.id));
      
      setSubjects([...merged, ...customSubjects]);
    } else {
      setSubjects(ENEM_DATA);
    }

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (parsedProfile.lastLogin === yesterdayStr) {
        parsedProfile.streak += 1;
        // Show streak notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-10 right-10 bg-orange-600 text-white p-4 rounded-xl shadow-2xl z-50 flex items-center gap-4 animate-bounce';
        notification.innerHTML = `
          <div class="text-3xl">🔥</div>
          <div>
            <div class="font-bold">Sequência de ${parsedProfile.streak} dias!</div>
            <div class="text-sm text-orange-100">Continue assim!</div>
          </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      } else if (parsedProfile.lastLogin !== today) {
        parsedProfile.streak = 1;
      }
      parsedProfile.lastLogin = today;
      setProfile(parsedProfile);
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
    
    // Simple hash-based routing
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
    handleHashChange(); // Initial check
    
    setIsInitialized(true);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('enem_subjects', JSON.stringify(subjects));
      localStorage.setItem('enem_profile', JSON.stringify(profile));
      localStorage.setItem('enem_theme', darkMode ? 'dark' : 'light');
      localStorage.setItem('enem_saved_questions', JSON.stringify(savedQuestions));
      localStorage.setItem('enem_tasks', JSON.stringify(tasks));
    }
  }, [subjects, profile, isInitialized, darkMode, savedQuestions, tasks]);

  // Pomodoro Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((time) => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setPomodoroActive(false);
      if (pomodoroMode === 'work') {
        setPomodoroMode('break');
        setPomodoroTime(5 * 60);
      } else {
        setPomodoroMode('work');
        setPomodoroTime(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime, pomodoroMode]);

  const totalTopics = useMemo(() => 
    subjects.reduce((acc, s) => acc + s.topics.length, 0), 
  [subjects]);

  const completedTopics = useMemo(() => 
    subjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0), 
  [subjects]);

  const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const toggleTopic = (subjectId: string, topicId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          topics: s.topics.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t)
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
    } catch (error: any) {
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

  const handleAnswer = (optionIdx: number) => {
    if (!activeQuestionId) return;
    
    const question = savedQuestions.find(q => q.id === activeQuestionId);
    if (!question) return;

    const isCorrect = optionIdx === question.correctAnswer;
    const newAttempt: Attempt = {
      timestamp: Date.now(),
      selectedOption: optionIdx,
      isCorrect
    };

    setSavedQuestions(prev => prev.map(q => {
      if (q.id === activeQuestionId) {
        return {
          ...q,
          attempts: [...q.attempts, newAttempt]
        };
      }
      return q;
    }));

    setSelectedOption(optionIdx);

    if (isCorrect) {
      // Play sound
      const audio = new Audio('https://actions.google.com/sounds/v1/notifications/achievement_sound.ogg');
      audio.play().catch(e => console.warn("Audio play failed (expected on first interaction):", e));
      
      // Achievement notification
      const newAchievements = [...profile.achievements];
      if (!newAchievements.includes('correct_answer')) {
          newAchievements.push('correct_answer');
          setProfile(prev => ({ ...prev, achievements: newAchievements }));
      }
    }
  };

  const redoQuestion = (qId: string) => {
    setActiveQuestionId(qId);
    setSelectedOption(null);
    setShowExplanation(false);
  };

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

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    // Collect all questions from selected subject(s)
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

    // Check if this question is already in savedQuestions to preserve attempts
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

  // Calculate achievements
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'} font-sans pb-20`}>
      {/* Header / Profile Section */}
      <header className={`border-b px-6 pt-12 pb-6 sticky top-0 z-10 transition-colors ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
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
          <div className={`flex flex-col items-end gap-2 p-4 rounded-2xl shadow-sm border transition-colors ${darkMode ? 'bg-stone-900 border-stone-800 shadow-none' : 'bg-white border-stone-200'}`}>
            <div className="text-right">
              <div className={`text-3xl font-black leading-none ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{overallPercentage}%</div>
              <div className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>Progresso Total</div>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className={`w-full h-2.5 rounded-full overflow-hidden transition-colors ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${overallPercentage}%` }}
            className={`h-full ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'}`}
          />
        </div>
      </header>

      <main className="px-6 mt-8 pb-32">
        <AnimatePresence mode="wait">
          {currentTab === 'home' ? (
            !selectedSubjectId ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
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

                {overallPercentage === 100 && (
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
                                  // Re-run the merge logic manually
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
                                            questions: originalTopic.questions 
                                          };
                                        }),
                                        ...localSubject.topics.filter(lt => !originalSubject.topics.some(ot => ot.id === lt.id))
                                      ]
                                    };
                                  });
                                  const customSubjects = local.filter(ls => !ENEM_DATA.some(os => os.id === ls.id));
                                  setSubjects([...merged, ...customSubjects]);
                                  setShowSubjectMenu(false);
                                  alert('Banco de questões atualizado com sucesso!');
                                }}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-2 ${darkMode ? 'text-stone-300 hover:bg-stone-800' : 'text-stone-600 hover:bg-stone-50'}`}
                              >
                                <Loader2 className="w-4 h-4" />
                                Sincronizar Questões
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Add Topic Input */}
                <div className={`mb-6 p-4 rounded-xl border flex gap-2 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                  <input 
                    type="text" 
                    placeholder="Adicionar novo conteúdo..."
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTopic(selectedSubject!.id)}
                    className={`flex-1 bg-transparent outline-none text-sm ${darkMode ? 'placeholder-stone-700' : 'placeholder-stone-400'}`}
                  />
                  <button 
                    onClick={() => addTopic(selectedSubject!.id)}
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedSubject?.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        topic.completed 
                          ? darkMode ? 'bg-stone-900/50 border-stone-800 text-stone-600' : 'bg-stone-50 border-stone-200 text-stone-400' 
                          : darkMode ? 'bg-stone-900 border-stone-800 text-stone-100 shadow-sm' : 'bg-white border-stone-200 text-stone-800 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <button
                          onClick={() => toggleTopic(selectedSubject.id, topic.id)}
                          className="shrink-0"
                        >
                          {topic.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                          ) : (
                            <Circle className={`w-6 h-6 ${darkMode ? 'text-stone-700' : 'text-stone-300'}`} />
                          )}
                        </button>
                        <div className="flex flex-col flex-1">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={topic.title}
                              onChange={(e) => updateTopic(selectedSubject.id, topic.id, e.target.value)}
                              className={`bg-transparent outline-none font-medium w-full ${topic.completed ? 'line-through' : ''}`}
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
              </motion.div>
            )
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

              {achievements.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {achievements.map((achievement, idx) => (
                    <motion.div
                      key={`${achievement.subjectName}-${achievement.type}-${idx}`}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-5 rounded-2xl border shadow-sm flex items-center gap-4 ${
                        darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className={`p-3 rounded-full ${achievement.color} text-white`}>
                        <Trophy className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className={`font-bold ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>
                          {achievement.type === 'bem' && 'Indo bem'}
                          {achievement.type === 'melhor' && 'Indo melhor'}
                          {achievement.type === 'perfeito' && 'Indo perfeito'}
                        </h3>
                        <p className={`text-xs ${darkMode ? 'text-stone-500' : 'text-stone-500'}`}>Em {achievement.subjectName}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={`p-10 rounded-2xl border border-dashed text-center ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-300'}`}>
                  <Trophy className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-stone-800' : 'text-stone-200'}`} />
                  <p className={`font-medium ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>Complete tópicos para ganhar conquistas!</p>
                </div>
              )}
            </motion.div>
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
                  
                  <div className="flex p-1 bg-stone-100 rounded-xl mb-6 dark:bg-stone-800">
                    <button
                      onClick={() => setQuestionMode('random')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${questionMode === 'random' ? 'bg-white shadow-sm text-stone-800 dark:bg-stone-700 dark:text-stone-200' : 'text-stone-500 hover:text-stone-700 dark:text-stone-400'}`}
                    >
                      Aleatório
                    </button>
                    <button
                      onClick={() => setQuestionMode('filter')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${questionMode === 'filter' ? 'bg-white shadow-sm text-stone-800 dark:bg-stone-700 dark:text-stone-200' : 'text-stone-500 hover:text-stone-700 dark:text-stone-400'}`}
                    >
                      Filtros
                    </button>
                    <button
                      onClick={() => setQuestionMode('stats')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${questionMode === 'stats' ? 'bg-white shadow-sm text-stone-800 dark:bg-stone-700 dark:text-stone-200' : 'text-stone-500 hover:text-stone-700 dark:text-stone-400'}`}
                    >
                      Feitas
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {questionMode === 'stats' ? (
                      <div className={`p-4 rounded-xl ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                        <h3 className="font-bold mb-2">Estatísticas</h3>
                        {(() => {
                          const total = savedQuestions.filter(q => q.attempts.length > 0).length;
                          const correct = savedQuestions.filter(q => q.attempts.some(a => a.isCorrect)).length;
                          const wrong = total - correct;
                          return (
                            <div className="space-y-4 text-sm">
                              <div className="space-y-2">
                                <p>Total de questões feitas: {total}</p>
                                <p className="text-emerald-500">Acertos: {correct}</p>
                                <p className="text-red-500">Erros: {wrong}</p>
                              </div>
                              <div className="border-t pt-4">
                                <h4 className="font-bold mb-2">Questões Feitas:</h4>
                                {savedQuestions.filter(q => q.attempts.length > 0).map(q => (
                                  <div key={q.id} className="flex justify-between items-center py-2 border-b last:border-0">
                                    <span className="truncate flex-1 mr-2">{q.text.substring(0, 30)}...</span>
                                    <button 
                                      onClick={() => redoQuestion(q.id)}
                                      className="text-xs bg-indigo-600 text-white px-2 py-1 rounded"
                                    >
                                      Refazer
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
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
                            <ChevronDown className="w-4 h-4 text-stone-400" />
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
                              <ChevronDown className="w-3 h-3 text-stone-400" />
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
                              {subjects.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <ChevronDown className="w-3 h-3 text-stone-400" />
                            </div>
                          </div>
                        </div>

                        <div className="relative">
                          <input 
                            type="text"
                            placeholder="Assunto ou palavra-chave..."
                            value={filterTopic}
                            onChange={(e) => setFilterTopic(e.target.value)}
                            className={`w-full pl-4 pr-4 py-3 rounded-xl outline-none font-medium transition-colors ${
                              darkMode 
                                ? 'bg-stone-800 text-stone-200 focus:ring-2 focus:ring-purple-500/50 placeholder-stone-600' 
                                : 'bg-stone-100 text-stone-700 focus:ring-2 focus:ring-purple-500/20 placeholder-stone-400'
                            }`}
                          />
                        </div>

                        <button 
                          onClick={handleSearch}
                          disabled={isGenerating}
                          className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isGenerating ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Search className="w-5 h-5" />
                              FILTRAR QUESTÕES
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {loadingQuestion && (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="w-12 h-12 text-[#1a569d] animate-spin" />
                  <p className={`font-medium animate-pulse ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>Buscando questões...</p>
                </div>
              )}

              {activeQuestionId && (
                (() => {
                  const q = searchResults.find(sq => sq.id === activeQuestionId) || savedQuestions.find(sq => sq.id === activeQuestionId);
                  if (!q) return null;
                  
                  const savedQ = savedQuestions.find(sq => sq.id === activeQuestionId);
                  const lastAttempt = savedQ?.attempts[savedQ.attempts.length - 1];
                  const isAnswered = !!lastAttempt && selectedOption !== null;
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

                      <div className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
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
                              {selectedOption === q.correctAnswer ? 'GREEN!' : 'RED!'}
                            </div>
                          </div>
                          
                          {showExplanation && (
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
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-600 ${darkMode ? 'bg-stone-800 text-stone-400' : ''}`}>
                                {q.institution || 'ENEM'} {q.year || '2023'}
                              </span>
                            </div>
                            <p className={`text-sm font-medium truncate ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>{q.text}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {lastAttempt ? (
                                <div className="flex items-center gap-1.5">
                                  <div className={`w-2.5 h-2.5 rounded-full ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                  <span className={`text-[10px] font-black uppercase tracking-tighter ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {isCorrect ? 'ACERTOU' : 'ERROU'} 
                                    {redoCount > 1 && ` • ${redoCount-1}x REFEITA`}
                                  </span>
                                </div>
                              ) : (
                                <span className={`text-[10px] font-black uppercase tracking-tighter ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>Não respondida</span>
                              )}
                            </div>
                          </div>
                          <button 
                            onClick={() => openQuestion(q)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                              darkMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                            }`}
                          >
                            {lastAttempt ? 'Refazer' : 'Responder'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {questionMode === 'filter' && hasSearched && searchResults.length === 0 && (
                <div className={`p-12 rounded-2xl border border-dashed text-center ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-300'}`}>
                  <Search className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-stone-800' : 'text-stone-200'}`} />
                  <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-stone-300' : 'text-stone-800'}`}>Nenhuma questão encontrada</h3>
                  <p className={`text-sm max-w-xs mx-auto ${darkMode ? 'text-stone-500' : 'text-stone-500'}`}>
                    Tente ajustar os filtros para encontrar mais resultados.
                  </p>
                </div>
              )}
            </motion.div>
          ) : null}

          {currentTab === 'pomodoro' && (
            <motion.div
              key="pomodoro"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 pb-24"
            >
              {/* Pomodoro Timer */}
              <div className={`p-8 rounded-3xl border text-center ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <h2 className={`text-xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-stone-800'}`}>
                  {pomodoroMode === 'work' ? 'Tempo de Foco' : 'Pausa Curta'}
                </h2>
                
                <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      className={`stroke-current ${darkMode ? 'text-stone-800' : 'text-stone-100'}`}
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      className={`stroke-current ${pomodoroMode === 'work' ? 'text-indigo-500' : 'text-emerald-500'} transition-all duration-1000 ease-linear`}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 88}
                      strokeDashoffset={2 * Math.PI * 88 * (1 - pomodoroTime / (pomodoroMode === 'work' ? 25 * 60 : 5 * 60))}
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
                          const newTime = parseInt(customTimeInput);
                          if (!isNaN(newTime) && newTime > 0) {
                            setPomodoroTime(newTime * 60);
                          } else {
                            setCustomTimeInput(Math.floor(pomodoroTime / 60).toString());
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setIsEditingTime(false);
                            const newTime = parseInt(customTimeInput);
                            if (!isNaN(newTime) && newTime > 0) {
                              setPomodoroTime(newTime * 60);
                            } else {
                              setCustomTimeInput(Math.floor(pomodoroTime / 60).toString());
                            }
                          }
                        }}
                        className={`w-24 text-center bg-transparent border-b-2 outline-none ${darkMode ? 'border-stone-700 text-white' : 'border-stone-300 text-stone-800'}`}
                        autoFocus
                      />
                    ) : (
                      <span 
                        onClick={() => {
                          if (!pomodoroActive) {
                            setIsEditingTime(true);
                            setCustomTimeInput(Math.floor(pomodoroTime / 60).toString());
                          }
                        }}
                        className={!pomodoroActive ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
                        title={!pomodoroActive ? "Clique para editar o tempo" : ""}
                      >
                        {Math.floor(pomodoroTime / 60).toString().padStart(2, '0')}:{(pomodoroTime % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>
                </div>

                {!pomodoroActive && !isEditingTime && (
                  <p className={`text-xs mb-6 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                    Clique no tempo para editar (em minutos)
                  </p>
                )}

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setPomodoroActive(!pomodoroActive)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 ${
                      pomodoroMode === 'work' 
                        ? (pomodoroActive ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600')
                        : (pomodoroActive ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-500 hover:bg-emerald-600')
                    }`}
                  >
                    {pomodoroActive ? <X className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </button>
                  <button
                    onClick={() => {
                      setPomodoroActive(false);
                      setPomodoroTime(pomodoroMode === 'work' ? 25 * 60 : 5 * 60);
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors ${
                      darkMode ? 'border-stone-700 text-stone-400 hover:bg-stone-800' : 'border-stone-200 text-stone-500 hover:bg-stone-50'
                    }`}
                  >
                    <Loader2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentTab === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 pb-24"
            >
              {/* To-Do List */}
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <h3 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-stone-800'}`}>
                  <List className="w-5 h-5 text-indigo-500" />
                  Tarefas de Hoje
                </h3>
                
                <div className="flex gap-2 mb-6">
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
                    className={`flex-1 px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors ${
                      darkMode 
                        ? 'bg-stone-950 border-stone-800 text-white placeholder-stone-500' 
                        : 'bg-stone-50 border-stone-200 text-stone-800 placeholder-stone-400'
                    }`}
                  />
                  <button
                    onClick={() => {
                      if (newTaskText.trim()) {
                        setTasks([...tasks, { id: Date.now().toString(), text: newTaskText.trim(), completed: false }]);
                        setNewTaskText('');
                      }
                    }}
                    className="px-4 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {tasks.length === 0 ? (
                    <p className={`text-sm text-center py-4 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                      Nenhuma tarefa para hoje. Adicione uma acima!
                    </p>
                  ) : (
                    tasks.map(task => (
                      <div 
                        key={task.id}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                          darkMode 
                            ? `border-stone-800 ${task.completed ? 'bg-stone-950/50' : 'bg-stone-800/50'}` 
                            : `border-stone-100 ${task.completed ? 'bg-stone-50' : 'bg-white'}`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              task.completed 
                                ? 'bg-emerald-500 border-emerald-500 text-white' 
                                : darkMode ? 'border-stone-600' : 'border-stone-300'
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile Feel) */}
      <nav className={`fixed bottom-0 left-0 right-0 border-t px-4 py-4 pb-8 flex justify-around items-center z-20 transition-colors ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`} style={{paddingBottom: 'max(1rem, env(safe-area-inset-bottom))', paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))'}}>
        <button 
          onClick={() => {
            setCurrentTab('home');
            setSelectedSubjectId(null);
            window.location.hash = 'home';
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'home' ? 'text-indigo-600' : 'text-stone-400'}`}
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Início</span>
        </button>
        
        <button 
          onClick={() => {
            setCurrentTab('questions');
            window.location.hash = 'questions';
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'questions' ? 'text-indigo-600' : 'text-stone-400'}`}
        >
          <BrainCircuit className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Questões</span>
        </button>

        <button 
          onClick={() => {
            setCurrentTab('achievements');
            window.location.hash = 'achievements';
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'achievements' ? 'text-indigo-600' : 'text-stone-400'}`}
        >
          <Trophy className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Conquistas</span>
        </button>

        <button 
          onClick={() => {
            setCurrentTab('pomodoro');
            window.location.hash = 'pomodoro';
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'pomodoro' ? 'text-indigo-600' : 'text-stone-400'}`}
        >
          <Target className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Foco</span>
        </button>

        <button 
          onClick={() => {
            setCurrentTab('tasks');
            window.location.hash = 'tasks';
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'tasks' ? 'text-indigo-600' : 'text-stone-400'}`}
        >
          <List className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Tarefas</span>
        </button>
      </nav>
    </div>
  );
}
