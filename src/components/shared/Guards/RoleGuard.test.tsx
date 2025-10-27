/**
 * RoleGuard Component Tests
 */

import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { RoleGuard } from './RoleGuard'

vi.mock('@/hooks/auth/useAuth')

describe('RoleGuard', () => {
  it('should render children when user has required role', () => {
    const { useAuth } = require('@/hooks/auth/useAuth')
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { role: 'admin' },
    })

    render(
      <RoleGuard allowedRoles={['admin']}>
        <div>Admin Content</div>
      </RoleGuard>
    )

    expect(screen.getByText('Admin Content')).toBeInTheDocument()
  })

  it('should not render children when user lacks required role', () => {
    const { useAuth } = require('@/hooks/auth/useAuth')
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { role: 'user' },
    })

    render(
      <RoleGuard allowedRoles={['admin']}>
        <div>Admin Content</div>
      </RoleGuard>
    )

    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument()
  })
})

