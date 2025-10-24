/**
 * API Configuration
 * Configuration for HTTP client and API communication
 * Frontend makes API calls only - no business logic processing
 */

import { envConfig } from './env.config'

/**
 * API endpoint configuration
 */
export const apiConfig = {
  baseURL: envConfig.API_BASE_URL,
  timeout: envConfig.API_TIMEOUT,
  
  // Request configuration
  withCredentials: false, // JWT tokens sent via Authorization header
  
  // Headers
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Retry configuration
  retryAttempts: 3,
  retryDelay: 1000,
  
  // Upload configuration
  uploadTimeout: 60000, // 1 minute for file uploads
  
  // WebSocket configuration
  websocket: {
    url: envConfig.WS_URL,
    reconnectAttempts: 5,
    reconnectDelay: 2000,
    heartbeatInterval: 30000,
  },
}

/**
 * API endpoint constants
 * All endpoints for backend communication
 */
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    ME: '/auth/me',
  },
  
  // User endpoints
  USERS: {
    BASE: '/users',
    ME: '/users/me',
    PROFILE: '/users/profile',
    AVATAR: '/users/avatar',
    SETTINGS: '/users/settings',
  },
  
  // Project endpoints
  PROJECTS: {
    BASE: '/projects',
    SEARCH: '/projects/search',
    FEATURED: '/projects/featured',
    GALLERY: '/projects/:id/gallery',
    TESTIMONIALS: '/projects/:id/testimonials',
    TECH_STACK: '/projects/:id/tech-stack',
  },
  
  // Request endpoints
  REQUESTS: {
    BASE: '/requests',
    MY_REQUESTS: '/requests/my-requests',
    TRACKING: '/requests/:id/tracking',
    STATUS: '/requests/:id/status',
  },
  
  // Quote endpoints
  QUOTES: {
    BASE: '/quotes',
    MY_QUOTES: '/quotes/my-quotes',
    ACCEPT: '/quotes/:id/accept',
    REJECT: '/quotes/:id/reject',
  },
  
  // Payment endpoints
  PAYMENTS: {
    BASE: '/payments',
    METHODS: '/payments/methods',
    HISTORY: '/payments/history',
    RECEIPTS: '/payments/:id/receipt',
    CREATE_ORDER: '/payments/create-order',
    VERIFY: '/payments/verify',
    REFUND: '/payments/:id/refund',
  },
  
  // Progress endpoints
  PROGRESS: {
    BASE: '/progress',
    PROJECT: '/progress/project/:id',
    MILESTONES: '/progress/:id/milestones',
    UPDATES: '/progress/:id/updates',
  },
  
  // Portfolio endpoints
  PORTFOLIO: {
    BASE: '/portfolio',
    FEATURED: '/portfolio/featured',
    STATS: '/portfolio/stats',
    TECH_STACK: '/portfolio/tech-stack',
  },
  
  // Media endpoints
  MEDIA: {
    BASE: '/media',
    UPLOAD: '/media/upload',
    GALLERY: '/media/gallery',
    DELETE: '/media/:id',
    VISIBILITY: '/media/:id/visibility',
  },
  
  // Messaging endpoints
  MESSAGING: {
    BASE: '/messaging',
    CONVERSATIONS: '/messaging/conversations',
    MESSAGES: '/messaging/conversations/:id/messages',
    SEND: '/messaging/conversations/:id/send',
    READ: '/messaging/conversations/:id/read',
  },
  
  // Notification endpoints
  NOTIFICATIONS: {
    BASE: '/notifications',
    UNREAD: '/notifications/unread',
    MARK_READ: '/notifications/:id/read',
    MARK_ALL_READ: '/notifications/mark-all-read',
  },
  
  // Blog endpoints
  BLOG: {
    BASE: '/blog',
    POSTS: '/blog/posts',
    COMMENTS: '/blog/posts/:id/comments',
  },
  
  // Contact endpoints
  CONTACT: {
    BASE: '/contact',
    SUBMIT: '/contact/submit',
  },
  
  // Admin endpoints
  ADMIN: {
    // Dashboard
    DASHBOARD: '/admin/dashboard',
    SYSTEM_METRICS: '/admin/system-metrics',
    HEALTH: '/admin/health',
    
    // Analytics
    ANALYTICS: {
      USERS: '/admin/analytics/users',
      REQUESTS: '/admin/analytics/requests',
      PAYMENTS: '/admin/analytics/payments',
      QUOTES: '/admin/analytics/quotes',
      RATE_LIMITS: '/admin/analytics/rate-limits',
    },
    
    // User management
    USERS: {
      BASE: '/admin/users',
      STATUS: '/admin/users/:id/status',
      BULK_ACTIONS: '/admin/users/bulk-actions',
    },
    
    // Project management
    PROJECTS: {
      BASE: '/admin/projects',
      RESTORE: '/admin/projects/:id/restore',
      BULK_ACTIONS: '/admin/projects/bulk-actions',
    },
    
    // System administration
    SYSTEM: {
      CONFIG: '/admin/system/config',
      API_KEYS: '/admin/system/api-keys',
      INFO: '/admin/system/info',
      ENVIRONMENT: '/admin/system/environment',
    },
    
    // Audit logs
    AUDIT: {
      LOGS: '/admin/audit/logs',
      EXPORT: '/admin/audit/export',
      ANALYTICS: '/admin/audit/analytics',
    },
    
    // Webhooks
    WEBHOOKS: {
      BASE: '/admin/webhooks',
      LOGS: '/admin/webhooks/logs',
      RETRY: '/admin/webhooks/:id/retry',
      CONFIG: '/admin/webhooks/config',
    },
    
    // Storage
    STORAGE: {
      OVERVIEW: '/admin/storage/overview',
      ANALYTICS: '/admin/storage/analytics',
      CLEANUP: '/admin/storage/cleanup',
      MIGRATION: '/admin/storage/migration',
    },
  },
} as const

/**
 * Helper function to build URL with parameters
 */
export const buildApiUrl = (endpoint: string, params: Record<string, string | number> = {}): string => {
  let url = endpoint
  
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, String(value))
  })
  
  return url
}

/**
 * HTTP status codes for error handling
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const

export default apiConfig
