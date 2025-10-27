/**
 * Pie Chart Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { PieChart } from './PieChart'

describe('PieChart', () => {
  const mockData = [
    { name: 'Category A', value: 40 },
    { name: 'Category B', value: 60 },
  ]

  it('should render pie chart', () => {
    const { container } = render(<PieChart data={mockData} dataKey="value" />)
    expect(container.querySelector('.recharts-wrapper')).toBeInTheDocument()
  })
})

