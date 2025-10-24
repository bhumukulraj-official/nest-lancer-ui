/**
 * Modal Components Index
 * Central export point for all modal-related components
 */

// Modal components
export { 
  Modal, 
  ConfirmationModal,
  AlertModal,
  type ModalProps,
  type ModalAnimation,
  type ModalSize 
} from './Modal'

// Dialog components
export { 
  Dialog,
  ConfirmDialog,
  AlertDialog,
  InfoDialog,
  WarningDialog,
  ErrorDialog,
  SuccessDialog,
  FormDialog,
  type DialogProps,
  type DialogType 
} from './Dialog'

// Re-export for convenience
export { Modal as default } from './Modal'
