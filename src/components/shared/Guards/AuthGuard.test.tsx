/**
 * AuthGuard Component Tests
 */

import { screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { AuthGuard } from './AuthGuard'

vi.mock('@/hooks/auth/useAuth')

describe('AuthGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render children when authenticated', () => {
    const { useAuth } = require('@/hooks/auth/useAuth')
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { role: 'user' },
    })

    render(
      <BrowserRouter>
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      </BrowserRouter>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('should show loading when checking authentication', () => {
    const { useAuth } = require('@/hooks/auth/useAuth')
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
    })

    render(
      <BrowserRouter>
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      </BrowserRouter>
    )

    expect(screen.getByText(/checking authentication/i)).toBeInTheDocument()
  })
})

