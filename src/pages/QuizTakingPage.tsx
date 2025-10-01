import React from 'react';
import SEO from '../components/seo/SEO';
import { useParams } from 'react-router-dom';
import QuizInterface from '../components/quiz/QuizInterface';

const QuizTakingPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();

  if (!quizId) {
    return (
      <>
        <SEO
          title="Quiz Not Found"
          description="The requested quiz could not be found."
          noIndex={true}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Quiz Not Found
            </h1>
            <p className="text-muted-foreground">
              The requested quiz could not be found.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Take Quiz"
        description="Take your quiz and test your knowledge with ShikkhaPro's interactive quiz interface."
        keywords="take quiz, online quiz, quiz test, educational assessment"
        noIndex={true}
      />
      <QuizInterface quizId={quizId} />
    </>
  );
};

export default QuizTakingPage;