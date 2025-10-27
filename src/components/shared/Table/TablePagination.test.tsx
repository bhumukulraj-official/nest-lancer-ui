/**
 * TablePagination Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { TablePagination } from './TablePagination'

describe('TablePagination', () => {
  it('should render pagination controls', () => {
    render(
      <TablePagination
        page={0}
        count={100}
        rowsPerPage={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    )

    expect(screen.getByLabelText(/rows per page/i)).toBeInTheDocument()
  })

  it('should display pagination info', () => {
    render(
      <TablePagination
        page={0}
        count={100}
        rowsPerPage={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    )

    expect(screen.getByText(/1–10 of 100/i)).toBeInTheDocument()
  })
})

