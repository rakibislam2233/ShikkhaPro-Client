import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  FileText,
  Users,
  Trophy,
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/card";
import { getDemoStats } from "../../utils/demoData";
const DashboardOverview = () => {
  const demoStats = getDemoStats();

  const stats = {
    totalQuizzes: demoStats.totalQuizzes,
    totalAttempts: demoStats.totalAttempts,
    avgScore: demoStats.averageScore,
    completionRate: demoStats.completionRate,
    totalStudents: demoStats.totalStudents,
    activeQuizzes: demoStats.activeQuizzes,
  };

  const recentQuizzes = [
    {
      id: "1",
      title: "Mathematics - Algebra Basics",
      subject: "Mathematics",
      attempts: 23,
      avgScore: 78,
      createdAt: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      title: "Physics - Motion and Forces",
      subject: "Physics",
      attempts: 18,
      avgScore: 82,
      createdAt: "2024-01-12",
      status: "active",
    },
    {
      id: "3",
      title: "Chemistry - Periodic Table",
      subject: "Chemistry",
      attempts: 31,
      avgScore: 91,
      createdAt: "2024-01-10",
      status: "completed",
    },
  ];

  const recentActivity = [
    {
      id: "1",
      type: "quiz_completed",
      student: "Ahmed Rahman",
      quiz: "Mathematics - Algebra Basics",
      score: 95,
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "quiz_created",
      quiz: "Physics - Motion and Forces",
      time: "5 hours ago",
    },
    {
      id: "3",
      type: "quiz_completed",
      student: "Fatima Khan",
      quiz: "Chemistry - Periodic Table",
      score: 87,
      time: "1 day ago",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your quizzes today.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create New Quiz</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Quizzes
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalQuizzes}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Attempts
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalAttempts}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Score
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.avgScore}%
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.completionRate}%
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Create Quiz</h3>
                <p className="text-sm text-muted-foreground">
                  Generate AI-powered quizzes
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">My Quizzes</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your quiz collection
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  View performance insights
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quizzes */}
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Quizzes</h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{quiz.title}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <span>{quiz.subject}</span>
                      <span>•</span>
                      <span>{quiz.attempts} attempts</span>
                      <span>•</span>
                      <span>{quiz.avgScore}% avg</span>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quiz.status === "active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                    }`}
                  >
                    {quiz.status}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === "quiz_completed"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-blue-100 dark:bg-blue-900/30"
                    }`}
                  >
                    {activity.type === "quiz_completed" ? (
                      <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      {activity.type === "quiz_completed" ? (
                        <>
                          <span className="font-medium">
                            {activity.student}
                          </span>{" "}
                          completed{" "}
                          <span className="font-medium">{activity.quiz}</span>{" "}
                          with{" "}
                          <span className="font-medium text-green-600">
                            {activity.score}%
                          </span>
                        </>
                      ) : (
                        <>
                          Created new quiz{" "}
                          <span className="font-medium">{activity.quiz}</span>
                        </>
                      )}
                    </p>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardOverview;
