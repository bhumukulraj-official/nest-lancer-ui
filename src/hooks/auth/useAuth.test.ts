/**
 * useAuth Hook Tests
 * Tests for authentication hook functionality
 */

import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { tokenService } from '@/services/auth/tokenService'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'

import { useAuth } from './useAuth'


// Mock dependencies
vi.mock('@/stores/authStore')
vi.mock('@/stores/notificationStore')
vi.mock('@/services/auth/tokenService', () => ({
  tokenService: {
    getToken: vi.fn(),
    hasToken: vi.fn(),
    isTokenExpiringSoon: vi.fn(),
    removeToken: vi.fn(),
  },
}))

describe('useAuth', () => {
  const mockLogin = vi.fn()
  const mockRegister = vi.fn()
  const mockLogout = vi.fn()
  const mockGetCurrentUser = vi.fn()
  const mockRefreshToken = vi.fn()
  const mockClearError = vi.fn()
  const mockHasRole = vi.fn()
  const mockIsAdmin = vi.fn()
  const mockIsUser = vi.fn()
  const mockGetDisplayName = vi.fn()
  const mockGetInitials = vi.fn()
  const mockShowSuccess = vi.fn()
  const mockShowError = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup default mocks
    ;(useAuthStore as any).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: mockLogin,
      register: mockRegister,
      logout: mockLogout,
      getCurrentUser: mockGetCurrentUser,
      refreshToken: mockRefreshToken,
      clearError: mockClearError,
      hasRole: mockHasRole,
      isAdmin: mockIsAdmin,
      isUser: mockIsUser,
      getDisplayName: mockGetDisplayName,
      getInitials: mockGetInitials,
    })

    ;(useNotificationStore as any).mockReturnValue({
      showSuccess: mockShowSuccess,
      showError: mockShowError,
    })

    tokenService.getToken = vi.fn().mockReturnValue('mock-token')
    tokenService.hasToken = vi.fn().mockReturnValue(true)
    tokenService.isTokenExpiringSoon = vi.fn().mockReturnValue(false)
  })

  describe('State', () => {
    it('should return auth state from store', () => {
      const { result } = renderHook(() => useAuth())

      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('should return user data when authenticated', () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user' as const,
      }

      ;(useAuthStore as any).mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        login: mockLogin,
        register: mockRegister,
        logout: mockLogout,
        getCurrentUser: mockGetCurrentUser,
        refreshToken: mockRefreshToken,
        clearError: mockClearError,
        hasRole: mockHasRole,
        isAdmin: mockIsAdmin,
        isUser: mockIsUser,
        getDisplayName: mockGetDisplayName,
        getInitials: mockGetInitials,
      })

      const { result } = renderHook(() => useAuth())

      expect(result.current.user).toEqual(mockUser)
      expect(result.current.isAuthenticated).toBe(true)
    })
  })

  describe('Login', () => {
    it('should call login action with correct parameters', async () => {
      mockLogin.mockResolvedValue(undefined)

      const { result } = renderHook(() => useAuth())

      await result.current.login('test@example.com', 'password123')

      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123', undefined)
    })

    it('should show success notification on login success', async () => {
      mockLogin.mockResolvedValue(undefined)

      const { result } = renderHook(() => useAuth())

      await result.current.login('test@example.com', 'password123')

      expect(mockShowSuccess).toHaveBeenCalledWith('Welcome back!', 'Login Successful')
    })

    it('should show error notification on login failure', async () => {
      const error = new Error('Invalid credentials')
      mockLogin.mockRejectedValue(error)

      const { result } = renderHook(() => useAuth())

      await expect(result.current.login('test@example.com', 'wrong')).rejects.toThrow()

      expect(mockShowError).toHaveBeenCalledWith('Invalid credentials', 'Login Failed')
    })

    it('should handle rememberMe parameter', async () => {
      mockLogin.mockResolvedValue(undefined)

      const { result } = renderHook(() => useAuth())

      await result.current.login('test@example.com', 'password123', true)

      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123', true)
    })
  })

  describe('Register', () => {
    it('should call register action with user data', async () => {
      mockRegister.mockResolvedValue(undefined)

      const { result } = renderHook(() => useAuth())

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        acceptTerms: true,
      }

      await result.current.register(userData)

      expect(mockRegister).toHaveBeenCalledWith(userData)
    })

    it('should show success notification on registration success', async () => {
      mockRegister.mockResolvedValue(undefined)

      const { result } = renderHook(() => useAuth())

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        acceptTerms: true,
      }

      await result.current.register(userData)

      expect(mockShowSuccess).toHaveBeenCalled()
    })

    it('should show error notification on registration failure', async () => {
      const error = new Error('Email already exists')
      mockRegister.mockRejectedValue(error)

      const { result } = renderHook(() => useAuth())

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        acceptTerms: true,
      }

      await expect(result.current.register(userData)).rejects.toThrow()

      expect(mockShowError).toHaveBeenCalledWith('Email already exists', 'Registration Failed')
    })
  })

  describe('Logout', () => {
    it('should call logout action', async () => {
      mockLogout.mockResolvedValue(undefined)

      const { result } = renderHook(() => useAuth())

      await result.current.logout()

      expect(mockLogout).toHaveBeenCalled()
    })

    it('should show success notification on logout', async () => {
      mockLogout.mockResolvedValue(undefined)

      const { result } = renderHook(() => useAuth())

      await result.current.logout()

      expect(mockShowSuccess).toHaveBeenCalledWith(
        'You have been logged out successfully.',
        'Logout Successful'
      )
    })

    it('should handle logout errors gracefully', async () => {
      mockLogout.mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() => useAuth())

      await result.current.logout()

      // Should not show error notification
      expect(mockShowError).not.toHaveBeenCalled()
    })
  })

  describe('Token Utilities', () => {
    it('should get token from token service', () => {
      const { result } = renderHook(() => useAuth())

      const token = result.current.getToken()

      expect(token).toBe('mock-token')
      expect(tokenService.getToken).toHaveBeenCalled()
    })

    it('should check if token exists', () => {
      const { result } = renderHook(() => useAuth())

      const hasToken = result.current.hasValidToken()

      expect(hasToken).toBe(true)
      expect(tokenService.hasToken).toHaveBeenCalled()
    })

    it('should check if token is expiring soon', () => {
      const { result } = renderHook(() => useAuth())

      const isExpiringSoon = result.current.isTokenExpiringSoon(5)

      expect(isExpiringSoon).toBe(false)
      expect(tokenService.isTokenExpiringSoon).toHaveBeenCalledWith(5)
    })
  })

  describe('Utility Methods', () => {
    it('should check user role', () => {
      const { result } = renderHook(() => useAuth())

      result.current.hasRole('admin')

      expect(mockHasRole).toHaveBeenCalledWith('admin')
    })

    it('should check if user is admin', () => {
      const { result } = renderHook(() => useAuth())

      result.current.isAdmin()

      expect(mockIsAdmin).toHaveBeenCalled()
    })

    it('should check if user is regular user', () => {
      const { result } = renderHook(() => useAuth())

      result.current.isUser()

      expect(mockIsUser).toHaveBeenCalled()
    })

    it('should get display name', () => {
      const { result } = renderHook(() => useAuth())

      result.current.getDisplayName()

      expect(mockGetDisplayName).toHaveBeenCalled()
    })

    it('should get user initials', () => {
      const { result } = renderHook(() => useAuth())

      result.current.getInitials()

      expect(mockGetInitials).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should clear errors', () => {
      const { result } = renderHook(() => useAuth())

      result.current.clearError()

      expect(mockClearError).toHaveBeenCalled()
    })
  })
})

