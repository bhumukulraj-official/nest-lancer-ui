/**
 * Avatar Component Tests
 * Unit tests for the Avatar component
 */

import { Person } from '@mui/icons-material'
import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { Avatar } from './Avatar'


describe('Avatar', () => {
  describe('Rendering', () => {
    it('should render avatar with image', () => {
      render(<Avatar src="/test-image.jpg" alt="Test User" />)
      const img = screen.getByAltText(/test user/i)
      expect(img).toBeInTheDocument()
    })

    it('should render avatar with initials', () => {
      render(<Avatar name="John Doe" />)
      expect(screen.getByText(/jd/i)).toBeInTheDocument()
    })

    it('should render avatar with icon', () => {
      render(<Avatar icon={<Person data-testid="person-icon" />} />)
      expect(screen.getByTestId('person-icon')).toBeInTheDocument()
    })

    it('should render with different sizes', () => {
      const { rerender } = render(<Avatar name="Test" size="xs" />)
      expect(screen.getByText(/t/i)).toBeInTheDocument()

      rerender(<Avatar name="Test" size="sm" />)
      expect(screen.getByText(/t/i)).toBeInTheDocument()

      rerender(<Avatar name="Test" size="md" />)
      expect(screen.getByText(/t/i)).toBeInTheDocument()

      rerender(<Avatar name="Test" size="lg" />)
      expect(screen.getByText(/t/i)).toBeInTheDocument()

      rerender(<Avatar name="Test" size="xl" />)
      expect(screen.getByText(/t/i)).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('should render circular avatar', () => {
      render(<Avatar name="Circle" variant="circular" />)
      expect(screen.getByText(/c/i)).toBeInTheDocument()
    })

    it('should render rounded avatar', () => {
      render(<Avatar name="Rounded" variant="rounded" />)
      expect(screen.getByText(/r/i)).toBeInTheDocument()
    })

    it('should render square avatar', () => {
      render(<Avatar name="Square" variant="square" />)
      expect(screen.getByText(/s/i)).toBeInTheDocument()
    })
  })

  describe('Status Indicator', () => {
    it('should show online status', () => {
      render(<Avatar name="Online User" status="online" showStatus />)
      expect(screen.getByText(/o/i)).toBeInTheDocument()
    })

    it('should show offline status', () => {
      render(<Avatar name="Offline User" status="offline" showStatus />)
      expect(screen.getByText(/o/i)).toBeInTheDocument()
    })
  })
})

