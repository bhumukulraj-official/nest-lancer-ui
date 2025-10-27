/**
 * Chart Container Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { ChartContainer } from './ChartContainer'

describe('ChartContainer', () => {
  it('should render chart container', () => {
    render(
      <ChartContainer title="Test Chart">
        <div>Chart Content</div>
      </ChartContainer>
    )

    expect(screen.getByText('Test Chart')).toBeInTheDocument()
    expect(screen.getByText('Chart Content')).toBeInTheDocument()
  })
})

