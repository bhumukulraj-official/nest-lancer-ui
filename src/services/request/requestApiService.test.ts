/**
 * Request API Service Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { apiClient } from '../api/client'
import { ContactMethod } from '@/types/models/request.types'

import requestApiService from './requestApiService'

vi.mock('../api/client')

describe('requestApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch requests', async () => {
    const mockRequests = [{ id: '1', title: 'Request 1' }]
    ;(apiClient.get as any).mockResolvedValue(mockRequests)

    const result = await requestApiService.getRequests()

    expect(apiClient.get).toHaveBeenCalledWith('/requests')
    expect(result).toEqual(mockRequests)
  })

  it('should create request', async () => {
    const requestData = {
      title: 'New Request',
      description: 'Description',
      category: 'web-development',
      budget: 5000,
      currency: 'USD',
      timeline: '30 days',
      requirements: ['Requirement 1'],
      contactInfo: {
        name: 'Test User',
        email: 'test@example.com',
        preferredContactMethod: ContactMethod.EMAIL
      },
      skills: ['React'],
      tags: ['tag1']
    }
    ;(apiClient.post as any).mockResolvedValue({ id: '1', ...requestData })

    const result = await requestApiService.createRequest(requestData)

    expect(apiClient.post).toHaveBeenCalledWith('/requests', requestData)
    expect(result).toHaveProperty('id')
  })
})

