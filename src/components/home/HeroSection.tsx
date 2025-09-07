import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ArrowRight, Sparkles, BookOpen, Brain } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const HeroSection: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative pt-24 md:pt-28 lg:pt-32 xl:pt-40 flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/30 to-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-9"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <Badge
              variant="outline"
              className="px-6 py-2 text-base font-medium border-primary/20 bg-primary/5"
            >
              <motion.span
                initial={{ scale: 1,rotate:0 }}
                animate={{
                  scale: [1, 1.3, 1], 
                  rotate: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-4 h-4 mr-2 text-primary " />
              </motion.span>
              AI-Powered Learning Revolution
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-6">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  tracking-tight text-foreground font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="block gradient-text mb-2">
                Master Every Subject
              </span>
              <span className="block text-foreground">
                with <span className="text-primary">Smart Quizzes</span>
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Revolutionize your exam preparation with our intelligent Q&A
              generator. Create unlimited practice questions for any subject and
              competitive exams with just a few clicks.
            </motion.p>
          </div>

          {/* Key Benefits */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-medium">Adaptive AI Learning</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-medium">All Subjects Covered</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-medium">Instant Question Generation</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-5 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {isAuthenticated ? (
              <>
                <Link to="/dashboard/create-quiz">
                  <Button
                    size="lg"
                    variant="default"
                    className="group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Create Your First Quiz
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    size="default"
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/5 transition-all duration-300"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Go to Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button
                    size="lg"
                    variant="default"
                    className="group cursor-pointer transition-all duration-300 transform hover:scale-102"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Learning Free
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto cursor-pointer">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full max-w-56 group cursor-pointer transition-all duration-300 hover:scale-102"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
          {/* Social Proof */}
          <motion.div
            className="pt-10 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
              Trusted by Students Across Bangladesh
            </p>
            <div className="flex justify-center items-center space-x-8 text-muted-foreground/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm">Questions Generated</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm">Active Students</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm">Subjects Covered</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="hidden md:absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-primary/20 text-6xl"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          📚
        </motion.div>
        <motion.div
          className="absolute top-40 right-16 text-primary/20 text-5xl"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          🧠
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 text-primary/20 text-4xl"
          animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-primary/20 text-5xl"
          animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          🎓
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
