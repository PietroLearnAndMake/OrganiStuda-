import { useQuery } from "@tanstack/react-query";
import { trpc } from "../lib/trpc";

/**
 * Hook para buscar todas as instituições
 */
export function useInstitutions() {
  return useQuery({
    queryKey: ["institutions", "all"],
    queryFn: () => trpc.institutions.getAll.query(),
  });
}

/**
 * Hook para buscar instituições com contagem
 */
export function useInstitutionsWithCount() {
  return useQuery({
    queryKey: ["institutions", "withCount"],
    queryFn: () => trpc.institutions.getWithCount.query(),
  });
}

/**
 * Hook para buscar disciplinas
 */
export function useDisciplines() {
  return useQuery({
    queryKey: ["institutions", "disciplines"],
    queryFn: () => trpc.institutions.getDisciplines.query(),
  });
}

/**
 * Hook para buscar subdisciplinas
 */
export function useSubdisciplines() {
  return useQuery({
    queryKey: ["institutions", "subdisciplines"],
    queryFn: () => trpc.institutions.getSubdisciplines.query(),
  });
}

/**
 * Hook para buscar anos
 */
export function useYears() {
  return useQuery({
    queryKey: ["institutions", "years"],
    queryFn: () => trpc.institutions.getYears.query(),
  });
}

/**
 * Hook para buscar dificuldades
 */
export function useDifficulties() {
  return useQuery({
    queryKey: ["institutions", "difficulties"],
    queryFn: () => trpc.institutions.getDifficulties.query(),
  });
}

/**
 * Hook para buscar estatísticas de filtros
 */
export function useFilterStats() {
  return useQuery({
    queryKey: ["institutions", "stats"],
    queryFn: () => trpc.institutions.getFilterStats.query(),
  });
}
