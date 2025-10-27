/**
 * Navbar Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { Navbar } from './Navbar'

describe('Navbar', () => {
  it('should render navbar', () => {
    render(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render logo', () => {
    render(<Navbar brandComponent={<div>Logo</div>} />)
    expect(screen.getByText('Logo')).toBeInTheDocument()
  })
})

