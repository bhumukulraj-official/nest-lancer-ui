/**
 * Bar Chart Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { BarChart } from './BarChart'

describe('BarChart', () => {
  const mockData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 200 },
  ]

  const bars = [{ dataKey: 'value', name: 'Value', color: '#8884d8' }]

  it('should render bar chart', () => {
    const { container } = render(<BarChart data={mockData} bars={bars} />)
    expect(container.querySelector('.recharts-wrapper')).toBeInTheDocument()
  })
})

