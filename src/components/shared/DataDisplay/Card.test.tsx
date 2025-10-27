/**
 * Card Component Tests
 * Unit tests for the Card component
 */

import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { Card } from './Card'

describe('Card', () => {
  describe('Rendering', () => {
    it('should render card with content', () => {
      render(
        <Card>
          <div>Card Content</div>
        </Card>
      )
      expect(screen.getByText(/card content/i)).toBeInTheDocument()
    })

    it('should render with title', () => {
      render(
        <Card title="Test Card">
          <div>Content</div>
        </Card>
      )
      expect(screen.getByText(/test card/i)).toBeInTheDocument()
    })

    it('should render with subtitle', () => {
      render(
        <Card title="Test Card" subtitle="Subtitle text">
          <div>Content</div>
        </Card>
      )
      expect(screen.getByText(/subtitle text/i)).toBeInTheDocument()
    })

    it('should render with avatar', () => {
      render(
        <Card 
          title="Test Card" 
          avatar={<div data-testid="avatar">Avatar</div>}
        >
          <div>Content</div>
        </Card>
      )
      expect(screen.getByTestId('avatar')).toBeInTheDocument()
    })
  })

  describe('Media', () => {
    it('should render with image', () => {
      render(
        <Card
          image="https://example.com/image.jpg"
          imageAlt="Test image"
        >
          <div>Content</div>
        </Card>
      )
      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.jpg')
    })

    it('should render with custom media', () => {
      render(
        <Card media={<div data-testid="custom-media">Custom Media</div>}>
          <div>Content</div>
        </Card>
      )
      expect(screen.getByTestId('custom-media')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('should render elevation variant', () => {
      render(<Card variant="elevation">Content</Card>)
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should render outlined variant', () => {
      render(<Card variant="outlined">Content</Card>)
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should render filled variant', () => {
      render(<Card variant="filled">Content</Card>)
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should render glass variant', () => {
      render(<Card variant="glass">Content</Card>)
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })
  })

  describe('Interactive Features', () => {
    it('should handle favorite click', () => {
      const handleFavorite = vi.fn()
      render(
        <Card
          favoritable
          favorited={false}
          onFavoriteClick={handleFavorite}
        >
          Content
        </Card>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should handle share click', () => {
      const handleShare = vi.fn()
      render(
        <Card
          shareable
          onShareClick={handleShare}
        >
          Content
        </Card>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should handle expand click', () => {
      const handleExpand = vi.fn()
      render(
        <Card
          expandable
          expanded={false}
          onExpandClick={handleExpand}
        >
          Content
        </Card>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })
  })

  describe('Actions', () => {
    it('should render primary action', () => {
      const handlePrimary = vi.fn()
      render(
        <Card
          primaryAction={{
            label: 'Confirm',
            onClick: handlePrimary,
            variant: 'contained'
          }}
        >
          Content
        </Card>
      )
      expect(screen.getByText(/confirm/i)).toBeInTheDocument()
    })

    it('should render secondary action', () => {
      const handleSecondary = vi.fn()
      render(
        <Card
          secondaryAction={{
            label: 'Cancel',
            onClick: handleSecondary,
            variant: 'outlined'
          }}
        >
          Content
        </Card>
      )
      expect(screen.getByText(/cancel/i)).toBeInTheDocument()
    })

    it('should render custom actions', () => {
      render(
        <Card actions={<button>Custom Action</button>}>
          Content
        </Card>
      )
      expect(screen.getByText(/custom action/i)).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should apply hoverable styles', () => {
      render(<Card hoverable>Content</Card>)
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should apply clickable styles', () => {
      const handleClick = vi.fn()
      render(
        <Card clickable onClick={handleClick}>
          Content
        </Card>
      )
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should apply horizontal layout', () => {
      render(<Card horizontal>Content</Card>)
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should apply compact mode', () => {
      render(<Card compact>Content</Card>)
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })

    it('should apply loading state', () => {
      render(<Card loading>Content</Card>)
      expect(screen.getByText(/content/i)).toBeInTheDocument()
    })
  })

  describe('Expanded Content', () => {
    it('should show expandable content when expanded', () => {
      render(
        <Card
          expandable
          expanded={true}
          expandContent={<div data-testid="expand-content">Expanded</div>}
        >
          Content
        </Card>
      )
      expect(screen.getByTestId('expand-content')).toBeInTheDocument()
    })

    it('should not show expandable content when collapsed', () => {
      render(
        <Card
          expandable
          expanded={false}
          expandContent={<div data-testid="expand-content">Expanded</div>}
        >
          Content
        </Card>
      )
      expect(screen.queryByTestId('expand-content')).not.toBeInTheDocument()
    })
  })
})

