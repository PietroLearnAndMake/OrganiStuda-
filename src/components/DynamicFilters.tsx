import React, { useState } from "react";
import { useFilterStats, useInstitutionsWithCount, useDifficulties, useYears } from "@/hooks/useFilters";

export interface FilterOptions {
  institution?: string;
  discipline?: string;
  difficulty?: string;
  year?: number;
}

interface DynamicFiltersProps {
  onFilterChange?: (filters: FilterOptions) => void;
}

/**
 * Componente de Filtros Dinâmicos
 * Busca dados reais do banco em vez de usar listas hardcoded
 */
export function DynamicFilters({ onFilterChange }: DynamicFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({});

  // Buscar dados dinâmicos do banco
  const { data: stats, isLoading: statsLoading } = useFilterStats();
  const { data: institutions, isLoading: institutionsLoading } = useInstitutionsWithCount();
  const { data: difficulties, isLoading: difficultiesLoading } = useDifficulties();
  const { data: years, isLoading: yearsLoading } = useYears();

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const isLoading = statsLoading || institutionsLoading || difficultiesLoading || yearsLoading;

  return (
    <div className="w-full space-y-4 p-4 bg-white rounded-lg shadow-sm">
      {/* Contador de Resultados Dinâmico */}
      <div className="text-lg font-semibold text-gray-800">
        {isLoading ? (
          <span className="text-gray-500">Carregando...</span>
        ) : (
          <span>
            Resultados{" "}
            <span className="text-blue-600">
              ({stats?.totalQuestions?.toLocaleString("pt-BR") || 0})
            </span>
          </span>
        )}
      </div>

      {/* Estatísticas Gerais */}
      {stats && !isLoading && (
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div>📚 {stats.disciplines} disciplinas</div>
          <div>🏛️ {stats.institutions} instituições</div>
          <div>📅 {stats.years} anos</div>
          <div>⭐ {stats.difficulties} dificuldades</div>
        </div>
      )}

      {/* Filtro: Instituição */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Instituição
        </label>
        <select
          value={filters.institution || ""}
          onChange={(e) => handleFilterChange("institution", e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={institutionsLoading}
        >
          <option value="">Todas as instituições</option>
          {institutions?.map((inst) => (
            <option key={inst.name} value={inst.name}>
              {inst.name} ({inst.count})
            </option>
          ))}
        </select>
      </div>

      {/* Filtro: Dificuldade */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dificuldade
        </label>
        <select
          value={filters.difficulty || ""}
          onChange={(e) => handleFilterChange("difficulty", e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={difficultiesLoading}
        >
          <option value="">Todas as dificuldades</option>
          {difficulties?.map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro: Ano */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ano
        </label>
        <select
          value={filters.year || ""}
          onChange={(e) => handleFilterChange("year", e.target.value ? parseInt(e.target.value) : undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={yearsLoading}
        >
          <option value="">Todos os anos</option>
          {years?.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Botão Limpar Filtros */}
      {Object.keys(filters).length > 0 && (
        <button
          onClick={() => {
            setFilters({});
            onFilterChange?.({});
          }}
          className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Limpar Filtros
        </button>
      )}
    </div>
  );
}
