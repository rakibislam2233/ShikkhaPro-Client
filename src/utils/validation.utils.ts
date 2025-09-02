import type { QuizConfig } from '@/types/quiz.types';
import * as yup from 'yup';

// Validation schemas for forms
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: yup.boolean(),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms and conditions'),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

export const resetPasswordSchema = yup.object({
  token: yup.string().required('Reset token is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});

export const otpSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  otp: yup
    .string()
    .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
    .required('OTP is required'),
});

export const quizConfigSchema = yup.object({
  academicLevel: yup
    .string()
    .oneOf([
      'class-1', 'class-2', 'class-3', 'class-4', 'class-5',
      'class-6', 'class-7', 'class-8', 'class-9', 'class-10',
      'jsc', 'ssc', 'hsc', 'bsc', 'msc'
    ])
    .required('Academic level is required'),
  subject: yup
    .string()
    .min(2, 'Subject must be at least 2 characters')
    .max(50, 'Subject must be less than 50 characters')
    .required('Subject is required'),
  topic: yup
    .string()
    .min(2, 'Topic must be at least 2 characters')
    .max(100, 'Topic must be less than 100 characters')
    .required('Topic is required'),
  language: yup
    .string()
    .oneOf(['english', 'bengali', 'hindi'])
    .required('Language is required'),
  questionType: yup
    .string()
    .oneOf(['mcq', 'short-answer', 'true-false', 'mixed'])
    .required('Question type is required'),
  difficulty: yup
    .string()
    .oneOf(['easy', 'medium', 'hard'])
    .required('Difficulty level is required'),
  questionCount: yup
    .number()
    .min(5, 'Minimum 5 questions required')
    .max(50, 'Maximum 50 questions allowed')
    .required('Question count is required'),
  timeLimit: yup.number().min(0, 'Time limit cannot be negative').optional(),
  instructions: yup.string().max(500, 'Instructions must be less than 500 characters').optional(),
});

export const profileUpdateSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  preferences: yup.object({
    theme: yup.string().oneOf(['light', 'dark', 'system']).required(),
    language: yup.string().oneOf(['english', 'bengali', 'hindi']).required(),
    notifications: yup.boolean().required(),
    autoSave: yup.boolean().required(),
    defaultQuestionCount: yup.number().min(5).max(50).required(),
    defaultDifficulty: yup.string().oneOf(['easy', 'medium', 'hard']).required(),
  }).required(),
});

// Utility functions for validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
if (!/[!@#$%^&*()_+\-=\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push('Password should contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateOTP(otp: string): boolean {
  return /^\d{6}$/.test(otp);
}

export function validateQuizConfig(config: Partial<QuizConfig>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  try {
    quizConfigSchema.validateSync(config, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach(err => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

export function sanitizeQuizConfig(config: QuizConfig): QuizConfig {
  return {
    ...config,
    subject: sanitizeInput(config.subject),
    topic: sanitizeInput(config.topic),
    instructions: config.instructions ? sanitizeInput(config.instructions) : undefined,
  };
}

// Form error helpers
export function getFieldError(
  errors: Record<string, any>,
  fieldName: string
): string | undefined {
  return errors[fieldName]?.message;
}

export function hasFieldError(
  errors: Record<string, any>,
  fieldName: string
): boolean {
  return Boolean(errors[fieldName]);
}

export function formatValidationError(error: yup.ValidationError): Record<string, string> {
  const errors: Record<string, string> = {};
  
  error.inner.forEach(err => {
    if (err.path) {
      errors[err.path] = err.message;
    }
  });
  
  return errors;
}