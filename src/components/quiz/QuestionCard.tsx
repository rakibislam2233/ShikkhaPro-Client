import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import type { Question } from '@/types/quiz.types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer?: string | string[];
  onAnswerSelect: (answer: string | string[]) => void;
  isReviewMode?: boolean;
  showCorrectAnswer?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerSelect,
  isReviewMode = false,
  showCorrectAnswer = false,
}) => {
  const renderMCQOptions = () => {
    return (
      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index);
          const isSelected = selectedAnswer === option;
          const isCorrect = showCorrectAnswer && question.correctAnswer === option;
          const isWrong = showCorrectAnswer && isSelected && question.correctAnswer !== option;
          
          let buttonClass = "w-full text-left p-4 border-2 transition-all duration-200 ";
          
          if (isReviewMode) {
            if (isCorrect) {
              buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
            } else if (isWrong) {
              buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
            } else if (isSelected) {
              buttonClass += "border-primary bg-primary/5";
            } else {
              buttonClass += "border-border hover:border-muted-foreground/50";
            }
          } else {
            if (isSelected) {
              buttonClass += "border-primary bg-primary/5 text-foreground";
            } else {
              buttonClass += "border-border hover:border-muted-foreground/50 hover:bg-muted/50";
            }
          }
          
          return (
            <motion.button
              key={index}
              onClick={() => !isReviewMode && onAnswerSelect(option)}
              className={buttonClass}
              disabled={isReviewMode}
              whileHover={!isReviewMode ? { scale: 1.01 } : {}}
              whileTap={!isReviewMode ? { scale: 0.99 } : {}}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-semibold mt-0.5
                  ${isSelected 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-muted-foreground/30 text-muted-foreground'
                  }
                `}>
                  {optionLetter}
                </div>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{option}</p>
                </div>
                {showCorrectAnswer && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  };

  const renderTrueFalseOptions = () => {
    const options = ['True', 'False'];
    
    return (
      <div className="flex space-x-4">
        {options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = showCorrectAnswer && question.correctAnswer === option;
          const isWrong = showCorrectAnswer && isSelected && question.correctAnswer !== option;
          
          let buttonClass = "flex-1 p-4 border-2 transition-all duration-200 ";
          
          if (isReviewMode) {
            if (isCorrect) {
              buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
            } else if (isWrong) {
              buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
            } else if (isSelected) {
              buttonClass += "border-primary bg-primary/5";
            } else {
              buttonClass += "border-border";
            }
          } else {
            if (isSelected) {
              buttonClass += "border-primary bg-primary/5 text-foreground";
            } else {
              buttonClass += "border-border hover:border-muted-foreground/50 hover:bg-muted/50";
            }
          }
          
          return (
            <motion.button
              key={option}
              onClick={() => !isReviewMode && onAnswerSelect(option)}
              className={buttonClass}
              disabled={isReviewMode}
              whileHover={!isReviewMode ? { scale: 1.02 } : {}}
              whileTap={!isReviewMode ? { scale: 0.98 } : {}}
            >
              <div className="text-center">
                <div className={`
                  w-8 h-8 rounded-full border-2 mx-auto mb-2 flex items-center justify-center
                  ${isSelected 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground/30'
                  }
                `}>
                  {isSelected && (
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
                {showCorrectAnswer && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto mt-1" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  };

  const renderShortAnswerInput = () => {
    return (
      <div className="space-y-4">
        <textarea
          value={selectedAnswer as string || ''}
          onChange={(e) => !isReviewMode && onAnswerSelect(e.target.value)}
          placeholder="Type your answer here..."
          disabled={isReviewMode}
          className="w-full p-4 border-2 border-border rounded-lg resize-none h-32 focus:border-primary focus:outline-none transition-colors"
        />
        {showCorrectAnswer && question.correctAnswer && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Correct Answer:</h4>
            <p className="text-green-600 dark:text-green-300">{question.correctAnswer}</p>
          </div>
        )}
      </div>
    );
  };

  const renderMultipleSelectOptions = () => {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground mb-4">Select all that apply:</p>
        {question.options?.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index);
          const isSelected = Array.isArray(selectedAnswer) && selectedAnswer.includes(option);
          const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
          const isCorrect = showCorrectAnswer && correctAnswers.includes(option);
          const isWrong = showCorrectAnswer && isSelected && !correctAnswers.includes(option);
          
          let buttonClass = "w-full text-left p-4 border-2 transition-all duration-200 ";
          
          if (isReviewMode) {
            if (isCorrect) {
              buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
            } else if (isWrong) {
              buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
            } else if (isSelected) {
              buttonClass += "border-primary bg-primary/5";
            } else {
              buttonClass += "border-border hover:border-muted-foreground/50";
            }
          } else {
            if (isSelected) {
              buttonClass += "border-primary bg-primary/5 text-foreground";
            } else {
              buttonClass += "border-border hover:border-muted-foreground/50 hover:bg-muted/50";
            }
          }
          
          const handleMultipleSelect = () => {
            if (isReviewMode) return;
            
            const currentAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : [];
            if (isSelected) {
              onAnswerSelect(currentAnswers.filter(ans => ans !== option));
            } else {
              onAnswerSelect([...currentAnswers, option]);
            }
          };
          
          return (
            <motion.button
              key={index}
              onClick={handleMultipleSelect}
              className={buttonClass}
              disabled={isReviewMode}
              whileHover={!isReviewMode ? { scale: 1.01 } : {}}
              whileTap={!isReviewMode ? { scale: 0.99 } : {}}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center text-xs font-semibold mt-0.5
                  ${isSelected 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-muted-foreground/30'
                  }
                `}>
                  {isSelected ? '✓' : optionLetter}
                </div>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{option}</p>
                </div>
                {showCorrectAnswer && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'mcq':
        return renderMCQOptions();
      case 'true-false':
        return renderTrueFalseOptions();
      case 'short-answer':
        return renderShortAnswerInput();
      case 'multiple-select':
        return renderMultipleSelectOptions();
      default:
        return renderMCQOptions();
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Question Header */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
            {questionNumber}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium leading-relaxed mb-2">
              {question.question}
            </h3>
            {question.explanation && isReviewMode && (
              <p className="text-sm text-muted-foreground">
                {question.explanation}
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded uppercase font-medium">
              {question.type.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Question Content */}
        <div>
          {renderQuestionContent()}
        </div>

        {/* Points and Difficulty */}
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Points: <span className="font-medium">{question.points || 1}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Difficulty: <span className="font-medium capitalize">{question.difficulty || 'medium'}</span>
          </div>
        </div>

        {/* Explanation in review mode */}
        {isReviewMode && question.explanation && showCorrectAnswer && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Explanation:</h4>
            <p className="text-blue-600 dark:text-blue-300 text-sm leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuestionCard;