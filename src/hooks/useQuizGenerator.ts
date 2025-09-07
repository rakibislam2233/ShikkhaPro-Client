import { useState, useCallback } from 'react';
import type { QuizConfig, Quiz } from '../types/quiz.types';
import { generateQuizWithAI } from '../utils/openai.api';

interface UseQuizGeneratorReturn {
  generateQuiz: (config: QuizConfig) => Promise<Quiz>;
  isGenerating: boolean;
  error: string | null;
  generatedQuiz: Quiz | null;
  clearError: () => void;
  reset: () => void;
}

export function useQuizGenerator(): UseQuizGeneratorReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedQuiz, setGeneratedQuiz] = useState<Quiz | null>(null);

  const generateQuiz = useCallback(async (config: QuizConfig): Promise<Quiz> => {
    setIsGenerating(true);
    setError(null);

    try {
      const quiz = await generateQuizWithAI(config);
      setGeneratedQuiz(quiz);
      return quiz;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate quiz';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setIsGenerating(false);
    setError(null);
    setGeneratedQuiz(null);
  }, []);

  return {
    generateQuiz,
    isGenerating,
    error,
    generatedQuiz,
    clearError,
    reset,
  };
}