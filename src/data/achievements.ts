import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  // ── QUESTÕES ──────────────────────────────────────────────────────────────
  {
    id: 'first_question',
    title: 'Primeira Questão',
    description: 'Respondeu sua primeira questão.',
    icon: '🎯',
    xpReward: 50,
    rarity: 'common',
    category: 'questions',
    condition: (profile) => profile.totalAnswered >= 1,
  },
  {
    id: 'questions_10',
    title: 'Estudante Dedicado',
    description: 'Respondeu 10 questões.',
    icon: '📚',
    xpReward: 100,
    rarity: 'common',
    category: 'questions',
    condition: (profile) => profile.totalAnswered >= 10,
  },
  {
    id: 'questions_25',
    title: 'Maratonista',
    description: 'Respondeu 25 questões.',
    icon: '🏃',
    xpReward: 200,
    rarity: 'common',
    category: 'questions',
    condition: (profile) => profile.totalAnswered >= 25,
  },
  {
    id: 'questions_50',
    title: 'Meio Centenário',
    description: 'Respondeu 50 questões.',
    icon: '⚡',
    xpReward: 350,
    rarity: 'rare',
    category: 'questions',
    condition: (profile) => profile.totalAnswered >= 50,
  },
  {
    id: 'questions_100',
    title: 'Centurião',
    description: 'Respondeu 100 questões.',
    icon: '💯',
    xpReward: 600,
    rarity: 'rare',
    category: 'questions',
    condition: (profile) => profile.totalAnswered >= 100,
  },
  {
    id: 'questions_250',
    title: 'Veterano',
    description: 'Respondeu 250 questões.',
    icon: '🎖️',
    xpReward: 1000,
    rarity: 'epic',
    category: 'questions',
    condition: (profile) => profile.totalAnswered >= 250,
  },
  {
    id: 'questions_500',
    title: 'Lenda do ENEM',
    description: 'Respondeu 500 questões. Incrível!',
    icon: '👑',
    xpReward: 2000,
    rarity: 'legendary',
    category: 'questions',
    condition: (profile) => profile.totalAnswered >= 500,
  },

  // ── ACERTOS ───────────────────────────────────────────────────────────────
  {
    id: 'first_correct',
    title: 'Primeiro Acerto',
    description: 'Acertou sua primeira questão.',
    icon: '✅',
    xpReward: 75,
    rarity: 'common',
    category: 'accuracy',
    condition: (profile) => profile.totalCorrect >= 1,
  },
  {
    id: 'correct_10',
    title: 'Bom de Briga',
    description: 'Acertou 10 questões.',
    icon: '🥊',
    xpReward: 150,
    rarity: 'common',
    category: 'accuracy',
    condition: (profile) => profile.totalCorrect >= 10,
  },
  {
    id: 'correct_50',
    title: 'Mente Afiada',
    description: 'Acertou 50 questões.',
    icon: '🧠',
    xpReward: 400,
    rarity: 'rare',
    category: 'accuracy',
    condition: (profile) => profile.totalCorrect >= 50,
  },
  {
    id: 'correct_100',
    title: 'Gênio em Formação',
    description: 'Acertou 100 questões.',
    icon: '🌟',
    xpReward: 800,
    rarity: 'epic',
    category: 'accuracy',
    condition: (profile) => profile.totalCorrect >= 100,
  },
  {
    id: 'accuracy_80',
    title: 'Precisão Cirúrgica',
    description: 'Atingiu 80% de acertos com pelo menos 20 questões respondidas.',
    icon: '🎯',
    xpReward: 500,
    rarity: 'epic',
    category: 'accuracy',
    condition: (profile) =>
      profile.totalAnswered >= 20 &&
      profile.totalAnswered > 0 &&
      profile.totalCorrect / profile.totalAnswered >= 0.8,
  },
  {
    id: 'accuracy_90',
    title: 'Quase Perfeito',
    description: 'Atingiu 90% de acertos com pelo menos 30 questões respondidas.',
    icon: '💎',
    xpReward: 1000,
    rarity: 'legendary',
    category: 'accuracy',
    condition: (profile) =>
      profile.totalAnswered >= 30 &&
      profile.totalAnswered > 0 &&
      profile.totalCorrect / profile.totalAnswered >= 0.9,
  },

  // ── SEQUÊNCIA DE ACERTOS ──────────────────────────────────────────────────
  {
    id: 'consecutive_3',
    title: 'Sequência Tripla',
    description: 'Acertou 3 questões seguidas.',
    icon: '🔥',
    xpReward: 120,
    rarity: 'common',
    category: 'accuracy',
    condition: (profile) => profile.bestConsecutive >= 3,
  },
  {
    id: 'consecutive_5',
    title: 'Em Chamas',
    description: 'Acertou 5 questões seguidas.',
    icon: '🔥🔥',
    xpReward: 250,
    rarity: 'rare',
    category: 'accuracy',
    condition: (profile) => profile.bestConsecutive >= 5,
  },
  {
    id: 'consecutive_10',
    title: 'Imparável',
    description: 'Acertou 10 questões seguidas.',
    icon: '⚡🔥',
    xpReward: 600,
    rarity: 'epic',
    category: 'accuracy',
    condition: (profile) => profile.bestConsecutive >= 10,
  },

  // ── TÓPICOS ───────────────────────────────────────────────────────────────
  {
    id: 'topic_1',
    title: 'Primeiros Passos',
    description: 'Concluiu seu primeiro tópico de estudo.',
    icon: '📖',
    xpReward: 80,
    rarity: 'common',
    category: 'topics',
    condition: (_p, subjects) =>
      subjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0) >= 1,
  },
  {
    id: 'topic_5',
    title: 'Construindo Bases',
    description: 'Concluiu 5 tópicos de estudo.',
    icon: '🏗️',
    xpReward: 200,
    rarity: 'common',
    category: 'topics',
    condition: (_p, subjects) =>
      subjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0) >= 5,
  },
  {
    id: 'topic_15',
    title: 'Aluno Aplicado',
    description: 'Concluiu 15 tópicos de estudo.',
    icon: '🎓',
    xpReward: 400,
    rarity: 'rare',
    category: 'topics',
    condition: (_p, subjects) =>
      subjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0) >= 15,
  },
  {
    id: 'topic_30',
    title: 'Mestre dos Conteúdos',
    description: 'Concluiu 30 tópicos de estudo.',
    icon: '🏆',
    xpReward: 700,
    rarity: 'epic',
    category: 'topics',
    condition: (_p, subjects) =>
      subjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0) >= 30,
  },
  {
    id: 'subject_complete',
    title: 'Matéria Dominada',
    description: 'Concluiu todos os tópicos de uma matéria.',
    icon: '🥇',
    xpReward: 800,
    rarity: 'epic',
    category: 'topics',
    condition: (_p, subjects) =>
      subjects.some(s => s.topics.length > 0 && s.topics.every(t => t.completed)),
  },
  {
    id: 'all_subjects',
    title: 'Pronto para o ENEM',
    description: 'Concluiu todos os tópicos de todas as matérias!',
    icon: '🚀',
    xpReward: 5000,
    rarity: 'legendary',
    category: 'topics',
    condition: (_p, subjects) =>
      subjects.length > 0 &&
      subjects.every(s => s.topics.length > 0 && s.topics.every(t => t.completed)),
  },

  // ── STREAK ────────────────────────────────────────────────────────────────
  {
    id: 'streak_3',
    title: 'Consistente',
    description: 'Estudou 3 dias seguidos.',
    icon: '📅',
    xpReward: 150,
    rarity: 'common',
    category: 'streak',
    condition: (profile) => profile.streak >= 3,
  },
  {
    id: 'streak_7',
    title: 'Semana Perfeita',
    description: 'Estudou 7 dias seguidos.',
    icon: '🗓️',
    xpReward: 350,
    rarity: 'rare',
    category: 'streak',
    condition: (profile) => profile.streak >= 7,
  },
  {
    id: 'streak_15',
    title: 'Quinzena de Ouro',
    description: 'Estudou 15 dias seguidos.',
    icon: '🌙',
    xpReward: 700,
    rarity: 'epic',
    category: 'streak',
    condition: (profile) => profile.streak >= 15,
  },
  {
    id: 'streak_30',
    title: 'Mês Dedicado',
    description: 'Estudou 30 dias seguidos. Você é incrível!',
    icon: '🌟',
    xpReward: 1500,
    rarity: 'legendary',
    category: 'streak',
    condition: (profile) => profile.streak >= 30,
  },
];

