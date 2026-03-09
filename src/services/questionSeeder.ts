import AsyncStorage from "@react-native-async-storage/async-storage";
import { Filesystem, Directory } from "@capacitor/filesystem";
import questionsData from "../data/questions-offline.json";

const DB_VERSION_KEY = "questions_db_version";
const CURRENT_DB_VERSION = 2; // Incrementar quando houver mudanças
const QUESTIONS_IMPORTED_KEY = "questions_imported";

export interface Question {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE?: string;
  correct_answer: string;
  discipline: string;
  subdiscipline: string;
  difficulty: string;
  year: number;
  source: string;
  exam_type: string;
  success_rate?: number;
  context_text?: string;
  explanation?: string;
  topics?: string;
  is_active: number;
}

/**
 * Inicializar seed de questões
 * Verifica se as questões foram importadas e se a versão do banco está atualizada
 */
export async function initializeQuestionSeeder() {
  try {
    console.log("📚 Iniciando seeder de questões...");

    // Verificar versão do banco
    const storedVersion = await AsyncStorage.getItem(DB_VERSION_KEY);
    const currentVersion = parseInt(storedVersion || "0", 10);

    console.log(`📊 Versão armazenada: ${currentVersion}, Versão atual: ${CURRENT_DB_VERSION}`);

    // Se a versão mudou ou não foi importada, fazer import
    if (currentVersion < CURRENT_DB_VERSION) {
      console.log("🔄 Detectada versão nova, importando questões...");
      await importQuestionsToStorage();

      // Atualizar versão
      await AsyncStorage.setItem(DB_VERSION_KEY, CURRENT_DB_VERSION.toString());
      console.log(`✅ Versão atualizada para ${CURRENT_DB_VERSION}`);
    } else {
      console.log("✅ Questões já estão atualizadas");
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar seeder:", error);
  }
}

/**
 * Importar questões para AsyncStorage
 */
async function importQuestionsToStorage() {
  try {
    console.log("📥 Importando questões para AsyncStorage...");

    const questions = questionsData as Question[];
    console.log(`📊 Total de questões a importar: ${questions.length}`);

    // Dividir em chunks para não exceder limite de AsyncStorage
    const chunkSize = 100;
    const chunks = [];

    for (let i = 0; i < questions.length; i += chunkSize) {
      chunks.push(questions.slice(i, i + chunkSize));
    }

    console.log(`📦 Divididas em ${chunks.length} chunks de ${chunkSize} questões`);

    // Salvar cada chunk
    for (let i = 0; i < chunks.length; i++) {
      const key = `questions_chunk_${i}`;
      await AsyncStorage.setItem(key, JSON.stringify(chunks[i]));
      console.log(`✅ Chunk ${i + 1}/${chunks.length} salvo`);
    }

    // Salvar metadados
    await AsyncStorage.setItem(
      "questions_metadata",
      JSON.stringify({
        totalQuestions: questions.length,
        totalChunks: chunks.length,
        chunkSize,
        importedAt: new Date().toISOString(),
      })
    );

    console.log(`✅ ${questions.length} questões importadas com sucesso!`);
  } catch (error) {
    console.error("❌ Erro ao importar questões:", error);
    throw error;
  }
}

/**
 * Recuperar todas as questões do AsyncStorage
 */
export async function getAllQuestionsFromStorage(): Promise<Question[]> {
  try {
    const metadata = await AsyncStorage.getItem("questions_metadata");

    if (!metadata) {
      console.warn("⚠️ Metadados não encontrados, retornando dados locais");
      return questionsData as Question[];
    }

    const { totalChunks } = JSON.parse(metadata);
    const allQuestions: Question[] = [];

    // Recuperar todos os chunks
    for (let i = 0; i < totalChunks; i++) {
      const key = `questions_chunk_${i}`;
      const chunk = await AsyncStorage.getItem(key);

      if (chunk) {
        allQuestions.push(...JSON.parse(chunk));
      }
    }

    console.log(`✅ Recuperadas ${allQuestions.length} questões do AsyncStorage`);
    return allQuestions;
  } catch (error) {
    console.error("❌ Erro ao recuperar questões:", error);
    // Fallback para dados locais
    return questionsData as Question[];
  }
}

/**
 * Buscar questões por disciplina do AsyncStorage
 */
export async function getQuestionsByDisciplineFromStorage(
  discipline: string,
  limit = 50,
  offset = 0
): Promise<Question[]> {
  try {
    const allQuestions = await getAllQuestionsFromStorage();
    const filtered = allQuestions.filter((q) => q.discipline === discipline);
    return filtered.slice(offset, offset + limit);
  } catch (error) {
    console.error("❌ Erro ao buscar questões por disciplina:", error);
    return [];
  }
}

/**
 * Contar questões por disciplina
 */
export async function countQuestionsByDisciplineFromStorage(discipline: string): Promise<number> {
  try {
    const allQuestions = await getAllQuestionsFromStorage();
    return allQuestions.filter((q) => q.discipline === discipline).length;
  } catch (error) {
    console.error("❌ Erro ao contar questões:", error);
    return 0;
  }
}

/**
 * Contar total de questões
 */
export async function countTotalQuestionsFromStorage(): Promise<number> {
  try {
    const metadata = await AsyncStorage.getItem("questions_metadata");

    if (!metadata) {
      return (questionsData as Question[]).length;
    }

    const { totalQuestions } = JSON.parse(metadata);
    return totalQuestions;
  } catch (error) {
    console.error("❌ Erro ao contar total de questões:", error);
    return 0;
  }
}

/**
 * Limpar cache de questões (para debug)
 */
export async function clearQuestionsCache() {
  try {
    console.log("🗑️ Limpando cache de questões...");

    const metadata = await AsyncStorage.getItem("questions_metadata");

    if (metadata) {
      const { totalChunks } = JSON.parse(metadata);

      for (let i = 0; i < totalChunks; i++) {
        await AsyncStorage.removeItem(`questions_chunk_${i}`);
      }

      await AsyncStorage.removeItem("questions_metadata");
    }

    await AsyncStorage.removeItem(DB_VERSION_KEY);

    console.log("✅ Cache limpo com sucesso");
  } catch (error) {
    console.error("❌ Erro ao limpar cache:", error);
  }
}

/**
 * Obter estatísticas do seeder
 */
export async function getSeederStats() {
  try {
    const version = await AsyncStorage.getItem(DB_VERSION_KEY);
    const metadata = await AsyncStorage.getItem("questions_metadata");

    return {
      dbVersion: parseInt(version || "0", 10),
      currentVersion: CURRENT_DB_VERSION,
      metadata: metadata ? JSON.parse(metadata) : null,
      needsUpdate: parseInt(version || "0", 10) < CURRENT_DB_VERSION,
    };
  } catch (error) {
    console.error("❌ Erro ao obter estatísticas:", error);
    return null;
  }
}
