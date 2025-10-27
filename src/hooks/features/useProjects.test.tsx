/**
 * useProjects Hook Tests
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { useProjects } from './useProjects'

// Mock services
vi.mock('@/services/project/projectApiService')

describe('useProjects', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    })
  })

  it('should fetch projects', async () => {
    const { result } = renderHook(() => useProjects(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.projects).toBeDefined())
  })
})

