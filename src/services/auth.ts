import api from '../utils/axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

interface LoginResponse {
  data: string;
  message?: string;
  success: boolean;
}

interface VerifyTokenResponse {
  valid: boolean;
  message?: string;
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

  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    try {
      const response = await api.post<VerifyTokenResponse>('/auth/verify-token', { token });
      return response.data;
    } catch (error) {
      return { valid: false, message: 'Token verification failed' };
    }
  }
}; 