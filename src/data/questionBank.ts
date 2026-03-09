import questionsData from "./questions-offline.json";

export interface Question {
  id?: number;
  text: string;
  options?: string[];
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
  correctAnswer?: number;
  correct_answer?: string;
  explanation?: string;
  topic?: string;
  institution?: string;
  source?: string;
  year?: number;
  discipline?: string;
  subdiscipline?: string;
  difficulty?: string;
  exam_type?: string;
  success_rate?: number;
  context_text?: string;
  explanation_text?: string;
  topics?: string;
  is_active?: number;
}

/**
 * Converter questões do formato offline JSON para o formato esperado pelo app
 */
function convertQuestionsFromJSON(questions: any[]): Question[] {
  return questions.map((q, index) => ({
    id: q.id || index,
    text: q.text,
    options: [q.optionA, q.optionB, q.optionC, q.optionD, q.optionE].filter(Boolean),
    optionA: q.optionA,
    optionB: q.optionB,
    optionC: q.optionC,
    optionD: q.optionD,
    optionE: q.optionE,
    correctAnswer: ["A", "B", "C", "D", "E"].indexOf(q.correct_answer?.toUpperCase() || "A"),
    correct_answer: q.correct_answer,
    explanation: q.explanation || q.explanation_text || "",
    topic: q.discipline?.toLowerCase().replace(/\s+/g, "-") || "geral",
    institution: q.source || "Geral",
    source: q.source,
    year: q.year,
    discipline: q.discipline,
    subdiscipline: q.subdiscipline,
    difficulty: q.difficulty,
    exam_type: q.exam_type,
    success_rate: q.success_rate,
    context_text: q.context_text,
    topics: q.topics,
    is_active: q.is_active,
  }));
}

// Converter questões do JSON
const convertedQuestions = convertQuestionsFromJSON(questionsData as any[]);

// Agrupar por disciplina
export const QUESTION_BANK: Record<string, Question[]> = {
  "mat": convertedQuestions.filter(q => q.discipline?.includes("Matemática")),
  "linguagens": convertedQuestions.filter(q => q.discipline?.includes("Linguagens")),
  "humanas": convertedQuestions.filter(q => q.discipline?.includes("Ciências Humanas")),
  "natureza": convertedQuestions.filter(q => q.discipline?.includes("Ciências da Natureza")),
  "geral": convertedQuestions,
};

// Exportar todas as questões
export const ALL_QUESTIONS: Question[] = convertedQuestions;

// Função para obter estatísticas
export function getQuestionStats(question: Question) {
  return {
    totalAttempts: 0,
    correctAttempts: 0,
    accuracy: question.success_rate || 50,
  };
}

// Função para filtrar questões
export function filterQuestions(
  questions: Question[],
  filters: {
    institution?: string;
    year?: number;
    difficulty?: string;
    discipline?: string;
  }
): Question[] {
  return questions.filter((q) => {
    if (filters.institution && q.institution !== filters.institution) return false;
    if (filters.year && q.year !== filters.year) return false;
    if (filters.difficulty && q.difficulty !== filters.difficulty) return false;
    if (filters.discipline && q.discipline !== filters.discipline) return false;
    return true;
  });
}

// Função para obter instituições únicas
export function getUniqueInstitutions(questions: Question[]): string[] {
  const institutions = new Set(questions.map((q) => q.institution || "Geral"));
  return Array.from(institutions).sort();
}

// Função para obter disciplinas únicas
export function getUniqueDisciplines(questions: Question[]): string[] {
  const disciplines = new Set(questions.map((q) => q.discipline || "Geral"));
  return Array.from(disciplines).sort();
}

// Função para obter anos únicos
export function getUniqueYears(questions: Question[]): number[] {
  const years = new Set(questions.map((q) => q.year || 0).filter(y => y > 0));
  return Array.from(years).sort((a, b) => b - a);
}

// Função para obter dificuldades únicas
export function getUniqueDifficulties(questions: Question[]): string[] {
  const difficulties = new Set(questions.map((q) => q.difficulty || "Média"));
  return Array.from(difficulties).sort();
}
