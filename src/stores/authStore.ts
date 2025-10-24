/**
 * Authentication Store
 * Zustand store for authentication state management
 * UI-only state - backend handles all authentication logic
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { authApiService } from '@/services/auth/authApiService'
import { tokenService } from '@/services/auth/tokenService'

// User profile interface
export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  avatar?: string
  emailVerified: boolean
  createdAt?: string
  updatedAt?: string
}

// Authentication state interface
export interface AuthState {
  // State
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  register: (userData: {
    name: string
    email: string
    password: string
    confirmPassword: string
    acceptTerms: boolean
  }) => Promise<void>
  logout: () => Promise<void>
  getCurrentUser: () => Promise<void>
  refreshToken: () => Promise<void>
  clearError: () => void
  setLoading: (loading: boolean) => void
  
  // UI Helper methods
  hasRole: (role: 'user' | 'admin') => boolean
  isAdmin: () => boolean
  isUser: () => boolean
  getDisplayName: () => string
  getInitials: () => string
}

// Create auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (email: string, password: string, rememberMe = false) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await authApiService.login({
            email,
            password,
            rememberMe,
          })
          
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error: any) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || 'Login failed',
          })
          throw error
        }
      },

      // Register action
      register: async (userData) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await authApiService.register(userData)
          
          // Registration successful but may require email verification
          set({
            isLoading: false,
            error: null,
          })
          
          // Don't automatically log in - let user verify email first
          if (response.requiresVerification) {
            throw new Error('Please check your email to verify your account')
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Registration failed',
          })
          throw error
        }
      },

      // Logout action
      logout: async () => {
        try {
          set({ isLoading: true })
          
          // Call backend logout (handles token invalidation)
          await authApiService.logout()
          
          // Clear local state
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        } catch (error: any) {
          // Even if backend call fails, clear local state
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
          
          console.warn('Logout API call failed, but local state cleared:', error)
        }
      },

      // Get current user profile
      getCurrentUser: async () => {
        try {
          set({ isLoading: true, error: null })
          
          const user = await authApiService.getCurrentUser()
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error: any) {
          // If user fetch fails, user is likely not authenticated
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || 'Failed to get user profile',
          })
          
          // Clear any stored tokens
          tokenService.removeToken()
        }
      },

      // Refresh token
      refreshToken: async () => {
        try {
          await authApiService.refreshToken()
          // Token service handles the storage update
        } catch (error: any) {
          // Token refresh failed - logout user
          set({
            user: null,
            isAuthenticated: false,
            error: 'Session expired. Please log in again.',
          })
          
          tokenService.removeToken()
          throw error
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Set loading state
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      // UI Helper: Check if user has specific role
      hasRole: (role: 'user' | 'admin') => {
        const { user } = get()
        return user?.role === role
      },

      // UI Helper: Check if user is admin
      isAdmin: () => {
        const { user } = get()
        return user?.role === 'admin'
      },

      // UI Helper: Check if user is regular user
      isUser: () => {
        const { user } = get()
        return user?.role === 'user'
      },

      // UI Helper: Get display name
      getDisplayName: () => {
        const { user } = get()
        return user?.name || user?.email || 'User'
      },

      // UI Helper: Get user initials for avatar
      getInitials: () => {
        const { user } = get()
        if (!user?.name) return 'U'
        
        const names = user.name.split(' ')
        if (names.length >= 2) {
          return `${names[0][0]}${names[1][0]}`.toUpperCase()
        }
        return user.name[0].toUpperCase()
      },
    }),
    {
      name: 'nestlancer-auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // Don't persist loading or error states
      }),
      onRehydrateStorage: () => (state) => {
        // Verify token is still valid on rehydration
        if (state?.isAuthenticated && !tokenService.hasToken()) {
          // Token missing - clear auth state
          state.user = null
          state.isAuthenticated = false
        }
      },
    }
  )
)

// Initialize auth state on app start
export const initializeAuth = async () => {
  const { getCurrentUser, setLoading } = useAuthStore.getState()
  
  // Check if we have a token
  if (tokenService.hasToken()) {
    try {
      setLoading(true)
      await getCurrentUser()
    } catch (error) {
      // User profile fetch failed - token likely invalid
      console.warn('Failed to initialize auth state:', error)
    }
  }
}

// Export store
export default useAuthStore
