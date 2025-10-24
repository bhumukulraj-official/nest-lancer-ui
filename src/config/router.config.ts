/**
 * Router Configuration
 * Defines routing configuration and path constants for the application
 * All routes are client-side only - backend handles API routing
 */

/**
 * Route path constants
 * Centralized route definitions to avoid hardcoded strings
 */
export const ROUTES = {
  // Public routes
  HOME: '/',
  
  // Authentication routes (public)
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    EMAIL_VERIFICATION: '/auth/verify-email',
  },
  
  // User routes (protected)
  USER: {
    // Dashboard
    DASHBOARD: '/user/dashboard',
    DASHBOARD_OVERVIEW: '/user/dashboard/overview',
    DASHBOARD_ACTIVITY: '/user/dashboard/activity',
    DASHBOARD_STATS: '/user/dashboard/stats',
    
    // Profile
    PROFILE: '/user/profile',
    PROFILE_EDIT: '/user/profile/edit',
    SETTINGS: '/user/settings',
    
    // Projects
    PROJECTS: '/user/projects',
    PROJECTS_LIST: '/user/projects/list',
    PROJECTS_DETAIL: '/user/projects/:id',
    PROJECTS_GALLERY: '/user/projects/:id/gallery',
    PROJECTS_SEARCH: '/user/projects/search',
    
    // Requests
    REQUESTS: '/user/requests',
    REQUESTS_LIST: '/user/requests/list',
    REQUESTS_DETAIL: '/user/requests/:id',
    REQUESTS_CREATE: '/user/requests/create',
    REQUESTS_TRACKING: '/user/requests/:id/tracking',
    
    // Quotes
    QUOTES: '/user/quotes',
    QUOTES_LIST: '/user/quotes/list',
    QUOTES_DETAIL: '/user/quotes/:id',
    QUOTES_ACCEPT: '/user/quotes/:id/accept',
    
    // Payments
    PAYMENTS: '/user/payments',
    PAYMENTS_FORM: '/user/payments/form',
    PAYMENTS_METHODS: '/user/payments/methods',
    PAYMENTS_HISTORY: '/user/payments/history',
    PAYMENTS_RECEIPTS: '/user/payments/receipts',
    
    // Progress
    PROGRESS: '/user/progress',
    PROGRESS_TIMELINE: '/user/progress/timeline',
    PROGRESS_MILESTONES: '/user/progress/milestones',
    
    // Portfolio
    PORTFOLIO: '/user/portfolio',
    PORTFOLIO_FEATURED: '/user/portfolio/featured',
    PORTFOLIO_STATS: '/user/portfolio/stats',
    
    // Media
    MEDIA: '/user/media',
    MEDIA_UPLOAD: '/user/media/upload',
    MEDIA_GALLERY: '/user/media/gallery',
    MEDIA_BROWSER: '/user/media/browser',
    
    // Messaging
    MESSAGING: '/user/messaging',
    MESSAGING_CONVERSATIONS: '/user/messaging/conversations',
    MESSAGING_CHAT: '/user/messaging/chat/:id',
    
    // Notifications
    NOTIFICATIONS: '/user/notifications',
    
    // Blog
    BLOG: '/user/blog',
    BLOG_LIST: '/user/blog/list',
    BLOG_POST: '/user/blog/post/:id',
    
    // Contact
    CONTACT: '/user/contact',
  },
  
  // Admin routes (protected, admin only)
  ADMIN: {
    // Dashboard
    DASHBOARD: '/admin/dashboard',
    SYSTEM_METRICS: '/admin/dashboard/metrics',
    REAL_TIME_STATS: '/admin/dashboard/stats',
    HEALTH_MONITORING: '/admin/dashboard/health',
    
    // Analytics
    ANALYTICS: {
      USERS: '/admin/analytics/users',
      REQUESTS: '/admin/analytics/requests',
      PAYMENTS: '/admin/analytics/payments',
      QUOTES: '/admin/analytics/quotes',
      RATE_LIMITS: '/admin/analytics/rate-limits',
    },
    
    // User Management
    USERS: {
      LIST: '/admin/users',
      DETAIL: '/admin/users/:id',
      EDIT: '/admin/users/:id/edit',
    },
    
    // Project Management
    PROJECTS: {
      LIST: '/admin/projects',
      CREATE: '/admin/projects/create',
      EDIT: '/admin/projects/:id/edit',
      MANAGEMENT: '/admin/projects/management',
    },
    
    // Request Management
    REQUESTS: {
      LIST: '/admin/requests',
      DETAIL: '/admin/requests/:id',
    },
    
    // Quote Management
    QUOTES: {
      LIST: '/admin/quotes',
      DETAIL: '/admin/quotes/:id',
    },
    
    // Payment Management
    PAYMENTS: {
      LIST: '/admin/payments',
      DETAIL: '/admin/payments/:id',
      REFUND_MANAGEMENT: '/admin/payments/refunds',
    },
    
    // Progress Management
    PROGRESS: {
      UPDATES: '/admin/progress/updates',
      MILESTONES: '/admin/progress/milestones',
    },
    
    // Media Management
    MEDIA: {
      LIST: '/admin/media',
      DETAIL: '/admin/media/:id',
      STORAGE_ADMIN: '/admin/media/storage',
    },
    
    // Blog Management
    BLOG: {
      LIST: '/admin/blog',
      CREATE: '/admin/blog/create',
      EDIT: '/admin/blog/:id/edit',
    },
    
    // Contact Management
    CONTACT: {
      MESSAGES: '/admin/contact/messages',
      INBOX: '/admin/contact/inbox',
    },
    
    // System Administration
    SYSTEM: {
      CONFIG: '/admin/system/config',
      API_KEYS: '/admin/system/api-keys',
      INFO: '/admin/system/info',
      ENVIRONMENT: '/admin/system/environment',
    },
    
    // Audit & Monitoring
    AUDIT: {
      LOGS: '/admin/audit/logs',
      ANALYTICS: '/admin/audit/analytics',
    },
    
    // Webhook Management
    WEBHOOKS: {
      LOGS: '/admin/webhooks/logs',
      CONFIG: '/admin/webhooks/config',
      MONITORING: '/admin/webhooks/monitoring',
    },
  },
  
  // Error routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  FORBIDDEN: '/403',
  SERVER_ERROR: '/500',
} as const

