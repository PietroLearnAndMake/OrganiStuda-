import { useMemo } from "react";
import questionsData from "../data/questions-offline.json";

export interface Question {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE?: string;
  correct_answer: string;
  discipline: string;
  subdiscipline: string;
  difficulty: string;
  year: number;
  source: string;
  exam_type: string;
  success_rate?: number;
  context_text?: string;
  explanation?: string;
  topics?: string;
  is_active: number;
}

/**
 * Hook para carregar todas as questões offline
 */
export function useOfflineQuestions() {
  return useMemo(() => questionsData as Question[], []);
}

/**
 * Hook para buscar questões por disciplina (offline)
 */
export function useOfflineQuestionsByDiscipline(discipline: string, limit = 50, offset = 0) {
  return useMemo(() => {
    const questions = questionsData as Question[];
    const filtered = questions.filter((q) => q.discipline === discipline);
    return filtered.slice(offset, offset + limit);
  }, [discipline, limit, offset]);
}

/**
 * Hook para buscar questões por dificuldade (offline)
 */
export function useOfflineQuestionsByDifficulty(difficulty: string, limit = 50, offset = 0) {
  return useMemo(() => {
    const questions = questionsData as Question[];
    const filtered = questions.filter((q) => q.difficulty === difficulty);
    return filtered.slice(offset, offset + limit);
  }, [difficulty, limit, offset]);
}

/**
 * Hook para buscar questões por ano (offline)
 */
export function useOfflineQuestionsByYear(year: number, limit = 50, offset = 0) {
  return useMemo(() => {
    const questions = questionsData as Question[];
    const filtered = questions.filter((q) => q.year === year);
    return filtered.slice(offset, offset + limit);
  }, [year, limit, offset]);
}

/**
 * Hook para buscar questões por fonte/instituição (offline)
 */
export function useOfflineQuestionsBySource(source: string, limit = 50, offset = 0) {
  return useMemo(() => {
    const questions = questionsData as Question[];
    const filtered = questions.filter((q) => q.source === source);
    return filtered.slice(offset, offset + limit);
  }, [source, limit, offset]);
}

/**
 * Hook para buscar questões aleatórias (offline)
 */
export function useOfflineRandomQuestions(discipline?: string, limit = 10) {
  return useMemo(() => {
    const questions = questionsData as Question[];
    let filtered = questions;

    if (discipline) {
      filtered = questions.filter((q) => q.discipline === discipline);
    }

    // Embaralhar e pegar limit questões
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  }, [discipline, limit]);
}

/**
 * Hook para buscar com múltiplos filtros (offline)
 */
export function useOfflineSearchQuestions(filters: {
  discipline?: string;
  difficulty?: string;
  year?: number;
  source?: string;
  limit?: number;
  offset?: number;
}) {
  return useMemo(() => {
    let questions = questionsData as Question[];

    if (filters.discipline) {
      questions = questions.filter((q) => q.discipline === filters.discipline);
    }

    if (filters.difficulty) {
      questions = questions.filter((q) => q.difficulty === filters.difficulty);
    }

    if (filters.year) {
      questions = questions.filter((q) => q.year === filters.year);
    }

    if (filters.source) {
      questions = questions.filter((q) => q.source === filters.source);
    }

    const offset = filters.offset || 0;
    const limit = filters.limit || 50;

    return questions.slice(offset, offset + limit);
  }, [filters]);
}

/**
 * Hook para contar questões (offline)
 */
export function useOfflineQuestionCount(discipline?: string) {
  return useMemo(() => {
    const questions = questionsData as Question[];

    if (discipline) {
      return questions.filter((q) => q.discipline === discipline).length;
    }

    return questions.length;
  }, [discipline]);
}

/**
 * Hook para buscar questão por ID (offline)
 */
export function useOfflineQuestionById(id: number) {
  return useMemo(() => {
    const questions = questionsData as Question[];
    return questions.find((q) => q.id === id);
  }, [id]);
}

/**
 * Hook para buscar estatísticas (offline)
 */
export function useOfflineQuestionsStats() {
  return useMemo(() => {
    const questions = questionsData as Question[];

    const disciplines = new Set(questions.map((q) => q.discipline));
    const sources = new Set(questions.map((q) => q.source));
    const years = new Set(questions.map((q) => q.year));
    const difficulties = new Set(questions.map((q) => q.difficulty));

    return {
      totalQuestions: questions.length,
      disciplines: Array.from(disciplines),
      sources: Array.from(sources),
      years: Array.from(years).sort((a, b) => b - a),
      difficulties: Array.from(difficulties),
      stats: {
        byDiscipline: Object.fromEntries(
          Array.from(disciplines).map((d) => [
            d,
            questions.filter((q) => q.discipline === d).length,
          ])
        ),
        bySource: Object.fromEntries(
          Array.from(sources).map((s) => [
            s,
            questions.filter((q) => q.source === s).length,
          ])
        ),
        byDifficulty: Object.fromEntries(
          Array.from(difficulties).map((d) => [
            d,
            questions.filter((q) => q.difficulty === d).length,
          ])
        ),
      },
    };
  }, []);
}

/**
 * Hook para buscar instituições distintas (offline)
 */
export function useOfflineInstitutions() {
  return useMemo(() => {
    const questions = questionsData as Question[];
    const sources = new Set(questions.map((q) => q.source));
    return Array.from(sources).sort();
  }, []);
}

/**
 * Hook para buscar instituições com contagem (offline)
 */
export function useOfflineInstitutionsWithCount() {
  return useMemo(() => {
    const questions = questionsData as Question[];
    const sources = new Set(questions.map((q) => q.source));

    return Array.from(sources)
      .map((source) => ({
        name: source,
        count: questions.filter((q) => q.source === source).length,
      }))
      .sort((a, b) => b.count - a.count);
  }, []);
}
