import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResultsDisplay from '../components/quiz/ResultsDisplay';
import { useQuiz } from '../contexts/QuizContext';

const ResultsPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const { getQuizAttempt, getQuizById } = useQuiz();

  if (!attemptId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Results Not Found
          </h1>
          <p className="text-muted-foreground">
            The requested quiz results could not be found.
          </p>
        </div>
      </div>
    );
  }

  // Mock data for demonstration
  const mockAttempt = {
    id: attemptId,
    quizId: 'quiz-1',
    userId: 'user-1',
    score: 85,
    totalScore: 100,
    timeSpent: 1800, // 30 minutes in seconds
    completedAt: new Date().toISOString(),
    answers: {
      'q1': 'Option A',
      'q2': 'Option B',
      'q3': 'Option C'
    }
  };

  const mockQuestions = [
    {
      id: 'q1',
      question: 'What is the capital of France?',
      type: 'mcq' as const,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      explanation: 'Paris is the capital and most populous city of France.',
      points: 10,
      difficulty: 'easy' as const
    },
    {
      id: 'q2',
      question: 'What is 2 + 2?',
      type: 'mcq' as const,
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
      explanation: '2 + 2 equals 4.',
      points: 5,
      difficulty: 'easy' as const
    },
    {
      id: 'q3',
      question: 'What is the largest planet in our solar system?',
      type: 'mcq' as const,
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Jupiter',
      explanation: 'Jupiter is the largest planet in our solar system.',
      points: 15,
      difficulty: 'medium' as const
    }
  ];

  const handleRetakeQuiz = () => {
    navigate(`/quiz/${mockAttempt.quizId}`);
  };

  const handleShareResults = () => {
    console.log('Sharing results:', attemptId);
  };

  const handleDownloadReport = () => {
    console.log('Downloading report for:', attemptId);
  };

  return (
    <ResultsDisplay
      attempt={mockAttempt}
      questions={mockQuestions}
      onRetakeQuiz={handleRetakeQuiz}
      onShareResults={handleShareResults}
      onDownloadReport={handleDownloadReport}
    />
  );
};

export default ResultsPage;