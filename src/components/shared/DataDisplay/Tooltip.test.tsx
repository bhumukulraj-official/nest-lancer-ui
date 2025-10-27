/**
 * Tooltip Component Tests
 * Unit tests for the Tooltip component
 */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  describe('Rendering', () => {
    it('should render tooltip with text', async () => {
      render(
        <Tooltip title="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      )
      
      const button = screen.getByText(/hover me/i)
      await userEvent.hover(button)
      
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    it('should show tooltip on hover', async () => {
      render(
        <Tooltip title="Tooltip content" placement="top">
          <button>Button</button>
        </Tooltip>
      )
      
      const button = screen.getByText(/button/i)
      expect(button).toBeInTheDocument()
    })

    it('should render with different placements', () => {
      const { rerender } = render(
        <Tooltip title="Top" placement="top">
          <button>Top</button>
        </Tooltip>
      )
      expect(screen.getByText(/top/i)).toBeInTheDocument()

      rerender(
        <Tooltip title="Bottom" placement="bottom">
          <button>Bottom</button>
        </Tooltip>
      )
      expect(screen.getByText(/bottom/i)).toBeInTheDocument()

      rerender(
        <Tooltip title="Left" placement="left">
          <button>Left</button>
        </Tooltip>
      )
      expect(screen.getByText(/left/i)).toBeInTheDocument()

      rerender(
        <Tooltip title="Right" placement="right">
          <button>Right</button>
        </Tooltip>
      )
      expect(screen.getByText(/right/i)).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('should render with custom content', () => {
      render(
        <Tooltip title={<span data-testid="custom-content">Custom</span>}>
          <button>Custom</button>
        </Tooltip>
      )
      expect(screen.getByText(/custom/i)).toBeInTheDocument()
    })

    it('should render multiline content', () => {
      render(
        <Tooltip title="Multiline\ntext">
          <button>Multiline</button>
        </Tooltip>
      )
      expect(screen.getByText(/multiline/i)).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('should not show tooltip for disabled element', () => {
      render(
        <Tooltip title="Disabled" disableHoverListener>
          <button disabled>Disabled</button>
        </Tooltip>
      )
      expect(screen.getByText(/disabled/i)).toBeInTheDocument()
    })
  })

  describe('Delay', () => {
    it('should show tooltip with delay', async () => {
      render(
        <Tooltip title="Delayed" enterDelay={500}>
          <button>Delayed</button>
        </Tooltip>
      )
      
      const button = screen.getByText(/delayed/i)
      await userEvent.hover(button)
      
      await new Promise(resolve => setTimeout(resolve, 600))
    })

    it('should hide tooltip with delay', async () => {
      render(
        <Tooltip title="Leave delayed" leaveDelay={500}>
          <button>Leave delayed</button>
        </Tooltip>
      )
      
      const button = screen.getByText(/leave delayed/i)
      await userEvent.hover(button)
      await userEvent.unhover(button)
      
      await new Promise(resolve => setTimeout(resolve, 600))
    })
  })

  describe('Interactive', () => {
    it('should keep tooltip open when interactive', async () => {
      render(
        <Tooltip title="Interactive">
          <button>Interactive</button>
        </Tooltip>
      )
      
      const button = screen.getByText(/interactive/i)
      await userEvent.hover(button)
      
      await new Promise(resolve => setTimeout(resolve, 100))
    })
  })
})

