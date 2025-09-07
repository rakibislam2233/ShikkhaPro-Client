import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import router from "./routes/routes.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { QuizProvider } from "./contexts/QuizContext.tsx";
import { initializeDemoData } from "./utils/demoData.ts";
import { store } from "./redux/store.ts";

// Initialize demo data
initializeDemoData();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <AuthProvider>
          <QuizProvider>
            <RouterProvider router={router} />
          </QuizProvider>
        </AuthProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
