/**
 * Button Component Tests
 * Unit tests for the Button component
 */

import { Send, Delete } from '@mui/icons-material'
import { fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { Button } from './Button'


describe('Button', () => {
  describe('Rendering', () => {
    it('should render button with text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('should render button with variants', () => {
      const { rerender } = render(<Button variant="contained">Contained</Button>)
      expect(screen.getByRole('button')).toHaveClass('MuiButton-contained')

      rerender(<Button variant="outlined">Outlined</Button>)
      expect(screen.getByRole('button')).toHaveClass('MuiButton-outlined')

      rerender(<Button variant="text">Text</Button>)
      expect(screen.getByRole('button')).toHaveClass('MuiButton-text')
    })

    it('should render button with colors', () => {
      const { rerender } = render(<Button color="primary">Primary</Button>)
      rerender(<Button color="secondary">Secondary</Button>)
      rerender(<Button color="error">Error</Button>)
      rerender(<Button color="success">Success</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render button with sizes', () => {
      const { rerender } = render(<Button size="small">Small</Button>)
      rerender(<Button size="medium">Medium</Button>)
      rerender(<Button size="large">Large</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Custom Variants', () => {
    it('should render ghost variant', () => {
      render(<Button ghost>Ghost Button</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render minimal variant', () => {
      render(<Button minimal>Minimal Button</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render soft variant', () => {
      render(<Button variant="soft">Soft Button</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render gradient variant', () => {
      render(<Button variant="gradient">Gradient Button</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Icons', () => {
    it('should render with start icon', () => {
      render(
        <Button startIcon={<Send data-testid="send-icon" />}>
          Send
        </Button>
      )
      expect(screen.getByTestId('send-icon')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render with end icon', () => {
      render(
        <Button endIcon={<Delete data-testid="delete-icon" />}>
          Delete
        </Button>
      )
      expect(screen.getByTestId('delete-icon')).toBeInTheDocument()
    })

    it('should render with both icons', () => {
      render(
        <Button startIcon={<Send />} endIcon={<Delete />}>
          Action
        </Button>
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('should show loading indicator when loading', () => {
      render(<Button loading>Loading...</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should show loading at start position', () => {
      render(<Button loading loadingPosition="start">Loading</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should show loading at end position', () => {
      render(<Button loading loadingPosition="end">Loading</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should show loading at center position', () => {
      render(<Button loading loadingPosition="center">Loading</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should handle click events', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not trigger click when disabled', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} disabled>Disabled</Button>)
      
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should not trigger click when loading', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} loading>Loading</Button>)
      
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Styling', () => {
    it('should render rounded button', () => {
      render(<Button rounded>Rounded</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render full width button', () => {
      render(<Button block>Full Width</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ width: '100%' })
    })

    it('should accept custom sx prop', () => {
      render(<Button sx={{ backgroundColor: 'red' }}>Styled</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have correct aria attributes', () => {
      render(
        <Button aria-label="Custom label" data-testid="test-button">
          Button
        </Button>
      )
      const button = screen.getByTestId('test-button')
      expect(button).toHaveAttribute('aria-label', 'Custom label')
    })

    it('should be keyboard accessible', () => {
      render(<Button>Accessible Button</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(document.activeElement).toBe(button)
    })
  })
})

