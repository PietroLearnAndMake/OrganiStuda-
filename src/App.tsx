import React, { useState, useEffect, useMemo } from 'react';
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
  Share2
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
  const [profile, setProfile] = useState<UserProfile>({ name: 'Estudante', photo: null });
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'home' | 'achievements' | 'questions'>('home');
  const [isInitialized, setIsInitialized] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  
  // Question Generator State
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([]);
  const [selectedSubjectForQuestion, setSelectedSubjectForQuestion] = useState<string>('geral');
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Load data from localStorage
  useEffect(() => {
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
      setProfile(JSON.parse(savedProfile));
    }

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }

    if (savedQs) {
      setSavedQuestions(JSON.parse(savedQs));
    }
    
    // Simple hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#questions') {
        setCurrentTab('questions');
      } else if (hash === '#achievements') {
        setCurrentTab('achievements');
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
    }
  }, [subjects, profile, isInitialized, darkMode, savedQuestions]);

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

  const selectQuestion = async () => {
    setLoadingQuestion(true);
    setSelectedOption(null);
    setShowExplanation(false);

    try {
      const subject = subjects.find(s => s.id === selectedSubjectForQuestion);
      
      let allPreDefined: SavedQuestion[] = [];
      
      // Collect all questions from the selected subject or all subjects if 'geral'
      const subjectsToSearch = selectedSubjectForQuestion === 'geral' ? subjects : (subject ? [subject] : []);
      
      subjectsToSearch.forEach(s => {
        s.topics.forEach(t => {
          if (t.questions && t.questions.length > 0) {
            t.questions.forEach((q, idx) => {
              allPreDefined.push({
                ...q,
                id: `pre-${t.id}-${idx}`,
                subjectId: s.id,
                attempts: []
              });
            });
          }
        });
      });

      if (allPreDefined.length === 0) {
        alert("Não há questões cadastradas para este tema no momento.");
        setLoadingQuestion(false);
        return;
      }

      // Prioritize questions that haven't been done yet (no successful attempts in savedQuestions)
      // First, check which of these IDs are already in savedQuestions and have a correct attempt
      const getCorrectAttemptsCount = (qId: string) => {
        const saved = savedQuestions.find(sq => sq.id === qId);
        return saved ? saved.attempts.filter(a => a.isCorrect).length : 0;
      };

      const unattempted = allPreDefined.filter(pq => getCorrectAttemptsCount(pq.id) === 0);
      
      let selectedPre: SavedQuestion;
      
      if (unattempted.length > 0) {
        // Pick a random unattempted question
        selectedPre = unattempted[Math.floor(Math.random() * unattempted.length)];
      } else {
        // All questions have been answered correctly at least once, pick a random one from all
        selectedPre = allPreDefined[Math.floor(Math.random() * allPreDefined.length)];
      }

      // Check if it's already in savedQuestions to preserve history, or add it
      const existing = savedQuestions.find(sq => sq.id === selectedPre.id);
      if (!existing) {
        setSavedQuestions(prev => [selectedPre, ...prev]);
      }
      
      setActiveQuestionId(selectedPre.id);
    } catch (error: any) {
      console.error("Erro ao selecionar questão:", error);
      alert("Ocorreu um erro ao selecionar a questão. Tente novamente.");
    } finally {
      setLoadingQuestion(false);
    }
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
  };

  const redoQuestion = (qId: string) => {
    setActiveQuestionId(qId);
    setSelectedOption(null);
    setShowExplanation(false);
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className={`w-16 h-16 rounded-full border-2 overflow-hidden flex items-center justify-center transition-colors ${darkMode ? 'bg-stone-800 border-stone-700' : 'bg-stone-100 border-stone-200'}`}>
                {profile.photo ? (
                  <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <User className={`w-8 h-8 ${darkMode ? 'text-stone-600' : 'text-stone-400'}`} />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full cursor-pointer shadow-lg hover:bg-indigo-700 transition-colors">
                <Camera className="w-3.5 h-3.5" />
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
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
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  const url = window.location.origin + window.location.pathname;
                  navigator.clipboard.writeText(url);
                  alert("Link do App copiado!");
                }}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-stone-800 text-stone-400' : 'bg-stone-100 text-stone-500'}`}
                title="Compartilhar App"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-stone-800 text-yellow-400' : 'bg-stone-100 text-stone-600'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-indigo-600 leading-none">{overallPercentage}%</div>
              <div className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}>Progresso Total</div>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className={`w-full h-2.5 rounded-full overflow-hidden transition-colors ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${overallPercentage}%` }}
            className="h-full bg-indigo-600"
          />
        </div>
      </header>

      <main className="px-6 mt-8">
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
                      <div
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
                              <div className={`p-4 rounded-2xl ${subject.color} text-white shadow-md`}>
                                <Icon className="w-8 h-8" />
                              </div>
                              <div>
                                <h3 className={`font-bold text-lg leading-tight ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>{subject.name}</h3>
                                <p className={`text-xs mt-1 ${darkMode ? 'text-stone-500' : 'text-stone-500'}`}>{completed} de {total} tópicos</p>
                              </div>
                            </button>
                          </div>
                        
                        <div className="space-y-2 text-center">
                          <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                            Progresso: {percent}%
                          </div>
                          <div className={`h-1.5 w-full rounded-full overflow-hidden ${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percent}%` }}
                              className={`h-full ${subject.color}`}
                            />
                          </div>
                        </div>
                      </div>
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
          ) : (
            <motion.div 
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col gap-4 mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-bold text-lg">Gerador de Questões</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        const url = `${window.location.origin}${window.location.pathname}#questions`;
                        navigator.clipboard.writeText(url);
                        alert("Link copiado! Compartilhe este link para abrir o Gerador de Questões diretamente.");
                      }}
                      className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-stone-400 hover:bg-stone-800' : 'text-stone-500 hover:bg-stone-100'}`}
                      title="Compartilhar Link"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={selectQuestion}
                      disabled={loadingQuestion}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                    >
                      {loadingQuestion ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      Nova Questão
                    </button>
                  </div>
                </div>

                {/* Subject Selector for Questions */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  <button
                    onClick={() => setSelectedSubjectForQuestion('geral')}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      selectedSubjectForQuestion === 'geral'
                        ? 'bg-indigo-600 text-white'
                        : darkMode ? 'bg-stone-900 text-stone-500 border border-stone-800' : 'bg-white text-stone-500 border border-stone-200'
                    }`}
                  >
                    Geral
                  </button>
                  {subjects.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSubjectForQuestion(s.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                        selectedSubjectForQuestion === s.id
                          ? 'bg-indigo-600 text-white'
                          : darkMode ? 'bg-stone-900 text-stone-500 border border-stone-800' : 'bg-white text-stone-500 border border-stone-200'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {loadingQuestion && (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                  <p className={`font-medium animate-pulse ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>Criando questão personalizada...</p>
                </div>
              )}

              {activeQuestionId ? (
                (() => {
                  const q = savedQuestions.find(sq => sq.id === activeQuestionId);
                  if (!q) return null;
                  
                  const lastAttempt = q.attempts[q.attempts.length - 1];
                  const isAnswered = !!lastAttempt && selectedOption !== null;
                  const isRedo = q.attempts.length > 1;

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
                            Oficial ENEM
                          </span>
                        </div>
                        <button 
                          onClick={() => setActiveQuestionId(null)}
                          className={`text-xs font-bold ${darkMode ? 'text-stone-500' : 'text-stone-400'}`}
                        >
                          Fechar
                        </button>
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
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })()
              ) : (
                <div className="space-y-4">
                  <h3 className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-stone-700' : 'text-stone-400'}`}>Histórico de Questões</h3>
                  
                  {savedQuestions.filter(q => selectedSubjectForQuestion === 'geral' || q.subjectId === selectedSubjectForQuestion).length > 0 ? (
                    <div className="space-y-3">
                      {savedQuestions
                        .filter(q => selectedSubjectForQuestion === 'geral' || q.subjectId === selectedSubjectForQuestion)
                        .map((q) => {
                          const lastAttempt = q.attempts[q.attempts.length - 1];
                          const isCorrect = lastAttempt?.isCorrect;
                          const redoCount = q.attempts.length;

                          return (
                            <div 
                              key={q.id}
                              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}
                            >
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>{q.text}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  {lastAttempt ? (
                                    <div className="flex items-center gap-1.5">
                                      <div className={`w-2 h-2 rounded-full ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                      <span className={`text-[10px] font-black uppercase tracking-tighter ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {isCorrect ? 'Green' : 'Red'} {redoCount > 1 && `(Refeita ${redoCount-1}x)`}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className={`text-[10px] font-black uppercase tracking-tighter ${darkMode ? 'text-stone-600' : 'text-stone-400'}`}>Não respondida</span>
                                  )}
                                </div>
                              </div>
                              <button 
                                onClick={() => redoQuestion(q.id)}
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
                  ) : (
                    <div className={`p-12 rounded-2xl border border-dashed text-center ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-300'}`}>
                      <BrainCircuit className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-stone-800' : 'text-stone-200'}`} />
                      <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-stone-300' : 'text-stone-800'}`}>Banco de Questões</h3>
                      <p className={`text-sm max-w-xs mx-auto ${darkMode ? 'text-stone-500' : 'text-stone-500'}`}>
                        Pratique com questões oficiais do ENEM selecionadas para o seu progresso.
                      </p>
                      <button 
                        onClick={selectQuestion}
                        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-colors"
                      >
                        Começar a Praticar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile Feel) */}
      <nav className={`fixed bottom-0 left-0 right-0 border-t px-4 py-4 flex justify-around items-center z-20 transition-colors ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
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
      </nav>
    </div>
  );
}
