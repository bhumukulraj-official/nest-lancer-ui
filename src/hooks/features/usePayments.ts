/**
 * Payments Hook
 * Custom hook for payment management
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect } from 'react'

import { PaymentApiService } from '../../services/payment/paymentApiService'
import type {
  Payment,
  PaymentOrder,
  PaymentRefund,
  PaymentCreateData,
  PaymentUpdateData,
  PaymentFilters,
  PaymentSearchResult
} from '../../types/models/payment.types'

export interface UsePaymentsOptions {
  autoFetch?: boolean
  initialFilters?: PaymentFilters
}

export interface UsePaymentsReturn {
  // State
  payments: Payment[]
  currentPayment: Payment | null
  loading: boolean
  error: string | null
  filters: PaymentFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }

  // Actions
  fetchPayments: (filters?: PaymentFilters) => Promise<void>
  fetchPayment: (id: string) => Promise<void>
  createPayment: (data: PaymentCreateData) => Promise<PaymentOrder>
  updatePayment: (id: string, data: PaymentUpdateData) => Promise<Payment>
  deletePayment: (id: string) => Promise<void>
  processPayment: (paymentData: any) => Promise<Payment>
  refundPayment: (id: string, refundData: any) => Promise<PaymentRefund>
  setFilters: (filters: PaymentFilters) => void
  setCurrentPayment: (payment: Payment | null) => void
  clearError: () => void
  refresh: () => Promise<void>
}

export function usePayments(options: UsePaymentsOptions = {}): UsePaymentsReturn {
  const { autoFetch = true, initialFilters = {} } = options

  // State
  const [payments, setPayments] = useState<Payment[]>([])
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PaymentFilters>(initialFilters)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  // Fetch payments
  const fetchPayments = useCallback(async (newFilters?: PaymentFilters) => {
    try {
      setLoading(true)
      setError(null)

      const searchFilters = newFilters || filters
      const result: PaymentSearchResult = await PaymentApiService.getPayments(searchFilters)

      setPayments(result.data)
      setPagination({
        page: result.pagination.page,
        limit: result.pagination.limit,
        total: result.pagination.total,
        totalPages: result.pagination.totalPages
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch payments'
      setError(errorMessage)
      console.error('Error fetching payments:', err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Fetch single payment
  const fetchPayment = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const payment = await PaymentApiService.getPayment(id)
      setCurrentPayment(payment)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch payment'
      setError(errorMessage)
      console.error('Error fetching payment:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Create payment
  const createPayment = useCallback(async (data: PaymentCreateData): Promise<PaymentOrder> => {
    try {
      setLoading(true)
      setError(null)

      const paymentOrder = await PaymentApiService.createPayment(data)
      // PaymentOrder is not a Payment, so we don't add it to the payments array
      // You might want to refresh the payments list or handle this differently
      await fetchPayments() // Refresh to get updated payments

      return paymentOrder
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create payment'
      setError(errorMessage)
      console.error('Error creating payment:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Update payment
  const updatePayment = useCallback(async (id: string, data: PaymentUpdateData): Promise<Payment> => {
    try {
      setLoading(true)
      setError(null)

      const payment = await PaymentApiService.updatePayment(id, data)
      
      setPayments(prev => prev.map(p => p.id === id ? payment : p))
      if (currentPayment?.id === id) {
        setCurrentPayment(payment)
      }
      
      return payment
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update payment'
      setError(errorMessage)
      console.error('Error updating payment:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentPayment])

  // Delete payment
  const deletePayment = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      await PaymentApiService.deletePayment(id)
      
      setPayments(prev => prev.filter(p => p.id !== id))
      if (currentPayment?.id === id) {
        setCurrentPayment(null)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete payment'
      setError(errorMessage)
      console.error('Error deleting payment:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentPayment])

  // Process payment
  const processPayment = useCallback(async (paymentData: any): Promise<Payment> => {
    try {
      setLoading(true)
      setError(null)

      const payment = await PaymentApiService.processPayment(paymentData)
      setPayments(prev => [payment, ...prev])
      setCurrentPayment(payment)
      
      return payment
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process payment'
      setError(errorMessage)
      console.error('Error processing payment:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Refund payment
  const refundPayment = useCallback(async (id: string, refundData: any): Promise<PaymentRefund> => {
    try {
      setLoading(true)
      setError(null)

      const refund = await PaymentApiService.refundPayment(id, refundData)

      // Since refund doesn't change the payment object directly, we refresh the payments
      await fetchPayments() // Refresh to get updated payment status

      return refund
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refund payment'
      setError(errorMessage)
      console.error('Error refunding payment:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentPayment])

  // Set filters
  const handleSetFilters = useCallback((newFilters: PaymentFilters) => {
    setFilters(newFilters)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Refresh
  const refresh = useCallback(async () => {
    await fetchPayments()
  }, [fetchPayments])

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchPayments()
    }
  }, [autoFetch, fetchPayments])

  return {
    // State
    payments,
    currentPayment,
    loading,
    error,
    filters,
    pagination,

    // Actions
    fetchPayments,
    fetchPayment,
    createPayment,
    updatePayment,
    deletePayment,
    processPayment,
    refundPayment,
    setFilters: handleSetFilters,
    setCurrentPayment,
    clearError,
    refresh
  }
}

export default usePayments
