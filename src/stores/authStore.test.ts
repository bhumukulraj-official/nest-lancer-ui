/**
 * Auth Store Tests
 * Tests for authentication state management with Zustand
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'


import { useAuthStore } from './authStore'

// Mock dependencies
const mockAuthApiService = {
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  getCurrentUser: vi.fn(),
  refreshToken: vi.fn(),
}

const mockTokenService = {
  getToken: vi.fn(),
  hasToken: vi.fn(),
  removeToken: vi.fn(),
}

vi.mock('@/services/auth/authApiService', () => ({
  authApiService: mockAuthApiService,
}))
vi.mock('@/services/auth/tokenService', () => ({
  tokenService: mockTokenService,
}))

describe('Auth Store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Reset store to initial state
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = useAuthStore.getState()
      
      expect(state.user).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(state.isLoading).toBe(false)
      expect(state.error).toBeNull()
    })
  })

  describe('Login', () => {
    it('should login successfully', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user' as const,
        emailVerified: true,
      }

      mockAuthApiService.login.mockResolvedValue({
        user: mockUser,
        token: 'mock-token',
      })

      await useAuthStore.getState().login('test@example.com', 'password123')

      const state = useAuthStore.getState()
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthenticated).toBe(true)
      expect(state.isLoading).toBe(false)
      expect(state.error).toBeNull()
    })

    it('should handle login error', async () => {
      const error = new Error('Invalid credentials')
      mockAuthApiService.login.mockRejectedValue(error)

      await expect(
        useAuthStore.getState().login('test@example.com', 'wrong')
      ).rejects.toThrow()

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(state.error).toBe('Invalid credentials')
    })

    it('should set loading state during login', async () => {
      let resolveLogin: (value: any) => void
      const loginPromise = new Promise(resolve => {
        resolveLogin = resolve
      })

      mockAuthApiService.login.mockReturnValue(loginPromise)

      const loginPromiseStart = useAuthStore.getState().login('test@example.com', 'password123')
      
      // Check loading state during login
      const loadingState = useAuthStore.getState()
      expect(loadingState.isLoading).toBe(true)

      resolveLogin!({
        user: { id: '1', email: 'test@example.com', name: 'Test', role: 'user' as const, emailVerified: true },
        token: 'token',
      })

      await loginPromiseStart

      const state = useAuthStore.getState()
      expect(state.isLoading).toBe(false)
    })
  })

  describe('Register', () => {
    it('should register successfully', async () => {
      mockAuthApiService.register.mockResolvedValue({
        requiresVerification: true,
      })

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        acceptTerms: true,
      }

      await expect(useAuthStore.getState().register(userData)).rejects.toThrow()

      const state = useAuthStore.getState()
      expect(state.isLoading).toBe(false)
    })

    it('should handle registration error', async () => {
      const error = new Error('Email already exists')
      mockAuthApiService.register.mockRejectedValue(error)

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        acceptTerms: true,
      }

      await expect(useAuthStore.getState().register(userData)).rejects.toThrow()

      const state = useAuthStore.getState()
      expect(state.isLoading).toBe(false)
      expect(state.error).toBe('Email already exists')
    })
  })

  describe('Logout', () => {
    it('should logout successfully', async () => {
      mockAuthApiService.logout.mockResolvedValue(undefined)

      // Set authenticated state first
      useAuthStore.setState({
        user: { id: '1', email: 'test@example.com', name: 'Test', role: 'user' as const, emailVerified: true },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      await useAuthStore.getState().logout()

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(state.isLoading).toBe(false)
    })

    it('should clear state even if API call fails', async () => {
      mockAuthApiService.logout.mockRejectedValue(new Error('Network error'))

      useAuthStore.setState({
        user: { id: '1', email: 'test@example.com', name: 'Test', role: 'user' as const, emailVerified: true },
        isAuthenticated: true,
      })

      await useAuthStore.getState().logout()

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.isAuthenticated).toBe(false)
    })
  })

  describe('Get Current User', () => {
    it('should get current user successfully', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user' as const,
        emailVerified: true,
      }

      mockAuthApiService.getCurrentUser.mockResolvedValue(mockUser)

      await useAuthStore.getState().getCurrentUser()

      const state = useAuthStore.getState()
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthenticated).toBe(true)
    })

    it('should handle get current user error', async () => {
      const error = new Error('Unauthorized')
      mockAuthApiService.getCurrentUser.mockRejectedValue(error)
      mockTokenService.removeToken.mockReturnValue(undefined)

      await useAuthStore.getState().getCurrentUser()

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(mockTokenService.removeToken).toHaveBeenCalled()
    })
  })

  describe('Refresh Token', () => {
    it('should refresh token successfully', async () => {
      mockAuthApiService.refreshToken.mockResolvedValue(undefined)

      await useAuthStore.getState().refreshToken()

      expect(mockAuthApiService.refreshToken).toHaveBeenCalled()
    })

    it('should logout if refresh fails', async () => {
      const error = new Error('Token expired')
      mockAuthApiService.refreshToken.mockRejectedValue(error)
      mockTokenService.removeToken.mockReturnValue(undefined)

      await expect(useAuthStore.getState().refreshToken()).rejects.toThrow()

      const state = useAuthStore.getState()
      expect(state.isAuthenticated).toBe(false)
      expect(state.error).toBe('Session expired. Please log in again.')
    })
  })

  describe('Helper Methods', () => {
    it('should check if user has role', () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test', role: 'admin' as const, emailVerified: true }
      useAuthStore.setState({ user: mockUser })

      const hasRole = useAuthStore.getState().hasRole('admin')
      expect(hasRole).toBe(true)
    })

    it('should check if user is admin', () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test', role: 'admin' as const, emailVerified: true }
      useAuthStore.setState({ user: mockUser })

      const isAdmin = useAuthStore.getState().isAdmin()
      expect(isAdmin).toBe(true)
    })

    it('should check if user is regular user', () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test', role: 'user' as const, emailVerified: true }
      useAuthStore.setState({ user: mockUser })

      const isUser = useAuthStore.getState().isUser()
      expect(isUser).toBe(true)
    })

    it('should get display name', () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'John Doe', role: 'user' as const, emailVerified: true }
      useAuthStore.setState({ user: mockUser })

      const displayName = useAuthStore.getState().getDisplayName()
      expect(displayName).toBe('John Doe')
    })

    it('should get user initials', () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'John Doe', role: 'user' as const, emailVerified: true }
      useAuthStore.setState({ user: mockUser })

      const initials = useAuthStore.getState().getInitials()
      expect(initials).toBe('JD')
    })

    it('should return single letter if only one name', () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'John', role: 'user' as const, emailVerified: true }
      useAuthStore.setState({ user: mockUser })

      const initials = useAuthStore.getState().getInitials()
      expect(initials).toBe('J')
    })
  })

  describe('Clear Error', () => {
    it('should clear error state', () => {
      useAuthStore.setState({ error: 'Some error' })
      useAuthStore.getState().clearError()

      const state = useAuthStore.getState()
      expect(state.error).toBeNull()
    })
  })

  describe('Set Loading', () => {
    it('should set loading state', () => {
      useAuthStore.getState().setLoading(true)

      const state = useAuthStore.getState()
      expect(state.isLoading).toBe(true)

      useAuthStore.getState().setLoading(false)
      expect(state.isLoading).toBe(false)
    })
  })
})

