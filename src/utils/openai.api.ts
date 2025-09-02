
import type { Question, Quiz, QuizConfig } from '@/types/quiz.types';
import { LANGUAGES } from './constants';

// Note: In production, API key should be handled by a backend service
// This is for demonstration purposes only
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function generateQuizWithAI(config: QuizConfig): Promise<Quiz> {
  if (!OPENAI_API_KEY) {
    // If no API key is provided, return a mock quiz for development
    console.warn('OpenAI API key not found. Returning mock quiz for development.');
    return generateMockQuiz(config);
  }

  try {
    const prompt = createQuizPrompt(config);
    
    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: `You are an expert educational content creator specializing in generating academic quizzes. 
        You create high-quality, accurate, and engaging quiz questions appropriate for the specified academic level.
        Always return valid JSON in the exact format requested.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from OpenAI');
    }

    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    let parsedResponse;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        parsedResponse = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error('Invalid response format from OpenAI');
    }

    // Validate and transform the response
    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      throw new Error('Invalid quiz structure in response');
    }

    const questions: Question[] = parsedResponse.questions.map((q: any, index: number) => ({
      id: q.id || `q_${Date.now()}_${index}`,
      question: q.question,
      type: config.questionType,
      options: config.questionType === 'mcq' ? q.options : undefined,
      correct_answer: q.correct_answer,
      explanation: q.explanation || 'No explanation provided',
      difficulty: config.difficulty,
      points: config.difficulty === 'easy' ? 1 : config.difficulty === 'medium' ? 2 : 3,
      category: config.subject,
      tags: [config.subject, config.academicLevel, config.difficulty],
    }));

    const quiz: Quiz = {
      id: `quiz_${Date.now()}`,
      title: `${config.subject} - ${config.topic} Quiz`,
      description: `A ${config.difficulty} level ${config.questionType} quiz on ${config.topic} for ${config.academicLevel} students.`,
      config,
      questions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'ai-generated',
      isPublic: false,
      tags: [config.subject, config.academicLevel, config.difficulty, config.questionType],
      attempts: 0,
      averageScore: 0,
    };

    return quiz;
  } catch (error) {
    console.error('Error generating quiz with OpenAI:', error);
    // Fall back to mock quiz in case of error
    return generateMockQuiz(config);
  }
}

function createQuizPrompt(config: QuizConfig): string {
  const language = LANGUAGES.find(l => l.value === config.language);
  const languageInstruction = language ? `in ${language.label} (${language.nativeName})` : 'in English';
  
  const difficultyMap = {
    'easy': config.language === 'bengali' ? 'সহজ' : config.language === 'hindi' ? 'आसान' : 'easy',
    'medium': config.language === 'bengali' ? 'মাধ্যম' : config.language === 'hindi' ? 'मध्यम' : 'medium',
    'hard': config.language === 'bengali' ? 'কঠিন' : config.language === 'hindi' ? 'कठिन' : 'hard',
  };

  const questionTypeInstructions = {
    'mcq': 'Multiple Choice Questions with exactly 4 options each, only one correct answer',
    'short-answer': 'Short answer questions requiring brief written responses (1-2 sentences)',
    'true-false': 'True/False questions with clear statements',
    'mixed': 'A mix of Multiple Choice, Short Answer, and True/False questions',
  };

  return `Generate ${config.questionCount} ${difficultyMap[config.difficulty]} level ${questionTypeInstructions[config.questionType]} about "${config.topic}" for ${config.academicLevel} level students ${languageInstruction}.

Requirements:
- Questions must be appropriate for ${config.academicLevel} academic level
- Focus on ${config.subject} subject area, specifically ${config.topic}
- Ensure ${difficultyMap[config.difficulty]} difficulty level is maintained
- Include practical examples and real-world applications where relevant
- Provide clear, detailed explanations for all answers

${config.questionType === 'mcq' ? `
For Multiple Choice Questions:
- Provide exactly 4 options labeled A, B, C, D
- Only one option should be correct
- Make incorrect options plausible but clearly wrong
- Avoid "All of the above" or "None of the above" unless necessary
` : ''}

${config.questionType === 'short-answer' ? `
For Short Answer Questions:
- Questions should require 1-2 sentence answers
- Focus on understanding and application, not just memorization
- Provide model answers that are concise but complete
` : ''}

${config.questionType === 'true-false' ? `
For True/False Questions:
- Make statements clear and unambiguous
- Avoid trick questions or overly complex statements
- Provide explanations for why the statement is true or false
` : ''}

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "id": "unique_question_id",
      "question": "The question text here",
      "type": "${config.questionType}",
      ${config.questionType === 'mcq' ? '"options": ["Option A", "Option B", "Option C", "Option D"],' : ''}
      "correct_answer": "The correct answer",
      "explanation": "Detailed explanation of why this answer is correct"
    }
  ]
}`;
}

// Mock quiz generator for development/fallback
function generateMockQuiz(config: QuizConfig): Quiz {
  const mockQuestions: Question[] = [];
  
  for (let i = 1; i <= config.questionCount; i++) {
    let question: Question;
    
    if (config.questionType === 'mcq' || config.questionType === 'mixed') {
      question = {
        id: `mock_q_${i}`,
        question: `Mock ${config.subject} question ${i} about ${config.topic}?`,
        type: 'mcq',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct_answer: 'Option A',
        explanation: `This is a mock explanation for question ${i}`,
        difficulty: config.difficulty,
        points: config.difficulty === 'easy' ? 1 : config.difficulty === 'medium' ? 2 : 3,
        category: config.subject,
        tags: [config.subject, config.academicLevel],
      };
    } else if (config.questionType === 'true-false') {
      question = {
        id: `mock_q_${i}`,
        question: `Mock true/false statement ${i} about ${config.topic}`,
        type: 'true-false',
        correct_answer: i % 2 === 0 ? 'True' : 'False',
        explanation: `This is a mock explanation for question ${i}`,
        difficulty: config.difficulty,
        points: config.difficulty === 'easy' ? 1 : config.difficulty === 'medium' ? 2 : 3,
        category: config.subject,
        tags: [config.subject, config.academicLevel],
      };
    } else {
      question = {
        id: `mock_q_${i}`,
        question: `Mock short answer question ${i} about ${config.topic}?`,
        type: 'short-answer',
        correct_answer: `Mock answer for question ${i}`,
        explanation: `This is a mock explanation for question ${i}`,
        difficulty: config.difficulty,
        points: config.difficulty === 'easy' ? 1 : config.difficulty === 'medium' ? 2 : 3,
        category: config.subject,
        tags: [config.subject, config.academicLevel],
      };
    }
    
    mockQuestions.push(question);
  }

  return {
    id: `mock_quiz_${Date.now()}`,
    title: `Mock ${config.subject} - ${config.topic} Quiz`,
    description: `A mock ${config.difficulty} level quiz for development`,
    config,
    questions: mockQuestions,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'mock-generator',
    isPublic: false,
    tags: [config.subject, config.academicLevel, config.difficulty],
    attempts: 0,
    averageScore: 0,
  };
}