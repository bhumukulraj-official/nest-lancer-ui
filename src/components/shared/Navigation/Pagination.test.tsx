/**
 * Pagination Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('should render pagination', () => {
    render(
      <Pagination
        page={1}
        total={100}
        count={10}
        pageSize={10}
        onChange={() => {}}
      />
    )

    expect(screen.getByLabelText(/page navigation/i)).toBeInTheDocument()
  })

  it('should render correct page info', () => {
    render(
      <Pagination
        page={2}
        total={50}
        count={5}
        pageSize={10}
        onChange={() => {}}
      />
    )

    expect(screen.getByText(/showing 11-20 of 50/i)).toBeInTheDocument()
  })
})

