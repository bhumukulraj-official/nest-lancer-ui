/**
 * ErrorBoundary Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import ErrorBoundary from './ErrorBoundary'

// Component that throws error
const ThrowError = () => {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  it('should catch errors and display fallback', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <div>No Error</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('No Error')).toBeInTheDocument()
  })
})

