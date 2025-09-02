import type { Quiz, QuizConfig, Question } from '@/types/quiz.types';

// Demo quiz generation - replace with actual OpenAI integration later
const generateDemoQuestions = (config: QuizConfig): Question[] => {
  const demoQuestions: { [key: string]: Question[] } = {
    Mathematics: [
      {
        id: `q_${Date.now()}_1`,
        question: `What is the result of 15 + 27?`,
        type: 'mcq',
        options: ['40', '41', '42', '43'],
        correctAnswer: '42',
        explanation: '15 + 27 = 42',
        difficulty: 'easy',
        points: 10,
        category: 'Arithmetic'
      },
      {
        id: `q_${Date.now()}_2`,
        question: `Solve for x: 2x + 8 = 20`,
        type: 'mcq',
        options: ['x = 4', 'x = 6', 'x = 8', 'x = 10'],
        correctAnswer: 'x = 6',
        explanation: '2x + 8 = 20, so 2x = 12, therefore x = 6',
        difficulty: 'medium',
        points: 15,
        category: 'Algebra'
      }
    ],
    Physics: [
      {
        id: `q_${Date.now()}_1`,
        question: `What is the unit of force in SI system?`,
        type: 'mcq',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correctAnswer: 'Newton',
        explanation: 'Newton (N) is the SI unit of force, named after Sir Isaac Newton.',
        difficulty: 'easy',
        points: 10,
        category: 'Units'
      },
      {
        id: `q_${Date.now()}_2`,
        question: `The acceleration due to gravity on Earth is approximately 9.8 m/s².`,
        type: 'true-false',
        correctAnswer: 'True',
        explanation: 'The standard acceleration due to gravity is approximately 9.8 m/s² or 9.81 m/s².',
        difficulty: 'easy',
        points: 5,
        category: 'Mechanics'
      }
    ],
    Chemistry: [
      {
        id: `q_${Date.now()}_1`,
        question: `What is the chemical symbol for gold?`,
        type: 'mcq',
        options: ['Go', 'Gd', 'Au', 'Ag'],
        correctAnswer: 'Au',
        explanation: 'Au comes from the Latin word "aurum" meaning gold.',
        difficulty: 'easy',
        points: 10,
        category: 'Elements'
      },
      {
        id: `q_${Date.now()}_2`,
        question: `Which of the following are noble gases? (Select all that apply)`,
        type: 'multiple-select',
        options: ['Helium', 'Oxygen', 'Neon', 'Nitrogen', 'Argon'],
        correctAnswer: ['Helium', 'Neon', 'Argon'],
        explanation: 'Noble gases are in Group 18 of the periodic table and include Helium, Neon, and Argon among others.',
        difficulty: 'medium',
        points: 15,
        category: 'Periodic Table'
      }
    ],
    Biology: [
      {
        id: `q_${Date.now()}_1`,
        question: `Explain the process of photosynthesis in plants.`,
        type: 'short-answer',
        correctAnswer: 'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen.',
        explanation: 'Photosynthesis occurs in chloroplasts and involves light-dependent and light-independent reactions.',
        difficulty: 'medium',
        points: 20,
        category: 'Plant Biology'
      }
    ]
  };

  const subjectQuestions = demoQuestions[config.subject] || demoQuestions.Mathematics;
  const selectedQuestions = subjectQuestions.slice(0, config.questionCount);
  
  // Adjust difficulty and points based on config
  return selectedQuestions.map((q, index) => ({
    ...q,
    id: `q_${Date.now()}_${index + 1}`,
    difficulty: config.difficulty,
    points: config.difficulty === 'easy' ? 5 : config.difficulty === 'medium' ? 10 : 15
  }));
};

export const generateQuizWithAI = async (config: QuizConfig): Promise<Quiz> => {
  try {
    // Demo: Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate demo questions
    const questions = generateDemoQuestions(config);

    // Create quiz object
    const quiz: Quiz = {
      id: `quiz_${Date.now()}`,
      title: `${config.subject} - ${config.topic}`,
      description: `A ${config.difficulty} level quiz on ${config.topic} for ${config.academicLevel} students`,
      subject: config.subject,
      topic: config.topic,
      academicLevel: config.academicLevel,
      difficulty: config.difficulty,
      language: config.language,
      questions,
      timeLimit: config.timeLimit || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [config.subject, config.topic, config.academicLevel],
      isPublic: false,
      createdBy: 'current-user',
      estimatedTime: Math.ceil(questions.length * 2),
      totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
      instructions: config.instructions || undefined,
      userAnswers: {}
    };

    return quiz;
  } catch (error) {
    console.error('Error generating quiz with AI:', error);
    throw new Error('Failed to generate quiz. Please try again.');
  }
};