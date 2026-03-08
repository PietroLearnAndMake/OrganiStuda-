import React, { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { filterQuestions, getQuestionStats } from '../services/questionService';
import { errorService } from '../services/errorService';

export function QuestionsScreen() {
  const { savedQuestions, subjects, darkMode } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('');
  const [filteredQuestions, setFilteredQuestions] = useState(savedQuestions);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    errorService.setCurrentScreen('QuestionsScreen');
  }, []);

  useEffect(() => {
    const filtered = filterQuestions(savedQuestions, {
      institution: selectedInstitution || undefined,
    });
    setFilteredQuestions(filtered);
  }, [savedQuestions, selectedInstitution]);

  const institutions = Array.from(new Set(savedQuestions.map((q) => q.institution || 'Geral')));

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-stone-950' : 'bg-stone-50'}`}>
      {/* Header */}
      <header className={`px-6 pt-6 pb-4 ${darkMode ? 'bg-stone-900' : 'bg-white'} border-b ${
        darkMode ? 'border-stone-800' : 'border-stone-200'
      }`}>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
          📚 Questões
        </h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
          {filteredQuestions.length} questões disponíveis
        </p>
      </header>

      <main className="px-6 py-6 space-y-6">
        {/* Filtros */}
        <div className={`rounded-xl p-4 ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
          darkMode ? 'border-stone-800' : 'border-stone-200'
        }`}>
          <h3 className={`text-sm font-bold mb-3 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
            Filtros
          </h3>

          <div className="space-y-3">
            {/* Filtro por Instituição */}
            <div>
              <label className={`text-xs font-semibold block mb-2 ${
                darkMode ? 'text-stone-300' : 'text-stone-700'
              }`}>
                Instituição
              </label>
              <select
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-stone-800 border-stone-700 text-white'
                    : 'bg-white border-stone-200 text-stone-900'
                } text-sm`}
              >
                <option value="">Todas as instituições</option>
                {institutions.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por Assunto */}
            <div>
              <label className={`text-xs font-semibold block mb-2 ${
                darkMode ? 'text-stone-300' : 'text-stone-700'
              }`}>
                Assunto
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-stone-800 border-stone-700 text-white'
                    : 'bg-white border-stone-200 text-stone-900'
                } text-sm`}
              >
                <option value="">Todos os assuntos</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Questões */}
        <div className="space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className={`rounded-xl p-8 text-center ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
              darkMode ? 'border-stone-800' : 'border-stone-200'
            }`}>
              <p className={`text-lg font-semibold ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                Nenhuma questão encontrada
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-stone-500' : 'text-stone-500'}`}>
                Tente ajustar os filtros
              </p>
            </div>
          ) : (
            filteredQuestions.map((question) => {
              const stats = getQuestionStats(question);
              const isExpanded = expandedId === question.id;

              return (
                <div
                  key={question.id}
                  className={`rounded-xl border ${
                    darkMode
                      ? 'bg-stone-900 border-stone-800 hover:border-stone-700'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  } transition-all cursor-pointer`}
                  onClick={() => setExpandedId(isExpanded ? null : question.id)}
                >
                  <div className="p-4">
                    {/* Cabeçalho da Questão */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className={`text-xs font-bold mb-1 ${
                          darkMode ? 'text-stone-400' : 'text-stone-600'
                        }`}>
                          {question.id}
                        </p>
                        <p className={`text-sm font-semibold line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-stone-900'
                        }`}>
                          {question.text}
                        </p>
                      </div>
                      <span className="text-xl ml-2">
                        {isExpanded ? '▼' : '▶'}
                      </span>
                    </div>

                    {/* Metadados */}
                    <div className="flex gap-2 flex-wrap mt-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        darkMode
                          ? 'bg-blue-900/50 text-blue-300'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {question.institution || 'Geral'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        darkMode
                          ? 'bg-purple-900/50 text-purple-300'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {question.year || 'S/A'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        stats.accuracy >= 70
                          ? darkMode
                            ? 'bg-green-900/50 text-green-300'
                            : 'bg-green-100 text-green-700'
                          : darkMode
                          ? 'bg-orange-900/50 text-orange-300'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {stats.accuracy}% acertos
                      </span>
                    </div>

                    {/* Conteúdo Expandido */}
                    {isExpanded && (
                      <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-stone-800' : 'border-stone-200'}`}>
                        {/* Opções */}
                        <div className="space-y-2 mb-4">
                          <p className={`text-xs font-bold ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                            Opções:
                          </p>
                          {question.options.map((option, idx) => (
                            <div
                              key={idx}
                              className={`p-2 rounded text-sm ${
                                darkMode
                                  ? 'bg-stone-800 text-stone-300'
                                  : 'bg-stone-100 text-stone-700'
                              }`}
                            >
                              <span className="font-semibold">{String.fromCharCode(65 + idx)})</span> {option}
                            </div>
                          ))}
                        </div>

                        {/* Resposta Correta */}
                        <div className={`p-3 rounded mb-4 ${
                          darkMode
                            ? 'bg-green-900/30 border border-green-800'
                            : 'bg-green-100 border border-green-300'
                        }`}>
                          <p className={`text-xs font-bold ${
                            darkMode ? 'text-green-300' : 'text-green-700'
                          }`}>
                            Resposta: {String.fromCharCode(65 + question.correctAnswer)}
                          </p>
                        </div>

                        {/* Explicação */}
                        {question.explanation && (
                          <div className={`p-3 rounded mb-4 ${
                            darkMode
                              ? 'bg-blue-900/30 border border-blue-800'
                              : 'bg-blue-100 border border-blue-300'
                          }`}>
                            <p className={`text-xs font-bold mb-1 ${
                              darkMode ? 'text-blue-300' : 'text-blue-700'
                            }`}>
                              Explicação:
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                              {question.explanation}
                            </p>
                          </div>
                        )}

                        {/* Estatísticas */}
                        <div className={`p-3 rounded ${
                          darkMode
                            ? 'bg-stone-800'
                            : 'bg-stone-100'
                        }`}>
                          <p className={`text-xs font-bold mb-2 ${
                            darkMode ? 'text-stone-300' : 'text-stone-700'
                          }`}>
                            Estatísticas:
                          </p>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <p className={darkMode ? 'text-stone-400' : 'text-stone-600'}>Tentativas</p>
                              <p className={`font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                                {stats.totalAttempts}
                              </p>
                            </div>
                            <div>
                              <p className={darkMode ? 'text-stone-400' : 'text-stone-600'}>Acertos</p>
                              <p className={`font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                                {stats.correctAttempts}
                              </p>
                            </div>
                            <div>
                              <p className={darkMode ? 'text-stone-400' : 'text-stone-600'}>Taxa</p>
                              <p className={`font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                                {stats.accuracy}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
