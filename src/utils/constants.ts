import type { AcademicLevel, Difficulty, Language, QuestionType } from "@/types/quiz.types";

export const ACADEMIC_LEVELS: { value: AcademicLevel; label: string; description: string }[] = [
  // Pre-Primary & Primary Education (Ages 3-10)
  { value: 'playgroup', label: 'Playgroup', description: 'Early Learning - Age 3-4' },
  { value: 'nursery', label: 'Nursery', description: 'Pre-School - Age 4-5' },
  { value: 'kg', label: 'Kindergarten', description: 'Kindergarten - Age 5-6' },
  { value: 'class-1', label: 'Class 1', description: 'Elementary Level - Age 6-7' },
  { value: 'class-2', label: 'Class 2', description: 'Elementary Level - Age 7-8' },
  { value: 'class-3', label: 'Class 3', description: 'Elementary Level - Age 8-9' },
  { value: 'class-4', label: 'Class 4', description: 'Elementary Level - Age 9-10' },
  { value: 'class-5', label: 'Class 5', description: 'Primary Level - Age 10-11' },

  // Secondary Education (Ages 11-16)
  { value: 'class-6', label: 'Class 6', description: 'Middle School - Age 11-12' },
  { value: 'class-7', label: 'Class 7', description: 'Middle School - Age 12-13' },
  { value: 'class-8', label: 'Class 8', description: 'Middle School - Age 13-14' },
  { value: 'jsc', label: 'JSC/JDC', description: 'Junior School Certificate' },
  { value: 'class-9', label: 'Class 9', description: 'Secondary - Age 14-15' },
  { value: 'class-10', label: 'Class 10', description: 'Secondary - Age 15-16' },
  { value: 'ssc', label: 'SSC', description: 'Secondary School Certificate' },

  // Higher Secondary Education (Ages 17-18)
  { value: 'class-11', label: 'Class 11', description: 'Higher Secondary - Age 16-17' },
  { value: 'class-12', label: 'Class 12', description: 'Higher Secondary - Age 17-18' },
  { value: 'hsc', label: 'HSC', description: 'Higher Secondary Certificate' },

  // Undergraduate Education (Ages 18-22)
  { value: 'bachelor', label: 'Bachelor Degree', description: 'General Bachelor\'s Degree' },
  { value: 'bsc', label: 'BSc', description: 'Bachelor of Science' },
  { value: 'ba', label: 'BA', description: 'Bachelor of Arts' },
  { value: 'bcom', label: 'BCom', description: 'Bachelor of Commerce' },
  { value: 'bba', label: 'BBA', description: 'Bachelor of Business Administration' },
  { value: 'btech', label: 'BTech', description: 'Bachelor of Technology' },
  { value: 'beng', label: 'BEng', description: 'Bachelor of Engineering' },

  // Postgraduate Education (Ages 22+)
  { value: 'master', label: 'Master Degree', description: 'General Master\'s Degree' },
  { value: 'msc', label: 'MSc', description: 'Master of Science' },
  { value: 'ma', label: 'MA', description: 'Master of Arts' },
  { value: 'mcom', label: 'MCom', description: 'Master of Commerce' },
  { value: 'mba', label: 'MBA', description: 'Master of Business Administration' },
  { value: 'mtech', label: 'MTech', description: 'Master of Technology' },
  { value: 'meng', label: 'MEng', description: 'Master of Engineering' },

  // Professional & Competitive Exams
  { value: 'bcs', label: 'BCS', description: 'Bangladesh Civil Service' },
  { value: 'bank-job', label: 'Bank Job', description: 'Bank Job Preparation' },
  { value: 'medical', label: 'Medical Entrance', description: 'Medical College Admission' },
  { value: 'engineering', label: 'Engineering Entrance', description: 'Engineering University Admission' },
  { value: 'university', label: 'University Admission', description: 'General University Admission' },
  { value: 'ielts', label: 'IELTS', description: 'International English Language Testing' },
  { value: 'toefl', label: 'TOEFL', description: 'Test of English as Foreign Language' },
  { value: 'gre', label: 'GRE', description: 'Graduate Record Examination' },
  { value: 'sat', label: 'SAT', description: 'Scholastic Assessment Test' },

  // Professional Development
  { value: 'professional', label: 'Professional', description: 'Professional Development' },
  { value: 'skill-development', label: 'Skill Development', description: 'Technical & Soft Skills' },
  { value: 'certification', label: 'Certification', description: 'Professional Certifications' },
  { value: 'adult-learning', label: 'Adult Learning', description: 'Adult Learning Programs' },
  { value: 'general', label: 'General Knowledge', description: 'Mixed Level Knowledge' },
];

