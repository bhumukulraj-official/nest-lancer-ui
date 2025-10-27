/**
 * Notification Context
 * React context for notification state management
 */

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Notification, NotificationType, NotificationPriority, NotificationChannel } from '../types'

// Notification State Interface
interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  isOpen: boolean
}

// Notification Actions
type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'MARK_READ'; payload: string }
  | { type: 'MARK_ALL_READ' }
  | { type: 'CLEAR_ALL' }
  | { type: 'TOGGLE_OPEN' }
  | { type: 'SET_OPEN'; payload: boolean }

// Initial State
const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isOpen: false,
}

// Notification Reducer
const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }
    case 'REMOVE_NOTIFICATION':
      const notificationToRemove = state.notifications.find(n => n.id === action.payload)
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
        unreadCount: notificationToRemove && !notificationToRemove.isRead 
          ? state.unreadCount - 1 
          : state.unreadCount,
      }
    case 'MARK_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload 
            ? { ...n, isRead: true, readAt: new Date().toISOString() }
            : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }
    case 'MARK_ALL_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({
          ...n,
          isRead: true,
          readAt: new Date().toISOString(),
        })),
        unreadCount: 0,
      }
    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: [],
        unreadCount: 0,
      }
    case 'TOGGLE_OPEN':
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case 'SET_OPEN':
      return {
        ...state,
        isOpen: action.payload,
      }
    default:
      return state
  }
}

// Notification Context Interface
interface NotificationContextType {
  state: NotificationState
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>) => void
  removeNotification: (id: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
  toggleOpen: () => void
  setOpen: (isOpen: boolean) => void
  showSuccess: (message: string, title?: string) => void
  showError: (message: string, title?: string) => void
  showWarning: (message: string, title?: string) => void
  showInfo: (message: string, title?: string) => void
}

// Create Context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Notification Provider Props
interface NotificationProviderProps {
  children: ReactNode
}

// Notification Provider Component
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  // Add notification function
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isArchived: false,
    }
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification })
  }

  // Remove notification function
  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }

  // Mark as read function
  const markAsRead = (id: string) => {
    dispatch({ type: 'MARK_READ', payload: id })
  }

  // Mark all as read function
  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_READ' })
  }

  // Clear all function
  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' })
  }

  // Toggle open function
  const toggleOpen = () => {
    dispatch({ type: 'TOGGLE_OPEN' })
  }

  // Set open function
  const setOpen = (isOpen: boolean) => {
    dispatch({ type: 'SET_OPEN', payload: isOpen })
  }

  // Show success notification
  const showSuccess = (message: string, title: string = 'Success') => {
    addNotification({
      userId: 'current-user', // This would come from auth context
      type: NotificationType.ANNOUNCEMENT,
      title,
      message,
      isRead: false,
      priority: NotificationPriority.MEDIUM,
      channels: [NotificationChannel.IN_APP],
    })
  }

  // Show error notification
  const showError = (message: string, title: string = 'Error') => {
    addNotification({
      userId: 'current-user', // This would come from auth context
      type: NotificationType.SYSTEM_ERROR,
      title,
      message,
      isRead: false,
      priority: NotificationPriority.HIGH,
      channels: [NotificationChannel.IN_APP],
    })
  }

  // Show warning notification
  const showWarning = (message: string, title: string = 'Warning') => {
    addNotification({
      userId: 'current-user', // This would come from auth context
      type: NotificationType.ANNOUNCEMENT,
      title,
      message,
      isRead: false,
      priority: NotificationPriority.MEDIUM,
      channels: [NotificationChannel.IN_APP],
    })
  }

  // Show info notification
  const showInfo = (message: string, title: string = 'Information') => {
    addNotification({
      userId: 'current-user', // This would come from auth context
      type: NotificationType.ANNOUNCEMENT,
      title,
      message,
      isRead: false,
      priority: NotificationPriority.LOW,
      channels: [NotificationChannel.IN_APP],
    })
  }

  const value: NotificationContextType = {
    state,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    toggleOpen,
    setOpen,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

// Custom hook to use notification context
export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

// Export context for advanced usage
export { NotificationContext }
