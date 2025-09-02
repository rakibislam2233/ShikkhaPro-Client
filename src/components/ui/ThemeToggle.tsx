import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, actualTheme } = useTheme();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  const handleThemeChange = (newTheme: typeof theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="relative inline-flex items-center bg-secondary rounded-lg p-1 shadow-sm">
      {themes.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value;
        
        return (
          <motion.button
            key={value}
            onClick={() => handleThemeChange(value)}
            className={cn(
              'relative flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
              {
                'text-primary': isActive,
                'text-muted-foreground hover:text-foreground': !isActive,
              }
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Switch to ${label} theme`}
            aria-label={`Switch to ${label} theme`}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-background rounded-md shadow-sm border"
                layoutId="activeThemeBackground"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            
            <Icon
              size={16}
              className={cn('relative z-10 transition-colors duration-200', {
                'text-primary': isActive,
                'text-muted-foreground': !isActive,
              })}
            />
          </motion.button>
        );
      })}

      {/* Theme status indicator */}
      <div className="ml-2 text-xs text-muted-foreground hidden sm:block">
        {actualTheme === 'light' ? '☀️' : '🌙'}
      </div>
    </div>
  );
};

export default ThemeToggle;