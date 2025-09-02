import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import QuizManagement from '../components/dashboard/QuizManagement';
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';
import SettingsPanel from '../components/dashboard/SettingsPanel';
import QuizCreator from '../components/quiz/QuizCreator';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleCreateQuiz = () => {
    setActiveTab('create-quiz');
  };

  const handleViewQuizzes = () => {
    setActiveTab('my-quizzes');
  };

  const handleViewAnalytics = () => {
    setActiveTab('analytics');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <DashboardOverview
            onCreateQuiz={handleCreateQuiz}
            onViewQuizzes={handleViewQuizzes}
            onViewAnalytics={handleViewAnalytics}
          />
        );
      case 'create-quiz':
        return <QuizCreator />;
      case 'my-quizzes':
        return <QuizManagement onCreateQuiz={handleCreateQuiz} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return (
          <DashboardOverview
            onCreateQuiz={handleCreateQuiz}
            onViewQuizzes={handleViewQuizzes}
            onViewAnalytics={handleViewAnalytics}
          />
        );
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </DashboardLayout>
  );
};

export default DashboardPage;