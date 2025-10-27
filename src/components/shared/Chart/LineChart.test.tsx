/**
 * Line Chart Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { LineChart } from './LineChart'

describe('LineChart', () => {
  const mockData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 200 },
    { name: 'Mar', value: 150 },
  ]

  const lines = [{ dataKey: 'value', name: 'Value', color: '#8884d8' }]

  it('should render line chart', () => {
    render(<LineChart data={mockData} lines={lines} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('should render with correct data', () => {
    render(<LineChart data={mockData} lines={lines} />)
    // Chart renders through Recharts
    expect(document.querySelector('.recharts-wrapper')).toBeInTheDocument()
  })

  it('should render multiple lines', () => {
    const multiLineData = [
      { name: 'Jan', value1: 100, value2: 50 },
      { name: 'Feb', value1: 200, value2: 100 },
    ]
    const multiLines = [
      { dataKey: 'value1', name: 'Value 1' },
      { dataKey: 'value2', name: 'Value 2' },
    ]

    render(<LineChart data={multiLineData} lines={multiLines} />)
    expect(document.querySelector('.recharts-wrapper')).toBeInTheDocument()
  })
})

