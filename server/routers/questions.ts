import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db/index";
import { questions } from "../db/schema/questions";
import { eq, and, like, inArray } from "drizzle-orm";

export const questionsRouter = router({
  /**
   * Busca questões por disciplina com paginação
   */
  getByDiscipline: publicProcedure
    .input(
      z.object({
        discipline: z.enum(["Matemática", "Linguagens", "Ciências Humanas", "Ciências da Natureza"]),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db
        .select()
        .from(questions)
        .where(eq(questions.discipline, input.discipline))
        .limit(input.limit)
        .offset(input.offset);

      return result;
    }),

  /**
   * Busca questões por subdisciplina
   */
  getBySubdiscipline: publicProcedure
    .input(
      z.object({
        subdiscipline: z.string(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db
        .select()
        .from(questions)
        .where(eq(questions.subdiscipline, input.subdiscipline))
        .limit(input.limit)
        .offset(input.offset);

      return result;
    }),

  /**
   * Busca questões por dificuldade
   */
  getByDifficulty: publicProcedure
    .input(
      z.object({
        difficulty: z.enum(["Fácil", "Média", "Difícil"]),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db
        .select()
        .from(questions)
        .where(eq(questions.difficulty, input.difficulty))
        .limit(input.limit)
        .offset(input.offset);

      return result;
    }),

  /**
   * Busca questões por ano
   */
  getByYear: publicProcedure
    .input(
      z.object({
        year: z.number().min(1980).max(2026),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db
        .select()
        .from(questions)
        .where(eq(questions.year, input.year))
        .limit(input.limit)
        .offset(input.offset);

      return result;
    }),

  /**
   * Busca questões por fonte (ENEM, FUVEST, etc)
   */
  getBySource: publicProcedure
    .input(
      z.object({
        source: z.string(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db
        .select()
        .from(questions)
        .where(eq(questions.source, input.source))
        .limit(input.limit)
        .offset(input.offset);

      return result;
    }),

  /**
   * Busca aleatória de questões
   */
  getRandom: publicProcedure
    .input(
      z.object({
        discipline: z.enum(["Matemática", "Linguagens", "Ciências Humanas", "Ciências da Natureza"]).optional(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      let result = await db
        .select()
        .from(questions)
        .where(input.discipline ? eq(questions.discipline, input.discipline) : undefined)
        .limit(input.limit);

      // Shuffle array
      return result.sort(() => Math.random() - 0.5);
    }),

  /**
   * Busca por filtros múltiplos
   */
  search: publicProcedure
    .input(
      z.object({
        discipline: z.enum(["Matemática", "Linguagens", "Ciências Humanas", "Ciências da Natureza"]).optional(),
        subdiscipline: z.string().optional(),
        difficulty: z.enum(["Fácil", "Média", "Difícil"]).optional(),
        year: z.number().min(1980).max(2026).optional(),
        source: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const conditions = [];

      if (input.discipline) {
        conditions.push(eq(questions.discipline, input.discipline));
      }
      if (input.subdiscipline) {
        conditions.push(eq(questions.subdiscipline, input.subdiscipline));
      }
      if (input.difficulty) {
        conditions.push(eq(questions.difficulty, input.difficulty));
      }
      if (input.year) {
        conditions.push(eq(questions.year, input.year));
      }
      if (input.source) {
        conditions.push(eq(questions.source, input.source));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
      const result = await db
        .select()
        .from(questions)
        .where(whereClause)
        .limit(input.limit)
        .offset(input.offset);

      return result;
    }),

  /**
   * Conta total de questões
   */
  count: publicProcedure
    .input(
      z.object({
        discipline: z.enum(["Matemática", "Linguagens", "Ciências Humanas", "Ciências da Natureza"]).optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const whereClause = input.discipline ? eq(questions.discipline, input.discipline) : undefined;
      const result = await db
        .select()
        .from(questions)
        .where(whereClause);

      return {
        total: result.length,
        discipline: input.discipline,
      };
    }),

  /**
   * Busca questão por ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db
        .select()
        .from(questions)
        .where(eq(questions.id, input.id))
        .limit(1) as any;

      return result[0] || null;
    }),

  /**
   * Busca estatísticas gerais
   */
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const allQuestions = await db.select().from(questions) as any;

    const stats = {
      total: allQuestions.length,
      byDiscipline: {} as Record<string, number>,
      byDifficulty: {} as Record<string, number>,
      bySource: {} as Record<string, number>,
      yearRange: { min: 1980, max: 2026 },
    };

    for (const q of allQuestions) {
      if (q.discipline) {
        stats.byDiscipline[q.discipline] = (stats.byDiscipline[q.discipline] || 0) + 1;
      }
      if (q.difficulty) {
        stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
      }
      if (q.source) {
        stats.bySource[q.source] = (stats.bySource[q.source] || 0) + 1;
      }
    }

    return stats;
  }),
});
