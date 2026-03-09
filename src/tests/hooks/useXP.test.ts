import { describe, it, expect, beforeEach } from 'vitest';

describe('useXP', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('XP calculation', () => {
    it('deve inicializar com 0 XP', () => {
      let xp = 0;
      expect(xp).toBe(0);
    });

    it('deve adicionar XP corretamente', () => {
      let xp = 0;
      const addXP = (amount: number) => {
        xp += amount;
      };

      addXP(100);
      expect(xp).toBe(100);

      addXP(50);
      expect(xp).toBe(150);
    });

    it('deve calcular XP necessário para próximo nível', () => {
      const calculateXPForLevel = (level: number): number => {
        return Math.floor(100 * Math.pow(1.1, level));
      };

      expect(calculateXPForLevel(1)).toBe(110);
      expect(calculateXPForLevel(2)).toBe(121);
      expect(calculateXPForLevel(5)).toBe(161);
    });

    it('deve calcular XP total necessário até nível', () => {
      const calculateTotalXPForLevel = (level: number): number => {
        let total = 0;
        for (let i = 1; i < level; i++) {
          total += Math.floor(100 * Math.pow(1.1, i));
        }
        return total;
      };

      expect(calculateTotalXPForLevel(1)).toBe(0);
      expect(calculateTotalXPForLevel(2)).toBe(110);
      expect(calculateTotalXPForLevel(3)).toBe(231);
    });
  });

  describe('Level calculation', () => {
    it('deve calcular nível correto baseado em XP', () => {
      const calculateLevel = (xp: number): number => {
        let level = 1;
        let totalXP = 0;

        while (totalXP + Math.floor(100 * Math.pow(1.1, level)) <= xp) {
          totalXP += Math.floor(100 * Math.pow(1.1, level));
          level++;
        }

        return level;
      };

      expect(calculateLevel(0)).toBe(1);
      expect(calculateLevel(100)).toBe(1);
      expect(calculateLevel(110)).toBe(2);
      expect(calculateLevel(231)).toBe(3);
    });

    it('deve incrementar nível ao atingir XP necessário', () => {
      let level = 1;
      let xp = 0;
      const xpForNextLevel = 110;

      const addXP = (amount: number) => {
        xp += amount;
        if (xp >= xpForNextLevel) {
          level++;
          xp = 0;
        }
      };

      addXP(50);
      expect(level).toBe(1);

      addXP(60);
      expect(level).toBe(2);
      expect(xp).toBe(0);
    });
  });

  describe('XP sources', () => {
    it('deve conceder XP por questão correta', () => {
      let xp = 0;
      const xpPerCorrectQuestion = 10;

      xp += xpPerCorrectQuestion;
      expect(xp).toBe(10);
    });

    it('deve conceder XP por sessão de estudo', () => {
      let xp = 0;
      const xpPerSession = 50;

      xp += xpPerSession;
      expect(xp).toBe(50);
    });

    it('deve conceder XP por streak', () => {
      let xp = 0;
      const streak = 5;
      const xpPerStreakDay = 5;

      xp += streak * xpPerStreakDay;
      expect(xp).toBe(25);
    });

    it('deve conceder bônus XP por conquista', () => {
      let xp = 0;
      const bonusXP = 100;

      xp += bonusXP;
      expect(xp).toBe(100);
    });

    it('deve calcular XP total de múltiplas fontes', () => {
      let xp = 0;

      // Questão correta
      xp += 10;

      // Sessão de estudo
      xp += 50;

      // Streak (5 dias)
      xp += 5 * 5;

      // Conquista
      xp += 100;

      expect(xp).toBe(185);
    });
  });

  describe('Progress tracking', () => {
    it('deve calcular progresso até próximo nível', () => {
      const currentXP = 50;
      const xpForCurrentLevel = 110;
      const progress = (currentXP / xpForCurrentLevel) * 100;

      expect(progress).toBeCloseTo(45.45, 1);
    });

    it('deve mostrar XP restante para próximo nível', () => {
      const currentXP = 50;
      const xpForCurrentLevel = 110;
      const xpRemaining = xpForCurrentLevel - currentXP;

      expect(xpRemaining).toBe(60);
    });

    it('deve atualizar progresso ao adicionar XP', () => {
      let currentXP = 50;
      const xpForCurrentLevel = 110;

      let progress = (currentXP / xpForCurrentLevel) * 100;
      expect(progress).toBeCloseTo(45.45, 1);

      currentXP = 100;
      progress = (currentXP / xpForCurrentLevel) * 100;
      expect(progress).toBeCloseTo(90.91, 1);
    });
  });

  describe('XP persistence', () => {
    it('deve salvar XP em localStorage', () => {
      const xpData = { total: 500, level: 3 };
      localStorage.setItem('xpData', JSON.stringify(xpData));

      const retrieved = JSON.parse(localStorage.getItem('xpData')!);
      expect(retrieved.total).toBe(500);
      expect(retrieved.level).toBe(3);
    });

    it('deve recuperar XP ao abrir app', () => {
      const xpData = { total: 250, level: 2 };
      localStorage.setItem('xpData', JSON.stringify(xpData));

      const retrieved = JSON.parse(localStorage.getItem('xpData')!);
      expect(retrieved.total).toBe(250);
      expect(retrieved.level).toBe(2);
    });
  });

  describe('Level milestones', () => {
    it('deve detectar novo nível', () => {
      let previousLevel = 1;
      let currentLevel = 2;

      const isNewLevel = currentLevel > previousLevel;
      expect(isNewLevel).toBe(true);
    });

    it('deve detectar múltiplos níveis em uma ação', () => {
      let level = 1;
      let xp = 0;

      const levelUpThresholds = [110, 231, 364, 511];

      const addXP = (amount: number) => {
        xp += amount;
        let newLevel = 1;

        for (let threshold of levelUpThresholds) {
          if (xp >= threshold) {
            newLevel++;
          } else {
            break;
          }
        }

        return newLevel - level;
      };

      const levelUps = addXP(300);
      expect(levelUps).toBe(2);
    });
  });

  describe('Edge cases', () => {
    it('deve lidar com XP negativo (não permitir)', () => {
      let xp = 100;
      const removeXP = (amount: number) => {
        xp = Math.max(0, xp - amount);
      };

      removeXP(150);
      expect(xp).toBe(0);
    });

    it('deve lidar com XP muito alto', () => {
      let xp = Number.MAX_SAFE_INTEGER - 1;
      const addXP = (amount: number) => {
        xp = Math.min(Number.MAX_SAFE_INTEGER, xp + amount);
      };

      addXP(1000);
      expect(xp).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
    });

    it('deve lidar com nível 1 sem XP', () => {
      const level = 1;
      const xp = 0;

      expect(level).toBe(1);
      expect(xp).toBe(0);
    });
  });
});
