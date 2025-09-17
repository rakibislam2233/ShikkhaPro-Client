import { baseApi } from "../api/baseApi";

const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateQuiz: builder.mutation({
      query: (quizData) => ({
        url: "/quizzes/generate",
        method: "POST",
        body: quizData,
      }),
      invalidatesTags: ["Quiz"],
    }),
    getMyQuizzes: builder.query({
      query: () => ({
        url: "/quizzes/my-quizzes",
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),
    getQuizById: builder.query({
      query: (quizId) => ({
        url: `/quizzes/${quizId}`,
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),
    updateQuiz: builder.mutation({
      query: (quiz) => ({
        url: `/quizzes/${quiz.id}`,
        method: "PUT",
        body: quiz,
      }),
      invalidatesTags: ["Quiz"],
    }),
    deleteQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/quizzes/${quizId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),
    startQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/quizzes/attempt/start`,
        method: "POST",
        body: { quizId },
      }),
      invalidatesTags: ["Quiz"],
    }),
    submitAnswer: builder.mutation({
      query: (answerData) => ({
        url: "/quizzes/attempt/submit-quiz-answer",
        method: "POST",
        body: answerData,
      }),
      invalidatesTags: ["Quiz"],
    }),
    getQuizResult: builder.query({
      query: (attemptId) => ({
        url: `/quizzes/attempt/results/${attemptId}`,
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),
  }),
});

export const {
  useGenerateQuizMutation,
  useGetMyQuizzesQuery,
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
  useStartQuizMutation,
  useDeleteQuizMutation,
  useSubmitAnswerMutation,
  useGetQuizResultQuery,
} = quizApi;
