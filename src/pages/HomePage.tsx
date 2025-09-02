import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/home/Navbar';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorks from '../components/home/HowItWorks';
import Footer from '../components/home/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>ShikkhaPro - AI-Powered Quiz Generator | Create Smart Educational Assessments</title>
        <meta name="description" content="Create intelligent quizzes with AI technology. ShikkhaPro offers personalized learning experiences for students from Class 1 to Masters level with instant feedback and detailed analytics." />
        <meta name="keywords" content="AI quiz generator, educational assessment, online quiz maker, learning platform, student assessment, exam preparation, EdTech, ShikkhaPro" />
        <meta property="og:title" content="ShikkhaPro - AI-Powered Quiz Generator" />
        <meta property="og:description" content="Transform education with AI-powered quiz generation. Create personalized assessments for all academic levels." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ShikkhaPro - AI-Powered Quiz Generator" />
        <meta name="twitter:description" content="Create intelligent quizzes with AI technology for personalized learning experiences." />
      </Helmet>
      
      <div className="min-h-screen">
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
      </main>
    </div>
    </>
  );
};

export default HomePage;