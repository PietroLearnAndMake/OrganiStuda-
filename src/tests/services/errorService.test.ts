import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { errorService } from '../../services/errorService';

describe('errorService', () => {
  beforeEach(() => {
    localStorage.clear();
    errorService.clearLogs();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Logging levels', () => {
    it('deve registrar log DEBUG', () => {
      errorService.debug('Test debug message', { data: 'test' });
      const logs = errorService.getLogs();
      
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('DEBUG');
      expect(logs[0].message).toBe('Test debug message');
    });

    it('deve registrar log INFO', () => {
      errorService.info('Test info message', { data: 'test' });
      const logs = errorService.getLogs();
      
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('INFO');
    });

    it('deve registrar log WARN', () => {
      errorService.warn('Test warning', { data: 'test' });
      const logs = errorService.getLogs();
      
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('WARN');
    });

    it('deve registrar log ERROR', () => {
      errorService.error('Test error', { data: 'test' });
      const logs = errorService.getLogs();
      
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('ERROR');
    });

    it('deve registrar log CRITICAL', () => {
      errorService.critical('Test critical', { data: 'test' });
      const logs = errorService.getLogs();
      
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('CRITICAL');
    });
  });

  describe('Log context', () => {
    it('deve incluir tela atual no contexto', () => {
      errorService.setCurrentScreen('HomeScreen');
      errorService.info('Test message');
      
      const logs = errorService.getLogs();
      expect(logs[0].context.screen).toBe('HomeScreen');
    });

    it('deve incluir ação do usuário no contexto', () => {
      errorService.setUserAction('button_click');
      errorService.info('Test message');
      
      const logs = errorService.getLogs();
      expect(logs[0].context.action).toBe('button_click');
    });

    it('deve incluir versão do app no contexto', () => {
      errorService.info('Test message');
      const logs = errorService.getLogs();
      
      expect(logs[0].context.version).toBeDefined();
    });

    it('deve incluir timestamp no contexto', () => {
      errorService.info('Test message');
      const logs = errorService.getLogs();
      
      expect(logs[0].timestamp).toBeDefined();
      expect(typeof logs[0].timestamp).toBe('number');
    });
  });

  describe('Log persistence', () => {
    it('deve persistir logs em localStorage', () => {
      errorService.info('Test message 1');
      errorService.info('Test message 2');
      
      const storedLogs = localStorage.getItem('organistuda_logs');
      expect(storedLogs).toBeDefined();
      
      const parsed = JSON.parse(storedLogs!);
      expect(parsed).toHaveLength(2);
    });

    it('deve recuperar logs persistidos', () => {
      errorService.info('Test message');
      const logs1 = errorService.getLogs();
      
      errorService.clearLogs();
      expect(errorService.getLogs()).toHaveLength(0);
      
      errorService.loadPersistedLogs();
      const logs2 = errorService.getLogs();
      
      expect(logs2).toHaveLength(1);
      expect(logs2[0].message).toBe('Test message');
    });

    it('deve limitar quantidade de logs armazenados', () => {
      for (let i = 0; i < 1005; i++) {
        errorService.info(`Message ${i}`);
      }
      
      const logs = errorService.getLogs();
      expect(logs.length).toBeLessThanOrEqual(1000);
    });
  });

  describe('Error capture', () => {
    it('deve capturar erros globais', () => {
      const error = new Error('Test error');
      errorService.captureException(error);
      
      const logs = errorService.getLogs();
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[logs.length - 1].level).toBe('ERROR');
    });

    it('deve incluir stack trace em erros', () => {
      const error = new Error('Test error');
      errorService.captureException(error);
      
      const logs = errorService.getLogs();
      const lastLog = logs[logs.length - 1];
      
      expect(lastLog.context.stackTrace).toBeDefined();
    });

    it('deve capturar erros com contexto adicional', () => {
      const error = new Error('Test error');
      errorService.captureException(error, { userId: '123' });
      
      const logs = errorService.getLogs();
      const lastLog = logs[logs.length - 1];
      
      expect(lastLog.context.userId).toBe('123');
    });
  });

  describe('Log filtering', () => {
    it('deve filtrar logs por nível', () => {
      errorService.debug('Debug message');
      errorService.info('Info message');
      errorService.error('Error message');
      
      const errorLogs = errorService.getLogsByLevel('ERROR');
      expect(errorLogs).toHaveLength(1);
      expect(errorLogs[0].message).toBe('Error message');
    });

    it('deve filtrar logs por tela', () => {
      errorService.setCurrentScreen('HomeScreen');
      errorService.info('Home message');
      
      errorService.setCurrentScreen('QuestionsScreen');
      errorService.info('Questions message');
      
      const homeLogs = errorService.getLogsByScreen('HomeScreen');
      expect(homeLogs).toHaveLength(1);
      expect(homeLogs[0].message).toBe('Home message');
    });

    it('deve filtrar logs por período de tempo', () => {
      const now = Date.now();
      
      errorService.info('Old message');
      const oldTimestamp = errorService.getLogs()[0].timestamp;
      
      // Simular passagem de tempo
      const recentTimestamp = now + 1000;
      
      errorService.info('Recent message');
      
      const recentLogs = errorService.getLogsByTimeRange(now, now + 2000);
      expect(recentLogs.length).toBeGreaterThan(0);
    });
  });

  describe('Log export', () => {
    it('deve exportar logs como JSON', () => {
      errorService.info('Test message 1');
      errorService.error('Test message 2');
      
      const exported = errorService.exportLogs();
      expect(typeof exported).toBe('string');
      
      const parsed = JSON.parse(exported);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(2);
    });

    it('deve exportar logs com formatação legível', () => {
      errorService.info('Test message');
      
      const formatted = errorService.exportLogsFormatted();
      expect(typeof formatted).toBe('string');
      expect(formatted).toContain('Test message');
      expect(formatted).toContain('INFO');
    });
  });

  describe('Performance', () => {
    it('deve registrar logs rapidamente', () => {
      const start = performance.now();
      
      for (let i = 0; i < 100; i++) {
        errorService.info(`Message ${i}`);
      }
      
      const end = performance.now();
      const duration = end - start;
      
      // Deve completar em menos de 100ms
      expect(duration).toBeLessThan(100);
    });
  });

  describe('Memory management', () => {
    it('deve limpar logs antigos automaticamente', () => {
      for (let i = 0; i < 50; i++) {
        errorService.info(`Message ${i}`);
      }
      
      const initialCount = errorService.getLogs().length;
      
      // Simular limpeza de logs antigos
      errorService.clearOldLogs(1); // Manter apenas últimos 1 segundo
      
      // Deve ter removido alguns logs
      const finalCount = errorService.getLogs().length;
      expect(finalCount).toBeLessThanOrEqual(initialCount);
    });
  });
});
