/**
 * API Constants
 * API endpoint URLs, timeouts, and configuration constants
 */

// Base API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  MAX_RETRY_DELAY: 10000, // 10 seconds
} as const

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    CHANGE_PASSWORD: '/auth/change-password',
    PROFILE: '/auth/profile',
  },
  
  // Users
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    AVATAR: '/users/avatar',
    SETTINGS: '/users/settings',
    PREFERENCES: '/users/preferences',
    ACTIVITY: '/users/activity',
    SESSIONS: '/users/sessions',
  },
  
  // Projects
  PROJECTS: {
    BASE: '/projects',
    STATS: '/projects/stats',
    GALLERY: '/projects/gallery',
    SEARCH: '/projects/search',
    CATEGORIES: '/projects/categories',
    TECHNOLOGIES: '/projects/technologies',
  },
  
  // Requests
  REQUESTS: {
    BASE: '/requests',
    STATS: '/requests/stats',
    CATEGORIES: '/requests/categories',
    SEARCH: '/requests/search',
  },
  
  // Quotes
  QUOTES: {
    BASE: '/quotes',
    STATS: '/quotes/stats',
    TEMPLATES: '/quotes/templates',
    SEARCH: '/quotes/search',
  },
  
  // Payments
  PAYMENTS: {
    BASE: '/payments',
    STATS: '/payments/stats',
    METHODS: '/payments/methods',
    REFUNDS: '/payments/refunds',
    RECEIPTS: '/payments/receipts',
    RAZORPAY: {
      CREATE_ORDER: '/payments/razorpay/create-order',
      VERIFY_PAYMENT: '/payments/razorpay/verify-payment',
      REFUND: '/payments/razorpay/refund',
    },
  },
  
  // Media
  MEDIA: {
    BASE: '/media',
    UPLOAD: '/media/upload',
    BATCH_UPLOAD: '/media/batch-upload',
    COLLECTIONS: '/media/collections',
    GALLERIES: '/media/galleries',
    PROCESS: '/media/process',
  },
  
  // Messaging
  MESSAGING: {
    CONVERSATIONS: '/messaging/conversations',
    MESSAGES: '/messaging/messages',
    SEARCH: '/messaging/search',
    TYPING: '/messaging/typing',
    READ_STATUS: '/messaging/read-status',
  },
  
  // Notifications
  NOTIFICATIONS: {
    BASE: '/notifications',
    MARK_READ: '/notifications/mark-read',
    MARK_ALL_READ: '/notifications/mark-all-read',
    SETTINGS: '/notifications/settings',
    TEMPLATES: '/notifications/templates',
  },
  
  // Blog
  BLOG: {
    POSTS: '/blog/posts',
    CATEGORIES: '/blog/categories',
    TAGS: '/blog/tags',
    COMMENTS: '/blog/comments',
    SEARCH: '/blog/search',
  },
  
  // Contact
  CONTACT: {
    BASE: '/contact',
    RESPONSES: '/contact/responses',
    TEMPLATES: '/contact/templates',
  },
  
  // Portfolio
  PORTFOLIO: {
    BASE: '/portfolio',
    PROJECTS: '/portfolio/projects',
    SKILLS: '/portfolio/skills',
    EXPERIENCE: '/portfolio/experience',
    EDUCATION: '/portfolio/education',
    TESTIMONIALS: '/portfolio/testimonials',
    STATS: '/portfolio/stats',
  },
  
  // Progress
  PROGRESS: {
    BASE: '/progress',
    MILESTONES: '/progress/milestones',
    UPDATES: '/progress/updates',
    REPORTS: '/progress/reports',
    TEMPLATES: '/progress/templates',
  },
  
  // Admin
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    PROJECTS: '/admin/projects',
    REQUESTS: '/admin/requests',
    QUOTES: '/admin/quotes',
    PAYMENTS: '/admin/payments',
    MEDIA: '/admin/media',
    BLOG: '/admin/blog',
    CONTACT: '/admin/contact',
    ANALYTICS: '/admin/analytics',
    SYSTEM: '/admin/system',
    AUDIT: '/admin/audit',
    WEBHOOKS: '/admin/webhooks',
    STORAGE: '/admin/storage',
    CONFIG: '/admin/config',
  },
  
  // WebSocket
  WEBSOCKET: {
    BASE: process.env.VITE_WS_BASE_URL || 'ws://localhost:3000',
    EVENTS: {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      MESSAGE: 'message',
      TYPING: 'typing',
      NOTIFICATION: 'notification',
      PROGRESS_UPDATE: 'progress_update',
    },
  },
  
  // External Services
  EXTERNAL: {
    RAZORPAY: {
      BASE_URL: 'https://api.razorpay.com/v1',
      CHECKOUT_URL: 'https://checkout.razorpay.com/v1/checkout.js',
    },
    CLOUDINARY: {
      BASE_URL: 'https://api.cloudinary.com/v1_1',
      UPLOAD_URL: 'https://api.cloudinary.com/v1_1/upload',
    },
  },
} as const

