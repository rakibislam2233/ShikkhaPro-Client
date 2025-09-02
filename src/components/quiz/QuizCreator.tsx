import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Brain, 
  Target, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  FileText,
  CheckCircle
} from 'lucide-react';
import { useQuiz } from '../../contexts/QuizContext';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { 
  ACADEMIC_LEVELS, 
  QUESTION_TYPES, 
  DIFFICULTY_LEVELS, 
  LANGUAGES,
  QUESTION_COUNT_OPTIONS,
  SUBJECT_SUGGESTIONS
} from '../../utils/constants';
import { quizConfigSchema } from '../../utils/validation.utils';
import { cn } from '@/lib/utils';
import type { QuizConfig } from '@/types/quiz.types';

const steps = [
  {
    id: 1,
    title: 'Academic Level',
    description: 'Select your academic level',
    icon: BookOpen,
  },
  {
    id: 2,
    title: 'Subject & Topic',
    description: 'What do you want to study?',
    icon: Brain,
  },
  {
    id: 3,
    title: 'Quiz Preferences',
    description: 'Customize your quiz',
    icon: Target,
  },
  {
    id: 4,
    title: 'Generate Quiz',
    description: 'Let AI create your quiz',
    icon: Sparkles,
  },
];

const QuizCreator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateQuiz } = useQuiz();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<QuizConfig>({
    resolver: yupResolver(quizConfigSchema),
    defaultValues: {
      academicLevel: 'class-10',
      subject: '',
      topic: '',
      language: 'english',
      questionType: 'mcq',
      difficulty: 'medium',
      questionCount: 10,
      timeLimit: 30,
      instructions: '',
    },
  });

  const watchedValues = watch();

  const nextStep = async () => {
    const fieldsToValidate = {
      1: ['academicLevel'],
      2: ['subject', 'topic'],
      3: ['language', 'questionType', 'difficulty', 'questionCount'],
    };

    const currentFields = fieldsToValidate[currentStep as keyof typeof fieldsToValidate];
    if (currentFields) {
      const isValid = await trigger(currentFields as any);
      if (!isValid) return;
    }

    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: QuizConfig) => {
    setIsGenerating(true);
    try {
      await generateQuiz(data);
      navigate('/dashboard/quiz/current');
    } catch (error) {
      console.error('Failed to generate quiz:', error);
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Select Your Academic Level</h2>
              <p className="text-muted-foreground">
                Choose the education level that matches your current studies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACADEMIC_LEVELS.map((level) => (
                <motion.div
                  key={level.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md",
                      watchedValues.academicLevel === level.value && "ring-2 ring-primary"
                    )}
                    onClick={() => setValue('academicLevel', level.value)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-lg font-semibold">{level.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {level.description}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {errors.academicLevel && (
              <p className="text-destructive text-sm text-center">
                {errors.academicLevel.message}
              </p>
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
                  {...register('subject')}
                />
                {errors.subject && (
                  <p className="text-destructive text-sm">{errors.subject.message}</p>
                )}
                
                {/* Subject Suggestions */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {getSubjectSuggestions().slice(0, 6).map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setValue('subject', suggestion)}
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
                  {...register('topic')}
                />
                {errors.topic && (
                  <p className="text-destructive text-sm">{errors.topic.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Be specific to get more targeted questions
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any specific requirements or focus areas..."
                  rows={3}
                  {...register('instructions')}
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
                  onValueChange={(value) => setValue('language', value as any)}
                >
                  {LANGUAGES.map((lang) => (
                    <div key={lang.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={lang.value} id={lang.value} />
                      <Label htmlFor={lang.value} className="flex items-center space-x-2 cursor-pointer">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                        <span className="text-muted-foreground">({lang.nativeName})</span>
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
                  onValueChange={(value) => setValue('questionType', value as any)}
                >
                  {QUESTION_TYPES.map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.value} id={type.value} />
                      <Label htmlFor={type.value} className="flex items-center space-x-2 cursor-pointer">
                        <span>{type.icon}</span>
                        <div>
                          <div>{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
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
                  onValueChange={(value) => setValue('difficulty', value as any)}
                >
                  {DIFFICULTY_LEVELS.map((level) => (
                    <div key={level.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={level.value} id={level.value} />
                      <Label htmlFor={level.value} className="cursor-pointer">
                        <span className={cn("font-medium", level.color)}>
                          {level.label}
                        </span>
                        <div className="text-xs text-muted-foreground">{level.description}</div>
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
                      variant={watchedValues.questionCount === count ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setValue('questionCount', count)}
                    >
                      {count}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Limit */}
            <div className="space-y-2">
              <Label htmlFor="timeLimit">Time Limit (minutes) - Optional</Label>
              <Input
                id="timeLimit"
                type="number"
                min="0"
                max="180"
                {...register('timeLimit')}
              />
              <p className="text-xs text-muted-foreground">
                Set to 0 for no time limit
              </p>
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
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold">Ready to Generate!</h2>
                <p className="text-muted-foreground mt-2">
                  Review your quiz settings and let AI create your personalized quiz
                </p>
              </div>
            </div>

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
                      {ACADEMIC_LEVELS.find(l => l.value === watchedValues.academicLevel)?.label}
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
                      {LANGUAGES.find(l => l.value === watchedValues.language)?.label}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Questions:</span>
                    <div className="font-medium">{watchedValues.questionCount}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <div className="font-medium">
                      {QUESTION_TYPES.find(t => t.value === watchedValues.questionType)?.label}
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
                            ease: 'linear'
                          }}
                          className="text-white"
                        >
                          <Sparkles className="w-8 h-8" />
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Generating Your Quiz</h3>
                      <p className="text-muted-foreground">
                        AI is creating personalized questions based on your preferences...
                      </p>
                    </div>
                    
                    <div className="flex justify-center space-x-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut'
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
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
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
                    step.id < currentStep && "bg-primary border-primary text-primary-foreground",
                    step.id === currentStep && "border-primary text-primary bg-primary/10",
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
                  <div className="text-xs text-muted-foreground">{step.description}</div>
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
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </CardContent>

            {/* Navigation */}
            <div className="flex items-center justify-between p-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={currentStep === 1 ? "invisible" : ""}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button type="button" onClick={nextStep} variant="gradient">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  variant="gradient" 
                  loading={isGenerating}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Quiz'}
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