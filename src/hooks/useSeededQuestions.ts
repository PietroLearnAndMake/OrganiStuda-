import { useEffect, useState } from "react";
import {
  initializeQuestionSeeder,
  getAllQuestionsFromStorage,
  getQuestionsByDisciplineFromStorage,
  countTotalQuestionsFromStorage,
  countQuestionsByDisciplineFromStorage,
  type Question,
} from "../services/questionSeeder";

/**
 * Hook para inicializar o seeder na primeira renderização
 */
export function useInitializeQuestionSeeder() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        await initializeQuestionSeeder();
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, []);

  return { isInitialized, isLoading, error };
}

/**
 * Hook para buscar todas as questões do seeder
 */
export function useSeededQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setIsLoading(true);
        const data = await getAllQuestionsFromStorage();
        setQuestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar questões");
      } finally {
        setIsLoading(false);
      }
    }

    fetch();
  }, []);

  return { questions, isLoading, error };
}

/**
 * Hook para buscar questões por disciplina do seeder
 */
export function useSeededQuestionsByDiscipline(
  discipline: string,
  limit = 50,
  offset = 0
) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setIsLoading(true);
        const data = await getQuestionsByDisciplineFromStorage(discipline, limit, offset);
        setQuestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar questões");
      } finally {
        setIsLoading(false);
      }
    }

    fetch();
  }, [discipline, limit, offset]);

  return { questions, isLoading, error };
}

/**
 * Hook para contar total de questões
 */
export function useSeededQuestionCount() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setIsLoading(true);
        const total = await countTotalQuestionsFromStorage();
        setCount(total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao contar questões");
      } finally {
        setIsLoading(false);
      }
    }

    fetch();
  }, []);

  return { count, isLoading, error };
}

/**
 * Hook para contar questões por disciplina
 */
export function useSeededQuestionCountByDiscipline(discipline: string) {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setIsLoading(true);
        const total = await countQuestionsByDisciplineFromStorage(discipline);
        setCount(total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao contar questões");
      } finally {
        setIsLoading(false);
      }
    }

    fetch();
  }, [discipline]);

  return { count, isLoading, error };
}
