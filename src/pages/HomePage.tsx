import React from 'react';
import SEO from '../components/seo/SEO';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorks from '../components/home/HowItWorks';
import StudentFeedback from '../components/home/StudentFeedback';

const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="ShikkhaPro - AI-Powered Quiz Generator | Create Smart Educational Assessments"
        description="Create intelligent quizzes with AI technology. ShikkhaPro offers personalized learning experiences for students from Class 1 to Masters level with instant feedback and detailed analytics."
        keywords="AI quiz generator, educational assessment, online quiz maker, learning platform, student assessment, exam preparation, EdTech, ShikkhaPro"
        ogType="website"
      />

      <div className="min-h-screen">
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <StudentFeedback />
      </main>
    </div>
    </>
  );
};

export default HomePage;