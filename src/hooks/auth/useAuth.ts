/**
 * useAuth Hook
 * Authentication state management hook using Zustand auth store
 * Provides authentication state and actions for components
 */

import { useCallback } from 'react'
import { useAuthStore, User } from '@/stores/authStore'
import { tokenService } from '@/services/auth/tokenService'
import { useNotificationStore } from '@/stores/notificationStore'

// Auth hook return type
export interface UseAuthReturn {
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
  refreshToken: () => Promise<void>
  getCurrentUser: () => Promise<void>
  clearError: () => void
  
  // Utility methods
  hasRole: (role: 'user' | 'admin') => boolean
  isAdmin: () => boolean
  isUser: () => boolean
  getDisplayName: () => string
  getInitials: () => string
  
  // Token utilities
  getToken: () => string | null
  hasValidToken: () => boolean
  isTokenExpiringSoon: (minutes?: number) => boolean
}

/**
 * Authentication hook
 * Provides authentication state and actions
 */
export const useAuth = (): UseAuthReturn => {
  // Auth store state and actions
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: loginAction,
    register: registerAction,
    logout: logoutAction,
    getCurrentUser: getCurrentUserAction,
    refreshToken: refreshTokenAction,
    clearError,
    hasRole,
    isAdmin,
    isUser,
    getDisplayName,
    getInitials,
  } = useAuthStore()
  
  // Notification utilities
  const { showSuccess, showError } = useNotificationStore()
  
  // Enhanced login with notifications
  const login = useCallback(async (
    email: string, 
    password: string, 
    rememberMe: boolean = false
  ) => {
    try {
      // Note: rememberMe parameter is kept for API compatibility but not sent to backend
      await loginAction(email, password, rememberMe)
      showSuccess('Welcome back!', 'Login Successful')
    } catch (error: any) {
      const errorMessage = error?.message || 'Login failed. Please try again.'
      showError(errorMessage, 'Login Failed')
      throw error
    }
  }, [loginAction, showSuccess, showError])
  
  // Enhanced register with notifications
  const register = useCallback(async (userData: {
    name: string
    email: string
    password: string
    confirmPassword: string
    acceptTerms: boolean
  }) => {
    try {
      await registerAction(userData)
      showSuccess('Account created successfully! Please check your email to verify your account.', 'Registration Successful')
    } catch (error: any) {
      const errorMessage = error?.message || 'Registration failed. Please try again.'
      showError(errorMessage, 'Registration Failed')
      throw error
    }
  }, [registerAction, showSuccess, showError])
  
  // Enhanced logout with notifications
  const logout = useCallback(async () => {
    try {
      await logoutAction()
      showSuccess('You have been logged out successfully.', 'Logout Successful')
    } catch (error: any) {
      // Don't show error for logout - still clear local state
      console.warn('Logout error:', error)
    }
  }, [logoutAction, showSuccess])
  
  // Enhanced refresh token
  const refreshToken = useCallback(async () => {
    try {
      await refreshTokenAction()
    } catch (error: any) {
      // Token refresh failed - user will be logged out by the store
      showError('Your session has expired. Please log in again.', 'Session Expired')
      throw error
    }
  }, [refreshTokenAction, showError])
  
  // Enhanced get current user
  const getCurrentUser = useCallback(async () => {
    try {
      await getCurrentUserAction()
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to get user information.'
      showError(errorMessage, 'Authentication Error')
      throw error
    }
  }, [getCurrentUserAction, showError])
  
  // Token utility methods
  const getToken = useCallback((): string | null => {
    return tokenService.getToken()
  }, [])
  
  const hasValidToken = useCallback((): boolean => {
    return tokenService.hasToken()
  }, [])
  
  const isTokenExpiringSoon = useCallback((minutes: number = 5): boolean => {
    return tokenService.isTokenExpiringSoon(minutes)
  }, [])
  
  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    login,
    register,
    logout,
    refreshToken,
    getCurrentUser,
    clearError,
    
    // Utility methods
    hasRole,
    isAdmin,
    isUser,
    getDisplayName,
    getInitials,
    
    // Token utilities
    getToken,
    hasValidToken,
    isTokenExpiringSoon,
  }
}

/**
 * Hook to check if user is authenticated
 * Lightweight hook for simple authentication checks
 */
export const useIsAuthenticated = (): boolean => {
  return useAuthStore((state) => state.isAuthenticated)
}

/**
 * Hook to get current user
 * Lightweight hook to get user data
 */
export const useCurrentUser = (): User | null => {
  return useAuthStore((state) => state.user)
}

/**
 * Hook to check user role
 * Utility hook for role-based rendering
 */
export const useUserRole = (): 'user' | 'admin' | null => {
  return useAuthStore((state) => state.user?.role || null)
}

/**
 * Hook for authentication loading state
 * Useful for showing loading indicators
 */
export const useAuthLoading = (): boolean => {
  return useAuthStore((state) => state.isLoading)
}

/**
 * Hook for authentication error
 * Useful for displaying error messages
 */
export const useAuthError = (): string | null => {
  return useAuthStore((state) => state.error)
}

export default useAuth
