import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { AuthContextType, AuthState, LoginRequest, OTPVerificationRequest, RegisterRequest, ResetPasswordRequest, User } from '@/types/auth.types';

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [storedUser, setStoredUser] = useLocalStorage<User | null>('user', null);
  const [storedToken, setStoredToken] = useLocalStorage<string | null>('token', null);

  // Initialize auth state from localStorage
  useEffect(() => {
    if (storedUser && storedToken) {
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: storedUser, token: storedToken },
      });
    }
  }, [storedUser, storedToken]);

  const login = async (credentials: LoginRequest): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call - In real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email: credentials.email,
        preferences: {
          theme: 'custom',
          language: 'english',
          notifications: true,
          autoSave: true,
          defaultQuestionCount: 10,
          defaultDifficulty: 'medium',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store in localStorage
      setStoredUser(mockUser);
      setStoredToken(mockToken);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: mockUser, token: mockToken },
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error instanceof Error ? error.message : 'Login failed',
      });
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      const mockUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        preferences: {
          theme: 'custom',
          language: 'english',
          notifications: true,
          autoSave: true,
          defaultQuestionCount: 10,
          defaultDifficulty: 'medium',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store in localStorage
      setStoredUser(mockUser);
      setStoredToken(mockToken);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: mockUser, token: mockToken },
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error instanceof Error ? error.message : 'Registration failed',
      });
    }
  };

  const logout = (): void => {
    // Remove from localStorage
    setStoredUser(null);
    setStoredToken(null);
    
    dispatch({ type: 'LOGOUT' });
  };

  const forgotPassword = async (email: string): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would send an email with reset link
      dispatch({ type: 'CLEAR_ERROR' });
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to send reset email',
      });
    }
  };

  const resetPassword = async (data: ResetPasswordRequest): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would reset the password
      dispatch({ type: 'CLEAR_ERROR' });
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to reset password',
      });
    }
  };

  const verifyOTP = async (data: OTPVerificationRequest): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would verify the OTP
      dispatch({ type: 'CLEAR_ERROR' });
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error instanceof Error ? error.message : 'Invalid OTP',
      });
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...userData, updatedAt: new Date().toISOString() };
      setStoredUser(prev => prev ? { ...prev, ...updatedUser } : null);
      
      dispatch({
        type: 'UPDATE_USER',
        payload: updatedUser,
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to update profile',
      });
    }
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyOTP,
    updateProfile,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;