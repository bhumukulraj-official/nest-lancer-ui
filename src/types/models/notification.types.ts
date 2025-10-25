/**
 * Notification-related TypeScript type definitions
 * These types represent the data structures for notification management
 */

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: NotificationData
  isRead: boolean
  isArchived: boolean
  priority: NotificationPriority
  channels: NotificationChannel[]
  scheduledAt?: string
  sentAt?: string
  readAt?: string
  archivedAt?: string
  expiresAt?: string
  createdAt: string
  updatedAt: string
}

export interface NotificationData {
  [key: string]: any
  // Common data fields
  entityId?: string
  entityType?: string
  action?: string
  url?: string
  image?: string
  icon?: string
  color?: string
  badge?: number
  sound?: string
  vibration?: boolean
  // Specific data fields based on type
  projectId?: string
  projectTitle?: string
  paymentId?: string
  paymentAmount?: number
  messageId?: string
  conversationId?: string
  quoteId?: string
  quoteAmount?: number
  requestId?: string
  requestTitle?: string
  userId?: string
  userName?: string
  userAvatar?: string
}

export interface NotificationTemplate {
  id: string
  name: string
  type: NotificationType
  title: string
  message: string
  channels: NotificationChannel[]
  priority: NotificationPriority
  isActive: boolean
  variables: string[]
  createdAt: string
  updatedAt: string
}

export interface NotificationSettings {
  id: string
  userId: string
  email: EmailNotificationSettings
  push: PushNotificationSettings
  sms: SmsNotificationSettings
  inApp: InAppNotificationSettings
  createdAt: string
  updatedAt: string
}

export interface EmailNotificationSettings {
  enabled: boolean
  projectUpdates: boolean
  paymentNotifications: boolean
  messageNotifications: boolean
  systemNotifications: boolean
  marketingEmails: boolean
  weeklyDigest: boolean
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly'
}

export interface PushNotificationSettings {
  enabled: boolean
  projectUpdates: boolean
  paymentNotifications: boolean
  messageNotifications: boolean
  systemNotifications: boolean
  sound: boolean
  vibration: boolean
  badge: boolean
  quietHours: {
    enabled: boolean
    start: string
    end: string
  }
}

export interface SmsNotificationSettings {
  enabled: boolean
  paymentNotifications: boolean
  securityAlerts: boolean
  twoFactorAuth: boolean
  emergencyAlerts: boolean
}

export interface InAppNotificationSettings {
  enabled: boolean
  showBadges: boolean
  showPopups: boolean
  autoMarkAsRead: boolean
  markAsReadDelay: number
  showPreview: boolean
}

export interface NotificationStats {
  totalNotifications: number
  unreadNotifications: number
  readNotifications: number
  archivedNotifications: number
  notificationsByType: Array<{
    type: NotificationType
    count: number
    percentage: number
  }>
  notificationsByChannel: Array<{
    channel: NotificationChannel
    count: number
    percentage: number
  }>
  deliveryStats: {
    delivered: number
    failed: number
    pending: number
    successRate: number
  }
  readStats: {
    totalRead: number
    averageReadTime: number
    readRate: number
  }
}

