import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  total: number;
  answered: number;
  showStats?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  answered,
  showStats = true,
}) => {
  const progressPercentage = (current / total) * 100;
  const answeredPercentage = (answered / total) * 100;

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            Question {current} of {total}
          </h2>
          {showStats && (
            <p className="text-sm text-muted-foreground">
              {answered} answered • {total - answered} remaining
            </p>
          )}
        </div>
        {showStats && (
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">
                {Math.round(answeredPercentage)}% Complete
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar Container */}
      <div className="relative">
        {/* Background Bar */}
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          {/* Answered Progress (Green) */}
          <motion.div
            className="h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${answeredPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          
          {/* Current Progress (Primary) */}
          <motion.div
            className="h-full bg-primary rounded-full absolute top-0 left-0"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>

        {/* Progress Markers */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          {Array.from({ length: total }, (_, index) => {
            const position = ((index + 1) / total) * 100;
            const isCurrent = index + 1 === current;
            const isAnswered = index + 1 <= answered;
            const isPast = index + 1 < current;
            
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${position}%` }}
              >
                <motion.div
                  className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${isCurrent
                      ? 'bg-primary border-primary-foreground shadow-lg shadow-primary/25'
                      : isAnswered
                        ? 'bg-green-500 border-green-600'
                        : isPast
                          ? 'bg-muted-foreground border-muted-foreground'
                          : 'bg-background border-muted-foreground'
                    }
                  `}
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: isCurrent ? 1.2 : 1,
                    rotateY: isAnswered ? 360 : 0
                  }}
                  transition={{ 
                    duration: 0.3,
                    rotateY: { duration: 0.6, ease: "easeInOut" }
                  }}
                >
                  {isAnswered && !isCurrent && (
                    <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Bar */}
      {showStats && (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-card rounded-lg border">
            <div className="text-lg font-bold text-primary">{current}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Current
            </div>
          </div>
          <div className="p-3 bg-card rounded-lg border">
            <div className="text-lg font-bold text-green-600">{answered}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Answered
            </div>
          </div>
          <div className="p-3 bg-card rounded-lg border">
            <div className="text-lg font-bold text-muted-foreground">{total - answered}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Remaining
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;