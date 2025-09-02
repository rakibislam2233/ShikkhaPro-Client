import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import router from "./routes/routes.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { QuizProvider } from "./contexts/QuizContext.tsx";
import { initializeDemoData } from "./utils/demoData.ts";

// Initialize demo data
initializeDemoData();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <QuizProvider>
            <RouterProvider router={router} />
          </QuizProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
