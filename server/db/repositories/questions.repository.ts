import { db } from "../index";
import { questions, type NewQuestion, type Question } from "../schema/questions";
import { eq, and, gte, lte, inArray } from "drizzle-orm";

/**
 * Repositório de Questões
 * 
 * Operações CRUD com suporte a Upsert (não sobrescreve histórico)
 */

/**
 * Insere ou ignora questão (se hash já existe)
 * Preserva histórico de progresso do usuário
 */
export async function upsertQuestion(data: NewQuestion): Promise<Question | null> {
  try {
    // Verifica se questão já existe
    const existing = await db
      .select()
      .from(questions)
      .where(eq(questions.contentHash, data.contentHash))
      .limit(1);

    if (existing.length > 0) {
      console.log(`📌 Questão já existe (hash: ${data.contentHash})`);
      return existing[0];
    }

    // Insere nova questão
    const result = await db
      .insert(questions)
      .values(data)
      .returning();

    console.log(`✅ Questão inserida: ${result[0].id}`);
    return result[0];
  } catch (error) {
    console.error("❌ Erro ao fazer upsert de questão:", error);
    return null;
  }
}

/**
 * Insere múltiplas questões em batch (mais eficiente)
 * Usa ON CONFLICT DO NOTHING para evitar duplicatas
 */
export async function batchUpsertQuestions(
  questionsData: NewQuestion[]
): Promise<{ inserted: number; duplicated: number; failed: number }> {
  let inserted = 0;
  let duplicated = 0;
  let failed = 0;

  // Processar em chunks de 100
  const chunkSize = 100;
  for (let i = 0; i < questionsData.length; i += chunkSize) {
    const chunk = questionsData.slice(i, i + chunkSize);

    try {
      // Verificar quais já existem
      const hashes = chunk.map((q) => q.contentHash);
      const existing = await db
        .select({ contentHash: questions.contentHash })
        .from(questions)
        .where(inArray(questions.contentHash, hashes));

      const existingHashes = new Set(existing.map((q) => q.contentHash));

      // Separar novas de duplicadas
      const newQuestions = chunk.filter(
        (q) => !existingHashes.has(q.contentHash)
      );
      const duplicateCount = chunk.length - newQuestions.length;

      // Inserir apenas as novas
      if (newQuestions.length > 0) {
        await db.insert(questions).values(newQuestions);
        inserted += newQuestions.length;
      }

      duplicated += duplicateCount;
    } catch (error) {
      console.error(`❌ Erro ao processar chunk ${i / chunkSize + 1}:`, error);
      failed += chunk.length;
    }
  }

  return { inserted, duplicated, failed };
}

/**
 * Busca questões por disciplina e dificuldade
 */
export async function getQuestionsByFilter(filter: {
  discipline?: string;
  difficulty?: string;
  year?: number;
  source?: string;
  limit?: number;
  offset?: number;
}): Promise<Question[]> {
  let query = db.select().from(questions);

  const conditions = [];

  if (filter.discipline) {
    conditions.push(eq(questions.discipline, filter.discipline));
  }

  if (filter.difficulty) {
    conditions.push(eq(questions.difficulty, filter.difficulty));
  }

  if (filter.year) {
    conditions.push(eq(questions.year, filter.year));
  }

  if (filter.source) {
    conditions.push(eq(questions.source, filter.source));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  if (filter.limit) {
    query = query.limit(filter.limit);
  }

  if (filter.offset) {
    query = query.offset(filter.offset);
  }

  return query;
}

/**
 * Busca questões por período (1980-2026)
 */
export async function getQuestionsByYearRange(
  startYear: number,
  endYear: number
): Promise<Question[]> {
  return db
    .select()
    .from(questions)
    .where(
      and(
        gte(questions.year, startYear),
        lte(questions.year, endYear)
      )
    );
}

/**
 * Atualiza dificuldade baseado em feedback
 * Reclassifica questão se muitos usuários acertam/erram
 */
export async function updateDifficultyByFeedback(
  questionId: number,
  newDifficulty: string
): Promise<Question | null> {
  try {
    const result = await db
      .update(questions)
      .set({
        difficulty: newDifficulty,
        updatedAt: new Date(),
      })
      .where(eq(questions.id, questionId))
      .returning();

    return result[0] || null;
  } catch (error) {
    console.error("❌ Erro ao atualizar dificuldade:", error);
    return null;
  }
}

/**
 * Conta questões por disciplina
 */
export async function countByDiscipline(): Promise<
  Array<{ discipline: string; count: number }>
> {
  const result = await db
    .select({
      discipline: questions.discipline,
      count: db.sql`count(*)`,
    })
    .from(questions)
    .groupBy(questions.discipline);

  return result as Array<{ discipline: string; count: number }>;
}

/**
 * Conta questões por dificuldade
 */
export async function countByDifficulty(): Promise<
  Array<{ difficulty: string; count: number }>
> {
  const result = await db
    .select({
      difficulty: questions.difficulty,
      count: db.sql`count(*)`,
    })
    .from(questions)
    .groupBy(questions.difficulty);

  return result as Array<{ difficulty: string; count: number }>;
}

/**
 * Conta questões por fonte
 */
export async function countBySource(): Promise<
  Array<{ source: string; count: number }>
> {
  const result = await db
    .select({
      source: questions.source,
      count: db.sql`count(*)`,
    })
    .from(questions)
    .groupBy(questions.source);

  return result as Array<{ source: string; count: number }>;
}

/**
 * Gera estatísticas gerais
 */
export async function getStatistics(): Promise<{
  totalQuestions: number;
  byDiscipline: Array<{ discipline: string; count: number }>;
  byDifficulty: Array<{ difficulty: string; count: number }>;
  bySource: Array<{ source: string; count: number }>;
  yearRange: { min: number; max: number };
}> {
  const [total, byDiscipline, byDifficulty, bySource, yearStats] =
    await Promise.all([
      db.select({ count: db.sql`count(*)` }).from(questions),
      countByDiscipline(),
      countByDifficulty(),
      countBySource(),
      db
        .select({
          min: db.sql`min(${questions.year})`,
          max: db.sql`max(${questions.year})`,
        })
        .from(questions),
    ]);

  return {
    totalQuestions: (total[0]?.count as number) || 0,
    byDiscipline,
    byDifficulty,
    bySource,
    yearRange: {
      min: (yearStats[0]?.min as number) || 1980,
      max: (yearStats[0]?.max as number) || 2026,
    },
  };
}

/**
 * Limpa questões inativas (soft delete)
 */
export async function deactivateQuestion(questionId: number): Promise<void> {
  await db
    .update(questions)
    .set({
      isActive: 0,
      updatedAt: new Date(),
    })
    .where(eq(questions.id, questionId));
}

/**
 * Restaura questão inativa
 */
export async function reactivateQuestion(questionId: number): Promise<void> {
  await db
    .update(questions)
    .set({
      isActive: 1,
      updatedAt: new Date(),
    })
    .where(eq(questions.id, questionId));
}
