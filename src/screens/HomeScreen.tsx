import React, { useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { useXP } from '../hooks/useXP';
import { useStreak } from '../hooks/useStreak';
import { errorService } from '../services/errorService';

export function HomeScreen() {
  const { profile, setProfile, darkMode } = useApp();
  const [xpState] = useXP(profile.xp);
  const [streakState] = useStreak();

  useEffect(() => {
    errorService.setCurrentScreen('HomeScreen');
  }, []);

  const progressPercentage = xpState.xpProgress;
  const xpNeeded = xpState.xpForNextLevel - (xpState.xpForNextLevel - xpState.xpProgress);

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-stone-950' : 'bg-stone-50'}`}>
      {/* Header com Saudação */}
      <header className={`px-6 pt-6 pb-4 ${darkMode ? 'bg-stone-900' : 'bg-white'} border-b ${
        darkMode ? 'border-stone-800' : 'border-stone-200'
      }`}>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
          Bem-vindo, {profile.name}! 👋
        </h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </header>

      <main className="px-6 py-6 space-y-6">
        {/* Card de Nível e XP */}
        <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-500 to-blue-600'} text-white shadow-lg`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold opacity-90">Nível Atual</p>
              <h2 className="text-5xl font-bold">{xpState.level}</h2>
            </div>
            <div className="text-5xl">⭐</div>
          </div>

          {/* Barra de Progresso */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">Progresso para o próximo nível</p>
              <p className="text-sm font-bold">{progressPercentage}%</p>
            </div>
            <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs mt-2 opacity-90">
              {xpState.xp} / {xpState.xp + xpNeeded} XP
            </p>
          </div>
        </div>

        {/* Grid de Widgets */}
        <div className="grid grid-cols-2 gap-4">
          {/* Widget de Streak */}
          <div className={`rounded-xl p-4 ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
            darkMode ? 'border-stone-800' : 'border-stone-200'
          } shadow-sm`}>
            <div className="text-center">
              <p className="text-3xl mb-2">🔥</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                {streakState.streak}
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Dias consecutivos
              </p>
              <p className={`text-xs mt-2 font-semibold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                Melhor: {streakState.bestStreak}
              </p>
            </div>
          </div>

          {/* Widget de Questões */}
          <div className={`rounded-xl p-4 ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
            darkMode ? 'border-stone-800' : 'border-stone-200'
          } shadow-sm`}>
            <div className="text-center">
              <p className="text-3xl mb-2">📚</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                {profile.stats.totalQuestions}
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Questões resolvidas
              </p>
              <p className={`text-xs mt-2 font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {profile.stats.totalQuestions > 0
                  ? Math.round((profile.stats.correctQuestions / profile.stats.totalQuestions) * 100)
                  : 0}% acertos
              </p>
            </div>
          </div>

          {/* Widget de Tempo de Estudo */}
          <div className={`rounded-xl p-4 ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
            darkMode ? 'border-stone-800' : 'border-stone-200'
          } shadow-sm`}>
            <div className="text-center">
              <p className="text-3xl mb-2">⏱️</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                {Math.floor(profile.totalStudyTime / 60)}h
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Tempo total
              </p>
              <p className={`text-xs mt-2 font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {profile.totalStudyTime % 60}m hoje
              </p>
            </div>
          </div>

          {/* Widget de Sessões */}
          <div className={`rounded-xl p-4 ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
            darkMode ? 'border-stone-800' : 'border-stone-200'
          } shadow-sm`}>
            <div className="text-center">
              <p className="text-3xl mb-2">✅</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                {profile.stats.sessionsCompleted}
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Sessões completas
              </p>
              <p className={`text-xs mt-2 font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Parabéns! 🎉
              </p>
            </div>
          </div>
        </div>

        {/* Seção de Metas Semanais */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
          darkMode ? 'border-stone-800' : 'border-stone-200'
        } shadow-sm`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
            🎯 Metas Semanais
          </h3>

          <div className="space-y-4">
            {/* Meta de Questões */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className={`text-sm font-medium ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                  Questões
                </p>
                <p className={`text-sm font-bold ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                  {profile.stats.totalQuestions} / {profile.weeklyGoals?.questions || 50}
                </p>
              </div>
              <div className="w-full h-2 bg-stone-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      (profile.stats.totalQuestions / (profile.weeklyGoals?.questions || 50)) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Meta de Tempo de Estudo */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className={`text-sm font-medium ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                  Tempo de Estudo
                </p>
                <p className={`text-sm font-bold ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                  {Math.floor(profile.totalStudyTime / 60)}h / {Math.floor((profile.weeklyGoals?.studyTime || 300) / 60)}h
                </p>
              </div>
              <div className="w-full h-2 bg-stone-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      (profile.totalStudyTime / (profile.weeklyGoals?.studyTime || 300)) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação Rápida */}
        <div className="grid grid-cols-2 gap-4">
          <button className={`py-3 px-4 rounded-lg font-semibold transition-all ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}>
            📚 Responder Questão
          </button>
          <button className={`py-3 px-4 rounded-lg font-semibold transition-all ${
            darkMode
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}>
            ⏱️ Iniciar Pomodoro
          </button>
        </div>
      </main>
    </div>
  );
}
