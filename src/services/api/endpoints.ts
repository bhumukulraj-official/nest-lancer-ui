/**
 * API Endpoints
 * Centralized API endpoint definitions for all backend services
 * All endpoints are read-only constants - backend handles all routing
 */

// Base API paths
const API_VERSION = '/api/v1'

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_VERSION}/auth/login`,
  REGISTER: `${API_VERSION}/auth/register`,
  LOGOUT: `${API_VERSION}/auth/logout`,
  REFRESH: `${API_VERSION}/auth/refresh`,
  FORGOT_PASSWORD: `${API_VERSION}/auth/forgot-password`,
  RESET_PASSWORD: `${API_VERSION}/auth/reset-password`,
  VERIFY_EMAIL: `${API_VERSION}/auth/verify-email`,
  RESEND_VERIFICATION: `${API_VERSION}/auth/resend-verification`,
  ME: `${API_VERSION}/auth/me`,
} as const

// User Management Endpoints
export const USER_ENDPOINTS = {
  // Base endpoints
  BASE: `${API_VERSION}/users`,
  LIST: `${API_VERSION}/users`,
  CREATE: `${API_VERSION}/users`,
  ME: `${API_VERSION}/users/me`,
  SEARCH: `${API_VERSION}/users/search`,
  EXPORT: `${API_VERSION}/users/export`,
  BULK_UPDATE: `${API_VERSION}/users/bulk-update`,

  // Profile endpoints
  PROFILE: `${API_VERSION}/users/profile`,
  UPDATE_PROFILE: `${API_VERSION}/users/profile`,
  PROFILE_COMPLETION: `${API_VERSION}/users/profile/completion`,
  PROFILE_VISIBILITY: `${API_VERSION}/users/profile/visibility`,

  // Profile sections
  SOCIAL_LINKS: `${API_VERSION}/users/profile/social-links`,
  SKILLS: `${API_VERSION}/users/profile/skills`,
  EXPERIENCE: `${API_VERSION}/users/profile/experience`,
  EDUCATION: `${API_VERSION}/users/profile/education`,
  CERTIFICATIONS: `${API_VERSION}/users/profile/certifications`,
  PORTFOLIO: `${API_VERSION}/users/profile/portfolio`,
  TESTIMONIALS: `${API_VERSION}/users/profile/testimonials`,

  // Avatar endpoints
  UPLOAD_AVATAR: `${API_VERSION}/users/avatar`,
  DELETE_AVATAR: `${API_VERSION}/users/avatar`,
  AVATAR_UPLOAD: `${API_VERSION}/users/avatar`,
  AVATAR_DELETE: `${API_VERSION}/users/avatar`,

  // Settings endpoints
  SETTINGS: `${API_VERSION}/users/settings`,
  PREFERENCES: `${API_VERSION}/users/preferences`,
  NOTIFICATION_SETTINGS: `${API_VERSION}/users/notification-settings`,
  SECURITY_SETTINGS: `${API_VERSION}/users/security-settings`,
  PRIVACY_SETTINGS: `${API_VERSION}/users/privacy-settings`,

  // Account endpoints
  UPDATE_PASSWORD: `${API_VERSION}/users/password`,
  DELETE_ACCOUNT: `${API_VERSION}/users/account`,
} as const

// Project Endpoints
export const PROJECT_ENDPOINTS = {
  LIST: `${API_VERSION}/projects`,
  CREATE: `${API_VERSION}/projects`,
  DETAIL: (id: string) => `${API_VERSION}/projects/${id}`,
  UPDATE: (id: string) => `${API_VERSION}/projects/${id}`,
  DELETE: (id: string) => `${API_VERSION}/projects/${id}`,
  RESTORE: (id: string) => `${API_VERSION}/projects/${id}/restore`,
  GALLERY: (id: string) => `${API_VERSION}/projects/${id}/gallery`,
  TESTIMONIALS: (id: string) => `${API_VERSION}/projects/${id}/testimonials`,
  TECH_STACK: (id: string) => `${API_VERSION}/projects/${id}/tech-stack`,
  FEATURED: `${API_VERSION}/projects/featured`,
  SEARCH: `${API_VERSION}/projects/search`,
  CATEGORIES: `${API_VERSION}/projects/categories`,
} as const

// Request Endpoints
export const REQUEST_ENDPOINTS = {
  // Base endpoints
  BASE: `${API_VERSION}/requests`,
  LIST: `${API_VERSION}/requests`,
  CREATE: `${API_VERSION}/requests`,
  DETAIL: (id: string) => `${API_VERSION}/requests/${id}`,
  UPDATE: (id: string) => `${API_VERSION}/requests/${id}`,
  DELETE: (id: string) => `${API_VERSION}/requests/${id}`,
  STATUS: (id: string) => `${API_VERSION}/requests/${id}/status`,
  RESPONSES: (id: string) => `${API_VERSION}/requests/${id}/responses`,
  ATTACHMENTS: (id: string) => `${API_VERSION}/requests/${id}/attachments`,
  TRACKING: (id: string) => `${API_VERSION}/requests/${id}/tracking`,

  // Additional endpoints
  STATS: `${API_VERSION}/requests/stats`,
  ANALYTICS: `${API_VERSION}/requests/analytics`,
  SEARCH: `${API_VERSION}/requests/search`,
  BULK_UPDATE: `${API_VERSION}/requests/bulk-update`,
  EXPORT: `${API_VERSION}/requests/export`,
  USER: (userId: string) => `${API_VERSION}/requests/user/${userId}`,
  ASSIGNED: (assigneeId: string) => `${API_VERSION}/requests/assigned/${assigneeId}`,
} as const

// Quote Endpoints
export const QUOTE_ENDPOINTS = {
  // Base endpoints
  BASE: `${API_VERSION}/quotes`,
  LIST: `${API_VERSION}/quotes`,
  CREATE: `${API_VERSION}/quotes`,
  DETAIL: (id: string) => `${API_VERSION}/quotes/${id}`,
  UPDATE: (id: string) => `${API_VERSION}/quotes/${id}`,
  DELETE: (id: string) => `${API_VERSION}/quotes/${id}`,
  ACCEPT: (id: string) => `${API_VERSION}/quotes/${id}/accept`,
  REJECT: (id: string) => `${API_VERSION}/quotes/${id}/reject`,
  STATUS: (id: string) => `${API_VERSION}/quotes/${id}/status`,
  TERMS: (id: string) => `${API_VERSION}/quotes/${id}/terms`,

  // Additional endpoints
  STATS: `${API_VERSION}/quotes/stats`,
  ANALYTICS: `${API_VERSION}/quotes/analytics`,
  SEARCH: `${API_VERSION}/quotes/search`,
  BULK_UPDATE: `${API_VERSION}/quotes/bulk-update`,
  EXPORT: `${API_VERSION}/quotes/export`,
  BY_REQUEST: (requestId: string) => `${API_VERSION}/quotes/request/${requestId}`,
  BY_USER: (userId: string) => `${API_VERSION}/quotes/user/${userId}`,
} as const

// Payment Endpoints
export const PAYMENT_ENDPOINTS = {
  CREATE_ORDER: `${API_VERSION}/payments/orders`,
  VERIFY_PAYMENT: `${API_VERSION}/payments/verify`,
  LIST: `${API_VERSION}/payments`,
  DETAIL: (id: string) => `${API_VERSION}/payments/${id}`,
  REFUND: (id: string) => `${API_VERSION}/payments/${id}/refund`,
  RECEIPT: (id: string) => `${API_VERSION}/payments/${id}/receipt`,
  METHODS: `${API_VERSION}/payments/methods`,
  ADD_METHOD: `${API_VERSION}/payments/methods`,
  DELETE_METHOD: (id: string) => `${API_VERSION}/payments/methods/${id}`,
  HISTORY: `${API_VERSION}/payments/history`,
} as const

// Progress & Milestone Endpoints
export const PROGRESS_ENDPOINTS = {
  // Base endpoints
  BASE: `${API_VERSION}/progress`,
  LIST: `${API_VERSION}/progress`,
  CREATE: `${API_VERSION}/progress`,
  DETAIL: (id: string) => `${API_VERSION}/progress/${id}`,
  UPDATE: (id: string) => `${API_VERSION}/progress/${id}`,
  DELETE: (id: string) => `${API_VERSION}/progress/${id}`,
  STATUS: (id: string) => `${API_VERSION}/progress/${id}/status`,

  // Project-specific endpoints
  PROJECT_PROGRESS: (projectId: string) => `${API_VERSION}/projects/${projectId}/progress`,
  BY_PROJECT: (projectId: string) => `${API_VERSION}/progress/project/${projectId}`,
  BY_USER: (userId: string) => `${API_VERSION}/progress/user/${userId}`,

  // Milestone endpoints
  MILESTONES: (progressId: string) => `${API_VERSION}/progress/${progressId}/milestones`,
  MILESTONE_DETAIL: (progressId: string, milestoneId: string) =>
    `${API_VERSION}/progress/${progressId}/milestones/${milestoneId}`,
  UPDATE_MILESTONE: (progressId: string, milestoneId: string) =>
    `${API_VERSION}/progress/${progressId}/milestones/${milestoneId}`,
  MILESTONE_STATUS: (progressId: string, milestoneId: string) =>
    `${API_VERSION}/progress/${progressId}/milestones/${milestoneId}/status`,
  COMPLETE_MILESTONE: (progressId: string, milestoneId: string) =>
    `${API_VERSION}/progress/${progressId}/milestones/${milestoneId}/complete`,

  // Update endpoints
  UPDATES: (progressId: string) => `${API_VERSION}/progress/${progressId}/updates`,
  UPDATE_DETAIL: (progressId: string, updateId: string) =>
    `${API_VERSION}/progress/${progressId}/updates/${updateId}`,

  // Timeline and reporting
  TIMELINE: (progressId: string) => `${API_VERSION}/progress/${progressId}/timeline`,
  REPORT: (progressId: string) => `${API_VERSION}/progress/${progressId}/report`,
  REPORT_PDF: (progressId: string) => `${API_VERSION}/progress/${progressId}/report/pdf`,

  // Comments and attachments
  COMMENTS: (progressId: string) => `${API_VERSION}/progress/${progressId}/comments`,
  COMMENT_DETAIL: (progressId: string, commentId: string) =>
    `${API_VERSION}/progress/${progressId}/comments/${commentId}`,
  ATTACHMENTS: (progressId: string) => `${API_VERSION}/progress/${progressId}/attachments`,
  ATTACHMENT_DETAIL: (progressId: string, attachmentId: string) =>
    `${API_VERSION}/progress/${progressId}/attachments/${attachmentId}`,

  // Analytics and stats
  STATS: `${API_VERSION}/progress/stats`,
  ANALYTICS: `${API_VERSION}/progress/analytics`,
  SEARCH: `${API_VERSION}/progress/search`,

  // Bulk operations and export
  BULK_UPDATE: `${API_VERSION}/progress/bulk-update`,
  EXPORT: `${API_VERSION}/progress/export`,
} as const

// Media Management Endpoints
export const MEDIA_ENDPOINTS = {
  // Base endpoints
  BASE: `${API_VERSION}/media`,
  UPLOAD: `${API_VERSION}/media/upload`,
  LIST: `${API_VERSION}/media`,
  DETAIL: (id: string) => `${API_VERSION}/media/${id}`,
  UPDATE: (id: string) => `${API_VERSION}/media/${id}`,
  DELETE: (id: string) => `${API_VERSION}/media/${id}`,

  // Gallery and organization
  GALLERY: `${API_VERSION}/media/gallery`,
  OPTIMIZE: `${API_VERSION}/media/optimize`,
  METADATA: (id: string) => `${API_VERSION}/media/${id}/metadata`,

  // Status and visibility
  STATUS: (id: string) => `${API_VERSION}/media/${id}/status`,
  VISIBILITY: (id: string) => `${API_VERSION}/media/${id}/visibility`,

  // Tags and categories
  TAGS: (id: string) => `${API_VERSION}/media/${id}/tags`,
  CATEGORY: (id: string) => `${API_VERSION}/media/${id}/category`,

  // Downloads and thumbnails
  DOWNLOAD_URL: (id: string) => `${API_VERSION}/media/${id}/download-url`,
  THUMBNAIL_URL: (id: string) => `${API_VERSION}/media/${id}/thumbnail-url`,

  // Transformations and processing
  TRANSFORMATIONS: (id: string) => `${API_VERSION}/media/${id}/transformations`,
  PROCESSING_STATUS: (id: string) => `${API_VERSION}/media/${id}/processing-status`,
  ANALYTICS: (id: string) => `${API_VERSION}/media/${id}/analytics`,

  // Bulk operations
  BULK_UPLOAD: `${API_VERSION}/media/bulk-upload`,
  BULK_UPDATE: `${API_VERSION}/media/bulk-update`,
  BULK_DELETE: `${API_VERSION}/media/bulk-delete`,

  // Search and filtering
  STATS: `${API_VERSION}/media/stats`,
  SEARCH: `${API_VERSION}/media/search`,
  BY_CATEGORY: (category: string) => `${API_VERSION}/media/category/${category}`,
  BY_USER: (userId: string) => `${API_VERSION}/media/user/${userId}`,
  BY_PROJECT: (projectId: string) => `${API_VERSION}/media/project/${projectId}`,

  // Export and maintenance
  EXPORT: `${API_VERSION}/media/export`,
  STORAGE_USAGE: `${API_VERSION}/media/storage-usage`,
  CLEANUP: `${API_VERSION}/media/cleanup`,
} as const

// Messaging Endpoints
export const MESSAGE_ENDPOINTS = {
  CONVERSATIONS: `${API_VERSION}/messages/conversations`,
  CONVERSATION_DETAIL: (id: string) => `${API_VERSION}/messages/conversations/${id}`,
  SEND_MESSAGE: (conversationId: string) => `${API_VERSION}/messages/conversations/${conversationId}/messages`,
  MESSAGES: (conversationId: string) => `${API_VERSION}/messages/conversations/${conversationId}/messages`,
  MARK_READ: (conversationId: string) => `${API_VERSION}/messages/conversations/${conversationId}/read`,
  TYPING: (conversationId: string) => `${API_VERSION}/messages/conversations/${conversationId}/typing`,
} as const

// Notification Endpoints
export const NOTIFICATION_ENDPOINTS = {
  // Base endpoints
  BASE: `${API_VERSION}/notifications`,
  LIST: `${API_VERSION}/notifications`,
  CREATE: `${API_VERSION}/notifications`,
  DETAIL: (id: string) => `${API_VERSION}/notifications/${id}`,
  UPDATE: (id: string) => `${API_VERSION}/notifications/${id}`,
  DELETE: (id: string) => `${API_VERSION}/notifications/${id}`,

  // Status endpoints
  UNREAD_COUNT: `${API_VERSION}/notifications/count`,
  MARK_READ: (id: string) => `${API_VERSION}/notifications/${id}/read`,
  MARK_ALL_READ: `${API_VERSION}/notifications/read-all`,
  MARK_ALL_UNREAD: `${API_VERSION}/notifications/read-all`,
  STATUS: (id: string) => `${API_VERSION}/notifications/${id}/status`,
  PRIORITY: (id: string) => `${API_VERSION}/notifications/${id}/priority`,

  // User-specific endpoints
  USER_NOTIFICATIONS: (userId: string) => `${API_VERSION}/notifications/user/${userId}`,

  // Analytics and stats
  STATS: `${API_VERSION}/notifications/stats`,
  ANALYTICS: `${API_VERSION}/notifications/analytics`,
  SEARCH: `${API_VERSION}/notifications/search`,

  // Templates
  TEMPLATES: `${API_VERSION}/notifications/templates`,
  TEMPLATE_DETAIL: (id: string) => `${API_VERSION}/notifications/templates/${id}`,

  // Scheduling
  SCHEDULE: `${API_VERSION}/notifications/schedule`,
  CANCEL: (id: string) => `${API_VERSION}/notifications/${id}/cancel`,

  // Settings and preferences
  SETTINGS: `${API_VERSION}/notifications/settings`,
  PREFERENCES: `${API_VERSION}/notifications/preferences`,

  // Delivery and testing
  TEST_DELIVERY: `${API_VERSION}/notifications/test-delivery`,
  DELIVERY_STATUS: (id: string) => `${API_VERSION}/notifications/${id}/delivery-status`,
  READ_RECEIPTS: (id: string) => `${API_VERSION}/notifications/${id}/read-receipts`,

  // Bulk operations
  BULK_UPDATE: `${API_VERSION}/notifications/bulk-update`,
  BULK_DELETE: `${API_VERSION}/notifications/bulk-delete`,

  // Export and maintenance
  EXPORT: `${API_VERSION}/notifications/export`,
  CLEAR_OLD: `${API_VERSION}/notifications/clear-old`,
} as const

// Portfolio Endpoints
export const PORTFOLIO_ENDPOINTS = {
  OVERVIEW: `${API_VERSION}/portfolio`,
  FEATURED_PROJECTS: `${API_VERSION}/portfolio/featured`,
  STATS: `${API_VERSION}/portfolio/stats`,
  TECH_STACK: `${API_VERSION}/portfolio/tech-stack`,
  TESTIMONIALS: `${API_VERSION}/portfolio/testimonials`,
  ACHIEVEMENTS: `${API_VERSION}/portfolio/achievements`,
} as const

// Blog Endpoints
export const BLOG_ENDPOINTS = {
  // Base endpoints
  BASE: `${API_VERSION}/blog/posts`,
  LIST: `${API_VERSION}/blog/posts`,
  DETAIL: (slug: string) => `${API_VERSION}/blog/posts/${slug}`,
  CREATE: `${API_VERSION}/blog/posts`,
  UPDATE: (id: string) => `${API_VERSION}/blog/posts/${id}`,
  DELETE: (id: string) => `${API_VERSION}/blog/posts/${id}`,

  // Status and publishing
  STATUS: (id: string) => `${API_VERSION}/blog/posts/${id}/status`,
  PUBLISH: (id: string) => `${API_VERSION}/blog/posts/${id}/publish`,
  UNPUBLISH: (id: string) => `${API_VERSION}/blog/posts/${id}/unpublish`,

  // Comments
  COMMENTS: (postId: string) => `${API_VERSION}/blog/posts/${postId}/comments`,
  COMMENT_DETAIL: (postId: string, commentId: string) =>
    `${API_VERSION}/blog/posts/${postId}/comments/${commentId}`,

  // Social features
  LIKE: (id: string) => `${API_VERSION}/blog/posts/${id}/like`,
  SHARE: (id: string) => `${API_VERSION}/blog/posts/${id}/share`,

  // Tags and categories
  TAGS: `${API_VERSION}/blog/tags`,
  CATEGORIES: `${API_VERSION}/blog/categories`,
  TAG_DETAIL: (tagId: string) => `${API_VERSION}/blog/tags/${tagId}`,
  CATEGORY_DETAIL: (categoryId: string) => `${API_VERSION}/blog/categories/${categoryId}`,

  // SEO and metadata
  SEO: (id: string) => `${API_VERSION}/blog/posts/${id}/seo`,

  // Media
  MEDIA: (id: string) => `${API_VERSION}/blog/posts/${id}/media`,
  MEDIA_DETAIL: (id: string, mediaId: string) =>
    `${API_VERSION}/blog/posts/${id}/media/${mediaId}`,

  // Analytics
  ANALYTICS: (id: string) => `${API_VERSION}/blog/posts/${id}/analytics`,

  // Search and filtering
  STATS: `${API_VERSION}/blog/stats`,
  SEARCH: `${API_VERSION}/blog/search`,
  BY_CATEGORY: (category: string) => `${API_VERSION}/blog/category/${category}`,
  BY_TAG: (tag: string) => `${API_VERSION}/blog/tag/${tag}`,
  BY_AUTHOR: (authorId: string) => `${API_VERSION}/blog/author/${authorId}`,
  RELATED: (id: string) => `${API_VERSION}/blog/posts/${id}/related`,

  // Series
  SERIES: `${API_VERSION}/blog/series`,
  SERIES_DETAIL: (seriesId: string) => `${API_VERSION}/blog/series/${seriesId}`,

  // Templates
  TEMPLATES: `${API_VERSION}/blog/templates`,
  TEMPLATE_DETAIL: (templateId: string) => `${API_VERSION}/blog/templates/${templateId}`,

  // Content management
  DUPLICATE: (id: string) => `${API_VERSION}/blog/posts/${id}/duplicate`,
  PDF: (id: string) => `${API_VERSION}/blog/posts/${id}/pdf`,

  // Bulk operations and export
  BULK_UPDATE: `${API_VERSION}/blog/posts/bulk-update`,
  BULK_DELETE: `${API_VERSION}/blog/posts/bulk-delete`,
  EXPORT: `${API_VERSION}/blog/export`,
} as const

// Contact Endpoints
export const CONTACT_ENDPOINTS = {
  SUBMIT: `${API_VERSION}/contact`,
  LIST: `${API_VERSION}/contact/messages`,
  DETAIL: (id: string) => `${API_VERSION}/contact/messages/${id}`,
  REPLY: (id: string) => `${API_VERSION}/contact/messages/${id}/reply`,
  UNREAD_COUNT: `${API_VERSION}/contact/messages/count`,

  // Messages management
  MESSAGES: `${API_VERSION}/contact/messages`,
  CREATE: `${API_VERSION}/contact/messages`,
  UPDATE: (id: string) => `${API_VERSION}/contact/messages/${id}`,
  DELETE: (id: string) => `${API_VERSION}/contact/messages/${id}`,
  STATUS: (id: string) => `${API_VERSION}/contact/messages/${id}/status`,
  PRIORITY: (id: string) => `${API_VERSION}/contact/messages/${id}/priority`,
  CATEGORY: (id: string) => `${API_VERSION}/contact/messages/${id}/category`,
  ASSIGN: (id: string) => `${API_VERSION}/contact/messages/${id}/assign`,
  UNASSIGN: (id: string) => `${API_VERSION}/contact/messages/${id}/unassign`,

  // Responses and communication
  RESPONSES: (id: string) => `${API_VERSION}/contact/messages/${id}/responses`,
  RESPONSE_DETAIL: (id: string, responseId: string) =>
    `${API_VERSION}/contact/messages/${id}/responses/${responseId}`,

  // Read status
  READ: (id: string) => `${API_VERSION}/contact/messages/${id}/read`,
  UNREAD: (id: string) => `${API_VERSION}/contact/messages/${id}/unread`,
  MARK_ALL_READ: `${API_VERSION}/contact/messages/mark-all-read`,

  // Attachments
  ATTACHMENTS: (id: string) => `${API_VERSION}/contact/messages/${id}/attachments`,
  ATTACHMENT_DETAIL: (id: string, attachmentId: string) =>
    `${API_VERSION}/contact/messages/${id}/attachments/${attachmentId}`,

  // Analytics and stats
  STATS: `${API_VERSION}/contact/stats`,
  ANALYTICS: `${API_VERSION}/contact/analytics`,
  SEARCH: `${API_VERSION}/contact/search`,

  // Forms management
  FORMS: `${API_VERSION}/contact/forms`,
  FORM_DETAIL: (id: string) => `${API_VERSION}/contact/forms/${id}`,
  FORM_SUBMIT: (formId: string) => `${API_VERSION}/contact/forms/${formId}/submit`,
  FORM_SUBMISSIONS: (formId: string) => `${API_VERSION}/contact/forms/${formId}/submissions`,
  FORM_ANALYTICS: (formId: string) => `${API_VERSION}/contact/forms/${formId}/analytics`,

  // Settings and configuration
  SETTINGS: `${API_VERSION}/contact/settings`,

  // Templates
  TEMPLATES: `${API_VERSION}/contact/templates`,
  TEMPLATE_DETAIL: (templateId: string) => `${API_VERSION}/contact/templates/${templateId}`,

  // Bulk operations and export
  BULK_UPDATE: `${API_VERSION}/contact/messages/bulk-update`,
  BULK_DELETE: `${API_VERSION}/contact/messages/bulk-delete`,
  EXPORT: `${API_VERSION}/contact/export`,
} as const

// Admin Endpoints
export const ADMIN_ENDPOINTS = {
  DASHBOARD: `${API_VERSION}/admin/dashboard`,
  STATS: `${API_VERSION}/admin/stats`,
  METRICS: `${API_VERSION}/admin/metrics`,
  SYSTEM_INFO: `${API_VERSION}/admin/system/info`,
  SYSTEM_METRICS: `${API_VERSION}/admin/system/metrics`,
  HEALTH_CHECK: `${API_VERSION}/admin/system/health`,

  // User Management
  USERS: `${API_VERSION}/admin/users`,
  USER_MANAGEMENT: `${API_VERSION}/admin/users/management`,
  USER_DETAIL: (id: string) => `${API_VERSION}/admin/users/${id}`,
  UPDATE_USER: (id: string) => `${API_VERSION}/admin/users/${id}`,
  USER_STATUS: (id: string) => `${API_VERSION}/admin/users/${id}/status`,
  BULK_USER_ACTIONS: `${API_VERSION}/admin/users/bulk`,

  // Project Management
  PROJECT_MANAGEMENT: `${API_VERSION}/admin/projects/management`,

  // Request Management
  REQUEST_MANAGEMENT: `${API_VERSION}/admin/requests/management`,

  // Quote Management
  QUOTE_MANAGEMENT: `${API_VERSION}/admin/quotes/management`,

  // Payment Management
  PAYMENT_MANAGEMENT: `${API_VERSION}/admin/payments/management`,

  // Media Management
  MEDIA_MANAGEMENT: `${API_VERSION}/admin/media/management`,

  // Blog Management
  BLOG_MANAGEMENT: `${API_VERSION}/admin/blog/management`,

  // Contact Management
  CONTACT_MANAGEMENT: `${API_VERSION}/admin/contacts/management`,

  // Notification Management
  NOTIFICATION_MANAGEMENT: `${API_VERSION}/admin/notifications/management`,

  // Analytics
  USER_ANALYTICS: `${API_VERSION}/admin/analytics/users`,
  REQUEST_ANALYTICS: `${API_VERSION}/admin/analytics/requests`,
  PAYMENT_ANALYTICS: `${API_VERSION}/admin/analytics/payments`,
  QUOTE_ANALYTICS: `${API_VERSION}/admin/analytics/quotes`,
  RATE_LIMIT_ANALYTICS: `${API_VERSION}/admin/analytics/rate-limits`,
  ANALYTICS: `${API_VERSION}/admin/analytics`,

  // System Administration
  SYSTEM_CONFIG: `${API_VERSION}/admin/system/config`,
  SYSTEM_SETTINGS: `${API_VERSION}/admin/system/settings`,
  API_KEYS: `${API_VERSION}/admin/system/api-keys`,
  ENVIRONMENT: `${API_VERSION}/admin/system/environment`,

  // Audit Logs
  AUDIT_LOGS: `${API_VERSION}/admin/audit/logs`,
  AUDIT_EXPORT: `${API_VERSION}/admin/audit/export`,

  // Webhook Management
  WEBHOOKS: `${API_VERSION}/admin/webhooks`,
  WEBHOOK_LOGS: `${API_VERSION}/admin/webhooks/logs`,
  WEBHOOK_CONFIGS: `${API_VERSION}/admin/webhooks/configs`,
  WEBHOOK_RETRY: (id: string) => `${API_VERSION}/admin/webhooks/${id}/retry`,

  // Reports
  REPORTS: `${API_VERSION}/admin/reports`,

  // Backups
  BACKUPS: `${API_VERSION}/admin/backups`,

  // Maintenance
  MAINTENANCE: `${API_VERSION}/admin/maintenance`,

  // System Operations
  CLEAR_CACHE: `${API_VERSION}/admin/system/clear-cache`,
  RESTART_SERVICES: `${API_VERSION}/admin/system/restart-services`,
  SYSTEM_LOGS: `${API_VERSION}/admin/system/logs`,
  SYSTEM_LOGS_DOWNLOAD: `${API_VERSION}/admin/system/logs/download`,

  // API Management
  API_USAGE_STATS: `${API_VERSION}/admin/api/usage-stats`,
  RATE_LIMIT_STATS: `${API_VERSION}/admin/api/rate-limit-stats`,
  RATE_LIMITS: `${API_VERSION}/admin/api/rate-limits`,

  // Security
  SECURITY_SETTINGS: `${API_VERSION}/admin/security/settings`,
} as const

// WebSocket Events (for client-side reference)
export const WEBSOCKET_EVENTS = {
  // Connection events
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  
  // Message events
  NEW_MESSAGE: 'message:new',
  MESSAGE_READ: 'message:read',
  TYPING_START: 'typing:start',
  TYPING_STOP: 'typing:stop',
  
  // Notification events
  NOTIFICATION_NEW: 'notification:new',
  NOTIFICATION_READ: 'notification:read',
  
  // Progress events
  PROGRESS_UPDATE: 'progress:update',
  MILESTONE_COMPLETE: 'milestone:complete',
  
  // System events
  SYSTEM_MAINTENANCE: 'system:maintenance',
  RATE_LIMIT_WARNING: 'system:rate_limit_warning',
} as const

// Export all endpoints as a combined object for easy access
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  USER: USER_ENDPOINTS,
  PROJECT: PROJECT_ENDPOINTS,
  REQUEST: REQUEST_ENDPOINTS,
  QUOTE: QUOTE_ENDPOINTS,
  PAYMENT: PAYMENT_ENDPOINTS,
  PROGRESS: PROGRESS_ENDPOINTS,
  MEDIA: MEDIA_ENDPOINTS,
  MESSAGE: MESSAGE_ENDPOINTS,
  NOTIFICATION: NOTIFICATION_ENDPOINTS,
  PORTFOLIO: PORTFOLIO_ENDPOINTS,
  BLOG: BLOG_ENDPOINTS,
  CONTACT: CONTACT_ENDPOINTS,
  ADMIN: ADMIN_ENDPOINTS,
  WEBSOCKET: WEBSOCKET_EVENTS,
} as const

export default API_ENDPOINTS