/**
 * Route configuration for React Router
 */
export const routerConfig = {
  basename: '/',
  
  // Router options
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
  
  // Scroll restoration
  scrollRestoration: 'auto' as const,
  
  // Route transitions
  enableTransitions: true,
  transitionDuration: 200,
}

/**
 * Navigation menu configuration
 * Defines which routes appear in navigation menus
 */
export const navigationConfig = {
  // Public navigation
  public: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Login', path: ROUTES.AUTH.LOGIN },
    { label: 'Register', path: ROUTES.AUTH.REGISTER },
  ],
  
  // User navigation
  user: [
    { label: 'Dashboard', path: ROUTES.USER.DASHBOARD },
    { label: 'Projects', path: ROUTES.USER.PROJECTS },
    { label: 'Requests', path: ROUTES.USER.REQUESTS },
    { label: 'Quotes', path: ROUTES.USER.QUOTES },
    { label: 'Payments', path: ROUTES.USER.PAYMENTS },
    { label: 'Portfolio', path: ROUTES.USER.PORTFOLIO },
    { label: 'Messages', path: ROUTES.USER.MESSAGING },
    { label: 'Profile', path: ROUTES.USER.PROFILE },
  ],
  
  // Admin navigation
  admin: [
    { label: 'Dashboard', path: ROUTES.ADMIN.DASHBOARD },
    { label: 'Users', path: ROUTES.ADMIN.USERS.LIST },
    { label: 'Projects', path: ROUTES.ADMIN.PROJECTS.LIST },
    { label: 'Analytics', path: ROUTES.ADMIN.ANALYTICS.USERS },
    { label: 'System', path: ROUTES.ADMIN.SYSTEM.CONFIG },
    { label: 'Audit', path: ROUTES.ADMIN.AUDIT.LOGS },
  ],
}

/**
 * Helper function to build route with parameters
 */
export const buildRoute = (route: string, params: Record<string, string | number> = {}): string => {
  let path = route
  
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, String(value))
  })
  
  return path
}

/**
 * Helper function to check if route is protected
 */
export const isProtectedRoute = (pathname: string): boolean => {
  return pathname.startsWith('/user/') || pathname.startsWith('/admin/')
}

/**
 * Helper function to check if route requires admin access
 */
export const isAdminRoute = (pathname: string): boolean => {
  return pathname.startsWith('/admin/')
}

/**
 * Helper function to get redirect path after login
 */
export const getRedirectPath = (role: string, intendedPath?: string): string => {
  // If user intended to go somewhere specific and has permission, go there
  if (intendedPath && isProtectedRoute(intendedPath)) {
    if (isAdminRoute(intendedPath) && role === 'admin') {
      return intendedPath
    }
    if (!isAdminRoute(intendedPath)) {
      return intendedPath
    }
  }
  
  // Default redirects based on role
  switch (role) {
    case 'admin':
      return ROUTES.ADMIN.DASHBOARD
    case 'user':
    default:
      return ROUTES.USER.DASHBOARD
  }
}

export default routerConfig
