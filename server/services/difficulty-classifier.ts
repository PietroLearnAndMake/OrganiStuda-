/**
 * Serviço de Classificação Automática de Dificuldade
 * 
 * Utiliza múltiplas heurísticas para classificar questões como Fácil, Média ou Difícil
 * Baseado em: extensão, contexto, palavras-chave, taxa de acerto e padrões históricos
 */

export type DifficultyLevel = "Fácil" | "Média" | "Difícil";

interface DifficultyFactors {
  textLength: number;
  contextLength: number;
  keywordScore: number;
  successRate?: number;
  yearScore: number;
  sourceScore: number;
}

interface DifficultyResult {
  level: DifficultyLevel;
  score: number;
  factors: DifficultyFactors;
  confidence: number; // 0-1
}

/**
 * Palavras-chave por nível de dificuldade
 */
const DIFFICULTY_KEYWORDS = {
  easy: [
    "qual",
    "o que",
    "cite",
    "defina",
    "complete",
    "identifique",
    "marque",
    "escolha",
  ],
  medium: [
    "explique",
    "descreva",
    "compare",
    "diferencie",
    "relacione",
    "analise",
    "interprete",
    "calcule",
  ],
  hard: [
    "demonstre",
    "prove",
    "justifique",
    "analise criticamente",
    "sintetize",
    "avalie",
    "critique",
    "deduza",
    "integre",
    "derive",
    "limite",
    "probabilidade condicional",
  ],
};

/**
 * Disciplinas por nível de complexidade
 */
const DISCIPLINE_COMPLEXITY: Record<string, number> = {
  "Português": 0.7,
  "História": 0.6,
  "Geografia": 0.65,
  "Biologia": 0.75,
  "Química": 0.85,
  "Física": 0.9,
  "Matemática": 0.95,
  "Filosofia": 0.8,
  "Sociologia": 0.7,
};

/**
 * Calcula score baseado na extensão do texto
 * Questões longas tendem a ser mais difíceis
 */
function calculateTextLengthScore(textLength: number): number {
  if (textLength < 100) return 0;
  if (textLength < 300) return 1;
  if (textLength < 500) return 2;
  if (textLength < 800) return 3;
  return 4;
}

/**
 * Calcula score baseado no contexto adicional
 */
function calculateContextScore(contextLength: number | undefined): number {
  if (!contextLength) return 0;
  if (contextLength < 200) return 1;
  if (contextLength < 500) return 2;
  if (contextLength < 1000) return 3;
  return 4;
}

/**
 * Calcula score baseado em palavras-chave
 */
function calculateKeywordScore(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 0;

  // Contar palavras-chave por nível
  const easyCount = DIFFICULTY_KEYWORDS.easy.filter((kw) =>
    lowerText.includes(kw)
  ).length;
  const mediumCount = DIFFICULTY_KEYWORDS.medium.filter((kw) =>
    lowerText.includes(kw)
  ).length;
  const hardCount = DIFFICULTY_KEYWORDS.hard.filter((kw) =>
    lowerText.includes(kw)
  ).length;

  // Score: fácil = 0, médio = 1, difícil = 2
  score += easyCount * 0;
  score += mediumCount * 1;
  score += hardCount * 2;

  return Math.min(score, 4); // Máximo 4
}

/**
 * Calcula score baseado na taxa de acerto
 * Quanto menor a taxa, mais difícil a questão
 */
function calculateSuccessRateScore(successRate: number | undefined): number {
  if (successRate === undefined) return 0;

  if (successRate < 20) return 4; // Muito difícil
  if (successRate < 40) return 3; // Difícil
  if (successRate < 60) return 2; // Médio
  if (successRate < 80) return 1; // Fácil
  return 0; // Muito fácil
}

/**
 * Calcula score baseado no ano da questão
 * Questões mais recentes tendem a ser mais difíceis (evolução do ENEM)
 */
function calculateYearScore(year: number): number {
  const currentYear = new Date().getFullYear();
  const yearsAgo = currentYear - year;

  if (yearsAgo > 20) return 0; // Questões antigas = mais fáceis
  if (yearsAgo > 10) return 1;
  if (yearsAgo > 5) return 2;
  if (yearsAgo > 2) return 3;
  return 4; // Questões recentes = mais difíceis
}

