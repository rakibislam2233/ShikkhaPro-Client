import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import DashboardLayout from "@/layout/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import HomePage from "@/pages/HomePage";
import QuizGeneratorPage from "@/pages/QuizGeneratorPage";
import QuizTakingPage from "@/pages/QuizTakingPage";
import ResultsPage from "@/pages/ResultsPage";
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
    element: <ForgotPasswordForm />,
  },
  {
    path: "/otp",
    element: <ForgotPasswordForm />,
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
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/analytics",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/settings",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/quiz/:quizId",
        element: <QuizTakingPage />,
      },
      {
        path: "/dashboard/quiz/:quizId/results",
        element: <ResultsPage />,
      },
    ],
  },
]);
export default router;
