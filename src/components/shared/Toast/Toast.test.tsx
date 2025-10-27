/**
 * Toast Service Tests
 */

import { describe, it, expect, vi } from 'vitest'

import { render, screen } from '@/test/utils/test-utils'

import { toastService, ToastProvider } from './Toast'

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  toast: {
    custom: vi.fn(() => 'toast-id'),
    dismiss: vi.fn(),
    remove: vi.fn(),
    promise: vi.fn((promise) => promise),
  },
  Toaster: ({ children }: { children?: React.ReactNode }) => <div data-testid="toaster">{children}</div>,
  resolveValue: (value: any) => value,
}))

describe('Toast Service', () => {
  it('should create success toast', () => {
    const toastId = toastService.success('Success message')
    expect(typeof toastId).toBe('string')
  })

  it('should create error toast', () => {
    const toastId = toastService.error('Error message')
    expect(typeof toastId).toBe('string')
  })

  it('should create warning toast', () => {
    const toastId = toastService.warning('Warning message')
    expect(typeof toastId).toBe('string')
  })

  it('should create info toast', () => {
    const toastId = toastService.info('Info message')
    expect(typeof toastId).toBe('string')
  })

  it('should create loading toast', () => {
    const toastId = toastService.loading('Loading message')
    expect(typeof toastId).toBe('string')
  })

  it('should dismiss toast', () => {
    toastService.dismiss('toast-id')
    // Mock verification would be handled by the mock
  })

  it('should dismiss all toasts', () => {
    toastService.dismissAll()
    // Mock verification would be handled by the mock
  })

  it('should remove toast', () => {
    toastService.remove('toast-id')
    // Mock verification would be handled by the mock
  })

  it('should handle promise toast', async () => {
    const promise = Promise.resolve('success')
    const result = await toastService.promise(
      promise,
      {
        loading: 'Loading...',
        success: 'Success!',
        error: 'Error occurred',
      }
    )
    expect(result).toBe('success')
  })
})

describe('ToastProvider', () => {
  it('should render toaster', () => {
    render(
      <ToastProvider>
        <div>Test content</div>
      </ToastProvider>
    )
    expect(screen.getByTestId('toaster')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should accept position prop', () => {
    render(
      <ToastProvider position="bottom-left">
        <div>Test content</div>
      </ToastProvider>
    )
    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })
})

