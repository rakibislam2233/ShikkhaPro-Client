import { createContext, useContext, useReducer, type ReactNode } from "react";
import type {
  Quiz,
  QuizAttempt,
  QuizConfig,
  QuizResult,
  QuizContextType,
} from "@/types/quiz.types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { generateQuizWithAI } from "../utils/openai.api";

type QuizAction =
  | { type: "GENERATION_START" }
  | { type: "GENERATION_SUCCESS"; payload: Quiz }
  | { type: "GENERATION_ERROR"; payload: string }
  | { type: "START_QUIZ"; payload: { quiz: Quiz; attempt: QuizAttempt } }
  | { type: "SUBMIT_ANSWER"; payload: { questionId: string; answer: string } }
  | { type: "FLAG_QUESTION"; payload: string }
  | { type: "COMPLETE_QUIZ"; payload: QuizResult }
  | { type: "SAVE_QUIZ_SUCCESS" }
  | { type: "LOAD_QUIZ"; payload: Quiz }
  | { type: "CLEAR_ERROR" };

interface QuizState {
  currentQuiz: Quiz | null;
  currentAttempt: QuizAttempt | null;
  isGenerating: boolean;
  error: string | null;
}

const initialState: QuizState = {
  currentQuiz: null,
  currentAttempt: null,
  isGenerating: false,
  error: null,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "GENERATION_START":
      return {
        ...state,
        isGenerating: true,
        error: null,
      };
    case "GENERATION_SUCCESS":
      return {
        ...state,
        currentQuiz: action.payload,
        isGenerating: false,
        error: null,
      };
    case "GENERATION_ERROR":
      return {
        ...state,
        isGenerating: false,
        error: action.payload,
      };
    case "START_QUIZ":
      return {
        ...state,
        currentQuiz: action.payload.quiz,
        currentAttempt: action.payload.attempt,
      };
    case "SUBMIT_ANSWER":
      return {
        ...state,
        currentAttempt: state.currentAttempt
          ? {
              ...state.currentAttempt,
              answers: {
                ...state.currentAttempt.answers,
                [action.payload.questionId]: action.payload.answer,
              },
            }
          : null,
      };
    case "FLAG_QUESTION":
      return {
        ...state,
        currentAttempt: state.currentAttempt
          ? {
              ...state.currentAttempt,
              flaggedQuestions: state.currentAttempt.flaggedQuestions.includes(
                action.payload
              )
                ? state.currentAttempt.flaggedQuestions.filter(
                    (id) => id !== action.payload
                  )
                : [...state.currentAttempt.flaggedQuestions, action.payload],
            }
          : null,
      };
    case "COMPLETE_QUIZ":
      return {
        ...state,
        currentAttempt: {
          ...state.currentAttempt!,
          isCompleted: true,
          completedAt: new Date().toISOString(),
          score: action.payload.performance.totalScore,
          correctAnswers: action.payload.detailedResults.filter(
            (r) => r.isCorrect
          ).length,
        },
      };
    case "LOAD_QUIZ":
      return {
        ...state,
        currentQuiz: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [savedQuizzes, setSavedQuizzes] = useLocalStorage<Quiz[]>(
    "saved-quizzes",
    []
  );
  const [quizAttempts, setQuizAttempts] = useLocalStorage<QuizAttempt[]>(
    "quiz-attempts",
    []
  );

  console.log("Saved Quizzes:", quizAttempts);

  const generateQuiz = async (config: QuizConfig): Promise<void> => {
    dispatch({ type: "GENERATION_START" });

    try {
      const generatedQuiz = await generateQuizWithAI(config);
      dispatch({ type: "GENERATION_SUCCESS", payload: generatedQuiz });
    } catch (error) {
      dispatch({
        type: "GENERATION_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to generate quiz",
      });
    }
  };

  const startQuiz = async (quizId: string): Promise<void> => {
    try {
      const quiz = savedQuizzes.find((q) => q.id === quizId);
      if (!quiz) {
        throw new Error("Quiz not found");
      }

      const attempt: QuizAttempt = {
        id: Date.now().toString(),
        quizId: quiz.id,
        userId: "current-user", // In real app, get from auth context
        answers: {},
        startedAt: new Date().toISOString(),
        totalQuestions: quiz.questions.length,
        correctAnswers: 0,
        isCompleted: false,
        flaggedQuestions: [],
      };

      // Save attempt
      setQuizAttempts((prev) => [...prev, attempt]);

      dispatch({
        type: "START_QUIZ",
        payload: { quiz, attempt },
      });
    } catch (error) {
      dispatch({
        type: "GENERATION_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to start quiz",
      });
    }
  };

  const submitAnswer = (questionId: string, answer: string): void => {
    dispatch({
      type: "SUBMIT_ANSWER",
      payload: { questionId, answer },
    });
  };

  const flagQuestion = (questionId: string): void => {
    dispatch({ type: "FLAG_QUESTION", payload: questionId });
  };

  const completeQuiz = async (): Promise<QuizResult> => {
    if (!state.currentQuiz || !state.currentAttempt) {
      throw new Error("No active quiz to complete");
    }

    const { currentQuiz, currentAttempt } = state;

    // Calculate results
    const detailedResults = currentQuiz.questions.map((question) => {
      const userAnswer = currentAttempt.answers[question.id] || "";
      const isCorrect =
        userAnswer.toLowerCase().trim() ===
        question.correct_answer.toLowerCase().trim();

      return {
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correct_answer,
        isCorrect,
        points: isCorrect ? question.points : 0,
        explanation: question.explanation,
      };
    });

    const correctAnswers = detailedResults.filter((r) => r.isCorrect).length;
    const totalScore = detailedResults.reduce(
      (sum, result) => sum + result.points,
      0
    );
    const maxScore = currentQuiz.questions.reduce(
      (sum, q) => sum + q.points,
      0
    );
    const percentage = (totalScore / maxScore) * 100;

    const getGrade = (percentage: number): string => {
      if (percentage >= 90) return "A+";
      if (percentage >= 80) return "A";
      if (percentage >= 70) return "B+";
      if (percentage >= 60) return "B";
      if (percentage >= 50) return "C+";
      if (percentage >= 40) return "C";
      return "F";
    };

    const timeSpent = Math.floor(
      (new Date().getTime() - new Date(currentAttempt.startedAt).getTime()) /
        1000
    );

    const result: QuizResult = {
      attempt: {
        ...currentAttempt,
        isCompleted: true,
        completedAt: new Date().toISOString(),
        score: totalScore,
        correctAnswers,
        timeSpent,
      },
      quiz: currentQuiz,
      detailedResults,
      performance: {
        totalScore,
        percentage,
        grade: getGrade(percentage),
        timeSpent,
        averageTimePerQuestion: timeSpent / currentQuiz.questions.length,
      },
      recommendations: generateRecommendations(detailedResults, currentQuiz),
    };

    // Update attempt in storage
    setQuizAttempts((prev) =>
      prev.map((attempt) =>
        attempt.id === currentAttempt.id ? result.attempt : attempt
      )
    );

    dispatch({ type: "COMPLETE_QUIZ", payload: result });

    return result;
  };

  const saveQuiz = async (quiz: Quiz): Promise<void> => {
    try {
      setSavedQuizzes((prev) => {
        const existingIndex = prev.findIndex((q) => q.id === quiz.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...quiz,
            updatedAt: new Date().toISOString(),
          };
          return updated;
        } else {
          return [...prev, quiz];
        }
      });

      dispatch({ type: "SAVE_QUIZ_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "GENERATION_ERROR",
        payload: error instanceof Error ? error.message : "Failed to save quiz",
      });
    }
  };

  const loadQuiz = async (quizId: string): Promise<void> => {
    try {
      const quiz = savedQuizzes.find((q) => q.id === quizId);
      if (!quiz) {
        throw new Error("Quiz not found");
      }

      dispatch({ type: "LOAD_QUIZ", payload: quiz });
    } catch (error) {
      dispatch({
        type: "GENERATION_ERROR",
        payload: error instanceof Error ? error.message : "Failed to load quiz",
      });
    }
  };

  const clearError = (): void => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: QuizContextType = {
    ...state,
    generateQuiz,
    startQuiz,
    submitAnswer,
    flagQuestion,
    completeQuiz,
    saveQuiz,
    loadQuiz,
    clearError,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

function generateRecommendations(
  results: QuizResult["detailedResults"],
  quiz: Quiz
): string[] {
  const recommendations: string[] = [];
  const incorrectCount = results.filter((r) => !r.isCorrect).length;
  const totalCount = results.length;
  const percentage = ((totalCount - incorrectCount) / totalCount) * 100;

  console.log("Quiz results:", quiz);

  if (percentage < 50) {
    recommendations.push(
      "Consider reviewing the fundamental concepts of this topic"
    );
    recommendations.push("Practice more questions on this subject");
  } else if (percentage < 70) {
    recommendations.push(
      "Good effort! Focus on understanding the explanations for incorrect answers"
    );
    recommendations.push("Try attempting more medium-difficulty questions");
  } else if (percentage < 90) {
    recommendations.push("Great job! Challenge yourself with harder questions");
    recommendations.push("Review the topics where you made mistakes");
  } else {
    recommendations.push("Excellent performance! You have mastered this topic");
    recommendations.push(
      "Consider helping others or exploring advanced topics"
    );
  }

  return recommendations;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export default QuizContext;
