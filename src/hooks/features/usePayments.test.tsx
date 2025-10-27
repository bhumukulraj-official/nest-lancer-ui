/**
 * usePayments Hook Tests
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { usePayments } from './usePayments'

describe('usePayments', () => {
  let queryClient: QueryClient

  it('should provide payment methods', () => {
    queryClient = new QueryClient()

    const { result } = renderHook(() => usePayments(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    expect(result.current).toHaveProperty('payments')
    expect(result.current).toHaveProperty('createPayment')
  })
})

