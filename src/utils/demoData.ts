import type { Question, Quiz, QuizAttempt } from "../types/quiz.types";


export const demoQuestions: Question[] = [
  {
    id: 'q1',
    question: 'What is the capital of France?',
    type: 'mcq',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
    explanation: 'Paris is the capital and most populous city of France.',
    points: 10,
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: 'What is 2 + 2?',
    type: 'mcq',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: '2 + 2 equals 4.',
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 'q3',
    question: 'The Earth revolves around the Sun.',
    type: 'true-false',
    correctAnswer: 'True',
    explanation: 'The Earth orbits the Sun in approximately 365.25 days.',
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 'q4',
    question: 'Explain the process of photosynthesis.',
    type: 'short-answer',
    correctAnswer: 'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of glucose.',
    explanation: 'Photosynthesis is crucial for life on Earth as it produces oxygen and converts solar energy into chemical energy.',
    points: 15,
    difficulty: 'medium'
  },
  {
    id: 'q5',
    question: 'Which of the following are primary colors?',
    type: 'multiple-select',
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    correctAnswer: ['Red', 'Blue', 'Yellow'],
    explanation: 'Red, blue, and yellow are considered primary colors in traditional color theory.',
    points: 12,
    difficulty: 'medium'
  }
];

export const demoQuizzes: Quiz[] = [
  {
    id: 'demo_quiz_1',
    title: 'General Knowledge Quiz',
    description: 'Test your general knowledge with this comprehensive quiz covering various topics.',
    subject: 'General Knowledge',
    topic: 'Mixed Topics',
    academicLevel: 'class-10',
    difficulty: 'medium',
    language: 'english',
    questions: demoQuestions,
    timeLimit: 15,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    tags: ['general', 'knowledge', 'mixed'],
    isPublic: true,
    createdBy: 'demo_user',
    estimatedTime: 10,
    totalPoints: 47,
    userAnswers: {}
  },
  {
    id: 'demo_quiz_2',
    title: 'Mathematics - Algebra Basics',
    description: 'Master the fundamentals of algebra with these practice problems.',
    subject: 'Mathematics',
    topic: 'Algebra Basics',
    academicLevel: 'class-9',
    difficulty: 'medium',
    language: 'english',
    questions: [
      {
        id: 'math_q1',
        question: 'Solve for x: 2x + 5 = 13',
        type: 'mcq',
        options: ['x = 2', 'x = 4', 'x = 6', 'x = 8'],
        correctAnswer: 'x = 4',
        explanation: '2x + 5 = 13, so 2x = 8, therefore x = 4.',
        points: 10,
        difficulty: 'medium'
      },
      {
        id: 'math_q2',
        question: 'What is the slope of the line y = 3x + 2?',
        type: 'short-answer',
        correctAnswer: '3',
        explanation: 'In the equation y = mx + b, m is the slope. Here m = 3.',
        points: 8,
        difficulty: 'easy'
      }
    ],
    timeLimit: 20,
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-12T14:00:00Z',
    tags: ['mathematics', 'algebra', 'class-9'],
    isPublic: true,
    createdBy: 'demo_user',
    estimatedTime: 8,
    totalPoints: 18,
    userAnswers: {}
  },
  {
    id: 'demo_quiz_3',
    title: 'Physics - Forces and Motion',
    description: 'Understand the principles of forces and motion in physics.',
    subject: 'Physics',
    topic: 'Forces and Motion',
    academicLevel: 'hsc',
    difficulty: 'hard',
    language: 'english',
    questions: [
      {
        id: 'phy_q1',
        question: 'What is Newton\'s first law of motion?',
        type: 'short-answer',
        correctAnswer: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
        explanation: 'This is also known as the law of inertia.',
        points: 15,
        difficulty: 'medium'
      },
      {
        id: 'phy_q2',
        question: 'The SI unit of force is Newton.',
        type: 'true-false',
        correctAnswer: 'True',
        explanation: 'Newton (N) is indeed the SI unit of force, named after Sir Isaac Newton.',
        points: 5,
        difficulty: 'easy'
      }
    ],
    timeLimit: 25,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T09:00:00Z',
    tags: ['physics', 'forces', 'motion', 'class-11'],
    isPublic: true,
    createdBy: 'demo_user',
    estimatedTime: 12,
    totalPoints: 20,
    userAnswers: {}
  },
  {
    id: 'demo_quiz_4',
    title: 'English Literature - Poetry',
    description: 'Explore the world of poetry and literary devices.',
    subject: 'English',
    topic: 'Poetry Analysis',
    academicLevel: 'hsc',
    difficulty: 'medium',
    language: 'english',
    questions: [
      {
        id: 'eng_q1',
        question: 'What is a metaphor?',
        type: 'short-answer',
        correctAnswer: 'A figure of speech that directly compares two unlike things without using "like" or "as".',
        explanation: 'Metaphors create implicit comparisons, such as "Time is money".',
        points: 10,
        difficulty: 'medium'
      },
      {
        id: 'eng_q2',
        question: 'Which of these are examples of alliteration?',
        type: 'multiple-select',
        options: ['Sally sells seashells', 'The cat sat on the mat', 'Big blue balloons', 'A dark and stormy night'],
        correctAnswer: ['Sally sells seashells', 'Big blue balloons'],
        explanation: 'Alliteration is the repetition of initial consonant sounds in consecutive words.',
        points: 12,
        difficulty: 'medium'
      }
    ],
    timeLimit: 30,
    createdAt: '2024-01-08T11:30:00Z',
    updatedAt: '2024-01-08T11:30:00Z',
    tags: ['english', 'literature', 'poetry', 'hsc'],
    isPublic: false,
    createdBy: 'demo_user',
    estimatedTime: 15,
    totalPoints: 22,
    userAnswers: {}
  }
];

