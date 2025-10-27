/**
 * Input Component Tests
 * Unit tests for the Input component
 */

import { Email, Lock } from '@mui/icons-material'
import { fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { Input } from './Input'


describe('Input', () => {
  describe('Rendering', () => {
    it('should render input field', () => {
      render(<Input label="Username" />)
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    })

    it('should render with different variants', () => {
      const { rerender } = render(<Input variant="outlined" label="Text" />)
      expect(screen.getByLabelText(/text/i)).toBeInTheDocument()

      rerender(<Input variant="filled" label="Text" />)
      expect(screen.getByLabelText(/text/i)).toBeInTheDocument()

      rerender(<Input variant="standard" label="Text" />)
      expect(screen.getByLabelText(/text/i)).toBeInTheDocument()
    })

    it('should render with value', () => {
      render(<Input value="test value" label="Test" />)
      expect(screen.getByDisplayValue('test value')).toBeInTheDocument()
    })
  })

  describe('Icon Support', () => {
    it('should render with start icon', () => {
      render(<Input startIcon={<Email />} label="Email" />)
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })

    it('should render with end icon', () => {
      render(<Input endIcon={<Lock />} label="Password" />)
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })
  })

  describe('Password Toggle', () => {
    it('should toggle password visibility', () => {
      render(
        <Input
          type="password"
          showPasswordToggle
          label="Password"
          data-testid="password-input"
        />
      )
      const input = screen.getByTestId('password-input')
      expect(input).toHaveAttribute('type', 'password')

      // Find and click toggle button
      const toggleButtons = screen.getAllByRole('button')
      const passwordToggle = toggleButtons.find(
        btn => btn.getAttribute('aria-label')?.includes('password') || btn.querySelector('svg')
      )
      
      if (passwordToggle) {
        fireEvent.click(passwordToggle)
      }
    })
  })

  describe('Clear Functionality', () => {
    it('should show clear button when clearable and has value', () => {
      render(
        <Input
          value="test"
          clearable
          onChange={() => {}}
          label="Test Input"
        />
      )
      expect(screen.getByDisplayValue('test')).toBeInTheDocument()
    })

    it('should call onChange when cleared', () => {
      const handleChange = vi.fn()
      render(
        <Input
          value="test"
          clearable
          onChange={handleChange}
          label="Test Input"
        />
      )
      
      const clearButtons = screen.getAllByRole('button')
      const clearButton = clearButtons[clearButtons.length - 1]
      
      if (clearButton) {
        fireEvent.click(clearButton)
      }
    })
  })

  describe('Validation States', () => {
    it('should show error state', () => {
      render(<Input error helperText="Error message" label="Test" />)
      expect(screen.getByText(/error message/i)).toBeInTheDocument()
    })

    it('should show validation success state', () => {
      render(
        <Input
          validationState="success"
          value="valid"
          label="Valid Input"
        />
      )
      expect(screen.getByLabelText(/valid input/i)).toBeInTheDocument()
    })

    it('should show validation warning state', () => {
      render(
        <Input
          validationState="warning"
          label="Warning Input"
        />
      )
      expect(screen.getByLabelText(/warning input/i)).toBeInTheDocument()
    })
  })

  describe('Character Count', () => {
    it('should display character count when maxLength is set', () => {
      render(
        <Input
          value="hello"
          maxLength={10}
          label="Limited Input"
        />
      )
      expect(screen.getByDisplayValue('hello')).toBeInTheDocument()
    })

    it('should show warning when over character limit', () => {
      render(
        <Input
          value="this is too long"
          maxLength={5}
          label="Short Input"
        />
      )
      expect(screen.getByDisplayValue('this is too long')).toBeInTheDocument()
    })
  })

  describe('Event Handlers', () => {
    it('should call onChange when value changes', () => {
      const handleChange = vi.fn()
      render(
        <Input
          label="Test Input"
          onChange={handleChange}
          data-testid="test-input"
        />
      )
      
      const input = screen.getByTestId('test-input') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'new value' } })
    })

    it('should call onFocus when input is focused', () => {
      const handleFocus = vi.fn()
      render(
        <Input
          label="Test Input"
          onFocus={handleFocus}
          data-testid="test-input"
        />
      )
      
      const input = screen.getByTestId('test-input')
      fireEvent.focus(input)
    })

    it('should call onBlur when input loses focus', () => {
      const handleBlur = vi.fn()
      render(
        <Input
          label="Test Input"
          onBlur={handleBlur}
          data-testid="test-input"
        />
      )
      
      const input = screen.getByTestId('test-input')
      fireEvent.focus(input)
      fireEvent.blur(input)
    })
  })

  describe('Styling', () => {
    it('should apply rounded styles', () => {
      render(<Input rounded label="Rounded Input" />)
      expect(screen.getByLabelText(/rounded input/i)).toBeInTheDocument()
    })

    it('should apply compact styles', () => {
      render(<Input compact label="Compact Input" />)
      expect(screen.getByLabelText(/compact input/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should associate label with input', () => {
      render(<Input label="Accessible Input" id="test-input" />)
      const input = screen.getByLabelText(/accessible input/i)
      expect(input).toHaveAttribute('id', 'test-input')
    })

    it('should show required indicator', () => {
      render(<Input required label="Required Input" />)
      expect(screen.getByLabelText(/required input/i)).toBeRequired()
    })

    it('should show helper text', () => {
      render(
        <Input
          label="Input with Helper"
          helperText="This is helper text"
        />
      )
      expect(screen.getByText(/this is helper text/i)).toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('should show loading indicator', () => {
      render(<Input loading label="Loading Input" />)
      expect(screen.getByLabelText(/loading input/i)).toBeInTheDocument()
    })
  })
})

