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
  PROFILE: `${API_VERSION}/users/profile`,
  UPDATE_PROFILE: `${API_VERSION}/users/profile`,
  UPLOAD_AVATAR: `${API_VERSION}/users/avatar`,
  DELETE_AVATAR: `${API_VERSION}/users/avatar`,
  SETTINGS: `${API_VERSION}/users/settings`,
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
  LIST: `${API_VERSION}/requests`,
  CREATE: `${API_VERSION}/requests`,
  DETAIL: (id: string) => `${API_VERSION}/requests/${id}`,
  UPDATE: (id: string) => `${API_VERSION}/requests/${id}`,
  DELETE: (id: string) => `${API_VERSION}/requests/${id}`,
  STATUS: (id: string) => `${API_VERSION}/requests/${id}/status`,
  RESPONSES: (id: string) => `${API_VERSION}/requests/${id}/responses`,
  ATTACHMENTS: (id: string) => `${API_VERSION}/requests/${id}/attachments`,
  TRACKING: (id: string) => `${API_VERSION}/requests/${id}/tracking`,
} as const

// Quote Endpoints
export const QUOTE_ENDPOINTS = {
  LIST: `${API_VERSION}/quotes`,
  CREATE: `${API_VERSION}/quotes`,
  DETAIL: (id: string) => `${API_VERSION}/quotes/${id}`,
  UPDATE: (id: string) => `${API_VERSION}/quotes/${id}`,
  DELETE: (id: string) => `${API_VERSION}/quotes/${id}`,
  ACCEPT: (id: string) => `${API_VERSION}/quotes/${id}/accept`,
  REJECT: (id: string) => `${API_VERSION}/quotes/${id}/reject`,
  STATUS: (id: string) => `${API_VERSION}/quotes/${id}/status`,
  TERMS: (id: string) => `${API_VERSION}/quotes/${id}/terms`,
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
  PROJECT_PROGRESS: (projectId: string) => `${API_VERSION}/projects/${projectId}/progress`,
  MILESTONES: (projectId: string) => `${API_VERSION}/projects/${projectId}/milestones`,
  MILESTONE_DETAIL: (projectId: string, milestoneId: string) => 
    `${API_VERSION}/projects/${projectId}/milestones/${milestoneId}`,
  UPDATE_MILESTONE: (projectId: string, milestoneId: string) => 
    `${API_VERSION}/projects/${projectId}/milestones/${milestoneId}`,
  TIMELINE: (projectId: string) => `${API_VERSION}/projects/${projectId}/timeline`,
} as const

// Media Management Endpoints
export const MEDIA_ENDPOINTS = {
  UPLOAD: `${API_VERSION}/media/upload`,
  LIST: `${API_VERSION}/media`,
  DETAIL: (id: string) => `${API_VERSION}/media/${id}`,
  DELETE: (id: string) => `${API_VERSION}/media/${id}`,
  GALLERY: `${API_VERSION}/media/gallery`,
  OPTIMIZE: (id: string) => `${API_VERSION}/media/${id}/optimize`,
  METADATA: (id: string) => `${API_VERSION}/media/${id}/metadata`,
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
  LIST: `${API_VERSION}/notifications`,
  UNREAD_COUNT: `${API_VERSION}/notifications/count`,
  MARK_READ: (id: string) => `${API_VERSION}/notifications/${id}/read`,
  MARK_ALL_READ: `${API_VERSION}/notifications/read-all`,
  DELETE: (id: string) => `${API_VERSION}/notifications/${id}`,
  SETTINGS: `${API_VERSION}/notifications/settings`,
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
  LIST: `${API_VERSION}/blog/posts`,
  DETAIL: (slug: string) => `${API_VERSION}/blog/posts/${slug}`,
  CREATE: `${API_VERSION}/blog/posts`,
  UPDATE: (id: string) => `${API_VERSION}/blog/posts/${id}`,
  DELETE: (id: string) => `${API_VERSION}/blog/posts/${id}`,
  COMMENTS: (postId: string) => `${API_VERSION}/blog/posts/${postId}/comments`,
  CATEGORIES: `${API_VERSION}/blog/categories`,
  TAGS: `${API_VERSION}/blog/tags`,
} as const

// Contact Endpoints
export const CONTACT_ENDPOINTS = {
  SUBMIT: `${API_VERSION}/contact`,
  LIST: `${API_VERSION}/contact/messages`,
  DETAIL: (id: string) => `${API_VERSION}/contact/messages/${id}`,
  REPLY: (id: string) => `${API_VERSION}/contact/messages/${id}/reply`,
} as const

// Admin Endpoints
export const ADMIN_ENDPOINTS = {
  DASHBOARD: `${API_VERSION}/admin/dashboard`,
  SYSTEM_METRICS: `${API_VERSION}/admin/system/metrics`,
  HEALTH_CHECK: `${API_VERSION}/admin/system/health`,
  
  // User Management
  USERS: `${API_VERSION}/admin/users`,
  USER_DETAIL: (id: string) => `${API_VERSION}/admin/users/${id}`,
  UPDATE_USER: (id: string) => `${API_VERSION}/admin/users/${id}`,
  USER_STATUS: (id: string) => `${API_VERSION}/admin/users/${id}/status`,
  BULK_USER_ACTIONS: `${API_VERSION}/admin/users/bulk`,
  
  // Analytics
  USER_ANALYTICS: `${API_VERSION}/admin/analytics/users`,
  REQUEST_ANALYTICS: `${API_VERSION}/admin/analytics/requests`,
  PAYMENT_ANALYTICS: `${API_VERSION}/admin/analytics/payments`,
  QUOTE_ANALYTICS: `${API_VERSION}/admin/analytics/quotes`,
  RATE_LIMIT_ANALYTICS: `${API_VERSION}/admin/analytics/rate-limits`,
  
  // System Administration
  SYSTEM_CONFIG: `${API_VERSION}/admin/system/config`,
  API_KEYS: `${API_VERSION}/admin/system/api-keys`,
  ENVIRONMENT: `${API_VERSION}/admin/system/environment`,
  
  // Audit Logs
  AUDIT_LOGS: `${API_VERSION}/admin/audit/logs`,
  AUDIT_EXPORT: `${API_VERSION}/admin/audit/export`,
  
  // Webhook Management
  WEBHOOKS: `${API_VERSION}/admin/webhooks`,
  WEBHOOK_LOGS: `${API_VERSION}/admin/webhooks/logs`,
  WEBHOOK_RETRY: (id: string) => `${API_VERSION}/admin/webhooks/${id}/retry`,
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
