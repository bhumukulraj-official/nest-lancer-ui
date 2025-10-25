/**
 * Requests Hook
 * Custom hook for request management
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect } from 'react'
import { RequestApiService } from '../../services/request/requestApiService'
import type {
  Request,
  RequestCreateData,
  RequestUpdateData,
  RequestFilters,
  RequestSearchResult
} from '../../types/models/request.types'

export interface UseRequestsOptions {
  autoFetch?: boolean
  initialFilters?: RequestFilters
}

export interface UseRequestsReturn {
  // State
  requests: Request[]
  currentRequest: Request | null
  loading: boolean
  error: string | null
  filters: RequestFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }

  // Actions
  fetchRequests: (filters?: RequestFilters) => Promise<void>
  fetchRequest: (id: string) => Promise<void>
  createRequest: (data: RequestCreateData) => Promise<Request>
  updateRequest: (id: string, data: RequestUpdateData) => Promise<Request>
  deleteRequest: (id: string) => Promise<void>
  updateRequestStatus: (id: string, status: string) => Promise<Request>
  assignRequest: (id: string, assigneeId: string) => Promise<Request>
  setFilters: (filters: RequestFilters) => void
  setCurrentRequest: (request: Request | null) => void
  clearError: () => void
  refresh: () => Promise<void>
}

export function useRequests(options: UseRequestsOptions = {}): UseRequestsReturn {
  const { autoFetch = true, initialFilters = {} } = options

  // State
  const [requests, setRequests] = useState<Request[]>([])
  const [currentRequest, setCurrentRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<RequestFilters>(initialFilters)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  // Fetch requests
  const fetchRequests = useCallback(async (newFilters?: RequestFilters) => {
    try {
      setLoading(true)
      setError(null)

      const searchFilters = newFilters || filters
      const result: RequestSearchResult = await RequestApiService.getRequests(searchFilters)

      setRequests(result.data)
      setPagination({
        page: result.pagination.page,
        limit: result.pagination.limit,
        total: result.pagination.total,
        totalPages: result.pagination.totalPages
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch requests'
      setError(errorMessage)
      console.error('Error fetching requests:', err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Fetch single request
  const fetchRequest = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const request = await RequestApiService.getRequest(id)
      setCurrentRequest(request)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch request'
      setError(errorMessage)
      console.error('Error fetching request:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Create request
  const createRequest = useCallback(async (data: RequestCreateData): Promise<Request> => {
    try {
      setLoading(true)
      setError(null)

      const request = await RequestApiService.createRequest(data)
      setRequests(prev => [request, ...prev])
      setCurrentRequest(request)
      
      return request
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create request'
      setError(errorMessage)
      console.error('Error creating request:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Update request
  const updateRequest = useCallback(async (id: string, data: RequestUpdateData): Promise<Request> => {
    try {
      setLoading(true)
      setError(null)

      const request = await RequestApiService.updateRequest(id, data)
      
      setRequests(prev => prev.map(r => r.id === id ? request : r))
      if (currentRequest?.id === id) {
        setCurrentRequest(request)
      }
      
      return request
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update request'
      setError(errorMessage)
      console.error('Error updating request:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentRequest])

  // Delete request
  const deleteRequest = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      await RequestApiService.deleteRequest(id)
      
      setRequests(prev => prev.filter(r => r.id !== id))
      if (currentRequest?.id === id) {
        setCurrentRequest(null)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete request'
      setError(errorMessage)
      console.error('Error deleting request:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentRequest])

  // Update request status
  const updateRequestStatus = useCallback(async (id: string, status: string) => {
    try {
      setLoading(true)
      setError(null)

      const request = await RequestApiService.updateRequestStatus(id, status as any)
      
      setRequests(prev => prev.map(r => r.id === id ? request : r))
      if (currentRequest?.id === id) {
        setCurrentRequest(request)
      }
      
      return request
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update request status'
      setError(errorMessage)
      console.error('Error updating request status:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentRequest])

  // Assign request
  const assignRequest = useCallback(async (id: string, assigneeId: string) => {
    try {
      setLoading(true)
      setError(null)

      const request = await RequestApiService.assignRequest(id, assigneeId)
      
      setRequests(prev => prev.map(r => r.id === id ? request : r))
      if (currentRequest?.id === id) {
        setCurrentRequest(request)
      }
      
      return request
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to assign request'
      setError(errorMessage)
      console.error('Error assigning request:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentRequest])

  // Set filters
  const handleSetFilters = useCallback((newFilters: RequestFilters) => {
    setFilters(newFilters)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Refresh
  const refresh = useCallback(async () => {
    await fetchRequests()
  }, [fetchRequests])

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchRequests()
    }
  }, [autoFetch, fetchRequests])

  return {
    // State
    requests,
    currentRequest,
    loading,
    error,
    filters,
    pagination,

    // Actions
    fetchRequests,
    fetchRequest,
    createRequest,
    updateRequest,
    deleteRequest,
    updateRequestStatus,
    assignRequest,
    setFilters: handleSetFilters,
    setCurrentRequest,
    clearError,
    refresh
  }
}

export default useRequests
