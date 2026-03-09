import { sql } from "drizzle-orm";
import { integer, text, timestamp, varchar, index, uniqueIndex } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

/**
 * Tabela de Questões (1980-2026)
 * 
 * Armazena questões de vestibulares regionais e ENEM
 * com suporte a deduplicação, classificação de dificuldade e sincronização offline.
 */
export const questions = pgTable(
  "questions",
  {
    // ID único
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    // Hash SHA-256 do texto da questão (para deduplicação)
    contentHash: varchar("content_hash", { length: 64 }).notNull().unique(),

    // Texto da questão
    text: text().notNull(),

    // Alternativas (A, B, C, D, E)
    optionA: text().notNull(),
    optionB: text().notNull(),
    optionC: text().notNull(),
    optionD: text().notNull(),
    optionE: text(),

    // Resposta correta (A, B, C, D, E)
    correctAnswer: varchar("correct_answer", { length: 1 }).notNull(),

    // Disciplina (Português, Matemática, História, etc.)
    discipline: varchar("discipline", { length: 100 }).notNull(),

    // Subdisciplina (Geometria, Álgebra, etc.)
    subdiscipline: varchar("subdiscipline", { length: 100 }),

    // Dificuldade (Fácil, Média, Difícil)
    difficulty: varchar("difficulty", { length: 20 }).notNull().default("Média"),

    // Ano da questão (1980-2026)
    year: integer().notNull(),

    // Fonte (ENEM, FUVEST, UNICAMP, etc.)
    source: varchar("source", { length: 100 }).notNull(),

    // Tipo de exame (Regular, PPL, Específico)
    examType: varchar("exam_type", { length: 50 }).notNull().default("Regular"),

    // Taxa de acerto (0-100) - se disponível na fonte
    successRate: integer("success_rate"),

    // Texto de apoio/contexto (se houver)
    contextText: text("context_text"),

    // Explicação da resposta
    explanation: text(),

    // Tópicos relacionados (JSON array)
    topics: text(), // JSON: ["Trigonometria", "Ângulos"]

    // Metadados adicionais (JSON)
    metadata: text(), // JSON: { "originalId": "123", "source_url": "..." }

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    syncedAt: timestamp("synced_at"), // Última sincronização com cliente

    // Status
    isActive: integer("is_active").notNull().default(1),
  },
  (table) => [
    // Índices para performance
    index("idx_discipline").on(table.discipline),
    index("idx_year").on(table.year),
    index("idx_source").on(table.source),
    index("idx_difficulty").on(table.difficulty),
    index("idx_content_hash").on(table.contentHash),
    uniqueIndex("unique_content_hash").on(table.contentHash),
  ]
);

/**
 * Tabela de Estatísticas de Questões
 * 
 * Rastreia performance do usuário em cada questão
 */
export const questionStats = pgTable(
  "question_stats",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    // Referência à questão
    questionId: integer("question_id").notNull(),

    // ID do usuário
    userId: varchar("user_id", { length: 255 }).notNull(),

    // Resposta do usuário
    userAnswer: varchar("user_answer", { length: 1 }),

    // Acertou?
    isCorrect: integer("is_correct").notNull().default(0),

    // Tempo gasto (em segundos)
    timeSpent: integer("time_spent"),

    // Tentativas
    attempts: integer().notNull().default(1),

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_user_id").on(table.userId),
    index("idx_question_id").on(table.questionId),
  ]
);

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;
export type QuestionStats = typeof questionStats.$inferSelect;
export type NewQuestionStats = typeof questionStats.$inferInsert;
