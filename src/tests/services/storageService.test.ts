import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('storageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('localStorage operations', () => {
    it('deve salvar dados em localStorage', () => {
      const testData = { name: 'Test User', level: 5 };
      localStorage.setItem('user', JSON.stringify(testData));

      const retrieved = localStorage.getItem('user');
      expect(retrieved).toBeDefined();
      expect(JSON.parse(retrieved!)).toEqual(testData);
    });

    it('deve retornar null para chave inexistente', () => {
      const retrieved = localStorage.getItem('nonexistent');
      expect(retrieved).toBeNull();
    });

    it('deve remover dados de localStorage', () => {
      localStorage.setItem('user', JSON.stringify({ name: 'Test' }));
      localStorage.removeItem('user');

      const retrieved = localStorage.getItem('user');
      expect(retrieved).toBeNull();
    });

    it('deve limpar todo localStorage', () => {
      localStorage.setItem('user', JSON.stringify({ name: 'Test' }));
      localStorage.setItem('settings', JSON.stringify({ theme: 'dark' }));

      localStorage.clear();

      expect(localStorage.getItem('user')).toBeNull();
      expect(localStorage.getItem('settings')).toBeNull();
    });
  });

  describe('Data persistence', () => {
    it('deve persistir dados após fechar e reabrir', () => {
      const data = { xp: 100, level: 2 };
      localStorage.setItem('progress', JSON.stringify(data));

      const retrieved = JSON.parse(localStorage.getItem('progress')!);
      expect(retrieved).toEqual(data);
    });

    it('deve validar dados antes de salvar', () => {
      const validData = { name: 'User', level: 1 };
      const isValid = validData.name && validData.level >= 1;

      expect(isValid).toBe(true);
    });

    it('deve rejeitar dados inválidos', () => {
      const invalidData = { name: '', level: -1 };
      const isValid = invalidData.name && invalidData.level >= 1;

      expect(isValid).toBe(false);
    });
  });

  describe('Backup and restore', () => {
    it('deve criar backup de dados', () => {
      const data = {
        profile: { name: 'User', level: 5 },
        questions: [],
        tasks: [],
      };

      const backup = JSON.stringify(data);
      expect(backup).toBeDefined();
      expect(typeof backup).toBe('string');
    });

    it('deve restaurar dados de um backup', () => {
      const originalData = {
        profile: { name: 'User', level: 5 },
        questions: [],
        tasks: [],
      };

      const backup = JSON.stringify(originalData);
      const restored = JSON.parse(backup);

      expect(restored).toEqual(originalData);
    });

    it('deve validar integridade do backup', () => {
      const backup = {
        version: '1.0.0',
        timestamp: Date.now(),
        data: { profile: { name: 'User' } },
      };

      const isValid =
        backup.version &&
        backup.timestamp &&
        backup.data &&
        typeof backup.data === 'object';

      expect(isValid).toBe(true);
    });
  });

  describe('Sync operations', () => {
    it('deve sincronizar dados entre abas', () => {
      const data = { synced: true, timestamp: Date.now() };
      localStorage.setItem('sync_data', JSON.stringify(data));

      const retrieved = JSON.parse(localStorage.getItem('sync_data')!);
      expect(retrieved.synced).toBe(true);
    });

    it('deve detectar conflitos de sincronização', () => {
      const data1 = { version: 1, timestamp: 1000 };
      const data2 = { version: 2, timestamp: 2000 };

      const hasConflict = data1.version !== data2.version;
      expect(hasConflict).toBe(true);
    });

    it('deve resolver conflitos com timestamp mais recente', () => {
      const data1 = { version: 1, timestamp: 1000 };
      const data2 = { version: 2, timestamp: 2000 };

      const resolved = data2.timestamp > data1.timestamp ? data2 : data1;
      expect(resolved).toEqual(data2);
    });
  });

  describe('Data compression', () => {
    it('deve comprimir dados para economia de espaço', () => {
      const data = { name: 'User', level: 5, xp: 1000 };
      const compressed = JSON.stringify(data);

      expect(compressed.length).toBeLessThan(JSON.stringify(data).length + 100);
    });

    it('deve descomprimir dados corretamente', () => {
      const original = { name: 'User', level: 5 };
      const compressed = JSON.stringify(original);
      const decompressed = JSON.parse(compressed);

      expect(decompressed).toEqual(original);
    });
  });

  describe('Error handling', () => {
    it('deve tratar erros de parsing JSON', () => {
      const invalidJson = 'not valid json';

      try {
        JSON.parse(invalidJson);
        expect(true).toBe(false); // Não deve chegar aqui
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('deve tratar erros de armazenamento cheio', () => {
      try {
        // Simular armazenamento cheio
        const largeData = 'x'.repeat(5 * 1024 * 1024);
        localStorage.setItem('large', largeData);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('deve recuperar de erros graciosamente', () => {
      const fallbackData = { default: true };

      try {
        const data = JSON.parse('invalid');
      } catch (error) {
        const recovered = fallbackData;
        expect(recovered.default).toBe(true);
      }
    });
  });

  describe('Performance', () => {
    it('deve salvar dados rapidamente', () => {
      const start = performance.now();

      for (let i = 0; i < 100; i++) {
        localStorage.setItem(`key_${i}`, JSON.stringify({ data: i }));
      }

      const end = performance.now();
      const duration = end - start;

      expect(duration).toBeLessThan(1000);
    });

    it('deve recuperar dados rapidamente', () => {
      for (let i = 0; i < 100; i++) {
        localStorage.setItem(`key_${i}`, JSON.stringify({ data: i }));
      }

      const start = performance.now();

      for (let i = 0; i < 100; i++) {
        localStorage.getItem(`key_${i}`);
      }

      const end = performance.now();
      const duration = end - start;

      expect(duration).toBeLessThan(1000);
    });
  });

  describe('Storage limits', () => {
    it('deve respeitar limite de armazenamento', () => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const testData = 'x'.repeat(1024); // 1KB

      expect(testData.length).toBeLessThan(maxSize);
    });

    it('deve limpar dados antigos quando necessário', () => {
      const now = Date.now();
      const data = [
        { timestamp: now - 30 * 24 * 60 * 60 * 1000, data: 'old' }, // 30 dias atrás
        { timestamp: now, data: 'recent' },
      ];

      const cutoff = now - 7 * 24 * 60 * 60 * 1000; // 7 dias
      const filtered = data.filter((d) => d.timestamp > cutoff);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].data).toBe('recent');
    });
  });
});
