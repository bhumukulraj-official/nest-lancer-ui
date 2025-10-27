/**
 * TableFilters Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { TableFilters } from './TableFilters'

describe('TableFilters', () => {
  it('should render filter inputs', () => {
    const filters = [
      { id: 'name', type: 'text' as const, label: 'Name', value: '' },
      { id: 'status', type: 'text' as const, label: 'Status', value: '' },
    ]

    render(<TableFilters filters={filters} onChange={() => {}} />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
  })
})

