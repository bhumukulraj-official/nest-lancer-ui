/**
 * Payment API Service Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { apiClient } from '../api/client'

import paymentApiService from './paymentApiService'

vi.mock('../api/client')

describe('paymentApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch payment history', async () => {
    const mockPayments = [{ id: '1', amount: 5000 }]
    ;(apiClient.get as any).mockResolvedValue(mockPayments)

    const result = await paymentApiService.getPaymentHistory()

    expect(apiClient.get).toHaveBeenCalledWith('/payments')
    expect(result).toEqual(mockPayments)
  })

  it('should create payment', async () => {
    const paymentData = {
      amount: 2000,
      currency: 'USD',
      description: 'Test payment',
      clientId: 'client123',
      clientName: 'Test Client',
      clientEmail: 'client@example.com'
    }
    ;(apiClient.post as any).mockResolvedValue({ id: '1', ...paymentData })

    const result = await paymentApiService.createPayment(paymentData)

    expect(apiClient.post).toHaveBeenCalledWith('/payments', paymentData)
    expect(result).toHaveProperty('id')
  })
})

