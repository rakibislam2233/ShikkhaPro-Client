import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Copy,
  Share2,
  Play,
  Pause,
  BarChart3,
  Users,
  Calendar,
  Clock,
  BookOpen,
  Tag
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { Quiz } from '@/types/quiz.types';

interface QuizManagementProps {
  onCreateQuiz: () => void;
}

const QuizManagement: React.FC<QuizManagementProps> = ({ onCreateQuiz }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);

  // Mock data for demonstration
  const quizzes: (Quiz & { 
    attempts: number; 
    avgScore: number; 
    status: 'active' | 'draft' | 'archived';
    lastAttempt: string;
  })[] = [
    {
      id: '1',
      title: 'Mathematics - Algebra Basics',
      subject: 'Mathematics',
      academicLevel: 'Class 9',
      difficulty: 'medium',
      language: 'english',
      questions: [],
      timeLimit: 30,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      attempts: 23,
      avgScore: 78,
      status: 'active',
      lastAttempt: '2024-01-20T15:30:00Z'
    },
    {
      id: '2',
      title: 'Physics - Motion and Forces',
      subject: 'Physics',
      academicLevel: 'Class 10',
      difficulty: 'hard',
      language: 'english',
      questions: [],
      timeLimit: 45,
      createdAt: '2024-01-12T14:00:00Z',
      updatedAt: '2024-01-12T14:00:00Z',
      attempts: 18,
      avgScore: 82,
      status: 'active',
      lastAttempt: '2024-01-19T11:20:00Z'
    },
    {
      id: '3',
      title: 'Chemistry - Periodic Table',
      subject: 'Chemistry',
      academicLevel: 'Class 8',
      difficulty: 'easy',
      language: 'bengali',
      questions: [],
      timeLimit: 20,
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-10T09:00:00Z',
      attempts: 31,
      avgScore: 91,
      status: 'archived',
      lastAttempt: '2024-01-18T16:45:00Z'
    },
    {
      id: '4',
      title: 'English Literature - Poetry Analysis',
      subject: 'English',
      academicLevel: 'HSC',
      difficulty: 'medium',
      language: 'english',
      questions: [],
      timeLimit: 60,
      createdAt: '2024-01-08T11:30:00Z',
      updatedAt: '2024-01-08T11:30:00Z',
      attempts: 0,
      avgScore: 0,
      status: 'draft',
      lastAttempt: ''
    },
  ];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || quiz.status === filterBy;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'hard':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuizzes(prev => 
      prev.includes(quizId) 
        ? prev.filter(id => id !== quizId)
        : [...prev, quizId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on quizzes:`, selectedQuizzes);
    setSelectedQuizzes([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quiz Management</h1>
          <p className="text-muted-foreground mt-1">
            Create, edit, and manage your quiz collection
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={onCreateQuiz} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Quiz</span>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
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
                onClick={() => handleBulkAction('archive')}
              >
                Archive
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('delete')}
                className="text-red-600 hover:text-red-700"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Quiz List */}
      <div className="space-y-4">
        {filteredQuizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedQuizzes.includes(quiz.id)}
                  onChange={() => handleQuizSelect(quiz.id)}
                  className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-primary"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {quiz.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          <span>{quiz.subject}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Tag className="h-4 w-4" />
                          <span>{quiz.academicLevel}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm">
                          <span className="text-muted-foreground">Difficulty:</span>
                          <span className={`font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                            {quiz.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{quiz.timeLimit} min</span>
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quiz.status)}`}>
                          {quiz.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">{quiz.attempts}</div>
                            <div className="text-xs text-muted-foreground">Attempts</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">
                              {quiz.attempts > 0 ? `${quiz.avgScore}%` : 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Avg Score</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">
                              {formatDate(quiz.createdAt)}
                            </div>
                            <div className="text-xs text-muted-foreground">Created</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">
                              {formatDate(quiz.lastAttempt)}
                            </div>
                            <div className="text-xs text-muted-foreground">Last Attempt</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={quiz.status === 'active' ? 'text-orange-600' : 'text-green-600'}
                      >
                        {quiz.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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

        {filteredQuizzes.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No quizzes found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || filterBy !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first quiz'
              }
            </p>
            {!searchTerm && filterBy === 'all' && (
              <Button onClick={onCreateQuiz}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Quiz
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuizManagement;