import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  BarChart3,
  Download,
  Share2,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card.tsx';
import QuestionCard from './QuestionCard';
import type { Question, QuizAttempt } from '@/types/quiz.types';

interface ResultsDisplayProps {
  attempt: QuizAttempt;
  questions: Question[];
  onRetakeQuiz?: () => void;
  onShareResults?: () => void;
  onDownloadReport?: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  attempt,
  questions,
  onRetakeQuiz,
  onShareResults,
  onDownloadReport,
}) => {
  const [showDetailedReview, setShowDetailedReview] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 90) return { text: 'Excellent', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
    if (percentage >= 80) return { text: 'Good', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' };
    if (percentage >= 70) return { text: 'Average', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' };
    if (percentage >= 60) return { text: 'Below Average', class: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' };
    return { text: 'Needs Improvement', class: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  const percentage = Math.round(((attempt.score || 0) / (attempt.totalScore || 1)) * 100);
  const scoreBadge = getScoreBadge(percentage);

  const correctAnswers = questions.filter(q => {
    const userAnswer = attempt.answers[q.id];
    const correctAnswer = q.correctAnswer;
    
    if (Array.isArray(correctAnswer) && Array.isArray(userAnswer)) {
      return JSON.stringify([...correctAnswer].sort()) === JSON.stringify([...userAnswer].sort());
    }
    return userAnswer === correctAnswer;
  }).length;

  const incorrectAnswers = questions.length - correctAnswers - 
    questions.filter(q => !attempt.answers[q.id]).length;
  
  const unansweredQuestions = questions.filter(q => !attempt.answers[q.id]).length;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4"
          >
            <Trophy className={`h-10 w-10 ${getScoreColor(percentage)}`} />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
          <p className="text-muted-foreground">Here are your results</p>
        </motion.div>

        {/* Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 text-center">
            <div className="space-y-6">
              <div>
                <div className={`text-6xl font-bold ${getScoreColor(percentage)} mb-2`}>
                  {percentage}%
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${scoreBadge.class}`}>
                    {scoreBadge.text}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                <div>
                  <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{incorrectAnswers}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-500">{unansweredQuestions}</div>
                  <div className="text-sm text-muted-foreground">Unanswered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatDuration(attempt.timeSpent || 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Time Taken</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Detailed Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">Accuracy</h3>
            </div>
            <div className="text-2xl font-bold text-primary mb-2">
              {Math.round((correctAnswers / questions.length) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground">
              {correctAnswers} out of {questions.length} questions correct
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold">Average Time</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {Math.round((attempt.timeSpent || 0) / questions.length)}s
            </div>
            <p className="text-sm text-muted-foreground">Per question</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold">Score</h3>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-2">
              {attempt.score}/{attempt.totalScore}
            </div>
            <p className="text-sm text-muted-foreground">Points earned</p>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            onClick={() => setShowDetailedReview(!showDetailedReview)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            {showDetailedReview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showDetailedReview ? 'Hide' : 'Show'} Review</span>
          </Button>

          {onRetakeQuiz && (
            <Button
              onClick={onRetakeQuiz}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retake Quiz</span>
            </Button>
          )}

          {onShareResults && (
            <Button
              onClick={onShareResults}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share Results</span>
            </Button>
          )}

          {onDownloadReport && (
            <Button
              onClick={onDownloadReport}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Report</span>
            </Button>
          )}
        </motion.div>

        {/* Detailed Review */}
        {showDetailedReview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Question Review</h3>
              
              {/* Question Overview Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-6">
                {questions.map((question, index) => {
                  const userAnswer = attempt.answers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer ||
                    (Array.isArray(question.correctAnswer) && Array.isArray(userAnswer) && 
                     JSON.stringify(question.correctAnswer.sort()) === JSON.stringify(userAnswer.sort()));
                  const isAnswered = userAnswer !== undefined && userAnswer !== '';
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedQuestionIndex(
                        selectedQuestionIndex === index ? null : index
                      )}
                      className={`
                        h-10 w-10 text-sm font-medium rounded-lg border-2 transition-all
                        ${selectedQuestionIndex === index 
                          ? 'border-primary bg-primary text-primary-foreground' 
                          : isCorrect 
                            ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : !isAnswered
                              ? 'border-gray-300 bg-gray-50 text-gray-500 dark:bg-gray-900/30 dark:text-gray-400'
                              : 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-sm mb-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Correct</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span>Incorrect</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 rounded-full bg-gray-300" />
                  <span>Unanswered</span>
                </div>
              </div>

              {/* Selected Question Detail */}
              {selectedQuestionIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <QuestionCard
                    question={questions[selectedQuestionIndex]}
                    questionNumber={selectedQuestionIndex + 1}
                    selectedAnswer={attempt.answers[questions[selectedQuestionIndex].id]}
                    onAnswerSelect={() => {}}
                    isReviewMode={true}
                    showCorrectAnswer={true}
                  />
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;