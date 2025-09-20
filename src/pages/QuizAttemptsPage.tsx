import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Clock,
  Target,
  Trophy,
  Calendar,
  Eye,
  Minus,
  BookOpen,
  Timer
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Link } from 'react-router-dom';
import {
  useGetQuizAttemptsQuery,
  type AttemptsQueryParams
} from '@/redux/features/dashboard/dashboardApi';

const QuizAttemptsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState<AttemptsQueryParams>({
    page: 1,
    limit: 20,
  });

  // Redux hooks for API calls
  const {
    data: attemptsResponse,
    isLoading,
    error,
    refetch
  } = useGetQuizAttemptsQuery(queryParams);

  const attemptsData = attemptsResponse?.data;

  useEffect(() => {
    setQueryParams({
      page: currentPage,
      limit: 20,
    });
  }, [currentPage]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: {
        className: 'bg-green-100 text-green-800',
        text: 'Completed'
      },
      'in-progress': {
        className: 'bg-yellow-100 text-yellow-800',
        text: 'In Progress'
      },
      abandoned: {
        className: 'bg-red-100 text-red-800',
        text: 'Abandoned'
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
        {config.text}
      </span>
    );
  };

  const getDifficultyBadge = (difficulty: string) => {
    const difficultyConfig = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyConfig[difficulty as keyof typeof difficultyConfig]}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    );
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'text-green-600';
    if (grade === 'B+' || grade === 'B') return 'text-blue-600';
    if (grade === 'C+' || grade === 'C') return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

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
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <LoadingSpinner />
              <p className="mt-4 text-muted-foreground">Loading your quiz attempts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-red-500">Error loading quiz attempts</p>
              <Button onClick={() => refetch()} className="mt-4 cursor-pointer">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Quiz Attempts - ShikkhaPro Dashboard</title>
        <meta name="description" content="View and track all your quiz attempts and performance analytics." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Page Header */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Quiz Attempts</h1>
                  <p className="text-muted-foreground mt-1">
                    Track your quiz performance and attempts history
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Summary Stats */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Attempts</p>
                      <p className="text-2xl font-bold text-foreground">{attemptsData?.totalCount || 0}</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-green-600">{attemptsData?.completedCount || 0}</p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                      <p className="text-2xl font-bold text-yellow-600">{attemptsData?.inProgressCount || 0}</p>
                    </div>
                    <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Abandoned</p>
                      <p className="text-2xl font-bold text-red-600">{attemptsData?.abandonedCount || 0}</p>
                    </div>
                    <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Minus className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Filters and Search - Commented out for future implementation */}
            {/*
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search quiz titles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="abandoned">Abandoned</option>
                    </select>
                    <Button onClick={handleSearch} variant="outline" className="cursor-pointer">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
            */}

            {/* Attempts List */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quiz Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score & Grade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time & Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                <span className="text-gray-500">({attempt.percentage}%)</span>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`font-medium ${getGradeColor(attempt.grade)}`}>
                                  {attempt.grade}
                                </span>
                                <span className="text-gray-500">GPA: {attempt.gpa}</span>
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
                            {attempt.status === 'completed' ? (
                              <Link to={`/dashboard/quiz-result/${attempt.attemptId}`}>
                                <Button size="sm" variant="outline" className="cursor-pointer">
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

                {/* Pagination */}
                {attemptsData && attemptsData.pagination.totalPages > 1 && (
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700">
                        Page {attemptsData.pagination.page} of {attemptsData.pagination.totalPages}
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={!attemptsData.pagination.hasPrevPage}
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className={`${
                            !attemptsData.pagination.hasPrevPage
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer'
                          }`}
                        >
                          Previous
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={!attemptsData.pagination.hasNextPage}
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className={`${
                            !attemptsData.pagination.hasNextPage
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer'
                          }`}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default QuizAttemptsPage;