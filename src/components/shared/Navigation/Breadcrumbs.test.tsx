/**
 * Breadcrumbs Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { Breadcrumbs } from './Breadcrumbs'

describe('Breadcrumbs', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Details', href: '/projects/123' },
  ]

  it('should render breadcrumbs', () => {
    render(<Breadcrumbs items={items} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('should mark last item as current', () => {
    render(<Breadcrumbs items={items} />)
    expect(screen.getByText('Details')).toBeInTheDocument()
  })
})

