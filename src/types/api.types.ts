export interface APIResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
  };
  timestamp: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface OpenAIRequest {
  model: string;
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export interface OpenAIResponse {
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

export interface QuizGenerationRequest {
  config: import('./quiz.types').QuizConfig;
  customInstructions?: string;
}

export interface QuizGenerationResponse {
  quiz: import('./quiz.types').IQuiz;
  metadata: {
    tokensUsed: number;
    generationTime: number;
    model: string;
  };
}

export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'json' | 'csv';
  includeAnswers: boolean;
  includeExplanations: boolean;
  includeStatistics: boolean;
  customHeader?: string;
  customFooter?: string;
}