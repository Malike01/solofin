import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

// Context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean; 
  error: string | null; 
  login: (data: any) => Promise<void>; 
  register: (data: any) => Promise<void>; 
  googleLogin: () => Promise<void>; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: any) => {
    setIsLoading(true);
    setError(null);
    console.log('Context: Login', data);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.password.length < 6) {
      setError('Password must be at least 6 characters.');
      setIsLoading(false);
      throw new Error('Short password');
    }

    const fakeUser: User = {
      id: '1',
      name: 'User Fakename',
      email: data.email,
      token: 'fake-jwt-token',
    };
    setUser(fakeUser);
    setIsLoading(false);
    console.log('Context: Successful login', fakeUser);
  };

  const register = async (data: any) => {
    setIsLoading(true);
    setError(null);
    console.log('Context: Register', data);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!data.name) {
      setError('Ad Soyad alanı zorunludur.');
      setIsLoading(false);
      throw new Error('Required field');
    }

    const fakeUser: User = {
      id: '2',
      name: data.name,
      email: data.email,
      token: 'fake-jwt-token-new',
    };
    setUser(fakeUser);
    setIsLoading(false);
    console.log('Context: Successful register', fakeUser);
  };

  const googleLogin = async () => {
    setIsLoading(true);
    setError(null);
    console.log('Context: Login in Google...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const logout = () => {
    console.log('Context: Logout');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useAuth hooks
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth, AuthProvider içinde kullanılmalıdır');
  }
  return context;
};