import React from "react";
import SEO from "../components/seo/SEO";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
  Award,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { useGetQuizResultQuery } from "@/redux/features/quiz/quizApi";
import AuthGuard from "@/components/auth/AuthGuard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type {
  QuizResultResponse,
  QuizDetailedResult,
  QuizResultQuestion,
} from "@/types/quizResult.types";
import type { AcademicLevel, QuestionType } from "@/types/quiz.types";

const QuizResultPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();

  const {
    data: resultData,
    isLoading,
    error,
  } = useGetQuizResultQuery(attemptId, {
    skip: !attemptId,
  });

  const result = resultData?.data as QuizResultResponse;

  // Format time from seconds to readable format
  const formatTime = (seconds: number): string => {
    if (!seconds || seconds === 0) return "0s";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  const getGradeColor = (percentage: number) => {
    // Bangladesh Grade System Colors
    if (percentage >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200"; // A+ (Golden)
    if (percentage >= 70) return "text-green-600 bg-green-50 border-green-200";       // A
    if (percentage >= 60) return "text-blue-600 bg-blue-50 border-blue-200";         // A-
    if (percentage >= 50) return "text-yellow-600 bg-yellow-50 border-yellow-200";   // B
    if (percentage >= 40) return "text-orange-600 bg-orange-50 border-orange-200";   // C
    if (percentage >= 33) return "text-purple-600 bg-purple-50 border-purple-200";   // D (Pass)
    return "text-red-600 bg-red-50 border-red-200"; // F (Fail)
  };

  const getGrade = (percentage: number) => {
    // Bangladesh Grade System
    if (percentage >= 80) return "A+"; // 80-100 (Golden A+)
    if (percentage >= 70) return "A";  // 70-79
    if (percentage >= 60) return "A-"; // 60-69
    if (percentage >= 50) return "B";  // 50-59
    if (percentage >= 40) return "C";  // 40-49
    if (percentage >= 33) return "D";  // 33-39 (Pass)
    return "F"; // 0-32 (Fail)
  };

  const getGPA = (percentage: number) => {
    // Bangladesh GPA System (4.00 Scale)
    if (percentage >= 80) return "5.00"; // A+ (Golden A+)
    if (percentage >= 70) return "4.00"; // A
    if (percentage >= 60) return "3.50"; // A-
    if (percentage >= 50) return "3.00"; // B
    if (percentage >= 40) return "2.00"; // C
    if (percentage >= 33) return "1.00"; // D (Pass)
    return "0.00"; // F (Fail)
  };

  const getGradeDescription = (percentage: number) => {
    if (percentage >= 80) return "Outstanding Performance";
    if (percentage >= 70) return "Excellent Performance";
    if (percentage >= 60) return "Very Good Performance";
    if (percentage >= 50) return "Good Performance";
    if (percentage >= 40) return "Satisfactory Performance";
    if (percentage >= 33) return "Acceptable Performance";
    return "Needs Improvement";
  };

  // Academic Level specific configurations
  const getAcademicLevelConfig = (level: AcademicLevel) => {
    const configs = {
      // Pre-Primary & Primary (Ages 3-10)
      'playgroup': { icon: '🎈', title: 'Playgroup Assessment', passPercentage: 60 },
      'nursery': { icon: '🌱', title: 'Nursery Learning Check', passPercentage: 60 },
      'kg': { icon: '🎯', title: 'Kindergarten Quiz', passPercentage: 65 },
      'class-1': { icon: '📚', title: 'Class 1 Exam', passPercentage: 65 },
      'class-2': { icon: '✏️', title: 'Class 2 Test', passPercentage: 65 },
      'class-3': { icon: '📖', title: 'Class 3 Assessment', passPercentage: 65 },
      'class-4': { icon: '🔤', title: 'Class 4 Examination', passPercentage: 65 },
      'class-5': { icon: '📝', title: 'Primary School Certificate Prep', passPercentage: 65 },

      // Secondary (Ages 11-16)
      'class-6': { icon: '📐', title: 'Class 6 Test', passPercentage: 33 },
      'class-7': { icon: '🧮', title: 'Class 7 Examination', passPercentage: 33 },
      'jsc': { icon: '🏆', title: 'JSC Preparation', passPercentage: 33 },
      'ssc': { icon: '🏅', title: 'SSC Preparation', passPercentage: 33 },

      // Higher Secondary (Ages 17-18)
      'class-11': { icon: '📈', title: 'HSC 1st Year', passPercentage: 33 },
      'class-12': { icon: '🎯', title: 'HSC 2nd Year', passPercentage: 33 },
      'hsc': { icon: '🏆', title: 'HSC Final Preparation', passPercentage: 33 },

      // Undergraduate (Ages 18-22)
      'bachelor': { icon: '🎓', title: 'Bachelor Degree Assessment', passPercentage: 40 },
      'bsc': { icon: '🔬', title: 'BSc Examination', passPercentage: 40 },
      'ba': { icon: '📚', title: 'BA Assessment', passPercentage: 40 },
      'bcom': { icon: '💼', title: 'BCom Test', passPercentage: 40 },
      'bba': { icon: '📊', title: 'BBA Evaluation', passPercentage: 40 },
      'btech': { icon: '⚙️', title: 'BTech Assessment', passPercentage: 40 },
      'beng': { icon: '🔧', title: 'BEng Examination', passPercentage: 40 },

      // Postgraduate (Ages 22+)
      'master': { icon: '🎯', title: 'Masters Assessment', passPercentage: 50 },
      'msc': { icon: '🧪', title: 'MSc Evaluation', passPercentage: 50 },
      'ma': { icon: '📖', title: 'MA Examination', passPercentage: 50 },
      'mcom': { icon: '💰', title: 'MCom Test', passPercentage: 50 },
      'mba': { icon: '💼', title: 'MBA Assessment', passPercentage: 50 },
      'mtech': { icon: '🔬', title: 'MTech Evaluation', passPercentage: 50 },
      'meng': { icon: '⚡', title: 'MEng Examination', passPercentage: 50 },

      // Professional & Competitive
      'bcs': { icon: '🏛️', title: 'BCS Preparation', passPercentage: 60 },
      'bank-job': { icon: '🏦', title: 'Bank Job Preparation', passPercentage: 60 },
      'medical': { icon: '⚕️', title: 'Medical Entrance', passPercentage: 70 },
      'engineering': { icon: '⚙️', title: 'Engineering Entrance', passPercentage: 70 },
      'university': { icon: '🎓', title: 'University Admission', passPercentage: 65 },
      'ielts': { icon: '🌍', title: 'IELTS Preparation', passPercentage: 60 },
      'toefl': { icon: '🇺🇸', title: 'TOEFL Practice', passPercentage: 60 },
      'gre': { icon: '🎯', title: 'GRE Preparation', passPercentage: 65 },
      'sat': { icon: '📊', title: 'SAT Practice', passPercentage: 70 },

      // Professional Development
      'professional': { icon: '💼', title: 'Professional Assessment', passPercentage: 60 },
      'skill-development': { icon: '🛠️', title: 'Skill Assessment', passPercentage: 70 },
      'certification': { icon: '📜', title: 'Certification Test', passPercentage: 75 },
      'adult-learning': { icon: '👨‍🎓', title: 'Adult Learning Assessment', passPercentage: 60 },
      'general': { icon: '📚', title: 'General Knowledge Test', passPercentage: 50 },
    };

    return configs[level] || { icon: '📚', title: 'Assessment', passPercentage: 50 };
  };

  // Question Type specific configurations
  const getQuestionTypeConfig = (type: QuestionType) => {
    const configs = {
      'mcq': {
        displayName: 'Multiple Choice Questions',
        description: 'Select the best answer from given options',
        icon: '🔘'
      },
      'short-answer': {
        displayName: 'Short Answer Questions',
        description: 'Provide brief written responses',
        icon: '✍️'
      },
      'true-false': {
        displayName: 'True/False Questions',
        description: 'Determine if statements are true or false',
        icon: '✅'
      },
      'multiple-select': {
        displayName: 'Multiple Selection Questions',
        description: 'Choose all correct answers',
        icon: '☑️'
      },
      'mixed': {
        displayName: 'Mixed Question Types',
        description: 'Variety of question formats',
        icon: '🎯'
      },
    };

    return configs[type] || { displayName: 'Questions', description: 'Assessment questions', icon: '❓' };
  };

  // Get custom messages based on academic level
  const getCustomMessage = (level: AcademicLevel, percentage: number) => {
    const config = getAcademicLevelConfig(level);
    const passed = percentage >= config.passPercentage;

    // Primary/Pre-primary encouragement
    if (['playgroup', 'nursery', 'kg', 'class-1', 'class-2', 'class-3', 'class-4', 'class-5'].includes(level)) {
      if (passed) {
        return percentage >= 80 ? "Amazing work! You're a superstar! 🌟" : "Great job! Keep learning and exploring! 🎉";
      } else {
        return "That's okay! Every mistake helps you learn better! 💪";
      }
    }

    // Secondary encouragement
    if (['class-6', 'class-7', 'class-8', 'jsc', 'class-9', 'class-10', 'ssc'].includes(level)) {
      if (passed) {
        return percentage >= 80 ? "Outstanding performance! You're ready for the next level!" : "Well done! Your hard work is paying off!";
      } else {
        return "Don't worry! Focus on your weak areas and practice more.";
      }
    }

    // Higher Secondary
    if (['class-11', 'class-12', 'hsc'].includes(level)) {
      if (passed) {
        return percentage >= 80 ? "Excellent! You're well-prepared for higher education!" : "Good work! Continue practicing for better results.";
      } else {
        return "Keep studying! HSC requires consistent effort and practice.";
      }
    }

    // Competitive/Professional
    if (['bcs', 'bank-job', 'medical', 'engineering', 'university'].includes(level)) {
      if (passed) {
        return "Great preparation! You're on the right track for success!";
      } else {
        return "Competitive exams need more practice. Focus on your preparation strategy.";
      }
    }

    // Default messages
    if (passed) {
      return percentage >= 80 ? "Excellent work! You've mastered this topic!" : "Good job! You're making great progress!";
    } else {
      return "Keep practicing! Review the explanations and try again.";
    }
  };

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-muted-foreground">Loading results...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (error || !result) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Results Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Unable to load quiz results. Please try again.
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </Card>
        </div>
      </AuthGuard>
    );
  }

  const {
    quiz = null,
    attempt = null,
    performance = null,
    detailedResults = [],
    recommendations = [],
  } = result || {};

  // Find the question details from quiz data to get all options
  const getQuestionWithOptions = (
    questionId: string
  ): QuizResultQuestion | undefined => {
    return quiz?.questions?.find(
      (q: QuizResultQuestion) => q.id === questionId
    );
  };

  const percentage = performance?.percentage || 0;
  const grade = getGrade(percentage);
  const gpa = getGPA(percentage);
  const gradeDescription = getGradeDescription(percentage);
  const gradeColorClass = getGradeColor(percentage);

  // Get configurations based on quiz data
  const academicLevel = quiz?.academicLevel as AcademicLevel || 'general';
  const questionType = quiz?.questions?.[0]?.type as QuestionType || 'mcq';
  const academicConfig = getAcademicLevelConfig(academicLevel);
  const questionConfig = getQuestionTypeConfig(questionType);
  const customMessage = getCustomMessage(academicLevel, percentage);
  return (
    <AuthGuard>
      <>
        <SEO
          title="Quiz Results"
          description="View your quiz results, performance analysis, and personalized recommendations for improvement."
          keywords="quiz results, quiz score, performance analysis, quiz feedback"
          noIndex={true}
        />
        <div className="min-h-screen bg-background">
          <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 mb-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              >
                <div className="flex justify-center mb-4">
                  {percentage >= 70 ? (
                    <Trophy className="h-16 w-16 text-yellow-500" />
                  ) : percentage >= 50 ? (
                    <Award className="h-16 w-16 text-blue-500" />
                  ) : (
                    <Target className="h-16 w-16 text-green-500" />
                  )}
                </div>
              </motion.div>

              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="text-4xl">{academicConfig.icon}</span>
                <h1 className="text-3xl font-bold">
                  {academicConfig.title}
                </h1>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-muted-foreground mb-2">
                  {quiz?.title || "Quiz Complete"}
                </h2>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>{quiz?.subject}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>{academicLevel?.replace('-', ' ').toUpperCase()}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>{quiz?.difficulty} level</span>
                  </span>
                </div>

                {/* Question Type Badge */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-lg">{questionConfig.icon}</span>
                  <Badge variant="outline" className="px-3 py-1">
                    {questionConfig.displayName}
                  </Badge>
                </div>

                {/* Custom Message */}
                <p className="text-lg font-medium text-primary mb-2">
                  {customMessage}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div
                  className={`px-8 py-4 rounded-xl border-2 ${gradeColorClass} shadow-lg`}
                >
                  <div className="text-center">
                    <span className="text-4xl font-bold">{grade}</span>
                    <p className="text-xs font-medium mt-1">Grade</p>
                    <p className="text-sm font-semibold mt-1">GPA: {gpa}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {percentage.toFixed(1)}%
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {attempt?.correctAnswers || 0} out of{" "}
                    {attempt?.totalQuestions || 0} correct
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your Final Score
                  </p>

                  {/* Pass/Fail Status based on academic level */}
                  <div className="mt-3 space-y-2">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      percentage >= academicConfig.passPercentage
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {percentage >= academicConfig.passPercentage ? '✅ PASSED' : '❌ NOT PASSED'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Pass requirement: {academicConfig.passPercentage}% for {academicLevel.replace('-', ' ')}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-primary mt-2">
                    {gradeDescription}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Performance Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {attempt?.correctAnswers || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Correct Answers
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-3">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {(attempt?.totalQuestions || 0) -
                        (attempt?.correctAnswers || 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Wrong Answers
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {formatTime(performance?.timeSpent || 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Time Taken</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {attempt?.correctAnswers || 0}/
                      {attempt?.totalQuestions || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Questions Correct
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Card className="p-6 mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Performance Overview</h3>
                <span className="text-sm text-muted-foreground">
                  {attempt?.correctAnswers || 0} /{" "}
                  {attempt?.totalQuestions || 0}
                </span>
              </div>
              <Progress value={percentage} className="h-3" />
            </Card>
          </motion.div>

          {/* Detailed Results */}
          {detailedResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Card className="p-6 mb-8">
                <h3 className="text-xl font-bold mb-6">
                  Question-by-Question Review
                </h3>
                <div className="space-y-8">
                  {detailedResults.map(
                    (result: QuizDetailedResult, index: number) => {
                      const questionData = getQuestionWithOptions(
                        result.questionId
                      );
                      const options = questionData?.options || [];

                      return (
                        <div
                          key={result.questionId || index}
                          className="border rounded-xl p-6 bg-gradient-to-r from-background to-muted/20"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                  result.isCorrect
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              >
                                {index + 1}
                              </div>
                              {result.isCorrect ? (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                              ) : (
                                <XCircle className="h-6 w-6 text-red-500" />
                              )}
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  result.isCorrect
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {result.isCorrect ? "Correct" : "Incorrect"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  result.isCorrect ? "default" : "destructive"
                                }
                                className="text-sm"
                              >
                                {result.points || 0}{" "}
                                {(result.points || 0) === 1
                                  ? "point"
                                  : "points"}
                              </Badge>
                            </div>
                          </div>

                          <h4 className="text-lg font-semibold mb-4 text-foreground leading-relaxed">
                            {result.question || "Question"}
                          </h4>

                          {/* Options Display */}
                          <div className="space-y-3 mb-4">
                            {Array.isArray(options) &&
                              options.map(
                                (option: string, optionIndex: number) => {
                                  // Handle both single and multiple answers
                                  const userAnswers = Array.isArray(result.userAnswer)
                                    ? result.userAnswer
                                    : [result.userAnswer];
                                  const correctAnswers = Array.isArray(result.correctAnswer)
                                    ? result.correctAnswer
                                    : [result.correctAnswer];

                                  const isUserAnswer = userAnswers.includes(option);
                                  const isCorrectAnswer = correctAnswers.includes(option);

                                  // Determine the option state for multiple select questions
                                  let optionState = 'default';
                                  if (isCorrectAnswer && isUserAnswer) {
                                    optionState = 'correct'; // User selected correctly
                                  } else if (isCorrectAnswer && !isUserAnswer) {
                                    optionState = 'missed'; // Should have selected but didn't
                                  } else if (!isCorrectAnswer && isUserAnswer) {
                                    optionState = 'wrong'; // Selected incorrectly
                                  }

                                  let optionClass =
                                    "p-4 rounded-lg border transition-all duration-200 ";
                                  let iconElement: React.ReactElement | null = null;

                                  switch (optionState) {
                                    case 'correct':
                                      optionClass += "bg-green-50 border-green-200 text-green-800 shadow-sm";
                                      iconElement = <CheckCircle className="h-5 w-5 text-green-600" />;
                                      break;
                                    case 'missed':
                                      optionClass += "bg-orange-50 border-orange-200 text-orange-800 shadow-sm";
                                      iconElement = <CheckCircle className="h-5 w-5 text-orange-600" />;
                                      break;
                                    case 'wrong':
                                      optionClass += "bg-red-50 border-red-200 text-red-800 shadow-sm";
                                      iconElement = <XCircle className="h-5 w-5 text-red-600" />;
                                      break;
                                    default:
                                      optionClass += "bg-gray-50 border-gray-200 text-gray-700";
                                      break;
                                  }

                                  return (
                                    <div
                                      key={`${result.questionId}-${optionIndex}`}
                                      className={optionClass}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3 flex-1">
                                          <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                                              optionState === 'correct'
                                                ? "bg-green-100 text-green-700"
                                                : optionState === 'missed'
                                                ? "bg-orange-100 text-orange-700"
                                                : optionState === 'wrong'
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                          >
                                            {String.fromCharCode(65 + optionIndex)}
                                          </div>
                                          <span className="font-medium flex-1">
                                            {option}
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          {/* Show multiple selection indicators */}
                                          <div className="flex items-center space-x-1">
                                            {isUserAnswer && (
                                              <span className={`text-xs px-2 py-1 rounded font-medium ${
                                                optionState === 'correct'
                                                  ? 'bg-green-100 text-green-700'
                                                  : 'bg-blue-100 text-blue-700'
                                              }`}>
                                                {optionState === 'correct' ? 'Your Correct Answer' : 'Your Answer'}
                                              </span>
                                            )}
                                            {isCorrectAnswer && !isUserAnswer && (
                                              <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700 font-medium">
                                                Correct Answer
                                              </span>
                                            )}
                                          </div>
                                          {iconElement}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                          </div>

                          {/* Multiple Selection Summary */}
                          {Array.isArray(result.userAnswer) || Array.isArray(result.correctAnswer) ? (
                            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg mb-4">
                              <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
                                <div className="w-5 h-5 bg-slate-500 rounded-full flex items-center justify-center mr-2">
                                  <span className="text-white text-xs font-bold">☑</span>
                                </div>
                                Multiple Selection Summary
                              </h5>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* User's Selections */}
                                <div>
                                  <h6 className="text-sm font-medium text-slate-700 mb-2">Your Selections:</h6>
                                  <div className="space-y-1">
                                    {Array.isArray(result.userAnswer) && result.userAnswer.length > 0 ? (
                                      result.userAnswer.map((answer: string, idx: number) => (
                                        <div key={idx} className="flex items-center space-x-2 text-sm">
                                          <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 text-xs">✓</span>
                                          </div>
                                          <span className="text-slate-700">{answer}</span>
                                        </div>
                                      ))
                                    ) : !Array.isArray(result.userAnswer) && result.userAnswer ? (
                                      <div className="flex items-center space-x-2 text-sm">
                                        <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                          <span className="text-blue-600 text-xs">✓</span>
                                        </div>
                                        <span className="text-slate-700">{result.userAnswer}</span>
                                      </div>
                                    ) : (
                                      <span className="text-slate-500 text-sm italic">No selections made</span>
                                    )}
                                  </div>
                                </div>

                                {/* Correct Selections */}
                                <div>
                                  <h6 className="text-sm font-medium text-slate-700 mb-2">Correct Selections:</h6>
                                  <div className="space-y-1">
                                    {Array.isArray(result.correctAnswer) ? (
                                      result.correctAnswer.map((answer: string, idx: number) => (
                                        <div key={idx} className="flex items-center space-x-2 text-sm">
                                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 text-xs">✓</span>
                                          </div>
                                          <span className="text-slate-700">{answer}</span>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="flex items-center space-x-2 text-sm">
                                        <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                          <span className="text-green-600 text-xs">✓</span>
                                        </div>
                                        <span className="text-slate-700">{result.correctAnswer}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {/* Explanation */}
                          {result.explanation && (
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-blue-600 text-xs font-bold">
                                    i
                                  </span>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-blue-800 mb-1">
                                    Explanation
                                  </h5>
                                  <p className="text-blue-700 text-sm leading-relaxed">
                                    {result.explanation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Academic Level Specific Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Card className="p-6 mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">💡</span>
                <h3 className="text-xl font-bold">Personalized Recommendations</h3>
              </div>

              {/* Academic Level Specific Tips */}
              <div className="space-y-4">
                {['playgroup', 'nursery', 'kg', 'class-1', 'class-2', 'class-3', 'class-4', 'class-5'].includes(academicLevel) && (
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">For Young Learners:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Practice regularly with fun activities and games</li>
                      <li>• Ask questions when you don't understand something</li>
                      <li>• Read colorful books and educational stories</li>
                      <li>• Take breaks between study sessions</li>
                    </ul>
                  </div>
                )}

                {['class-6', 'class-7', 'class-8', 'jsc', 'class-9', 'class-10', 'ssc'].includes(academicLevel) && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">For Secondary Students:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Create a study schedule and stick to it</li>
                      <li>• Join study groups with classmates</li>
                      <li>• Practice previous year questions</li>
                      <li>• Focus on weak subjects more</li>
                      <li>• Take regular mock tests</li>
                    </ul>
                  </div>
                )}

                {['class-11', 'class-12', 'hsc'].includes(academicLevel) && (
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">For HSC Students:</h4>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Prepare for university admission tests</li>
                      <li>• Focus on conceptual understanding</li>
                      <li>• Practice advanced problem-solving</li>
                      <li>• Maintain consistent study habits</li>
                      <li>• Consider your career goals while studying</li>
                    </ul>
                  </div>
                )}

                {['bcs', 'bank-job', 'medical', 'engineering', 'university'].includes(academicLevel) && (
                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">For Competitive Exams:</h4>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• Analyze your performance after each practice test</li>
                      <li>• Focus on time management strategies</li>
                      <li>• Study current affairs and general knowledge</li>
                      <li>• Take full-length mock tests regularly</li>
                      <li>• Review and revise regularly</li>
                    </ul>
                  </div>
                )}

                {/* Question Type Specific Tips */}
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Tips for {questionConfig.displayName}:</h4>
                  <p className="text-gray-700 text-sm mb-2">{questionConfig.description}</p>

                  {questionType === 'mcq' && (
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Read all options before selecting</li>
                      <li>• Eliminate obviously wrong answers first</li>
                      <li>• Look for keywords in questions</li>
                    </ul>
                  )}

                  {questionType === 'true-false' && (
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Look for absolute words like "always" or "never"</li>
                      <li>• Check if the entire statement is true</li>
                      <li>• Be careful with partially true statements</li>
                    </ul>
                  )}

                  {questionType === 'short-answer' && (
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Be concise but complete in your answers</li>
                      <li>• Use key terms and concepts</li>
                      <li>• Structure your response clearly</li>
                    </ul>
                  )}

                  {questionType === 'multiple-select' && (
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Consider each option independently</li>
                      <li>• Don't assume there's a specific number of correct answers</li>
                      <li>• Review all options carefully</li>
                    </ul>
                  )}
                </div>

                {/* General Recommendations if provided */}
                {recommendations.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Additional Recommendations:</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      {recommendations.map((recommendation: string, index: number) => (
                        <li key={index}>• {recommendation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate(`/dashboard/quiz/${quiz?._id}`)}
                  variant="outline"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Retake Quiz</span>
                </Button>

                <Button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Home className="h-4 w-4" />
                  <span>Back to Dashboard</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      </>
    </AuthGuard>
  );
};

export default QuizResultPage;
