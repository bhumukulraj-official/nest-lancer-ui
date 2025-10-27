/**
 * Admin Types
 * Type definitions for admin-related data structures
 */

// Dashboard types
export interface AdminDashboard {
  stats: AdminStats
  recentActivity: AdminActivity[]
  alerts: AdminAlert[]
  charts: AdminChartData[]
}

export interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalProjects: number
  activeProjects: number
  totalRequests: number
  pendingRequests: number
  totalPayments: number
  totalRevenue: number
  systemHealth: 'healthy' | 'warning' | 'critical'
}

export interface AdminActivity {
  id: string
  type: 'user_registration' | 'project_created' | 'payment_processed' | 'system_alert'
  description: string
  timestamp: string
  userId?: string
  metadata?: Record<string, any>
}

export interface AdminAlert {
  id: string
  type: 'info' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  resolved: boolean
}

// Metrics and System types
export interface AdminMetrics {
  uptime: number
  responseTime: number
  errorRate: number
  throughput: number
  memoryUsage: number
  cpuUsage: number
  diskUsage: number
  networkTraffic: number
}

export interface AdminSystemInfo {
  version: string
  environment: 'development' | 'staging' | 'production'
  database: {
    status: 'connected' | 'disconnected'
    responseTime: number
  }
  cache: {
    status: 'connected' | 'disconnected'
    hitRate: number
  }
  services: {
    name: string
    status: 'up' | 'down'
    uptime: number
  }[]
}

export interface AdminHealthCheck {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  checks: {
    name: string
    status: 'pass' | 'fail' | 'warn'
    message?: string
    responseTime?: number
  }[]
}

