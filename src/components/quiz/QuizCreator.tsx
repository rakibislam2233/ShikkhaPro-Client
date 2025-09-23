import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Brain,
  Target,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FileText,
  CheckCircle,
  PlusCircle,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { Badge } from "../ui/Badge";
import { Progress } from "../ui/Progress";
import {
  ACADEMIC_LEVELS,
  QUESTION_TYPES,
  DIFFICULTY_LEVELS,
  LANGUAGES,
  QUESTION_COUNT_OPTIONS,
  SUBJECT_SUGGESTIONS,
} from "../../utils/constants";
import { quizConfigSchema } from "../../utils/validation.utils";
import { cn } from "@/lib/utils";
import type {
  QuestionType,
  QuizConfig,
  QuizDifficulty,
  QuizLanguage,
} from "@/types/quiz.types";
import { useGenerateQuizMutation } from "@/redux/features/quiz/quizApi";
import type { TError } from "@/types/erro";
import { toast } from "sonner";

const steps = [
  {
    id: 1,
    title: "Academic Level",
    description: "Select your academic level",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Subject & Topic",
    description: "What do you want to study?",
    icon: Brain,
  },
  {
    id: 3,
    title: "Quiz Preferences",
    description: "Customize your quiz",
    icon: Target,
  },
  {
    id: 4,
    title: "Generate Quiz",
    description: "Let AI create your quiz",
    icon: Sparkles,
  },
];

