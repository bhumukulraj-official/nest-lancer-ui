/**
 * UI Hooks Index
 * Central export point for all UI-related hooks
 */

// Modal hooks
export { 
  useModal,
  useConfirmation,
  type UseModalReturn 
} from './useModal'

// Toast hooks
export { 
  useToast,
  useApiErrorToast,
  useFormToast,
  type UseToastReturn 
} from './useToast'

// Storage hooks
export { 
  useLocalStorage,
  useSessionStorage,
  useLocalStorageBoolean,
  useLocalStorageString,
  useLocalStorageNumber,
  type UseLocalStorageOptions,
  type UseLocalStorageReturn 
} from './useLocalStorage'

// Re-export for convenience
export { useModal as default } from './useModal'
