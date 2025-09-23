import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, AlertCircle, Play, CheckCircle, X, Send } from "lucide-react";
import { Button } from "../ui/Button";
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
    // Show countdown first, then make API call
    setShowCountdown(true);
    setCountdownTime(3);
  };

  // Countdown timer effect
  useEffect(() => {
    if (showCountdown && countdownTime > 0) {
      const timer = setTimeout(() => {
        setCountdownTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showCountdown && countdownTime === 0) {
      // Make API call when countdown reaches 0
      const startQuizAPI = async () => {
        try {
          const result = await startQuiz(quizId).unwrap();
          setAttemptId(result?.data?.attemptId);

          setShowCountdown(false);
          setIsQuizStarted(true);

          // Set timer if there's a time limit
          if (currentQuiz?.estimatedTime && currentQuiz.estimatedTime > 0) {
            setTimeRemaining(currentQuiz.estimatedTime * 60);
          }
        } catch (error) {
          const err = error as TError;
          toast.error(err?.data?.message || "Failed to start quiz");
          setShowCountdown(false);
        }
      };

      startQuizAPI();
    }
  }, [showCountdown, countdownTime, currentQuiz, quizId, startQuiz]);

  const handleSubmitQuiz = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        quizId,
        attemptId,
        answers: userAnswers,
      };
      const result = await submitAnswer(submissionData).unwrap();
      navigate(
        `/dashboard/quiz-result/${attemptId || result?.data?.attemptId}`
      );
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
      <div className="min-h-screen  flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center relative z-10"
        >
          {/* Countdown Circle */}
          <motion.div
            key={countdownTime}
            initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <div className="w-40 h-40 mx-auto relative">
              {/* Outer Ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full shadow-2xl"></div>
              {/* Inner Circle */}
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {countdownTime}
                </span>
              </div>
              {/* Pulse Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full animate-ping opacity-20"></div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-foreground">Get Ready!</h2>
            <p className="text-lg text-muted-foreground">
              Quiz starting in {countdownTime} second
              {countdownTime !== 1 ? "s" : ""}...
            </p>
            {countdownTime === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center space-x-2 text-primary"
              >
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="font-medium">Starting your quiz...</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Show quiz start screen if quiz hasn't started yet
  if (!isQuizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/10 relative overflow-hidden">
        {/* Animated Background Elements */}

        <div className="min-h-screen flex items-center justify-center px-4 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl"
          >
            <div className="text-center space-y-12">
              {/* Quiz Title and Info */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-primary">
                  {currentQuiz.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-muted-foreground">
                  <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                    {currentQuiz.subject}
                  </span>
                  <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                    {currentQuiz.academicLevel}
                  </span>
                  <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                    {currentQuiz.questions.length} Questions
                  </span>
                </div>
              </motion.div>

              {/* Enhanced Start Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="flex justify-center"
              >
                <div className="relative group">
                  {/* Pulse Rings */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-10 animate-ping animation-delay-200"></div>

                  {/* Main Button */}
                  <motion.button
                    onClick={handleStartQuiz}
                    disabled={isStartingQuiz}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-40 flex flex-col cursor-pointer justify-center items-center h-40 md:w-48 md:h-48 bg-gradient-to-br from-primary via-primary to-secondary text-white rounded-full "
                  >
                    <Play className="w-12 h-12 md:w-16 md:h-16 mb-2 fill-white" />
                    <h1 className="text-sm md:text-lg font-semibold">Start</h1>
                  </motion.button>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center justify-center gap-8 text-muted-foreground"
              >
                {currentQuiz.estimatedTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{currentQuiz.estimatedTime} minutes</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Good Luck!</span>
                </div>
              </motion.div>
            </div>
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

      {/* Enhanced Submit Confirmation Dialog */}
      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="w-full max-w-2xl bg-white rounded-xl mx-auto">
              {/* Enhanced Header */}
              <div
                className={`px-8 py-5 rounded-t-xl ${
                  isQuizComplete()
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : "bg-gradient-to-r from-amber-500 to-orange-600"
                } text-white relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
                    }}
                  ></div>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className={`size-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm ${
                        isQuizComplete()
                          ? "shadow-green-200"
                          : "shadow-amber-200"
                      } shadow-lg`}
                    >
                      {isQuizComplete() ? (
                        <CheckCircle className="h-8 w-8 text-white" />
                      ) : (
                        <AlertCircle className="h-8 w-8 text-white" />
                      )}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {isQuizComplete() ? "Quiz Complete!" : "Submit Quiz?"}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {isQuizComplete()
                          ? "All questions answered successfully"
                          : "Some questions are still unanswered"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowSubmitDialog(false)}
                    disabled={isSubmitting}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors relative z-10"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="p-8 space-y-8">
                {/* Quiz Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">
                      {currentQuiz.questions.length}
                    </div>
                    <div className="text-sm text-blue-600/80">
                      Total Questions
                    </div>
                  </div>
                  <div
                    className={`rounded-xl p-4 text-center border ${
                      isQuizComplete()
                        ? "bg-green-50 border-green-200"
                        : "bg-amber-50 border-amber-200"
                    }`}
                  >
                    <div
                      className={`text-2xl font-bold ${
                        isQuizComplete() ? "text-green-600" : "text-amber-600"
                      }`}
                    >
                      {getAnsweredQuestions()}
                    </div>
                    <div
                      className={`text-sm ${
                        isQuizComplete()
                          ? "text-green-600/80"
                          : "text-amber-600/80"
                      }`}
                    >
                      Answered
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                    <div className="text-2xl font-bold text-gray-600">
                      {currentQuiz.questions.length - getAnsweredQuestions()}
                    </div>
                    <div className="text-sm text-gray-600/80">Remaining</div>
                  </div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">
                      Quiz Progress
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round(
                        (getAnsweredQuestions() /
                          currentQuiz.questions.length) *
                          100
                      )}
                      % Complete
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (getAnsweredQuestions() /
                              currentQuiz.questions.length) *
                            100
                          }%`,
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          isQuizComplete()
                            ? "bg-gradient-to-r from-green-500 to-emerald-600"
                            : "bg-gradient-to-r from-amber-500 to-orange-600"
                        } shadow-lg`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="p-8 pt-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowSubmitDialog(false)}
                    disabled={isSubmitting}
                    className="flex-1 cursor-pointer h-14 text-base font-semibold border "
                  >
                    <div className="flex items-center space-x-2">
                      <X className="h-5 w-5" />
                      <span>Continue Quiz</span>
                    </div>
                  </Button>

                  <motion.div className="flex-1">
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={isSubmitting}
                      className={`w-full h-14 text-base font-bold cursor-pointer ${
                        isQuizComplete()
                          ? "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
                          : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                      } text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>Submitting Quiz...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <Send className="h-5 w-5" />
                          <span>Submit Quiz</span>
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuizInterface;
