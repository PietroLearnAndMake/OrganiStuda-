import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/questions";

/**
 * Inicializa conexão com PostgreSQL
 * Usa DATABASE_URL da variável de ambiente
 */
let _db: ReturnType<typeof drizzle> | null = null;

export async function initializeDb() {
  if (_db) return _db;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.warn(
      "[Database] DATABASE_URL não configurada. Operações de banco serão simuladas."
    );
    return null;
  }

  try {
    const sql = postgres(databaseUrl);
    _db = drizzle(sql, { schema });
    console.log("[Database] ✅ Conectado ao PostgreSQL com postgres-js");
    return _db;
  } catch (error) {
    console.error("[Database] ❌ Erro ao conectar:", error);
    return null;
  }
}

export async function getDb() {
  if (!_db) {
    return await initializeDb();
  }
  return _db;
}

// Exporta instância lazy-loaded
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get: async (target, prop) => {
    const instance = await getDb();
    if (!instance) {
      throw new Error(
        "Database not initialized. Set DATABASE_URL environment variable."
      );
    }
    return (instance as any)[prop];
  },
});
