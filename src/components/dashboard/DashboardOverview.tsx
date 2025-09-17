import { motion } from "framer-motion";
import {
  Plus,
  FileText
} from "lucide-react";
import { Button } from '../ui/Button';
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
                  {myQuizzes?.totalQuizzes || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default DashboardOverview;
