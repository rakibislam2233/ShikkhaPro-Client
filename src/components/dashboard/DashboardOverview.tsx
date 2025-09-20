import { motion } from "framer-motion";
import {
  Plus,
  FileText,
  Target,
  Trophy,
  TrendingUp,
  Clock,
  Star,
  Activity
} from "lucide-react";
import { Button } from '../ui/Button';
import { Card } from "../ui/Card";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "../ui/LoadingSpinner";
import {
  useGetDashboardSummaryQuery,
  useGetRecentActivityQuery
} from "@/redux/features/dashboard/dashboardApi";
const DashboardOverview = () => {
  const { user } = useAuth();

  // Redux hooks for API calls
  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError
  } = useGetDashboardSummaryQuery();

  const {
    data: activityData,
    isLoading: activityLoading,
    error: activityError
  } = useGetRecentActivityQuery();

  const dashboardData = summaryData?.data;
  const recentActivity = activityData?.data || [];
  const isLoading = summaryLoading || activityLoading;
  const error = summaryError || activityError;

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-500">Error loading dashboard data</p>
        </div>
      </div>
    );
  }

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
              Welcome back, {user?.profile?.fullName || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your quizzes today.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/dashboard/create-quiz">
              <Button className="flex items-center space-x-2 cursor-pointer">
                <Plus className="h-4 w-4" />
                <span>Create New Quiz</span>
              </Button>
            </Link>
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
                  {dashboardData?.totalQuizzes || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
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
                  {dashboardData?.totalAttempts || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
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
                  {dashboardData?.averagePercentage || 0}%
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Current Rank
                </p>
                <p className="text-2xl font-bold text-foreground">
                  #{dashboardData?.rank || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Additional Stats */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed Quizzes
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {dashboardData?.completedQuizzes || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Streak Days
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {dashboardData?.streakDays || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Last Activity
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {dashboardData?.lastActivityAt
                    ? new Date(dashboardData.lastActivityAt).toLocaleDateString()
                    : 'N/A'
                  }
                </p>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <Link to="/dashboard/quiz-attempts">
              <Button variant="outline" size="sm" className="cursor-pointer">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.slice(0, 5).map((activity) => (
                <div
                  key={activity.attemptId}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.quizTitle}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{activity.subject} • {activity.topic}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          activity.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          activity.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {activity.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {activity.score}/{activity.totalScore}
                        </span>
                        <span className="text-xs text-gray-500">({activity.percentage}%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          activity.grade === 'A+' || activity.grade === 'A' ? 'text-green-600' :
                          activity.grade === 'B+' || activity.grade === 'B' ? 'text-blue-600' :
                          activity.grade === 'C+' || activity.grade === 'C' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {activity.grade}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.status === 'completed' ? 'Completed' :
                       activity.status === 'in-progress' ? 'In Progress' : 'Abandoned'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No recent activity</p>
                <p className="text-sm text-gray-400 mt-1">
                  Start taking quizzes to see your activity here
                </p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

    </motion.div>
  );
};

export default DashboardOverview;
