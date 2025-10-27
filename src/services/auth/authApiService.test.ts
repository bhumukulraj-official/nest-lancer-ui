/**
 * Auth API Service Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { apiClient } from '../api/client'

import { authApiService } from './authApiService'

vi.mock('../api/client')

describe('authApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('should call login endpoint', async () => {
      const mockResponse = { user: { id: '1' }, token: 'token123' }
      ;(apiClient.post as any).mockResolvedValue(mockResponse)

      const result = await authApiService.login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(apiClient.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('register', () => {
    it('should call register endpoint', async () => {
      const mockResponse = { user: { id: '1' } }
      ;(apiClient.post as any).mockResolvedValue(mockResponse)

      const result = await authApiService.register({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        acceptTerms: true,
      })

      expect(apiClient.post).toHaveBeenCalled()
      expect(result).toEqual(mockResponse)
    })
  })

  describe('logout', () => {
    it('should call logout endpoint', async () => {
      (apiClient.post as any).mockResolvedValue({})

      await authApiService.logout()

      expect(apiClient.post).toHaveBeenCalledWith('/auth/logout')
    })
  })

  describe('getCurrentUser', () => {
    it('should fetch current user', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
      ;(apiClient.get as any).mockResolvedValue(mockUser)

      const result = await authApiService.getCurrentUser()

      expect(apiClient.get).toHaveBeenCalledWith('/auth/me')
      expect(result).toEqual(mockUser)
    })
  })
})

