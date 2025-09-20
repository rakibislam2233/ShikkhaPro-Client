import { baseApi } from "../api/baseApi";

// Dashboard API interfaces
export interface DashboardSummary {
  totalQuizzes: number;
  totalAttempts: number;
  completedQuizzes: number;
  averageScore: number;
  averagePercentage: number;
  rank: number;
  streakDays: number;
  lastActivityAt: string;
}

export interface QuizAttempt {
  attemptId: string;
  quizId: string;
  quizTitle: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  score: number;
  totalScore: number;
  percentage: number;
  grade: string;
  gpa: number;
  timeSpent: number;
  status: 'completed' | 'in-progress' | 'abandoned';
  startedAt: string;
  completedAt?: string;
  createdAt: string;
}

export interface AttemptsFilters {
  status?: string;
  search?: string;
  subject?: string;
  difficulty?: string;
}

export interface AttemptsResponse {
  attempts: QuizAttempt[];
  totalCount: number;
  completedCount: number;
  inProgressCount: number;
  abandonedCount: number;
  filters: AttemptsFilters;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface RecentActivity {
  attemptId: string;
  quizId: string;
  quizTitle: string;
  subject: string;
  topic: string;
  score: number;
  totalScore: number;
  percentage: number;
  grade: string;
  gpa: number;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completedAt: string;
  status: 'completed' | 'in-progress' | 'abandoned';
}

export interface AttemptsQueryParams {
  page?: number;
  limit?: number;
  status?: 'completed' | 'in-progress' | 'abandoned';
  search?: string;
  subject?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get dashboard summary
    getDashboardSummary: builder.query<
      { code: number; message: string; data: DashboardSummary },
      void
    >({
      query: () => ({
        url: "/dashboard/summary",
        method: "GET",
      }),
      providesTags: ["Dashboard", "Quiz"],
    }),

    // Get quiz attempts with pagination and filters
    getQuizAttempts: builder.query<
      { code: number; message: string; data: AttemptsResponse },
      AttemptsQueryParams | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.limit) searchParams.append('limit', params.limit.toString());
        if (params?.status) searchParams.append('status', params.status);
        if (params?.search) searchParams.append('search', params.search);

        return {
          url: `/dashboard/attempts${searchParams.toString() ? `?${searchParams.toString()}` : ''}`,
          method: "GET",
        };
      },
      providesTags: ["Dashboard", "Quiz"],
    }),

    // Get recent activity
    getRecentActivity: builder.query<
      { code: number; message: string; data: RecentActivity[] },
      void
    >({
      query: () => ({
        url: "/dashboard/recent-activity",
        method: "GET",
      }),
      providesTags: ["Dashboard", "Quiz"],
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetQuizAttemptsQuery,
  useGetRecentActivityQuery,
} = dashboardApi;

export default dashboardApi;