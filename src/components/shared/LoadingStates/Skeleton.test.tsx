/**
 * Skeleton Component Tests
 * Unit tests for the Skeleton component
 */

import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { render } from '@/test/utils/test-utils'

import Skeleton from './Skeleton'

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('should render skeleton component', () => {
      render(<Skeleton />)
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    })

    it('should render with text variant', () => {
      render(<Skeleton variant="text" />)
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    })

    it('should render with rectangular variant', () => {
      render(<Skeleton variant="rectangular" />)
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    })

    it('should render with rounded variant', () => {
      render(<Skeleton variant="rounded" />)
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    })

    it('should render with circular variant', () => {
      render(<Skeleton variant="circular" />)
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    })

    it('should render multiple text lines', () => {
      render(<Skeleton variant="text" lines={3} />)
      const skeletons = screen.getAllByRole('img', { hidden: true })
      expect(skeletons).toHaveLength(3)
    })

    it('should render with custom width', () => {
      render(<Skeleton width={200} />)
      const skeleton = screen.getByRole('img', { hidden: true })
      expect(skeleton).toHaveStyle({ width: '200px' })
    })

    it('should render with custom height', () => {
      render(<Skeleton height={50} />)
      const skeleton = screen.getByRole('img', { hidden: true })
      expect(skeleton).toHaveStyle({ height: '50px' })
    })
  })

  describe('Animations', () => {
    it('should have pulse animation by default', () => {
      render(<Skeleton animation="pulse" />)
      const skeleton = screen.getByRole('img', { hidden: true })
      expect(skeleton).toHaveClass('MuiSkeleton-pulse')
    })

    it('should have wave animation', () => {
      render(<Skeleton animation="wave" />)
      const skeleton = screen.getByRole('img', { hidden: true })
      expect(skeleton).toHaveClass('MuiSkeleton-wave')
    })

    it('should have no animation when animation is false', () => {
      render(<Skeleton animation={false} />)
      const skeleton = screen.getByRole('img', { hidden: true })
      expect(skeleton).not.toHaveClass('MuiSkeleton-pulse')
      expect(skeleton).not.toHaveClass('MuiSkeleton-wave')
    })
  })

  describe('Preset Skeletons', () => {
    it('should render TableSkeleton preset', () => {
      const { TableSkeleton } = require('./Skeleton')
      render(<TableSkeleton />)
      const skeletons = screen.getAllByRole('img', { hidden: true })
      expect(skeletons.length).toBeGreaterThan(0)
    })

    it('should render CardSkeleton preset', () => {
      const { CardSkeleton } = require('./Skeleton')
      render(<CardSkeleton />)
      const skeletons = screen.getAllByRole('img', { hidden: true })
      expect(skeletons.length).toBeGreaterThan(0)
    })

    it('should render AvatarSkeleton preset', () => {
      const { AvatarSkeleton } = require('./Skeleton')
      render(<AvatarSkeleton />)
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    })

    it('should render TextSkeleton preset', () => {
      const { TextSkeleton } = require('./Skeleton')
      render(<TextSkeleton lines={3} />)
      const skeletons = screen.getAllByRole('img', { hidden: true })
      expect(skeletons).toHaveLength(3)
    })

    it('should render ListSkeleton preset', () => {
      const { ListSkeleton } = require('./Skeleton')
      render(<ListSkeleton count={5} />)
      const skeletons = screen.getAllByRole('img', { hidden: true })
      expect(skeletons.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('should have aria-busy attribute', () => {
      render(<Skeleton />)
      const skeleton = screen.getByRole('img', { hidden: true })
      expect(skeleton).toHaveAttribute('aria-busy', 'true')
    })

    it('should have proper role', () => {
      render(<Skeleton />)
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should apply custom className', () => {
      render(<Skeleton className="custom-skeleton" />)
      const skeleton = screen.getByRole('img', { hidden: true })
      expect(skeleton).toHaveClass('custom-skeleton')
    })
  })
})

