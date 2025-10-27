/**
 * Quotes Hook
 * Custom hook for quote management
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect } from 'react'

import { QuoteApiService } from '../../services/quote/quoteApiService'
import type {
  Quote,
  QuoteCreateData,
  QuoteUpdateData,
  QuoteFilters,
  QuoteSearchResult
} from '../../types/models/quote.types'

export interface UseQuotesOptions {
  autoFetch?: boolean
  initialFilters?: QuoteFilters
}

export interface UseQuotesReturn {
  // State
  quotes: Quote[]
  currentQuote: Quote | null
  loading: boolean
  error: string | null
  filters: QuoteFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }

  // Actions
  fetchQuotes: (filters?: QuoteFilters) => Promise<void>
  fetchQuote: (id: string) => Promise<void>
  createQuote: (data: QuoteCreateData) => Promise<Quote>
  updateQuote: (id: string, data: QuoteUpdateData) => Promise<Quote>
  deleteQuote: (id: string) => Promise<void>
  updateQuoteStatus: (id: string, status: string) => Promise<Quote>
  approveQuote: (id: string, approval: any) => Promise<Quote>
  rejectQuote: (id: string, rejection: any) => Promise<Quote>
  acceptQuote: (id: string, acceptance: any) => Promise<Quote>
  setFilters: (filters: QuoteFilters) => void
  setCurrentQuote: (quote: Quote | null) => void
  clearError: () => void
  refresh: () => Promise<void>
}

export function useQuotes(options: UseQuotesOptions = {}): UseQuotesReturn {
  const { autoFetch = true, initialFilters = {} } = options

  // State
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<QuoteFilters>(initialFilters)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  // Fetch quotes
  const fetchQuotes = useCallback(async (newFilters?: QuoteFilters) => {
    try {
      setLoading(true)
      setError(null)

      const searchFilters = newFilters || filters
      const result: QuoteSearchResult = await QuoteApiService.getQuotes(searchFilters)

      setQuotes(result.data)
      setPagination({
        page: result.pagination.page,
        limit: result.pagination.limit,
        total: result.pagination.total,
        totalPages: result.pagination.totalPages
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch quotes'
      setError(errorMessage)
      console.error('Error fetching quotes:', err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Fetch single quote
  const fetchQuote = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const quote = await QuoteApiService.getQuote(id)
      setCurrentQuote(quote)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch quote'
      setError(errorMessage)
      console.error('Error fetching quote:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Create quote
  const createQuote = useCallback(async (data: QuoteCreateData): Promise<Quote> => {
    try {
      setLoading(true)
      setError(null)

      const quote = await QuoteApiService.createQuote(data)
      setQuotes(prev => [quote, ...prev])
      setCurrentQuote(quote)
      
      return quote
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create quote'
      setError(errorMessage)
      console.error('Error creating quote:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Update quote
  const updateQuote = useCallback(async (id: string, data: QuoteUpdateData): Promise<Quote> => {
    try {
      setLoading(true)
      setError(null)

      const quote = await QuoteApiService.updateQuote(id, data)
      
      setQuotes(prev => prev.map(q => q.id === id ? quote : q))
      if (currentQuote?.id === id) {
        setCurrentQuote(quote)
      }
      
      return quote
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update quote'
      setError(errorMessage)
      console.error('Error updating quote:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentQuote])

  // Delete quote
  const deleteQuote = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      await QuoteApiService.deleteQuote(id)
      
      setQuotes(prev => prev.filter(q => q.id !== id))
      if (currentQuote?.id === id) {
        setCurrentQuote(null)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete quote'
      setError(errorMessage)
      console.error('Error deleting quote:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentQuote])

  // Update quote status
  const updateQuoteStatus = useCallback(async (id: string, status: string) => {
    try {
      setLoading(true)
      setError(null)

      const quote = await QuoteApiService.updateQuoteStatus(id, status as any)
      
      setQuotes(prev => prev.map(q => q.id === id ? quote : q))
      if (currentQuote?.id === id) {
        setCurrentQuote(quote)
      }
      
      return quote
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update quote status'
      setError(errorMessage)
      console.error('Error updating quote status:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentQuote])

  // Approve quote
  const approveQuote = useCallback(async (id: string, approval: any) => {
    try {
      setLoading(true)
      setError(null)

      const quote = await QuoteApiService.approveQuote(id, approval)
      
      setQuotes(prev => prev.map(q => q.id === id ? quote : q))
      if (currentQuote?.id === id) {
        setCurrentQuote(quote)
      }
      
      return quote
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to approve quote'
      setError(errorMessage)
      console.error('Error approving quote:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentQuote])

  // Reject quote
  const rejectQuote = useCallback(async (id: string, rejection: any) => {
    try {
      setLoading(true)
      setError(null)

      const quote = await QuoteApiService.rejectQuote(id, rejection)
      
      setQuotes(prev => prev.map(q => q.id === id ? quote : q))
      if (currentQuote?.id === id) {
        setCurrentQuote(quote)
      }
      
      return quote
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reject quote'
      setError(errorMessage)
      console.error('Error rejecting quote:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentQuote])

  // Accept quote
  const acceptQuote = useCallback(async (id: string, acceptance: any) => {
    try {
      setLoading(true)
      setError(null)

      const quote = await QuoteApiService.acceptQuote(id, acceptance)
      
      setQuotes(prev => prev.map(q => q.id === id ? quote : q))
      if (currentQuote?.id === id) {
        setCurrentQuote(quote)
      }
      
      return quote
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to accept quote'
      setError(errorMessage)
      console.error('Error accepting quote:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentQuote])

  // Set filters
  const handleSetFilters = useCallback((newFilters: QuoteFilters) => {
    setFilters(newFilters)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Refresh
  const refresh = useCallback(async () => {
    await fetchQuotes()
  }, [fetchQuotes])

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchQuotes()
    }
  }, [autoFetch, fetchQuotes])

  return {
    // State
    quotes,
    currentQuote,
    loading,
    error,
    filters,
    pagination,

    // Actions
    fetchQuotes,
    fetchQuote,
    createQuote,
    updateQuote,
    deleteQuote,
    updateQuoteStatus,
    approveQuote,
    rejectQuote,
    acceptQuote,
    setFilters: handleSetFilters,
    setCurrentQuote,
    clearError,
    refresh
  }
}

export default useQuotes
