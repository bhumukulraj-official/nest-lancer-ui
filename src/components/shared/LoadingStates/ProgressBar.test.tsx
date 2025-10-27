/**
 * ProgressBar Component Tests
 * Unit tests for the ProgressBar component
 */

import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  describe('Rendering', () => {
    it('should render progress bar', () => {
      render(<ProgressBar value={50} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should render with label', () => {
      render(<ProgressBar value={50} label="Upload Progress" />)
      expect(screen.getByText(/upload progress/i)).toBeInTheDocument()
    })

    it('should show value when showValue is true', () => {
      render(<ProgressBar value={75} showValue />)
      expect(screen.getByText(/75%/i)).toBeInTheDocument()
    })

    it('should not show value when showValue is false', () => {
      render(<ProgressBar value={75} showValue={false} />)
      expect(screen.queryByText(/75%/i)).not.toBeInTheDocument()
    })

    it('should show 0% when value is not provided', () => {
      render(<ProgressBar showValue />)
      expect(screen.getByText(/0%/i)).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('should render determinate variant by default', () => {
      render(<ProgressBar value={50} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuemax', '100')
      expect(progressbar).toHaveAttribute('aria-valuenow', '50')
    })

    it('should render indeterminate variant', () => {
      render(<ProgressBar variant="indeterminate" />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).not.toHaveAttribute('aria-valuenow')
    })

    it('should render query variant', () => {
      render(<ProgressBar variant="query" />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toBeInTheDocument()
    })

    it('should render buffer variant', () => {
      render(<ProgressBar variant="buffer" value={60} valueBuffer={80} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toBeInTheDocument()
    })
  })

  describe('Colors', () => {
    it('should render with primary color by default', () => {
      render(<ProgressBar value={50} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should render with secondary color', () => {
      render(<ProgressBar value={50} color="secondary" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should render with error color', () => {
      render(<ProgressBar value={50} color="error" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should render with success color', () => {
      render(<ProgressBar value={50} color="success" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should render with warning color', () => {
      render(<ProgressBar value={50} color="warning" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should render with info color', () => {
      render(<ProgressBar value={50} color="info" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('should render with small size', () => {
      render(<ProgressBar value={50} size="small" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should render with medium size by default', () => {
      render(<ProgressBar value={50} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should render with large size', () => {
      render(<ProgressBar value={50} size="large" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })

  describe('Value Display', () => {
    it('should display value correctly', () => {
      const { rerender } = render(<ProgressBar value={0} showValue />)
      expect(screen.getByText(/0%/i)).toBeInTheDocument()

      rerender(<ProgressBar value={25} showValue />)
      expect(screen.getByText(/25%/i)).toBeInTheDocument()

      rerender(<ProgressBar value={100} showValue />)
      expect(screen.getByText(/100%/i)).toBeInTheDocument()
    })

    it('should not show value for indeterminate variant', () => {
      render(<ProgressBar variant="indeterminate" showValue />)
      expect(screen.queryByText(/%/i)).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper aria attributes for determinate variant', () => {
      render(<ProgressBar value={50} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuemin', '0')
      expect(progressbar).toHaveAttribute('aria-valuemax', '100')
      expect(progressbar).toHaveAttribute('aria-valuenow', '50')
    })

    it('should have aria-live region for updates', () => {
      render(<ProgressBar value={50} aria-label="Upload progress" />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-label', 'Upload progress')
    })
  })

  describe('Styling', () => {
    it('should apply custom sx prop', () => {
      render(<ProgressBar value={50} sx={{ backgroundColor: 'red' }} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar.parentElement).toHaveStyle({ backgroundColor: 'red' })
    })
  })
})

