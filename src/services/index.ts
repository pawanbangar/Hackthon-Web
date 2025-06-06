import api from '../utils/axios';
import { AxiosError } from 'axios';

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const apiService = {
  async fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await api.get(endpoint);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw {
          data: error.response?.data,
          status: error.response?.status,
          message: error.message,
        };
      }
      throw error;
    }
  },
};

// Example usage:
// const data = await apiService.fetchData('/users');
