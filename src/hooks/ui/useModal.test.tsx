/**
 * useModal Hook Tests
 * Tests for modal state management hook
 */

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useUIStore } from '@/stores/uiStore'

import { useModal } from './useModal'


// Mock the UI store
vi.mock('@/stores/uiStore')

describe('useModal', () => {
  const mockOpenModal = vi.fn()
  const mockCloseModal = vi.fn()
  const mockModal = {
    isOpen: false,
    title: '',
    content: null,
    size: 'md',
    closable: true,
    actions: [],
  }

  beforeEach(() => {
    vi.clearAllMocks()

    ;(useUIStore as any).mockReturnValue({
      modal: mockModal,
      openModal: mockOpenModal,
      closeModal: mockCloseModal,
    })
  })

  describe('State', () => {
    it('should return modal state from store', () => {
      const { result } = renderHook(() => useModal())

      expect(result.current.isOpen).toBe(false)
      expect(result.current.modal).toEqual(mockModal)
    })

    it('should return open modal state', () => {
      const openModal = {
        isOpen: true,
        title: 'Test Modal',
        content: <div>Test Content</div>,
        size: 'lg' as const,
        closable: false,
        actions: [],
      }

      ;(useUIStore as any).mockReturnValue({
        modal: openModal,
        openModal: mockOpenModal,
        closeModal: mockCloseModal,
      })

      const { result } = renderHook(() => useModal())

      expect(result.current.isOpen).toBe(true)
      expect(result.current.modal.title).toBe('Test Modal')
    })
  })

  describe('Actions', () => {
    it('should open modal with provided data', () => {
      const { result } = renderHook(() => useModal())

      act(() => {
        result.current.openModal({
          title: 'Test Modal',
          content: <div>Test Content</div>,
          size: 'lg',
        })
      })

      expect(mockOpenModal).toHaveBeenCalledWith({
        title: 'Test Modal',
        content: <div>Test Content</div>,
        size: 'lg',
      })
    })

    it('should close modal', () => {
      const { result } = renderHook(() => useModal())

      act(() => {
        result.current.closeModal()
      })

      expect(mockCloseModal).toHaveBeenCalled()
    })

    it('should show confirmation modal', () => {
      const onConfirm = vi.fn()
      const onCancel = vi.fn()

      const { result } = renderHook(() => useModal())

      act(() => {
        result.current.showConfirmation(
          'Confirm Action',
          'Are you sure?',
          onConfirm,
          onCancel
        )
      })

      expect(mockOpenModal).toHaveBeenCalled()
      const callArgs = mockOpenModal.mock.calls[0][0]

      expect(callArgs.title).toBe('Confirm Action')
      expect(callArgs.content).toBe('Are you sure?')
      expect(callArgs.size).toBe('sm')
      expect(callArgs.closable).toBe(false)
      expect(callArgs.actions).toHaveLength(2)
    })

    it('should show alert modal', () => {
      const onOk = vi.fn()

      const { result } = renderHook(() => useModal())

      act(() => {
        result.current.showAlert('Alert', 'This is an alert', onOk)
      })

      expect(mockOpenModal).toHaveBeenCalled()
      const callArgs = mockOpenModal.mock.calls[0][0]

      expect(callArgs.title).toBe('Alert')
      expect(callArgs.content).toBe('This is an alert')
      expect(callArgs.actions).toHaveLength(1)
    })

    it('should show custom modal with options', () => {
      const customContent = <div>Custom Content</div>

      const { result } = renderHook(() => useModal())

      act(() => {
        result.current.showCustomModal(customContent, {
          size: 'xl',
          closable: false,
        })
      })

      expect(mockOpenModal).toHaveBeenCalledWith({
        content: customContent,
        size: 'xl',
        closable: false,
      })
    })
  })

  describe('Confirmation Modal Actions', () => {
    it('should handle confirm action', () => {
      const onConfirm = vi.fn()

      const { result } = renderHook(() => useModal())

      act(() => {
        result.current.showConfirmation(
          'Test',
          'Are you sure?',
          onConfirm
        )
      })

      const callArgs = mockOpenModal.mock.calls[0][0]
      const confirmAction = callArgs.actions.find((a: any) => a.label === 'Confirm')

      act(() => {
        confirmAction.onClick()
      })

      expect(mockCloseModal).toHaveBeenCalled()
      expect(onConfirm).toHaveBeenCalled()
    })

    it('should handle cancel action', () => {
      const onCancel = vi.fn()

      const { result } = renderHook(() => useModal())

      act(() => {
        result.current.showConfirmation(
          'Test',
          'Are you sure?',
          vi.fn(),
          onCancel
        )
      })

      const callArgs = mockOpenModal.mock.calls[0][0]
      const cancelAction = callArgs.actions.find((a: any) => a.label === 'Cancel')

      act(() => {
        cancelAction.onClick()
      })

      expect(mockCloseModal).toHaveBeenCalled()
      expect(onCancel).toHaveBeenCalled()
    })
  })
})

