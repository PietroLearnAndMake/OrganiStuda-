import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { storageService } from '../../services/storageService';
import { UserProfile, SavedQuestion } from '../../types';

describe('storageService', () => {
  beforeEach(() => {
    localStorage.clear();
    indexedDB.deleteDatabase('OrganiStudaDB');
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('localStorage operations', () => {
    it('deve salvar dados em localStorage', () => {
      const testData = { name: 'Test User', level: 5 };
      storageService.setLocalStorage('user', testData);
      
      const retrieved = storageService.getLocalStorage('user');
      expect(retrieved).toEqual(testData);
    });

    it('deve retornar null para chave inexistente', () => {
      const retrieved = storageService.getLocalStorage('nonexistent');
      expect(retrieved).toBeNull();
    });

    it('deve remover dados de localStorage', () => {
      storageService.setLocalStorage('user', { name: 'Test' });
      storageService.removeLocalStorage('user');
      
      const retrieved = storageService.getLocalStorage('user');
      expect(retrieved).toBeNull();
    });

    it('deve limpar todo localStorage', () => {
      storageService.setLocalStorage('user', { name: 'Test' });
      storageService.setLocalStorage('settings', { theme: 'dark' });
      
      storageService.clearLocalStorage();
      
      expect(storageService.getLocalStorage('user')).toBeNull();
      expect(storageService.getLocalStorage('settings')).toBeNull();
    });
  });

  describe('IndexedDB operations', () => {
    it('deve inicializar IndexedDB corretamente', async () => {
      const initialized = await storageService.initializeIndexedDB();
      expect(initialized).toBe(true);
    });

    it('deve salvar dados em IndexedDB', async () => {
      await storageService.initializeIndexedDB();
      
      const profile: UserProfile = {
        name: 'Test User',
        photo: null,
        achievements: [],
        streak: 5,
        bestStreak: 10,
        lastLogin: new Date().toISOString(),
        xp: 100,
        level: 2,
        totalStudyTime: 300,
        weeklyGoals: { questions: 50, studyTime: 300 },
        stats: { totalQuestions: 10, correctQuestions: 8, sessionsCompleted: 5 },
      };

      await storageService.saveToIndexedDB('profiles', 'main', profile);
      const retrieved = await storageService.getFromIndexedDB('profiles', 'main');
      
      expect(retrieved).toEqual(profile);
    });

    it('deve recuperar dados de IndexedDB', async () => {
      await storageService.initializeIndexedDB();
      
      const testData = { id: 1, name: 'Test Question' };
      await storageService.saveToIndexedDB('questions', 1, testData);
      
      const retrieved = await storageService.getFromIndexedDB('questions', 1);
      expect(retrieved).toEqual(testData);
    });

    it('deve deletar dados de IndexedDB', async () => {
      await storageService.initializeIndexedDB();
      
      await storageService.saveToIndexedDB('questions', 1, { name: 'Test' });
      await storageService.deleteFromIndexedDB('questions', 1);
      
      const retrieved = await storageService.getFromIndexedDB('questions', 1);
      expect(retrieved).toBeUndefined();
    });

    it('deve listar todos os dados de um object store', async () => {
      await storageService.initializeIndexedDB();
      
      await storageService.saveToIndexedDB('questions', 1, { name: 'Q1' });
      await storageService.saveToIndexedDB('questions', 2, { name: 'Q2' });
      
      const all = await storageService.getAllFromIndexedDB('questions');
      expect(all).toHaveLength(2);
    });
  });

  describe('Backup and Restore', () => {
    it('deve criar backup de dados', async () => {
      await storageService.initializeIndexedDB();
      
      const profile: UserProfile = {
        name: 'Test User',
        photo: null,
        achievements: [],
        streak: 5,
        bestStreak: 10,
        lastLogin: new Date().toISOString(),
        xp: 100,
        level: 2,
        totalStudyTime: 300,
        weeklyGoals: { questions: 50, studyTime: 300 },
        stats: { totalQuestions: 10, correctQuestions: 8, sessionsCompleted: 5 },
      };

      await storageService.saveToIndexedDB('profiles', 'main', profile);
      const backup = await storageService.createBackup();
      
      expect(backup).toBeDefined();
      expect(backup.timestamp).toBeDefined();
      expect(backup.data).toBeDefined();
    });

    it('deve restaurar dados de um backup', async () => {
      await storageService.initializeIndexedDB();
      
      const profile: UserProfile = {
        name: 'Test User',
        photo: null,
        achievements: [],
        streak: 5,
        bestStreak: 10,
        lastLogin: new Date().toISOString(),
        xp: 100,
        level: 2,
        totalStudyTime: 300,
        weeklyGoals: { questions: 50, studyTime: 300 },
        stats: { totalQuestions: 10, correctQuestions: 8, sessionsCompleted: 5 },
      };

      await storageService.saveToIndexedDB('profiles', 'main', profile);
      const backup = await storageService.createBackup();
      
      // Limpar dados
      await storageService.deleteFromIndexedDB('profiles', 'main');
      
      // Restaurar
      await storageService.restoreBackup(backup);
      const restored = await storageService.getFromIndexedDB('profiles', 'main');
      
      expect(restored).toEqual(profile);
    });
  });

  describe('Sincronização de dados', () => {
    it('deve sincronizar localStorage com IndexedDB', async () => {
      await storageService.initializeIndexedDB();
      
      const data = { key: 'value' };
      storageService.setLocalStorage('sync_test', data);
      
      await storageService.syncLocalStorageToIndexedDB();
      
      const synced = await storageService.getFromIndexedDB('sync_cache', 'sync_test');
      expect(synced).toEqual(data);
    });
  });

  describe('Validação de dados', () => {
    it('deve validar dados antes de salvar', async () => {
      await storageService.initializeIndexedDB();
      
      const invalidProfile = {
        name: '',
        level: -1,
      };

      const isValid = storageService.validateProfile(invalidProfile as any);
      expect(isValid).toBe(false);
    });

    it('deve aceitar dados válidos', async () => {
      const validProfile: UserProfile = {
        name: 'Valid User',
        photo: null,
        achievements: [],
        streak: 0,
        bestStreak: 0,
        lastLogin: null,
        xp: 0,
        level: 1,
        totalStudyTime: 0,
        weeklyGoals: { questions: 50, studyTime: 300 },
        stats: { totalQuestions: 0, correctQuestions: 0, sessionsCompleted: 0 },
      };

      const isValid = storageService.validateProfile(validProfile);
      expect(isValid).toBe(true);
    });
  });
});
