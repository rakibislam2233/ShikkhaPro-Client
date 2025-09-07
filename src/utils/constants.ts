import type { AcademicLevel, Difficulty, Language, QuestionType } from "@/types/quiz.types";

export const ACADEMIC_LEVELS: { value: AcademicLevel; label: string; description: string }[] = [
  { value: 'class-1', label: 'Class 1', description: 'Elementary Level - Age 6-7' },
  { value: 'class-2', label: 'Class 2', description: 'Elementary Level - Age 7-8' },
  { value: 'class-3', label: 'Class 3', description: 'Elementary Level - Age 8-9' },
  { value: 'class-4', label: 'Class 4', description: 'Elementary Level - Age 9-10' },
  { value: 'class-5', label: 'Class 5', description: 'Primary Level - Age 10-11' },
  { value: 'class-6', label: 'Class 6', description: 'Middle School - Age 11-12' },
  { value: 'class-7', label: 'Class 7', description: 'Middle School - Age 12-13' },
  { value: 'jsc', label: 'JSC', description: 'Junior School Certificate' },
  { value: 'ssc', label: 'SSC', description: 'Secondary School Certificate' },
  { value: 'hsc', label: 'HSC', description: 'Higher Secondary Certificate' },
  { value: 'bsc', label: 'BSC', description: 'Bachelor of Science' },
  { value: 'msc', label: 'MSC', description: 'Master of Science' },
];

export const QUESTION_TYPES: { value: QuestionType; label: string; description: string; icon: string }[] = [
  {
    value: 'mcq',
    label: 'Multiple Choice',
    description: '4 options with one correct answer',
    icon: '🔘',
  },
  // {
  //   value: 'short-answer',
  //   label: 'Short Answer',
  //   description: 'Brief written responses',
  //   icon: '✏️',
  // },
  // {
  //   value: 'true-false',
  //   label: 'True/False',
  //   description: 'Binary choice questions',
  //   icon: '✓',
  // },
  // {
  //   value: 'mixed',
  //   label: 'Mixed Types',
  //   description: 'Combination of all question types',
  //   icon: '🎯',
  // },
];

export const DIFFICULTY_LEVELS: { value: Difficulty; label: string; description: string; color: string }[] = [
  {
    value: 'easy',
    label: 'Easy',
    description: 'Basic concepts and simple problems',
    color: 'text-green-600',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Moderate complexity and reasoning',
    color: 'text-yellow-600',
  },
  {
    value: 'hard',
    label: 'Hard',
    description: 'Advanced concepts and complex problems',
    color: 'text-red-600',
  },
];

export const LANGUAGES: { value: Language; label: string; flag: string; nativeName: string }[] = [
  {
    value: 'english',
    label: 'English',
    flag: '🇬🇧',
    nativeName: 'English',
  },
  {
    value: 'bengali',
    label: 'Bengali',
    flag: '🇧🇩',
    nativeName: 'বাংলা',
  },
  {
    value: 'hindi',
    label: 'Hindi',
    flag: '🇮🇳',
    nativeName: 'हिंदी',
  },
];

export const POPULAR_SUBJECTS = [
  // Mathematics
  'Mathematics', 'Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry',
  
  // Sciences
  'Physics', 'Chemistry', 'Biology', 'Environmental Science', 'Computer Science',
  
  // Languages
  'English Literature', 'Bengali Literature', 'Hindi Literature', 'Grammar',
  
  // Social Studies
  'History', 'Geography', 'Political Science', 'Economics', 'Sociology',
  
  // Computer Science
  'Programming', 'Data Structures', 'Algorithms', 'Database', 'Web Development',
  'C++', 'Java', 'Python', 'JavaScript', 'HTML/CSS',
  
  // Business
  'Accounting', 'Finance', 'Marketing', 'Management', 'Business Studies',
];

export const SUBJECT_SUGGESTIONS = {
  'class-1': ['Mathematics', 'English', 'Bengali', 'General Knowledge'],
  'class-2': ['Mathematics', 'English', 'Bengali', 'General Knowledge', 'Science'],
  'class-3': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies'],
  'class-4': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies'],
  'class-5': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies'],
  'class-6': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies', 'Religion'],
  'class-7': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies', 'Religion'],
  'class-8': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies', 'Religion'],
  'class-9': ['Mathematics', 'English', 'Bengali', 'Physics', 'Chemistry', 'Biology', 'Social Studies'],
  'class-10': ['Mathematics', 'English', 'Bengali', 'Physics', 'Chemistry', 'Biology', 'Social Studies'],
  'jsc': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies', 'Religion'],
  'ssc': ['Mathematics', 'English', 'Bengali', 'Physics', 'Chemistry', 'Biology', 'Accounting', 'Economics'],
  'hsc': ['Mathematics', 'English', 'Bengali', 'Physics', 'Chemistry', 'Biology', 'Accounting', 'Economics', 'ICT'],
  'bsc': ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Statistics', 'Engineering'],
  'msc': ['Advanced Mathematics', 'Research Methodology', 'Specialized Topics', 'Thesis Work'],
};

export const GRADE_THRESHOLDS = [
  { grade: 'A+', min: 80, max: 100, color: 'text-green-600' },
  { grade: 'A', min: 70, max: 79, color: 'text-green-500' },
  { grade: 'A-', min: 60, max: 69, color: 'text-lime-600' },
  { grade: 'B+', min: 50, max: 59, color: 'text-yellow-600' },
  { grade: 'B', min: 40, max: 49, color: 'text-orange-600' },
  { grade: 'C+', min: 33, max: 39, color: 'text-red-500' },
  { grade: 'C', min: 25, max: 32, color: 'text-red-600' },
  { grade: 'D', min: 0, max: 24, color: 'text-red-700' },
];

export const DEFAULT_QUIZ_CONFIG = {
  questionCount: 10,
  difficulty: 'medium' as Difficulty,
  questionType: 'mcq' as QuestionType,
  language: 'english' as Language,
  timeLimit: 30, // minutes
};

export const QUESTION_COUNT_OPTIONS = [5, 10, 15];

export const TIME_LIMIT_OPTIONS = [
  { value: 0, label: 'No Time Limit' },
  { value: 10, label: '10 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 20, label: '20 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
];

export const ANIMATION_VARIANTS = {
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
};

export const LOCAL_STORAGE_KEYS = {
  USER: 'quiz-app-user',
  TOKEN: 'quiz-app-token',
  THEME: 'quiz-app-theme',
  QUIZZES: 'quiz-app-quizzes',
  ATTEMPTS: 'quiz-app-attempts',
  PREFERENCES: 'quiz-app-preferences',
  DRAFT_QUIZ: 'quiz-app-draft-quiz',
} as const;