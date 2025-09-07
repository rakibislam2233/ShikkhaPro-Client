// Quiz Result specific interfaces based on API response format

export interface QuizResultAttempt {
  _id: string;
  quizId: string;
  userId: string;
  answers: { [questionId: string]: string | string[] };
  totalQuestions: number;
  correctAnswers: number;
  isCompleted: boolean;
  flaggedQuestions: string[];
  status: string;
  timeLimit: number;
  startedAt: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
  timeSpent: number;
  __v: number;
  percentage: number;
  grade: string;
  id: string;
}

export interface QuizResultConfig {
  academicLevel: string;
  subject: string;
  topic: string;
  language: string;
  questionType: string;
  difficulty: string;
  questionCount: number;
  timeLimit: number;
  instructions: string;
  _id: string;
}

export interface QuizResultQuestion {
  id: string;
  question: string;
  type: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  points: number;
  category: string;
  tags: string[];
  _id: string;
}

export interface QuizResultQuiz {
  _id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  academicLevel: string;
  difficulty: string;
  language: string;
  questions: QuizResultQuestion[];
  timeLimit: number;
  createdBy: string;
  isPublic: boolean;
  tags: string[];
  instructions: string;
  config: QuizResultConfig;
  attempts: number;
  averageScore: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  totalPoints: number;
  estimatedTime: number;
  __v: number;
  questionCount: number;
  id: string;
}

export interface QuizDetailedResult {
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
  explanation: string;
}

export interface QuizResultPerformance {
  percentage: number | null;
  grade: string;
  timeSpent: number;
  averageTimePerQuestion: number;
}

export interface QuizResultResponse {
  attempt: QuizResultAttempt;
  quiz: QuizResultQuiz;
  detailedResults: QuizDetailedResult[];
  performance: QuizResultPerformance;
  recommendations: string[];
}

export interface QuizResultApiResponse {
  code: number;
  message: string;
  data: QuizResultResponse;
}