import React from 'react';
import { Helmet } from 'react-helmet-async';
import QuizCreator from '../components/quiz/QuizCreator';

const QuizGeneratorPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Create Quiz - ShikkhaPro</title>
        <meta name="description" content="Create intelligent quizzes with AI-powered question generation. Customize difficulty, subjects, and question types for personalized learning assessments." />
        <meta name="keywords" content="create quiz, AI question generation, quiz maker, educational assessment, custom quizzes, ShikkhaPro" />
      </Helmet>
      
       <main className="flex-1 p-3 sm:p-4 lg:p-8">
        <QuizCreator />
      </main>
    </>
  );
};

export default QuizGeneratorPage;