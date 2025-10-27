/**
 * useNotifications Hook Tests
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { useNotifications } from './useNotifications'

describe('useNotifications', () => {
  let queryClient: QueryClient

  it('should provide notification methods', () => {
    queryClient = new QueryClient()

    const { result } = renderHook(() => useNotifications(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    expect(result.current).toHaveProperty('notifications')
    expect(result.current).toHaveProperty('markAsRead')
  })
})

