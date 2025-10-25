/**
 * Notification API Service
 * Handles all notification-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { NOTIFICATION_ENDPOINTS } from '../api/endpoints'
import type {
  Notification,
  NotificationCreateData,
  NotificationUpdateData,
  NotificationFilters,
  NotificationSearchResult,
  NotificationStats,
  NotificationType,
  NotificationStatus,
  NotificationPriority,
  NotificationChannel,
  NotificationTemplate,
  NotificationSchedule,
  NotificationAnalytics,
  NotificationSettings,
  NotificationPreferences,
  NotificationDelivery,
  NotificationReadReceipt
} from '../../types/models/notification.types'

export class NotificationApiService {
  /**
   * Get all notifications with optional filtering
   */
  static async getNotifications(filters?: NotificationFilters): Promise<NotificationSearchResult> {
    try {
      const response = await apiClient.get(NOTIFICATION_ENDPOINTS.LIST, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching notifications:', error)
      throw error
    }
  }

  /**
   * Get a single notification by ID
   */
  static async getNotification(id: string): Promise<Notification> {
    try {
      const response = await apiClient.get(`${NOTIFICATION_ENDPOINTS.BASE}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching notification:', error)
      throw error
    }
  }

  /**
   * Get current user's notifications
   */
  static async getCurrentUserNotifications(filters?: NotificationFilters): Promise<NotificationSearchResult> {
    try {
      const response = await apiClient.get(NOTIFICATION_ENDPOINTS.USER_NOTIFICATIONS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching user notifications:', error)
      throw error
    }
  }

  /**
   * Create a new notification
   */
  static async createNotification(notificationData: NotificationCreateData): Promise<Notification> {
    try {
      const response = await apiClient.post(NOTIFICATION_ENDPOINTS.CREATE, notificationData)
      return response.data
    } catch (error) {
      console.error('Error creating notification:', error)
      throw error
    }
  }

  /**
   * Update notification
   */
  static async updateNotification(id: string, notificationData: NotificationUpdateData): Promise<Notification> {
    try {
      const response = await apiClient.put(`${NOTIFICATION_ENDPOINTS.BASE}/${id}`, notificationData)
      return response.data
    } catch (error) {
      console.error('Error updating notification:', error)
      throw error
    }
  }

  /**
   * Delete notification
   */
  static async deleteNotification(id: string): Promise<void> {
    try {
      await apiClient.delete(`${NOTIFICATION_ENDPOINTS.BASE}/${id}`)
    } catch (error) {
      console.error('Error deleting notification:', error)
      throw error
    }
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(id: string): Promise<Notification> {
    try {
      const response = await apiClient.patch(`${NOTIFICATION_ENDPOINTS.BASE}/${id}/read`)
      return response.data
    } catch (error) {
      console.error('Error marking notification as read:', error)
      throw error
    }
  }

  /**
   * Mark notification as unread
   */
  static async markAsUnread(id: string): Promise<Notification> {
    try {
      const response = await apiClient.patch(`${NOTIFICATION_ENDPOINTS.BASE}/${id}/unread`)
      return response.data
    } catch (error) {
      console.error('Error marking notification as unread:', error)
      throw error
    }
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead(): Promise<void> {
    try {
      await apiClient.patch(NOTIFICATION_ENDPOINTS.MARK_ALL_READ)
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      throw error
    }
  }

  /**
   * Mark all notifications as unread
   */
  static async markAllAsUnread(): Promise<void> {
    try {
      await apiClient.patch(NOTIFICATION_ENDPOINTS.MARK_ALL_UNREAD)
    } catch (error) {
      console.error('Error marking all notifications as unread:', error)
      throw error
    }
  }

  /**
   * Update notification status
   */
  static async updateNotificationStatus(id: string, status: NotificationStatus): Promise<Notification> {
    try {
      const response = await apiClient.patch(`${NOTIFICATION_ENDPOINTS.BASE}/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating notification status:', error)
      throw error
    }
  }

  /**
   * Update notification priority
   */
  static async updateNotificationPriority(id: string, priority: NotificationPriority): Promise<Notification> {
    try {
      const response = await apiClient.patch(`${NOTIFICATION_ENDPOINTS.BASE}/${id}/priority`, { priority })
      return response.data
    } catch (error) {
      console.error('Error updating notification priority:', error)
      throw error
    }
  }

  /**
   * Get unread notification count
   */
  static async getUnreadCount(): Promise<{ count: number }> {
    try {
      const response = await apiClient.get(NOTIFICATION_ENDPOINTS.UNREAD_COUNT)
      return response.data
    } catch (error) {
      console.error('Error fetching unread count:', error)
      throw error
    }
  }

  /**
   * Get notification statistics
   */
  static async getNotificationStats(filters?: NotificationFilters): Promise<NotificationStats> {
    try {
      const response = await apiClient.get(NOTIFICATION_ENDPOINTS.STATS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching notification stats:', error)
      throw error
    }
  }

  /**
   * Get notification analytics
   */
  static async getNotificationAnalytics(filters?: NotificationFilters): Promise<NotificationAnalytics> {
    try {
      const response = await apiClient.get(NOTIFICATION_ENDPOINTS.ANALYTICS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching notification analytics:', error)
      throw error
    }
  }

  /**
   * Search notifications
   */
  static async searchNotifications(query: string, filters?: NotificationFilters): Promise<NotificationSearchResult> {
    try {
      const response = await apiClient.get(NOTIFICATION_ENDPOINTS.SEARCH, {
        params: { query, ...filters }
      })
      return response.data
    } catch (error) {
      console.error('Error searching notifications:', error)
      throw error
    }
  }

  /**
   * Get notification templates
   */
  static async getNotificationTemplates(): Promise<NotificationTemplate[]> {
    try {
      const response = await apiClient.get(NOTIFICATION_ENDPOINTS.TEMPLATES)
      return response.data
    } catch (error) {
      console.error('Error fetching notification templates:', error)
      throw error
    }
  }

  /**
   * Create notification template
   */
  static async createNotificationTemplate(template: NotificationTemplate): Promise<NotificationTemplate> {
    try {
      const response = await apiClient.post(NOTIFICATION_ENDPOINTS.TEMPLATES, template)
      return response.data
    } catch (error) {
      console.error('Error creating notification template:', error)
      throw error
    }
  }

  /**
   * Update notification template
   */
  static async updateNotificationTemplate(id: string, template: Partial<NotificationTemplate>): Promise<NotificationTemplate> {
    try {
      const response = await apiClient.put(`${NOTIFICATION_ENDPOINTS.TEMPLATES}/${id}`, template)
      return response.data
    } catch (error) {
      console.error('Error updating notification template:', error)
      throw error
    }
  }

  /**
   * Delete notification template
   */
  static async deleteNotificationTemplate(id: string): Promise<void> {
    try {
      await apiClient.delete(`${NOTIFICATION_ENDPOINTS.TEMPLATES}/${id}`)
    } catch (error) {
      console.error('Error deleting notification template:', error)
      throw error
    }
  }

  /**
   * Schedule notification
   */
  static async scheduleNotification(notificationData: NotificationCreateData, schedule: NotificationSchedule): Promise<Notification> {
    try {
      const response = await apiClient.post(NOTIFICATION_ENDPOINTS.SCHEDULE, {
        notification: notificationData,
        schedule
      })
      return response.data
    } catch (error) {
      console.error('Error scheduling notification:', error)
      throw error
    }
  }

  /**
   * Cancel scheduled notification
   */
  static async cancelScheduledNotification(id: string): Promise<Notification> {
    try {
      const response = await apiClient.patch(`${NOTIFICATION_ENDPOINTS.BASE}/${id}/cancel`)
      return response.data
    } catch (error) {
      console.error('Error canceling scheduled notification:', error)
      throw error
    }
  }

  /**
   * Get user notification settings
   */
  static async getNotificationSettings(): Promise<NotificationSettings> {
    try {
      const response = await apiClient.get(NOTIFICATION_ENDPOINTS.SETTINGS)
      return response.data
    } catch (error) {
      console.error('Error fetching notification settings:', error)
      throw error
    }
  }

  /**
   * Update user notification settings
   */
  static async updateNotificationSettings(settings: NotificationSettings): Promise<NotificationSettings> {
    try {
      const response = await apiClient.put(NOTIFICATION_ENDPOINTS.SETTINGS, settings)
      return response.data
    } catch (error) {
      console.error('Error updating notification settings:', error)
      throw error
    }
  }

  /**
   * Get user notification preferences
   */
  static async getNotificationPreferences(): Promise<NotificationPreferences> {
    try {
      const response = await apiClient.get(NOTIFICATION_ENDPOINTS.PREFERENCES)
      return response.data
    } catch (error) {
      console.error('Error fetching notification preferences:', error)
      throw error
    }
  }

  /**
   * Update user notification preferences
   */
  static async updateNotificationPreferences(preferences: NotificationPreferences): Promise<NotificationPreferences> {
    try {
      const response = await apiClient.put(NOTIFICATION_ENDPOINTS.PREFERENCES, preferences)
      return response.data
    } catch (error) {
      console.error('Error updating notification preferences:', error)
      throw error
    }
  }

  /**
   * Test notification delivery
   */
  static async testNotificationDelivery(channel: NotificationChannel, testData: any): Promise<NotificationDelivery> {
    try {
      const response = await apiClient.post(NOTIFICATION_ENDPOINTS.TEST_DELIVERY, {
        channel,
        testData
      })
      return response.data
    } catch (error) {
      console.error('Error testing notification delivery:', error)
      throw error
    }
  }

  /**
   * Get notification delivery status
   */
  static async getNotificationDeliveryStatus(id: string): Promise<NotificationDelivery> {
    try {
      const response = await apiClient.get(`${NOTIFICATION_ENDPOINTS.BASE}/${id}/delivery-status`)
      return response.data
    } catch (error) {
      console.error('Error fetching notification delivery status:', error)
      throw error
    }
  }

  /**
   * Get notification read receipts
   */
  static async getNotificationReadReceipts(id: string): Promise<NotificationReadReceipt[]> {
    try {
      const response = await apiClient.get(`${NOTIFICATION_ENDPOINTS.BASE}/${id}/read-receipts`)
      return response.data
    } catch (error) {
      console.error('Error fetching notification read receipts:', error)
      throw error
    }
  }

  /**
   * Bulk update notifications (Admin only)
   */
  static async bulkUpdateNotifications(updates: Array<{ id: string; data: NotificationUpdateData }>): Promise<Notification[]> {
    try {
      const response = await apiClient.patch(NOTIFICATION_ENDPOINTS.BULK_UPDATE, { updates })
      return response.data
    } catch (error) {
      console.error('Error bulk updating notifications:', error)
      throw error
    }
  }

  /**
   * Bulk delete notifications (Admin only)
   */
  static async bulkDeleteNotifications(ids: string[]): Promise<void> {
    try {
      await apiClient.delete(NOTIFICATION_ENDPOINTS.BULK_DELETE, { data: { ids } })
    } catch (error) {
      console.error('Error bulk deleting notifications:', error)
      throw error
    }
  }

  /**
   * Export notifications (Admin only)
   */
  static async exportNotifications(filters?: NotificationFilters): Promise<Blob> {
    try {
      const response = await apiClient.get(NOTIFICATION_ENDPOINTS.EXPORT, {
        params: filters,
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting notifications:', error)
      throw error
    }
  }

  /**
   * Clear old notifications (Admin only)
   */
  static async clearOldNotifications(olderThanDays: number): Promise<{ deletedCount: number }> {
    try {
      const response = await apiClient.post(NOTIFICATION_ENDPOINTS.CLEAR_OLD, { olderThanDays })
      return response.data
    } catch (error) {
      console.error('Error clearing old notifications:', error)
      throw error
    }
  }
}

export default NotificationApiService
