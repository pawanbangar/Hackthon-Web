import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyStoredToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const { valid } = await authService.verifyToken(token);
        if (!valid) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    };

    verifyStoredToken();
  }, []);

  const login = async (token: string) => {
    const { valid } = await authService.verifyToken(token);
    if (valid) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 