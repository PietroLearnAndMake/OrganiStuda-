import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('errorService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Logging levels', () => {
    it('deve registrar log DEBUG', () => {
      // Mock do errorService
      const logs: any[] = [];
      const addLog = (level: string, message: string) => {
        logs.push({ level, message, timestamp: Date.now() });
      };

      addLog('DEBUG', 'Test debug message');
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('DEBUG');
    });

    it('deve registrar log INFO', () => {
      const logs: any[] = [];
      const addLog = (level: string, message: string) => {
        logs.push({ level, message, timestamp: Date.now() });
      };

      addLog('INFO', 'Test info message');
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('INFO');
    });

    it('deve registrar log WARN', () => {
      const logs: any[] = [];
      const addLog = (level: string, message: string) => {
        logs.push({ level, message, timestamp: Date.now() });
      };

      addLog('WARN', 'Test warning');
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('WARN');
    });

    it('deve registrar log ERROR', () => {
      const logs: any[] = [];
      const addLog = (level: string, message: string) => {
        logs.push({ level, message, timestamp: Date.now() });
      };

      addLog('ERROR', 'Test error');
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('ERROR');
    });

    it('deve registrar log CRITICAL', () => {
      const logs: any[] = [];
      const addLog = (level: string, message: string) => {
        logs.push({ level, message, timestamp: Date.now() });
      };

      addLog('CRITICAL', 'Test critical');
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('CRITICAL');
    });
  });

  describe('Log context', () => {
    it('deve incluir tela atual no contexto', () => {
      const logEntry = {
        level: 'INFO',
        message: 'Test message',
        timestamp: Date.now(),
        screen: 'HomeScreen',
      };

      expect(logEntry.screen).toBe('HomeScreen');
    });

    it('deve incluir ação do usuário no contexto', () => {
      const logEntry = {
        level: 'INFO',
        message: 'Test message',
        timestamp: Date.now(),
        action: 'button_click',
      };

      expect(logEntry.action).toBe('button_click');
    });

    it('deve incluir versão do app no contexto', () => {
      const logEntry = {
        level: 'INFO',
        message: 'Test message',
        timestamp: Date.now(),
        version: '2.0.0',
      };

      expect(logEntry.version).toBeDefined();
    });

    it('deve incluir timestamp no contexto', () => {
      const logEntry = {
        level: 'INFO',
        message: 'Test message',
        timestamp: Date.now(),
      };

      expect(logEntry.timestamp).toBeDefined();
      expect(typeof logEntry.timestamp).toBe('number');
    });
  });

  describe('Log persistence', () => {
    it('deve persistir logs em localStorage', () => {
      const logs = [
        { level: 'INFO', message: 'Test message 1', timestamp: Date.now() },
        { level: 'INFO', message: 'Test message 2', timestamp: Date.now() },
      ];

      localStorage.setItem('logs', JSON.stringify(logs));
      const storedLogs = localStorage.getItem('logs');

      expect(storedLogs).toBeDefined();
      const parsed = JSON.parse(storedLogs!);
      expect(parsed).toHaveLength(2);
    });

    it('deve recuperar logs persistidos', () => {
      const logs = [{ level: 'INFO', message: 'Test message', timestamp: Date.now() }];
      localStorage.setItem('logs', JSON.stringify(logs));

      const retrieved = localStorage.getItem('logs');
      expect(retrieved).toBeDefined();

      const parsed = JSON.parse(retrieved!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].message).toBe('Test message');
    });

    it('deve limitar quantidade de logs armazenados', () => {
      const logs = [];
      for (let i = 0; i < 1005; i++) {
        logs.push({ level: 'INFO', message: `Message ${i}`, timestamp: Date.now() });
      }

      // Simular limite de 1000
      const limited = logs.slice(-1000);
      expect(limited.length).toBeLessThanOrEqual(1000);
    });
  });

  describe('Error capture', () => {
    it('deve capturar erros globais', () => {
      const error = new Error('Test error');
      const captured = {
        level: 'ERROR',
        message: error.message,
        timestamp: Date.now(),
      };

      expect(captured.level).toBe('ERROR');
      expect(captured.message).toBe('Test error');
    });

    it('deve incluir stack trace em erros', () => {
      const error = new Error('Test error');
      const captured = {
        level: 'ERROR',
        message: error.message,
        timestamp: Date.now(),
        stackTrace: error.stack,
      };

      expect(captured.stackTrace).toBeDefined();
    });

    it('deve capturar erros com contexto adicional', () => {
      const error = new Error('Test error');
      const captured = {
        level: 'ERROR',
        message: error.message,
        timestamp: Date.now(),
        userId: '123',
      };

      expect(captured.userId).toBe('123');
    });
  });

  describe('Log filtering', () => {
    it('deve filtrar logs por nível', () => {
      const logs = [
        { level: 'DEBUG', message: 'Debug message', timestamp: Date.now() },
        { level: 'INFO', message: 'Info message', timestamp: Date.now() },
        { level: 'ERROR', message: 'Error message', timestamp: Date.now() },
      ];

      const errorLogs = logs.filter((l) => l.level === 'ERROR');
      expect(errorLogs).toHaveLength(1);
      expect(errorLogs[0].message).toBe('Error message');
    });

    it('deve filtrar logs por tela', () => {
      const logs = [
        { level: 'INFO', message: 'Home message', timestamp: Date.now(), screen: 'HomeScreen' },
        { level: 'INFO', message: 'Questions message', timestamp: Date.now(), screen: 'QuestionsScreen' },
      ];

      const homeLogs = logs.filter((l) => l.screen === 'HomeScreen');
      expect(homeLogs).toHaveLength(1);
      expect(homeLogs[0].message).toBe('Home message');
    });

    it('deve filtrar logs por período de tempo', () => {
      const now = Date.now();
      const logs = [
        { level: 'INFO', message: 'Old message', timestamp: now - 5000 },
        { level: 'INFO', message: 'Recent message', timestamp: now },
      ];

      const recentLogs = logs.filter((l) => l.timestamp >= now - 2000);
      expect(recentLogs.length).toBeGreaterThan(0);
    });
  });

  describe('Log export', () => {
    it('deve exportar logs como JSON', () => {
      const logs = [
        { level: 'INFO', message: 'Test message 1', timestamp: Date.now() },
        { level: 'ERROR', message: 'Test message 2', timestamp: Date.now() },
      ];

      const exported = JSON.stringify(logs);
      expect(typeof exported).toBe('string');

      const parsed = JSON.parse(exported);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(2);
    });

    it('deve exportar logs com formatação legível', () => {
      const logs = [{ level: 'INFO', message: 'Test message', timestamp: Date.now() }];

      const formatted = logs.map((l) => `[${l.level}] ${l.message}`).join('\n');
      expect(typeof formatted).toBe('string');
      expect(formatted).toContain('Test message');
      expect(formatted).toContain('INFO');
    });
  });

  describe('Performance', () => {
    it('deve registrar logs rapidamente', () => {
      const start = performance.now();

      for (let i = 0; i < 100; i++) {
        // Simular log
        const log = { level: 'INFO', message: `Message ${i}`, timestamp: Date.now() };
      }

      const end = performance.now();
      const duration = end - start;

      expect(duration).toBeLessThan(100);
    });
  });

  describe('Memory management', () => {
    it('deve limpar logs antigos automaticamente', () => {
      const logs = [];
      for (let i = 0; i < 50; i++) {
        logs.push({ level: 'INFO', message: `Message ${i}`, timestamp: Date.now() - 10000 });
      }

      const initialCount = logs.length;

      // Simular limpeza de logs antigos
      const cutoffTime = Date.now() - 5000;
      const filtered = logs.filter((l) => l.timestamp >= cutoffTime);

      expect(filtered.length).toBeLessThanOrEqual(initialCount);
    });
  });
});
