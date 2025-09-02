import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { QuizProvider } from './contexts/QuizContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import QuizGeneratorPage from './pages/QuizGeneratorPage';
import QuizTakingPage from './pages/QuizTakingPage';
import ResultsPage from './pages/ResultsPage';
import { ANIMATION_VARIANTS } from './utils/constants';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QuizProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <motion.div
                        variants={ANIMATION_VARIANTS.pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                      >
                        <HomePage />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/login" 
                    element={
                      <motion.div
                        variants={ANIMATION_VARIANTS.pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                      >
                        <LoginPage />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/register" 
                    element={
                      <motion.div
                        variants={ANIMATION_VARIANTS.pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                      >
                        <RegisterPage />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/forgot-password" 
                    element={
                      <motion.div
                        variants={ANIMATION_VARIANTS.pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                      >
                        <ForgotPasswordPage />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <motion.div
                        variants={ANIMATION_VARIANTS.pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                      >
                        <DashboardPage />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/create-quiz" 
                    element={
                      <motion.div
                        variants={ANIMATION_VARIANTS.pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                      >
                        <QuizGeneratorPage />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/quiz/:quizId" 
                    element={
                      <motion.div
                        variants={ANIMATION_VARIANTS.pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                      >
                        <QuizTakingPage />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/results/:attemptId" 
                    element={
                      <motion.div
                        variants={ANIMATION_VARIANTS.pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                      >
                        <ResultsPage />
                      </motion.div>
                    } 
                  />
                </Routes>
              </AnimatePresence>
            </div>
          </Router>
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;