import React from 'react';
import QuizCreator from '../components/quiz/QuizCreator';

const QuizGeneratorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <QuizCreator />
    </div>
  );
};

export default QuizGeneratorPage;