import type { Question, QuizDifficulty, QuizLanguage } from '../types/quiz.types';

// Note: In a real application, this should be handled by a secure backend API
// Never expose your OpenAI API key in the frontend

interface QuizGenerationParams {
  subject: string;
  topic: string;
  academicLevel: string;
  difficulty: QuizDifficulty;
  language: QuizLanguage;
  questionCount: number;
  questionTypes: string[];
  timeLimit?: number;
}

// Mock OpenAI API service for demonstration
// In production, replace this with actual OpenAI API calls through your backend
export class OpenAIService {
  private static instance: OpenAIService;

  private constructor() {}

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  public async generateQuiz(params: QuizGenerationParams): Promise<Question[]> {
    // For demo purposes, return mock data instead of making actual API call
    // In production, uncomment the actual API call below
    
    return this.generateMockQuiz(params);
  }

  private generateMockQuiz(params: QuizGenerationParams): Question[] {
    const mockQuestions: Question[] = [];
    
    // Generate different types of questions based on params
    for (let i = 0; i < params.questionCount; i++) {
      const questionType = params.questionTypes[i % params.questionTypes.length] as Question['type'];
      
      let question: Question;
      
      switch (questionType) {
        case 'mcq':
          question = this.generateMockMCQ(params, i + 1);
          break;
        case 'true-false':
          question = this.generateMockTrueFalse(params, i + 1);
          break;
        case 'short-answer':
          question = this.generateMockShortAnswer(params, i + 1);
          break;
        case 'multiple-select':
          question = this.generateMockMultipleSelect(params, i + 1);
          break;
        default:
          question = this.generateMockMCQ(params, i + 1);
      }
      
      mockQuestions.push(question);
    }
    
    return mockQuestions;
  }

  private generateMockMCQ(params: QuizGenerationParams, questionNumber: number): Question {
    const questions: Record<QuizLanguage, Record<string, string>> = {
      english: {
        mathematics: `What is the value of x in the equation 2x + 5 = ${3 + questionNumber * 2}?`,
        physics: `What is the SI unit of ${questionNumber % 2 === 0 ? 'force' : 'energy'}?`,
        chemistry: `Which element has the chemical symbol ${questionNumber % 2 === 0 ? 'Na' : 'K'}?`,
        biology: `Which organ is responsible for ${questionNumber % 2 === 0 ? 'pumping blood' : 'filtering waste'}?`,
        english: `What is the ${questionNumber % 2 === 0 ? 'past tense' : 'plural form'} of "go"?`
      },
      bengali: {
        mathematics: `২x + ৫ = ${3 + questionNumber * 2} সমীকরণে x এর মান কত?`,
        physics: `${questionNumber % 2 === 0 ? 'বল' : 'শক্তি'} এর SI একক কী?`,
        chemistry: `${questionNumber % 2 === 0 ? 'Na' : 'K'} কোন মৌলের রাসায়নিক প্রতীক?`,
        biology: `${questionNumber % 2 === 0 ? 'রক্ত পাম্প করার' : 'বর্জ্য ছাঁকার'} জন্য কোন অঙ্গ দায়ী?`,
        english: `"go" শব্দের ${questionNumber % 2 === 0 ? 'অতীত কাল' : 'বহুবচন রূপ'} কী?`
      },
      hindi: {
        mathematics: `2x + 5 = ${3 + questionNumber * 2} समीकरण में x का मान क्या है?`,
        physics: `${questionNumber % 2 === 0 ? 'बल' : 'ऊर्जा'} का SI मात्रक क्या है?`,
        chemistry: `${questionNumber % 2 === 0 ? 'Na' : 'K'} किस तत्व का रासायनिक प्रतीक है?`,
        biology: `${questionNumber % 2 === 0 ? 'रक्त पंप करने' : 'अपशिष्ट फिल्टर करने'} के लिए कौन सा अंग जिम्मेदार है?`,
        english: `"go" का ${questionNumber % 2 === 0 ? 'भूतकाल' : 'बहुवचन रूप'} क्या है?`
      }
    };

    const options: Record<string, string[]> = {
      mathematics: ['1', '2', '3', '4'],
      physics: ['Newton', 'Joule', 'Watt', 'Pascal'],
      chemistry: ['Sodium', 'Potassium', 'Nitrogen', 'Oxygen'],
      biology: ['Heart', 'Liver', 'Kidneys', 'Lungs'],
      english: ['went', 'gone', 'goes', 'going']
    };

    return {
      id: `mock_q_${questionNumber}`,
      question: questions[params.language]?.[params.subject.toLowerCase()] || questions.english.mathematics,
      type: 'mcq',
      options: options[params.subject.toLowerCase()] || options.mathematics,
      correctAnswer: options[params.subject.toLowerCase()]?.[0] || '2',
      explanation: 'This is a sample explanation for the mock question.',
      points: params.difficulty === 'easy' ? 5 : params.difficulty === 'medium' ? 10 : 15,
      difficulty: params.difficulty
    };
  }

