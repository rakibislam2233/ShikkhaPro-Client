import React from 'react';
import { Helmet } from 'react-helmet-async';
import QuizManagement from '@/components/dashboard/QuizManagement';
import { Home } from 'lucide-react';

const MyQuizzesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>My Quizzes - ShikkhaPro</title>
        <meta name="description" content="Manage and view all your created quizzes. Track performance, edit questions, and analyze student engagement." />
        <meta name="keywords" content="quiz management, my quizzes, quiz analytics, ShikkhaPro dashboard" />
      </Helmet>
      
      <main className="flex-1 p-3 sm:p-4 lg:p-8">
        {/* Breadcrumb */}
        <div className="mb-4 lg:mb-8 hidden sm:block">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <span>/</span>
            <span className="font-medium text-gray-900">My Quizzes</span>
          </div>
        </div>
        {/* Main Content */}
        <QuizManagement />
      </main>
    </>
  );
};

export default MyQuizzesPage;