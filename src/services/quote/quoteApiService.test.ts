/**
 * Quote API Service Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { apiClient } from '../api/client'

import quoteApiService from './quoteApiService'

vi.mock('../api/client')

describe('quoteApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch quotes', async () => {
    const mockQuotes = [{ id: '1', amount: 1000 }]
    ;(apiClient.get as any).mockResolvedValue(mockQuotes)

    const result = await quoteApiService.getQuotes()

    expect(apiClient.get).toHaveBeenCalledWith('/quotes')
    expect(result).toEqual(mockQuotes)
  })

  it('should create quote', async () => {
    const quoteData = {
      serviceRequestId: 'request-123',
      title: 'Quote Title',
      description: 'Quote details',
      amount: 2000,
      currency: 'USD',
      timeline: '30 days',
      deliverables: ['Deliverable 1'],
      terms: ['Term 1'],
      validUntil: '2024-12-31'
    }
    ;(apiClient.post as any).mockResolvedValue({ id: '1', ...quoteData })

    const result = await quoteApiService.createQuote(quoteData)

    expect(apiClient.post).toHaveBeenCalledWith('/quotes', quoteData)
    expect(result).toHaveProperty('id')
  })
})

