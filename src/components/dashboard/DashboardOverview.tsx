import { motion } from "framer-motion";
import {
  Plus,
  FileText,
  TrendingUp,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Link } from "react-router-dom";
import { useGetMyQuizzesQuery } from "@/redux/features/quiz/quizApi";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "../ui/LoadingSpinner";
const DashboardOverview = () => {
  const { user } = useAuth();
  const { data: quizzesData, isLoading: quizzesLoading } = useGetMyQuizzesQuery(undefined);
  const myQuizzes = quizzesData?.data || [];
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

  if (quizzesLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
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
              <Button className="flex items-center space-x-2">
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
                  {myQuizzes?.totalQuizzes}
                </p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <Link to="/dashboard/create-quiz">
            <Card className="p-6 cursor-pointer border-0 hover:shadow-lg transition-shadow ">
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
          </Link>

          <Link to="/dashboard/my-quizzes">
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
          </Link>

          <Link to="/dashboard/analytics">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
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
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardOverview;
