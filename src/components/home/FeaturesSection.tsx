import {
  BarChart3,
  Brain,
  Clock,
  Globe,
  Shield,
  Target,
  Users,
  Zap,
  Sparkles,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Question Generation",
      description:
        "Our advanced AI analyzes your curriculum and creates intelligent questions that challenge your understanding and boost retention rates.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Multi-Language Excellence",
      description:
        "Seamlessly switch between English, Bengali, and Hindi. Learn in your native language for maximum comprehension and comfort.",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    },
    {
      icon: Target,
      title: "Adaptive Difficulty System",
      description:
        "Smart difficulty adjustment based on your performance. The AI learns your strengths and focuses on areas that need improvement.",
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50",
      iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
    },
    {
      icon: Zap,
      title: "Lightning-Fast Results",
      description:
        "Get instant feedback with detailed explanations, correct answers, and personalized study recommendations in milliseconds.",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      iconBg: "bg-gradient-to-br from-yellow-500 to-orange-500",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics Dashboard",
      description:
        "Comprehensive performance tracking with visual charts, progress reports, and detailed insights into your learning patterns.",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50",
      iconBg: "bg-gradient-to-br from-indigo-500 to-blue-500",
    },
    {
      icon: Clock,
      title: "Flexible Learning Schedule",
      description:
        "Practice anytime, anywhere with customizable time limits. Perfect for quick revision sessions or intensive study marathons.",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
      icon: Users,
      title: "Complete Academic Coverage",
      description:
        "From primary school to university level. Covering Class 1-12, JSC, SSC, HSC, and higher education with subject expertise.",
      gradient: "from-teal-500 to-green-500",
      bgGradient: "from-teal-50 to-green-50",
      iconBg: "bg-gradient-to-br from-teal-500 to-green-500",
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description:
        "Your learning data is protected with bank-level encryption. Privacy-first approach ensures your information stays confidential.",
      gradient: "from-slate-500 to-gray-500",
      bgGradient: "from-slate-50 to-gray-50",
      iconBg: "bg-gradient-to-br from-slate-500 to-gray-500",
    },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 font-semibold mb-2 leading-tight">
            Why Choose <span className="text-primary">ExamAI Pro?</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-5xl mx-auto leading-relaxed font-light">
            Experience the next generation of intelligent learning with our
            revolutionary platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="group relative cursor-pointer">
                {/* Card */}
                <div className="relative h-80 bg-white rounded-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border border-gray-200 overflow-hidden">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-b from-primary/30 to-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                  <div className="relative z-10 flex flex-col items-center text-center space-y-6 h-full">
                    {/* Icon Container */}
                    <div className="relative">
                      <div
                        className={`w-18 h-18 rounded-2xl ${feature.iconBg} p-0.5 group-hover:scale-110 transition-all duration-300 group-hover:shadow-xl`}
                      >
                        <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-gray-700" />
                        </div>
                      </div>

                      {/* Floating sparkle */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-medium transition-colors duration-300 leading-tight">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed text-sm flex-grow transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
