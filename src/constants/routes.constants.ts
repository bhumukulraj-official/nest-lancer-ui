/**
 * Routes Constants
 * Frontend route definitions and navigation constants
 */

// Base Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',
  PORTFOLIO: '/portfolio',
  SERVICES: '/services',
  PRICING: '/pricing',
  FAQ: '/faq',
  HELP: '/help',
  SUPPORT: '/support',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  COOKIES: '/cookies',
} as const

// Authentication Routes
export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  CHANGE_PASSWORD: '/auth/change-password',
  PROFILE: '/auth/profile',
  SETTINGS: '/auth/settings',
  LOGOUT: '/auth/logout',
} as const

// User Routes
export const USER_ROUTES = {
  DASHBOARD: '/user/dashboard',
  PROFILE: '/user/profile',
  PROJECTS: '/user/projects',
  REQUESTS: '/user/requests',
  QUOTES: '/user/quotes',
  PAYMENTS: '/user/payments',
  PORTFOLIO: '/user/portfolio',
  MESSAGING: '/user/messaging',
  NOTIFICATIONS: '/user/notifications',
  SETTINGS: '/user/settings',
  HELP: '/user/help',
} as const

// Project Routes
export const PROJECT_ROUTES = {
  LIST: '/user/projects',
  CREATE: '/user/projects/create',
  EDIT: '/user/projects/:id/edit',
  VIEW: '/user/projects/:id',
  GALLERY: '/user/projects/:id/gallery',
  PROGRESS: '/user/projects/:id/progress',
  PAYMENTS: '/user/projects/:id/payments',
  MESSAGES: '/user/projects/:id/messages',
} as const

// Request Routes
export const REQUEST_ROUTES = {
  LIST: '/user/requests',
  CREATE: '/user/requests/create',
  EDIT: '/user/requests/:id/edit',
  VIEW: '/user/requests/:id',
  QUOTES: '/user/requests/:id/quotes',
  TRACKING: '/user/requests/:id/tracking',
} as const

// Quote Routes
export const QUOTE_ROUTES = {
  LIST: '/user/quotes',
  VIEW: '/user/quotes/:id',
  ACCEPT: '/user/quotes/:id/accept',
  REJECT: '/user/quotes/:id/reject',
  NEGOTIATE: '/user/quotes/:id/negotiate',
} as const

// Payment Routes
export const PAYMENT_ROUTES = {
  LIST: '/user/payments',
  CREATE: '/user/payments/create',
  VIEW: '/user/payments/:id',
  RECEIPTS: '/user/payments/:id/receipts',
  REFUNDS: '/user/payments/:id/refunds',
  METHODS: '/user/payments/methods',
} as const

// Portfolio Routes
export const PORTFOLIO_ROUTES = {
  VIEW: '/user/portfolio',
  EDIT: '/user/portfolio/edit',
  PROJECTS: '/user/portfolio/projects',
  SKILLS: '/user/portfolio/skills',
  EXPERIENCE: '/user/portfolio/experience',
  EDUCATION: '/user/portfolio/education',
  TESTIMONIALS: '/user/portfolio/testimonials',
  STATS: '/user/portfolio/stats',
} as const

// Messaging Routes
export const MESSAGING_ROUTES = {
  LIST: '/user/messaging',
  CONVERSATION: '/user/messaging/:id',
  NEW: '/user/messaging/new',
  SEARCH: '/user/messaging/search',
} as const

// Notification Routes
export const NOTIFICATION_ROUTES = {
  LIST: '/user/notifications',
  SETTINGS: '/user/notifications/settings',
} as const

// Blog Routes
export const BLOG_ROUTES = {
  LIST: '/blog',
  POST: '/blog/:slug',
  CATEGORY: '/blog/category/:category',
  TAG: '/blog/tag/:tag',
  SEARCH: '/blog/search',
} as const

// Admin Routes
export const ADMIN_ROUTES = {
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
  SETTINGS: '/admin/settings',
} as const

