/**
 * DataTable Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { DataTable } from './DataTable'

const mockData = [
  { id: '1', name: 'Item 1', status: 'active' },
  { id: '2', name: 'Item 2', status: 'inactive' },
]

const mockColumns = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 150 },
]

describe('DataTable', () => {
  it('should render data table', () => {
    render(<DataTable data={mockData} columns={mockColumns} />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('should render headers', () => {
    render(<DataTable data={mockData} columns={mockColumns} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })
})

