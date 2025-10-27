/**
 * TextArea Component Tests
 * Unit tests for the TextArea component
 */

import { fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { TextArea } from './TextArea'

describe('TextArea', () => {
  describe('Rendering', () => {
    it('should render textarea with default props', () => {
      render(<TextArea label="Description" />)
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    })

    it('should render with placeholder', () => {
      render(<TextArea placeholder="Enter your message" />)
      expect(screen.getByPlaceholderText(/enter your message/i)).toBeInTheDocument()
    })

    it('should render with default value', () => {
      render(<TextArea value="Default text" />)
      expect(screen.getByDisplayValue(/default text/i)).toBeInTheDocument()
    })

    it('should render different variants', () => {
      const { rerender } = render(<TextArea variant="outlined" label="Outlined" />)
      expect(screen.getByLabelText(/outlined/i)).toBeInTheDocument()

      rerender(<TextArea variant="filled" label="Filled" />)
      expect(screen.getByLabelText(/filled/i)).toBeInTheDocument()

      rerender(<TextArea variant="standard" label="Standard" />)
      expect(screen.getByLabelText(/standard/i)).toBeInTheDocument()
    })

    it('should render with different colors', () => {
      const { rerender } = render(<TextArea color="primary" label="Primary" />)
      expect(screen.getByLabelText(/primary/i)).toBeInTheDocument()

      rerender(<TextArea color="secondary" label="Secondary" />)
      expect(screen.getByLabelText(/secondary/i)).toBeInTheDocument()
    })
  })

  describe('Character Counting', () => {
    it('should show character count when showCharCount is true', () => {
      const maxLength = 100
      render(<TextArea maxLength={maxLength} value="Test" showCharCount />)
      expect(screen.getByText(/4 \/ 100/i)).toBeInTheDocument()
    })

    it('should not show character count when showCharCount is false', () => {
      render(<TextArea maxLength={100} value="Test" showCharCount={false} />)
      expect(screen.queryByText(/4 \/ 100/i)).not.toBeInTheDocument()
    })

    it('should update character count as user types', () => {
      const { rerender } = render(<TextArea maxLength={100} showCharCount />)
      expect(screen.getByText(/0 \/ 100/i)).toBeInTheDocument()

      rerender(<TextArea maxLength={100} value="Hello" showCharCount />)
      expect(screen.getByText(/5 \/ 100/i)).toBeInTheDocument()
    })

    it('should show error color when approaching limit', () => {
      const longText = 'a'.repeat(90)
      render(<TextArea maxLength={100} value={longText} showCharCount />)
      const countElement = screen.getByText(/90 \/ 100/i)
      expect(countElement).toBeInTheDocument()
      expect(countElement).toHaveStyle('color: rgb(244, 67, 54)')
    })
  })

  describe('Validation States', () => {
    it('should display error state', () => {
      render(
        <TextArea 
          error 
          helperText="This field is required" 
          label="Description"
        />
      )
      const input = screen.getByLabelText(/description/i)
      expect(input).toHaveAttribute('aria-invalid', 'true')
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
    })

    it('should display validationState="error"', () => {
      render(
        <TextArea 
          validationState="error"
          helperText="Invalid input"
          label="Description"
        />
      )
      const input = screen.getByLabelText(/description/i)
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('should display validationState="success"', () => {
      render(
        <TextArea 
          validationState="success"
          label="Description"
        />
      )
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    })

    it('should display helper text', () => {
      render(
        <TextArea 
          helperText="Enter a detailed description"
          label="Description"
        />
      )
      expect(screen.getByText(/enter a detailed description/i)).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('should handle onChange event', () => {
      const handleChange = vi.fn()
      render(<TextArea onChange={handleChange} />)
      const textarea = screen.getByRole('textbox')
      
      fireEvent.change(textarea, { target: { value: 'New text' } })
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('should handle value prop updates', () => {
      const { rerender } = render(<TextArea value="Initial" />)
      expect(screen.getByDisplayValue(/initial/i)).toBeInTheDocument()

      rerender(<TextArea value="Updated" />)
      expect(screen.getByDisplayValue(/updated/i)).toBeInTheDocument()
    })

    it('should respect maxLength attribute', () => {
      render(<TextArea maxLength={10} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('maxLength', '10')
    })
  })

  describe('Rows Configuration', () => {
    it('should have default minRows', () => {
      render(<TextArea label="Description" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
    })

    it('should respect minRows prop', () => {
      render(<TextArea minRows={5} label="Description" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
    })

    it('should respect maxRows prop', () => {
      render(<TextArea maxRows={8} label="Description" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      render(<TextArea label="Comment" />)
      const textarea = screen.getByLabelText(/comment/i)
      expect(textarea).toBeInTheDocument()
    })

    it('should be disabled when disabled prop is true', () => {
      render(<TextArea disabled label="Comment" />)
      const textarea = screen.getByLabelText(/comment/i)
      expect(textarea).toBeDisabled()
    })

    it('should be required when required prop is true', () => {
      render(<TextArea required label="Comment" />)
      const textarea = screen.getByLabelText(/comment/i)
      expect(textarea).toBeRequired()
    })
  })

  describe('Styling', () => {
    it('should apply custom sx prop', () => {
      render(
        <TextArea 
          sx={{ mb: 2 }}
          label="Styled"
        />
      )
      const textarea = screen.getByLabelText(/styled/i)
      expect(textarea).toBeInTheDocument()
    })
  })
})

