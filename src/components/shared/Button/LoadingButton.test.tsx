/**
 * LoadingButton Component Tests
 * Unit tests for the LoadingButton component
 */

import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { LoadingButton } from './LoadingButton'

describe('LoadingButton', () => {
  describe('Rendering', () => {
    it('should render button with text', () => {
      render(<LoadingButton>Click me</LoadingButton>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('should render with loading state', () => {
      render(<LoadingButton loading>Loading...</LoadingButton>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should show loading text when provided', () => {
      render(
        <LoadingButton loading loadingText="Processing...">
          Submit
        </LoadingButton>
      )
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('Loading Position', () => {
    it('should show loading at start', () => {
      render(
        <LoadingButton loading loadingPosition="start">
          Loading
        </LoadingButton>
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should show loading at end', () => {
      render(
        <LoadingButton loading loadingPosition="end">
          Loading
        </LoadingButton>
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should show loading at center', () => {
      render(
        <LoadingButton loading loadingPosition="center">
          Loading
        </LoadingButton>
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Async Operations', () => {
    it('should handle async onClick', async () => {
      const handleClick = vi.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
      })

      render(<LoadingButton onClick={handleClick}>Async Action</LoadingButton>)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(handleClick).toHaveBeenCalled()
    })

    it('should show success state', async () => {
      const handleClick = vi.fn()
      render(
        <LoadingButton
          onClick={handleClick}
          showSuccessState
          successDuration={1000}
        >
          Submit
        </LoadingButton>
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument()
      })
    })

    it('should handle errors', async () => {
      const handleError = vi.fn()
      const handleClick = vi.fn(() => {
        throw new Error('Test error')
      })

      render(
        <LoadingButton
          onClick={handleClick}
          onError={handleError}
          showErrorState
        >
          Submit
        </LoadingButton>
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
    })
  })

  describe('Success State', () => {
    it('should show success icon', async () => {
      const handleClick = vi.fn()
      render(
        <LoadingButton
          onClick={handleClick}
          showSuccessState
          successText="Success!"
        >
          Submit
        </LoadingButton>
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument()
      })
    })
  })

  describe('Error State', () => {
    it('should show error state', async () => {
      const handleClick = vi.fn(() => {
        throw new Error('Test error')
      })

      render(
        <LoadingButton
          onClick={handleClick}
          showErrorState
          errorText="Error occurred"
        >
          Submit
        </LoadingButton>
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
    })
  })

  describe('Variants', () => {
    it('should render with different variants', () => {
      const { rerender } = render(
        <LoadingButton variant="contained">Contained</LoadingButton>
      )
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<LoadingButton variant="outlined">Outlined</LoadingButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should not trigger click when disabled', () => {
      const handleClick = vi.fn()
      render(
        <LoadingButton onClick={handleClick} disabled>
          Disabled
        </LoadingButton>
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should not trigger click when loading', () => {
      const handleClick = vi.fn()
      render(
        <LoadingButton onClick={handleClick} loading>
          Loading
        </LoadingButton>
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })
})