export interface NotificationFilters {
  type?: NotificationType[]
  priority?: NotificationPriority[]
  channels?: NotificationChannel[]
  isRead?: boolean
  isArchived?: boolean
  dateFrom?: string
  dateTo?: string
  search?: string
  sortBy?: NotificationSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface NotificationCreateData {
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: NotificationData
  priority?: NotificationPriority
  channels?: NotificationChannel[]
  scheduledAt?: string
  expiresAt?: string
}

export interface NotificationUpdateData {
  isRead?: boolean
  isArchived?: boolean
  readAt?: string
  archivedAt?: string
}

export interface NotificationSearchResult {
  notifications: Notification[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  unreadCount: number
}

export interface NotificationAnalytics {
  totalNotifications: number
  notificationsByType: Array<{
    type: NotificationType
    count: number
    percentage: number
    readRate: number
    averageReadTime: number
  }>
  notificationsByChannel: Array<{
    channel: NotificationChannel
    count: number
    percentage: number
    deliveryRate: number
    failureRate: number
  }>
  dailyTrends: Array<{
    date: string
    sent: number
    read: number
    archived: number
  }>
  userEngagement: Array<{
    userId: string
    userName: string
    totalNotifications: number
    readNotifications: number
    readRate: number
    averageReadTime: number
  }>
  deliveryPerformance: {
    totalSent: number
    delivered: number
    failed: number
    pending: number
    successRate: number
    averageDeliveryTime: number
  }
}

export interface NotificationBatch {
  id: string
  name: string
  description?: string
  notifications: NotificationCreateData[]
  status: BatchStatus
  progress: number
  processed: number
  failed: number
  total: number
  createdBy: string
  createdAt: string
  completedAt?: string
  failedAt?: string
  error?: string
}

export interface NotificationCampaign {
  id: string
  name: string
  description?: string
  template: NotificationTemplate
  targetUsers: string[]
  targetCriteria?: {
    roles?: string[]
    locations?: string[]
    preferences?: Record<string, any>
  }
  schedule: {
    type: 'immediate' | 'scheduled' | 'recurring'
    scheduledAt?: string
    recurring?: {
      frequency: 'daily' | 'weekly' | 'monthly'
      interval: number
      daysOfWeek?: number[]
      dayOfMonth?: number
    }
  }
  status: CampaignStatus
  progress: number
  sent: number
  delivered: number
  failed: number
  total: number
  createdBy: string
  createdAt: string
  startedAt?: string
  completedAt?: string
  failedAt?: string
  error?: string
}

// Enums
export enum NotificationType {
  PROJECT_CREATED = 'project_created',
  PROJECT_UPDATED = 'project_updated',
  PROJECT_COMPLETED = 'project_completed',
  PROJECT_CANCELLED = 'project_cancelled',
  PAYMENT_RECEIVED = 'payment_received',
  PAYMENT_FAILED = 'payment_failed',
  PAYMENT_REFUNDED = 'payment_refunded',
  MESSAGE_RECEIVED = 'message_received',
  MESSAGE_READ = 'message_read',
  QUOTE_RECEIVED = 'quote_received',
  QUOTE_ACCEPTED = 'quote_accepted',
  QUOTE_REJECTED = 'quote_rejected',
  QUOTE_EXPIRED = 'quote_expired',
  REQUEST_CREATED = 'request_created',
  REQUEST_UPDATED = 'request_updated',
  REQUEST_STATUS_CHANGED = 'request_status_changed',
  USER_REGISTERED = 'user_registered',
  USER_VERIFIED = 'user_verified',
  PASSWORD_CHANGED = 'password_changed',
  LOGIN_ALERT = 'login_alert',
  SYSTEM_MAINTENANCE = 'system_maintenance',
  SYSTEM_ERROR = 'system_error',
  SECURITY_ALERT = 'security_alert',
  MARKETING = 'marketing',
  ANNOUNCEMENT = 'announcement',
  REMINDER = 'reminder',
  DEADLINE_APPROACHING = 'deadline_approaching',
  DEADLINE_PASSED = 'deadline_passed',
  MILESTONE_ACHIEVED = 'milestone_achieved',
  REVIEW_REQUESTED = 'review_requested',
  REVIEW_RECEIVED = 'review_received'
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
  CRITICAL = 'critical'
}

export enum NotificationChannel {
  EMAIL = 'email',
  PUSH = 'push',
  SMS = 'sms',
  IN_APP = 'in_app',
  WEBHOOK = 'webhook'
}

export enum BatchStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum CampaignStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  PAUSED = 'paused'
}

export enum NotificationSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  SENT_AT = 'sentAt',
  READ_AT = 'readAt',
  TYPE = 'type',
  PRIORITY = 'priority',
  TITLE = 'title'
}
