import { useState, useEffect, useCallback } from 'react';

interface StreakState {
  streak: number;
  bestStreak: number;
  lastDate: string | null;
  isBroken: boolean;
}

interface StreakActions {
  updateStreak: () => void;
  resetStreak: () => void;
  incrementStreak: () => void;
}

export function useStreak(): [StreakState, StreakActions] {
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastDate, setLastDate] = useState<string | null>(null);
  const [isBroken, setIsBroken] = useState(false);

  // Load streak data from localStorage on mount
  useEffect(() => {
    try {
      const savedStreak = localStorage.getItem('enem_streak');
      if (savedStreak) {
        const data = JSON.parse(savedStreak);
        setStreak(data.streak || 0);
        setBestStreak(data.bestStreak || 0);
        setLastDate(data.lastDate || null);
      }
    } catch (error) {
      console.error('Erro ao carregar streak:', error);
    }
  }, []);

  // Save streak data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'enem_streak',
      JSON.stringify({
        streak,
        bestStreak,
        lastDate,
      })
    );
  }, [streak, bestStreak, lastDate]);

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];

    if (lastDate === today) {
      // Already studied today
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate === yesterdayStr) {
      // Studied yesterday, increment streak
      setStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        return newStreak;
      });
      setIsBroken(false);
    } else if (lastDate === null) {
      // First time
      setStreak(1);
      setIsBroken(false);
    } else {
      // Streak is broken
      setStreak(1);
      setIsBroken(true);
    }

    setLastDate(today);
  }, [lastDate, bestStreak]);

  const resetStreak = useCallback(() => {
    setStreak(0);
    setLastDate(null);
    setIsBroken(true);
    localStorage.removeItem('enem_streak');
  }, []);

  const incrementStreak = useCallback(() => {
    setStreak((prev) => {
      const newStreak = prev + 1;
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      return newStreak;
    });
  }, [bestStreak]);

  const state: StreakState = {
    streak,
    bestStreak,
    lastDate,
    isBroken,
  };

  const actions: StreakActions = {
    updateStreak,
    resetStreak,
    incrementStreak,
  };

  return [state, actions];
}
