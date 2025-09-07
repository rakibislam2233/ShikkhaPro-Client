import { useState, useCallback, useMemo } from 'react';
import type { IQuiz } from '@/types/quiz.types';

export interface QuizTakingState {
  userAnswers: { [questionId: string]: string | string[] };
  currentQuestionIndex: number;
  timeRemaining: number;
  isCompleted: boolean;
}

export interface QuizTakingActions {
  setAnswer: (questionId: string, answer: string | string[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  setTimeRemaining: (time: number) => void;
  resetQuiz: () => void;
  getAnsweredQuestionsCount: () => number;
  isQuestionAnswered: (questionId: string) => boolean;
  isAllQuestionsAnswered: () => boolean;
  getQuizProgress: () => number;
}

export const useQuizTaking = (quiz: IQuiz | null) => {
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: string | string[] }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const setAnswer = useCallback((questionId: string, answer: string | string[]) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [quiz, currentQuestionIndex]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const goToQuestion = useCallback((index: number) => {
    if (quiz && index >= 0 && index < quiz.questions.length) {
      setCurrentQuestionIndex(index);
    }
  }, [quiz]);

  const resetQuiz = useCallback(() => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(quiz?.estimatedTime ? quiz.estimatedTime * 60 : 0);
  }, [quiz]);

  const getAnsweredQuestionsCount = useCallback(() => {
    return Object.keys(userAnswers).length;
  }, [userAnswers]);

  const isQuestionAnswered = useCallback((questionId: string) => {
    return userAnswers[questionId] !== undefined;
  }, [userAnswers]);

  const isAllQuestionsAnswered = useCallback(() => {
    if (!quiz) return false;
    return quiz.questions.every(q => userAnswers[q.id] !== undefined);
  }, [quiz, userAnswers]);

  const getQuizProgress = useCallback(() => {
    if (!quiz) return 0;
    return (getAnsweredQuestionsCount() / quiz.questions.length) * 100;
  }, [quiz, getAnsweredQuestionsCount]);

  const state: QuizTakingState = useMemo(() => ({
    userAnswers,
    currentQuestionIndex,
    timeRemaining,
    isCompleted: isAllQuestionsAnswered(),
  }), [userAnswers, currentQuestionIndex, timeRemaining, isAllQuestionsAnswered]);

  const actions: QuizTakingActions = useMemo(() => ({
    setAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    setTimeRemaining,
    resetQuiz,
    getAnsweredQuestionsCount,
    isQuestionAnswered,
    isAllQuestionsAnswered,
    getQuizProgress,
  }), [
    setAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    resetQuiz,
    getAnsweredQuestionsCount,
    isQuestionAnswered,
    isAllQuestionsAnswered,
    getQuizProgress,
  ]);

  return { state, actions };
};

export default useQuizTaking;