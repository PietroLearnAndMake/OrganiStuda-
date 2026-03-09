import { useQuery } from "@tanstack/react-query";
import { trpc } from "../lib/trpc";

export type Discipline = "Matemática" | "Linguagens" | "Ciências Humanas" | "Ciências da Natureza";
export type Difficulty = "Fácil" | "Média" | "Difícil";

/**
 * Hook para buscar questões por disciplina
 */
export function useQuestionsByDiscipline(discipline: Discipline, limit = 50, offset = 0) {
  return useQuery({
    queryKey: ["questions", "byDiscipline", discipline, limit, offset],
    queryFn: () =>
      trpc.questions.getByDiscipline.query({
        discipline,
        limit,
        offset,
      }),
  });
}

/**
 * Hook para buscar questões por subdisciplina
 */
export function useQuestionsBySubdiscipline(subdiscipline: string, limit = 50, offset = 0) {
  return useQuery({
    queryKey: ["questions", "bySubdiscipline", subdiscipline, limit, offset],
    queryFn: () =>
      trpc.questions.getBySubdiscipline.query({
        subdiscipline,
        limit,
        offset,
      }),
  });
}

/**
 * Hook para buscar questões por dificuldade
 */
export function useQuestionsByDifficulty(difficulty: Difficulty, limit = 50, offset = 0) {
  return useQuery({
    queryKey: ["questions", "byDifficulty", difficulty, limit, offset],
    queryFn: () =>
      trpc.questions.getByDifficulty.query({
        difficulty,
        limit,
        offset,
      }),
  });
}

/**
 * Hook para buscar questões por ano
 */
export function useQuestionsByYear(year: number, limit = 50, offset = 0) {
  return useQuery({
    queryKey: ["questions", "byYear", year, limit, offset],
    queryFn: () =>
      trpc.questions.getByYear.query({
        year,
        limit,
        offset,
      }),
  });
}

/**
 * Hook para buscar questões por fonte
 */
export function useQuestionsBySource(source: string, limit = 50, offset = 0) {
  return useQuery({
    queryKey: ["questions", "bySource", source, limit, offset],
    queryFn: () =>
      trpc.questions.getBySource.query({
        source,
        limit,
        offset,
      }),
  });
}

/**
 * Hook para buscar questões aleatórias
 */
export function useRandomQuestions(discipline?: Discipline, limit = 10) {
  return useQuery({
    queryKey: ["questions", "random", discipline, limit],
    queryFn: () =>
      trpc.questions.getRandom.query({
        discipline,
        limit,
      }),
  });
}

/**
 * Hook para buscar questões com filtros múltiplos
 */
export function useSearchQuestions(filters: {
  discipline?: Discipline;
  subdiscipline?: string;
  difficulty?: Difficulty;
  year?: number;
  source?: string;
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: ["questions", "search", filters],
    queryFn: () =>
      trpc.questions.search.query({
        discipline: filters.discipline,
        subdiscipline: filters.subdiscipline,
        difficulty: filters.difficulty,
        year: filters.year,
        source: filters.source,
        limit: filters.limit || 50,
        offset: filters.offset || 0,
      }),
  });
}

/**
 * Hook para contar questões
 */
export function useQuestionCount(discipline?: Discipline) {
  return useQuery({
    queryKey: ["questions", "count", discipline],
    queryFn: () =>
      trpc.questions.count.query({
        discipline,
      }),
  });
}

/**
 * Hook para buscar questão por ID
 */
export function useQuestionById(id: number) {
  return useQuery({
    queryKey: ["questions", "byId", id],
    queryFn: () =>
      trpc.questions.getById.query({
        id,
      }),
  });
}

/**
 * Hook para buscar estatísticas de questões
 */
export function useQuestionsStats() {
  return useQuery({
    queryKey: ["questions", "stats"],
    queryFn: () => trpc.questions.getStats.query(),
  });
}
