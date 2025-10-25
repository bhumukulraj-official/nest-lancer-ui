/**
 * Pagination Hook
 * Custom hook for pagination management
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useMemo } from 'react'

export interface PaginationState {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface UsePaginationOptions {
  initialPage?: number
  initialLimit?: number
  total?: number
  maxVisiblePages?: number
}

export interface UsePaginationReturn {
  // State
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFirstPage: boolean
  isLastPage: boolean

  // Actions
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setTotal: (total: number) => void
  nextPage: () => void
  previousPage: () => void
  firstPage: () => void
  lastPage: () => void
  goToPage: (page: number) => void
  reset: () => void

  // Computed
  visiblePages: number[]
  startIndex: number
  endIndex: number
  paginationInfo: string
}

export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const {
    initialPage = 1,
    initialLimit = 10,
    total = 0,
    maxVisiblePages = 5
  } = options

  // State
  const [page, setPageState] = useState(initialPage)
  const [limit, setLimitState] = useState(initialLimit)
  const [totalItems, setTotalItems] = useState(total)

  // Computed values
  const totalPages = Math.ceil(totalItems / limit)
  const hasNextPage = page < totalPages
  const hasPreviousPage = page > 1
  const isFirstPage = page === 1
  const isLastPage = page === totalPages

  // Visible pages calculation
  const visiblePages = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const halfVisible = Math.floor(maxVisiblePages / 2)
    let startPage = Math.max(1, page - halfVisible)
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }, [page, totalPages, maxVisiblePages])

  // Start and end indices for current page
  const startIndex = (page - 1) * limit + 1
  const endIndex = Math.min(page * limit, totalItems)

  // Pagination info string
  const paginationInfo = useMemo(() => {
    if (totalItems === 0) return 'No items'
    return `${startIndex}-${endIndex} of ${totalItems}`
  }, [startIndex, endIndex, totalItems])

  // Actions
  const setPage = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageState(newPage)
    }
  }, [totalPages])

  const setLimit = useCallback((newLimit: number) => {
    if (newLimit > 0) {
      setLimitState(newLimit)
      // Reset to first page when changing limit
      setPageState(1)
    }
  }, [])

  const setTotal = useCallback((newTotal: number) => {
    setTotalItems(newTotal)
    // Adjust page if it's beyond the new total
    const newTotalPages = Math.ceil(newTotal / limit)
    if (page > newTotalPages && newTotalPages > 0) {
      setPageState(newTotalPages)
    }
  }, [page, limit])

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPageState(prev => prev + 1)
    }
  }, [hasNextPage])

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPageState(prev => prev - 1)
    }
  }, [hasPreviousPage])

  const firstPage = useCallback(() => {
    setPageState(1)
  }, [])

  const lastPage = useCallback(() => {
    setPageState(totalPages)
  }, [totalPages])

  const goToPage = useCallback((targetPage: number) => {
    setPage(targetPage)
  }, [setPage])

  const reset = useCallback(() => {
    setPageState(initialPage)
    setLimitState(initialLimit)
    setTotalItems(total)
  }, [initialPage, initialLimit, total])

  return {
    // State
    page,
    limit,
    total: totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    isFirstPage,
    isLastPage,

    // Actions
    setPage,
    setLimit,
    setTotal,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    goToPage,
    reset,

    // Computed
    visiblePages,
    startIndex,
    endIndex,
    paginationInfo
  }
}

export default usePagination