// HTTP Status Codes
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
} as const

// API Error Codes
export const API_ERROR_CODES = {
  // Network Errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  
  // Authentication Errors
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  
  // Authorization Errors
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  ACCESS_DENIED: 'ACCESS_DENIED',
  
  // Validation Errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  
  // Rate Limiting
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  
  // Server Errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
  
  // Client Errors
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  
  // Unknown
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const

// Request Headers
export const REQUEST_HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  ACCEPT: 'Accept',
  USER_AGENT: 'User-Agent',
  X_REQUESTED_WITH: 'X-Requested-With',
  X_API_KEY: 'X-API-Key',
  X_CLIENT_VERSION: 'X-Client-Version',
} as const

// Content Types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
  TEXT_PLAIN: 'text/plain',
  TEXT_HTML: 'text/html',
  IMAGE_JPEG: 'image/jpeg',
  IMAGE_PNG: 'image/png',
  IMAGE_GIF: 'image/gif',
  IMAGE_WEBP: 'image/webp',
  VIDEO_MP4: 'video/mp4',
  VIDEO_WEBM: 'video/webm',
  AUDIO_MP3: 'audio/mpeg',
  AUDIO_WAV: 'audio/wav',
  APPLICATION_PDF: 'application/pdf',
  APPLICATION_ZIP: 'application/zip',
} as const

// Pagination Defaults
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
  OFFSET: 0,
} as const

// Cache Configuration
export const CACHE_CONFIG = {
  DEFAULT_TTL: 300, // 5 minutes
  LONG_TTL: 3600, // 1 hour
  SHORT_TTL: 60, // 1 minute
  MAX_SIZE: 1000,
  STALE_WHILE_REVALIDATE: true,
} as const

// Rate Limiting
export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: 5,
  LOGIN_WINDOW: 15 * 60 * 1000, // 15 minutes
  API_REQUESTS: 1000,
  API_WINDOW: 60 * 60 * 1000, // 1 hour
  UPLOAD_REQUESTS: 10,
  UPLOAD_WINDOW: 60 * 60 * 1000, // 1 hour
} as const

// File Upload Limits
export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 10,
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
    'audio/mpeg',
    'audio/wav',
    'application/pdf',
    'application/zip',
  ],
  ALLOWED_EXTENSIONS: [
    '.jpg', '.jpeg', '.png', '.gif', '.webp',
    '.mp4', '.webm', '.mp3', '.wav',
    '.pdf', '.zip', '.rar', '.7z',
  ],
} as const

// WebSocket Configuration
export const WEBSOCKET_CONFIG = {
  RECONNECT_INTERVAL: 5000, // 5 seconds
  MAX_RECONNECT_ATTEMPTS: 10,
  HEARTBEAT_INTERVAL: 30000, // 30 seconds
  CONNECTION_TIMEOUT: 10000, // 10 seconds
} as const

// External Service Configuration
export const EXTERNAL_SERVICE_CONFIG = {
  RAZORPAY: {
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    CURRENCY: 'INR',
    THEME: {
      color: '#3399cc',
    },
  },
  CLOUDINARY: {
    TIMEOUT: 60000, // 60 seconds
    MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
    QUALITY: 'auto',
    FORMAT: 'auto',
  },
} as const
