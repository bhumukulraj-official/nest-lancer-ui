/**
 * Profile API Service Tests
 * Unit tests for the ProfileApiService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'

import { apiClient } from '../api/client'

import ProfileApiService from './profileApiService'

// Mock apiClient
vi.mock('../api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn()
  }
}))

describe('ProfileApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getProfile', () => {
    it('should fetch user profile by user ID', async () => {
      const mockProfile = { id: '1', name: 'Test User' }
      ;(apiClient.get as any).mockResolvedValue({ data: mockProfile })

      const result = await ProfileApiService.getProfile('1')

      expect(apiClient.get).toHaveBeenCalledWith(expect.stringContaining('/1/profile'))
      expect(result).toEqual(mockProfile)
    })

    it('should handle errors', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
      ;(apiClient.get as any).mockRejectedValue(new Error('Profile not found'))

      await expect(ProfileApiService.getProfile('1')).rejects.toThrow('Profile not found')
      
      expect(consoleError).toHaveBeenCalled()
      consoleError.mockRestore()
    })
  })

  describe('getCurrentProfile', () => {
    it('should fetch current user profile', async () => {
      const mockProfile = { id: 'current', name: 'Current User' }
      ;(apiClient.get as any).mockResolvedValue({ data: mockProfile })

      const result = await ProfileApiService.getCurrentProfile()

      expect(apiClient.get).toHaveBeenCalled()
      expect(result).toEqual(mockProfile)
    })
  })

  describe('updateProfile', () => {
    it('should update profile', async () => {
      const updateData = { firstName: 'Updated', lastName: 'Name' }
      const mockResponse = { success: true }
      ;(apiClient.patch as any).mockResolvedValue({ data: mockResponse })

      const result = await ProfileApiService.updateProfile('1', updateData)

      expect(apiClient.patch).toHaveBeenCalled()
      expect(result).toEqual(mockResponse)
    })

    it('should handle update errors', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
      const updateData = { firstName: 'Updated' }
      ;(apiClient.patch as any).mockRejectedValue(new Error('Update failed'))

      await expect(ProfileApiService.updateProfile('1', updateData)).rejects.toThrow('Update failed')
      
      expect(consoleError).toHaveBeenCalled()
      consoleError.mockRestore()
    })
  })

  describe('uploadAvatar', () => {
    it('should upload profile avatar', async () => {
      const mockFile = new File(['content'], 'avatar.jpg')
      const mockResponse = { avatarUrl: 'https://example.com/avatar.jpg' }
      ;(apiClient.post as any).mockResolvedValue({ data: mockResponse })

      const result = await ProfileApiService.uploadAvatar(mockFile)

      expect(apiClient.post).toHaveBeenCalled()
      expect(result).toEqual(mockResponse)
    })
  })
})

