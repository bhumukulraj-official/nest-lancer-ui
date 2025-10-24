/**
 * Stores Index
 * Central export point for all Zustand stores
 */

// Auth Store
export { 
  default as useAuthStore,
  initializeAuth,
  type User,
  type AuthState 
} from './authStore'

// UI Store
export { 
  default as useUIStore,
  uiUtils,
  type ThemeMode,
  type ModalState,
  type DrawerState,
  type LoadingState,
  type UIState 
} from './uiStore'

// Notification Store
export { 
  default as useNotificationStore,
  notificationUtils,
  type NotificationType,
  type Toast,
  type SystemNotification,
  type NotificationState 
} from './notificationStore'

// Combined store hooks for convenience
export const useStores = () => {
  const useAuthStore = require('./authStore').default
  const useUIStore = require('./uiStore').default
  const useNotificationStore = require('./notificationStore').default
  
  return {
    auth: useAuthStore(),
    ui: useUIStore(),
    notifications: useNotificationStore(),
  }
}

// Store utilities
export const storeUtils = {
  ...require('./uiStore').uiUtils,
  ...require('./notificationStore').notificationUtils,
}
