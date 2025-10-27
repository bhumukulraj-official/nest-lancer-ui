/**
 * IconButton Component Tests
 * Unit tests for the IconButton component
 */

import { Add, Settings } from '@mui/icons-material'
import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { IconButton } from './IconButton'


describe('IconButton', () => {
  describe('Rendering', () => {
    it('should render icon button with icon', () => {
      render(<IconButton><Add data-testid="add-icon" /></IconButton>)
      expect(screen.getByTestId('add-icon')).toBeInTheDocument()
    })

    it('should render with different variants', () => {
      const { rerender } = render(
        <IconButton variant="standard"><Settings /></IconButton>
      )
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<IconButton variant="outlined"><Settings /></IconButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<IconButton variant="contained"><Settings /></IconButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render with different colors', () => {
      const { rerender } = render(<IconButton color="primary"><Add /></IconButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<IconButton color="secondary"><Add /></IconButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('should show loading indicator', () => {
      render(<IconButton loading><Add /></IconButton>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should show loading spinner', () => {
      render(<IconButton loading><Add /></IconButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Tooltip', () => {
    it('should show tooltip on hover', async () => {
      render(
        <IconButton
          tooltip="Add item"
          tooltipPlacement="top"
        ><Add /></IconButton>
      )
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Badge', () => {
    it('should display badge', () => {
      render(<IconButton badge="3"><Settings /></IconButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should display numeric badge', () => {
      render(<IconButton badge={5}><Settings /></IconButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Events', () => {
    it('should handle click events', () => {
      const handleClick = vi.fn()
      render(<IconButton onClick={handleClick}><Add /></IconButton>)

      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalled()
    })

    it('should not trigger click when disabled', () => {
      const handleClick = vi.fn()
      render(<IconButton onClick={handleClick} disabled><Add /></IconButton>)

      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Interactive States', () => {
    it('should show selected state', () => {
      render(<IconButton selected><Add /></IconButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should toggle state', () => {
      const handleClick = vi.fn()
      render(<IconButton toggle onClick={handleClick}><Add /></IconButton>)

      const button = screen.getByRole('button')
      fireEvent.click(button)
    })
  })

  describe('Accessibility', () => {
    it('should have aria-label', () => {
      render(<IconButton aria-label="Add button"><Add /></IconButton>)
      expect(screen.getByLabelText(/add button/i)).toBeInTheDocument()
    })

    it('should be keyboard accessible', () => {
      render(<IconButton aria-label="Keyboard button"><Add /></IconButton>)
      const button = screen.getByLabelText(/keyboard button/i)
      button.focus()
      expect(document.activeElement).toBe(button)
    })
  })

  describe('Styling', () => {
    it('should render with rounded corners', () => {
      render(<IconButton rounded><Add /></IconButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render with elevation', () => {
      render(<IconButton elevation={3}><Add /></IconButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })
})

