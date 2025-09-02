import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import { Home } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Analytics - ShikkhaPro</title>
        <meta name="description" content="Comprehensive analytics and insights for your quiz performance. Track progress, identify trends, and optimize learning outcomes." />
        <meta name="keywords" content="quiz analytics, performance insights, learning analytics, ShikkhaPro dashboard" />
      </Helmet>
      
      <main className="flex-1 p-3 sm:p-4 lg:p-8">
        {/* Breadcrumb */}
        <div className="mb-4 lg:mb-8 hidden sm:block">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <span>/</span>
            <span className="font-medium text-gray-900">Analytics</span>
          </div>
        </div>

        {/* Main Content */}
        <AnalyticsDashboard />
      </main>
    </>
  );
};

export default AnalyticsPage;