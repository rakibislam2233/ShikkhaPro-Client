import type { Quiz, QuizConfig } from '@/types/quiz.types';
import { openaiService } from '../services/openaiService';

export const generateQuizWithAI = async (config: QuizConfig): Promise<Quiz> => {
  try {
    // Convert question types to array format for API
    const questionTypes = [config.questionType];
    if (config.questionType === 'mixed') {
      questionTypes.push('mcq', 'true-false', 'short-answer');
    }

    // Generate questions using OpenAI service
    const questions = await openaiService.generateQuiz({
      subject: config.subject,
      topic: config.topic,
      academicLevel: config.academicLevel,
      difficulty: config.difficulty,
      language: config.language,
      questionCount: config.questionCount,
      questionTypes,
      timeLimit: config.timeLimit
    });

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