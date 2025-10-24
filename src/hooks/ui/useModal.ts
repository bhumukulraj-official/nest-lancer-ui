/**
 * useModal Hook
 * Modal state management hook using UI store
 * Provides modal control and state management
 */

import { useCallback } from 'react'
import { useUIStore, ModalState } from '@/stores/uiStore'

// Modal hook return type
export interface UseModalReturn {
  // State
  isOpen: boolean
  modal: ModalState
  
  // Actions
  openModal: (modal: Partial<ModalState>) => void
  closeModal: () => void
  
  // Convenience methods
  showConfirmation: (
    title: string,
    content: React.ReactNode,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void
  showAlert: (
    title: string,
    content: React.ReactNode,
    onOk?: () => void
  ) => void
  showCustomModal: (
    content: React.ReactNode,
    options?: Partial<ModalState>
  ) => void
}

/**
 * Modal management hook
 */
export const useModal = (): UseModalReturn => {
  const { modal, openModal: openModalAction, closeModal: closeModalAction } = useUIStore()
  
  // Open modal
  const openModal = useCallback((modalData: Partial<ModalState>) => {
    openModalAction(modalData)
  }, [openModalAction])
  
  // Close modal
  const closeModal = useCallback(() => {
    closeModalAction()
  }, [closeModalAction])
  
  // Show confirmation modal
  const showConfirmation = useCallback((
    title: string,
    content: React.ReactNode,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    openModal({
      title,
      content,
      size: 'sm',
      closable: false,
      actions: [
        {
          label: 'Cancel',
          onClick: () => {
            closeModal()
            onCancel?.()
          },
          variant: 'secondary',
        },
        {
          label: 'Confirm',
          onClick: () => {
            closeModal()
            onConfirm()
          },
          variant: 'primary',
        },
      ],
    })
  }, [openModal, closeModal])
  
  // Show alert modal
  const showAlert = useCallback((
    title: string,
    content: React.ReactNode,
    onOk?: () => void
  ) => {
    openModal({
      title,
      content,
      size: 'sm',
      actions: [
        {
          label: 'OK',
          onClick: () => {
            closeModal()
            onOk?.()
          },
          variant: 'primary',
        },
      ],
    })
  }, [openModal, closeModal])
  
  // Show custom modal
  const showCustomModal = useCallback((
    content: React.ReactNode,
    options: Partial<ModalState> = {}
  ) => {
    openModal({
      content,
      size: 'md',
      closable: true,
      ...options,
    })
  }, [openModal])
  
  return {
    // State
    isOpen: modal.isOpen,
    modal,
    
    // Actions
    openModal,
    closeModal,
    
    // Convenience methods
    showConfirmation,
    showAlert,
    showCustomModal,
  }
}

/**
 * Hook for confirmation dialogs
 */
export const useConfirmation = () => {
  const { showConfirmation } = useModal()
  
  const confirm = useCallback((
    message: string,
    options: {
      title?: string
      onConfirm?: () => void
      onCancel?: () => void
      confirmLabel?: string
      cancelLabel?: string
      destructive?: boolean
    } = {}
  ) => {
    const {
      title = 'Confirm Action',
      onConfirm,
      onCancel,
    } = options
    
    return new Promise<boolean>((resolve) => {
      showConfirmation(
        title,
        message,
        () => {
          resolve(true)
          onConfirm?.()
        },
        () => {
          resolve(false)
          onCancel?.()
        }
      )
    })
  }, [showConfirmation])
  
  const confirmDelete = useCallback((
    itemName: string = 'item',
    onConfirm?: () => void
  ) => {
    return confirm(
      `Are you sure you want to delete this ${itemName}? This action cannot be undone.`,
      {
        title: 'Confirm Deletion',
        onConfirm,
        confirmLabel: 'Delete',
        destructive: true,
      }
    )
  }, [confirm])
  
  return {
    confirm,
    confirmDelete,
  }
}

export default useModal
