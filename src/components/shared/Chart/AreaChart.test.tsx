/**
 * Area Chart Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render } from '@/test/utils/test-utils'

import { AreaChart } from './AreaChart'

describe('AreaChart', () => {
  const mockData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 200 },
  ]

  const areas = [{ dataKey: 'value', name: 'Value' }]

  it('should render area chart', () => {
    const { container } = render(<AreaChart data={mockData} areas={areas} />)
    expect(container.querySelector('.recharts-wrapper')).toBeInTheDocument()
  })
})

