import { useState, useEffect, useCallback } from 'react';

interface XPState {
  xp: number;
  level: number;
  xpForNextLevel: number;
  xpProgress: number;
}

interface XPActions {
  addXP: (amount: number) => void;
  removeXP: (amount: number) => void;
  resetXP: () => void;
  calculateLevel: (totalXP: number) => number;
}

// XP required for each level (exponential growth)
const calculateXPForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.1, level - 1));
};

const calculateLevelFromXP = (totalXP: number): number => {
  let level = 1;
  let xpRequired = 0;

  while (xpRequired + calculateXPForLevel(level) <= totalXP) {
    xpRequired += calculateXPForLevel(level);
    level++;
  }

  return level;
};

export function useXP(initialXP: number = 0): [XPState, XPActions] {
  const [xp, setXP] = useState(initialXP);
  const [level, setLevel] = useState(calculateLevelFromXP(initialXP));

  // Load XP from localStorage on mount
  useEffect(() => {
    try {
      const savedXP = localStorage.getItem('enem_xp');
      if (savedXP) {
        const totalXP = parseInt(savedXP, 10);
        setXP(totalXP);
        setLevel(calculateLevelFromXP(totalXP));
      }
    } catch (error) {
      console.error('Erro ao carregar XP:', error);
    }
  }, []);

  // Save XP to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('enem_xp', String(xp));
  }, [xp]);

  // Calculate XP for next level
  const xpForNextLevel = calculateXPForLevel(level);

  // Calculate XP progress (0-100%)
  let xpProgress = 0;
  let currentLevelXP = 0;
  for (let i = 1; i < level; i++) {
    currentLevelXP += calculateXPForLevel(i);
  }
  const xpInCurrentLevel = xp - currentLevelXP;
  xpProgress = Math.round((xpInCurrentLevel / xpForNextLevel) * 100);

  const addXP = useCallback((amount: number) => {
    setXP((prevXP) => {
      const newXP = prevXP + amount;
      const newLevel = calculateLevelFromXP(newXP);
      setLevel(newLevel);
      return newXP;
    });
  }, []);

  const removeXP = useCallback((amount: number) => {
    setXP((prevXP) => {
      const newXP = Math.max(0, prevXP - amount);
      const newLevel = calculateLevelFromXP(newXP);
      setLevel(newLevel);
      return newXP;
    });
  }, []);

  const resetXP = useCallback(() => {
    setXP(0);
    setLevel(1);
    localStorage.removeItem('enem_xp');
  }, []);

  const calculateLevel = useCallback((totalXP: number): number => {
    return calculateLevelFromXP(totalXP);
  }, []);

  const state: XPState = {
    xp,
    level,
    xpForNextLevel,
    xpProgress,
  };

  const actions: XPActions = {
    addXP,
    removeXP,
    resetXP,
    calculateLevel,
  };

  return [state, actions];
}
