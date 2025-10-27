/**
 * Sidebar Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { Sidebar } from './Sidebar'

const mockMenuItems = [
  { icon: 'home', label: 'Home', path: '/', id: 'home' },
  { icon: 'projects', label: 'Projects', path: '/projects', id: 'projects' },
]

describe('Sidebar', () => {
  it('should render sidebar', () => {
    render(<Sidebar items={mockMenuItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('should render all menu items', () => {
    render(<Sidebar items={mockMenuItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })
})

