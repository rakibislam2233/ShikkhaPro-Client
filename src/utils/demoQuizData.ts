import type { Quiz, Question } from '@/types/quiz.types';

export const createDemoQuiz = (): Quiz => {
  const questions: Question[] = [
    {
      id: 'q1',
      question: 'What is the capital of Bangladesh?',
      type: 'mcq',
      options: ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna'],
      correctAnswer: 'Dhaka',
      explanation: 'Dhaka is the capital and largest city of Bangladesh.',
      difficulty: 'easy',
      points: 10,
      category: 'Geography',
      tags: ['bangladesh', 'capital', 'geography']
    },
    {
      id: 'q2',
      question: 'Which of the following are programming languages? (Select all that apply)',
      type: 'multiple-select',
      options: ['JavaScript', 'HTML', 'Python', 'CSS', 'Java'],
      correctAnswer: ['JavaScript', 'Python', 'Java'],
      explanation: 'JavaScript, Python, and Java are programming languages. HTML and CSS are markup and styling languages respectively.',
      difficulty: 'medium',
      points: 15,
      category: 'Computer Science',
      tags: ['programming', 'languages']
    },
    {
      id: 'q3',
      question: 'The Earth is flat.',
      type: 'true-false',
      correctAnswer: 'False',
      explanation: 'The Earth is approximately spherical, not flat. This has been scientifically proven through various methods.',
      difficulty: 'easy',
      points: 5,
      category: 'Science',
      tags: ['earth', 'geography', 'science']
    },
    {
      id: 'q4',
      question: 'What is the result of 15 + 27?',
      type: 'mcq',
      options: ['40', '41', '42', '43'],
      correctAnswer: '42',
      explanation: '15 + 27 = 42',
      difficulty: 'easy',
      points: 5,
      category: 'Mathematics',
      tags: ['arithmetic', 'addition']
    },
    {
      id: 'q5',
      question: 'Explain the concept of photosynthesis in your own words.',
      type: 'short-answer',
      correctAnswer: 'Photosynthesis is the process by which plants use sunlight, carbon dioxide, and water to produce glucose and oxygen.',
      explanation: 'Photosynthesis is a crucial biological process where plants convert light energy into chemical energy (glucose) while releasing oxygen as a byproduct.',
      difficulty: 'medium',
      points: 20,
      category: 'Biology',
      tags: ['plants', 'biology', 'process']
    }
  ];

  return {
    id: 'demo-quiz-1',
    title: 'Sample Knowledge Quiz',
    description: 'A demonstration quiz covering various topics including geography, computer science, science, mathematics, and biology.',
    subject: 'General Knowledge',
    topic: 'Mixed Topics',
    academicLevel: 'class-10',
    difficulty: 'medium',
    language: 'english',
    questions,
    timeLimit: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'demo-user',
    isPublic: true,
    tags: ['demo', 'mixed-topics', 'general-knowledge'],
    estimatedTime: 15,
    totalPoints: 55,
    instructions: 'This is a demo quiz. Take your time and answer all questions to the best of your ability.',
    userAnswers: {},
    attempts: 0,
    averageScore: 0
  };
};

export const saveDemoQuizToStorage = (): void => {
  const demoQuiz = createDemoQuiz();
  const existingQuizzes = JSON.parse(localStorage.getItem('saved-quizzes') || '[]');
  
  // Check if demo quiz already exists
  const demoExists = existingQuizzes.some((quiz: Quiz) => quiz.id === demoQuiz.id);
  
  if (!demoExists) {
    existingQuizzes.push(demoQuiz);
    localStorage.setItem('saved-quizzes', JSON.stringify(existingQuizzes));
  }
};

export const getDemoQuizzes = (): Quiz[] => {
  const demoQuiz = createDemoQuiz();
  return [demoQuiz];
};