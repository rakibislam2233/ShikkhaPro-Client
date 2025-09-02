import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, Play, BarChart3 } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: BookOpen,
      title: "Choose Your Subject",
      description:
        "Select your academic level, subject, and topic. Specify the type of questions you want to practice.",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      icon: Brain,
      title: "AI Generates Quiz",
      description:
        "Our advanced AI creates personalized questions tailored to your specifications in your preferred language.",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      icon: Play,
      title: "Take the Quiz",
      description:
        "Answer questions at your own pace with an intuitive interface. Flag difficult questions for review.",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      icon: BarChart3,
      title: "Review Results",
      description:
        "Get instant feedback with detailed explanations, performance analytics, and personalized recommendations.",
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create and take AI-powered quizzes in just four simple steps. It's
            that easy to supercharge your learning!
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-72  dark:border-gray-700 rounded-xl cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border border-gray-200 p-5 text-center group relative overflow-hidden"
            >
              {/* Step number */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>

              <div className="flex flex-col items-center space-y-4">
                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 rounded-2xl ${step.bgColor} ${step.borderColor} border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 bg-primary rounded-2xl p-6 text-white">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold mb-1">
                Ready to get started?
              </h3>
              <p className="text-blue-100">
                Create your first AI-powered quiz in minutes!
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