const QuizCreator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  // generate quiz
  const [generateQuiz] = useGenerateQuizMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<QuizConfig>({
    resolver: zodResolver(quizConfigSchema),
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      academicLevel: "ssc",
      subject: "",
      topic: "",
      language: "english",
      questionType: "mcq",
      difficulty: "medium",
      questionCount: 10,
      instructions: "",
    },
  });

  const watchedValues = watch();

  // Handle language selection logic based on subject
  React.useEffect(() => {
    const currentSubject = watchedValues.subject?.toLowerCase();

    // List of common English subjects
    const englishSubjects = [
      "english",
      "english literature",
      "literature",
      "grammar",
      "vocabulary",
      "ielts",
      "toefl",
      "sat",
      "gre",
      "speaking",
      "writing",
      "reading",
      "listening",
    ];

    // If user selects an English subject, keep language as English and don't auto-select Bengali
    if (
      currentSubject &&
      englishSubjects.some((subject) => currentSubject.includes(subject))
    ) {
      if (watchedValues.language !== "english") {
        setValue("language", "english");
      }
    }
  }, [watchedValues.subject, watchedValues.language, setValue]);

  const nextStep = async () => {
    const fieldsToValidate = {
      1: ["academicLevel"],
      2: ["subject", "topic"],
      3: ["language", "questionType", "difficulty", "questionCount"],
    };

    const currentFields =
      fieldsToValidate[currentStep as keyof typeof fieldsToValidate];
    if (currentFields) {
      const isValid = await trigger(currentFields as (keyof QuizConfig)[]);
      if (!isValid) return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: QuizConfig) => {
    setIsGenerating(true);
    try {
      const res = await generateQuiz(data).unwrap();
      navigate(`/dashboard/quiz/${res?.data?.quizId}`);
    } catch (error) {
      const err = error as TError;
      toast.error(err.data.message || "Failed to generate quiz");
      setIsGenerating(false);
    }
  };

  const getSubjectSuggestions = () => {
    return SUBJECT_SUGGESTIONS[watchedValues.academicLevel] || [];
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto w-16 h-16 bg-primary  rounded-2xl flex items-center justify-center shadow-lg"
              >
                <BookOpen className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold text-primary">
                  Select Your Academic Level
                </h2>
                <p className="text-muted-foreground mt-2 text-lg">
                  Choose the education level that matches your current studies
                </p>
              </div>
            </div>

            {/* Academic Level Groups */}
            <div className="space-y-8">
              {/* Pre-Primary & Primary */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 pb-2 border-b border-border/50">
                  <div className="w-10 h-10 border border-gray-300 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🎈</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Pre-Primary & Primary
                    </h3>
                    <p className="text-sm text-muted-foreground">Ages 3-11</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {ACADEMIC_LEVELS.filter((level) =>
                    [
                      "playgroup",
                      "nursery",
                      "kg",
                      "class-1",
                      "class-2",
                      "class-3",
                      "class-4",
                      "class-5",
                    ].includes(level.value)
                  ).map((level, index) => (
                    <motion.div
                      key={level.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                    >
                      <label
                        className={cn(
                          "group relative flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all duration-300",
                          watchedValues.academicLevel === level.value
                            ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 text-primary"
                            : "border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm"
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value={level.value}
                          checked={watchedValues.academicLevel === level.value}
                          onChange={() =>
                            setValue("academicLevel", level.value)
                          }
                        />
                        {watchedValues.academicLevel === level.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                        <span className="text-sm font-semibold text-center">
                          {level.label}
                        </span>
                        <span className="text-xs text-center text-muted-foreground mt-2 line-clamp-2 group-hover:text-foreground/70">
                          {level.description}
                        </span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Secondary */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 pb-2 border-b border-border/50">
                  <div className="w-10 h-10 border bg-cya border-gray-300 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🎉</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Secondary Education
                    </h3>
                    <p className="text-sm text-muted-foreground">Ages 11-16</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {ACADEMIC_LEVELS.filter((level) =>
                    [
                      "class-6",
                      "class-7",
                      "class-8",
                      "jsc",
                      "class-9",
                      "class-10",
                      "ssc",
                    ].includes(level.value)
                  ).map((level, index) => (
                    <motion.div
                      key={level.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                    >
                      <label
                        className={cn(
                          "group relative flex flex-col items-center p-4 border rounded-xl cursor-pointer",
                          watchedValues.academicLevel === level.value
                            ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 text-primary"
                            : "border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm"
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value={level.value}
                          checked={watchedValues.academicLevel === level.value}
                          onChange={() =>
                            setValue("academicLevel", level.value)
                          }
                        />
                        {watchedValues.academicLevel === level.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                        <span className="text-sm font-semibold text-center">
                          {level.label}
                        </span>
                        <span className="text-xs text-center text-muted-foreground mt-2 line-clamp-2 group-hover:text-foreground/70">
                          {level.description}
                        </span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Higher Secondary */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 pb-2 border-b border-border/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Higher Secondary
                    </h3>
                    <p className="text-sm text-muted-foreground">Ages 17-18</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {ACADEMIC_LEVELS.filter((level) =>
                    ["class-11", "class-12", "hsc"].includes(level.value)
                  ).map((level, index) => (
                    <motion.div
                      key={level.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                    >
                      <label
                        className={cn(
                          "group relative flex flex-col items-center p-4 border rounded-xl cursor-pointer",
                          watchedValues.academicLevel === level.value
                            ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 text-primary"
                            : "border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm"
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value={level.value}
                          checked={watchedValues.academicLevel === level.value}
                          onChange={() =>
                            setValue("academicLevel", level.value)
                          }
                        />
                        {watchedValues.academicLevel === level.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                        <span className="text-sm font-semibold text-center">
                          {level.label}
                        </span>
                        <span className="text-xs text-center text-muted-foreground mt-2 line-clamp-2 group-hover:text-foreground/70">
                          {level.description}
                        </span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Undergraduate */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 pb-2 border-b border-border/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Undergraduate
                    </h3>
                    <p className="text-sm text-muted-foreground">Ages 18-22</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {ACADEMIC_LEVELS.filter((level) =>
                    [
                      "bachelor",
                      "bsc",
                      "ba",
                      "bcom",
                      "bba",
                      "btech",
                      "beng",
                    ].includes(level.value)
                  ).map((level, index) => (
                    <motion.div
                      key={level.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + index * 0.05, duration: 0.4 }}
                    >
                      <label
                        className={cn(
                          "group relative flex flex-col items-center p-4 border rounded-xl cursor-pointer",
                          watchedValues.academicLevel === level.value
                            ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 text-primary"
                            : "border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm"
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value={level.value}
                          checked={watchedValues.academicLevel === level.value}
                          onChange={() =>
                            setValue("academicLevel", level.value)
                          }
                        />
                        {watchedValues.academicLevel === level.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                        <span className="text-sm font-semibold text-center">
                          {level.label}
                        </span>
                        <span className="text-xs text-center text-muted-foreground mt-2 line-clamp-2 group-hover:text-foreground/70">
                          {level.description}
                        </span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Postgraduate */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 pb-2 border-b border-border/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Postgraduate
                    </h3>
                    <p className="text-sm text-muted-foreground">Ages 22+</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {ACADEMIC_LEVELS.filter((level) =>
                    [
                      "master",
                      "msc",
                      "ma",
                      "mcom",
                      "mba",
                      "mtech",
                      "meng",
                    ].includes(level.value)
                  ).map((level, index) => (
                    <motion.div
                      key={level.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.05, duration: 0.4 }}
                    >
                      <label
                        className={cn(
                          "group relative flex flex-col items-center p-4 border rounded-xl cursor-pointer",
                          watchedValues.academicLevel === level.value
                            ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 text-primary"
                            : "border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm"
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value={level.value}
                          checked={watchedValues.academicLevel === level.value}
                          onChange={() =>
                            setValue("academicLevel", level.value)
                          }
                        />
                        {watchedValues.academicLevel === level.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                        <span className="text-sm font-semibold text-center">
                          {level.label}
                        </span>
                        <span className="text-xs text-center text-muted-foreground mt-2 line-clamp-2 group-hover:text-foreground/70">
                          {level.description}
                        </span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Professional & Competitive */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 pb-2 border-b border-border/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-xl">💼</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Professional & Competitive Exams
                    </h3>
                    <p className="text-sm text-muted-foreground">Career focused</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {ACADEMIC_LEVELS.filter((level) =>
                    [
                      "bcs",
                      "bank-job",
                      "medical",
                      "engineering",
                      "university",
                      "ielts",
                      "toefl",
                      "gre",
                      "sat",
                    ].includes(level.value)
                  ).map((level, index) => (
                    <motion.div
                      key={level.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + index * 0.05, duration: 0.4 }}
                    >
                      <label
                        className={cn(
                          "group relative flex flex-col items-center p-4 border rounded-xl cursor-pointer",
                          watchedValues.academicLevel === level.value
                            ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 text-primary"
                            : "border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm"
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value={level.value}
                          checked={watchedValues.academicLevel === level.value}
                          onChange={() =>
                            setValue("academicLevel", level.value)
                          }
                        />
                        {watchedValues.academicLevel === level.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                        <span className="text-sm font-semibold text-center">
                          {level.label}
                        </span>
                        <span className="text-xs text-center text-muted-foreground mt-2 line-clamp-2 group-hover:text-foreground/70">
                          {level.description}
                        </span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Professional Development */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 pb-2 border-b border-border/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-xl">🛠️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Professional Development
                    </h3>
                    <p className="text-sm text-muted-foreground">Skill enhancement</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {ACADEMIC_LEVELS.filter((level) =>
                    [
                      "professional",
                      "skill-development",
                      "certification",
                      "adult-learning",
                      "general",
                    ].includes(level.value)
                  ).map((level, index) => (
                    <motion.div
                      key={level.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
                    >
                      <label
                        className={cn(
                          "group relative flex flex-col items-center p-4 border rounded-xl cursor-pointer",
                          watchedValues.academicLevel === level.value
                            ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 text-primary"
                            : "border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm"
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value={level.value}
                          checked={watchedValues.academicLevel === level.value}
                          onChange={() =>
                            setValue("academicLevel", level.value)
                          }
                        />
                        {watchedValues.academicLevel === level.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                        <span className="text-sm font-semibold text-center">
                          {level.label}
                        </span>
                        <span className="text-xs text-center text-muted-foreground mt-2 line-clamp-2 group-hover:text-foreground/70">
                          {level.description}
                        </span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {errors.academicLevel && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center"
              >
                <p className="text-destructive text-sm font-medium">
                  {errors.academicLevel.message}
                </p>
              </motion.div>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Subject & Topic</h2>
              <p className="text-muted-foreground">
                Tell us what you'd like to practice
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics, Physics, History"
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-destructive text-sm">
                    {errors.subject.message}
                  </p>
                )}

                {/* Subject Suggestions */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {getSubjectSuggestions()
                    .slice(0, 6)
                    .map((suggestion) => (
                      <Badge
                        key={suggestion}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => setValue("subject", suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Specific Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Quadratic Equations, Photosynthesis, World War II"
                  {...register("topic")}
                />
                {errors.topic && (
                  <p className="text-destructive text-sm">
                    {errors.topic.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Be specific to get more targeted questions
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">
                  Additional Instructions (Optional)
                </Label>
                <Textarea
                  id="instructions"
                  placeholder="Any specific requirements or focus areas..."
                  rows={3}
                  {...register("instructions")}
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Quiz Preferences</h2>
              <p className="text-muted-foreground">
                Customize your quiz settings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Language Selection */}
              <div className="space-y-3">
                <Label>Language</Label>
                <RadioGroup
                  value={watchedValues.language}
                  onValueChange={(value) =>
                    setValue("language", value as QuizLanguage)
                  }
                >
                  {LANGUAGES.map((lang) => (
                    <div
                      key={lang.value}
                      className="flex items-center cursor-pointer space-x-2"
                    >
                      <RadioGroupItem value={lang.value} id={lang.value} />
                      <Label
                        htmlFor={lang.value}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                        <span className="text-muted-foreground">
                          ({lang.nativeName})
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Question Type */}
              <div className="space-y-3">
                <Label>Question Type</Label>
                <RadioGroup
                  value={watchedValues.questionType}
                  onValueChange={(value) =>
                    setValue("questionType", value as QuestionType)
                  }
                >
                  {QUESTION_TYPES.map((type) => (
                    <div
                      key={type.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={type.value}
                        id={type.value}
                        className="cursor-pointer"
                      />
                      <Label
                        htmlFor={type.value}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <span>{type.icon}</span>
                        <div>
                          <div>{type.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {type.description}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Difficulty */}
              <div className="space-y-3">
                <Label>Difficulty Level</Label>
                <RadioGroup
                  value={watchedValues.difficulty}
                  onValueChange={(value) =>
                    setValue("difficulty", value as QuizDifficulty)
                  }
                >
                  {DIFFICULTY_LEVELS.map((level) => (
                    <div
                      key={level.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={level.value}
                        id={level.value}
                        className="cursor-pointer"
                      />
                      <Label htmlFor={level.value} className="cursor-pointer">
                        <span className={cn("font-medium", level.color)}>
                          {level.label}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {level.description}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Question Count */}
              <div className="space-y-3">
                <Label>Number of Questions</Label>
                <div className="flex flex-wrap gap-2">
                  {QUESTION_COUNT_OPTIONS.map((count) => (
                    <Badge
                      key={count}
                      variant={
                        watchedValues.questionCount === count
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => setValue("questionCount", count)}
                    >
                      {count}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            {/* Quiz Summary */}
            <Card className="text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Quiz Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Level:</span>
                    <div className="font-medium">
                      {
                        ACADEMIC_LEVELS.find(
                          (l) => l.value === watchedValues.academicLevel
                        )?.label
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Subject:</span>
                    <div className="font-medium">{watchedValues.subject}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Topic:</span>
                    <div className="font-medium">{watchedValues.topic}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Language:</span>
                    <div className="font-medium">
                      {
                        LANGUAGES.find(
                          (l) => l.value === watchedValues.language
                        )?.label
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Questions:</span>
                    <div className="font-medium">
                      {watchedValues.questionCount}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <div className="font-medium">
                      {
                        QUESTION_TYPES.find(
                          (t) => t.value === watchedValues.questionType
                        )?.label
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-8 text-center space-y-6"
                >
                  <div className="space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="text-white"
                        >
                          <Sparkles className="w-8 h-8" />
                        </motion.div>
                      </div>
                    </motion.div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        Generating Your Quiz
                      </h3>
                      <p className="text-muted-foreground">
                        AI is creating personalized questions based on your
                        preferences...
                      </p>
                    </div>

                    <div className="flex justify-center space-x-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb - Hidden on mobile */}
      <div className="mb-4 lg:mb-8 hidden sm:block">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <PlusCircle className="w-4 h-4" />
          <span className="font-medium text-gray-900 capitalize">
            Create Quiz
          </span>
        </div>
      </div>
      {/* Page Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Create a Quiz
        </h1>
        <p className="text-muted-foreground mt-2">
          Create a personalized quiz based on your academic level, subject,
          topic, language, and question type.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center space-x-2",
                  step.id < currentStep && "text-primary",
                  step.id === currentStep && "text-primary",
                  step.id > currentStep && "text-muted-foreground"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border",
                    step.id < currentStep &&
                      "bg-primary border-primary text-primary-foreground",
                    step.id === currentStep &&
                      "border-primary text-primary bg-primary/10",
                    step.id > currentStep && "border-muted-foreground/30"
                  )}
                >
                  {step.id < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="hidden sm:block">
                  <div className="font-medium text-sm">{step.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Progress value={(currentStep / 4) * 100} className="h-2" />
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
            </CardContent>

            {/* Navigation */}
            <div className="flex items-center justify-between p-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`cursor-pointer ${
                  currentStep === 1 && "opacity-50"
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  variant="outline"
                  className="cursor-pointer"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="outline"
                  className="cursor-pointer"
                  disabled={isGenerating}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                  }}
                >
                  {isGenerating ? "Generating..." : "Generate Quiz"}
                  {!isGenerating && <Sparkles className="w-4 h-4 ml-2" />}
                </Button>
              )}
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default QuizCreator;
