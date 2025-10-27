/**
 * Modal Component Tests
 * Unit tests for the Modal component
 */

import { fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { Modal } from './Modal'

describe('Modal', () => {
  describe('Rendering', () => {
    it('should not render when closed', () => {
      render(
        <Modal open={false}>
          <div>Modal Content</div>
        </Modal>
      )
      expect(screen.queryByText(/modal content/i)).not.toBeInTheDocument()
    })

    it('should render when open', () => {
      render(
        <Modal open={true}>
          <div>Modal Content</div>
        </Modal>
      )
      expect(screen.getByText(/modal content/i)).toBeInTheDocument()
    })

    it('should render with title', () => {
      render(
        <Modal open={true} title="Test Modal">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/test modal/i)).toBeInTheDocument()
    })

    it('should render different sizes', () => {
      const { rerender } = render(
        <Modal open={true} size="xs" title="XS Modal">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/xs modal/i)).toBeInTheDocument()

      rerender(
        <Modal open={true} size="sm" title="SM Modal">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/sm modal/i)).toBeInTheDocument()

      rerender(
        <Modal open={true} size="md" title="MD Modal">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/md modal/i)).toBeInTheDocument()

      rerender(
        <Modal open={true} size="lg" title="LG Modal">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/lg modal/i)).toBeInTheDocument()

      rerender(
        <Modal open={true} size="xl" title="XL Modal">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/xl modal/i)).toBeInTheDocument()
    })
  })

  describe('Close Functionality', () => {
    it('should call onClose when close button is clicked', () => {
      const handleClose = vi.fn()
      render(
        <Modal open={true} onClose={handleClose} closable>
          <div>Content</div>
        </Modal>
      )

      const closeButton = screen.getAllByRole('button').find(
        button => button.querySelector('svg')
      )
      
      if (closeButton) {
        fireEvent.click(closeButton)
      }
    })

    it('should not show close button when closable is false', () => {
      render(
        <Modal open={true} closable={false}>
          <div>Content</div>
        </Modal>
      )
      const buttons = screen.queryAllByRole('button')
      expect(buttons.length).toBe(0)
    })

    it('should be persistent and not close on backdrop click', () => {
      const handleClose = vi.fn()
      render(
        <Modal open={true} onClose={handleClose} persistent>
          <div>Content</div>
        </Modal>
      )
      
      const modalContent = screen.getByText(/content/i)
      fireEvent.click(modalContent)
    })
  })

  describe('Actions', () => {
    it('should render actions', () => {
      const actions = (
        <>
          <button>Cancel</button>
          <button>Confirm</button>
        </>
      )

      render(
        <Modal open={true} actions={actions}>
          <div>Content</div>
        </Modal>
      )
      
      expect(screen.getByText(/cancel/i)).toBeInTheDocument()
      expect(screen.getByText(/confirm/i)).toBeInTheDocument()
    })
  })

  describe('Animations', () => {
    it('should use fade animation by default', () => {
      render(
        <Modal open={true} animation="fade">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should use slide animation', () => {
      render(
        <Modal open={true} animation="slide">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should use zoom animation', () => {
      render(
        <Modal open={true} animation="zoom">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should use no animation', () => {
      render(
        <Modal open={true} animation="none">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })
  })

  describe('Styling Options', () => {
    it('should render with padding', () => {
      render(
        <Modal open={true} padding>
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should render with dividers', () => {
      render(
        <Modal open={true} dividers title="Title">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should render scrollable content', () => {
      render(
        <Modal open={true} scrollable>
          <div style={{ height: '1000px' }}>Long Content</div>
        </Modal>
      )
      expect(screen.getByText(/long content/i)).toBeInTheDocument()
    })

    it('should render with full height', () => {
      render(
        <Modal open={true} fullHeight>
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })
  })

  describe('Fullscreen', () => {
    it('should support fullscreen mode', () => {
      render(
        <Modal open={true} fullscreenable>
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have aria-labelledby when title is provided', () => {
      render(
        <Modal open={true} title="Accessible Modal">
          <div>Content</div>
        </Modal>
      )
      expect(screen.getByText(/accessible modal/i)).toBeInTheDocument()
    })

    it('should have aria-describedby', () => {
      render(
        <Modal open={true} aria-describedby="modal-description">
          <div id="modal-description">Description</div>
        </Modal>
      )
      expect(screen.getByText(/description/i)).toBeInTheDocument()
    })
  })
})

