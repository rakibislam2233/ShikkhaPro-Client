import React from "react";
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
import { Card } from "@/components/ui/Card.tsx";
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

  console.log("result", result);
  console.log("QUIZ", quiz);
  return (
    <AuthGuard>
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
                    <Target className="h-16 w-16 text-gray-500" />
                  )}
                </div>
              </motion.div>

              <h1 className="text-3xl font-bold mb-2">
                {percentage >= 70
                  ? "Excellent Work!"
                  : percentage >= 50
                  ? "Good Effort!"
                  : "Keep Practicing!"}
              </h1>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-muted-foreground mb-2">
                  {quiz?.title || "Quiz Complete"}
                </h2>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>{quiz?.subject}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>{quiz?.academicLevel?.toUpperCase()}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>{quiz?.difficulty} level</span>
                  </span>
                </div>
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
                      {performance?.timeSpent || 0} m
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
                                  const isUserAnswer =
                                    result.userAnswer === option;
                                  const isCorrectAnswer =
                                    result.correctAnswer === option;

                                  let optionClass =
                                    "p-4 rounded-lg border transition-all duration-200 ";
                                  let iconElement: React.ReactElement | null =
                                    null;

                                  if (isCorrectAnswer) {
                                    optionClass +=
                                      "bg-green-50 border-green-200 text-green-800 shadow-sm";
                                    iconElement = (
                                      <CheckCircle className="h-5 w-5 text-green-600" />
                                    );
                                  } else if (isUserAnswer && !isCorrectAnswer) {
                                    optionClass +=
                                      "bg-red-50 border-red-200 text-red-800 shadow-sm";
                                    iconElement = (
                                      <XCircle className="h-5 w-5 text-red-600" />
                                    );
                                  } else {
                                    optionClass +=
                                      "bg-gray-50 border-gray-200 text-gray-700";
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
                                              isCorrectAnswer
                                                ? "bg-green-100 text-green-700"
                                                : isUserAnswer &&
                                                  !isCorrectAnswer
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                          >
                                            {String.fromCharCode(
                                              65 + optionIndex
                                            )}
                                          </div>
                                          <span className="font-medium flex-1">
                                            {option}
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          {isUserAnswer && (
                                            <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
                                              Your Answer
                                            </span>
                                          )}
                                          {iconElement}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                          </div>

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

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Card className="p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Recommendations</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {recommendations.map(
                    (recommendation: string, index: number) => (
                      <li key={index}>{recommendation}</li>
                    )
                  )}
                </ul>
              </Card>
            </motion.div>
          )}

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
    </AuthGuard>
  );
};

export default QuizResultPage;
