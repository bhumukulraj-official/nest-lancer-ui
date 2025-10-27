/**
 * Blog API Service Tests
 * Unit tests for the BlogApiService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'

import { apiClient } from '../api/client'
import { BlogStatus } from '@/types/models/blog.types'

import BlogApiService from './blogApiService'

// Mock apiClient
vi.mock('../api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('BlogApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getBlogPosts', () => {
    it('should fetch blog posts without filters', async () => {
      const mockPosts = { data: [], total: 0 }
      ;(apiClient.get as any).mockResolvedValue({ data: mockPosts })

      const result = await BlogApiService.getBlogPosts()

      expect(apiClient.get).toHaveBeenCalled()
      expect(result).toEqual(mockPosts)
    })

    it('should fetch blog posts with filters', async () => {
      const mockPosts = { data: [], total: 0 }
      ;(apiClient.get as any).mockResolvedValue({ data: mockPosts })

      const filters = { category: ['tech'], status: [BlogStatus.PUBLISHED] }
      const result = await BlogApiService.getBlogPosts(filters)

      expect(apiClient.get).toHaveBeenCalledWith(expect.any(String), { params: filters })
      expect(result).toEqual(mockPosts)
    })

    it('should handle errors', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
      ;(apiClient.get as any).mockRejectedValue(new Error('Network error'))

      await expect(BlogApiService.getBlogPosts()).rejects.toThrow('Network error')
      
      expect(consoleError).toHaveBeenCalled()
      consoleError.mockRestore()
    })
  })

  describe('getBlogPost', () => {
    it('should fetch single blog post by ID', async () => {
      const mockPost = { id: '1', title: 'Test Post' }
      ;(apiClient.get as any).mockResolvedValue({ data: mockPost })

      const result = await BlogApiService.getBlogPost('1')

      expect(apiClient.get).toHaveBeenCalledWith(expect.stringContaining('/1'))
      expect(result).toEqual(mockPost)
    })
  })
})

