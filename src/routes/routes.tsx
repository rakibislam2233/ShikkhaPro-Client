import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import DashboardLayout from "@/layout/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import HomePage from "@/pages/HomePage";
import QuizGeneratorPage from "@/pages/QuizGeneratorPage";
import QuizTakingPage from "@/pages/QuizTakingPage";
import ResultsPage from "@/pages/ResultsPage";
import MyQuizzesPage from "@/pages/MyQuizzesPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import SettingsPage from "@/pages/SettingsPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordForm />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordForm />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtpForm />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/create-quiz",
        element: <QuizGeneratorPage />,
      },
      {
        path: "/dashboard/my-quizzes",
        element: <MyQuizzesPage />,
      },
      {
        path: "/dashboard/analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "/dashboard/settings",
        element: <SettingsPage />,
      },
      {
        path: "/dashboard/quiz/:quizId",
        element: <QuizTakingPage />,
      },
      {
        path: "/dashboard/quiz/results/:quizId",
        element: <ResultsPage />,
      },
    ],
  },
]);
export default router;
