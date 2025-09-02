import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, SkipForward, SkipBack, Flag } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavigationControlsProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onFirst?: () => void;
  onLast?: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  showFirstLast?: boolean;
  showQuestionNumber?: boolean;
  onMarkForReview?: () => void;
  isMarkedForReview?: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  canGoPrevious,
  canGoNext,
  showFirstLast = false,
  showQuestionNumber = true,
  onMarkForReview,
  isMarkedForReview = false,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
      {/* Left Section - Previous Navigation */}
      <div className="flex items-center space-x-2">
        {showFirstLast && onFirst && (
          <Button
            variant="outline"
            size="sm"
            onClick={onFirst}
            disabled={currentIndex === 0}
            className="p-2"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
        )}
        
        <motion.div
          whileHover={{ scale: canGoPrevious ? 1.05 : 1 }}
          whileTap={{ scale: canGoPrevious ? 0.95 : 1 }}
        >
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex items-center space-x-2 px-4"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
        </motion.div>
      </div>

      {/* Center Section - Question Info and Mark for Review */}
      <div className="flex items-center space-x-4">
        {showQuestionNumber && (
          <div className="text-sm text-muted-foreground font-medium">
            <span className="hidden sm:inline">Question </span>
            {currentIndex + 1} <span className="text-muted-foreground/60">of</span> {totalQuestions}
          </div>
        )}

        {onMarkForReview && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={isMarkedForReview ? "default" : "outline"}
              size="sm"
              onClick={onMarkForReview}
              className="flex items-center space-x-2"
            >
              <Flag className={`h-4 w-4 ${isMarkedForReview ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">
                {isMarkedForReview ? 'Marked' : 'Mark'}
              </span>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Right Section - Next Navigation */}
      <div className="flex items-center space-x-2">
        <motion.div
          whileHover={{ scale: canGoNext ? 1.05 : 1 }}
          whileTap={{ scale: canGoNext ? 0.95 : 1 }}
        >
          <Button
            variant={canGoNext ? "default" : "outline"}
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center space-x-2 px-4"
          >
            <span className="hidden sm:inline">
              {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {showFirstLast && onLast && (
          <Button
            variant="outline"
            size="sm"
            onClick={onLast}
            disabled={currentIndex === totalQuestions - 1}
            className="p-2"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationControls;