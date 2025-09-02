import { LOCAL_STORAGE_KEYS } from './constants';

// Generic storage utilities
export class StorageManager {
  private static isStorageAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  static get<T>(key: string, defaultValue: T): T {
    if (!this.isStorageAvailable()) {
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage for key "${key}":`, error);
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    if (!this.isStorageAvailable()) {
      console.warn('localStorage is not available');
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error);
    }
  }

  static remove(key: string): void {
    if (!this.isStorageAvailable()) {
      return;
    }

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing from localStorage for key "${key}":`, error);
    }
  }

  static clear(): void {
    if (!this.isStorageAvailable()) {
      return;
    }

    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  static getSize(): number {
    if (!this.isStorageAvailable()) {
      return 0;
    }

    try {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage.getItem(key)?.length || 0;
        }
      }
      return total;
    } catch {
      return 0;
    }
  }
}

// Specific storage utilities for the quiz app
export const QuizStorage = {
  // User data
  getUser() {
    return StorageManager.get(LOCAL_STORAGE_KEYS.USER, null);
  },

  setUser(user: any) {
    StorageManager.set(LOCAL_STORAGE_KEYS.USER, user);
  },

  removeUser() {
    StorageManager.remove(LOCAL_STORAGE_KEYS.USER);
  },

  // Authentication token
  getToken() {
    return StorageManager.get(LOCAL_STORAGE_KEYS.TOKEN, null);
  },

  setToken(token: string) {
    StorageManager.set(LOCAL_STORAGE_KEYS.TOKEN, token);
  },

  removeToken() {
    StorageManager.remove(LOCAL_STORAGE_KEYS.TOKEN);
  },

  // Theme preference
  getTheme() {
    return StorageManager.get(LOCAL_STORAGE_KEYS.THEME, 'system');
  },

  setTheme(theme: string) {
    StorageManager.set(LOCAL_STORAGE_KEYS.THEME, theme);
  },

  // Quizzes
  getQuizzes() {
    return StorageManager.get(LOCAL_STORAGE_KEYS.QUIZZES, []);
  },

  setQuizzes(quizzes: any[]) {
    StorageManager.set(LOCAL_STORAGE_KEYS.QUIZZES, quizzes);
  },

  addQuiz(quiz: any) {
    const quizzes = this.getQuizzes();
    const updatedQuizzes = [...quizzes, quiz];
    this.setQuizzes(updatedQuizzes);
  },

  updateQuiz(quizId: string, updatedQuiz: any) {
    const quizzes = this.getQuizzes();
    const updatedQuizzes = quizzes.map((quiz: any) =>
      quiz.id === quizId ? { ...quiz, ...updatedQuiz } : quiz
    );
    this.setQuizzes(updatedQuizzes);
  },

  removeQuiz(quizId: string) {
    const quizzes = this.getQuizzes();
    const updatedQuizzes = quizzes.filter((quiz: any) => quiz.id !== quizId);
    this.setQuizzes(updatedQuizzes);
  },

  // Quiz attempts
  getAttempts() {
    return StorageManager.get(LOCAL_STORAGE_KEYS.ATTEMPTS, []);
  },

  setAttempts(attempts: any[]) {
    StorageManager.set(LOCAL_STORAGE_KEYS.ATTEMPTS, attempts);
  },

  addAttempt(attempt: any) {
    const attempts = this.getAttempts();
    const updatedAttempts = [...attempts, attempt];
    this.setAttempts(updatedAttempts);
  },

  updateAttempt(attemptId: string, updatedAttempt: any) {
    const attempts = this.getAttempts();
    const updatedAttempts = attempts.map((attempt: any) =>
      attempt.id === attemptId ? { ...attempt, ...updatedAttempt } : attempt
    );
    this.setAttempts(updatedAttempts);
  },

  // User preferences
  getPreferences() {
    return StorageManager.get(LOCAL_STORAGE_KEYS.PREFERENCES, {
      theme: 'system',
      language: 'english',
      notifications: true,
      autoSave: true,
      defaultQuestionCount: 10,
      defaultDifficulty: 'medium',
    });
  },

  setPreferences(preferences: any) {
    StorageManager.set(LOCAL_STORAGE_KEYS.PREFERENCES, preferences);
  },

  updatePreferences(updates: any) {
    const currentPreferences = this.getPreferences();
    const updatedPreferences = { ...currentPreferences, ...updates };
    this.setPreferences(updatedPreferences);
  },

  // Draft quiz (for unsaved work)
  getDraftQuiz() {
    return StorageManager.get(LOCAL_STORAGE_KEYS.DRAFT_QUIZ, null);
  },

  setDraftQuiz(draft: any) {
    StorageManager.set(LOCAL_STORAGE_KEYS.DRAFT_QUIZ, draft);
  },

  removeDraftQuiz() {
    StorageManager.remove(LOCAL_STORAGE_KEYS.DRAFT_QUIZ);
  },

  // Utility methods
  exportData() {
    const data = {
      user: this.getUser(),
      quizzes: this.getQuizzes(),
      attempts: this.getAttempts(),
      preferences: this.getPreferences(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  importData(jsonData: string) {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.user) this.setUser(data.user);
      if (data.quizzes) this.setQuizzes(data.quizzes);
      if (data.attempts) this.setAttempts(data.attempts);
      if (data.preferences) this.setPreferences(data.preferences);
      
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },

  clearAllData() {
    Object.values(LOCAL_STORAGE_KEYS).forEach(key => {
      StorageManager.remove(key);
    });
  },

  getStorageStats() {
    const totalSize = StorageManager.getSize();
    const itemSizes = Object.entries(LOCAL_STORAGE_KEYS).map(([name, key]) => ({
      name,
      key,
      size: localStorage.getItem(key)?.length || 0,
    }));

    return {
      totalSize,
      totalSizeKB: Math.round(totalSize / 1024 * 100) / 100,
      items: itemSizes,
      availableSpace: 5 * 1024 * 1024 - totalSize, // Assuming 5MB limit
    };
  },
};

// Session storage utilities (for temporary data)
export const SessionStorage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to sessionStorage for key "${key}":`, error);
    }
  },

  remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing from sessionStorage for key "${key}":`, error);
    }
  },

  clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  },
};

// Cache utilities for temporary data with expiration
export class CacheManager {
  private static isExpired(timestamp: number, ttlMinutes: number): boolean {
    const now = Date.now();
    const expirationTime = timestamp + (ttlMinutes * 60 * 1000);
    return now > expirationTime;
  }

  static get<T>(key: string, defaultValue: T, ttlMinutes: number = 60): T {
    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return defaultValue;

      const { data, timestamp } = JSON.parse(cached);
      
      if (this.isExpired(timestamp, ttlMinutes)) {
        this.remove(key);
        return defaultValue;
      }

      return data;
    } catch {
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      const cached = {
        data: value,
        timestamp: Date.now(),
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(cached));
    } catch (error) {
      console.error(`Error caching data for key "${key}":`, error);
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (error) {
      console.warn(`Error removing cached data for key "${key}":`, error);
    }
  }

  static clearExpired(ttlMinutes: number = 60): void {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('cache_'));
      
      keys.forEach(key => {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const { timestamp } = JSON.parse(cached);
            if (this.isExpired(timestamp, ttlMinutes)) {
              localStorage.removeItem(key);
            }
          }
        } catch {
          // Remove corrupted cache entries
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing expired cache:', error);
    }
  }
}