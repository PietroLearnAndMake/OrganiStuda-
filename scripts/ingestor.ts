import { createHash } from "crypto";
import { getDb } from "../server/db/index";
import { questions } from "../server/db/schema/questions";
import { eq } from "drizzle-orm";

/**
 * Script de Ingestão de Questões (1980-2026)
 * 
 * Responsabilidades:
 * 1. Ler questões de múltiplas fontes (ENEM, vestibulares regionais)
 * 2. Gerar Hash SHA-256 para deduplicação
 * 3. Classificar dificuldade automaticamente
 * 4. Fazer Upsert no banco (não sobrescrever histórico)
 * 5. Sincronizar com cliente offline
 */

interface RawQuestion {
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE?: string;
  correctAnswer: string;
  discipline: string;
  subdiscipline?: string;
  year: number;
  source: string;
  examType?: string;
  successRate?: number;
  contextText?: string;
  explanation?: string;
  topics?: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Gera Hash SHA-256 do texto da questão
 * Usado para deduplicação exata
 */
function generateContentHash(text: string): string {
  return createHash("sha256").update(text.trim().toLowerCase()).digest("hex");
}

/**
 * Classifica dificuldade automaticamente
 * Baseado em: extensão do texto, palavras-chave, taxa de acerto
 */
function classifyDifficulty(question: RawQuestion): string {
  let score = 0;

  // Fator 1: Extensão do texto (questões longas tendem a ser mais difíceis)
  const textLength = question.text.length;
  if (textLength > 500) score += 2;
  else if (textLength > 300) score += 1;

  // Fator 2: Contexto adicional (textos de apoio aumentam dificuldade)
  if (question.contextText && question.contextText.length > 200) score += 2;

  // Fator 3: Taxa de acerto (se disponível)
  if (question.successRate !== undefined) {
    if (question.successRate < 30) score += 3; // Muito difícil
    else if (question.successRate < 50) score += 2; // Difícil
    else if (question.successRate < 70) score += 1; // Médio
    // Acima de 70% = Fácil (score += 0)
  }

  // Fator 4: Palavras-chave de complexidade
  const complexKeywords = [
    "demonstre",
    "prove",
    "justifique",
    "analise criticamente",
    "integração",
    "derivada",
    "limite",
    "probabilidade condicional",
    "análise combinatória",
  ];

  const questionText = question.text.toLowerCase();
  const keywordCount = complexKeywords.filter((kw) =>
    questionText.includes(kw)
  ).length;
  score += keywordCount;

  // Classificação final
  if (score >= 5) return "Difícil";
  if (score >= 2) return "Média";
  return "Fácil";
}

/**
 * Valida se uma questão tem todos os campos obrigatórios
 */
function validateQuestion(question: RawQuestion): boolean {
  return (
    question.text &&
    question.optionA &&
    question.optionB &&
    question.optionC &&
    question.optionD &&
    question.correctAnswer &&
    question.discipline &&
    question.year >= 1980 &&
    question.year <= 2026 &&
    question.source &&
    ["A", "B", "C", "D", "E"].includes(question.correctAnswer)
  );
}

/**
 * Verifica se é um vestibular militar (blacklist)
 */
function isBlacklisted(source: string): boolean {
  const militarVestibulars = [
    "ITA",
    "IME",
    "AFA",
    "EFOMM",
    "EsPCEx",
    "AMAN",
    "Escola Naval",
  ];
  return militarVestibulars.some((military) =>
    source.toUpperCase().includes(military)
  );
}

/**
 * Ingestão principal
 */
async function ingestQuestions(questionsData: RawQuestion[]): Promise<void> {
  console.log(`📥 Iniciando ingestão de ${questionsData.length} questões...`);

  const db = await getDb();
  if (!db) {
    console.error("❌ Banco de dados não disponível");
    return;
  }

  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  let duplicated = 0;

  for (const rawQuestion of questionsData) {
    try {
      // Validação
      if (!validateQuestion(rawQuestion)) {
        console.warn(`⚠️ Questão inválida: ${rawQuestion.text.substring(0, 50)}...`);
        skipped++;
        continue;
      }

      // Blacklist
      if (isBlacklisted(rawQuestion.source)) {
        console.log(`🚫 Questão militar excluída: ${rawQuestion.source}`);
        skipped++;
        continue;
      }

      // Gerar hash
      const contentHash = generateContentHash(rawQuestion.text);

      // Verificar se já existe
      const existing = await db
        .select()
        .from(questions)
        .where(eq(questions.contentHash, contentHash))
        .limit(1);

      if (existing.length > 0) {
        console.log(`📌 Questão duplicada (hash): ${contentHash.substring(0, 8)}...`);
        duplicated++;
        continue;
      }

      // Classificar dificuldade
      const difficulty = classifyDifficulty(rawQuestion);

      // Preparar dados para inserção
      const questionData = {
        contentHash,
        text: rawQuestion.text,
        optionA: rawQuestion.optionA,
        optionB: rawQuestion.optionB,
        optionC: rawQuestion.optionC,
        optionD: rawQuestion.optionD,
        optionE: rawQuestion.optionE || null,
        correctAnswer: rawQuestion.correctAnswer,
        discipline: rawQuestion.discipline,
        subdiscipline: rawQuestion.subdiscipline || null,
        difficulty,
        year: rawQuestion.year,
        source: rawQuestion.source,
        examType: rawQuestion.examType || "Regular",
        successRate: rawQuestion.successRate || null,
        contextText: rawQuestion.contextText || null,
        explanation: rawQuestion.explanation || null,
        topics: rawQuestion.topics ? JSON.stringify(rawQuestion.topics) : null,
        metadata: rawQuestion.metadata ? JSON.stringify(rawQuestion.metadata) : null,
      };

      // Upsert (ON CONFLICT DO NOTHING)
      await db
        .insert(questions)
        .values(questionData)
        .onConflictDoNothing({
          target: questions.contentHash,
        });

      inserted++;
      console.log(`✅ Questão inserida: ${rawQuestion.source} (${difficulty})`);
    } catch (error) {
      console.error(`❌ Erro ao processar questão:`, error);
      skipped++;
    }
  }

  console.log(`\n📊 Resumo da Ingestão:`);
  console.log(`  ✅ Inseridas: ${inserted}`);
  console.log(`  🔄 Atualizadas: ${updated}`);
  console.log(`  📌 Duplicadas: ${duplicated}`);
  console.log(`  ⏭️ Puladas: ${skipped}`);
  console.log(`  📈 Total: ${inserted + updated + duplicated + skipped}`);
}

/**
 * Exemplo: Carregar questões de arquivo JSON
 */
async function loadFromJSON(filePath: string): Promise<void> {
  try {
    const fs = await import("fs/promises");
    const data = await fs.readFile(filePath, "utf-8");
    const questionsData = JSON.parse(data) as RawQuestion[];
    await ingestQuestions(questionsData);
  } catch (error) {
    console.error(`❌ Erro ao carregar arquivo JSON:`, error);
  }
}

/**
 * Exemplo: Carregar questões de API externa
 */
async function loadFromAPI(apiUrl: string): Promise<void> {
  try {
    const response = await fetch(apiUrl);
    const questionsData = (await response.json()) as RawQuestion[];
    await ingestQuestions(questionsData);
  } catch (error) {
    console.error(`❌ Erro ao carregar de API:`, error);
  }
}

// Executar ingestão
async function main() {
  // Inicializar banco de dados
  const db = await getDb();
  if (!db) {
    console.error("❌ Banco de dados não configurado. Configure DATABASE_URL.");
    process.exit(1);
  }

  console.log("🚀 Sistema de Ingestão de Questões (1980-2026)");
  console.log("=".repeat(50));

  // Exemplo: Carregar de arquivo JSON
  const jsonPath = process.env.QUESTIONS_JSON_PATH || "./data/questions.json";
  console.log(`📂 Tentando carregar de: ${jsonPath}`);

  try {
    await loadFromJSON(jsonPath);
  } catch (error) {
    console.warn(`⚠️ Arquivo JSON não encontrado. Criando dados de exemplo...`);
    
    // Criar dados de exemplo para teste
    const exampleQuestions: RawQuestion[] = [
      {
        text: "Qual é a capital do Brasil?",
        optionA: "São Paulo",
        optionB: "Brasília",
        optionC: "Rio de Janeiro",
        optionD: "Salvador",
        correctAnswer: "B",
        discipline: "Geografia",
        year: 2023,
        source: "ENEM",
        successRate: 85,
      },
      {
        text: "Qual é a fórmula da água?",
        optionA: "H2O",
        optionB: "CO2",
        optionC: "O2",
        optionD: "H2O2",
        correctAnswer: "A",
        discipline: "Química",
        year: 2022,
        source: "ENEM",
        successRate: 90,
      },
      {
        text: "Qual é a capital da França?",
        optionA: "Londres",
        optionB: "Berlim",
        optionC: "Paris",
        optionD: "Madrid",
        correctAnswer: "C",
        discipline: "Geografia",
        year: 2021,
        source: "FUVEST",
        successRate: 95,
      },
    ];
    
    await ingestQuestions(exampleQuestions);
  }

  // Exemplo: Carregar de API (se configurada)
  const apiUrl = process.env.QUESTIONS_API_URL;
  if (apiUrl) {
    console.log(`🌐 Carregando de API: ${apiUrl}`);
    await loadFromAPI(apiUrl);
  }

  console.log("\n✅ Ingestão concluída!");
  process.exit(0);
}

main().catch(console.error);
