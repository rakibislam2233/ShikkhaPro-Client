import { motion } from "framer-motion";
import {
  Plus,
  FileText,
  Target,
  Trophy,
  TrendingUp,
  Clock,
  Star,
  Activity,
  Timer,
  Calendar,
  Eye,
  BookOpen,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "../ui/LoadingSpinner";
import {
  useGetDashboardSummaryQuery,
  useGetQuizAttemptsQuery,
} from "@/redux/features/dashboard/dashboardApi";
const DashboardOverview = () => {
  const { user } = useAuth();
  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError,
  } = useGetDashboardSummaryQuery();

  // Redux hooks for API calls
  const {
    data: attemptsResponse,
    isLoading: attemptsLoading,
    error: attemptsError,
  } = useGetQuizAttemptsQuery({
    page: 1,
    limit: 10,
  });

  const attemptsData = attemptsResponse?.data;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: {
        className: "bg-green-100 text-green-800",
        text: "Completed",
      },
      "in-progress": {
        className: "bg-yellow-100 text-yellow-800",
        text: "In Progress",
      },
      abandoned: {
        className: "bg-red-100 text-red-800",
        text: "Abandoned",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.completed;

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}
      >
        {config.text}
      </span>
    );
  };

  const getDifficultyBadge = (difficulty: string) => {
    const difficultyConfig = {
      easy: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      hard: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          difficultyConfig[difficulty as keyof typeof difficultyConfig]
        }`}
      >
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    );
  };

  const getGradeColor = (grade: string) => {
    if (grade === "A+" || grade === "A") return "text-green-600";
    if (grade === "B+" || grade === "B") return "text-blue-600";
    if (grade === "C+" || grade === "C") return "text-yellow-600";
    return "text-red-600";
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || seconds === 0) return "0s";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  const dashboardData = summaryData?.data;
  const isLoading = summaryLoading || attemptsLoading;
  const error = summaryError || attemptsError;

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
          <p className="mt-4 text-muted-foreground">
            Loading your dashboard...
          </p>
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
              Welcome back,{" "}
              {user?.profile?.fullName || user?.email?.split("@")[0]}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your quizzes today.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/dashboard/create-quiz">
              <Button className="flex items-center space-x-2 h-12 cursor-pointer">
                <Plus className="size-8" />
                <span>Create New Quiz</span>
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border bg-white rounded-lg p-6">
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
          </div>

          <div className="border bg-white rounded-lg p-6">
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
          </div>

          <div className="border bg-white rounded-lg p-6">
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
          </div>

          <div className="border bg-white rounded-lg p-6">
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
          </div>
        </div>
      </motion.div>

      {/* Additional Stats */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border bg-white rounded-lg p-6">
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
          </div>

          <div className="border bg-white rounded-lg p-6">
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
          </div>

          <div className="border bg-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Last Activity
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {dashboardData?.lastActivityAt
                    ? new Date(
                        dashboardData.lastActivityAt
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mt-8">
          <h2 className="text-2xl font-bold text-foreground">
            Recent Activity
          </h2>
          <Link to="/dashboard/quiz-attempts">
            <Button className="cursor-pointer px-8 h-10">View All</Button>
          </Link>
        </div>
      </motion.div>
      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50  border-b">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quiz Details
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score & Grade
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time & Date
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attemptsData?.attempts.map((attempt) => (
                  <tr key={attempt.attemptId} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {attempt.quizTitle}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {attempt.subject} • {attempt.topic}
                            </span>
                            {getDifficultyBadge(attempt.difficulty)}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {attempt.questionCount} questions
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {attempt.score}/{attempt.totalScore}
                          </span>
                          <span className="text-gray-500">
                            ({attempt.percentage}%)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`font-medium ${getGradeColor(
                              attempt.grade
                            )}`}
                          >
                            {attempt.grade}
                          </span>
                          <span className="text-gray-500">
                            GPA: {attempt.gpa}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(attempt.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="flex items-center space-x-1 text-gray-900">
                          <Timer className="h-4 w-4" />
                          <span>{formatTime(attempt.timeSpent)}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500 mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(attempt.startedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {attempt.status === "completed" ? (
                        <Link
                          to={`/dashboard/quiz-result/${attempt.attemptId}`}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled
                          className="cursor-not-allowed opacity-50"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardOverview;
