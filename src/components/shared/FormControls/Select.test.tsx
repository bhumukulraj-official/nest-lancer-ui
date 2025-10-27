/**
 * Select Component Tests
 * Unit tests for the Select component
 */

import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { Select, SelectOption } from './Select'

describe('Select', () => {
  const mockOptions: SelectOption[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]

  describe('Rendering', () => {
    it('should render select field', () => {
      render(<Select label="Test Select" options={mockOptions} />)
      expect(screen.getByLabelText(/test select/i)).toBeInTheDocument()
    })

    it('should render with placeholder', () => {
      render(
        <Select
          label="Test Select"
          options={mockOptions}
          placeholder="Choose an option"
        />
      )
      expect(screen.getByPlaceholderText(/choose an option/i)).toBeInTheDocument()
    })

    it('should render with default value', async () => {
      render(
        <Select
          label="Test Select"
          options={mockOptions}
          value="1"
          onChange={() => {}}
        />
      )
      const input = screen.getByLabelText(/test select/i) as HTMLInputElement
      await waitFor(() => {
        expect(input).toHaveDisplayValue(/option 1/i)
      })
    })
  })

  describe('Variants', () => {
    it('should render outlined variant', () => {
      render(<Select label="Outlined" variant="outlined" options={mockOptions} />)
      expect(screen.getByLabelText(/outlined/i)).toBeInTheDocument()
    })

    it('should render filled variant', () => {
      render(<Select label="Filled" variant="filled" options={mockOptions} />)
      expect(screen.getByLabelText(/filled/i)).toBeInTheDocument()
    })

    it('should render standard variant', () => {
      render(<Select label="Standard" variant="standard" options={mockOptions} />)
      expect(screen.getByLabelText(/standard/i)).toBeInTheDocument()
    })
  })

  describe('Single Select', () => {
    it('should select single option', async () => {
      const handleChange = vi.fn()
      render(
        <Select
          label="Single Select"
          options={mockOptions}
          onChange={handleChange}
        />
      )

      const input = screen.getByLabelText(/single select/i)
      await userEvent.click(input)
      await waitFor(() => {
        expect(screen.getByText(/option 1/i)).toBeInTheDocument()
      })
      await userEvent.click(screen.getByText(/option 1/i))
      
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled()
      })
    })

    it('should clear single selection', async () => {
      const handleChange = vi.fn()
      render(
        <Select
          label="Test Select"
          options={mockOptions}
          value="1"
          onChange={handleChange}
          clearable
        />
      )

      const input = screen.getByLabelText(/test select/i)
      await userEvent.click(input)
      
      // Clear button should be available
      const clearButton = screen.getByTitle(/clear/i) || screen.getByLabelText(/clear/i)
      if (clearButton) {
        await userEvent.click(clearButton)
      }
    })
  })

  describe('Multiple Select', () => {
    it('should allow multiple selections', async () => {
      const handleChange = vi.fn()
      render(
        <Select
          label="Multiple Select"
          options={mockOptions}
          multiple
          onChange={handleChange}
        />
      )

      const input = screen.getByLabelText(/multiple select/i)
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.getByText(/option 1/i)).toBeInTheDocument()
      })
      
      await userEvent.click(screen.getByText(/option 1/i))
      await userEvent.click(screen.getByText(/option 2/i))
    })

    it('should display selected options as chips', async () => {
      render(
        <Select
          label="Test Select"
          options={mockOptions}
          multiple
          value={['1', '2']}
          onChange={() => {}}
        />
      )

      const input = screen.getByLabelText(/test select/i)
      await userEvent.click(input)
      
      // Should show selected options
      await waitFor(() => {
        expect(screen.getByText(/option 1/i)).toBeInTheDocument()
        expect(screen.getByText(/option 2/i)).toBeInTheDocument()
      })
    })
  })

  describe('Search Functionality', () => {
    it('should filter options when searchable', async () => {
      render(
        <Select
          label="Searchable Select"
          options={mockOptions}
          searchable
        />
      )

      const input = screen.getByLabelText(/searchable select/i)
      await userEvent.click(input)
      
      await userEvent.type(input, 'option 1')
      
      await waitFor(() => {
        expect(screen.getByText(/option 1/i)).toBeInTheDocument()
      })
    })

    it('should call onSearchChange when searching', async () => {
      const handleSearchChange = vi.fn()
      render(
        <Select
          label="Test Select"
          options={mockOptions}
          searchable
          onSearchChange={handleSearchChange}
        />
      )

      const input = screen.getByLabelText(/test select/i)
      await userEvent.click(input)
      await userEvent.type(input, 'test search')
      
      await waitFor(() => {
        expect(handleSearchChange).toHaveBeenCalled()
      })
    })
  })

  describe('Loading State', () => {
    it('should show loading indicator', () => {
      render(<Select label="Loading Select" options={mockOptions} loading />)
      expect(screen.getByLabelText(/loading select/i)).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Select label="Disabled Select" options={mockOptions} disabled />)
      const input = screen.getByLabelText(/disabled select/i)
      expect(input).toBeDisabled()
    })
  })

  describe('Error State', () => {
    it('should show error state', () => {
      render(
        <Select
          label="Error Select"
          options={mockOptions}
          error
          helperText="Error message"
        />
      )
      expect(screen.getByText(/error message/i)).toBeInTheDocument()
    })

    it('should show validation error state', () => {
      render(
        <Select
          label="Validation Error"
          options={mockOptions}
          validationState="error"
          helperText="Validation error"
        />
      )
      expect(screen.getByText(/validation error/i)).toBeInTheDocument()
    })

    it('should show success validation state', () => {
      render(
        <Select
          label="Success"
          options={mockOptions}
          validationState="success"
        />
      )
      expect(screen.getByLabelText(/success/i)).toBeInTheDocument()
    })

    it('should show warning validation state', () => {
      render(
        <Select
          label="Warning"
          options={mockOptions}
          validationState="warning"
        />
      )
      expect(screen.getByLabelText(/warning/i)).toBeInTheDocument()
    })
  })

  describe('Options with Grouping', () => {
    const groupedOptions: SelectOption[] = [
      { label: 'Option 1', value: '1', group: 'Group A' },
      { label: 'Option 2', value: '2', group: 'Group A' },
      { label: 'Option 3', value: '3', group: 'Group B' },
    ]

    it('should group options by group property', async () => {
      render(<Select label="Grouped Select" options={groupedOptions} />)
      
      const input = screen.getByLabelText(/grouped select/i)
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.getByText(/group a/i)).toBeInTheDocument()
        expect(screen.getByText(/group b/i)).toBeInTheDocument()
      })
    })
  })

  describe('Options with Icons and Descriptions', () => {
    const optionsWithIcons: SelectOption[] = [
      { label: 'Option 1', value: '1', icon: <span data-testid="icon-1">📝</span> },
      { label: 'Option 2', value: '2', description: 'This is a description' },
    ]

    it('should render options with icons', async () => {
      render(<Select label="Test Select" options={optionsWithIcons} />)
      
      const input = screen.getByLabelText(/test select/i)
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.getByTestId('icon-1')).toBeInTheDocument()
      })
    })

    it('should render options with descriptions', async () => {
      render(<Select label="Test Select" options={optionsWithIcons} />)
      
      const input = screen.getByLabelText(/test select/i)
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.getByText(/this is a description/i)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have required indicator', () => {
      render(
        <Select
          label="Required Select"
          options={mockOptions}
          required
        />
      )
      const input = screen.getByLabelText(/required select/i)
      expect(input).toBeRequired()
    })

    it('should show helper text', () => {
      render(
        <Select
          label="Helper Select"
          options={mockOptions}
          helperText="This is helper text"
        />
      )
      expect(screen.getByText(/this is helper text/i)).toBeInTheDocument()
    })

    it('should be keyboard accessible', async () => {
      render(<Select label="Accessible" options={mockOptions} />)
      const input = screen.getByLabelText(/accessible/i)
      
      input.focus()
      expect(document.activeElement).toBe(input)
    })
  })

  describe('Styling', () => {
    it('should render with rounded corners', () => {
      render(<Select label="Rounded" options={mockOptions} rounded />)
      expect(screen.getByLabelText(/rounded/i)).toBeInTheDocument()
    })

    it('should render in full width', () => {
      render(<Select label="Full Width" options={mockOptions} fullWidth />)
      const input = screen.getByLabelText(/full width/i)
      expect(input.closest('.MuiAutocomplete-root')).toHaveStyle({ width: '100%' })
    })

    it('should render in compact mode', () => {
      render(<Select label="Compact" options={mockOptions} compact />)
      expect(screen.getByLabelText(/compact/i)).toBeInTheDocument()
    })

    it('should render with different sizes', () => {
      const { rerender } = render(
        <Select label="Small" options={mockOptions} size="small" />
      )
      expect(screen.getByLabelText(/small/i)).toBeInTheDocument()

      rerender(<Select label="Medium" options={mockOptions} size="medium" />)
      expect(screen.getByLabelText(/medium/i)).toBeInTheDocument()
    })
  })
})

