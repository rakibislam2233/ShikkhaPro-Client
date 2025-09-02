import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
}

export interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  colors: ThemeColors;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightColors: ThemeColors = {
  primary: 'rgb(102, 126, 234)',
  secondary: 'rgb(118, 75, 162)',
  background: 'rgb(248, 250, 252)',
  card: 'rgb(255, 255, 255)',
  text: 'rgb(26, 32, 44)',
  textSecondary: 'rgb(74, 85, 104)',
  border: 'rgb(226, 232, 240)',
  accent: 'rgb(59, 130, 246)',
};

const darkColors: ThemeColors = {
  primary: 'rgb(139, 92, 246)',
  secondary: 'rgb(236, 72, 153)',
  background: 'rgb(15, 15, 35)',
  card: 'rgb(26, 26, 46)',
  text: 'rgb(255, 255, 255)',
  textSecondary: 'rgb(160, 174, 192)',
  border: 'rgb(45, 55, 72)',
  accent: 'rgb(99, 102, 241)',
};

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  try {
    return (localStorage.getItem('theme') as Theme) || 'system';
  } catch {
    return 'system';
  }
};

const setStoredTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Ignore storage errors
  }
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>(() => {
    const stored = getStoredTheme();
    return stored === 'system' ? getSystemTheme() : stored;
  });

  useEffect(() => {
    const updateActualTheme = () => {
      const newActualTheme = theme === 'system' ? getSystemTheme() : theme;
      setActualTheme(newActualTheme);
      
      // Update document attributes
      document.documentElement.setAttribute('data-theme', newActualTheme);
      document.documentElement.classList.toggle('dark', newActualTheme === 'dark');
    };

    updateActualTheme();

    // Listen for system theme changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateActualTheme();
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const colors = actualTheme === 'light' ? lightColors : darkColors;

  const value: ThemeContextType = {
    theme,
    actualTheme,
    colors,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;