import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '../services/authService';
import { type LoginFormValues, type RegisterFormValues } from '../schemas/authSchema';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormValues) => Promise<void>;
  register: (data: RegisterFormValues) => Promise<void>;
  logout: () => void;
  googleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const userData = await authService.getMe();
          setUser(userData);
        } catch (err) {
          console.error("Oturum yenileme hatası:", err);
          localStorage.removeItem('accessToken');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);

      localStorage.setItem('accessToken', response.access_token);
      
      const userData = await authService.getMe();
      setUser(userData);
      
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Giriş başarısız oldu.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(data);
      await login({ email: data.email, password: data.password });
      
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Kayıt işlemi başarısız.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const googleLogin = async () => {
    const backendUrl = import.meta.env.VITE_API_URL || '';
    window.location.href = `${backendUrl}/auth/google`;
  };

  const value = {
    user,
    isAuthenticated: !!user, 
    isLoading,
    error,
    login,
    register,
    logout,
    googleLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};