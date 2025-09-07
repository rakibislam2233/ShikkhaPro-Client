import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import router from "./routes/routes.tsx";
import { QuizProvider } from "./contexts/QuizContext.tsx";
import { initializeDemoData } from "./utils/demoData.ts";
import { store } from "./redux/store.ts";
import { Toaster } from "./components/ui/sonner.tsx";

// Initialize demo data
initializeDemoData();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
          <QuizProvider>
            <RouterProvider router={router} />
            <Toaster richColors />
          </QuizProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
