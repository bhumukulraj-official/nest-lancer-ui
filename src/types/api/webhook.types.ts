/**
 * Webhook Event Types
 * TypeScript type definitions for webhook events and payloads
 */

// Base Webhook Event
export interface BaseWebhookEvent {
  id: string
  type: string
  version: string
  timestamp: string
  source: string
  data: any
  metadata?: Record<string, any>
}

// Authentication Webhook Events
export interface UserRegisteredEvent extends BaseWebhookEvent {
  type: 'user.registered'
  data: {
    userId: string
    email: string
    firstName: string
    lastName: string
    role: string
    registeredAt: string
  }
}

export interface UserLoginEvent extends BaseWebhookEvent {
  type: 'user.login'
  data: {
    userId: string
    email: string
    loginAt: string
    ipAddress: string
    userAgent: string
    location?: {
      country: string
      city: string
    }
  }
}

export interface UserLogoutEvent extends BaseWebhookEvent {
  type: 'user.logout'
  data: {
    userId: string
    email: string
    logoutAt: string
    sessionDuration: number
  }
}

export interface PasswordChangedEvent extends BaseWebhookEvent {
  type: 'user.password_changed'
  data: {
    userId: string
    email: string
    changedAt: string
    ipAddress: string
  }
}

export interface EmailVerifiedEvent extends BaseWebhookEvent {
  type: 'user.email_verified'
  data: {
    userId: string
    email: string
    verifiedAt: string
  }
}

// Project Webhook Events
export interface ProjectCreatedEvent extends BaseWebhookEvent {
  type: 'project.created'
  data: {
    projectId: string
    title: string
    clientId: string
    clientEmail: string
    budget: number
    currency: string
    createdAt: string
    createdBy: string
  }
}

export interface ProjectUpdatedEvent extends BaseWebhookEvent {
  type: 'project.updated'
  data: {
    projectId: string
    title: string
    changes: Record<string, any>
    updatedAt: string
    updatedBy: string
  }
}

export interface ProjectCompletedEvent extends BaseWebhookEvent {
  type: 'project.completed'
  data: {
    projectId: string
    title: string
    clientId: string
    completedAt: string
    duration: number
    finalBudget: number
  }
}

export interface ProjectCancelledEvent extends BaseWebhookEvent {
  type: 'project.cancelled'
  data: {
    projectId: string
    title: string
    clientId: string
    cancelledAt: string
    reason?: string
    cancelledBy: string
  }
}

// Request Webhook Events
export interface ServiceRequestCreatedEvent extends BaseWebhookEvent {
  type: 'request.created'
  data: {
    requestId: string
    title: string
    clientId: string
    clientEmail: string
    budget: number
    currency: string
    createdAt: string
  }
}

export interface ServiceRequestUpdatedEvent extends BaseWebhookEvent {
  type: 'request.updated'
  data: {
    requestId: string
    title: string
    changes: Record<string, any>
    updatedAt: string
    updatedBy: string
  }
}

export interface ServiceRequestStatusChangedEvent extends BaseWebhookEvent {
  type: 'request.status_changed'
  data: {
    requestId: string
    title: string
    oldStatus: string
    newStatus: string
    changedAt: string
    changedBy: string
    reason?: string
  }
}

// Quote Webhook Events
export interface QuoteCreatedEvent extends BaseWebhookEvent {
  type: 'quote.created'
  data: {
    quoteId: string
    serviceRequestId: string
    title: string
    amount: number
    currency: string
    clientId: string
    clientEmail: string
    createdAt: string
    validUntil: string
  }
}

export interface QuoteAcceptedEvent extends BaseWebhookEvent {
  type: 'quote.accepted'
  data: {
    quoteId: string
    serviceRequestId: string
    title: string
    amount: number
    currency: string
    clientId: string
    clientEmail: string
    acceptedAt: string
  }
}

export interface QuoteRejectedEvent extends BaseWebhookEvent {
  type: 'quote.rejected'
  data: {
    quoteId: string
    serviceRequestId: string
    title: string
    amount: number
    currency: string
    clientId: string
    clientEmail: string
    rejectedAt: string
    reason?: string
  }
}

export interface QuoteExpiredEvent extends BaseWebhookEvent {
  type: 'quote.expired'
  data: {
    quoteId: string
    serviceRequestId: string
    title: string
    amount: number
    currency: string
    clientId: string
    clientEmail: string
    expiredAt: string
    validUntil: string
  }
}

