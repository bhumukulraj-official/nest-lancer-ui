/**
 * useRequests Hook Tests
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { useRequests } from './useRequests'

describe('useRequests', () => {
  let queryClient: QueryClient

  it('should provide request management methods', () => {
    queryClient = new QueryClient()

    const { result } = renderHook(() => useRequests(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    expect(result.current).toHaveProperty('requests')
    expect(result.current).toHaveProperty('isLoading')
  })
})

