/**
 * Drawer Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('should render drawer when open', () => {
    render(
      <Drawer open={true} onClose={() => {}}>
        <div>Drawer Content</div>
      </Drawer>
    )

    expect(screen.getByText('Drawer Content')).toBeInTheDocument()
  })

  it('should render from correct anchor', () => {
    const { container } = render(
      <Drawer open={true} onClose={() => {}} anchor="left">
        <div>Drawer Content</div>
      </Drawer>
    )

    expect(container.querySelector('.MuiDrawer-root')).toBeInTheDocument()
  })
})

