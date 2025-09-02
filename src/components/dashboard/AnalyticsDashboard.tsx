import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Target,
  Award,
  Download,
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('attempts');

  // Mock data for demonstration
  const overallStats = {
    totalAttempts: 1247,
    avgScore: 76.8,
    completionRate: 89.4,
    totalTime: 18650, // in minutes
    trends: {
      attempts: 12.5, // percentage change
      score: -2.1,
      completion: 5.8,
      time: -8.3
    }
  };

  const chartData = {
    attempts: [
      { day: 'Mon', value: 45 },
      { day: 'Tue', value: 52 },
      { day: 'Wed', value: 48 },
      { day: 'Thu', value: 61 },
      { day: 'Fri', value: 55 },
      { day: 'Sat', value: 38 },
      { day: 'Sun', value: 42 },
    ],
    scores: [
      { day: 'Mon', value: 78 },
      { day: 'Tue', value: 82 },
      { day: 'Wed', value: 75 },
      { day: 'Thu', value: 79 },
      { day: 'Fri', value: 85 },
      { day: 'Sat', value: 73 },
      { day: 'Sun', value: 77 },
    ]
  };

  const topQuizzes = [
    { id: '1', title: 'Mathematics - Algebra Basics', attempts: 156, avgScore: 84.2, completion: 92 },
    { id: '2', title: 'Physics - Motion and Forces', attempts: 134, avgScore: 78.9, completion: 88 },
    { id: '3', title: 'Chemistry - Periodic Table', attempts: 128, avgScore: 91.3, completion: 95 },
    { id: '4', title: 'Biology - Cell Structure', attempts: 98, avgScore: 76.5, completion: 85 },
    { id: '5', title: 'English - Grammar Basics', attempts: 87, avgScore: 82.1, completion: 91 },
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', avgScore: 78.5, attempts: 342, improvement: 5.2 },
    { subject: 'Physics', avgScore: 76.2, attempts: 298, improvement: -1.8 },
    { subject: 'Chemistry', avgScore: 85.1, attempts: 276, improvement: 8.7 },
    { subject: 'Biology', avgScore: 79.8, attempts: 198, improvement: 3.4 },
    { subject: 'English', avgScore: 82.3, attempts: 133, improvement: 6.1 },
  ];

  const difficultyBreakdown = [
    { level: 'Easy', count: 15, avgScore: 87.2, completion: 94 },
    { level: 'Medium', count: 28, avgScore: 73.8, completion: 86 },
    { level: 'Hard', count: 12, avgScore: 68.4, completion: 79 },
  ];

  const formatTrend = (value: number) => {
    const isPositive = value > 0;
    return (
      <div className={`flex items-center space-x-1 text-sm ${
        isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      }`}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span>{Math.abs(value)}%</span>
      </div>
    );
  };

  const maxValue = Math.max(...chartData.attempts.map(d => d.value));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track performance and insights across your quizzes
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:border-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Attempts</p>
              <p className="text-2xl font-bold text-foreground mt-1">{overallStats.totalAttempts.toLocaleString()}</p>
              {formatTrend(overallStats.trends.attempts)}
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Score</p>
              <p className="text-2xl font-bold text-foreground mt-1">{overallStats.avgScore}%</p>
              {formatTrend(overallStats.trends.score)}
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
              <p className="text-2xl font-bold text-foreground mt-1">{overallStats.completionRate}%</p>
              {formatTrend(overallStats.trends.completion)}
            </div>
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Time</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {Math.round(overallStats.totalTime / overallStats.totalAttempts)}m
              </p>
              {formatTrend(overallStats.trends.time)}
            </div>
            <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Quiz Activity</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant={selectedMetric === 'attempts' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMetric('attempts')}
              >
                Attempts
              </Button>
              <Button
                variant={selectedMetric === 'scores' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMetric('scores')}
              >
                Scores
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {chartData.attempts.map((item, index) => (
              <div key={item.day} className="flex items-center space-x-4">
                <div className="w-12 text-sm text-muted-foreground font-medium">
                  {item.day}
                </div>
                <div className="flex-1">
                  <div className="bg-muted rounded-full h-2 relative overflow-hidden">
                    <motion.div
                      className="bg-primary h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / maxValue) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </div>
                <div className="w-12 text-sm font-medium text-right">
                  {selectedMetric === 'attempts' ? item.value : `${chartData.scores[index].value}%`}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Performing Quizzes */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Top Performing Quizzes</h3>
          <div className="space-y-4">
            {topQuizzes.map((quiz, index) => (
              <div key={quiz.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{quiz.title}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{quiz.attempts} attempts</span>
                    <span>{quiz.avgScore}% avg</span>
                    <span>{quiz.completion}% completion</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Performance by Subject</h3>
          <div className="space-y-4">
            {subjectPerformance.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{subject.subject}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground">
                      {subject.attempts} attempts
                    </span>
                    <span className="text-sm font-medium">
                      {subject.avgScore}%
                    </span>
                    {formatTrend(subject.improvement)}
                  </div>
                </div>
                <div className="bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full"
                    style={{ width: `${subject.avgScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Difficulty Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Difficulty Analysis</h3>
          <div className="space-y-6">
            {difficultyBreakdown.map((level) => (
              <div key={level.level} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{level.level}</span>
                  <span className="text-xs text-muted-foreground">{level.count} quizzes</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Avg Score</span>
                      <span className="font-medium">{level.avgScore}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${level.avgScore}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium">{level.completion}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-green-500 h-full rounded-full"
                        style={{ width: `${level.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-500" />
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Chemistry quizzes</strong> have the highest average score (85.1%) and completion rate
            </p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>12.5% increase</strong> in quiz attempts over the selected period
            </p>
          </div>
          
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Hard difficulty</strong> quizzes need attention with 68.4% average score
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;