export const demoAttempts: QuizAttempt[] = [
  {
    id: 'attempt_1',
    quizId: 'demo_quiz_1',
    userId: 'demo_user',
    answers: {
      'q1': 'Paris',
      'q2': '4',
      'q3': 'True',
      'q4': 'Photosynthesis is how plants make food using sunlight',
      'q5': ['Red', 'Blue', 'Yellow']
    },
    startedAt: '2024-01-20T10:00:00Z',
    completedAt: '2024-01-20T10:12:00Z',
    totalQuestions: 5,
    correctAnswers: 4,
    score: 42,
    totalScore: 47,
    timeSpent: 720, // 12 minutes
    isCompleted: true,
    flaggedQuestions: ['q4']
  },
  {
    id: 'attempt_2',
    quizId: 'demo_quiz_2',
    userId: 'demo_user',
    answers: {
      'math_q1': 'x = 4',
      'math_q2': '3'
    },
    startedAt: '2024-01-19T15:00:00Z',
    completedAt: '2024-01-19T15:08:00Z',
    totalQuestions: 2,
    correctAnswers: 2,
    score: 18,
    totalScore: 18,
    timeSpent: 480, // 8 minutes
    isCompleted: true,
    flaggedQuestions: []
  },
  {
    id: 'attempt_3',
    quizId: 'demo_quiz_3',
    userId: 'demo_user',
    answers: {
      'phy_q1': 'Objects in motion stay in motion unless a force acts on them',
      'phy_q2': 'True'
    },
    startedAt: '2024-01-18T14:00:00Z',
    completedAt: '2024-01-18T14:15:00Z',
    totalQuestions: 2,
    correctAnswers: 1,
    score: 15,
    totalScore: 20,
    timeSpent: 900, // 15 minutes
    isCompleted: true,
    flaggedQuestions: ['phy_q1']
  }
];

export const initializeDemoData = () => {
  // Check if demo data already exists
  const existingQuizzes = localStorage.getItem('saved-quizzes');
  const existingAttempts = localStorage.getItem('quiz-attempts');

  // Only initialize if no data exists
  if (!existingQuizzes || JSON.parse(existingQuizzes).length === 0) {
    localStorage.setItem('saved-quizzes', JSON.stringify(demoQuizzes));
  }

  if (!existingAttempts || JSON.parse(existingAttempts).length === 0) {
    localStorage.setItem('quiz-attempts', JSON.stringify(demoAttempts));
  }
};

export const getDemoStats = () => {
  return {
    totalQuizzes: demoQuizzes.length,
    totalAttempts: demoAttempts.length,
    averageScore: Math.round(demoAttempts.reduce((sum, attempt) => {
      if (attempt.score && attempt.totalScore) {
        return sum + (attempt.score / attempt.totalScore) * 100;
      }
      return sum;
    }, 0) / demoAttempts.length),
    completionRate: 100, // All demo attempts are completed
    totalStudents: 15, // Mock number
    activeQuizzes: 3
  };
};