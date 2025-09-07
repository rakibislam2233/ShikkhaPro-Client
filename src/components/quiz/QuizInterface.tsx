import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import NavigationControls from "./NavigationControls";
import type { IQuiz } from "@/types/quiz.types";
import {
  useGetQuizByIdQuery,
  useSubmitAnswerMutation,
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

  const { data: responseData, isLoading: quizLoading } = useGetQuizByIdQuery(
    quizId,
    {
      refetchOnMountOrArgChange: true,
      skip: !quizId,
    }
  );

  const [submitAnswer] = useSubmitAnswerMutation();

  // Load quiz when component mounts
  useEffect(() => {
    if (responseData?.data) {
      setCurrentQuiz(responseData?.data);
    }
  }, [responseData]);

  useEffect(() => {
    if (currentQuiz?.estimatedTime && currentQuiz.estimatedTime > 0) {
      setTimeRemaining(currentQuiz.estimatedTime * 60);
      setIsQuizStarted(true); // Mark quiz as started when time is set
    } else if (currentQuiz) {
      // If no time limit, just mark as started without timer
      setIsQuizStarted(true);
      setTimeRemaining(0);
    }
  }, [currentQuiz]);

  const handleSubmitQuiz = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        quizId,
        answers: userAnswers,
      };
      const result = await submitAnswer(submissionData).unwrap();
      toast.success("Quiz submitted successfully!");
      navigate(`/dashboard/quiz-result/${result?.data?.attemptId}`);
    } catch (error) {
      const err = error as TError;
      toast.error(
        err?.data?.message || "Failed to submit quiz. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      setShowSubmitDialog(false);
    }
  }, [quizId, userAnswers, submitAnswer, navigate]);

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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Submit Quiz?</h3>
              <p className="text-muted-foreground mb-6">
                {isQuizComplete()
                  ? "You have answered all questions. Are you sure you want to submit?"
                  : `You have answered ${getAnsweredQuestions()} out of ${
                      currentQuiz.questions.length
                    } questions. Unanswered questions will be marked as incorrect.`}
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSubmitDialog(false)}
                  className="flex-1 cursor-pointer"
                >
                  Continue Quiz
                </Button>
                <Button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className="flex-1 cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QuizInterface;
