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
import MyQuizzesPage from "@/pages/MyQuizzesPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import SettingsPage from "@/pages/SettingsPage";
import AboutPage from "@/pages/AboutPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import QuizResultPage from "@/pages/QuizResultPage";
import QuizAttemptsPage from "@/pages/QuizAttemptsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/terms",
        element: <TermsOfServicePage />,
      },
    ],
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
        path: "/dashboard/quiz-attempts",
        element: <QuizAttemptsPage />,
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
        path: "/dashboard/quiz-result/:attemptId",
        element: <QuizResultPage />,
      },
    ],
  },
  // Catch-all route for 404 pages
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export default router;
