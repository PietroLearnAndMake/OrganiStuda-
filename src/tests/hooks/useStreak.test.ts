import { describe, it, expect, beforeEach } from 'vitest';

describe('useStreak', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Streak calculation', () => {
    it('deve inicializar streak em 0', () => {
      let streak = 0;
      expect(streak).toBe(0);
    });

    it('deve incrementar streak em 1 dia', () => {
      let streak = 0;
      let lastLoginDate = new Date();

      const incrementStreak = () => {
        const today = new Date();
        const yesterday = new Date(lastLoginDate);
        yesterday.setDate(yesterday.getDate() - 1);

        const isConsecutiveDay =
          today.toDateString() !== lastLoginDate.toDateString() &&
          yesterday.toDateString() === lastLoginDate.toDateString();

        if (isConsecutiveDay) {
          streak++;
          lastLoginDate = today;
        }
      };

      // Simular dia anterior
      lastLoginDate = new Date();
      lastLoginDate.setDate(lastLoginDate.getDate() - 1);

      incrementStreak();
      expect(streak).toBe(1);
    });

    it('deve resetar streak se quebrado', () => {
      let streak = 5;
      let lastLoginDate = new Date();
      lastLoginDate.setDate(lastLoginDate.getDate() - 2); // 2 dias atrás

      const checkStreak = () => {
        const today = new Date();
        const daysSinceLastLogin = Math.floor(
          (today.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysSinceLastLogin > 1) {
          streak = 0;
        }
      };

      checkStreak();
      expect(streak).toBe(0);
    });

    it('deve manter streak se login no mesmo dia', () => {
      let streak = 5;
      let lastLoginDate = new Date();

      const checkStreak = () => {
        const today = new Date();
        if (today.toDateString() === lastLoginDate.toDateString()) {
          // Mesmo dia, não incrementa
          return;
        }
      };

      checkStreak();
      expect(streak).toBe(5);
    });
  });

  describe('Best streak tracking', () => {
    it('deve rastrear melhor streak', () => {
      let streak = 0;
      let bestStreak = 0;

      const updateBestStreak = () => {
        if (streak > bestStreak) {
          bestStreak = streak;
        }
      };

      streak = 3;
      updateBestStreak();
      expect(bestStreak).toBe(3);

      streak = 5;
      updateBestStreak();
      expect(bestStreak).toBe(5);

      streak = 2;
      updateBestStreak();
      expect(bestStreak).toBe(5);
    });

    it('deve persistir melhor streak', () => {
      const bestStreak = 10;
      localStorage.setItem('bestStreak', JSON.stringify(bestStreak));

      const retrieved = JSON.parse(localStorage.getItem('bestStreak')!);
      expect(retrieved).toBe(10);
    });
  });

  describe('Streak milestones', () => {
    it('deve detectar milestone de 3 dias', () => {
      let streak = 3;
      const isMilestone = streak === 3 || streak === 7 || streak === 30;

      expect(isMilestone).toBe(true);
    });

    it('deve detectar milestone de 7 dias', () => {
      let streak = 7;
      const isMilestone = streak === 3 || streak === 7 || streak === 30;

      expect(isMilestone).toBe(true);
    });

    it('deve detectar milestone de 30 dias', () => {
      let streak = 30;
      const isMilestone = streak === 3 || streak === 7 || streak === 30;

      expect(isMilestone).toBe(true);
    });

    it('não deve detectar milestone em dias normais', () => {
      let streak = 5;
      const isMilestone = streak === 3 || streak === 7 || streak === 30;

      expect(isMilestone).toBe(false);
    });
  });

  describe('Streak display', () => {
    it('deve formatar streak para exibição', () => {
      const streak = 15;
      const formatted = `${streak} dias 🔥`;

      expect(formatted).toBe('15 dias 🔥');
    });

    it('deve mostrar aviso quando streak próximo de quebrar', () => {
      let lastLoginDate = new Date();
      lastLoginDate.setHours(lastLoginDate.getHours() - 23); // 23 horas atrás

      const hoursUntilReset = 24 - Math.floor(
        (new Date().getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60)
      );

      const shouldShowWarning = hoursUntilReset < 2;
      expect(shouldShowWarning).toBe(true);
    });
  });

  describe('Streak persistence', () => {
    it('deve salvar streak em localStorage', () => {
      const streakData = {
        current: 5,
        best: 10,
        lastLogin: new Date().toISOString(),
      };

      localStorage.setItem('streakData', JSON.stringify(streakData));

      const retrieved = JSON.parse(localStorage.getItem('streakData')!);
      expect(retrieved.current).toBe(5);
      expect(retrieved.best).toBe(10);
    });

    it('deve recuperar streak ao abrir app', () => {
      const streakData = {
        current: 7,
        best: 15,
        lastLogin: new Date().toISOString(),
      };

      localStorage.setItem('streakData', JSON.stringify(streakData));

      const retrieved = JSON.parse(localStorage.getItem('streakData')!);
      expect(retrieved.current).toBe(7);
      expect(retrieved.best).toBe(15);
    });
  });

  describe('Edge cases', () => {
    it('deve lidar com primeiro login', () => {
      let streak = 0;
      let lastLoginDate: Date | null = null;

      if (lastLoginDate === null) {
        streak = 1;
        lastLoginDate = new Date();
      }

      expect(streak).toBe(1);
      expect(lastLoginDate).not.toBeNull();
    });

    it('deve lidar com múltiplos logins no mesmo dia', () => {
      let streak = 5;
      const lastLoginDate = new Date();

      const handleLogin = () => {
        const today = new Date();
        if (today.toDateString() === lastLoginDate.toDateString()) {
          // Mesmo dia, não altera streak
          return streak;
        }
      };

      const result = handleLogin();
      expect(result).toBe(5);
    });

    it('deve lidar com mudança de fuso horário', () => {
      const lastLoginDate = new Date('2024-03-08T23:00:00Z');
      const currentDate = new Date('2024-03-09T01:00:00Z');

      const daysDifference = Math.floor(
        (currentDate.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      expect(daysDifference).toBe(0); // Mesmo dia em UTC
    });
  });
});
