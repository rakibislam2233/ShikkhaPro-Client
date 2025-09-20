import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BookOpen, Users, Target, Heart, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const teamValues = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To revolutionize education by making personalized learning accessible to every student through AI-powered technology.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      description: "A world where every student can achieve their full potential through intelligent, adaptive learning experiences.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Innovation, accessibility, quality education, and empowering students to succeed in their academic journey.",
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  const features = [
    "AI-powered question generation",
    "Multi-language support (English, Bengali, Hindi)",
    "Adaptive difficulty system",
    "Comprehensive academic coverage",
    "Real-time performance analytics",
    "Personalized learning recommendations"
  ];

  return (
    <>
      <Helmet>
        <title>About Us - ShikkhaPro | AI-Powered Learning Platform</title>
        <meta name="description" content="Learn about ShikkhaPro's mission to transform education through AI-powered quiz generation and personalized learning experiences for students worldwide." />
        <meta name="keywords" content="about ShikkhaPro, AI education, learning platform, EdTech company, educational technology" />
      </Helmet>

      <div className="w-full pt-24 md:pt-28 lg:pt-32 xl:pt-40 min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                About <span className="text-primary">ShikkhaPro</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                We're on a mission to transform education through AI-powered learning solutions, 
                making quality education accessible to students from Class 1 to University level.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-3 bg-primary/10 px-6 py-3 rounded-full"
            >
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="font-medium text-primary">Empowering Education Since 2024</span>
            </motion.div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Foundation
              </h2>
              <p className="text-muted-foreground text-lg">
                The principles that drive our commitment to educational excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <motion.div
                    className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      <value.icon className={`w-8 h-8 ${value.color}`} />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                What Makes Us Different
              </h2>
              <p className="text-muted-foreground text-lg">
                Cutting-edge features designed for modern learning needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4"
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join thousands of students who are already experiencing the future of education
              </p>
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>Get Started Today</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;