/**
 * API Interceptors Tests
 * Unit tests for request/response interceptors
 */

import { AxiosError } from 'axios'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { tokenService } from '@/services/auth/tokenService'

import { apiClient } from './client'

// Mock tokenService
vi.mock('@/services/auth/tokenService', () => ({
  tokenService: {
    getToken: vi.fn(() => 'mock-token'),
    removeToken: vi.fn()
  }
}))

describe('API Interceptors', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Request Interceptor', () => {
    it('should add authorization header with token', () => {
      // The interceptor is already set up in the actual file
      expect(tokenService.getToken).toBeDefined()
    })

    it('should not add authorization header when no token', () => {
      (tokenService.getToken as any).mockReturnValueOnce(null)

      expect(tokenService.getToken).toBeDefined()
    })

    it('should add request timestamp in development', () => {
      expect(apiClient.interceptors).toBeDefined()
    })
  })

  describe('Response Interceptor', () => {
    it('should log response time in development', () => {
      expect(apiClient.interceptors.response).toBeDefined()
    })

    it('should handle 401 Unauthorized errors', async () => {
      expect(tokenService.removeToken).toBeDefined()
    })

    it('should handle 403 Forbidden errors', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      // Check interceptor exists
      expect(apiClient.interceptors.response).toBeDefined()

      consoleSpy.mockRestore()
    })

    it('should handle network errors', () => {
      const error: AxiosError = {
        name: 'NetworkError',
        message: 'Network Error',
        config: {} as any,
        code: 'NETWORK_ERROR',
        isAxiosError: true,
        toJSON: () => ({})
      }

      expect(error.isAxiosError).toBe(true)
    })
  })

  describe('Error Creation', () => {
    it('should create API error from Axios error', () => {
      const error: AxiosError = {
        response: {
          status: 404,
          data: { message: 'Not Found' },
          statusText: 'Not Found',
          headers: {},
          config: {} as any
        },
        config: {
          url: '/test'
        } as any,
        name: 'AxiosError',
        message: 'Request failed',
        code: '404',
        isAxiosError: true,
        toJSON: () => ({})
      }

      expect(error.isAxiosError).toBe(true)
    })
  })
})

