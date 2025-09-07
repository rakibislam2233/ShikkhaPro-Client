import type { QuizConfig } from '../types/quiz.types';
import { z } from 'zod';

// Validation schemas for forms
export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the terms and conditions'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});

export const otpSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
  otp: z
    .string()
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits'),
});

export const quizConfigSchema = z.object({
  academicLevel: z
    .enum([
      'class-1', 'class-2', 'class-3', 'class-4', 'class-5',
      'class-6', 'class-7', 'class-8', 'class-9', 'class-10',
      'jsc', 'ssc', 'hsc', 'bsc', 'msc'
    ], { 
      message: 'Academic level is required'
    }),
  subject: z
    .string()
    .min(2, 'Subject must be at least 2 characters')
    .max(50, 'Subject must be less than 50 characters'),
  topic: z
    .string()
    .min(2, 'Topic must be at least 2 characters')
    .max(100, 'Topic must be less than 100 characters'),
  language: z
    .enum(['english', 'bengali', 'hindi'], { 
      message: 'Language is required'
    }),
  questionType: z
    .enum(['mcq', 'short-answer', 'true-false', 'multiple-select', 'mixed'], { 
      message: 'Question type is required'
    }),
  difficulty: z
    .enum(['easy', 'medium', 'hard'], { 
      message: 'Difficulty level is required'
    }),
  questionCount: z
    .number()
    .min(5, 'Minimum 5 questions required')
    .max(50, 'Maximum 50 questions allowed'),
  timeLimit: z.number().min(0, 'Time limit cannot be negative').optional(),
  instructions: z.string().max(500, 'Instructions must be less than 500 characters').optional(),
});

export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    language: z.enum(['english', 'bengali', 'hindi']),
    notifications: z.boolean(),
    autoSave: z.boolean(),
    defaultQuestionCount: z.number().min(5).max(50),
    defaultDifficulty: z.enum(['easy', 'medium', 'hard']),
  }),
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
    quizConfigSchema.parse(config);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach(issue => {
        const path = issue.path.join('.');
        errors[path] = issue.message;
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

export function formatValidationError(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  
  error.issues.forEach(issue => {
    const path = issue.path.join('.');
    errors[path] = issue.message;
  });
  
  return errors;
}

// Type exports for forms
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type QuizConfigFormData = z.infer<typeof quizConfigSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;