/**
 * Chip Component Tests
 * Unit tests for the Chip component
 */

import { Add } from '@mui/icons-material'
import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { Chip } from './Chip'


describe('Chip', () => {
  describe('Rendering', () => {
    it('should render chip with label', () => {
      render(<Chip label="Test Chip" />)
      expect(screen.getByText(/test chip/i)).toBeInTheDocument()
    })

    it('should render with different variants', () => {
      const { rerender } = render(<Chip label="Filled" variant="filled" />)
      expect(screen.getByText(/filled/i)).toBeInTheDocument()

      rerender(<Chip label="Outlined" variant="outlined" />)
      expect(screen.getByText(/outlined/i)).toBeInTheDocument()
    })

    it('should render with different colors', () => {
      const { rerender } = render(<Chip label="Primary" color="primary" />)
      expect(screen.getByText(/primary/i)).toBeInTheDocument()

      rerender(<Chip label="Secondary" color="secondary" />)
      expect(screen.getByText(/secondary/i)).toBeInTheDocument()
    })
  })

  describe('Interactive States', () => {
    it('should show selected state', () => {
      render(<Chip label="Selected" selected />)
      expect(screen.getByText(/selected/i)).toBeInTheDocument()
    })

    it('should be clickable when selectable', () => {
      const handleClick = vi.fn()
      render(<Chip label="Clickable" selectable onClick={handleClick} />)
      
      const chip = screen.getByText(/clickable/i)
      fireEvent.click(chip)
      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe('With Icons', () => {
    it('should render with avatar', () => {
      render(<Chip label="Avatar Chip" avatar={<Add />} />)
      expect(screen.getByText(/avatar chip/i)).toBeInTheDocument()
    })

    it('should render with icon', () => {
      render(<Chip label="Icon Chip" icon={<Add />} />)
      expect(screen.getByText(/icon chip/i)).toBeInTheDocument()
    })

    it('should handle delete action', () => {
      const handleDelete = vi.fn()
      render(<Chip label="Deletable" onDelete={handleDelete} />)
      
      const deleteButtons = screen.getAllByRole('button')
      deleteButtons.forEach(btn => {
        if (btn.querySelector('svg')) {
          fireEvent.click(btn)
        }
      })
    })
  })

  describe('Special Variants', () => {
    it('should render as addable chip', () => {
      render(<Chip label="Add" addable icon={<Add />} />)
      expect(screen.getByText(/add/i)).toBeInTheDocument()
    })

    it('should render as count chip', () => {
      render(<Chip label="5" countChip />)
      expect(screen.getByText(/5/i)).toBeInTheDocument()
    })

    it('should render as status chip', () => {
      render(<Chip label="Active" statusChip color="success" />)
      expect(screen.getByText(/active/i)).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should render with rounded corners', () => {
      render(<Chip label="Rounded" rounded />)
      expect(screen.getByText(/rounded/i)).toBeInTheDocument()
    })

    it('should render in compact mode', () => {
      render(<Chip label="Compact" compact />)
      expect(screen.getByText(/compact/i)).toBeInTheDocument()
    })
  })
})

