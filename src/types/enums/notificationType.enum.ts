/**
 * Notification Type Enums
 * TypeScript enumeration for notification types
 */

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

export enum NotificationSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  SENT_AT = 'sentAt',
  READ_AT = 'readAt',
  TYPE = 'type',
  PRIORITY = 'priority',
  TITLE = 'title'
}
