import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: `${API_URL}/v1`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.accessToken) {
          config.headers.Authorization = `Bearer ${state.accessToken}`;
        }
      } catch (error) {
        console.error('Error parsing auth storage:', error);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return data directly for successful responses
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const { state } = JSON.parse(authStorage);
          if (state?.refreshToken) {
            const response = await axios.post(`${API_URL}/v1/auth/refresh`, {
              refreshToken: state.refreshToken,
            });
            
            // Update tokens in storage
            const updatedStorage = {
              ...JSON.parse(authStorage),
              state: {
                ...state,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
              },
            };
            localStorage.setItem('auth-storage', JSON.stringify(updatedStorage));
            
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return axiosInstance(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('auth-storage');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other errors
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred';
      
      // Show error toast for non-401 errors
      if (error.response.status !== 401) {
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
      }
      
      return Promise.reject({
        message,
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      toast({
        title: 'Network Error',
        description: 'Unable to connect to server. Please check your connection.',
        variant: 'destructive',
      });
      return Promise.reject({
        message: 'Network error',
        status: 0,
      });
    } else {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return Promise.reject({
        message: error.message,
        status: 0,
      });
    }
  }
);

export default axiosInstance;
