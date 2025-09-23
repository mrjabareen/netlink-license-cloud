import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from '@/lib/axios';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  emailVerified: boolean;
  isActive: boolean;
  isSuperAdmin: boolean;
  roles?: string[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post('/auth/login', { email, password });
          
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });

          // Set default auth header
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (registerData) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post('/auth/register', registerData);
          
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });

          // Set default auth header
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          const refreshToken = get().refreshToken;
          await axios.post('/auth/logout', { refreshToken });
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          get().clearAuth();
        }
      },

      refreshAccessToken: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const { data } = await axios.post('/auth/refresh', { refreshToken });
          
          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user,
          });

          // Update auth header
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          
          return data.accessToken;
        } catch (error) {
          get().clearAuth();
          throw error;
        }
      },

      setUser: (user) => set({ user }),
      
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken, isAuthenticated: true });
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      },

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        delete axios.defaults.headers.common['Authorization'];
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
