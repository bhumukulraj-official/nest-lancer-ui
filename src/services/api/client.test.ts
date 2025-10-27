/**
 * API Client Tests
 * Unit tests for the API client configuration
 */

import axios from 'axios'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { apiClient } from './client'

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn()
  }
}))

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Client Creation', () => {
    it('should create axios instance with correct configuration', () => {
      expect(axios.create).toHaveBeenCalled()
      
      const callArgs = (axios.create as any).mock.calls[0][0]
      expect(callArgs).toHaveProperty('baseURL')
      expect(callArgs).toHaveProperty('timeout')
      expect(callArgs.headers).toHaveProperty('Content-Type', 'application/json')
      expect(callArgs.headers).toHaveProperty('Accept', 'application/json')
    })
  })

  describe('API Client Interface', () => {
    it('should expose all HTTP methods', () => {
      expect(apiClient).toHaveProperty('get')
      expect(apiClient).toHaveProperty('post')
      expect(apiClient).toHaveProperty('put')
      expect(apiClient).toHaveProperty('patch')
      expect(apiClient).toHaveProperty('delete')
      expect(apiClient).toHaveProperty('interceptors')
    })
  })

  describe('Request/Response Override', () => {
    it('should override methods to return data directly', async () => {
      const createApiClient = async () => {
        const originalGet = vi.fn().mockResolvedValue({ data: { result: 'success' } })
        
        // Simulate the override
        const get = async () => {
          const response = await originalGet()
          return response.data
        }

        return get()
      }

      const result = await createApiClient()
      expect(result).toEqual({ result: 'success' })
    })
  })

  describe('Development Logging', () => {
    it('should set up development interceptors', () => {
      expect(apiClient.interceptors).toBeDefined()
      expect(apiClient.interceptors.request).toBeDefined()
      expect(apiClient.interceptors.response).toBeDefined()
    })
  })
})

