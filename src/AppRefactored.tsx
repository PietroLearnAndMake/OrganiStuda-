import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { errorService } from './services/errorService';
import { storageService } from './services/storageService';
import { HomeScreen } from './screens/HomeScreen';
import { QuestionsScreen } from './screens/QuestionsScreen';
import { PomodoroScreen } from './screens/PomodoroScreen';
import { TasksScreen } from './screens/TasksScreen';
import { AchievementsScreen } from './screens/AchievementsScreen';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Componente principal do aplicativo
 * Orquestra navegação e providers globais
 */
function AppContent() {
  const { currentTab, setCurrentTab, darkMode, isInitialized, initializationError } = useApp();

  useEffect(() => {
    errorService.setCurrentScreen('App');
    storageService.initialize().catch((error) => {
      errorService.error('Erro ao inicializar storage', { error });
    });
  }, []);

  if (!isInitialized) {
    return (
      <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-stone-950' : 'bg-stone-50'}`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
            Carregando...
          </h1>
          {initializationError && (
            <p className="text-red-500">{initializationError}</p>
          )}
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen />;
      case 'questions':
        return <QuestionsScreen />;
      case 'pomodoro':
        return <PomodoroScreen />;
      case 'tasks':
        return <TasksScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-stone-950' : 'bg-stone-50'}`}>
      {/* Conteúdo Principal */}
      <main className="pb-20">{renderScreen()}</main>

      {/* Navegação por Abas */}
      <nav className={`fixed bottom-0 left-0 right-0 border-t ${
        darkMode
          ? 'bg-stone-900 border-stone-800'
          : 'bg-white border-stone-200'
      }`}>
        <div className="flex justify-around">
          {(['home', 'questions', 'pomodoro', 'tasks', 'achievements'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`flex-1 py-4 text-center font-semibold transition-colors ${
                currentTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : darkMode
                  ? 'text-stone-400 hover:text-stone-300'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {tab === 'home' && '🏠'}
              {tab === 'questions' && '📚'}
              {tab === 'pomodoro' && '⏱️'}
              {tab === 'tasks' && '✅'}
              {tab === 'achievements' && '🏆'}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

/**
 * App com providers
 */
export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
