import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/auth';
import api from '../utils/axios';

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
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Make API call to verify token
          const response = await api.get('/auth/verify-token', {
            validateStatus: function (status) {
              return status >= 200 && status < 300; // default
            },
            maxRedirects: 0
          });
          
          if (response.data && response.data.valid) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Token verification error:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyStoredToken();
  }, []);

  const login = async (token: string) => {
    try {
      // Verify token by making an API call
      const response = await api.get('/auth/verify-token', {
        validateStatus: function (status) {
          return status >= 200 && status < 300; // default
        },
        maxRedirects: 0
      });
      
      if (response.data && response.data.valid) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Token verification error:', error);
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