// Payment Webhook Events
export interface PaymentInitiatedEvent extends BaseWebhookEvent {
  type: 'payment.initiated'
  data: {
    paymentId: string
    orderId: string
    amount: number
    currency: string
    clientId: string
    clientEmail: string
    projectId?: string
    projectTitle?: string
    initiatedAt: string
    razorpayOrderId: string
  }
}

export interface PaymentCompletedEvent extends BaseWebhookEvent {
  type: 'payment.completed'
  data: {
    paymentId: string
    orderId: string
    amount: number
    currency: string
    clientId: string
    clientEmail: string
    projectId?: string
    projectTitle?: string
    completedAt: string
    razorpayPaymentId: string
    razorpayOrderId: string
    method: string
  }
}

export interface PaymentFailedEvent extends BaseWebhookEvent {
  type: 'payment.failed'
  data: {
    paymentId: string
    orderId: string
    amount: number
    currency: string
    clientId: string
    clientEmail: string
    projectId?: string
    projectTitle?: string
    failedAt: string
    error: string
    razorpayOrderId: string
  }
}

export interface PaymentRefundedEvent extends BaseWebhookEvent {
  type: 'payment.refunded'
  data: {
    paymentId: string
    orderId: string
    refundAmount: number
    currency: string
    clientId: string
    clientEmail: string
    projectId?: string
    projectTitle?: string
    refundedAt: string
    reason: string
    razorpayRefundId: string
  }
}

// Messaging Webhook Events
export interface MessageSentEvent extends BaseWebhookEvent {
  type: 'message.sent'
  data: {
    messageId: string
    conversationId: string
    senderId: string
    senderName: string
    content: string
    type: string
    sentAt: string
    recipientIds: string[]
  }
}

export interface MessageReadEvent extends BaseWebhookEvent {
  type: 'message.read'
  data: {
    messageId: string
    conversationId: string
    readerId: string
    readerName: string
    readAt: string
  }
}

export interface ConversationCreatedEvent extends BaseWebhookEvent {
  type: 'conversation.created'
  data: {
    conversationId: string
    participants: Array<{
      id: string
      name: string
      email: string
      role: string
    }>
    createdAt: string
    createdBy: string
  }
}

// Notification Webhook Events
export interface NotificationSentEvent extends BaseWebhookEvent {
  type: 'notification.sent'
  data: {
    notificationId: string
    userId: string
    type: string
    title: string
    message: string
    sentAt: string
    channels: string[]
  }
}

export interface NotificationReadEvent extends BaseWebhookEvent {
  type: 'notification.read'
  data: {
    notificationId: string
    userId: string
    readAt: string
  }
}

// Media Webhook Events
export interface MediaUploadedEvent extends BaseWebhookEvent {
  type: 'media.uploaded'
  data: {
    mediaId: string
    filename: string
    url: string
    size: number
    mimeType: string
    uploadedBy: string
    uploadedAt: string
    category: string
  }
}

export interface MediaDeletedEvent extends BaseWebhookEvent {
  type: 'media.deleted'
  data: {
    mediaId: string
    filename: string
    deletedBy: string
    deletedAt: string
    reason?: string
  }
}

// Blog Webhook Events
export interface BlogPostPublishedEvent extends BaseWebhookEvent {
  type: 'blog.published'
  data: {
    postId: string
    title: string
    authorId: string
    authorName: string
    publishedAt: string
    tags: string[]
    category: string
  }
}

export interface BlogPostUpdatedEvent extends BaseWebhookEvent {
  type: 'blog.updated'
  data: {
    postId: string
    title: string
    authorId: string
    authorName: string
    updatedAt: string
    changes: Record<string, any>
  }
}

// Contact Webhook Events
export interface ContactFormSubmittedEvent extends BaseWebhookEvent {
  type: 'contact.submitted'
  data: {
    contactId: string
    name: string
    email: string
    subject: string
    message: string
    submittedAt: string
    ipAddress: string
  }
}

// Admin Webhook Events
export interface AdminActionEvent extends BaseWebhookEvent {
  type: 'admin.action'
  data: {
    adminId: string
    adminName: string
    action: string
    targetType: string
    targetId: string
    performedAt: string
    details?: Record<string, any>
  }
}

export interface SystemMaintenanceEvent extends BaseWebhookEvent {
  type: 'system.maintenance'
  data: {
    type: 'started' | 'completed' | 'scheduled'
    message: string
    scheduledAt?: string
    startedAt?: string
    completedAt?: string
    duration?: number
  }
}

