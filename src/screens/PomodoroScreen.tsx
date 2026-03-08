import React, { useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { usePomodoro } from '../hooks/usePomodoro';
import { errorService } from '../services/errorService';

export function PomodoroScreen() {
  const { darkMode } = useApp();
  const [pomodoroState, pomodoroActions] = usePomodoro(25, 5);

  useEffect(() => {
    errorService.setCurrentScreen('PomodoroScreen');
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercentage = ((pomodoroState.initialTime - pomodoroState.time) / pomodoroState.initialTime) * 100;

  return (
    <div className={`min-h-screen pb-24 flex flex-col ${darkMode ? 'bg-stone-950' : 'bg-stone-50'}`}>
      {/* Header */}
      <header className={`px-6 pt-6 pb-4 ${darkMode ? 'bg-stone-900' : 'bg-white'} border-b ${
        darkMode ? 'border-stone-800' : 'border-stone-200'
      }`}>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
          ⏱️ Pomodoro
        </h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
          Modo: <span className="font-semibold">{pomodoroState.mode === 'work' ? '🎯 Trabalho' : '☕ Pausa'}</span>
        </p>
      </header>

      <main className="flex-1 px-6 py-6 flex flex-col items-center justify-center space-y-8">
        {/* Timer Circular */}
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Círculo de fundo */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={darkMode ? '#1c1917' : '#f5f5f4'}
              strokeWidth="8"
            />

            {/* Círculo de progresso */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={pomodoroState.mode === 'work' ? '#3b82f6' : '#10b981'}
              strokeWidth="8"
              strokeDasharray={`${(progressPercentage / 100) * 565.48} 565.48`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
          </svg>

          {/* Tempo no Centro */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className={`text-6xl font-bold font-mono ${
                pomodoroState.mode === 'work'
                  ? 'text-blue-500'
                  : 'text-green-500'
              }`}>
                {formatTime(pomodoroState.time)}
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                {pomodoroState.mode === 'work' ? 'Tempo de Trabalho' : 'Tempo de Pausa'}
              </p>
            </div>
          </div>
        </div>

        {/* Barra de Progresso Linear */}
        <div className="w-full max-w-sm">
          <div className={`w-full h-2 rounded-full overflow-hidden ${
            darkMode ? 'bg-stone-800' : 'bg-stone-200'
          }`}>
            <div
              className={`h-full transition-all duration-300 ${
                pomodoroState.mode === 'work'
                  ? 'bg-blue-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Controles */}
        <div className="flex gap-4 justify-center flex-wrap">
          {pomodoroState.isActive ? (
            <button
              onClick={pomodoroActions.pausePomodoro}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                darkMode
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              ⏸️ Pausar
            </button>
          ) : (
            <button
              onClick={pomodoroActions.startPomodoro}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              ▶️ Iniciar
            </button>
          )}

          <button
            onClick={pomodoroActions.resetPomodoro}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              darkMode
                ? 'bg-stone-700 hover:bg-stone-600 text-white'
                : 'bg-stone-300 hover:bg-stone-400 text-stone-900'
            }`}
          >
            🔄 Resetar
          </button>

          <button
            onClick={pomodoroActions.switchMode}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              darkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            🔀 Alternar
          </button>
        </div>

        {/* Customização de Tempo */}
        {pomodoroState.isEditingTime ? (
          <div className={`w-full max-w-sm rounded-xl p-6 ${
            darkMode ? 'bg-stone-900' : 'bg-white'
          } border ${darkMode ? 'border-stone-800' : 'border-stone-200'}`}>
            <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
              ⚙️ Customizar Tempo
            </h3>

            <div className="space-y-4">
              <div>
                <label className={`text-sm font-semibold block mb-2 ${
                  darkMode ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Trabalho (minutos)
                </label>
                <input
                  type="number"
                  value={pomodoroState.customWorkInput}
                  onChange={(e) => pomodoroActions.setCustomWorkTime(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-stone-800 border-stone-700 text-white'
                      : 'bg-white border-stone-200 text-stone-900'
                  }`}
                  min="1"
                  max="60"
                />
              </div>

              <div>
                <label className={`text-sm font-semibold block mb-2 ${
                  darkMode ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Pausa (minutos)
                </label>
                <input
                  type="number"
                  value={pomodoroState.customBreakInput}
                  onChange={(e) => pomodoroActions.setCustomBreakTime(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-stone-800 border-stone-700 text-white'
                      : 'bg-white border-stone-200 text-stone-900'
                  }`}
                  min="1"
                  max="30"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={pomodoroActions.applyCustomTime}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    darkMode
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  ✓ Aplicar
                </button>
                <button
                  onClick={pomodoroActions.toggleEditingTime}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    darkMode
                      ? 'bg-stone-700 hover:bg-stone-600 text-white'
                      : 'bg-stone-300 hover:bg-stone-400 text-stone-900'
                  }`}
                >
                  ✕ Cancelar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={pomodoroActions.toggleEditingTime}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              darkMode
                ? 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
            }`}
          >
            ⚙️ Customizar Tempo
          </button>
        )}

        {/* Dicas */}
        <div className={`w-full max-w-sm rounded-xl p-4 ${
          darkMode ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-100 border border-blue-300'
        }`}>
          <p className={`text-sm font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
            💡 Dica: Use Pomodoro para manter o foco e aumentar sua produtividade!
          </p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            A técnica Pomodoro divide o trabalho em intervalos de 25 minutos com pausas de 5 minutos.
          </p>
        </div>
      </main>
    </div>
  );
}
