/**
 * Search Hook
 * Custom hook for search functionality
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect, useMemo } from 'react'

export interface UseSearchOptions<T = any> {
  data: T[]
  searchFields: (keyof T)[]
  initialQuery?: string
  debounceMs?: number
  caseSensitive?: boolean
  exactMatch?: boolean
  customFilter?: (item: T, query: string) => boolean
}

export interface UseSearchReturn<T = any> {
  // State
  query: string
  results: T[]
  isSearching: boolean
  hasResults: boolean
  resultCount: number

  // Actions
  setQuery: (query: string) => void
  clearSearch: () => void
  search: (query: string) => void

  // Computed
  isEmpty: boolean
  isExactMatch: boolean
}

export function useSearch<T = any>(options: UseSearchOptions<T>): UseSearchReturn<T> {
  const {
    data,
    searchFields,
    initialQuery = '',
    debounceMs = 300,
    caseSensitive = false,
    exactMatch = false,
    customFilter
  } = options

  // State
  const [query, setQueryState] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const [isSearching, setIsSearching] = useState(false)

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
      setIsSearching(false)
    }, debounceMs)

    if (query !== debouncedQuery) {
      setIsSearching(true)
    }

    return () => clearTimeout(timer)
  }, [query, debouncedQuery, debounceMs])

  // Search function
  const searchItems = useCallback((searchQuery: string, items: T[]): T[] => {
    if (!searchQuery.trim()) {
      return items
    }

    const normalizedQuery = caseSensitive ? searchQuery : searchQuery.toLowerCase()

    return items.filter(item => {
      // Use custom filter if provided
      if (customFilter) {
        return customFilter(item, searchQuery)
      }

      // Search in specified fields
      return searchFields.some(field => {
        const fieldValue = item[field]
        if (fieldValue === null || fieldValue === undefined) {
          return false
        }

        const normalizedValue = caseSensitive 
          ? String(fieldValue) 
          : String(fieldValue).toLowerCase()

        if (exactMatch) {
          return normalizedValue === normalizedQuery
        } else {
          return normalizedValue.includes(normalizedQuery)
        }
      })
    })
  }, [searchFields, caseSensitive, exactMatch, customFilter])

  // Search results
  const results = useMemo(() => {
    return searchItems(debouncedQuery, data)
  }, [debouncedQuery, data, searchItems])

  // Computed values
  const hasResults = results.length > 0
  const resultCount = results.length
  const isEmpty = !query.trim()
  const isExactMatch = exactMatch && hasResults && resultCount === 1

  // Actions
  const setQuery = useCallback((newQuery: string) => {
    setQueryState(newQuery)
  }, [])

  const clearSearch = useCallback(() => {
    setQueryState('')
  }, [])

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery)
  }, [setQuery])

  return {
    // State
    query,
    results,
    isSearching,
    hasResults,
    resultCount,

    // Actions
    setQuery,
    clearSearch,
    search,

    // Computed
    isEmpty,
    isExactMatch
  }
}

export default useSearch
