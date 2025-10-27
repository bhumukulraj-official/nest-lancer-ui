/**
 * AdminGuard Component Tests
 */

import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { AdminGuard } from './AdminGuard'

vi.mock('@/hooks/auth/useAuth')

describe('AdminGuard', () => {
  it('should render children for admin users', () => {
    const { useAuth } = require('@/hooks/auth/useAuth')
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isAdmin: true,
      user: { role: 'admin' },
    })

    render(
      <AdminGuard>
        <div>Admin Only Content</div>
      </AdminGuard>
    )

    expect(screen.getByText('Admin Only Content')).toBeInTheDocument()
  })

  it('should not render children for non-admin users', () => {
    const { useAuth } = require('@/hooks/auth/useAuth')
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isAdmin: false,
      user: { role: 'user' },
    })

    render(
      <AdminGuard>
        <div>Admin Only Content</div>
      </AdminGuard>
    )

    expect(screen.queryByText('Admin Only Content')).not.toBeInTheDocument()
  })
})

