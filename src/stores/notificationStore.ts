/**
 * Notification Store
 * Zustand store for notification and toast management
 * UI-only state - backend sends notification data via API/WebSocket
 */

import { create } from 'zustand'

// Notification types
export type NotificationType = 'info' | 'success' | 'warning' | 'error'

// Toast notification interface
export interface Toast {
  id: string
  type: NotificationType
  title?: string
  message: string
  duration?: number // in milliseconds, 0 for persistent
  action?: {
    label: string
    onClick: () => void
  }
  dismissible?: boolean
  timestamp: number
}

// System notification interface (from backend)
export interface SystemNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  timestamp: string
  data?: Record<string, any>
  actionUrl?: string
}

// Notification store state interface
export interface NotificationState {
  // Toast notifications (temporary UI feedback)
  toasts: Toast[]
  
  // System notifications (persistent from backend)
  notifications: SystemNotification[]
  unreadCount: number
  
  // Settings
  settings: {
    enableToasts: boolean
    enableSounds: boolean
    toastPosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
    defaultDuration: number
  }
  
  // Actions
  // Toast actions
  addToast: (toast: Omit<Toast, 'id' | 'timestamp'>) => string
  removeToast: (id: string) => void
  clearAllToasts: () => void
  
  // System notification actions
  setNotifications: (notifications: SystemNotification[]) => void
  addNotification: (notification: SystemNotification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
  
  // Convenience methods
  showSuccess: (message: string, title?: string, options?: Partial<Toast>) => string
  showError: (message: string, title?: string, options?: Partial<Toast>) => string
  showWarning: (message: string, title?: string, options?: Partial<Toast>) => string
  showInfo: (message: string, title?: string, options?: Partial<Toast>) => string
  
  // Settings actions
  updateSettings: (settings: Partial<NotificationState['settings']>) => void
}

// Default settings
const defaultSettings = {
  enableToasts: true,
  enableSounds: false,
  toastPosition: 'top-right' as const,
  defaultDuration: 5000, // 5 seconds
}

// Create notification store
export const useNotificationStore = create<NotificationState>((set, get) => ({
  // Initial state
  toasts: [],
  notifications: [],
  unreadCount: 0,
  settings: defaultSettings,

  // Toast actions
  addToast: (toastData) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const { settings } = get()
    
    const toast: Toast = {
      id,
      timestamp: Date.now(),
      duration: settings.defaultDuration,
      dismissible: true,
      ...toastData,
    }
    
    set((state) => ({
      toasts: [...state.toasts, toast],
    }))
    
    // Auto-remove toast after duration (if not persistent)
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        get().removeToast(id)
      }, toast.duration)
    }
    
    return id
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }))
  },

  clearAllToasts: () => {
    set({ toasts: [] })
  },

  // System notification actions
  setNotifications: (notifications) => {
    const unreadCount = notifications.filter(n => !n.read).length
    set({ notifications, unreadCount })
  },

  addNotification: (notification) => {
    set((state) => {
      const exists = state.notifications.some(n => n.id === notification.id)
      if (exists) return state
      
      const newNotifications = [notification, ...state.notifications]
      const unreadCount = newNotifications.filter(n => !n.read).length
      
      return {
        notifications: newNotifications,
        unreadCount,
      }
    })
  },

  markAsRead: (id) => {
    set((state) => {
      const notifications = state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
      const unreadCount = notifications.filter(n => !n.read).length
      
      return { notifications, unreadCount }
    })
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0,
    }))
  },

  removeNotification: (id) => {
    set((state) => {
      const notifications = state.notifications.filter(n => n.id !== id)
      const unreadCount = notifications.filter(n => !n.read).length
      
      return { notifications, unreadCount }
    })
  },

  clearAllNotifications: () => {
    set({ notifications: [], unreadCount: 0 })
  },

  // Convenience methods
  showSuccess: (message, title, options = {}) => {
    return get().addToast({
      type: 'success',
      message,
      title,
      ...options,
    })
  },

  showError: (message, title, options = {}) => {
    return get().addToast({
      type: 'error',
      message,
      title,
      duration: 0, // Persistent by default for errors
      ...options,
    })
  },

  showWarning: (message, title, options = {}) => {
    return get().addToast({
      type: 'warning',
      message,
      title,
      duration: 8000, // Longer duration for warnings
      ...options,
    })
  },

  showInfo: (message, title, options = {}) => {
    return get().addToast({
      type: 'info',
      message,
      title,
      ...options,
    })
  },

  // Settings actions
  updateSettings: (newSettings) => {
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    }))
  },
}))

// Utility functions for common notification operations
export const notificationUtils = {
  // Show success toast
  success: (message: string, title?: string) => {
    return useNotificationStore.getState().showSuccess(message, title)
  },

  // Show error toast
  error: (message: string, title?: string) => {
    return useNotificationStore.getState().showError(message, title)
  },

  // Show warning toast
  warning: (message: string, title?: string) => {
    return useNotificationStore.getState().showWarning(message, title)
  },

  // Show info toast
  info: (message: string, title?: string) => {
    return useNotificationStore.getState().showInfo(message, title)
  },

  // Show loading toast with promise
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ): Promise<T> => {
    const { addToast, removeToast, showSuccess, showError } = useNotificationStore.getState()
    
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
  },

  // Handle API error with toast
  handleApiError: (error: any, fallbackMessage?: string) => {
    const message = error?.message || fallbackMessage || 'An unexpected error occurred'
    return useNotificationStore.getState().showError(message, 'Error')
  },

  // Show confirmation toast with action
  confirmation: (
    message: string,
    onConfirm: () => void,
    options: {
      title?: string
      confirmLabel?: string
      duration?: number
    } = {}
  ) => {
    const { title, confirmLabel = 'Confirm', duration = 10000 } = options
    
    return useNotificationStore.getState().addToast({
      type: 'warning',
      title,
      message,
      duration,
      action: {
        label: confirmLabel,
        onClick: onConfirm,
      },
    })
  },

  // Clear all notifications
  clearAll: () => {
    const { clearAllToasts, clearAllNotifications } = useNotificationStore.getState()
    clearAllToasts()
    clearAllNotifications()
  },
}

// Export store
export default useNotificationStore
