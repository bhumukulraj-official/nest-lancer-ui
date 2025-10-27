/**
 * usePagination Hook Tests
 */

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { usePagination } from './usePagination'

describe('usePagination', () => {
  it('should initialize with default pagination', () => {
    const { result } = renderHook(() => usePagination())

    expect(result.current.page).toBe(1)
    expect(result.current.limit).toBe(10)
  })

  it('should change page', () => {
    const { result } = renderHook(() => usePagination())

    act(() => {
      result.current.setPage(2)
    })

    expect(result.current.page).toBe(2)
  })

  it('should change page size', () => {
    const { result } = renderHook(() => usePagination())

    act(() => {
      result.current.setLimit(20)
    })

    expect(result.current.limit).toBe(20)
  })
})

