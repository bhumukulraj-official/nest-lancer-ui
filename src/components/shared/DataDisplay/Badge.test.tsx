/**
 * Badge Component Tests
 * Unit tests for the Badge component
 */

import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { Badge } from './Badge'

describe('Badge', () => {
  describe('Rendering', () => {
    it('should render badge with content', () => {
      render(
        <Badge badgeContent={5}>
          <div>Content</div>
        </Badge>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should render badge with number', () => {
      render(
        <Badge badgeContent={10}>
          <div>Notifications</div>
        </Badge>
      )
      expect(screen.getByText(/notifications/i)).toBeInTheDocument()
    })

    it('should render dot variant', () => {
      render(
        <Badge variant="dot">
          <div>Content</div>
        </Badge>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should render status variant', () => {
      render(
        <Badge variant="status" status="online">
          <div>User</div>
        </Badge>
      )
      expect(screen.getByText(/user/i)).toBeInTheDocument()
    })

    it('should render standalone badge', () => {
      render(<Badge standalone badgeContent={5} />)
      const badge = screen.getByText('5')
      expect(badge).toBeInTheDocument()
    })

    it('should show max when content exceeds max', () => {
      render(
        <Badge badgeContent={150} max={99}>
          <div>Content</div>
        </Badge>
      )
      expect(screen.getByText(/99\+/i)).toBeInTheDocument()
    })
  })

  describe('Colors', () => {
    it('should render with primary color', () => {
      render(
        <Badge badgeContent={5} color="primary">
          <div>Content</div>
        </Badge>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should render with secondary color', () => {
      render(
        <Badge badgeContent={5} color="secondary">
          <div>Content</div>
        </Badge>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should render with error color', () => {
      render(
        <Badge badgeContent={5} color="error">
          <div>Content</div>
        </Badge>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should render with success color', () => {
      render(
        <Badge badgeContent={5} color="success">
          <div>Content</div>
        </Badge>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })
  })

  describe('Status Indicators', () => {
    it('should render online status', () => {
      render(
        <Badge variant="status" status="online">
          <div>User</div>
        </Badge>
      )
      expect(screen.getByText(/user/i)).toBeInTheDocument()
    })

    it('should render offline status', () => {
      render(
        <Badge variant="status" status="offline">
          <div>User</div>
        </Badge>
      )
      expect(screen.getByText(/user/i)).toBeInTheDocument()
    })

    it('should render away status', () => {
      render(
        <Badge variant="status" status="away">
          <div>User</div>
        </Badge>
      )
      expect(screen.getByText(/user/i)).toBeInTheDocument()
    })

    it('should render busy status', () => {
      render(
        <Badge variant="status" status="busy">
          <div>User</div>
        </Badge>
      )
      expect(screen.getByText(/user/i)).toBeInTheDocument()
    })
  })

  describe('Visibility', () => {
    it('should hide badge when invisible is true', () => {
      render(
        <Badge badgeContent={5} invisible>
          <div>Content</div>
        </Badge>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should hide badge when content is 0 and showZero is false', () => {
      render(
        <Badge badgeContent={0} showZero={false}>
          <div>Content</div>
        </Badge>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should show badge when content is 0 and showZero is true', () => {
      render(
        <Badge badgeContent={0} showZero>
          <div>Content</div>
        </Badge>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper role', () => {
      render(
        <Badge badgeContent={5} aria-label="5 notifications">
          <div>Notifications</div>
        </Badge>
      )
      expect(screen.getByText(/notifications/i)).toBeInTheDocument()
    })
  })
})

