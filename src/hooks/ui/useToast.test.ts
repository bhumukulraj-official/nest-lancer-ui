/**
 * useToast Hook Tests
 */

import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useToast } from './useToast'

vi.mock('react-hot-toast')

describe('useToast', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should provide toast methods', () => {
    const { result } = renderHook(() => useToast())
    
    expect(result.current).toHaveProperty('showToast')
    expect(result.current).toHaveProperty('showSuccess')
    expect(result.current).toHaveProperty('showError')
  })
})

