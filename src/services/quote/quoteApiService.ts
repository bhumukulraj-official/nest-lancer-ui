/**
 * Quote API Service
 * Handles all quote-related API calls
 * UI-only service - no business logic processing
 */

import type {
  Quote,
  QuoteCreateData,
  QuoteUpdateData,
  QuoteFilters,
  QuoteSearchResult,
  QuoteStats,
  QuoteStatus,
  QuoteItem,
  QuotePricing,
  QuoteDiscount,
  QuoteTax,
  QuotePaymentTerms,
  QuoteValidity,
  QuoteApproval,
  QuoteRejection,
  QuoteRevision,
  QuoteAcceptance,
  QuoteAnalytics
} from '../../types/models/quote.types'
import { apiClient } from '../api/client'
import { QUOTE_ENDPOINTS } from '../api/endpoints'

export class QuoteApiService {
  /**
   * Get all quotes with optional filtering
   */
  static async getQuotes(filters?: QuoteFilters): Promise<QuoteSearchResult> {
    try {
      const response = await apiClient.get(QUOTE_ENDPOINTS.LIST, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching quotes:', error)
      throw error
    }
  }

  /**
   * Get a single quote by ID
   */
  static async getQuote(id: string): Promise<Quote> {
    try {
      const response = await apiClient.get(`${QUOTE_ENDPOINTS.BASE}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching quote:', error)
      throw error
    }
  }

  /**
   * Create a new quote
   */
  static async createQuote(quoteData: QuoteCreateData): Promise<Quote> {
    try {
      const response = await apiClient.post(QUOTE_ENDPOINTS.CREATE, quoteData)
      return response.data
    } catch (error) {
      console.error('Error creating quote:', error)
      throw error
    }
  }

  /**
   * Update quote
   */
  static async updateQuote(id: string, quoteData: QuoteUpdateData): Promise<Quote> {
    try {
      const response = await apiClient.put(`${QUOTE_ENDPOINTS.BASE}/${id}`, quoteData)
      return response.data
    } catch (error) {
      console.error('Error updating quote:', error)
      throw error
    }
  }

  /**
   * Delete quote
   */
  static async deleteQuote(id: string): Promise<void> {
    try {
      await apiClient.delete(`${QUOTE_ENDPOINTS.BASE}/${id}`)
    } catch (error) {
      console.error('Error deleting quote:', error)
      throw error
    }
  }

  /**
   * Update quote status
   */
  static async updateQuoteStatus(id: string, status: QuoteStatus): Promise<Quote> {
    try {
      const response = await apiClient.patch(`${QUOTE_ENDPOINTS.BASE}/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating quote status:', error)
      throw error
    }
  }

  /**
   * Add quote item
   */
  static async addQuoteItem(id: string, item: QuoteItem): Promise<Quote> {
    try {
      const response = await apiClient.post(`${QUOTE_ENDPOINTS.BASE}/${id}/items`, item)
      return response.data
    } catch (error) {
      console.error('Error adding quote item:', error)
      throw error
    }
  }

  /**
   * Update quote item
   */
  static async updateQuoteItem(id: string, itemId: string, item: Partial<QuoteItem>): Promise<Quote> {
    try {
      const response = await apiClient.put(`${QUOTE_ENDPOINTS.BASE}/${id}/items/${itemId}`, item)
      return response.data
    } catch (error) {
      console.error('Error updating quote item:', error)
      throw error
    }
  }

  /**
   * Remove quote item
   */
  static async removeQuoteItem(id: string, itemId: string): Promise<Quote> {
    try {
      const response = await apiClient.delete(`${QUOTE_ENDPOINTS.BASE}/${id}/items/${itemId}`)
      return response.data
    } catch (error) {
      console.error('Error removing quote item:', error)
      throw error
    }
  }

  /**
   * Update quote pricing
   */
  static async updateQuotePricing(id: string, pricing: QuotePricing): Promise<Quote> {
    try {
      const response = await apiClient.patch(`${QUOTE_ENDPOINTS.BASE}/${id}/pricing`, pricing)
      return response.data
    } catch (error) {
      console.error('Error updating quote pricing:', error)
      throw error
    }
  }

  /**
   * Add quote discount
   */
  static async addQuoteDiscount(id: string, discount: QuoteDiscount): Promise<Quote> {
    try {
      const response = await apiClient.post(`${QUOTE_ENDPOINTS.BASE}/${id}/discounts`, discount)
      return response.data
    } catch (error) {
      console.error('Error adding quote discount:', error)
      throw error
    }
  }

  /**
   * Update quote discount
   */
  static async updateQuoteDiscount(id: string, discountId: string, discount: Partial<QuoteDiscount>): Promise<Quote> {
    try {
      const response = await apiClient.put(`${QUOTE_ENDPOINTS.BASE}/${id}/discounts/${discountId}`, discount)
      return response.data
    } catch (error) {
      console.error('Error updating quote discount:', error)
      throw error
    }
  }

  /**
   * Remove quote discount
   */
  static async removeQuoteDiscount(id: string, discountId: string): Promise<Quote> {
    try {
      const response = await apiClient.delete(`${QUOTE_ENDPOINTS.BASE}/${id}/discounts/${discountId}`)
      return response.data
    } catch (error) {
      console.error('Error removing quote discount:', error)
      throw error
    }
  }

  /**
   * Update quote tax
   */
  static async updateQuoteTax(id: string, tax: QuoteTax): Promise<Quote> {
    try {
      const response = await apiClient.patch(`${QUOTE_ENDPOINTS.BASE}/${id}/tax`, tax)
      return response.data
    } catch (error) {
      console.error('Error updating quote tax:', error)
      throw error
    }
  }

  /**
   * Update payment terms
   */
  static async updatePaymentTerms(id: string, paymentTerms: QuotePaymentTerms): Promise<Quote> {
    try {
      const response = await apiClient.patch(`${QUOTE_ENDPOINTS.BASE}/${id}/payment-terms`, paymentTerms)
      return response.data
    } catch (error) {
      console.error('Error updating payment terms:', error)
      throw error
    }
  }

  /**
   * Update quote validity
   */
  static async updateQuoteValidity(id: string, validity: QuoteValidity): Promise<Quote> {
    try {
      const response = await apiClient.patch(`${QUOTE_ENDPOINTS.BASE}/${id}/validity`, validity)
      return response.data
    } catch (error) {
      console.error('Error updating quote validity:', error)
      throw error
    }
  }

  /**
   * Submit quote for approval
   */
  static async submitForApproval(id: string): Promise<Quote> {
    try {
      const response = await apiClient.post(`${QUOTE_ENDPOINTS.BASE}/${id}/submit`)
      return response.data
    } catch (error) {
      console.error('Error submitting quote for approval:', error)
      throw error
    }
  }

  /**
   * Approve quote
   */
  static async approveQuote(id: string, approval: QuoteApproval): Promise<Quote> {
    try {
      const response = await apiClient.post(`${QUOTE_ENDPOINTS.BASE}/${id}/approve`, approval)
      return response.data
    } catch (error) {
      console.error('Error approving quote:', error)
      throw error
    }
  }

  /**
   * Reject quote
   */
  static async rejectQuote(id: string, rejection: QuoteRejection): Promise<Quote> {
    try {
      const response = await apiClient.post(`${QUOTE_ENDPOINTS.BASE}/${id}/reject`, rejection)
      return response.data
    } catch (error) {
      console.error('Error rejecting quote:', error)
      throw error
    }
  }

  /**
   * Request quote revision
   */
  static async requestRevision(id: string, revision: QuoteRevision): Promise<Quote> {
    try {
      const response = await apiClient.post(`${QUOTE_ENDPOINTS.BASE}/${id}/revision`, revision)
      return response.data
    } catch (error) {
      console.error('Error requesting quote revision:', error)
      throw error
    }
  }

  /**
   * Accept quote
   */
  static async acceptQuote(id: string, acceptance: QuoteAcceptance): Promise<Quote> {
    try {
      const response = await apiClient.post(`${QUOTE_ENDPOINTS.BASE}/${id}/accept`, acceptance)
      return response.data
    } catch (error) {
      console.error('Error accepting quote:', error)
      throw error
    }
  }

  /**
   * Decline quote
   */
  static async declineQuote(id: string, reason: string): Promise<Quote> {
    try {
      const response = await apiClient.post(`${QUOTE_ENDPOINTS.BASE}/${id}/decline`, { reason })
      return response.data
    } catch (error) {
      console.error('Error declining quote:', error)
      throw error
    }
  }

  /**
   * Convert quote to project
   */
  static async convertToProject(id: string, projectData: any): Promise<{ quote: Quote; project: any }> {
    try {
      const response = await apiClient.post(`${QUOTE_ENDPOINTS.BASE}/${id}/convert-to-project`, projectData)
      return response.data
    } catch (error) {
      console.error('Error converting quote to project:', error)
      throw error
    }
  }

  /**
   * Duplicate quote
   */
  static async duplicateQuote(id: string, modifications?: Partial<QuoteCreateData>): Promise<Quote> {
    try {
      const response = await apiClient.post(`${QUOTE_ENDPOINTS.BASE}/${id}/duplicate`, modifications)
      return response.data
    } catch (error) {
      console.error('Error duplicating quote:', error)
      throw error
    }
  }

  /**
   * Get quote statistics
   */
  static async getQuoteStats(filters?: QuoteFilters): Promise<QuoteStats> {
    try {
      const response = await apiClient.get(QUOTE_ENDPOINTS.STATS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching quote stats:', error)
      throw error
    }
  }

  /**
   * Get quote analytics
   */
  static async getQuoteAnalytics(filters?: QuoteFilters): Promise<QuoteAnalytics> {
    try {
      const response = await apiClient.get(QUOTE_ENDPOINTS.ANALYTICS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching quote analytics:', error)
      throw error
    }
  }

  /**
   * Search quotes
   */
  static async searchQuotes(query: string, filters?: QuoteFilters): Promise<QuoteSearchResult> {
    try {
      const response = await apiClient.get(QUOTE_ENDPOINTS.SEARCH, {
        params: { query, ...filters }
      })
      return response.data
    } catch (error) {
      console.error('Error searching quotes:', error)
      throw error
    }
  }

  /**
   * Bulk update quotes (Admin only)
   */
  static async bulkUpdateQuotes(updates: Array<{ id: string; data: QuoteUpdateData }>): Promise<Quote[]> {
    try {
      const response = await apiClient.patch(QUOTE_ENDPOINTS.BULK_UPDATE, { updates })
      return response.data
    } catch (error) {
      console.error('Error bulk updating quotes:', error)
      throw error
    }
  }

  /**
   * Export quotes (Admin only)
   */
  static async exportQuotes(filters?: QuoteFilters): Promise<Blob> {
    try {
      const response = await apiClient.get(QUOTE_ENDPOINTS.EXPORT, {
        params: filters,
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting quotes:', error)
      throw error
    }
  }

  /**
   * Get quotes by request
   */
  static async getQuotesByRequest(requestId: string, filters?: QuoteFilters): Promise<QuoteSearchResult> {
    try {
      const response = await apiClient.get(`${QUOTE_ENDPOINTS.BY_REQUEST}/${requestId}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching quotes by request:', error)
      throw error
    }
  }

  /**
   * Get quotes by user
   */
  static async getQuotesByUser(userId: string, filters?: QuoteFilters): Promise<QuoteSearchResult> {
    try {
      const response = await apiClient.get(`${QUOTE_ENDPOINTS.BY_USER}/${userId}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching quotes by user:', error)
      throw error
    }
  }

  /**
   * Generate quote PDF
   */
  static async generateQuotePDF(id: string): Promise<Blob> {
    try {
      const response = await apiClient.get(`${QUOTE_ENDPOINTS.BASE}/${id}/pdf`, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error generating quote PDF:', error)
      throw error
    }
  }

  /**
   * Send quote via email
   */
  static async sendQuoteEmail(id: string, emailData: { to: string; subject?: string; message?: string }): Promise<void> {
    try {
      await apiClient.post(`${QUOTE_ENDPOINTS.BASE}/${id}/send-email`, emailData)
    } catch (error) {
      console.error('Error sending quote email:', error)
      throw error
    }
  }
}

export default QuoteApiService
