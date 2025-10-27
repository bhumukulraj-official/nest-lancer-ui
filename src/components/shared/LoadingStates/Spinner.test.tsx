/**
 * Spinner Component Tests
 * Unit tests for the Spinner component
 */

import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { render } from '@/test/utils/test-utils'

import Spinner from './Spinner'

describe('Spinner', () => {
  describe('Rendering', () => {
    it('should render spinner', () => {
      render(<Spinner />)
      // Check if spinner is rendered (Material-UI CircularProgress)
      expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
    })

    it('should render with label', () => {
      render(<Spinner label="Loading..." />)
      expect(screen.getByText(/loading.../i)).toBeInTheDocument()
    })

    it('should render different sizes', () => {
      const { rerender } = render(<Spinner size="small" />)
      let spinner = document.querySelector('.MuiCircularProgress-root')
      expect(spinner).toBeInTheDocument()

      rerender(<Spinner size="medium" />)
      spinner = document.querySelector('.MuiCircularProgress-root')
      expect(spinner).toBeInTheDocument()

      rerender(<Spinner size="large" />)
      spinner = document.querySelector('.MuiCircularProgress-root')
      expect(spinner).toBeInTheDocument()

      rerender(<Spinner size={50} />)
      spinner = document.querySelector('.MuiCircularProgress-root')
      expect(spinner).toBeInTheDocument()
    })

    it('should render with custom thickness', () => {
      render(<Spinner thickness={5} />)
      expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
    })
  })

  describe('Color Variants', () => {
    it('should render with primary color', () => {
      render(<Spinner color="primary" />)
      expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
    })

    it('should render with secondary color', () => {
      render(<Spinner color="secondary" />)
      expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
    })

    it('should render with error color', () => {
      render(<Spinner color="error" />)
      expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
    })

    it('should render with success color', () => {
      render(<Spinner color="success" />)
      expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
    })
  })

  describe('Display Modes', () => {
    it('should render as inline spinner', () => {
      render(<Spinner />)
      const spinner = document.querySelector('.MuiCircularProgress-root')
      expect(spinner).toBeInTheDocument()
    })

    it('should render as centered spinner', () => {
      render(<Spinner centered />)
      const spinner = document.querySelector('.MuiCircularProgress-root')
      expect(spinner).toBeInTheDocument()
    })

    it('should render as overlay spinner', () => {
      render(
        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
          <Spinner overlay />
        </div>
      )
      const spinner = document.querySelector('.MuiCircularProgress-root')
      expect(spinner).toBeInTheDocument()
    })

    it('should render as fullscreen spinner', () => {
      render(<Spinner fullscreen />)
      const spinner = document.querySelector('.MuiCircularProgress-root')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Label', () => {
    it('should adjust label size based on spinner size', () => {
      render(<Spinner size="small" label="Small" />)
      expect(screen.getByText(/small/i)).toBeInTheDocument()

      render(<Spinner size="large" label="Large" />)
      expect(screen.getByText(/large/i)).toBeInTheDocument()
    })
  })

  describe('Customization', () => {
    it('should accept className prop', () => {
      render(<Spinner className="custom-spinner" />)
      const spinner = document.querySelector('.custom-spinner')
      expect(spinner).toBeInTheDocument()
    })
  })
})

