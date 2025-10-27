/**
 * useMutation Hook Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMutation } from './useMutation'

describe('useMutation', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    })
  })

  it('should execute mutation', async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: 'success' })

    const { result } = renderHook(
      () => useMutation(mockFn),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    )

    act(() => {
      result.current.mutate({ test: 'data' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })
})

