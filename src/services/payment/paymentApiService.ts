/**
 * Payment API Service
 * Handles all payment-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { PAYMENT_ENDPOINTS } from '../api/endpoints'
import type {
  Payment,
  PaymentCreateData,
  PaymentUpdateData,
  PaymentFilters,
  PaymentSearchResult,
  PaymentStats,
  PaymentMethod,
  PaymentOrder,
  PaymentReceipt,
  PaymentRefund,
  RefundCreateData,
  RazorpayConfig,
  RazorpayOrder,
  PaymentAnalytics
} from '../../types/models/payment.types'

export class PaymentApiService {
  /**
   * Get all payments with optional filtering
   */
  static async getPayments(filters?: PaymentFilters): Promise<PaymentSearchResult> {
    try {
      const response = await apiClient.get(PAYMENT_ENDPOINTS.LIST, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching payments:', error)
      throw error
    }
  }

  /**
   * Get a single payment by ID
   */
  static async getPayment(id: string): Promise<Payment> {
    try {
      const response = await apiClient.get(PAYMENT_ENDPOINTS.DETAIL(id))
      return response.data
    } catch (error) {
      console.error(`Error fetching payment ${id}:`, error)
      throw error
    }
  }

  /**
   * Create a new payment (alias for createPaymentOrder)
   */
  static async createPayment(data: PaymentCreateData): Promise<PaymentOrder> {
    return this.createPaymentOrder(data)
  }

  /**
   * Create a new payment order
   */
  static async createPaymentOrder(data: PaymentCreateData): Promise<PaymentOrder> {
    try {
      const response = await apiClient.post(PAYMENT_ENDPOINTS.CREATE_ORDER, data)
      return response.data
    } catch (error) {
      console.error('Error creating payment order:', error)
      throw error
    }
  }

  /**
   * Verify payment after Razorpay callback
   */
  static async verifyPayment(paymentData: {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
  }): Promise<Payment> {
    try {
      const response = await apiClient.post(PAYMENT_ENDPOINTS.VERIFY_PAYMENT, paymentData)
      return response.data
    } catch (error) {
      console.error('Error verifying payment:', error)
      throw error
    }
  }

  /**
   * Update payment status or details
   */
  static async updatePayment(id: string, data: PaymentUpdateData): Promise<Payment> {
    try {
      const response = await apiClient.put(PAYMENT_ENDPOINTS.DETAIL(id), data)
      return response.data
    } catch (error) {
      console.error(`Error updating payment ${id}:`, error)
      throw error
    }
  }

  /**
   * Process a payment (alias for verifyPayment)
   */
  static async processPayment(paymentData: {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
  }): Promise<Payment> {
    return this.verifyPayment(paymentData)
  }

  /**
   * Refund a payment (alias for processRefund)
   */
  static async refundPayment(id: string, data: RefundCreateData): Promise<PaymentRefund> {
    return this.processRefund(id, data)
  }

  /**
   * Delete a payment
   */
  static async deletePayment(id: string): Promise<void> {
    try {
      await apiClient.delete(PAYMENT_ENDPOINTS.DETAIL(id))
    } catch (error) {
      console.error(`Error deleting payment ${id}:`, error)
      throw error
    }
  }

  /**
   * Process refund for a payment
   */
  static async processRefund(id: string, data: RefundCreateData): Promise<PaymentRefund> {
    try {
      const response = await apiClient.post(PAYMENT_ENDPOINTS.REFUND(id), data)
      return response.data
    } catch (error) {
      console.error(`Error processing refund for payment ${id}:`, error)
      throw error
    }
  }

  /**
   * Get payment receipt
   */
  static async getPaymentReceipt(id: string): Promise<PaymentReceipt> {
    try {
      const response = await apiClient.get(PAYMENT_ENDPOINTS.RECEIPT(id))
      return response.data
    } catch (error) {
      console.error(`Error fetching payment receipt ${id}:`, error)
      throw error
    }
  }

  /**
   * Get payment methods for user
   */
  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const response = await apiClient.get(PAYMENT_ENDPOINTS.METHODS)
      return response.data
    } catch (error) {
      console.error('Error fetching payment methods:', error)
      throw error
    }
  }

  /**
   * Add new payment method
   */
  static async addPaymentMethod(methodData: any): Promise<PaymentMethod> {
    try {
      const response = await apiClient.post(PAYMENT_ENDPOINTS.ADD_METHOD, methodData)
      return response.data
    } catch (error) {
      console.error('Error adding payment method:', error)
      throw error
    }
  }

  /**
   * Delete payment method
   */
  static async deletePaymentMethod(id: string): Promise<void> {
    try {
      await apiClient.delete(PAYMENT_ENDPOINTS.DELETE_METHOD(id))
    } catch (error) {
      console.error(`Error deleting payment method ${id}:`, error)
      throw error
    }
  }

  /**
   * Get payment history
   */
  static async getPaymentHistory(filters?: PaymentFilters): Promise<PaymentSearchResult> {
    try {
      const response = await apiClient.get(PAYMENT_ENDPOINTS.HISTORY, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching payment history:', error)
      throw error
    }
  }

  /**
   * Get payment statistics
   */
  static async getPaymentStats(): Promise<PaymentStats> {
    try {
      const response = await apiClient.get(`${PAYMENT_ENDPOINTS.LIST}/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching payment stats:', error)
      throw error
    }
  }

  /**
   * Get payment analytics
   */
  static async getPaymentAnalytics(): Promise<PaymentAnalytics> {
    try {
      const response = await apiClient.get(`${PAYMENT_ENDPOINTS.LIST}/analytics`)
      return response.data
    } catch (error) {
      console.error('Error fetching payment analytics:', error)
      throw error
    }
  }

  /**
   * Download payment receipt as PDF
   */
  static async downloadReceipt(id: string): Promise<Blob> {
    try {
      const response = await apiClient.get(`${PAYMENT_ENDPOINTS.RECEIPT(id)}/download`, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error(`Error downloading receipt for payment ${id}:`, error)
      throw error
    }
  }

  /**
   * Get Razorpay configuration for client-side integration
   */
  static async getRazorpayConfig(): Promise<RazorpayConfig> {
    try {
      const response = await apiClient.get(`${PAYMENT_ENDPOINTS.CREATE_ORDER}/config`)
      return response.data
    } catch (error) {
      console.error('Error fetching Razorpay config:', error)
      throw error
    }
  }

  /**
   * Create Razorpay order
   */
  static async createRazorpayOrder(orderData: {
    amount: number
    currency: string
    receipt: string
    notes?: Record<string, any>
  }): Promise<RazorpayOrder> {
    try {
      const response = await apiClient.post(`${PAYMENT_ENDPOINTS.CREATE_ORDER}/razorpay`, orderData)
      return response.data
    } catch (error) {
      console.error('Error creating Razorpay order:', error)
      throw error
    }
  }

  /**
   * Get payment by Razorpay payment ID
   */
  static async getPaymentByRazorpayId(razorpayPaymentId: string): Promise<Payment> {
    try {
      const response = await apiClient.get(`${PAYMENT_ENDPOINTS.LIST}/razorpay/${razorpayPaymentId}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching payment by Razorpay ID ${razorpayPaymentId}:`, error)
      throw error
    }
  }

  /**
   * Cancel pending payment
   */
  static async cancelPayment(id: string): Promise<Payment> {
    try {
      const response = await apiClient.post(`${PAYMENT_ENDPOINTS.DETAIL(id)}/cancel`)
      return response.data
    } catch (error) {
      console.error(`Error cancelling payment ${id}:`, error)
      throw error
    }
  }

  /**
   * Retry failed payment
   */
  static async retryPayment(id: string): Promise<PaymentOrder> {
    try {
      const response = await apiClient.post(`${PAYMENT_ENDPOINTS.DETAIL(id)}/retry`)
      return response.data
    } catch (error) {
      console.error(`Error retrying payment ${id}:`, error)
      throw error
    }
  }

  /**
   * Get refund details
   */
  static async getRefundDetails(paymentId: string, refundId: string): Promise<PaymentRefund> {
    try {
      const response = await apiClient.get(`${PAYMENT_ENDPOINTS.DETAIL(paymentId)}/refunds/${refundId}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching refund details for payment ${paymentId}, refund ${refundId}:`, error)
      throw error
    }
  }

  /**
   * Get all refunds for a payment
   */
  static async getPaymentRefunds(paymentId: string): Promise<PaymentRefund[]> {
    try {
      const response = await apiClient.get(`${PAYMENT_ENDPOINTS.DETAIL(paymentId)}/refunds`)
      return response.data
    } catch (error) {
      console.error(`Error fetching refunds for payment ${paymentId}:`, error)
      throw error
    }
  }
}

export default PaymentApiService
