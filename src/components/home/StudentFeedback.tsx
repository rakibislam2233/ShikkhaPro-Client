import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Feedback {
  id: number;
  name: string;
  designation: string;
  institution: string;
  rating: number;
  comment: string;
  avatar: string;
  subject: string;
}

const StudentFeedback: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Demo feedback data
  const feedbacks: Feedback[] = [
    {
      id: 1,
      name: "Arif Rahman",
      designation: "Class 12 Student",
      institution: "Dhaka College",
      rating: 5,
      comment: "ShikkhaPro has completely transformed my study routine! The AI-generated quizzes are perfectly tailored to my learning level. I've improved my scores significantly in Physics and Mathematics.",
      avatar: "AR",
      subject: "Science"
    },
    {
      id: 2,
      name: "Fatima Khatun",
      designation: "HSC Candidate",
      institution: "Viqarunnisa Noon School",
      rating: 5,
      comment: "The personalized feedback and detailed explanations help me understand my weak areas. The English and Bengali quizzes are especially helpful for my exam preparation.",
      avatar: "FK",
      subject: "Humanities"
    },
    {
      id: 3,
      name: "Mohammad Hassan",
      designation: "University Student",
      institution: "BUET",
      rating: 4,
      comment: "As an engineering student, I love how the platform adapts to different difficulty levels. The instant feedback feature saves me so much time in identifying my mistakes.",
      avatar: "MH",
      subject: "Engineering"
    },
    {
      id: 4,
      name: "Rashida Begum",
      designation: "Class 10 Student",
      institution: "Ideal School",
      rating: 5,
      comment: "The Bengali interface makes it so easy for me to understand. My parents are amazed at how much my grades have improved since I started using ShikkhaPro!",
      avatar: "RB",
      subject: "General"
    },
    {
      id: 5,
      name: "Tanzil Ahmed",
      designation: "Masters Student",
      institution: "Dhaka University",
      rating: 4,
      comment: "The advanced analytics help me track my progress over time. It's like having a personal tutor available 24/7. Highly recommended for serious students!",
      avatar: "TA",
      subject: "Research"
    },
    {
      id: 6,
      name: "Nabila Islam",
      designation: "A-Level Student",
      institution: "International School Dhaka",
      rating: 5,
      comment: "The multi-language support is fantastic! I can practice in both English and Bengali. The difficulty progression keeps me challenged but not overwhelmed.",
      avatar: "NI",
      subject: "International"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, feedbacks.length]);

  const handlePrevious = () => {
    setIsAutoScrolling(false);
    setCurrentIndex(currentIndex === 0 ? feedbacks.length - 1 : currentIndex - 1);
    // Resume auto-scroll after 10 seconds
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex(currentIndex === feedbacks.length - 1 ? 0 : currentIndex + 1);
    // Resume auto-scroll after 10 seconds
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const handleDotClick = (index: number) => {
    setIsAutoScrolling(false);
    setCurrentIndex(index);
    // Resume auto-scroll after 10 seconds
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-primary">Students Say</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how ShikkhaPro is transforming learning experiences for thousands of students across Bangladesh
          </p>
        </motion.div>

        {/* Feedback Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-50 p-4 bg-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 cursor-pointer border border-gray-100 hover:border-primary/20"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-50 p-4 bg-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 cursor-pointer border border-gray-100 hover:border-primary/20"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Feedback Cards */}
          <div className="relative min-h-[500px] md:min-h-[450px] overflow-visible">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 z-30"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 h-full flex flex-col justify-between border border-gray-100 relative">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <Quote className="w-12 h-12 text-primary/30" />
                  </div>

                  {/* Feedback Content */}
                  <div className="flex-1 text-center">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                      "{feedbacks[currentIndex].comment}"
                    </p>

                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                      {renderStars(feedbacks[currentIndex].rating)}
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {feedbacks[currentIndex].avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {feedbacks[currentIndex].name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feedbacks[currentIndex].designation}
                      </p>
                      <p className="text-primary text-sm font-medium">
                        {feedbacks[currentIndex].institution}
                      </p>
                    </div>
                  </div>

                  {/* Subject Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {feedbacks[currentIndex].subject}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {feedbacks.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-scroll indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className={`w-2 h-2 rounded-full ${isAutoScrolling ? 'bg-green-400' : 'bg-gray-400'}`} />
              <span>{isAutoScrolling ? 'Auto-scrolling' : 'Manual control'}</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
            <div className="text-gray-600">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.8/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-gray-600">Quizzes Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentFeedback;