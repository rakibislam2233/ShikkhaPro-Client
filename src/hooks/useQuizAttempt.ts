import { useState, useCallback, useEffect, useRef } from 'react';
import { QuizAttempt, Quiz, QuizResult } from '../types/quiz.types';
import { useLocalStorage } from './useLocalStorage';

interface UseQuizAttemptReturn {
  currentAttempt: QuizAttempt | null;
  timeElapsed: number;
  currentQuestionIndex: number;
  startAttempt: (quiz: Quiz) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  flagQuestion: (questionId: string) => void;
  unflagQuestion: (questionId: string) => void;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeAttempt: () => QuizResult;
  saveProgress: () => void;
  isQuestionAnswered: (questionId: string) => boolean;
  isQuestionFlagged: (questionId: string) => boolean;
  getAnswerForQuestion: (questionId: string) => string;
  reset: () => void;
}

export function useQuizAttempt(): UseQuizAttemptReturn {
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [attempts, setAttempts] = useLocalStorage<QuizAttempt[]>('quiz-attempts', []);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (currentAttempt && !currentAttempt.isCompleted) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentAttempt]);

  const startAttempt = useCallback((quiz: Quiz) => {
    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      quizId: quiz.id,
      userId: 'current-user', // In real app, get from auth context
      answers: {},
      startedAt: new Date().toISOString(),
      totalQuestions: quiz.questions.length,
      correctAnswers: 0,
      isCompleted: false,
      flaggedQuestions: [],
    };

    setCurrentAttempt(attempt);
    setCurrentQuestionIndex(0);
    setTimeElapsed(0);
    
    // Save to localStorage
    setAttempts(prev => [...prev, attempt]);
  }, [setAttempts]);

  const submitAnswer = useCallback((questionId: string, answer: string) => {
    if (!currentAttempt) return;

    const updatedAttempt = {
      ...currentAttempt,
      answers: {
        ...currentAttempt.answers,
        [questionId]: answer,
      },
    };

    setCurrentAttempt(updatedAttempt);
    
    // Auto-save progress
    setAttempts(prev =>
      prev.map(attempt =>
        attempt.id === updatedAttempt.id ? updatedAttempt : attempt
      )
    );
  }, [currentAttempt, setAttempts]);

  const flagQuestion = useCallback((questionId: string) => {
    if (!currentAttempt) return;

    const updatedAttempt = {
      ...currentAttempt,
      flaggedQuestions: [...currentAttempt.flaggedQuestions, questionId],
    };

    setCurrentAttempt(updatedAttempt);
    setAttempts(prev =>
      prev.map(attempt =>
        attempt.id === updatedAttempt.id ? updatedAttempt : attempt
      )
    );
  }, [currentAttempt, setAttempts]);

  const unflagQuestion = useCallback((questionId: string) => {
    if (!currentAttempt) return;

    const updatedAttempt = {
      ...currentAttempt,
      flaggedQuestions: currentAttempt.flaggedQuestions.filter(id => id !== questionId),
    };

    setCurrentAttempt(updatedAttempt);
    setAttempts(prev =>
      prev.map(attempt =>
        attempt.id === updatedAttempt.id ? updatedAttempt : attempt
      )
    );
  }, [currentAttempt, setAttempts]);

  const goToQuestion = useCallback((index: number) => {
    if (currentAttempt && index >= 0 && index < currentAttempt.totalQuestions) {
      setCurrentQuestionIndex(index);
    }
  }, [currentAttempt]);

  const nextQuestion = useCallback(() => {
    if (currentAttempt && currentQuestionIndex < currentAttempt.totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentAttempt, currentQuestionIndex]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const completeAttempt = useCallback((): QuizResult => {
    if (!currentAttempt) {
      throw new Error('No active attempt to complete');
    }

    // This is a simplified version - in real app, you'd need the quiz data
    // to calculate the actual results
    const completedAttempt: QuizAttempt = {
      ...currentAttempt,
      isCompleted: true,
      completedAt: new Date().toISOString(),
      timeSpent: timeElapsed,
    };

    setCurrentAttempt(completedAttempt);
    
    // Update in localStorage
    setAttempts(prev =>
      prev.map(attempt =>
        attempt.id === completedAttempt.id ? completedAttempt : attempt
      )
    );

    // Mock result - in real implementation, this would calculate actual results
    const mockResult: QuizResult = {
      attempt: completedAttempt,
      quiz: {} as Quiz, // Would be the actual quiz
      detailedResults: [],
      performance: {
        totalScore: 0,
        percentage: 0,
        grade: 'N/A',
        timeSpent: timeElapsed,
        averageTimePerQuestion: timeElapsed / currentAttempt.totalQuestions,
      },
      recommendations: [],
    };

    return mockResult;
  }, [currentAttempt, timeElapsed, setAttempts]);

  const saveProgress = useCallback(() => {
    if (!currentAttempt) return;

    setAttempts(prev =>
      prev.map(attempt =>
        attempt.id === currentAttempt.id ? currentAttempt : attempt
      )
    );
  }, [currentAttempt, setAttempts]);

  const isQuestionAnswered = useCallback((questionId: string): boolean => {
    return currentAttempt ? questionId in currentAttempt.answers : false;
  }, [currentAttempt]);

  const isQuestionFlagged = useCallback((questionId: string): boolean => {
    return currentAttempt ? currentAttempt.flaggedQuestions.includes(questionId) : false;
  }, [currentAttempt]);

  const getAnswerForQuestion = useCallback((questionId: string): string => {
    return currentAttempt?.answers[questionId] || '';
  }, [currentAttempt]);

  const reset = useCallback(() => {
    setCurrentAttempt(null);
    setCurrentQuestionIndex(0);
    setTimeElapsed(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    currentAttempt,
    timeElapsed,
    currentQuestionIndex,
    startAttempt,
    submitAnswer,
    flagQuestion,
    unflagQuestion,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    completeAttempt,
    saveProgress,
    isQuestionAnswered,
    isQuestionFlagged,
    getAnswerForQuestion,
    reset,
  };
}