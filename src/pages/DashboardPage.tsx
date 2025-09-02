import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import {
  Home,
  Sparkles,
  Trophy,
} from "lucide-react";

const DashboardPage: React.FC = () => {
  // Mock user data
  const user = {
    name: "Ahmed Rahman",
    email: "ahmed@email.com",
    avatar: "AR",
    level: "HSC Student",
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - ShikkhaPro</title>
        <meta name="description" content="Your personal learning dashboard. Track quiz performance, view analytics, and monitor your educational progress with ShikkhaPro." />
        <meta name="keywords" content="learning dashboard, quiz performance, student analytics, progress tracking, ShikkhaPro" />
      </Helmet>
      
      <main className="flex-1 p-3 sm:p-4 lg:p-8">
      {/* Breadcrumb - Hidden on mobile */}
      <div className="mb-4 lg:mb-8 hidden sm:block">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Home className="w-4 h-4" />
          <span>/</span>
          <span className="font-medium text-gray-900 capitalize">
            Dashboard
          </span>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mb-6 lg:mb-8">
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 2px, transparent 2px), radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.3) 2px, transparent 2px)`,
                backgroundSize: "40px 40px sm:60px sm:60px",
              }}
            ></div>
          </div>
          <div className="relative z-10">
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300" />
                  <span className="text-xs lg:text-sm font-medium text-primary-foreground/80">
                    Welcome back!
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2">
                  Hello, {user.name.split(" ")[0]}! 👋
                </h1>
                <p className="text-primary-foreground/90 text-sm sm:text-base lg:text-lg">
                  Ready to continue your learning journey?
                </p>
                <p className="text-primary-foreground/90 text-sm sm:text-base lg:text-lg hidden sm:block">
                  Let's achieve greatness together.
                </p>
              </div>

              <div className="flex flex-row sm:flex-col lg:items-end space-x-3 sm:space-x-0 sm:space-y-2">
                <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-3 lg:px-4 py-1.5 lg:py-2 backdrop-blur-sm">
                  <Trophy className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-300" />
                  <span className="text-xs lg:text-sm font-medium">
                    {user.level}
                  </span>
                </div>
                <button className="bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 backdrop-blur-sm rounded-lg lg:rounded-xl px-4 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm font-medium transition-all duration-200 border border-white border-opacity-20 whitespace-nowrap">
                  View Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <DashboardOverview />
    </main>
    </>
  );
};

export default DashboardPage;
