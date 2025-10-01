import React from 'react';
import SEO from '../components/seo/SEO';
import QuizCreator from '../components/quiz/QuizCreator';

const QuizGeneratorPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Create Quiz"
        description="Create intelligent quizzes with AI-powered question generation. Customize difficulty, subjects, and question types for personalized learning assessments."
        keywords="create quiz, AI question generation, quiz maker, educational assessment, custom quizzes, ShikkhaPro"
        noIndex={true}
      />

       <main className="flex-1 p-3 sm:p-4 lg:p-8">
        <QuizCreator />
      </main>
    </>
  );
};

export default QuizGeneratorPage;