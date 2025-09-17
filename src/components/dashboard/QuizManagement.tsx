import { motion } from "framer-motion";
import {
  Plus,
  MoreHorizontal,
  Edit,
  Calendar,
  Clock,
  BookOpen,
  Tag,
  Trash,
} from "lucide-react";
import { Button } from '../ui/Button';
import { Card } from "../ui/Card";
import type { IQuiz } from "@/types/quiz.types";
import { Link } from "react-router-dom";
import { useGetMyQuizzesQuery } from "@/redux/features/quiz/quizApi";

const QuizManagement = () => {
  const { data: response } = useGetMyQuizzesQuery(undefined);
  const myQuizzes = response?.data?.results;
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "Never";
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "draft":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "archived":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 dark:text-green-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "hard":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  console.log("myQuizzes", myQuizzes);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            My Quizzes
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your created quizzes, track performance, and analyze results.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/dashboard/create-quiz">
            <Button className="flex items-center space-x-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              <span>Create Quiz</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      {/* <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
              />
            </div>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="recent">Most Recent</option>
              <option value="title">Title A-Z</option>
              <option value="attempts">Most Attempts</option>
              <option value="score">Highest Score</option>
            </select>
          </div>

          {selectedQuizzes.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedQuizzes.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("archive")}
              >
                Archive
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("delete")}
                className="text-red-600 hover:text-red-700"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Card> */}

      {/* Quiz List */}
      <div className="space-y-4">
        {myQuizzes?.map((quiz: IQuiz, index: number) => (
          <motion.div
            key={quiz?._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link to={`/dashboard/quiz/${quiz?._id}`}>
                        <h3 className="text-lg font-semibold hover:underline text-foreground mb-2">
                          {quiz?.title}
                        </h3>
                      </Link>

                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          <span>{quiz?.subject}</span>
                        </div>

                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Tag className="h-4 w-4" />
                          <span>{quiz?.academicLevel}</span>
                        </div>

                        <div className="flex items-center space-x-1 text-sm">
                          <span className="text-muted-foreground">
                            Difficulty:
                          </span>
                          <span
                            className={`font-medium ${getDifficultyColor(
                              quiz?.difficulty
                            )}`}
                          >
                            {quiz?.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{quiz?.timeLimit} min</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span> {formatDate(quiz?.createdAt)}</span>
                        </div>

                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            quiz?.status
                          )}`}
                        >
                          {quiz?.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>

                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {myQuizzes?.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No quizzes found
            </h3>
            <p className="text-muted-foreground mb-6">
              Get started by creating your first quiz
            </p>
            <Link to="/dashboard/create-quiz">
              <Button className="mx-auto cursor-pointer">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Quiz
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuizManagement;
