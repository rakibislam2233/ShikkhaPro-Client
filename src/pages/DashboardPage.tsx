import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import QuizManagement from "../components/dashboard/QuizManagement";
import AnalyticsDashboard from "../components/dashboard/AnalyticsDashboard";
import SettingsPanel from "../components/dashboard/SettingsPanel";
import QuizCreator from "../components/quiz/QuizCreator";
import {
  BarChart3,
  Clock,
  FileText,
  Home,
  PlusCircle,
  Sparkles,
  Trophy,
} from "lucide-react";

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleCreateQuiz = () => {
    setActiveTab("create-quiz");
  };

  const handleViewQuizzes = () => {
    setActiveTab("my-quizzes");
  };

  const handleViewAnalytics = () => {
    setActiveTab("analytics");
  };

  const renderTabContent = () => {
    const pageVariants = {
      initial: { opacity: 0, x: 20 },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: -20 },
    };

    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.3,
    };

    switch (activeTab) {
      case "overview":
        return (
          <motion.div
            key="overview"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <DashboardOverview
              onCreateQuiz={handleCreateQuiz}
              onViewQuizzes={handleViewQuizzes}
              onViewAnalytics={handleViewAnalytics}
            />
          </motion.div>
        );
      case "create-quiz":
        return (
          <motion.div
            key="create-quiz"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <QuizCreator />
          </motion.div>
        );
      case "my-quizzes":
        return (
          <motion.div
            key="my-quizzes"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <QuizManagement onCreateQuiz={handleCreateQuiz} />
          </motion.div>
        );
      case "analytics":
        return (
          <motion.div
            key="analytics"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AnalyticsDashboard />
          </motion.div>
        );
      case "settings":
        return (
          <motion.div
            key="settings"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <SettingsPanel />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="default"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <DashboardOverview
              onCreateQuiz={handleCreateQuiz}
              onViewQuizzes={handleViewQuizzes}
              onViewAnalytics={handleViewAnalytics}
            />
          </motion.div>
        );
    }
  };

  return (
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
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
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

          {/* Floating Elements */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 h-12 sm:w-20 sm:h-20 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-10 h-10 sm:w-16 sm:h-16 bg-white bg-opacity-5 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="relative z-10">
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300" />
                  <span className="text-xs lg:text-sm font-medium text-blue-100">
                    Welcome back!
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2">
                  Hello, {user.name.split(" ")[0]}! 👋
                </h1>
                <p className="text-blue-100 text-sm sm:text-base lg:text-lg">
                  Ready to continue your learning journey?
                </p>
                <p className="text-blue-100 text-sm sm:text-base lg:text-lg hidden sm:block">
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

      {/* Quick Actions */}
      <div className="mb-6 lg:mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {[
            {
              title: "Create Quiz",
              desc: "Generate questions",
              icon: PlusCircle,
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "Analytics",
              desc: "Track progress",
              icon: BarChart3,
              color: "from-emerald-500 to-teal-500",
            },
            {
              title: "My Quizzes",
              desc: "Saved quizzes",
              icon: FileText,
              color: "from-purple-500 to-violet-500",
            },
            {
              title: "Schedule",
              desc: "Plan sessions",
              icon: Clock,
              color: "from-orange-500 to-red-500",
            },
          ].map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                className="group bg-white rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${action.color} rounded-lg lg:rounded-xl flex items-center justify-center mb-2 lg:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                  {action.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {action.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Stats for Mobile - Only visible on mobile */}
      <div className="mb-6 md:hidden">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 px-1">
          Your Progress
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-3 border border-gray-200 text-center"
              >
                <IconComponent
                  className={`w-4 h-4 ${stat.color} mx-auto mb-1`}
                />
                <div className="text-lg font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border border-gray-200 min-h-96 flex-1">
        <DashboardOverview />
      </div>

      {/* Mobile Upgrade Banner - Only visible on mobile */}
      <div className="mt-4 md:hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-800">
                Upgrade to Pro
              </span>
            </div>
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
