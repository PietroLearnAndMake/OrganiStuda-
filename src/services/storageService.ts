/**
 * Serviço de Persistência Offline com IndexedDB
 * Garante que nenhum dado do usuário é perdido após fechamento do app
 */

const DB_NAME = 'OrganiStudaDB';
const DB_VERSION = 1;

interface StorageConfig {
  objectStores: {
    name: string;
    keyPath: string;
    indexes?: Array<{ name: string; keyPath: string }>;
  }[];
}

const STORAGE_CONFIG: StorageConfig = {
  objectStores: [
    {
      name: 'profile',
      keyPath: 'id',
    },
    {
      name: 'subjects',
      keyPath: 'id',
    },
    {
      name: 'questions',
      keyPath: 'id',
      indexes: [
        { name: 'subjectId', keyPath: 'subjectId' },
        { name: 'institution', keyPath: 'institution' },
      ],
    },
    {
      name: 'tasks',
      keyPath: 'id',
    },
    {
      name: 'streak',
      keyPath: 'id',
    },
    {
      name: 'xp_history',
      keyPath: 'id',
      indexes: [{ name: 'timestamp', keyPath: 'timestamp' }],
    },
    {
      name: 'sync_queue',
      keyPath: 'id',
      indexes: [{ name: 'status', keyPath: 'status' }],
    },
  ],
};

class StorageService {
  private db: IDBDatabase | null = null;

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Erro ao abrir IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB inicializado com sucesso');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        STORAGE_CONFIG.objectStores.forEach((store) => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, { keyPath: store.keyPath });

            if (store.indexes) {
              store.indexes.forEach((index) => {
                objectStore.createIndex(index.name, index.keyPath);
              });
            }
          }
        });
      };
    });
  }

  async set<T>(storeName: string, data: T): Promise<void> {
    if (!this.db) throw new Error('IndexedDB não inicializado');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async get<T>(storeName: string, key: string): Promise<T | undefined> {
    if (!this.db) throw new Error('IndexedDB não inicializado');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    if (!this.db) throw new Error('IndexedDB não inicializado');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async delete(storeName: string, key: string): Promise<void> {
    if (!this.db) throw new Error('IndexedDB não inicializado');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(storeName: string): Promise<void> {
    if (!this.db) throw new Error('IndexedDB não inicializado');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async query<T>(
    storeName: string,
    indexName: string,
    value: any
  ): Promise<T[]> {
    if (!this.db) throw new Error('IndexedDB não inicializado');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const index = objectStore.index(indexName);
      const request = index.getAll(value);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async backup(): Promise<string> {
    const backup: Record<string, any> = {};

    for (const store of STORAGE_CONFIG.objectStores) {
      backup[store.name] = await this.getAll(store.name);
    }

    return JSON.stringify(backup);
  }

  async restore(backupData: string): Promise<void> {
    const backup = JSON.parse(backupData);

    for (const [storeName, items] of Object.entries(backup)) {
      await this.clear(storeName);
      for (const item of items as any[]) {
        await this.set(storeName, item);
      }
    }
  }

  async getSize(): Promise<number> {
    let totalSize = 0;

    for (const store of STORAGE_CONFIG.objectStores) {
      const items = await this.getAll(store.name);
      totalSize += JSON.stringify(items).length;
    }

    return totalSize;
  }
}

export const storageService = new StorageService();
