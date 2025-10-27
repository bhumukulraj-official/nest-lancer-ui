/**
 * Dialog Component Tests
 */

import { describe, it, expect } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { Dialog } from './Dialog'

describe('Dialog', () => {
  it('should render dialog when open', () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <div>Dialog Content</div>
      </Dialog>
    )

    expect(screen.getByText('Dialog Content')).toBeInTheDocument()
  })

  it('should not render dialog when closed', () => {
    render(
      <Dialog open={false} onClose={() => {}}>
        <div>Dialog Content</div>
      </Dialog>
    )

    expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument()
  })
})

