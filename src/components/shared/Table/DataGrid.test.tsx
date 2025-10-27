/**
 * DataGrid Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { DataGrid } from './DataGrid'

const mockRows = [
  { id: '1', name: 'Item 1', value: 100 },
  { id: '2', name: 'Item 2', value: 200 },
]

const mockColumns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'value', headerName: 'Value', width: 150 },
]

describe('DataGrid', () => {
  it('should render data grid', () => {
    const { container } = render(<DataGrid rows={mockRows} columns={mockColumns} />)
    expect(container.querySelector('.MuiDataGrid-root')).toBeInTheDocument()
  })
})

