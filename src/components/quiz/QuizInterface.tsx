import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertCircle, Play, Timer, BookOpen, CheckCircle, X, Send, Award, Users, Target } from "lucide-react";
import { Button } from '../ui/Button';
import { Card } from "../ui/Card";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import NavigationControls from "./NavigationControls";
import type { IQuiz } from "@/types/quiz.types";
import {
  useGetQuizByIdQuery,
  useSubmitAnswerMutation,
  useStartQuizMutation,
} from "@/redux/features/quiz/quizApi";
import { toast } from "sonner";
import type { TError } from "@/types/erro";

interface QuizInterfaceProps {
  quizId: string;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ quizId }) => {
  const [currentQuiz, setCurrentQuiz] = useState<IQuiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: string | string[];
  }>({});
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownTime, setCountdownTime] = useState(3);

  const { data: responseData, isLoading: quizLoading } = useGetQuizByIdQuery(
    quizId,
    {
      refetchOnMountOrArgChange: true,
      skip: !quizId,
    }
  );

  const [submitAnswer] = useSubmitAnswerMutation();
  const [startQuiz, { isLoading: isStartingQuiz }] = useStartQuizMutation();

  // Load quiz when component mounts
  useEffect(() => {
    if (responseData?.data) {
      setCurrentQuiz(responseData?.data);
    }
  }, [responseData]);

  // Handle quiz start
  const handleStartQuiz = async () => {
    try {
      const result = await startQuiz(quizId).unwrap();
      setAttemptId(result?.data?.attemptId);

      // Show countdown before starting quiz
      setShowCountdown(true);
      setCountdownTime(3);

      toast.success("Quiz started successfully!");
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message || "Failed to start quiz");
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (showCountdown && countdownTime > 0) {
      const timer = setTimeout(() => {
        setCountdownTime(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showCountdown && countdownTime === 0) {
      setShowCountdown(false);
      setIsQuizStarted(true);

      // Set timer if there's a time limit
      if (currentQuiz?.estimatedTime && currentQuiz.estimatedTime > 0) {
        setTimeRemaining(currentQuiz.estimatedTime * 60);
      }
    }
  }, [showCountdown, countdownTime, currentQuiz]);

  const handleSubmitQuiz = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        quizId,
        attemptId,
        answers: userAnswers,
      };
      const result = await submitAnswer(submissionData).unwrap();
      toast.success("Quiz submitted successfully!");
      navigate(`/dashboard/quiz-result/${attemptId || result?.data?.attemptId}`);
    } catch (error) {
      const err = error as TError;
      toast.error(
        err?.data?.message || "Failed to submit quiz. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      setShowSubmitDialog(false);
    }
  }, [quizId, attemptId, userAnswers, submitAnswer, navigate]);

  useEffect(() => {
    if (
      timeRemaining > 0 &&
      isQuizStarted &&
      currentQuiz?.estimatedTime &&
      currentQuiz.estimatedTime > 0
    ) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (
      timeRemaining === 0 &&
      currentQuiz &&
      isQuizStarted &&
      currentQuiz?.estimatedTime &&
      currentQuiz.estimatedTime > 0
    ) {
      // Only auto-submit if there was actually a time limit and it has expired
      handleSubmitQuiz();
    }
  }, [timeRemaining, currentQuiz, handleSubmitQuiz, isQuizStarted]);

  const handleAnswerSelect = (
    questionId: string,
    answer: string | string[]
  ) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (currentQuiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // If it's the last question, show submit dialog
      setShowSubmitDialog(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getAnsweredQuestions = () => {
    if (!currentQuiz) return 0;
    return currentQuiz.questions.filter((q) => userAnswers[q.id] !== undefined)
      .length;
  };

  const isQuizComplete = () => {
    if (!currentQuiz) return false;
    return getAnsweredQuestions() === currentQuiz.questions.length;
  };

  if (quizLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quiz Not Found</h2>
          <p className="text-muted-foreground">
            The requested quiz could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  // Show countdown screen
  if (showCountdown) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            key={countdownTime}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto bg-primary rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-6xl font-bold text-white">{countdownTime}</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-foreground mb-4"
          >
            Get Ready!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Quiz starting in {countdownTime} second{countdownTime !== 1 ? 's' : ''}...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Show quiz start screen if quiz hasn't started yet
  if (!isQuizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl"
          >
            <Card className="overflow-hidden shadow-2xl border-0">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-white text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
                >
                  <BookOpen className="w-10 h-10 text-white" />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl font-bold mb-2"
                >
                  {currentQuiz.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-white/90 text-lg"
                >
                  {currentQuiz.subject} • {currentQuiz.academicLevel}
                </motion.p>
              </div>

              {/* Content Section */}
              <div className="p-8 space-y-8">
                {/* Quiz Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {currentQuiz.questions.length}
                    </div>
                    <div className="text-sm text-blue-600/80">Questions</div>
                  </div>

                  {currentQuiz.estimatedTime && (
                    <div className="bg-green-50 rounded-xl p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Timer className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {currentQuiz.estimatedTime}
                      </div>
                      <div className="text-sm text-green-600/80">Minutes</div>
                    </div>
                  )}

                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-1 capitalize">
                      {currentQuiz.difficulty}
                    </div>
                    <div className="text-sm text-purple-600/80">Difficulty</div>
                  </div>
                </motion.div>

                {/* Instructions */}
                {currentQuiz.instructions && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="bg-amber-50 border border-amber-200 rounded-xl p-6"
                  >
                    <h4 className="font-semibold mb-3 text-amber-800 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Instructions
                    </h4>
                    <p className="text-amber-700 leading-relaxed">
                      {currentQuiz.instructions}
                    </p>
                  </motion.div>
                )}

                {/* Start Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-center pt-4"
                >
                  <Button
                    onClick={handleStartQuiz}
                    disabled={isStartingQuiz}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-12 py-4 text-lg font-semibold h-16 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    {isStartingQuiz ? (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Preparing Quiz...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Play className="w-6 h-6" />
                        <span>Start Quiz Now</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{currentQuiz.title}</h1>
              <p className="text-sm text-muted-foreground">
                {currentQuiz.subject} • {currentQuiz.academicLevel}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {currentQuiz.estimatedTime && (
                <div
                  className={`flex items-center space-x-2 text-muted-foreground`}
                >
                  <Clock className="h-4 w-4" />
                  <span className="font-mono font-medium">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Main Quiz Area */}
          <div className="space-y-6">
            {/* Progress */}
            <ProgressBar
              current={currentQuestionIndex + 1}
              total={currentQuiz.questions.length}
              answered={getAnsweredQuestions()}
            />

            {/* Question Card */}
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                selectedAnswer={userAnswers[currentQuestion.id]}
                onAnswerSelect={(answer) =>
                  handleAnswerSelect(currentQuestion.id, answer)
                }
              />
            </motion.div>

            {/* Navigation */}
            <NavigationControls
              currentIndex={currentQuestionIndex}
              totalQuestions={currentQuiz.questions.length}
              onPrevious={handlePreviousQuestion}
              onNext={handleNextQuestion}
              canGoNext={true}
              canGoPrevious={currentQuestionIndex > 0}
              currentAnswer={userAnswers[currentQuestion.id]}
              requireAnswer={true}
            />
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="w-full max-w-lg mx-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isQuizComplete()
                      ? "bg-green-100"
                      : "bg-amber-100"
                  }`}>
                    {isQuizComplete() ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Submit Quiz
                  </h3>
                </div>
                <button
                  onClick={() => setShowSubmitDialog(false)}
                  disabled={isSubmitting}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  {isQuizComplete()
                    ? "Congratulations! You have answered all questions."
                    : "You haven't answered all questions yet."}
                </p>

                {/* Progress Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-500">
                      {getAnsweredQuestions()}/{currentQuiz.questions.length} questions
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isQuizComplete() ? "bg-green-500" : "bg-amber-500"
                      }`}
                      style={{
                        width: `${(getAnsweredQuestions() / currentQuiz.questions.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {!isQuizComplete() && (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                    <p className="text-sm text-amber-800">
                      ⚠️ Unanswered questions will be marked as incorrect. You can continue answering or submit now.
                    </p>
                  </div>
                )}

                {isQuizComplete() && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✅ All questions completed! Ready to submit your quiz.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSubmitDialog(false)}
                  disabled={isSubmitting}
                  className="flex-1 cursor-pointer"
                >
                  Continue Quiz
                </Button>
                <Button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className={`flex-1 cursor-pointer ${
                    isQuizComplete()
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Submit Quiz</span>
                    </div>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuizInterface;
