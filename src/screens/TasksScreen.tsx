import React, { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { errorService } from '../services/errorService';

export function TasksScreen() {
  const { tasks, setTasks, darkMode } = useApp();
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    errorService.setCurrentScreen('TasksScreen');
  }, []);

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: `task_${Date.now()}`,
        text: newTaskText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      errorService.info('Tarefa adicionada com sucesso', { taskText: newTaskText });
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    errorService.info('Tarefa removida', { taskId: id });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-stone-950' : 'bg-stone-50'}`}>
      {/* Header */}
      <header className={`px-6 pt-6 pb-4 ${darkMode ? 'bg-stone-900' : 'bg-white'} border-b ${
        darkMode ? 'border-stone-800' : 'border-stone-200'
      }`}>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
          ✅ Tarefas
        </h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
          {completedCount} de {tasks.length} concluídas
        </p>
      </header>

      <main className="px-6 py-6 space-y-6">
        {/* Progresso */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
          darkMode ? 'border-stone-800' : 'border-stone-200'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <p className={`text-sm font-semibold ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
              Progresso
            </p>
            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-stone-900'}`}>
              {completionPercentage}%
            </p>
          </div>
          <div className={`w-full h-3 rounded-full overflow-hidden ${
            darkMode ? 'bg-stone-800' : 'bg-stone-200'
          }`}>
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Adicionar Tarefa */}
        <div className={`rounded-xl p-4 ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
          darkMode ? 'border-stone-800' : 'border-stone-200'
        }`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Adicionar nova tarefa..."
              className={`flex-1 px-4 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-stone-800 border-stone-700 text-white placeholder-stone-500'
                  : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400'
              } text-sm`}
            />
            <button
              onClick={addTask}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              +
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2">
          {(['all', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === f
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : darkMode
                  ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {f === 'all' && `Todas (${tasks.length})`}
              {f === 'pending' && `Pendentes (${tasks.filter((t) => !t.completed).length})`}
              {f === 'completed' && `Concluídas (${completedCount})`}
            </button>
          ))}
        </div>

        {/* Lista de Tarefas */}
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className={`rounded-xl p-8 text-center ${darkMode ? 'bg-stone-900' : 'bg-white'} border ${
              darkMode ? 'border-stone-800' : 'border-stone-200'
            }`}>
              <p className={`text-lg font-semibold ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                {filter === 'all' && 'Nenhuma tarefa'}
                {filter === 'pending' && 'Todas as tarefas concluídas! 🎉'}
                {filter === 'completed' && 'Nenhuma tarefa concluída ainda'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`rounded-lg p-4 flex items-center gap-3 border transition-all ${
                  task.completed
                    ? darkMode
                      ? 'bg-stone-900/50 border-stone-800 opacity-60'
                      : 'bg-stone-100 border-stone-200 opacity-60'
                    : darkMode
                    ? 'bg-stone-900 border-stone-800 hover:border-stone-700'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    task.completed
                      ? darkMode
                        ? 'bg-green-600 border-green-600'
                        : 'bg-green-500 border-green-500'
                      : darkMode
                      ? 'border-stone-600 hover:border-stone-500'
                      : 'border-stone-300 hover:border-stone-400'
                  }`}
                >
                  {task.completed && <span className="text-white text-sm">✓</span>}
                </button>

                {/* Texto da Tarefa */}
                <span
                  className={`flex-1 text-sm ${
                    task.completed
                      ? darkMode
                        ? 'text-stone-500 line-through'
                        : 'text-stone-500 line-through'
                      : darkMode
                      ? 'text-white'
                      : 'text-stone-900'
                  }`}
                >
                  {task.text}
                </span>

                {/* Botão Deletar */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className={`flex-shrink-0 px-3 py-1 rounded text-sm font-semibold transition-all ${
                    darkMode
                      ? 'text-red-400 hover:bg-red-900/30'
                      : 'text-red-600 hover:bg-red-100'
                  }`}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Dicas */}
        {tasks.length > 0 && (
          <div className={`rounded-xl p-4 ${
            darkMode ? 'bg-purple-900/30 border border-purple-800' : 'bg-purple-100 border border-purple-300'
          }`}>
            <p className={`text-sm font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
              💡 Dica: Organize suas tarefas por prioridade!
            </p>
            <p className={`text-xs mt-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              Marque como concluídas para rastrear seu progresso e manter-se motivado.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
