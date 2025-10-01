import React from 'react';
import SEO from '../components/seo/SEO';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, FileCheck } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal Information: Name, email address, and educational level when you create an account",
        "Usage Data: Quiz performance, learning progress, and platform interaction data",
        "Technical Data: IP address, browser type, device information, and cookies",
        "Communication Data: Messages sent through our contact forms or support channels"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Provide and maintain our educational services",
        "Personalize your learning experience and quiz recommendations",
        "Track your progress and generate performance analytics",
        "Communicate with you about updates, features, and support",
        "Improve our platform based on usage patterns and feedback",
        "Ensure security and prevent fraud or abuse"
      ]
    },
    {
      title: "Information Sharing",
      icon: Shield,
      content: [
        "We do not sell, trade, or share your personal information with third parties",
        "Educational institutions may access student progress data only with proper authorization",
        "Service providers who help us operate the platform under strict confidentiality agreements",
        "Legal authorities when required by law or to protect our rights and safety"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "Industry-standard encryption for data transmission and storage",
        "Regular security audits and vulnerability assessments",
        "Secure servers with limited access controls",
        "Automatic logout and session management",
        "Regular backups with encrypted storage"
      ]
    },
    {
      title: "Your Rights",
      icon: FileCheck,
      content: [
        "Access: Request a copy of your personal data",
        "Correction: Update or correct inaccurate information",
        "Deletion: Request deletion of your account and associated data",
        "Portability: Export your learning data in a readable format",
        "Withdrawal: Opt-out of marketing communications at any time"
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Privacy Policy - ShikkhaPro | Data Protection & Privacy"
        description="ShikkhaPro's Privacy Policy outlines how we collect, use, and protect your personal information. Learn about your rights and our commitment to data security."
        keywords="privacy policy, data protection, user privacy, ShikkhaPro privacy, educational data security"
      />

      <div className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32 xl:pt-40 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-3 mb-6">
              <Shield className="w-12 h-12 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-4">
              Your privacy and data security are our top priorities
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { 
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
            <h2 className="text-2xl font-semibold mb-4">Our Commitment to Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              At ShikkhaPro, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              AI-powered educational platform. By using our services, you consent to the practices described in this policy.
            </p>
          </motion.div>

          {/* Policy Sections */}
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
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 bg-primary text-white rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Questions About Privacy?</h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us. We're here to help and ensure your privacy concerns are addressed.
            </p>
            <div className="space-y-2">
              <p className="text-white/90">Email: privacy@shikkhapro.com</p>
              <p className="text-white/90">Support: support@shikkhapro.com</p>
            </div>
          </motion.div>

          {/* Updates Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Policy Updates</h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. 
              Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;