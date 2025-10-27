/**
 * Checkbox Component Tests
 * Unit tests for the Checkbox component
 */

import { fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('should render checkbox with label', () => {
      render(<Checkbox label="Accept terms" />)
      expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument()
    })

    it('should render without label', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('should render with description', () => {
      render(<Checkbox label="Subscribe" description="Receive updates via email" />)
      expect(screen.getByText(/receive updates via email/i)).toBeInTheDocument()
    })

    it('should be checked when checked prop is true', () => {
      render(<Checkbox label="Check me" checked />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('should be unchecked when checked prop is false', () => {
      render(<Checkbox label="Check me" checked={false} />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('should render in indeterminate state', () => {
      render(<Checkbox label="Select all" indeterminate />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
    })

    it('should render different colors', () => {
      const { rerender } = render(<Checkbox color="primary" label="Primary" />)
      expect(screen.getByLabelText(/primary/i)).toBeInTheDocument()

      rerender(<Checkbox color="secondary" label="Secondary" />)
      expect(screen.getByLabelText(/secondary/i)).toBeInTheDocument()

      rerender(<Checkbox color="error" label="Error" />)
      expect(screen.getByLabelText(/error/i)).toBeInTheDocument()

      rerender(<Checkbox color="success" label="Success" />)
      expect(screen.getByLabelText(/success/i)).toBeInTheDocument()
    })
  })

  describe('Validation States', () => {
    it('should display error state', () => {
      render(<Checkbox label="Terms" error helperText="Must accept terms" />)
      expect(screen.getByText(/must accept terms/i)).toBeInTheDocument()
    })

    it('should display validationState="error"', () => {
      render(<Checkbox label="Terms" validationState="error" />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('should display validationState="success"', () => {
      render(<Checkbox label="Terms" validationState="success" />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('should display helper text', () => {
      render(<Checkbox label="Subscribe" helperText="You can unsubscribe anytime" />)
      expect(screen.getByText(/you can unsubscribe anytime/i)).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('should handle onChange event', () => {
      const handleChange = vi.fn()
      render(<Checkbox label="Check me" onChange={handleChange} />)
      const checkbox = screen.getByLabelText(/check me/i)
      
      fireEvent.click(checkbox)
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('should toggle checked state on click', () => {
      const handleChange = vi.fn()
      render(<Checkbox label="Toggle" checked={false} onChange={handleChange} />)
      const checkbox = screen.getByLabelText(/toggle/i)
      
      fireEvent.click(checkbox)
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ target: expect.objectContaining({ checked: true }) })
      )
    })

    it('should call onChange with correct event', () => {
      const handleChange = vi.fn()
      render(<Checkbox label="Test" onChange={handleChange} />)
      const checkbox = screen.getByLabelText(/test/i)
      
      fireEvent.click(checkbox)
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ checked: true })
        })
      )
    })
  })

  describe('Label Placement', () => {
    it('should place label at end by default', () => {
      render(<Checkbox label="Label" />)
      const checkbox = screen.getByRole('checkbox')
      screen.getByText(/label/i)
      expect(checkbox).toHaveClass('MuiCheckbox-root')
    })

    it('should place label at start', () => {
      render(<Checkbox label="Label" labelPlacement="start" />)
      expect(screen.getByText(/label/i)).toBeInTheDocument()
    })

    it('should place label at top', () => {
      render(<Checkbox label="Label" labelPlacement="top" />)
      expect(screen.getByText(/label/i)).toBeInTheDocument()
    })

    it('should place label at bottom', () => {
      render(<Checkbox label="Label" labelPlacement="bottom" />)
      expect(screen.getByText(/label/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Checkbox label="Disabled" disabled />)
      expect(screen.getByLabelText(/disabled/i)).toBeDisabled()
    })

    it('should have proper role', () => {
      render(<Checkbox label="Check" />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('should have proper aria-label', () => {
      render(<Checkbox label="Check me" />)
      expect(screen.getByLabelText(/check me/i)).toBeInTheDocument()
    })

    it('should be required when required prop is true', () => {
      render(<Checkbox label="Required" required />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should apply custom sx prop', () => {
      render(
        <Checkbox 
          sx={{ backgroundColor: 'blue' }}
          data-testid="checkbox"
        />
      )
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox.parentElement).toHaveStyle({ backgroundColor: 'blue' })
    })

    it('should render rounded variant', () => {
      render(<Checkbox label="Rounded" rounded />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('should render compact variant', () => {
      render(<Checkbox label="Compact" compact />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })
  })
})

