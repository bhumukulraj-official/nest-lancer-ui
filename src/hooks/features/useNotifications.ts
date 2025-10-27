/**
 * Notifications Hook
 * Custom hook for notification management
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect } from 'react'

import { NotificationApiService } from '../../services/notification/notificationApiService'
import type {
  Notification,
  NotificationCreateData,
  NotificationFilters
} from '../../types/models/notification.types'

export interface UseNotificationsOptions {
  autoFetch?: boolean
  initialFilters?: NotificationFilters
}

export interface UseNotificationsReturn {
  // State
  notifications: Notification[]
  currentNotification: Notification | null
  loading: boolean
  error: string | null
  filters: NotificationFilters
  unreadCount: number

  // Actions
  fetchNotifications: (filters?: NotificationFilters) => Promise<void>
  fetchNotification: (id: string) => Promise<void>
  createNotification: (data: NotificationCreateData) => Promise<Notification>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  deleteNotification: (id: string) => Promise<void>
  setFilters: (filters: NotificationFilters) => void
  setCurrentNotification: (notification: Notification | null) => void
  clearError: () => void
  refresh: () => Promise<void>
}

export function useNotifications(options: UseNotificationsOptions = {}): UseNotificationsReturn {
  const { autoFetch = true, initialFilters = {} } = options

  // State
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<NotificationFilters>(initialFilters)
  const [unreadCount, setUnreadCount] = useState(0)

  // Fetch notifications
  const fetchNotifications = useCallback(async (newFilters?: NotificationFilters) => {
    try {
      setLoading(true)
      setError(null)

      const searchFilters = newFilters || filters
      const result = await NotificationApiService.getCurrentUserNotifications(searchFilters)
      
      setNotifications(result.data)
      setUnreadCount(result.unreadCount || 0)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch notifications'
      setError(errorMessage)
      console.error('Error fetching notifications:', err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Fetch single notification
  const fetchNotification = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const notification = await NotificationApiService.getNotification(id)
      setCurrentNotification(notification)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch notification'
      setError(errorMessage)
      console.error('Error fetching notification:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Create notification
  const createNotification = useCallback(async (data: NotificationCreateData): Promise<Notification> => {
    try {
      setLoading(true)
      setError(null)

      const notification = await NotificationApiService.createNotification(data)
      setNotifications(prev => [notification, ...prev])
      setCurrentNotification(notification)
      
      return notification
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create notification'
      setError(errorMessage)
      console.error('Error creating notification:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Mark notification as read
  const markAsRead = useCallback(async (id: string) => {
    try {
      await NotificationApiService.markAsRead(id)
      
      setNotifications(prev => prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      ))
      
      if (currentNotification?.id === id) {
        setCurrentNotification(prev => prev ? { ...prev, isRead: true } : null)
      }
      
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark notification as read'
      setError(errorMessage)
      console.error('Error marking notification as read:', err)
    }
  }, [currentNotification])

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      await NotificationApiService.markAllAsRead()
      
      setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })))
      setUnreadCount(0)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark all notifications as read'
      setError(errorMessage)
      console.error('Error marking all notifications as read:', err)
    }
  }, [])

  // Delete notification
  const deleteNotification = useCallback(async (id: string) => {
    try {
      await NotificationApiService.deleteNotification(id)
      
      setNotifications(prev => prev.filter(notif => notif.id !== id))
      if (currentNotification?.id === id) {
        setCurrentNotification(null)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete notification'
      setError(errorMessage)
      console.error('Error deleting notification:', err)
      throw err
    }
  }, [currentNotification])

  // Set filters
  const handleSetFilters = useCallback((newFilters: NotificationFilters) => {
    setFilters(newFilters)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Refresh
  const refresh = useCallback(async () => {
    await fetchNotifications()
  }, [fetchNotifications])

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchNotifications()
    }
  }, [autoFetch, fetchNotifications])

  return {
    // State
    notifications,
    currentNotification,
    loading,
    error,
    filters,
    unreadCount,

    // Actions
    fetchNotifications,
    fetchNotification,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    setFilters: handleSetFilters,
    setCurrentNotification,
    clearError,
    refresh
  }
}

export default useNotifications
