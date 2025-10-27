/**
 * Tabs Component Tests
 */

import { describe, it, expect, vi } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { Tabs } from './Tabs'

const mockTabs = [
  { value: 'tab1', label: 'Tab 1' },
  { value: 'tab2', label: 'Tab 2' },
  { value: 'tab3', label: 'Tab 3' },
]

describe('Tabs', () => {
  it('should render items', () => {
    render(<Tabs items={mockTabs} value="tab1" onChange={() => {}} />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
  })

  it('should handle tab change', () => {
    const handleChange = vi.fn()
    render(<Tabs items={mockTabs} value="tab1" onChange={handleChange} />)

    const tab2 = screen.getByText('Tab 2')
    tab2.click()

    expect(handleChange).toHaveBeenCalledWith('tab2')
  })
})

