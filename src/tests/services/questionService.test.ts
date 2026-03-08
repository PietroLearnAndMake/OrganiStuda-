import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateQuestionId,
  filterQuestions,
  getQuestionStats,
  detectDuplicates,
} from '../../services/questionService';
import { SavedQuestion, Attempt } from '../../types';

describe('questionService', () => {
  describe('generateQuestionId', () => {
    it('deve gerar ID único no formato correto', () => {
      const id = generateQuestionId('ENEM', 2024, 'Matemática', 1);
      expect(id).toBe('ENEM_2024_MATEMATICA_1');
    });

    it('deve converter instituição para maiúscula', () => {
      const id = generateQuestionId('enem', 2024, 'Matemática', 1);
      expect(id).toContain('ENEM');
    });

    it('deve remover acentos do assunto', () => {
      const id = generateQuestionId('ENEM', 2024, 'Física', 1);
      expect(id).toContain('FISICA');
    });

    it('deve incrementar número corretamente', () => {
      const id1 = generateQuestionId('ENEM', 2024, 'Matemática', 1);
      const id2 = generateQuestionId('ENEM', 2024, 'Matemática', 2);
      expect(id1).not.toBe(id2);
      expect(id2).toContain('_2');
    });
  });

  describe('filterQuestions', () => {
    let mockQuestions: SavedQuestion[];

    beforeEach(() => {
      mockQuestions = [
        {
          id: 'ENEM_2024_MATEMATICA_1',
          text: 'Questão de matemática',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'Explicação',
          institution: 'ENEM',
          year: 2024,
          subjectId: 'math',
          attempts: [],
        },
        {
          id: 'ENEM_2023_FISICA_1',
          text: 'Questão de física',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 1,
          explanation: 'Explicação',
          institution: 'ENEM',
          year: 2023,
          subjectId: 'physics',
          attempts: [],
        },
        {
          id: 'FUVEST_2024_QUIMICA_1',
          text: 'Questão de química',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 2,
          explanation: 'Explicação',
          institution: 'FUVEST',
          year: 2024,
          subjectId: 'chemistry',
          attempts: [],
        },
      ];
    });

    it('deve retornar todas as questões sem filtro', () => {
      const filtered = filterQuestions(mockQuestions, {});
      expect(filtered).toHaveLength(3);
    });

    it('deve filtrar por instituição', () => {
      const filtered = filterQuestions(mockQuestions, { institution: 'ENEM' });
      expect(filtered).toHaveLength(2);
      expect(filtered.every((q) => q.institution === 'ENEM')).toBe(true);
    });

    it('deve filtrar por ano', () => {
      const filtered = filterQuestions(mockQuestions, { year: 2024 });
      expect(filtered).toHaveLength(2);
      expect(filtered.every((q) => q.year === 2024)).toBe(true);
    });

    it('deve filtrar por múltiplos critérios', () => {
      const filtered = filterQuestions(mockQuestions, {
        institution: 'ENEM',
        year: 2024,
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe('ENEM_2024_MATEMATICA_1');
    });

    it('deve retornar array vazio quando nenhuma questão corresponde', () => {
      const filtered = filterQuestions(mockQuestions, { institution: 'UNKNOWN' });
      expect(filtered).toHaveLength(0);
    });
  });

  describe('getQuestionStats', () => {
    it('deve calcular estatísticas corretas', () => {
      const question: SavedQuestion = {
        id: 'TEST_1',
        text: 'Teste',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Explicação',
        subjectId: 'test',
        attempts: [
          { timestamp: 1, selectedOption: 0, isCorrect: true },
          { timestamp: 2, selectedOption: 1, isCorrect: false },
          { timestamp: 3, selectedOption: 0, isCorrect: true },
        ],
      };

      const stats = getQuestionStats(question);
      expect(stats.totalAttempts).toBe(3);
      expect(stats.correctAttempts).toBe(2);
      expect(stats.accuracy).toBe(67);
    });

    it('deve retornar 0% de acurácia sem tentativas', () => {
      const question: SavedQuestion = {
        id: 'TEST_1',
        text: 'Teste',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Explicação',
        subjectId: 'test',
        attempts: [],
      };

      const stats = getQuestionStats(question);
      expect(stats.accuracy).toBe(0);
    });

    it('deve calcular 100% de acurácia com todas corretas', () => {
      const question: SavedQuestion = {
        id: 'TEST_1',
        text: 'Teste',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Explicação',
        subjectId: 'test',
        attempts: [
          { timestamp: 1, selectedOption: 0, isCorrect: true },
          { timestamp: 2, selectedOption: 0, isCorrect: true },
        ],
      };

      const stats = getQuestionStats(question);
      expect(stats.accuracy).toBe(100);
    });
  });

  describe('detectDuplicates', () => {
    it('deve detectar duplicata por ID exato', () => {
      const existing: SavedQuestion = {
        id: 'ENEM_2024_MATEMATICA_1',
        text: 'Questão original',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Explicação',
        subjectId: 'math',
        attempts: [],
      };

      const newQuestion: SavedQuestion = {
        id: 'ENEM_2024_MATEMATICA_1',
        text: 'Questão duplicada',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Explicação',
        subjectId: 'math',
        attempts: [],
      };

      const isDuplicate = detectDuplicates([existing], newQuestion);
      expect(isDuplicate).toBe(true);
    });

    it('deve detectar duplicata por texto idêntico', () => {
      const existing: SavedQuestion = {
        id: 'ENEM_2024_MATEMATICA_1',
        text: 'Questão única',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Explicação',
        subjectId: 'math',
        attempts: [],
      };

      const newQuestion: SavedQuestion = {
        id: 'ENEM_2024_MATEMATICA_2',
        text: 'Questão única',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Explicação',
        subjectId: 'math',
        attempts: [],
      };

      const isDuplicate = detectDuplicates([existing], newQuestion);
      expect(isDuplicate).toBe(true);
    });

    it('deve detectar duplicata por opções idênticas', () => {
      const existing: SavedQuestion = {
        id: 'ENEM_2024_MATEMATICA_1',
        text: 'Questão 1',
        options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
        correctAnswer: 0,
        explanation: 'Explicação',
        subjectId: 'math',
        attempts: [],
      };

      const newQuestion: SavedQuestion = {
        id: 'ENEM_2024_MATEMATICA_2',
        text: 'Questão 2',
        options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
        correctAnswer: 0,
        explanation: 'Explicação',
        subjectId: 'math',
        attempts: [],
      };

      const isDuplicate = detectDuplicates([existing], newQuestion);
      expect(isDuplicate).toBe(true);
    });

    it('não deve detectar duplicata para questões diferentes', () => {
      const existing: SavedQuestion = {
        id: 'ENEM_2024_MATEMATICA_1',
        text: 'Questão 1',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Explicação',
        subjectId: 'math',
        attempts: [],
      };

      const newQuestion: SavedQuestion = {
        id: 'ENEM_2024_MATEMATICA_2',
        text: 'Questão 2',
        options: ['E', 'F', 'G', 'H'],
        correctAnswer: 1,
        explanation: 'Explicação diferente',
        subjectId: 'math',
        attempts: [],
      };

      const isDuplicate = detectDuplicates([existing], newQuestion);
      expect(isDuplicate).toBe(false);
    });
  });
});