export const XP_PER_LEVEL = (level: number): number => Math.floor(100 * Math.pow(1.4, level - 1));

export const getTotalXpForLevel = (level: number): number => {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += XP_PER_LEVEL(i);
  }
  return total;
};

export const getLevelFromXp = (xp: number): number => {
  let level = 1;
  let accumulated = 0;
  while (accumulated + XP_PER_LEVEL(level) <= xp) {
    accumulated += XP_PER_LEVEL(level);
    level++;
  }
  return level;
};

export const getXpProgressInLevel = (xp: number): { current: number; needed: number; percentage: number } => {
  const level = getLevelFromXp(xp);
  const xpForCurrentLevel = getTotalXpForLevel(level);
  const xpNeededForNext = XP_PER_LEVEL(level);
  const current = xp - xpForCurrentLevel;
  return {
    current,
    needed: xpNeededForNext,
    percentage: Math.min(100, Math.round((current / xpNeededForNext) * 100)),
  };
};

export const RARITY_COLORS: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  common: {
    bg: 'bg-stone-100 dark:bg-stone-800',
    text: 'text-stone-600 dark:text-stone-300',
    border: 'border-stone-200 dark:border-stone-700',
    badge: 'bg-stone-200 text-stone-600 dark:bg-stone-700 dark:text-stone-300',
  },
  rare: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  },
  epic: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  },
  legendary: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  },
};

export const RARITY_LABELS: Record<string, string> = {
  common: 'Comum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário',
};
