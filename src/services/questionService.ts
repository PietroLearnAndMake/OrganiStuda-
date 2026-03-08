import { SavedQuestion, Question } from '../types';

/**
 * Gera um ID único para uma questão no formato: PROVA_ANO_MATERIA_NUMERO
 * Exemplo: ENEM_2018_MT_Q12
 */
export function generateQuestionId(
  institution: string,
  year: number,
  discipline: string,
  number: number
): string {
  const inst = institution.toUpperCase().slice(0, 6);
  const disc = discipline.toUpperCase().slice(0, 3);
  return `${inst}_${year}_${disc}_Q${String(number).padStart(2, '0')}`;
}

/**
 * Verifica se uma questão é duplicada baseado em critérios específicos
 */
export function isDuplicate(
  newQuestion: Question,
  existingQuestions: SavedQuestion[]
): boolean {
  return existingQuestions.some((existing) => {
    return (
      existing.text === newQuestion.text &&
      existing.year === newQuestion.year &&
      existing.institution === newQuestion.institution &&
      existing.topic === newQuestion.topic
    );
  });
}

/**
 * Adiciona uma questão com validação de duplicata
 */
export function addQuestion(
  question: Question,
  subjectId: string,
  existingQuestions: SavedQuestion[]
): SavedQuestion | null {
  // Validar duplicata
  if (isDuplicate(question, existingQuestions)) {
    console.warn('Questão duplicada detectada:', question);
    return null;
  }

  // Gerar ID único
  const id = generateQuestionId(
    question.institution || 'UNKNOWN',
    question.year || new Date().getFullYear(),
    question.topic || 'GENERAL',
    existingQuestions.length + 1
  );

  const savedQuestion: SavedQuestion = {
    ...question,
    id,
    subjectId,
    attempts: [],
  };

  return savedQuestion;
}

/**
 * Registra uma tentativa de resposta
 */
export function recordAttempt(
  question: SavedQuestion,
  selectedOption: number,
  isCorrect: boolean
): SavedQuestion {
  return {
    ...question,
    attempts: [
      ...question.attempts,
      {
        timestamp: Date.now(),
        selectedOption,
        isCorrect,
      },
    ],
  };
}

/**
 * Calcula estatísticas de uma questão
 */
export function getQuestionStats(question: SavedQuestion) {
  const totalAttempts = question.attempts.length;
  const correctAttempts = question.attempts.filter((a) => a.isCorrect).length;
  const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  return {
    totalAttempts,
    correctAttempts,
    accuracy,
    lastAttempt: question.attempts[question.attempts.length - 1] || null,
  };
}

/**
 * Filtra questões por critérios
 */
export function filterQuestions(
  questions: SavedQuestion[],
  filters: {
    institution?: string;
    discipline?: string;
    topic?: string;
    minAccuracy?: number;
  }
): SavedQuestion[] {
  return questions.filter((q) => {
    if (filters.institution && q.institution !== filters.institution) {
      return false;
    }
    if (filters.discipline && !q.id.includes(filters.discipline.toUpperCase())) {
      return false;
    }
    if (filters.topic && q.topic !== filters.topic) {
      return false;
    }
    if (filters.minAccuracy !== undefined) {
      const stats = getQuestionStats(q);
      if (stats.accuracy < filters.minAccuracy) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Obtém questões com erros (acurácia baixa)
 */
export function getErrorQuestions(questions: SavedQuestion[], threshold: number = 50): SavedQuestion[] {
  return questions.filter((q) => {
    const stats = getQuestionStats(q);
    return stats.accuracy < threshold && stats.totalAttempts > 0;
  });
}

/**
 * Exporta questões para JSON
 */
export function exportQuestions(questions: SavedQuestion[]): string {
  return JSON.stringify(questions, null, 2);
}

/**
 * Importa questões de JSON
 */
export function importQuestions(jsonString: string): SavedQuestion[] {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Erro ao importar questões:', error);
    return [];
  }
}
