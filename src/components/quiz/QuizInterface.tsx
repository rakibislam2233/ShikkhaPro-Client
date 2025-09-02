import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useQuiz } from '../../contexts/QuizContext';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import NavigationControls from './NavigationControls';

interface QuizInterfaceProps {
  quizId: string;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ quizId }) => {
  const { currentQuiz, submitQuiz, saveAnswer } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  useEffect(() => {
    if (currentQuiz?.timeLimit) {
      setTimeRemaining(currentQuiz.timeLimit * 60);
    }
  }, [currentQuiz]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && currentQuiz) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, currentQuiz]);

  const handleAnswerSelect = (questionId: string, answer: string | string[]) => {
    saveAnswer(questionId, answer);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (currentQuiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionJump = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    try {
      await submitQuiz(quizId);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    } finally {
      setIsSubmitting(false);
      setShowSubmitDialog(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAnsweredQuestions = () => {
    if (!currentQuiz) return 0;
    return currentQuiz.questions.filter(q => 
      currentQuiz.userAnswers && currentQuiz.userAnswers[q.id]
    ).length;
  };

  const isQuizComplete = () => {
    if (!currentQuiz) return false;
    return getAnsweredQuestions() === currentQuiz.questions.length;
  };

  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quiz Not Found</h2>
          <p className="text-muted-foreground">The requested quiz could not be loaded.</p>
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
              {currentQuiz.timeLimit && (
                <div className={`flex items-center space-x-2 ${timeRemaining < 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  <Clock className="h-4 w-4" />
                  <span className="font-mono font-medium">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSubmitDialog(true)}
                className="bg-background/50"
              >
                Submit Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Quiz Area */}
          <div className="lg:col-span-3 space-y-6">
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
                selectedAnswer={currentQuiz.userAnswers?.[currentQuestion.id]}
                onAnswerSelect={(answer) => handleAnswerSelect(currentQuestion.id, answer)}
              />
            </motion.div>

            {/* Navigation */}
            <NavigationControls
              currentIndex={currentQuestionIndex}
              totalQuestions={currentQuiz.questions.length}
              onPrevious={handlePreviousQuestion}
              onNext={handleNextQuestion}
              canGoNext={currentQuestionIndex < currentQuiz.questions.length - 1}
              canGoPrevious={currentQuestionIndex > 0}
              currentAnswer={currentQuiz.userAnswers?.[currentQuestion.id]}
              requireAnswer={true}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Question Overview */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Questions Overview</h3>
              <div className="grid grid-cols-5 gap-2">
                {currentQuiz.questions.map((_, index) => {
                  const isAnswered = currentQuiz.userAnswers && currentQuiz.userAnswers[currentQuiz.questions[index].id];
                  const isCurrent = index === currentQuestionIndex;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionJump(index)}
                      className={`
                        h-8 w-8 text-xs font-medium rounded transition-colors
                        ${isCurrent 
                          ? 'bg-primary text-primary-foreground' 
                          : isAnswered 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Answered:</span>
                  <span>{getAnsweredQuestions()}/{currentQuiz.questions.length}</span>
                </div>
              </div>
            </Card>

            {/* Quiz Info */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Quiz Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Questions:</span>
                  <span>{currentQuiz.questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <span className="capitalize">{currentQuiz.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="capitalize">{currentQuiz.language}</span>
                </div>
                {currentQuiz.timeLimit && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Limit:</span>
                    <span>{currentQuiz.timeLimit} min</span>
                  </div>
                )}
              </div>
            </Card>
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
                  : `You have answered ${getAnsweredQuestions()} out of ${currentQuiz.questions.length} questions. Unanswered questions will be marked as incorrect.`
                }
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSubmitDialog(false)}
                  className="flex-1"
                >
                  Continue Quiz
                </Button>
                <Button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
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