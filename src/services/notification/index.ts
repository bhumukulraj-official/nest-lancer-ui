/**
 * Notification Services Index
 * Central export point for all notification-related services
 */

export { NotificationApiService } from './notificationApiService'

// Re-export types for convenience
export type {
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
