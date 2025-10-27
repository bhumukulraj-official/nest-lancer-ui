/**
 * Radio Component Tests
 * Unit tests for the Radio component
 */

import { fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { Radio } from './Radio'

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

describe('Radio', () => {
  describe('Rendering', () => {
    it('should render radio group with options', () => {
      const handleChange = vi.fn()
      render(<Radio label="Choose" options={mockOptions} value="option1" onChange={handleChange} />)
      
      expect(screen.getByText(/choose/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/option 1/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/option 2/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/option 3/i)).toBeInTheDocument()
    })

    it('should render with selected value', () => {
      const handleChange = vi.fn()
      render(<Radio label="Choose" options={mockOptions} value="option2" onChange={handleChange} />)
      
      expect(screen.getByLabelText(/option 2/i)).toBeChecked()
      expect(screen.getByLabelText(/option 1/i)).not.toBeChecked()
      expect(screen.getByLabelText(/option 3/i)).not.toBeChecked()
    })

    it('should render without label', () => {
      const handleChange = vi.fn()
      render(<Radio options={mockOptions} value="option1" onChange={handleChange} />)
      
      expect(screen.queryByRole('legend')).not.toBeInTheDocument()
      expect(screen.getByLabelText(/option 1/i)).toBeInTheDocument()
    })

    it('should display helper text', () => {
      const handleChange = vi.fn()
      render(
        <Radio 
          label="Choose" 
          helperText="Select an option" 
          options={mockOptions} 
          value="option1" 
          onChange={handleChange} 
        />
      )
      expect(screen.getByText(/select an option/i)).toBeInTheDocument()
    })

    it('should render disabled options', () => {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
      ]
      const handleChange = vi.fn()
      render(<Radio label="Choose" options={options} value="option1" onChange={handleChange} />)
      
      expect(screen.getByLabelText(/option 2/i)).toBeDisabled()
    })
  })

  describe('Validation', () => {
    it('should display error state', () => {
      const handleChange = vi.fn()
      render(
        <Radio 
          label="Choose" 
          error 
          helperText="This field is required" 
          options={mockOptions} 
          value="" 
          onChange={handleChange} 
        />
      )
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
    })

    it('should apply error styling', () => {
      const handleChange = vi.fn()
      render(
        <Radio 
          label="Choose" 
          error 
          options={mockOptions} 
          value="option1" 
          onChange={handleChange} 
        />
      )
      expect(screen.getByRole('group')).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('should handle onChange event', () => {
      const handleChange = vi.fn()
      render(<Radio label="Choose" options={mockOptions} value="option1" onChange={handleChange} />)
      
      const option2 = screen.getByLabelText(/option 2/i)
      fireEvent.click(option2)
      expect(handleChange).toHaveBeenCalledWith('option2')
    })

    it('should update selected value', () => {
      const handleChange = vi.fn()
      render(<Radio label="Choose" options={mockOptions} value="option1" onChange={handleChange} />)
      
      const option3 = screen.getByLabelText(/option 3/i)
      fireEvent.click(option3)
      expect(handleChange).toHaveBeenCalledWith('option3')
    })

    it('should not change when disabled option is clicked', () => {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
      ]
      const handleChange = vi.fn()
      render(<Radio label="Choose" options={options} value="option1" onChange={handleChange} />)
      
      const disabledOption = screen.getByLabelText(/option 2/i)
      fireEvent.click(disabledOption)
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Layout', () => {
    it('should render radio buttons in a row', () => {
      const handleChange = vi.fn()
      render(
        <Radio 
          label="Choose" 
          row 
          options={mockOptions} 
          value="option1" 
          onChange={handleChange} 
        />
      )
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('should render radio buttons in a column by default', () => {
      const handleChange = vi.fn()
      render(<Radio label="Choose" options={mockOptions} value="option1" onChange={handleChange} />)
      const group = screen.getByRole('radiogroup')
      expect(group).toHaveAttribute('aria-orientation', 'vertical')
    })
  })

  describe('Accessibility', () => {
    it('should have proper role for radio group', () => {
      const handleChange = vi.fn()
      render(<Radio label="Choose" options={mockOptions} value="option1" onChange={handleChange} />)
      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    })

    it('should have proper labels for each option', () => {
      const handleChange = vi.fn()
      render(<Radio label="Choose" options={mockOptions} value="option1" onChange={handleChange} />)
      
      expect(screen.getByRole('radio', { name: /option 1/i })).toBeInTheDocument()
      expect(screen.getByRole('radio', { name: /option 2/i })).toBeInTheDocument()
      expect(screen.getByRole('radio', { name: /option 3/i })).toBeInTheDocument()
    })

    it('should mark the selected radio as checked', () => {
      const handleChange = vi.fn()
      render(<Radio label="Choose" options={mockOptions} value="option2" onChange={handleChange} />)
      
      expect(screen.getByRole('radio', { name: /option 2/i })).toBeChecked()
    })
  })
})

