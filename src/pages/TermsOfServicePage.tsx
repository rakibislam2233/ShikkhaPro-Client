import React from 'react';
import SEO from '../components/seo/SEO';
import { motion } from 'framer-motion';
import { FileText, Users, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        "By accessing or using ShikkhaPro, you agree to be bound by these Terms of Service",
        "If you disagree with any part of these terms, you may not access the service",
        "These terms apply to all visitors, users, and others who access or use the service",
        "We reserve the right to update these terms at any time with notice to users"
      ]
    },
    {
      title: "User Accounts",
      icon: Users,
      content: [
        "You must create an account to access certain features of our platform",
        "You are responsible for safeguarding your account password and all activities under your account",
        "You must provide accurate and complete information when creating your account",
        "You must be at least 13 years old to create an account (parental consent required for minors)",
        "One person may not maintain multiple accounts for the same purpose"
      ]
    },
    {
      title: "Acceptable Use",
      icon: CheckCircle,
      content: [
        "Use the platform for legitimate educational purposes only",
        "Do not share your account credentials with others",
        "Respect intellectual property rights and do not copy or distribute content without permission",
        "Do not attempt to hack, disrupt, or compromise the security of our platform",
        "Do not engage in any activity that interferes with other users' access to the service"
      ]
    },
    {
      title: "Prohibited Activities",
      icon: XCircle,
      content: [
        "Using the service for any unlawful purpose or to violate any laws",
        "Transmitting viruses, malware, or other harmful computer code",
        "Attempting to gain unauthorized access to our systems or user accounts",
        "Harassing, threatening, or intimidating other users",
        "Creating fake accounts or impersonating others",
        "Commercial use of the platform without written permission"
      ]
    },
    {
      title: "Content and Intellectual Property",
      icon: FileText,
      content: [
        "All content on ShikkhaPro, including quizzes, questions, and educational materials, is our property",
        "You may not reproduce, distribute, or create derivative works without permission",
        "User-generated content remains your property, but you grant us a license to use it",
        "We respect intellectual property rights and will respond to valid DMCA notices",
        "AI-generated content is provided for educational purposes under fair use guidelines"
      ]
    },
    {
      title: "Service Availability",
      icon: AlertTriangle,
      content: [
        "We strive to maintain high availability but cannot guarantee uninterrupted service",
        "Scheduled maintenance will be announced in advance when possible",
        "We reserve the right to modify or discontinue features with notice",
        "Service interruptions may occur due to technical issues beyond our control",
        "We are not liable for any damages resulting from service unavailability"
      ]
    }
  ];

  const warningItems = [
    "Educational content is provided for informational purposes only",
    "Quiz results do not constitute official academic assessment",
    "We are not responsible for academic decisions based solely on our platform",
    "Users should verify important information through official educational sources"
  ];

  return (
    <>
      <SEO
        title="Terms of Service - ShikkhaPro | User Agreement & Guidelines"
        description="ShikkhaPro's Terms of Service outline the rules and guidelines for using our AI-powered educational platform. Learn about user responsibilities and platform policies."
        keywords="terms of service, user agreement, platform rules, ShikkhaPro terms, educational platform guidelines"
      />

      <div className="w-full pt-24 md:pt-28 lg:pt-32 xl:pt-40 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-3 mb-6">
              <FileText className="w-12 h-12 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Terms of Service
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-4">
              Please read these terms carefully before using ShikkhaPro
            </p>
            <p className="text-sm text-muted-foreground">
              Effective Date: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 rounded-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-semibold mb-4">Welcome to ShikkhaPro</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service ("Terms") govern your use of ShikkhaPro's AI-powered educational platform 
              and services. By creating an account or using our services, you agree to comply with these Terms. 
              Please read them carefully and contact us if you have any questions.
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    section.icon === XCircle ? 'bg-red-100' : 
                    section.icon === AlertTriangle ? 'bg-amber-100' : 'bg-primary/10'
                  }`}>
                    <section.icon className={`w-6 h-6 ${
                      section.icon === XCircle ? 'text-red-600' : 
                      section.icon === AlertTriangle ? 'text-amber-600' : 'text-primary'
                    }`} />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        section.icon === XCircle ? 'bg-red-500' : 
                        section.icon === AlertTriangle ? 'bg-amber-500' : 'bg-primary'
                      }`}></div>
                      <p className="text-muted-foreground leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>

          {/* Important Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 bg-amber-50 border border-amber-200 rounded-xl p-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <h3 className="text-xl font-semibold text-amber-800">Important Disclaimer</h3>
            </div>
            <ul className="space-y-2">
              {warningItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-amber-700 text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Termination Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 bg-red-50 border border-red-200 rounded-xl p-8"
          >
            <h3 className="text-lg font-semibold text-red-800 mb-4">Account Termination</h3>
            <p className="text-red-700 text-sm leading-relaxed mb-4">
              We reserve the right to terminate or suspend accounts that violate these Terms of Service. 
              Users may also delete their accounts at any time through the account settings.
            </p>
            <div className="space-y-2">
              <p className="text-red-700 text-sm">• Violation warnings will be issued before termination when appropriate</p>
              <p className="text-red-700 text-sm">• Serious violations may result in immediate account suspension</p>
              <p className="text-red-700 text-sm">• Users have the right to appeal termination decisions</p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 bg-primary text-white rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Questions About These Terms?</h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              If you have any questions about these Terms of Service or need clarification on any policies, 
              please contact our support team. We're here to help ensure you have a great experience on our platform.
            </p>
            <div className="space-y-2">
              <p className="text-white/90">Email: legal@shikkhapro.com</p>
              <p className="text-white/90">Support: support@shikkhapro.com</p>
            </div>
          </motion.div>

          {/* Last Updated Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>
              These Terms of Service may be updated periodically. Users will be notified of significant changes 
              via email or platform notifications. Continued use of the service constitutes acceptance of updated terms.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;