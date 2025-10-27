/**
 * Search Hook Tests
 * Unit tests for the useSearch hook
 */

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { useSearch } from './useSearch'

interface TestItem {
  id: number
  name: string
  email: string
  status: string
}

describe('useSearch', () => {
  const mockData: TestItem[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
  ]

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  describe('Initialization', () => {
    it('should initialize with empty query', () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name', 'email']
        })
      )

      expect(result.current.query).toBe('')
      expect(result.current.results).toEqual(mockData)
      expect(result.current.isEmpty).toBe(true)
    })

    it('should initialize with initial query', () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name'],
          initialQuery: 'John'
        })
      )

      expect(result.current.query).toBe('John')
    })
  })

  describe('Basic Search', () => {
    it('should filter results by query', async () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name']
        })
      )

      act(() => {
        result.current.setQuery('John')
      })

      act(() => {
        vi.advanceTimersByTime(400)
      })

      expect(result.current.results.length).toBe(1)
      expect(result.current.results[0].name).toBe('John Doe')
    })

    it('should return all results when query is empty', async () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name']
        })
      )

      act(() => {
        result.current.setQuery('')
        vi.advanceTimersByTime(400)
      })

      expect(result.current.results).toEqual(mockData)
      expect(result.current.isEmpty).toBe(true)
    })
  })

  describe('Debouncing', () => {
    it('should debounce search input', async () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name'],
          debounceMs: 300
        })
      )

      act(() => {
        result.current.setQuery('J')
        vi.advanceTimersByTime(100)
      })

      expect(result.current.isSearching).toBe(true)
      expect(result.current.results.length).toBeGreaterThan(0)

      act(() => {
        result.current.setQuery('Jo')
        vi.advanceTimersByTime(300)
      })

      expect(result.current.isSearching).toBe(false)
    })
  })

  describe('Case Sensitivity', () => {
    it('should perform case-insensitive search by default', async () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name']
        })
      )

      act(() => {
        result.current.setQuery('JOHN')
        vi.advanceTimersByTime(400)
      })

      expect(result.current.results.length).toBe(1)
      expect(result.current.results[0].name).toBe('John Doe')
    })

    it('should perform case-sensitive search when enabled', async () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name'],
          caseSensitive: true
        })
      )

      act(() => {
        result.current.setQuery('john')
        vi.advanceTimersByTime(400)
      })

      expect(result.current.results.length).toBe(0)
    })
  })

  describe('Exact Match', () => {
    it('should find exact matches when enabled', async () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name'],
          exactMatch: true
        })
      )

      act(() => {
        result.current.setQuery('John')
        vi.advanceTimersByTime(400)
      })

      // No exact match
      expect(result.current.results.length).toBe(0)
    })
  })

  describe('Multiple Search Fields', () => {
    it('should search across multiple fields', async () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name', 'email']
        })
      )

      act(() => {
        result.current.setQuery('jane@example.com')
        vi.advanceTimersByTime(400)
      })

      expect(result.current.results.length).toBe(1)
      expect(result.current.results[0].name).toBe('Jane Smith')
    })
  })

  describe('Actions', () => {
    it('should clear search', async () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name']
        })
      )

      act(() => {
        result.current.setQuery('John')
        vi.advanceTimersByTime(400)
      })

      act(() => {
        result.current.clearSearch()
        vi.advanceTimersByTime(400)
      })

      expect(result.current.query).toBe('')
      expect(result.current.results).toEqual(mockData)
    })

    it('should use search method', async () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name']
        })
      )

      act(() => {
        result.current.search('Jane')
        vi.advanceTimersByTime(400)
      })

      expect(result.current.query).toBe('Jane')
    })
  })

  describe('Computed Values', () => {
    it('should calculate result count', async () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name']
        })
      )

      act(() => {
        result.current.setQuery('John')
        vi.advanceTimersByTime(400)
      })

      expect(result.current.resultCount).toBe(1)
      expect(result.current.hasResults).toBe(true)
    })

    it('should detect no results', async () => {
      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name']
        })
      )

      act(() => {
        result.current.setQuery('NonExistent')
        vi.advanceTimersByTime(400)
      })

      expect(result.current.resultCount).toBe(0)
      expect(result.current.hasResults).toBe(false)
    })
  })

  describe('Custom Filter', () => {
    it('should use custom filter function', async () => {
      const customFilter = vi.fn((item: TestItem, query: string) => {
        return item.status === query
      })

      const { result } = renderHook(() =>
        useSearch({
          data: mockData,
          searchFields: ['name'],
          customFilter
        })
      )

      act(() => {
        result.current.setQuery('active')
        vi.advanceTimersByTime(400)
      })

      expect(customFilter).toHaveBeenCalled()
      expect(result.current.results.length).toBe(2)
    })
  })
})

