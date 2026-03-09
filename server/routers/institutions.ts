import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db/index";
import { questions } from "../db/schema/questions";
import { sql } from "drizzle-orm";

export const institutionsRouter = router({
  /**
   * Busca todas as instituições distintas no banco
   */
  getAll: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    try {
      // Buscar todas as instituições distintas
      const result = await db.execute(
        sql`SELECT DISTINCT source FROM questions WHERE source IS NOT NULL ORDER BY source ASC`
      );

      const institutions = (result as any).rows?.map((row: any) => row.source) || [];
      
      return {
        institutions: institutions.filter(Boolean),
        total: institutions.length,
      };
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
      return {
        institutions: [],
        total: 0,
      };
    }
  }),

  /**
   * Busca instituições com contagem de questões
   */
  getWithCount: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    try {
      const result = await db.execute(
        sql`SELECT source, COUNT(*) as count FROM questions WHERE source IS NOT NULL GROUP BY source ORDER BY count DESC`
      );

      const institutions = (result as any).rows?.map((row: any) => ({
        name: row.source,
        count: parseInt(row.count),
      })) || [];

      return institutions;
    } catch (error) {
      console.error("Erro ao buscar instituições com contagem:", error);
      return [];
    }
  }),

  /**
   * Busca disciplinas distintas
   */
  getDisciplines: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    try {
      const result = await db.execute(
        sql`SELECT DISTINCT discipline FROM questions WHERE discipline IS NOT NULL ORDER BY discipline ASC`
      );

      const disciplines = (result as any).rows?.map((row: any) => row.discipline) || [];
      
      return disciplines.filter(Boolean);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
      return [];
    }
  }),

  /**
   * Busca subdisciplinas distintas
   */
  getSubdisciplines: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    try {
      const result = await db.execute(
        sql`SELECT DISTINCT subdiscipline FROM questions WHERE subdiscipline IS NOT NULL ORDER BY subdiscipline ASC`
      );

      const subdisciplines = (result as any).rows?.map((row: any) => row.subdiscipline) || [];
      
      return subdisciplines.filter(Boolean);
    } catch (error) {
      console.error("Erro ao buscar subdisciplinas:", error);
      return [];
    }
  }),

  /**
   * Busca anos distintos
   */
  getYears: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    try {
      const result = await db.execute(
        sql`SELECT DISTINCT year FROM questions WHERE year IS NOT NULL ORDER BY year DESC`
      );

      const years = (result as any).rows?.map((row: any) => row.year) || [];
      
      return years.filter(Boolean).sort((a: number, b: number) => b - a);
    } catch (error) {
      console.error("Erro ao buscar anos:", error);
      return [];
    }
  }),

  /**
   * Busca dificuldades distintas
   */
  getDifficulties: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    try {
      const result = await db.execute(
        sql`SELECT DISTINCT difficulty FROM questions WHERE difficulty IS NOT NULL ORDER BY difficulty ASC`
      );

      const difficulties = (result as any).rows?.map((row: any) => row.difficulty) || [];
      
      return difficulties.filter(Boolean);
    } catch (error) {
      console.error("Erro ao buscar dificuldades:", error);
      return [];
    }
  }),

  /**
   * Busca estatísticas gerais de filtros
   */
  getFilterStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    try {
      const [
        institutionsResult,
        disciplinesResult,
        yearsResult,
        difficultiesResult,
        totalResult,
      ] = await Promise.all([
        db.execute(sql`SELECT DISTINCT source FROM questions WHERE source IS NOT NULL`),
        db.execute(sql`SELECT DISTINCT discipline FROM questions WHERE discipline IS NOT NULL`),
        db.execute(sql`SELECT DISTINCT year FROM questions WHERE year IS NOT NULL`),
        db.execute(sql`SELECT DISTINCT difficulty FROM questions WHERE difficulty IS NOT NULL`),
        db.execute(sql`SELECT COUNT(*) as total FROM questions`),
      ]);

      return {
        institutions: ((institutionsResult as any).rows || []).length,
        disciplines: ((disciplinesResult as any).rows || []).length,
        years: ((yearsResult as any).rows || []).length,
        difficulties: ((difficultiesResult as any).rows || []).length,
        totalQuestions: parseInt(((totalResult as any).rows?.[0]?.total || 0)),
      };
    } catch (error) {
      console.error("Erro ao buscar estatísticas de filtros:", error);
      return {
        institutions: 0,
        disciplines: 0,
        years: 0,
        difficulties: 0,
        totalQuestions: 0,
      };
    }
  }),
});
