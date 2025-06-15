import api from '../utils/axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  location: string;
  languages: string;
  genres: string;
}

interface LoginResponse {
  data: string;
  message?: string;
  success: boolean;
}

interface VerifyTokenResponse {
  success: boolean;
  message?: string;
  data: {
    id: string;
    email: string;
    username: string;
    location: string;
    languages: string;
    genres: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/signup', credentials);
    return response.data;
  },

  async verifyToken(): Promise<VerifyTokenResponse> {
    try {
      const response = await api.get<VerifyTokenResponse>('/auth/verify-token');
      return response.data;
    } catch (error) {
      return { 
        success: false, 
        message: 'Token verification failed',
        data: {
          id: '',
          email: '',
          username: '',
          location: '',
          languages: '',
          genres: ''
        }
      };
    }
  },

  async updatePreferences(preferences: { location: string; languages: string; genres: string }): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/user-activity/preferences', preferences);
    return response.data;
  },
}; 