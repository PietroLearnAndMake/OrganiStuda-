import React, { useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { errorService } from '../services/errorService';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export function AchievementsScreen() {
  const { profile, darkMode } = useApp();

  useEffect(() => {
    errorService.setCurrentScreen('AchievementsScreen');
  }, []);

  // Definir conquistas disponíveis
  const achievements: Achievement[] = [
    {
      id: 'first_question',
      name: 'Primeiro Passo',
      description: 'Responda sua primeira questão',
      icon: '🎯',
      condition: 'totalQuestions >= 1',
      unlocked: profile.stats.totalQuestions >= 1,
      unlockedDate: profile.stats.totalQuestions >= 1 ? new Date().toLocaleDateString('pt-BR') : undefined,
    },
    {
      id: 'ten_questions',
      name: 'Aprendiz',
      description: 'Responda 10 questões',
      icon: '📚',
      condition: 'totalQuestions >= 10',
      unlocked: profile.stats.totalQuestions >= 10,
    },
    {
      id: 'fifty_questions',
      name: 'Estudioso',
      description: 'Responda 50 questões',
      icon: '🎓',
      condition: 'totalQuestions >= 50',
      unlocked: profile.stats.totalQuestions >= 50,
    },
    {
      id: 'hundred_questions',
      name: 'Mestre',
      description: 'Responda 100 questões',
      icon: '👑',
      condition: 'totalQuestions >= 100',
      unlocked: profile.stats.totalQuestions >= 100,
    },
    {
      id: 'perfect_score',
      name: 'Perfeição',
      description: 'Acerte 100% em uma sessão',
      icon: '⭐',
      condition: 'accuracy === 100',
      unlocked: profile.stats.correctQuestions > 0 && profile.stats.totalQuestions > 0 &&
        (profile.stats.correctQuestions / profile.stats.totalQuestions) === 1,
    },
    {
      id: 'streak_three',
      name: 'Consistência',
      description: 'Mantenha 3 dias de streak',
      icon: '🔥',
      condition: 'streak >= 3',
      unlocked: profile.streak >= 3,
    },
    {
      id: 'streak_seven',
      name: 'Dedicação',
      description: 'Mantenha 7 dias de streak',
      icon: '🌟',
      condition: 'streak >= 7',
      unlocked: profile.streak >= 7,
    },
    {
      id: 'streak_thirty',
      name: 'Lenda',
      description: 'Mantenha 30 dias de streak',
      icon: '👹',
      condition: 'streak >= 30',
      unlocked: profile.streak >= 30,
    },
    {
      id: 'level_five',
      name: 'Ascensão',
      description: 'Atinja o nível 5',
      icon: '🚀',
      condition: 'level >= 5',
      unlocked: profile.level >= 5,
    },
    {
      id: 'level_ten',
      name: 'Supremacia',
      description: 'Atinja o nível 10',
      icon: '💎',
      condition: 'level >= 10',
      unlocked: profile.level >= 10,
    },
    {
      id: 'study_hour',
      name: 'Dedicado',
      description: 'Estude por 1 hora',
      icon: '⏱️',
      condition: 'totalStudyTime >= 60',
      unlocked: profile.totalStudyTime >= 60,
    },
    {
      id: 'study_ten_hours',
      name: 'Maratonista',
      description: 'Estude por 10 horas',
      icon: '🏃',
      condition: 'totalStudyTime >= 600',
      unlocked: profile.totalStudyTime >= 600,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const completionPercentage = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-stone-950' : 'bg-stone-50'}`}>
      {/* Header */}
      <header className={`px-6 pt-6 pb-4 ${darkMode ? 'bg-stone-900' : 'bg-white'} border-b ${
        darkMode ? 'border-stone-800' : 'border-stone-200'
      }`}>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
          🏆 Conquistas
        </h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
          {unlockedCount} de {achievements.length} desbloqueadas
        </p>
      </header>

      <main className="px-6 py-6 space-y-6">
        {/* Progresso Geral */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
          darkMode ? 'border-stone-800' : 'border-stone-200'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <p className={`text-sm font-semibold ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
              Progresso Total
            </p>
            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
              {completionPercentage}%
            </p>
          </div>
          <div className={`w-full h-3 rounded-full overflow-hidden ${
            darkMode ? 'bg-stone-800' : 'bg-stone-200'
          }`}>
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Conquistas Desbloqueadas */}
        {unlockedCount > 0 && (
          <div>
            <h2 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
              ✨ Desbloqueadas
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {achievements
                .filter((a) => a.unlocked)
                .map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`rounded-lg p-4 text-center border-2 ${
                      darkMode
                        ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-700'
                        : 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300'
                    }`}
                  >
                    <p className="text-3xl mb-2">{achievement.icon}</p>
                    <p className={`text-sm font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                      {achievement.name}
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-yellow-400/70' : 'text-yellow-700/70'}`}>
                      {achievement.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Conquistas Bloqueadas */}
        {achievements.some((a) => !a.unlocked) && (
          <div>
            <h2 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
              🔒 Bloqueadas
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {achievements
                .filter((a) => !a.unlocked)
                .map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`rounded-lg p-4 text-center border-2 opacity-60 ${
                      darkMode
                        ? 'bg-stone-900 border-stone-800'
                        : 'bg-stone-200 border-stone-300'
                    }`}
                  >
                    <p className="text-3xl mb-2 grayscale">{achievement.icon}</p>
                    <p className={`text-sm font-bold ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                      {achievement.name}
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-stone-500' : 'text-stone-600'}`}>
                      {achievement.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Estatísticas */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
          darkMode ? 'border-stone-800' : 'border-stone-200'
        }`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
            📊 Suas Estatísticas
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`text-xs font-semibold ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Questões Resolvidas
              </p>
              <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                {profile.stats.totalQuestions}
              </p>
            </div>

            <div>
              <p className={`text-xs font-semibold ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Taxa de Acerto
              </p>
              <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                {profile.stats.totalQuestions > 0
                  ? Math.round((profile.stats.correctQuestions / profile.stats.totalQuestions) * 100)
                  : 0}%
              </p>
            </div>

            <div>
              <p className={`text-xs font-semibold ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Nível Atual
              </p>
              <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                {profile.level}
              </p>
            </div>

            <div>
              <p className={`text-xs font-semibold ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Melhor Streak
              </p>
              <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                {profile.bestStreak} 🔥
              </p>
            </div>
          </div>
        </div>

        {/* Motivação */}
        <div className={`rounded-xl p-4 ${
          darkMode ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-100 border border-blue-300'
        }`}>
          <p className={`text-sm font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
            🎯 Próxima Meta:
          </p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {unlockedCount === achievements.length
              ? '🎉 Parabéns! Você desbloqueou todas as conquistas!'
              : `Desbloqueie mais ${achievements.length - unlockedCount} conquista${achievements.length - unlockedCount > 1 ? 's' : ''} continuando a estudar!`}
          </p>
        </div>
      </main>
    </div>
  );
}
