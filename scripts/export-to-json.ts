import { getDb } from "../server/db/index";
import { sql } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";

async function exportQuestionsToJSON() {
  console.log("📊 Iniciando exportação de questões para JSON...");

  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    // Buscar todas as questões
    const result = await db.execute(
      sql`SELECT * FROM questions ORDER BY id ASC LIMIT 10340`
    );

    const questionsData = (result as any).rows || [];

    console.log(`✅ Carregadas ${questionsData.length} questões do banco`);

    // Criar diretório se não existir
    const dataDir = path.join(process.cwd(), "src", "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Salvar em JSON
    const outputPath = path.join(dataDir, "questions-offline.json");
    fs.writeFileSync(outputPath, JSON.stringify(questionsData, null, 2));

    console.log(`✅ Exportadas ${questionsData.length} questões para ${outputPath}`);
    console.log(`📦 Tamanho do arquivo: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)}MB`);

    // Gerar estatísticas
    const stats = {
      total: questionsData.length,
      disciplines: new Set(questionsData.map((q: any) => q.discipline)).size,
      sources: new Set(questionsData.map((q: any) => q.source)).size,
      years: new Set(questionsData.map((q: any) => q.year)).size,
      difficulties: new Set(questionsData.map((q: any) => q.difficulty)).size,
    };

    console.log("\n📈 Estatísticas:");
    console.log(`   Total: ${stats.total}`);
    console.log(`   Disciplinas: ${stats.disciplines}`);
    console.log(`   Fontes: ${stats.sources}`);
    console.log(`   Anos: ${stats.years}`);
    console.log(`   Dificuldades: ${stats.difficulties}`);
  } catch (error) {
    console.error("❌ Erro ao exportar:", error);
    process.exit(1);
  }
}

exportQuestionsToJSON();
