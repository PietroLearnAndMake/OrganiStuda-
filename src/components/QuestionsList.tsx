import React, { useState } from "react";
import { useSearchQuestions, useQuestionCount, useQuestionsStats } from "@/hooks/useQuestions";
import { useFilterStats } from "@/hooks/useFilters";
import { FilterOptions } from "./DynamicFilters";

interface QuestionsListProps {
  filters?: FilterOptions;
  limit?: number;
}

/**
 * Componente de Lista de Questões com Contador Dinâmico
 */
export function QuestionsList({ filters, limit = 50 }: QuestionsListProps) {
  const [offset, setOffset] = useState(0);

  // Buscar estatísticas gerais
  const { data: stats, isLoading: statsLoading } = useFilterStats();

  // Buscar questões com filtros
  // Buscar questões com filtros
  const { data: questions, isLoading: questionsLoading } = useSearchQuestions({
    discipline: filters?.discipline as any,
    difficulty: filters?.difficulty as any,
    year: filters?.year,
    limit,
    offset,
  });

  const isLoading = statsLoading || questionsLoading;

  return (
    <div className="w-full space-y-4">
      {/* Cabeçalho com Contador Dinâmico */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 className="text-xl font-bold text-gray-800">
          {isLoading ? (
            <span className="text-gray-500">Carregando...</span>
          ) : (
            <>
              Questões Disponíveis:{" "}
              <span className="text-blue-600">
                {stats?.totalQuestions ? stats.totalQuestions.toLocaleString("pt-BR") : 0}
              </span>
            </>
          )}
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          {stats && (
            <>
              {stats.institutions} instituições • {stats.disciplines} disciplinas •{" "}
              {stats.years} anos • {stats.difficulties} dificuldades
            </>
          )}
        </p>
      </div>

      {/* Lista de Questões */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Carregando questões...</div>
        ) : questions && questions.length > 0 ? (
          <>
            {questions.map((question) => (
              <div
                key={question.id}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {question.source} {question.year}
                  </span>
                  <span className="text-xs font-medium text-gray-600">
                    {question.difficulty}
                  </span>
                </div>

                <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                  {question.text}
                </h3>

                <div className="text-xs text-gray-500">
                  <span className="inline-block mr-3">📚 {question.discipline}</span>
                  <span className="inline-block">📖 {question.subdiscipline}</span>
                </div>

                <div className="mt-3 flex gap-2">
                  {question.optionA && (
                    <button className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                      A
                    </button>
                  )}
                  {question.optionB && (
                    <button className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                      B
                    </button>
                  )}
                  {question.optionC && (
                    <button className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                      C
                    </button>
                  )}
                  {question.optionD && (
                    <button className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                      D
                    </button>
                  )}
                  {question.optionE && (
                    <button className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                      E
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Paginação */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setOffset(Math.max(0, offset - limit))}
                disabled={offset === 0}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Anterior
              </button>

              <span className="text-sm text-gray-600">
                Página {Math.floor(offset / limit) + 1}
              </span>

              <button
                onClick={() => setOffset(offset + limit)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Próxima →
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Nenhuma questão encontrada com os filtros selecionados.
          </div>
        )}
      </div>
    </div>
  );
}
