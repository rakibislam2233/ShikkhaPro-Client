export type AcademicLevel = 'class-1' | 'class-2' | 'class-3' | 'class-4' | 'class-5' | 
  'class-6' | 'class-7' | 'class-8' | 'class-9' | 'class-10' | 'jsc' | 'ssc' | 'hsc' | 'bsc' | 'msc';

export type QuestionType = 'mcq' | 'short-answer' | 'true-false' | 'multiple-select' | 'mixed';

export type QuizDifficulty = 'easy' | 'medium' | 'hard';
export type Difficulty = QuizDifficulty;

export type QuizLanguage = 'english' | 'bengali' | 'hindi';
export type Language = QuizLanguage;

export interface QuizConfig {
  academicLevel: AcademicLevel;
  subject: string;
  topic: string;
  language: QuizLanguage;
  questionType: QuestionType;
  difficulty: QuizDifficulty;
  questionCount: number;
  timeLimit?: number; // in minutes
  instructions?: string;
}

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[]; 
  correctAnswer: string | string[];
  correct_answer?: string; 
  explanation: string;
  difficulty: Difficulty;
  points: number;
  category?: string;
  tags?: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  subject: string;
  topic: string;
  academicLevel: AcademicLevel;
  difficulty: QuizDifficulty;
  language: QuizLanguage;
  questions: Question[];
  timeLimit?: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isPublic: boolean;
  tags: string[];
  estimatedTime?: number;
  totalPoints?: number;
  instructions?: string;
  userAnswers?: { [questionId: string]: string | string[] };
  // Legacy compatibility
  config?: QuizConfig;
  attempts?: number;
  averageScore?: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: { [questionId: string]: string | string[] };
  startedAt: string;
  completedAt?: string;
  score?: number;
  totalScore?: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent?: number; 
  isCompleted: boolean;
  flaggedQuestions: string[];
}

export interface QuizResult {
  attempt: QuizAttempt;
  quiz: Quiz;
  detailedResults: {
    questionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    points: number;
    explanation: string;
  }[];
  performance: {
    totalScore: number;
    percentage: number;
    grade: string;
    timeSpent: number;
    averageTimePerQuestion: number;
  };
  recommendations: string[];
}

export interface QuizStats {
  totalQuizzes: number;
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
  favoriteSubjects: string[];
  weakAreas: string[];
  strongAreas: string[];
  streakDays: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'performance' | 'consistency' | 'improvement' | 'milestone';
}

export interface QuizContextType {
  currentQuiz: Quiz | null;
  currentAttempt: QuizAttempt | null;
  isGenerating: boolean;
  error: string | null;
  generateQuiz: (config: QuizConfig) => Promise<void>;
  startQuiz: (quizId: string) => Promise<void>;
  submitAnswer: (questionId: string, answer: string | string[]) => void;
  saveAnswer: (questionId: string, answer: string | string[]) => void;
  submitQuiz: (quizId: string) => Promise<void>;
  flagQuestion: (questionId: string) => void;
  completeQuiz: () => Promise<QuizResult>;
  saveQuiz: (quiz: Quiz) => Promise<void>;
  loadQuiz: (quizId: string) => Promise<void>;
  clearError: () => void;
}

export interface QuizSearchFilters {
  academicLevel?: AcademicLevel[];
  subject?: string[];
  difficulty?: Difficulty[];
  questionType?: QuestionType[];
  language?: Language[];
  dateRange?: {
    from: string;
    to: string;
  };
  tags?: string[];
}

export interface QuizLibrary {
  quizzes: Quiz[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: QuizSearchFilters;
  sortBy: 'createdAt' | 'updatedAt' | 'attempts' | 'averageScore' | 'title';
  sortOrder: 'asc' | 'desc';
}