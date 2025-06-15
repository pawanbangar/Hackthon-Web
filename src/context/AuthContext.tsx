import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, redirect: boolean) => Promise<void>;
  setUser: (user: {
    id: string;
    email: string;
    username: string;
    location: string;
    languages: string;
    genres: string;
  } | null) => void;
  user: {
    id: string;
    email: string;
    username: string;
    location: string;
    languages: string;
    genres: string;
  } | null;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    username: string;
    location: string;
    languages: string;
    genres: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyTokenOnLoad = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authService.verifyToken();
          if (response.success) {
            setIsAuthenticated(true);
            setUser(response.data);
          } else {
            // If token is invalid, clear it
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    verifyTokenOnLoad();
  }, []);

  const login = async (token: string, redirect: boolean) => {
    setIsLoading(true);
    try {
      localStorage.setItem('token', token);
      const response = await authService.verifyToken();
      if (response.success) {
        setIsAuthenticated(true);
        if (response.data) {
          setUser(response.data as AuthContextType['user']);
          if (redirect && (!response.data.genres || !response.data.languages || !response.data.location)) {
            setTimeout(()=>{
              navigate('/preferences');
            },200); 
          }
        }
      } else {
        throw new Error(response.message || 'Invalid token');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,user, login, logout, setUser, isLoading }}>
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