  private generateMockTrueFalse(params: QuizGenerationParams, questionNumber: number): Question {
    const statements: Record<QuizLanguage, Record<string, string>> = {
      english: {
        mathematics: `The square root of ${questionNumber * 4} is ${questionNumber * 2}.`,
        physics: 'Light travels faster than sound.',
        chemistry: 'Water has the chemical formula H2O.',
        biology: 'The human heart has four chambers.',
        english: 'Shakespeare wrote Romeo and Juliet.'
      },
      bengali: {
        mathematics: `${questionNumber * 4} এর বর্গমূল হল ${questionNumber * 2}।`,
        physics: 'আলো শব্দের চেয়ে দ্রুত চলে।',
        chemistry: 'পানির রাসায়নিক সংকেত H2O।',
        biology: 'মানুষের হৃদয়ে চারটি প্রকোষ্ঠ রয়েছে।',
        english: 'শেক্সপিয়র রোমিও অ্যান্ড জুলিয়েট লিখেছিলেন।'
      },
      hindi: {
        mathematics: `${questionNumber * 4} का वर्गमूल ${questionNumber * 2} है।`,
        physics: 'प्रकाश ध्वनि से तेज़ चलता है।',
        chemistry: 'पानी का रासायनिक सूत्र H2O है।',
        biology: 'मानव हृदय में चार कक्ष होते हैं।',
        english: 'शेक्सपियर ने रोमियो और जूलियट लिखा था।'
      }
    };

    return {
      id: `mock_tf_${questionNumber}`,
      question: statements[params.language]?.[params.subject.toLowerCase()] || statements.english.mathematics,
      type: 'true-false',
      correctAnswer: 'True',
      explanation: 'This statement is true based on established facts.',
      points: params.difficulty === 'easy' ? 5 : params.difficulty === 'medium' ? 10 : 15,
      difficulty: params.difficulty
    };
  }

  private generateMockShortAnswer(params: QuizGenerationParams, questionNumber: number): Question {
    const questions: Record<QuizLanguage, Record<string, string>> = {
      english: {
        mathematics: 'Explain the concept of prime numbers and give three examples.',
        physics: 'Describe Newton\'s first law of motion in your own words.',
        chemistry: 'What is the difference between an atom and a molecule?',
        biology: 'Explain the process of photosynthesis in plants.',
        english: 'What is a metaphor? Provide an example.'
      },
      bengali: {
        mathematics: 'মৌলিক সংখ্যার ধারণা ব্যাখ্যা করুন এবং তিনটি উদাহরণ দিন।',
        physics: 'নিউটনের প্রথম গতিসূত্র নিজের ভাষায় বর্ণনা করুন।',
        chemistry: 'পরমাণু এবং অণুর মধ্যে পার্থক্য কী?',
        biology: 'উদ্ভিদে সালোকসংশ্লেষণ প্রক্রিয়া ব্যাখ্যা করুন।',
        english: 'রূপক কী? একটি উদাহরণ দিন।'
      },
      hindi: {
        mathematics: 'अभाज्य संख्याओं की अवधारणा समझाएं और तीन उदाहरण दें।',
        physics: 'न्यूटन के पहले गति नियम को अपने शब्दों में वर्णित करें।',
        chemistry: 'परमाणु और अणु में क्या अंतर है?',
        biology: 'पौधों में प्रकाश संश्लेषण की प्रक्रिया समझाएं।',
        english: 'रूपक क्या है? एक उदाहरण दें।'
      }
    };

    return {
      id: `mock_sa_${questionNumber}`,
      question: questions[params.language]?.[params.subject.toLowerCase()] || questions.english.mathematics,
      type: 'short-answer',
      correctAnswer: 'A comprehensive answer explaining the concept with relevant examples.',
      explanation: 'This question tests understanding of fundamental concepts.',
      points: params.difficulty === 'easy' ? 10 : params.difficulty === 'medium' ? 15 : 20,
      difficulty: params.difficulty
    };
  }

  private generateMockMultipleSelect(params: QuizGenerationParams, questionNumber: number): Question {
    const questions: Record<string, Record<string, string>> = {
      english: {
        mathematics: 'Which of the following are prime numbers?',
        physics: 'Which of these are units of energy?',
        chemistry: 'Which elements are noble gases?',
        biology: 'Which organs are part of the digestive system?',
        english: 'Which of these are examples of literary devices?'
      }
    };

    const options: Record<string, string[]> = {
      mathematics: ['2', '4', '7', '9'],
      physics: ['Joule', 'Newton', 'Calorie', 'Watt'],
      chemistry: ['Helium', 'Oxygen', 'Neon', 'Nitrogen'],
      biology: ['Heart', 'Stomach', 'Liver', 'Brain'],
      english: ['Metaphor', 'Noun', 'Alliteration', 'Verb']
    };

    const correctAnswers: Record<string, string[]> = {
      mathematics: ['2', '7'],
      physics: ['Joule', 'Calorie'],
      chemistry: ['Helium', 'Neon'],
      biology: ['Stomach', 'Liver'],
      english: ['Metaphor', 'Alliteration']
    };

    return {
      id: `mock_ms_${questionNumber}`,
      question: questions.english?.[params.subject.toLowerCase()] || questions.english.mathematics,
      type: 'multiple-select',
      options: options[params.subject.toLowerCase()] || options.mathematics,
      correctAnswer: correctAnswers[params.subject.toLowerCase()] || correctAnswers.mathematics,
      explanation: 'Select all correct options from the given choices.',
      points: params.difficulty === 'easy' ? 10 : params.difficulty === 'medium' ? 15 : 20,
      difficulty: params.difficulty
    };
  }

  public async validateAPIKey(): Promise<boolean> {
    // For demo purposes, always return true
    // In production, implement actual API key validation
    return true;
  }
}

export const openaiService = OpenAIService.getInstance();