export const QUESTION_TYPES: { value: QuestionType; label: string; description: string; icon: string }[] = [
  {
    value: 'mcq',
    label: 'Multiple Choice',
    description: '4 options with one correct answer',
    icon: '🔘',
  },
  {
    value: 'short-answer',
    label: 'Short Answer',
    description: 'Brief written responses',
    icon: '✍️',
  },
  {
    value: 'true-false',
    label: 'True/False',
    description: 'Binary choice questions',
    icon: '✅',
  },
  {
    value: 'multiple-select',
    label: 'Multiple Select',
    description: 'Choose all correct answers',
    icon: '☑️',
  },
  {
    value: 'mixed',
    label: 'Mixed Types',
    description: 'Combination of all question types',
    icon: '🎯',
  },
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

export const SUBJECT_SUGGESTIONS: Record<AcademicLevel, string[]> = {
  // Pre-Primary & Primary Education
  'playgroup': ['Colors', 'Shapes', 'Numbers', 'Letters', 'Animals'],
  'nursery': ['Basic Math', 'English Letters', 'Bengali Letters', 'Drawing', 'Stories'],
  'kg': ['Numbers 1-20', 'Alphabet', 'Bengali Alphabet', 'Colors', 'Shapes'],
  'class-1': ['Mathematics', 'English', 'Bengali', 'General Knowledge'],
  'class-2': ['Mathematics', 'English', 'Bengali', 'General Knowledge', 'Science'],
  'class-3': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies'],
  'class-4': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies'],
  'class-5': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies'],

  // Secondary Education
  'class-6': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies', 'Religion'],
  'class-7': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies', 'Religion'],
  'class-8': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies', 'Religion'],
  'jsc': ['Mathematics', 'English', 'Bengali', 'Science', 'Social Studies', 'Religion'],
  'class-9': ['Mathematics', 'English', 'Bengali', 'Physics', 'Chemistry', 'Biology', 'Social Studies'],
  'class-10': ['Mathematics', 'English', 'Bengali', 'Physics', 'Chemistry', 'Biology', 'Social Studies'],
  'ssc': ['Mathematics', 'English', 'Bengali', 'Physics', 'Chemistry', 'Biology', 'Accounting', 'Economics'],

  // Higher Secondary Education
  'class-11': ['Mathematics', 'English', 'Bengali', 'Physics', 'Chemistry', 'Biology', 'Accounting', 'Economics', 'ICT'],
  'class-12': ['Mathematics', 'English', 'Bengali', 'Physics', 'Chemistry', 'Biology', 'Accounting', 'Economics', 'ICT'],
  'hsc': ['Mathematics', 'English', 'Bengali', 'Physics', 'Chemistry', 'Biology', 'Accounting', 'Economics', 'ICT'],

  // Undergraduate Education
  'bachelor': ['Core Subjects', 'Electives', 'General Studies', 'Research Methods'],
  'bsc': ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Statistics'],
  'ba': ['English Literature', 'History', 'Philosophy', 'Psychology', 'Sociology', 'Political Science'],
  'bcom': ['Accounting', 'Finance', 'Marketing', 'Management', 'Economics', 'Business Law'],
  'bba': ['Management', 'Marketing', 'Finance', 'Human Resources', 'Operations', 'Strategy'],
  'btech': ['Engineering Mathematics', 'Programming', 'Data Structures', 'Computer Networks', 'Database'],
  'beng': ['Engineering Mathematics', 'Mechanics', 'Thermodynamics', 'Materials Science', 'Design'],

  // Postgraduate Education
  'master': ['Advanced Topics', 'Research Methodology', 'Thesis Work', 'Specialized Studies'],
  'msc': ['Advanced Mathematics', 'Research Methods', 'Specialized Topics', 'Thesis Work'],
  'ma': ['Literature', 'Advanced Theory', 'Research Methodology', 'Critical Analysis'],
  'mcom': ['Advanced Accounting', 'Financial Management', 'Research Methods', 'Business Strategy'],
  'mba': ['Strategic Management', 'Leadership', 'Advanced Finance', 'Marketing Strategy', 'Operations'],
  'mtech': ['Advanced Programming', 'System Design', 'Research', 'Emerging Technologies'],
  'meng': ['Advanced Engineering', 'Project Management', 'Innovation', 'Research Methods'],

  // Professional & Competitive Exams
  'bcs': ['General Knowledge', 'Bangladesh Affairs', 'International Affairs', 'English', 'Bengali', 'Mathematics'],
  'bank-job': ['General Knowledge', 'Mathematics', 'English', 'Computer Knowledge', 'Banking', 'Economics'],
  'medical': ['Biology', 'Chemistry', 'Physics', 'General Knowledge', 'English'],
  'engineering': ['Mathematics', 'Physics', 'Chemistry', 'General Knowledge', 'English'],
  'university': ['Subject-specific', 'General Knowledge', 'English', 'Mathematics', 'Analytical Reasoning'],
  'ielts': ['Reading', 'Writing', 'Listening', 'Speaking', 'Grammar', 'Vocabulary'],
  'toefl': ['Reading', 'Writing', 'Listening', 'Speaking', 'Grammar', 'Academic English'],
  'gre': ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing', 'Vocabulary'],
  'sat': ['Math', 'Evidence-Based Reading', 'Writing', 'Essay'],

  // Professional Development
  'professional': ['Communication', 'Leadership', 'Project Management', 'Time Management', 'Problem Solving'],
  'skill-development': ['Technical Skills', 'Soft Skills', 'Communication', 'Leadership', 'Digital Literacy'],
  'certification': ['Industry-specific', 'Technical Certification', 'Professional Standards', 'Best Practices'],
  'adult-learning': ['Basic Literacy', 'Numeracy', 'Digital Skills', 'Life Skills', 'Vocational Training'],
  'general': ['General Knowledge', 'Current Affairs', 'Science', 'History', 'Geography', 'Literature'],
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