export interface SystemErrorEvent extends BaseWebhookEvent {
  type: 'system.error'
  data: {
    error: string
    message: string
    stack?: string
    occurredAt: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    context?: Record<string, any>
  }
}

// Webhook Configuration
export interface WebhookConfig {
  id: string
  name: string
  url: string
  events: string[]
  secret: string
  isActive: boolean
  retryPolicy: {
    maxRetries: number
    retryDelay: number
    backoffMultiplier: number
  }
  headers?: Record<string, string>
  timeout: number
  createdAt: string
  updatedAt: string
}

export interface WebhookDelivery {
  id: string
  webhookId: string
  eventId: string
  url: string
  status: 'pending' | 'delivered' | 'failed' | 'retrying'
  attempts: number
  maxAttempts: number
  lastAttemptAt?: string
  nextAttemptAt?: string
  deliveredAt?: string
  failedAt?: string
  response?: {
    status: number
    headers: Record<string, string>
    body: string
  }
  error?: string
  createdAt: string
  updatedAt: string
}

// Webhook Event Types Union
export type WebhookEvent = 
  | UserRegisteredEvent
  | UserLoginEvent
  | UserLogoutEvent
  | PasswordChangedEvent
  | EmailVerifiedEvent
  | ProjectCreatedEvent
  | ProjectUpdatedEvent
  | ProjectCompletedEvent
  | ProjectCancelledEvent
  | ServiceRequestCreatedEvent
  | ServiceRequestUpdatedEvent
  | ServiceRequestStatusChangedEvent
  | QuoteCreatedEvent
  | QuoteAcceptedEvent
  | QuoteRejectedEvent
  | QuoteExpiredEvent
  | PaymentInitiatedEvent
  | PaymentCompletedEvent
  | PaymentFailedEvent
  | PaymentRefundedEvent
  | MessageSentEvent
  | MessageReadEvent
  | ConversationCreatedEvent
  | NotificationSentEvent
  | NotificationReadEvent
  | MediaUploadedEvent
  | MediaDeletedEvent
  | BlogPostPublishedEvent
  | BlogPostUpdatedEvent
  | ContactFormSubmittedEvent
  | AdminActionEvent
  | SystemMaintenanceEvent
  | SystemErrorEvent

// Webhook Event Types Enum
export enum WebhookEventType {
  // User Events
  USER_REGISTERED = 'user.registered',
  USER_LOGIN = 'user.login',
  USER_LOGOUT = 'user.logout',
  PASSWORD_CHANGED = 'user.password_changed',
  EMAIL_VERIFIED = 'user.email_verified',
  
  // Project Events
  PROJECT_CREATED = 'project.created',
  PROJECT_UPDATED = 'project.updated',
  PROJECT_COMPLETED = 'project.completed',
  PROJECT_CANCELLED = 'project.cancelled',
  
  // Request Events
  REQUEST_CREATED = 'request.created',
  REQUEST_UPDATED = 'request.updated',
  REQUEST_STATUS_CHANGED = 'request.status_changed',
  
  // Quote Events
  QUOTE_CREATED = 'quote.created',
  QUOTE_ACCEPTED = 'quote.accepted',
  QUOTE_REJECTED = 'quote.rejected',
  QUOTE_EXPIRED = 'quote.expired',
  
  // Payment Events
  PAYMENT_INITIATED = 'payment.initiated',
  PAYMENT_COMPLETED = 'payment.completed',
  PAYMENT_FAILED = 'payment.failed',
  PAYMENT_REFUNDED = 'payment.refunded',
  
  // Messaging Events
  MESSAGE_SENT = 'message.sent',
  MESSAGE_READ = 'message.read',
  CONVERSATION_CREATED = 'conversation.created',
  
  // Notification Events
  NOTIFICATION_SENT = 'notification.sent',
  NOTIFICATION_READ = 'notification.read',
  
  // Media Events
  MEDIA_UPLOADED = 'media.uploaded',
  MEDIA_DELETED = 'media.deleted',
  
  // Blog Events
  BLOG_PUBLISHED = 'blog.published',
  BLOG_UPDATED = 'blog.updated',
  
  // Contact Events
  CONTACT_SUBMITTED = 'contact.submitted',
  
  // Admin Events
  ADMIN_ACTION = 'admin.action',
  
  // System Events
  SYSTEM_MAINTENANCE = 'system.maintenance',
  SYSTEM_ERROR = 'system.error'
}