/**
 * Calcula score baseado na fonte
 * Diferentes vestibulares têm níveis de dificuldade diferentes
 */
function calculateSourceScore(source: string, discipline: string): number {
  const lowerSource = source.toLowerCase();
  const complexity = DISCIPLINE_COMPLEXITY[discipline] || 0.7;

  // Fontes conhecidas por dificuldade
  if (lowerSource.includes("enem")) return 2 * complexity;
  if (lowerSource.includes("fuvest")) return 3 * complexity;
  if (lowerSource.includes("unicamp")) return 3.5 * complexity;
  if (lowerSource.includes("usp")) return 3 * complexity;
  if (lowerSource.includes("puc")) return 2.5 * complexity;

  return 2 * complexity; // Padrão
}

/**
 * Classifica a dificuldade baseada em múltiplos fatores
 */
export function classifyDifficulty(
  text: string,
  discipline: string,
  source: string,
  options?: {
    contextText?: string;
    successRate?: number;
    year?: number;
  }
): DifficultyResult {
  // Calcular scores individuais
  const textLengthScore = calculateTextLengthScore(text.length);
  const contextScore = calculateContextScore(options?.contextText?.length);
  const keywordScore = calculateKeywordScore(text);
  const successRateScore = calculateSuccessRateScore(options?.successRate);
  const yearScore = calculateYearScore(options?.year || new Date().getFullYear());
  const sourceScore = calculateSourceScore(source, discipline);

  // Calcular score total (média ponderada)
  const weights = {
    textLength: 0.15,
    context: 0.15,
    keywords: 0.25,
    successRate: 0.25,
    year: 0.1,
    source: 0.1,
  };

  const totalScore =
    textLengthScore * weights.textLength +
    contextScore * weights.context +
    keywordScore * weights.keywords +
    successRateScore * weights.successRate +
    yearScore * weights.year +
    sourceScore * weights.source;

  // Classificar nível
  let level: DifficultyLevel;
  let confidence: number;

  if (totalScore < 1.5) {
    level = "Fácil";
    confidence = Math.min(1, 1.5 - totalScore);
  } else if (totalScore < 2.5) {
    level = "Média";
    confidence = 1 - Math.abs(totalScore - 2) / 1;
  } else {
    level = "Difícil";
    confidence = Math.min(1, totalScore - 2.5);
  }

  return {
    level,
    score: totalScore,
    factors: {
      textLength: textLengthScore,
      contextLength: contextScore,
      keywordScore,
      successRate: successRateScore,
      yearScore,
      sourceScore,
    },
    confidence: Math.round(confidence * 100) / 100,
  };
}

/**
 * Reclassifica questões baseado em feedback de usuários
 * Ajusta a classificação se muitos usuários acertam/erram
 */
export function reclassifyBasedOnFeedback(
  currentLevel: DifficultyLevel,
  successRate: number
): DifficultyLevel {
  // Se taxa de acerto é muito alta, questão é mais fácil
  if (successRate > 80 && currentLevel !== "Fácil") {
    return "Fácil";
  }

  // Se taxa de acerto é muito baixa, questão é mais difícil
  if (successRate < 30 && currentLevel !== "Difícil") {
    return "Difícil";
  }

  // Se taxa está no meio, questão é média
  if (successRate >= 40 && successRate <= 70 && currentLevel !== "Média") {
    return "Média";
  }

  return currentLevel;
}

/**
 * Gera relatório de dificuldade para análise
 */
export function generateDifficultyReport(result: DifficultyResult): string {
  return `
📊 Relatório de Dificuldade
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nível: ${result.level}
Score: ${result.score.toFixed(2)}/4.0
Confiança: ${(result.confidence * 100).toFixed(0)}%

Fatores Analisados:
  • Extensão do texto: ${result.factors.textLength.toFixed(1)}/4
  • Contexto adicional: ${result.factors.contextLength.toFixed(1)}/4
  • Palavras-chave: ${result.factors.keywordScore.toFixed(1)}/4
  • Taxa de acerto: ${result.factors.successRate?.toFixed(1) || "N/A"}/4
  • Ano da questão: ${result.factors.yearScore.toFixed(1)}/4
  • Fonte: ${result.factors.sourceScore.toFixed(1)}/4
  `;
}
