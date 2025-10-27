/**
 * Admin Pages Index
 * Export point for all admin pages
 */

// Dashboard pages
export { default as AdminDashboardPage } from './dashboard/AdminDashboardPage'

// Analytics pages
export { default as UserAnalyticsPage } from './analytics/UserAnalyticsPage'
export { default as RequestAnalyticsPage } from './analytics/RequestAnalyticsPage'
export { default as PaymentAnalyticsPage } from './analytics/PaymentAnalyticsPage'
export { default as QuoteAnalyticsPage } from './analytics/QuoteAnalyticsPage'
export { default as RateLimitAnalyticsPage } from './analytics/RateLimitAnalyticsPage'

// User management pages
export { default as UserListPage } from './users/UserListPage'
export { default as UserDetailPage } from './users/UserDetailPage'
export { default as UserEditPage } from './users/UserEditPage'

// Project management pages
export { default as ProjectListPage } from './projects/ProjectListPage'
export { default as ProjectCreatePage } from './projects/ProjectCreatePage'
export { default as ProjectEditPage } from './projects/ProjectEditPage'
export { default as ProjectManagementPage } from './projects/ProjectManagementPage'

// Request management pages
export { default as RequestListPage } from './requests/RequestListPage'
export { default as RequestDetailPage } from './requests/RequestDetailPage'

// Quote management pages
export { default as QuoteListPage } from './quotes/QuoteListPage'
export { default as QuoteDetailPage } from './quotes/QuoteDetailPage'

// Payment management pages
export { default as PaymentListPage } from './payments/PaymentListPage'
export { default as PaymentDetailPage } from './payments/PaymentDetailPage'
export { default as RefundManagementPage } from './payments/RefundManagementPage'

// Progress management pages
export { default as ProgressUpdatesPage } from './progress/ProgressUpdatesPage'
export { default as MilestoneManagementPage } from './progress/MilestoneManagementPage'

// Media management pages
export { default as MediaListPage } from './media/MediaListPage'
export { default as MediaDetailPage } from './media/MediaDetailPage'
export { default as StorageAdminPage } from './media/StorageAdminPage'

// Blog management pages
export { default as BlogListPage } from './blog/BlogListPage'
export { default as BlogCreatePage } from './blog/BlogCreatePage'
export { default as BlogEditPage } from './blog/BlogEditPage'

// Contact management pages
export { default as ContactMessagesPage } from './contact/ContactMessagesPage'
export { default as MessageInboxPage } from './contact/MessageInboxPage'

// System administration pages
export { default as SystemConfigPage } from './system/SystemConfigPage'
export { default as ApiKeyManagementPage } from './system/ApiKeyManagementPage'
export { default as SystemInfoPage } from './system/SystemInfoPage'
export { default as EnvironmentConfigPage } from './system/EnvironmentConfigPage'

// Audit and monitoring pages
export { default as AuditLogsPage } from './audit/AuditLogsPage'
export { default as AuditAnalyticsPage } from './audit/AuditAnalyticsPage'

// Webhook management pages
export { default as WebhookLogsPage } from './webhooks/WebhookLogsPage'
export { default as WebhookConfigPage } from './webhooks/WebhookConfigPage'
export { default as WebhookMonitoringPage } from './webhooks/WebhookMonitoringPage'

