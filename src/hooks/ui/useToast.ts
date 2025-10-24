/**
 * useToast Hook
 * Toast notification management hook using notification store
 * Provides toast control and notification management
 */

import { useCallback } from 'react'
import { useNotificationStore, Toast, NotificationType } from '@/stores/notificationStore'

// Toast hook return type
export interface UseToastReturn {
  // State
  toasts: Toast[]
  
  // Basic toast methods
  showToast: (
    message: string,
    type?: NotificationType,
    options?: Partial<Toast>
  ) => string
  showSuccess: (message: string, title?: string, options?: Partial<Toast>) => string
  showError: (message: string, title?: string, options?: Partial<Toast>) => string
  showWarning: (message: string, title?: string, options?: Partial<Toast>) => string
  showInfo: (message: string, title?: string, options?: Partial<Toast>) => string
  
  // Toast management
  removeToast: (id: string) => void
  clearAllToasts: () => void
  
  // Advanced methods
  showConfirmationToast: (
    message: string,
    onConfirm: () => void,
    options?: {
      title?: string
      confirmLabel?: string
      duration?: number
    }
  ) => string
  
  showPromiseToast: <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ) => Promise<T>
  
  showPersistentToast: (
    message: string,
    type: NotificationType,
    options?: Partial<Toast>
  ) => string
}

/**
 * Toast notification hook
 */
export const useToast = (): UseToastReturn => {
  const {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess: showSuccessAction,
    showError: showErrorAction,
    showWarning: showWarningAction,
    showInfo: showInfoAction,
  } = useNotificationStore()
  
  // Generic toast method
  const showToast = useCallback((
    message: string,
    type: NotificationType = 'info',
    options: Partial<Toast> = {}
  ): string => {
    return addToast({
      type,
      message,
      ...options,
    })
  }, [addToast])
  
  // Success toast
  const showSuccess = useCallback((
    message: string,
    title?: string,
    options: Partial<Toast> = {}
  ): string => {
    return showSuccessAction(message, title, options)
  }, [showSuccessAction])
  
  // Error toast
  const showError = useCallback((
    message: string,
    title?: string,
    options: Partial<Toast> = {}
  ): string => {
    return showErrorAction(message, title, options)
  }, [showErrorAction])
  
  // Warning toast
  const showWarning = useCallback((
    message: string,
    title?: string,
    options: Partial<Toast> = {}
  ): string => {
    return showWarningAction(message, title, options)
  }, [showWarningAction])
  
  // Info toast
  const showInfo = useCallback((
    message: string,
    title?: string,
    options: Partial<Toast> = {}
  ): string => {
    return showInfoAction(message, title, options)
  }, [showInfoAction])
  
  // Confirmation toast
  const showConfirmationToast = useCallback((
    message: string,
    onConfirm: () => void,
    options: {
      title?: string
      confirmLabel?: string
      duration?: number
    } = {}
  ): string => {
    const { title, confirmLabel = 'Confirm', duration = 10000 } = options
    
    return addToast({
      type: 'warning',
      title,
      message,
      duration,
      action: {
        label: confirmLabel,
        onClick: onConfirm,
      },
    })
  }, [addToast])
  
  // Promise toast
  const showPromiseToast = useCallback(<T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ): Promise<T> => {
    // Show loading toast
    const loadingId = addToast({
      type: 'info',
      message: messages.loading,
      duration: 0, // Persistent until resolved
      dismissible: false,
    })
    
    return promise
      .then((result) => {
        removeToast(loadingId)
        showSuccess(messages.success)
        return result
      })
      .catch((error) => {
        removeToast(loadingId)
        showError(messages.error)
        throw error
      })
  }, [addToast, removeToast, showSuccess, showError])
  
  // Persistent toast
  const showPersistentToast = useCallback((
    message: string,
    type: NotificationType,
    options: Partial<Toast> = {}
  ): string => {
    return addToast({
      type,
      message,
      duration: 0, // Persistent
      ...options,
    })
  }, [addToast])
  
  return {
    // State
    toasts,
    
    // Basic methods
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    
    // Management
    removeToast,
    clearAllToasts,
    
    // Advanced methods
    showConfirmationToast,
    showPromiseToast,
    showPersistentToast,
  }
}

/**
 * Hook for API error handling with toasts
 */
export const useApiErrorToast = () => {
  const { showError } = useToast()
  
  const handleApiError = useCallback((
    error: any,
    fallbackMessage?: string,
    options?: {
      title?: string
      showDetails?: boolean
    }
  ) => {
    const { title = 'Error', showDetails = false } = options || {}
    
    let message = fallbackMessage || 'An unexpected error occurred'
    
    // Extract error message from different error formats
    if (error?.message) {
      message = error.message
    } else if (error?.response?.data?.message) {
      message = error.response.data.message
    } else if (typeof error === 'string') {
      message = error
    }
    
    // Show additional details if requested
    if (showDetails && error?.details) {
      message += `\n\nDetails: ${error.details}`
    }
    
    return showError(message, title)
  }, [showError])
  
  return {
    handleApiError,
  }
}

/**
 * Hook for form validation toasts
 */
export const useFormToast = () => {
  const { showError, showSuccess, showWarning } = useToast()
  
  const showValidationErrors = useCallback((
    errors: Record<string, string[]>
  ) => {
    Object.entries(errors).forEach(([field, messages]) => {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1)
      const message = messages.join(', ')
      showError(message, `${fieldName} Error`)
    })
  }, [showError])
  
  const showFormSuccess = useCallback((
    action: string = 'submitted'
  ) => {
    showSuccess(`Form ${action} successfully`)
  }, [showSuccess])
  
  const showUnsavedChanges = useCallback((
    onSave: () => void,
    _onDiscard: () => void
  ) => {
    showWarning(
      'You have unsaved changes. Do you want to save them?',
      'Unsaved Changes',
      {
        duration: 0,
        action: {
          label: 'Save',
          onClick: onSave,
        },
      }
    )
  }, [showWarning])
  
  return {
    showValidationErrors,
    showFormSuccess,
    showUnsavedChanges,
  }
}

export default useToast
