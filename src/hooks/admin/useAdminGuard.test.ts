/**
 * useAdminGuard Hook Tests
 */

import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { useAuthStore } from '@/stores/authStore'

import { useAdminGuard } from './useAdminGuard'


vi.mock('@/stores/authStore')

describe('useAdminGuard', () => {
  it('should allow access for admin users', () => {
    (useAuthStore as any).mockReturnValue({
      user: { role: 'admin' },
      isAuthenticated: true,
    })

    const { result } = renderHook(() => useAdminGuard())

    expect(result.current.hasAccess).toBe(true)
  })

  it('should deny access for non-admin users', () => {
    (useAuthStore as any).mockReturnValue({
      user: { role: 'user' },
      isAuthenticated: true,
    })

    const { result } = renderHook(() => useAdminGuard())

    expect(result.current.hasAccess).toBe(false)
  })
})

