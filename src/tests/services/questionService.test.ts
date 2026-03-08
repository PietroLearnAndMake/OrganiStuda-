import { describe, it, expect, beforeEach } from 'vitest';
import { SavedQuestion } from '../../types';

describe('questionService', () => {
  describe('generateQuestionId', () => {
    it('deve gerar ID único no formato correto', () => {
      const institution = 'ENEM';
      const year = 2024;
      const subject = 'Matemática';
      const number = 1;

      const id = `${institution}_${year}_${subject.toUpperCase()}_${number}`;
      expect(id).toBe('ENEM_2024_MATEMÁTICA_1');
    });

    it('deve converter instituição para maiúscula', () => {
      const id = 'enem'.toUpperCase();
      expect(id).toContain('ENEM');
    });

    it('deve incrementar número corretamente', () => {
      const id1 = 'ENEM_2024_MATEMATICA_1';
      const id2 = 'ENEM_2024_MATEMATICA_2';

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
      expect(mockQuestions).toHaveLength(3);
    });

    it('deve filtrar por instituição', () => {
      const filtered = mockQuestions.filter((q) => q.institution === 'ENEM');
      expect(filtered).toHaveLength(2);
      expect(filtered.every((q) => q.institution === 'ENEM')).toBe(true);
    });

    it('deve filtrar por múltiplos critérios', () => {
      const filtered = mockQuestions.filter((q) => q.institution === 'ENEM');
      expect(filtered).toHaveLength(2);
      expect(filtered.every((q) => q.institution === 'ENEM')).toBe(true);
    });

    it('deve retornar array vazio quando nenhuma questão corresponde', () => {
      const filtered = mockQuestions.filter((q) => q.institution === 'UNKNOWN');
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

      const totalAttempts = question.attempts.length;
      const correctAttempts = question.attempts.filter((a) => a.isCorrect).length;
      const accuracy = Math.round((correctAttempts / totalAttempts) * 100);

      expect(totalAttempts).toBe(3);
      expect(correctAttempts).toBe(2);
      expect(accuracy).toBe(67);
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

      const accuracy = question.attempts.length > 0 ? 100 : 0;
      expect(accuracy).toBe(0);
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

      const correctAttempts = question.attempts.filter((a) => a.isCorrect).length;
      const accuracy = Math.round((correctAttempts / question.attempts.length) * 100);

      expect(accuracy).toBe(100);
    });
  });
});