// Admin Sub Routes
export const ADMIN_SUB_ROUTES = {
  USERS: {
    LIST: '/admin/users',
    CREATE: '/admin/users/create',
    EDIT: '/admin/users/:id/edit',
    VIEW: '/admin/users/:id',
    BULK_ACTIONS: '/admin/users/bulk-actions',
  },
  PROJECTS: {
    LIST: '/admin/projects',
    CREATE: '/admin/projects/create',
    EDIT: '/admin/projects/:id/edit',
    VIEW: '/admin/projects/:id',
    BULK_ACTIONS: '/admin/projects/bulk-actions',
  },
  REQUESTS: {
    LIST: '/admin/requests',
    VIEW: '/admin/requests/:id',
    BULK_ACTIONS: '/admin/requests/bulk-actions',
  },
  QUOTES: {
    LIST: '/admin/quotes',
    VIEW: '/admin/quotes/:id',
    BULK_ACTIONS: '/admin/quotes/bulk-actions',
  },
  PAYMENTS: {
    LIST: '/admin/payments',
    VIEW: '/admin/payments/:id',
    REFUNDS: '/admin/payments/:id/refunds',
    BULK_ACTIONS: '/admin/payments/bulk-actions',
  },
  MEDIA: {
    LIST: '/admin/media',
    UPLOAD: '/admin/media/upload',
    VIEW: '/admin/media/:id',
    BULK_ACTIONS: '/admin/media/bulk-actions',
  },
  BLOG: {
    LIST: '/admin/blog',
    CREATE: '/admin/blog/create',
    EDIT: '/admin/blog/:id/edit',
    VIEW: '/admin/blog/:id',
    COMMENTS: '/admin/blog/comments',
  },
  CONTACT: {
    LIST: '/admin/contact',
    VIEW: '/admin/contact/:id',
    RESPONSES: '/admin/contact/responses',
  },
  ANALYTICS: {
    OVERVIEW: '/admin/analytics',
    USERS: '/admin/analytics/users',
    PROJECTS: '/admin/analytics/projects',
    PAYMENTS: '/admin/analytics/payments',
    REQUESTS: '/admin/analytics/requests',
    QUOTES: '/admin/analytics/quotes',
  },
  SYSTEM: {
    INFO: '/admin/system/info',
    HEALTH: '/admin/system/health',
    METRICS: '/admin/system/metrics',
    CONFIG: '/admin/system/config',
    ENVIRONMENT: '/admin/system/environment',
  },
  AUDIT: {
    LOGS: '/admin/audit/logs',
    FILTERS: '/admin/audit/filters',
    EXPORT: '/admin/audit/export',
    ANALYTICS: '/admin/audit/analytics',
  },
  WEBHOOKS: {
    LIST: '/admin/webhooks',
    CREATE: '/admin/webhooks/create',
    EDIT: '/admin/webhooks/:id/edit',
    VIEW: '/admin/webhooks/:id',
    LOGS: '/admin/webhooks/:id/logs',
    MONITORING: '/admin/webhooks/monitoring',
  },
  STORAGE: {
    OVERVIEW: '/admin/storage',
    ANALYTICS: '/admin/storage/analytics',
    CLEANUP: '/admin/storage/cleanup',
    MIGRATION: '/admin/storage/migration',
    BACKUP: '/admin/storage/backup',
  },
} as const

// Error Routes
export const ERROR_ROUTES = {
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  FORBIDDEN: '/403',
  SERVER_ERROR: '/500',
  MAINTENANCE: '/maintenance',
} as const

// Route Parameters
export const ROUTE_PARAMS = {
  ID: ':id',
  SLUG: ':slug',
  CATEGORY: ':category',
  TAG: ':tag',
  USER_ID: ':userId',
  PROJECT_ID: ':projectId',
  REQUEST_ID: ':requestId',
  QUOTE_ID: ':quoteId',
  PAYMENT_ID: ':paymentId',
  MEDIA_ID: ':mediaId',
  CONVERSATION_ID: ':conversationId',
  MESSAGE_ID: ':messageId',
  NOTIFICATION_ID: ':notificationId',
  POST_ID: ':postId',
  COMMENT_ID: ':commentId',
  CONTACT_ID: ':contactId',
  MILESTONE_ID: ':milestoneId',
  WEBHOOK_ID: ':webhookId',
} as const

// Route Guards
export const ROUTE_GUARDS = {
  AUTH: 'auth',
  GUEST: 'guest',
  ADMIN: 'admin',
  USER: 'user',
  CLIENT: 'client',
  FREELANCER: 'freelancer',
  MODERATOR: 'moderator',
  SUPPORT: 'support',
} as const

// Navigation Menu Items
export const NAVIGATION_MENU = {
  MAIN: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'Services', path: ROUTES.SERVICES },
    { label: 'Portfolio', path: ROUTES.PORTFOLIO },
    { label: 'Blog', path: ROUTES.BLOG },
    { label: 'Contact', path: ROUTES.CONTACT },
  ],
  USER: [
    { label: 'Dashboard', path: USER_ROUTES.DASHBOARD },
    { label: 'Projects', path: USER_ROUTES.PROJECTS },
    { label: 'Requests', path: USER_ROUTES.REQUESTS },
    { label: 'Quotes', path: USER_ROUTES.QUOTES },
    { label: 'Payments', path: USER_ROUTES.PAYMENTS },
    { label: 'Portfolio', path: USER_ROUTES.PORTFOLIO },
    { label: 'Messaging', path: USER_ROUTES.MESSAGING },
    { label: 'Notifications', path: USER_ROUTES.NOTIFICATIONS },
  ],
  ADMIN: [
    { label: 'Dashboard', path: ADMIN_ROUTES.DASHBOARD },
    { label: 'Users', path: ADMIN_ROUTES.USERS },
    { label: 'Projects', path: ADMIN_ROUTES.PROJECTS },
    { label: 'Requests', path: ADMIN_ROUTES.REQUESTS },
    { label: 'Quotes', path: ADMIN_ROUTES.QUOTES },
    { label: 'Payments', path: ADMIN_ROUTES.PAYMENTS },
    { label: 'Media', path: ADMIN_ROUTES.MEDIA },
    { label: 'Blog', path: ADMIN_ROUTES.BLOG },
    { label: 'Contact', path: ADMIN_ROUTES.CONTACT },
    { label: 'Analytics', path: ADMIN_ROUTES.ANALYTICS },
    { label: 'System', path: ADMIN_ROUTES.SYSTEM },
    { label: 'Audit', path: ADMIN_ROUTES.AUDIT },
    { label: 'Webhooks', path: ADMIN_ROUTES.WEBHOOKS },
    { label: 'Storage', path: ADMIN_ROUTES.STORAGE },
  ],
} as const

// Breadcrumb Configuration
export const BREADCRUMB_CONFIG = {
  SEPARATOR: '>',
  HOME_LABEL: 'Home',
  MAX_ITEMS: 5,
  SHOW_HOME: true,
} as const

// Route Transitions
export const ROUTE_TRANSITIONS = {
  DURATION: 300,
  EASING: 'ease-in-out',
  FADE: 'fade',
  SLIDE: 'slide',
  SCALE: 'scale',
} as const
