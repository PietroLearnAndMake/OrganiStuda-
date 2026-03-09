import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import * as SecureStore from "expo-secure-store";

/**
 * Serviço de Sincronização Offline com Criptografia
 * 
 * Responsabilidades:
 * 1. Sincronizar questões para SQLite local
 * 2. Criptografar banco de dados
 * 3. Gerenciar cache offline
 * 4. Sincronizar progresso do usuário
 */

interface SyncConfig {
  databaseName: string;
  encryptionKey?: string;
  chunkSize?: number;
}

interface SyncProgress {
  totalQuestions: number;
  syncedQuestions: number;
  percentage: number;
  status: "idle" | "syncing" | "completed" | "error";
  lastSyncTime?: Date;
}

class OfflineSyncService {
  private sqlite: any = null;
  private config: SyncConfig;
  private syncProgress: SyncProgress = {
    totalQuestions: 0,
    syncedQuestions: 0,
    percentage: 0,
    status: "idle",
  };

  constructor(config: SyncConfig) {
    this.config = {
      chunkSize: 100,
      ...config,
    };
  }

  /**
   * Inicializa conexão com SQLite
   */
  async initialize(): Promise<void> {
    try {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);

      const result = await this.sqlite.createConnection(
        this.config.databaseName,
        false,
        "no-encryption",
        1,
        false
      );

      console.log(`✅ SQLite inicializado: ${this.config.databaseName}`);

      await this.createTables();

      if (this.config.encryptionKey) {
        await this.enableEncryption(this.config.encryptionKey);
      }
    } catch (error) {
      console.error("❌ Erro ao inicializar SQLite:", error);
      throw error;
    }
  }

  /**
   * Cria tabelas no SQLite local
   */
  private async createTables(): Promise<void> {
    if (!this.sqlite) throw new Error("SQLite não inicializado");

    const createQuestionsTable = `
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY,
        content_hash TEXT UNIQUE NOT NULL,
        text TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        option_e TEXT,
        correct_answer TEXT NOT NULL,
        discipline TEXT NOT NULL,
        subdiscipline TEXT,
        difficulty TEXT NOT NULL,
        year INTEGER NOT NULL,
        source TEXT NOT NULL,
        exam_type TEXT,
        success_rate INTEGER,
        context_text TEXT,
        explanation TEXT,
        topics TEXT,
        metadata TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        synced_at DATETIME
      );
    `;

    const createStatsTable = `
      CREATE TABLE IF NOT EXISTS question_stats (
        id INTEGER PRIMARY KEY,
        question_id INTEGER NOT NULL,
        user_answer TEXT,
        is_correct INTEGER DEFAULT 0,
        time_spent INTEGER,
        attempts INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(question_id) REFERENCES questions(id)
      );
    `;

    const createSyncTable = `
      CREATE TABLE IF NOT EXISTS sync_metadata (
        id INTEGER PRIMARY KEY,
        last_sync DATETIME,
        total_questions INTEGER,
        total_synced INTEGER,
        status TEXT
      );
    `;

    try {
      await (this.sqlite as any).run({ statement: createQuestionsTable });
      await (this.sqlite as any).run({ statement: createStatsTable });
      await (this.sqlite as any).run({ statement: createSyncTable });
      console.log("✅ Tabelas criadas com sucesso");
    } catch (error) {
      console.error("❌ Erro ao criar tabelas:", error);
    }
  }

  /**
   * Ativa criptografia no banco de dados
   */
  private async enableEncryption(encryptionKey: string): Promise<void> {
    if (!this.sqlite) throw new Error("SQLite não inicializado");

    try {
      await SecureStore.setItemAsync("sqlite_encryption_key", encryptionKey);

      const pragmaSQL = `
        PRAGMA key = '${encryptionKey}';
        PRAGMA cipher_page_size = 4096;
        PRAGMA kdf_iter = 256000;
      `;
      
      await (this.sqlite as any).run({ statement: pragmaSQL });
      console.log("🔐 Criptografia SQLite ativada");
    } catch (error) {
      console.error("❌ Erro ao ativar criptografia:", error);
    }
  }

  /**
   * Sincroniza questões do servidor para SQLite local
   */
  async syncQuestions(
    questions: any[],
    onProgress?: (progress: SyncProgress) => void
  ): Promise<void> {
    if (!this.sqlite) throw new Error("SQLite não inicializado");

    this.syncProgress = {
      totalQuestions: questions.length,
      syncedQuestions: 0,
      percentage: 0,
      status: "syncing",
    };

    try {
      const chunkSize = this.config.chunkSize || 100;

      for (let i = 0; i < questions.length; i += chunkSize) {
        const chunk = questions.slice(i, i + chunkSize);

        for (const question of chunk) {
          await this.insertQuestion(question);
          this.syncProgress.syncedQuestions++;
        }

        this.syncProgress.percentage = Math.round(
          (this.syncProgress.syncedQuestions / this.syncProgress.totalQuestions) * 100
        );

        if (onProgress) {
          onProgress(this.syncProgress);
        }

        console.log(
          `📊 Sincronização: ${this.syncProgress.percentage}% (${this.syncProgress.syncedQuestions}/${this.syncProgress.totalQuestions})`
        );
      }

      await this.updateSyncMetadata();

      this.syncProgress.status = "completed";
      this.syncProgress.lastSyncTime = new Date();

      if (onProgress) {
        onProgress(this.syncProgress);
      }

      console.log("✅ Sincronização concluída");
    } catch (error) {
      this.syncProgress.status = "error";
      console.error("❌ Erro durante sincronização:", error);
      throw error;
    }
  }

  /**
   * Insere uma questão no SQLite
   */
  private async insertQuestion(question: any): Promise<void> {
    if (!this.sqlite) throw new Error("SQLite não inicializado");

    const sql = `
      INSERT OR IGNORE INTO questions (
        id, content_hash, text, option_a, option_b, option_c, option_d, option_e,
        correct_answer, discipline, subdiscipline, difficulty, year, source,
        exam_type, success_rate, context_text, explanation, topics, metadata, synced_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      question.id,
      question.contentHash,
      question.text,
      question.optionA,
      question.optionB,
      question.optionC,
      question.optionD,
      question.optionE,
      question.correctAnswer,
      question.discipline,
      question.subdiscipline,
      question.difficulty,
      question.year,
      question.source,
      question.examType,
      question.successRate,
      question.contextText,
      question.explanation,
      JSON.stringify(question.topics),
      JSON.stringify(question.metadata),
      new Date().toISOString(),
    ];

    try {
      await (this.sqlite as any).run({ statement: sql, values });
    } catch (error) {
      console.error(`❌ Erro ao inserir questão ${question.id}:`, error);
    }
  }

  /**
   * Busca questões do SQLite local
   */
  async getQuestions(filter?: {
    discipline?: string;
    difficulty?: string;
    limit?: number;
  }): Promise<any[]> {
    if (!this.sqlite) throw new Error("SQLite não inicializado");

    let sql = "SELECT * FROM questions WHERE 1=1";
    const values: any[] = [];

    if (filter?.discipline) {
      sql += " AND discipline = ?";
      values.push(filter.discipline);
    }

    if (filter?.difficulty) {
      sql += " AND difficulty = ?";
      values.push(filter.difficulty);
    }

    if (filter?.limit) {
      sql += ` LIMIT ${filter.limit}`;
    }

    try {
      const result = await (this.sqlite as any).query({ statement: sql, values });
      return result.values || [];
    } catch (error) {
      console.error("❌ Erro ao buscar questões:", error);
      return [];
    }
  }

  /**
   * Salva resposta do usuário localmente
   */
  async saveAnswer(
    questionId: number,
    userAnswer: string,
    isCorrect: boolean,
    timeSpent: number
  ): Promise<void> {
    if (!this.sqlite) throw new Error("SQLite não inicializado");

    const sql = `
      INSERT INTO question_stats (question_id, user_answer, is_correct, time_spent)
      VALUES (?, ?, ?, ?)
    `;

    try {
      await (this.sqlite as any).run({ statement: sql, values: [questionId, userAnswer, isCorrect ? 1 : 0, timeSpent] });
    } catch (error) {
      console.error("❌ Erro ao salvar resposta:", error);
    }
  }

  /**
   * Atualiza metadata de sincronização
   */
  private async updateSyncMetadata(): Promise<void> {
    if (!this.sqlite) throw new Error("SQLite não inicializado");

    const sql = `
      INSERT OR REPLACE INTO sync_metadata (id, last_sync, total_questions, total_synced, status)
      VALUES (1, ?, ?, ?, 'completed')
    `;

    try {
      await (this.sqlite as any).run({
        statement: sql,
        values: [
          new Date().toISOString(),
          this.syncProgress.totalQuestions,
          this.syncProgress.syncedQuestions,
        ],
      });
    } catch (error) {
      console.error("❌ Erro ao atualizar metadata:", error);
    }
  }

  /**
   * Obtém progresso de sincronização
   */
  getSyncProgress(): SyncProgress {
    return this.syncProgress;
  }

  /**
   * Fecha conexão com SQLite
   */
  async close(): Promise<void> {
    if (this.sqlite) {
      try {
        await this.sqlite.closeConnection(this.config.databaseName, false);
        console.log("✅ SQLite fechado");
      } catch (error) {
        console.error("❌ Erro ao fechar SQLite:", error);
      }
    }
  }
}

export default OfflineSyncService;
