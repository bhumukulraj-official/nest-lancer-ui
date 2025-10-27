/**
 * Contact API Service Tests
 * Unit tests for the ContactApiService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'

import { apiClient } from '../api/client'
import { ContactStatus, ContactPriority } from '@/types/models/contact.types'

import ContactApiService from './contactApiService'

// Mock apiClient
vi.mock('../api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('ContactApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getContactMessages', () => {
    it('should fetch contact messages without filters', async () => {
      const mockMessages = { data: [], total: 0 }
      ;(apiClient.get as any).mockResolvedValue({ data: mockMessages })

      const result = await ContactApiService.getContactMessages()

      expect(apiClient.get).toHaveBeenCalled()
      expect(result).toEqual(mockMessages)
    })

    it('should fetch contact messages with filters', async () => {
      const mockMessages = { data: [], total: 0 }
      ;(apiClient.get as any).mockResolvedValue({ data: mockMessages })

      const filters = { status: [ContactStatus.NEW], priority: [ContactPriority.HIGH] }
      const result = await ContactApiService.getContactMessages(filters)

      expect(apiClient.get).toHaveBeenCalledWith(expect.any(String), { params: filters })
      expect(result).toEqual(mockMessages)
    })

    it('should handle errors', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
      ;(apiClient.get as any).mockRejectedValue(new Error('Network error'))

      await expect(ContactApiService.getContactMessages()).rejects.toThrow('Network error')
      
      expect(consoleError).toHaveBeenCalled()
      consoleError.mockRestore()
    })
  })

  describe('getContactMessage', () => {
    it('should fetch single contact message by ID', async () => {
      const mockMessage = { id: '1', subject: 'Test' }
      ;(apiClient.get as any).mockResolvedValue({ data: mockMessage })

      const result = await ContactApiService.getContactMessage('1')

      expect(apiClient.get).toHaveBeenCalledWith(expect.stringContaining('/1'))
      expect(result).toEqual(mockMessage)
    })
  })

  describe('submitContactForm', () => {
    it('should submit contact form', async () => {
      const formData = {
        id: 'submission-123',
        formId: 'form-123',
        data: { name: 'Test', email: 'test@example.com', message: 'Test message' },
        submittedAt: new Date().toISOString(),
        ipAddress: '127.0.0.1',
        userAgent: 'Test Agent',
        status: 'pending' as const
      }
      const mockResponse = { success: true }
      ;(apiClient.post as any).mockResolvedValue({ data: mockResponse })

      const result = await ContactApiService.submitContactForm('form-123', formData)

      expect(apiClient.post).toHaveBeenCalled()
      expect(result).toEqual(mockResponse)
    })

    it('should handle form submission errors', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
      const formData = {
        id: 'submission-123',
        formId: 'form-123',
        data: { name: 'Test', email: 'test@example.com', message: 'Test' },
        submittedAt: new Date().toISOString(),
        ipAddress: '127.0.0.1',
        userAgent: 'Test Agent',
        status: 'pending' as const
      }
      ;(apiClient.post as any).mockRejectedValue(new Error('Validation error'))

      await expect(ContactApiService.submitContactForm('form-123', formData)).rejects.toThrow('Validation error')
      
      expect(consoleError).toHaveBeenCalled()
      consoleError.mockRestore()
    })
  })
})

