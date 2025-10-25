/**
 * Admin Services Index
 * Central export point for all admin-related services
 */

export { AdminApiService } from './adminApiService'
export { AnalyticsApiService } from './analyticsApiService'
export { AuditApiService } from './auditApiService'
export { WebhookApiService } from './webhookApiService'

// Re-export types for convenience
export type {
  AdminDashboard,
  AdminStats,
  AdminMetrics,
  AdminSystemInfo,
  AdminHealthCheck,
  AdminUserManagement,
  AdminProjectManagement,
  AdminRequestManagement,
  AdminQuoteManagement,
  AdminPaymentManagement,
  AdminMediaManagement,
  AdminBlogManagement,
  AdminContactManagement,
  AdminNotificationManagement,
  AdminSystemSettings,
  AdminAuditLog,
  AdminWebhookLog,
  AdminAnalytics,
  AdminReport,
  AdminBackup,
  AdminMaintenance
} from '../../types/models/admin.types'

export type {
  AnalyticsData,
  ChartData,
  TimeSeriesData
} from './analyticsApiService'

export type {
  AuditLog,
  AuditFilters,
  AuditStats
} from './auditApiService'

export type {
  WebhookLog,
  WebhookConfig,
  WebhookFilters,
  WebhookStats
} from './webhookApiService'
