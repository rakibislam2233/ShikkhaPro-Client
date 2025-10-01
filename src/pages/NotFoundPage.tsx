import React from "react";
import SEO from "../components/seo/SEO";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  ArrowLeft,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        keywords="404, page not found, error"
        noIndex={true}
      />
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main 404 Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12"
        >
          {/* 404 Number with Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 1,
              type: "spring",
              stiffness: 100,
            }}
            className="relative"
          >
            <div className="text-8xl md:text-[10rem] font-bold bg-primary bg-clip-text text-transparent leading-none relative">
              4
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block text-gray-100"
              >
                0
              </motion.span>
              4
            </div>


            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8"
            >
              <HelpCircle className="w-8 h-8 md:w-12 md:h-12 text-secondary/60" />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Oops! Page Not Found
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={handleGoHome}
              size="lg"
              className="group bg-primary cursor-pointer text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
            >
              <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Return to Dashboard
              <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={handleGoBack}
              variant="outline"
              size="lg"
              className="group hover:bg-primary/5 cursor-pointer border-primary/20 hover:border-primary/40 px-8 py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            "The expert in anything was once a beginner." - Helen Hayes ⭐
          </p>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default NotFoundPage;
