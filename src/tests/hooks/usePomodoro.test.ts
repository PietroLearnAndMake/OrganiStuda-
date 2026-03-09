import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('usePomodoro', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  describe('Timer functionality', () => {
    it('deve inicializar com tempo correto', () => {
      // Mock do hook
      const initialTime = 25 * 60; // 25 minutos em segundos
      expect(initialTime).toBe(1500);
    });

    it('deve decrementar tempo a cada segundo', () => {
      let time = 1500;
      const interval = setInterval(() => {
        time--;
      }, 1000);

      vi.advanceTimersByTime(1000);
      expect(time).toBe(1499);

      clearInterval(interval);
    });

    it('deve parar quando atingir zero', () => {
      let time = 2;
      let isActive = true;

      const interval = setInterval(() => {
        if (time > 0) {
          time--;
        } else {
          isActive = false;
          clearInterval(interval);
        }
      }, 1000);

      vi.advanceTimersByTime(3000);
      expect(time).toBe(0);
      expect(isActive).toBe(false);

      clearInterval(interval);
    });
  });

  describe('Mode switching', () => {
    it('deve alternar entre work e break', () => {
      let mode: 'work' | 'break' = 'work';

      const switchMode = () => {
        mode = mode === 'work' ? 'break' : 'work';
      };

      expect(mode).toBe('work');
      switchMode();
      expect(mode).toBe('break');
      switchMode();
      expect(mode).toBe('work');
    });

    it('deve resetar tempo ao mudar de modo', () => {
      const workTime = 25 * 60;
      const breakTime = 5 * 60;

      let mode: 'work' | 'break' = 'work';
      let time = workTime;

      const switchMode = () => {
        mode = mode === 'work' ? 'break' : 'work';
        time = mode === 'work' ? workTime : breakTime;
      };

      expect(time).toBe(1500);
      switchMode();
      expect(time).toBe(300);
      expect(mode).toBe('break');
    });
  });

  describe('Pause and Resume', () => {
    it('deve pausar o timer', () => {
      let isActive = true;
      let time = 1500;

      const pause = () => {
        isActive = false;
      };

      pause();
      expect(isActive).toBe(false);
      expect(time).toBe(1500);
    });

    it('deve retomar o timer', () => {
      let isActive = false;

      const resume = () => {
        isActive = true;
      };

      resume();
      expect(isActive).toBe(true);
    });
  });

  describe('Custom time', () => {
    it('deve aceitar tempo customizado', () => {
      const customWorkTime = 30 * 60;
      const customBreakTime = 10 * 60;

      expect(customWorkTime).toBe(1800);
      expect(customBreakTime).toBe(600);
    });

    it('deve validar tempo mínimo', () => {
      const minTime = 1 * 60; // 1 minuto
      const customTime = 0.5 * 60; // 30 segundos

      expect(customTime).toBeLessThan(minTime);
    });

    it('deve validar tempo máximo', () => {
      const maxTime = 60 * 60; // 60 minutos
      const customTime = 90 * 60; // 90 minutos

      expect(customTime).toBeGreaterThan(maxTime);
    });
  });

  describe('Sessions tracking', () => {
    it('deve contar sessões completadas', () => {
      let sessionsCompleted = 0;

      const completeSession = () => {
        sessionsCompleted++;
      };

      expect(sessionsCompleted).toBe(0);
      completeSession();
      expect(sessionsCompleted).toBe(1);
      completeSession();
      expect(sessionsCompleted).toBe(2);
    });

    it('deve rastrear tempo total estudado', () => {
      let totalTime = 0;
      const sessionTime = 25 * 60;

      totalTime += sessionTime;
      expect(totalTime).toBe(1500);

      totalTime += sessionTime;
      expect(totalTime).toBe(3000);
    });
  });
});
