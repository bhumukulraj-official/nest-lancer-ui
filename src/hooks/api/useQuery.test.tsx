/**
 * useQuery Hook Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useQuery } from './useQuery'
import { apiClient } from '@/services/api/client'

describe('useQuery', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    })
  })

  it('should fetch data successfully', async () => {
    const mockData = { data: 'test' }
    ;(apiClient.get as any).mockResolvedValue(mockData)

    const { result } = renderHook(
      () => useQuery(['test'], '/test-endpoint'),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    )

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(mockData)
  })
})

