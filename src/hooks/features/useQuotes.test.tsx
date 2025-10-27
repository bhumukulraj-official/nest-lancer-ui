/**
 * useQuotes Hook Tests
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { useQuotes } from './useQuotes'

describe('useQuotes', () => {
  let queryClient: QueryClient

  it('should provide quote management methods', () => {
    queryClient = new QueryClient()

    const { result } = renderHook(() => useQuotes(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    expect(result.current).toHaveProperty('quotes')
    expect(result.current).toHaveProperty('createQuote')
  })
})