// Management types
export interface AdminUserManagement {
  users: AdminUserSummary[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: AdminUserFilters
  stats: AdminUserStats
}

export interface AdminUserSummary {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  status: string
  isVerified: boolean
  lastLoginAt?: string
  createdAt: string
}

export interface AdminUserFilters {
  role?: string
  status?: string
  isVerified?: boolean
  search?: string
  dateRange?: {
    start: string
    end: string
  }
}

export interface AdminUserStats {
  total: number
  active: number
  verified: number
  byRole: Record<string, number>
}

export interface AdminProjectManagement {
  projects: AdminProjectSummary[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: AdminProjectFilters
  stats: AdminProjectStats
}

export interface AdminProjectSummary {
  id: string
  title: string
  clientId: string
  clientName: string
  freelancerId: string
  freelancerName: string
  status: string
  budget: number
  createdAt: string
  updatedAt: string
}

export interface AdminProjectFilters {
  status?: string
  clientId?: string
  freelancerId?: string
  dateRange?: {
    start: string
    end: string
  }
  budgetRange?: {
    min: number
    max: number
  }
}

export interface AdminProjectStats {
  total: number
  active: number
  completed: number
  totalValue: number
  averageValue: number
}

export interface AdminRequestManagement {
  requests: AdminRequestSummary[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: AdminRequestFilters
  stats: AdminRequestStats
}

export interface AdminRequestSummary {
  id: string
  title: string
  clientId: string
  clientName: string
  category: string
  budget: number
  status: string
  createdAt: string
}

export interface AdminRequestFilters {
  status?: string
  category?: string
  clientId?: string
  budgetRange?: {
    min: number
    max: number
  }
}

export interface AdminRequestStats {
  total: number
  pending: number
  active: number
  totalBudget: number
}

export interface AdminQuoteManagement {
  quotes: AdminQuoteSummary[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: AdminQuoteFilters
  stats: AdminQuoteStats
}

export interface AdminQuoteSummary {
  id: string
  projectId: string
  freelancerId: string
  freelancerName: string
  amount: number
  status: string
  createdAt: string
}

export interface AdminQuoteFilters {
  status?: string
  projectId?: string
  freelancerId?: string
  amountRange?: {
    min: number
    max: number
  }
}

export interface AdminQuoteStats {
  total: number
  pending: number
  accepted: number
  totalValue: number
}

export interface AdminPaymentManagement {
  payments: AdminPaymentSummary[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: AdminPaymentFilters
  stats: AdminPaymentStats
}

export interface AdminPaymentSummary {
  id: string
  projectId: string
  clientId: string
  freelancerId: string
  amount: number
  status: string
  createdAt: string
}

export interface AdminPaymentFilters {
  status?: string
  projectId?: string
  clientId?: string
  amountRange?: {
    min: number
    max: number
  }
}

export interface AdminPaymentStats {
  total: number
  completed: number
  pending: number
  totalValue: number
}

// Content Management types
export interface AdminMediaManagement {
  media: AdminMediaSummary[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  stats: AdminMediaStats
}

export interface AdminMediaSummary {
  id: string
  filename: string
  type: string
  size: number
  uploadedBy: string
  uploadedAt: string
}

export interface AdminMediaStats {
  totalFiles: number
  totalSize: number
  byType: Record<string, number>
}

export interface AdminBlogManagement {
  posts: AdminBlogSummary[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  stats: AdminBlogStats
}

export interface AdminBlogSummary {
  id: string
  title: string
  authorId: string
  authorName: string
  status: string
  publishedAt?: string
  createdAt: string
}

export interface AdminBlogStats {
  total: number
  published: number
  draft: number
}

export interface AdminContactManagement {
  contacts: AdminContactSummary[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  stats: AdminContactStats
}

export interface AdminContactSummary {
  id: string
  name: string
  email: string
  subject: string
  status: string
  createdAt: string
}

export interface AdminContactStats {
  total: number
  pending: number
  resolved: number
}

// Notification Management
export interface AdminNotificationManagement {
  notifications: AdminNotificationSummary[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  stats: AdminNotificationStats
}

export interface AdminNotificationSummary {
  id: string
  title: string
  type: string
  status: string
  sentAt: string
  recipientCount: number
}

export interface AdminNotificationStats {
  total: number
  sent: number
  pending: number
}

// System Settings
export interface AdminSystemSettings {
  general: {
    siteName: string
    siteDescription: string
    contactEmail: string
    maintenanceMode: boolean
  }
  security: {
    sessionTimeout: number
    passwordMinLength: number
    twoFactorRequired: boolean
    allowedDomains: string[]
  }
  payments: {
    stripeEnabled: boolean
    paypalEnabled: boolean
    commissionRate: number
  }
  notifications: {
    emailEnabled: boolean
    smsEnabled: boolean
    pushEnabled: boolean
  }
}

// Audit and Logging types
export interface AdminAuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId: string
  changes: Record<string, any>
  ipAddress: string
  userAgent: string
  timestamp: string
}

export interface AdminWebhookLog {
  id: string
  webhookId: string
  event: string
  payload: Record<string, any>
  status: 'success' | 'failed' | 'pending'
  response?: Record<string, any>
  error?: string
  timestamp: string
}

// Analytics and Reporting
export interface AdminAnalytics {
  overview: AdminAnalyticsOverview
  trends: AdminAnalyticsTrends
  topPerformers: AdminTopPerformers
}

export interface AdminAnalyticsOverview {
  period: string
  metrics: {
    newUsers: number
    newProjects: number
    completedProjects: number
    totalRevenue: number
    averageProjectValue: number
    userRetentionRate: number
  }
}

export interface AdminAnalyticsTrends {
  users: AdminTrendData[]
  projects: AdminTrendData[]
  revenue: AdminTrendData[]
}

export interface AdminTrendData {
  date: string
  value: number
  change: number
}

export interface AdminTopPerformers {
  freelancers: AdminPerformerData[]
  clients: AdminPerformerData[]
  categories: AdminCategoryData[]
}

export interface AdminPerformerData {
  id: string
  name: string
  value: number
  rank: number
}

export interface AdminCategoryData {
  name: string
  count: number
  revenue: number
}

export interface AdminReport {
  id: string
  name: string
  type: 'users' | 'projects' | 'payments' | 'system'
  parameters: Record<string, any>
  generatedAt: string
  data: Record<string, any>
}

// Backup and Maintenance
export interface AdminBackup {
  id: string
  name: string
  type: 'full' | 'incremental'
  status: 'pending' | 'running' | 'completed' | 'failed'
  size?: number
  createdAt: string
  completedAt?: string
}

export interface AdminMaintenance {
  id: string
  name: string
  type: 'cleanup' | 'optimization' | 'migration'
  status: 'pending' | 'running' | 'completed' | 'failed'
  startedAt?: string
  completedAt?: string
  logs: string[]
}

// Chart data for dashboard
export interface AdminChartData {
  id: string
  title: string
  type: 'line' | 'bar' | 'pie' | 'area'
  data: any[]
  config: Record<string, any>
}
