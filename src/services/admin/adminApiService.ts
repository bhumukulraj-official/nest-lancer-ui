/**
 * Admin API Service
 * Handles all admin-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { ADMIN_ENDPOINTS } from '../api/endpoints'
import type {
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

export class AdminApiService {
  /**
   * Get admin dashboard data
   */
  static async getAdminDashboard(): Promise<AdminDashboard> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.DASHBOARD)
      return response.data
    } catch (error) {
      console.error('Error fetching admin dashboard:', error)
      throw error
    }
  }

  /**
   * Get admin statistics
   */
  static async getAdminStats(filters?: any): Promise<AdminStats> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.STATS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching admin stats:', error)
      throw error
    }
  }

  /**
   * Get system metrics
   */
  static async getSystemMetrics(): Promise<AdminMetrics> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.METRICS)
      return response.data
    } catch (error) {
      console.error('Error fetching system metrics:', error)
      throw error
    }
  }

  /**
   * Get system information
   */
  static async getSystemInfo(): Promise<AdminSystemInfo> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.SYSTEM_INFO)
      return response.data
    } catch (error) {
      console.error('Error fetching system info:', error)
      throw error
    }
  }

  /**
   * Get system health check
   */
  static async getSystemHealthCheck(): Promise<AdminHealthCheck> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.HEALTH_CHECK)
      return response.data
    } catch (error) {
      console.error('Error fetching system health check:', error)
      throw error
    }
  }

  /**
   * Get user management data
   */
  static async getUserManagement(filters?: any): Promise<AdminUserManagement> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.USER_MANAGEMENT, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching user management data:', error)
      throw error
    }
  }

  /**
   * Get project management data
   */
  static async getProjectManagement(filters?: any): Promise<AdminProjectManagement> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.PROJECT_MANAGEMENT, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching project management data:', error)
      throw error
    }
  }

  /**
   * Get request management data
   */
  static async getRequestManagement(filters?: any): Promise<AdminRequestManagement> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.REQUEST_MANAGEMENT, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching request management data:', error)
      throw error
    }
  }

  /**
   * Get quote management data
   */
  static async getQuoteManagement(filters?: any): Promise<AdminQuoteManagement> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.QUOTE_MANAGEMENT, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching quote management data:', error)
      throw error
    }
  }

  /**
   * Get payment management data
   */
  static async getPaymentManagement(filters?: any): Promise<AdminPaymentManagement> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.PAYMENT_MANAGEMENT, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching payment management data:', error)
      throw error
    }
  }

  /**
   * Get media management data
   */
  static async getMediaManagement(filters?: any): Promise<AdminMediaManagement> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.MEDIA_MANAGEMENT, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching media management data:', error)
      throw error
    }
  }

  /**
   * Get blog management data
   */
  static async getBlogManagement(filters?: any): Promise<AdminBlogManagement> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.BLOG_MANAGEMENT, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching blog management data:', error)
      throw error
    }
  }

  /**
   * Get contact management data
   */
  static async getContactManagement(filters?: any): Promise<AdminContactManagement> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.CONTACT_MANAGEMENT, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching contact management data:', error)
      throw error
    }
  }

  /**
   * Get notification management data
   */
  static async getNotificationManagement(filters?: any): Promise<AdminNotificationManagement> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.NOTIFICATION_MANAGEMENT, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching notification management data:', error)
      throw error
    }
  }

  /**
   * Get system settings
   */
  static async getSystemSettings(): Promise<AdminSystemSettings> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.SYSTEM_SETTINGS)
      return response.data
    } catch (error) {
      console.error('Error fetching system settings:', error)
      throw error
    }
  }

  /**
   * Update system settings
   */
  static async updateSystemSettings(settings: Partial<AdminSystemSettings>): Promise<AdminSystemSettings> {
    try {
      const response = await apiClient.put(ADMIN_ENDPOINTS.SYSTEM_SETTINGS, settings)
      return response.data
    } catch (error) {
      console.error('Error updating system settings:', error)
      throw error
    }
  }

  /**
   * Get audit logs
   */
  static async getAuditLogs(filters?: any): Promise<AdminAuditLog[]> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.AUDIT_LOGS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit logs:', error)
      throw error
    }
  }

  /**
   * Get webhook logs
   */
  static async getWebhookLogs(filters?: any): Promise<AdminWebhookLog[]> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.WEBHOOK_LOGS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching webhook logs:', error)
      throw error
    }
  }

  /**
   * Get admin analytics
   */
  static async getAdminAnalytics(filters?: any): Promise<AdminAnalytics> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.ANALYTICS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching admin analytics:', error)
      throw error
    }
  }

  /**
   * Generate admin report
   */
  static async generateAdminReport(reportType: string, filters?: any): Promise<AdminReport> {
    try {
      const response = await apiClient.post(ADMIN_ENDPOINTS.REPORTS, {
        reportType,
        filters
      })
      return response.data
    } catch (error) {
      console.error('Error generating admin report:', error)
      throw error
    }
  }

  /**
   * Export admin report
   */
  static async exportAdminReport(reportId: string, format: 'pdf' | 'excel' | 'csv' = 'pdf'): Promise<Blob> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.REPORTS}/${reportId}/export`, {
        params: { format },
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting admin report:', error)
      throw error
    }
  }

  /**
   * Create system backup
   */
  static async createSystemBackup(backupData: AdminBackup): Promise<AdminBackup> {
    try {
      const response = await apiClient.post(ADMIN_ENDPOINTS.BACKUPS, backupData)
      return response.data
    } catch (error) {
      console.error('Error creating system backup:', error)
      throw error
    }
  }

  /**
   * Get system backups
   */
  static async getSystemBackups(): Promise<AdminBackup[]> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.BACKUPS)
      return response.data
    } catch (error) {
      console.error('Error fetching system backups:', error)
      throw error
    }
  }

  /**
   * Restore system backup
   */
  static async restoreSystemBackup(backupId: string): Promise<void> {
    try {
      await apiClient.post(`${ADMIN_ENDPOINTS.BACKUPS}/${backupId}/restore`)
    } catch (error) {
      console.error('Error restoring system backup:', error)
      throw error
    }
  }

  /**
   * Delete system backup
   */
  static async deleteSystemBackup(backupId: string): Promise<void> {
    try {
      await apiClient.delete(`${ADMIN_ENDPOINTS.BACKUPS}/${backupId}`)
    } catch (error) {
      console.error('Error deleting system backup:', error)
      throw error
    }
  }

  /**
   * Get maintenance tasks
   */
  static async getMaintenanceTasks(): Promise<AdminMaintenance[]> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.MAINTENANCE)
      return response.data
    } catch (error) {
      console.error('Error fetching maintenance tasks:', error)
      throw error
    }
  }

  /**
   * Run maintenance task
   */
  static async runMaintenanceTask(taskId: string): Promise<AdminMaintenance> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.MAINTENANCE}/${taskId}/run`)
      return response.data
    } catch (error) {
      console.error('Error running maintenance task:', error)
      throw error
    }
  }

  /**
   * Schedule maintenance task
   */
  static async scheduleMaintenanceTask(taskId: string, schedule: { cron: string }): Promise<AdminMaintenance> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.MAINTENANCE}/${taskId}/schedule`, schedule)
      return response.data
    } catch (error) {
      console.error('Error scheduling maintenance task:', error)
      throw error
    }
  }

  /**
   * Cancel maintenance task
   */
  static async cancelMaintenanceTask(taskId: string): Promise<AdminMaintenance> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.MAINTENANCE}/${taskId}/cancel`)
      return response.data
    } catch (error) {
      console.error('Error canceling maintenance task:', error)
      throw error
    }
  }

  /**
   * Clear system cache
   */
  static async clearSystemCache(): Promise<{ cleared: boolean; message: string }> {
    try {
      const response = await apiClient.post(ADMIN_ENDPOINTS.CLEAR_CACHE)
      return response.data
    } catch (error) {
      console.error('Error clearing system cache:', error)
      throw error
    }
  }

  /**
   * Restart system services
   */
  static async restartSystemServices(services: string[]): Promise<{ restarted: string[]; failed: string[] }> {
    try {
      const response = await apiClient.post(ADMIN_ENDPOINTS.RESTART_SERVICES, { services })
      return response.data
    } catch (error) {
      console.error('Error restarting system services:', error)
      throw error
    }
  }

  /**
   * Get system logs
   */
  static async getSystemLogs(filters?: any): Promise<any[]> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.SYSTEM_LOGS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching system logs:', error)
      throw error
    }
  }

  /**
   * Download system logs
   */
  static async downloadSystemLogs(filters?: any): Promise<Blob> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.SYSTEM_LOGS_DOWNLOAD, {
        params: filters,
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error downloading system logs:', error)
      throw error
    }
  }

  /**
   * Get API usage statistics
   */
  static async getApiUsageStats(filters?: any): Promise<any> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.API_USAGE_STATS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching API usage stats:', error)
      throw error
    }
  }

  /**
   * Get rate limit statistics
   */
  static async getRateLimitStats(filters?: any): Promise<any> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.RATE_LIMIT_STATS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching rate limit stats:', error)
      throw error
    }
  }

  /**
   * Update rate limits
   */
  static async updateRateLimits(limits: any): Promise<any> {
    try {
      const response = await apiClient.put(ADMIN_ENDPOINTS.RATE_LIMITS, limits)
      return response.data
    } catch (error) {
      console.error('Error updating rate limits:', error)
      throw error
    }
  }

  /**
   * Get security settings
   */
  static async getSecuritySettings(): Promise<any> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.SECURITY_SETTINGS)
      return response.data
    } catch (error) {
      console.error('Error fetching security settings:', error)
      throw error
    }
  }

  /**
   * Update security settings
   */
  static async updateSecuritySettings(settings: any): Promise<any> {
    try {
      const response = await apiClient.put(ADMIN_ENDPOINTS.SECURITY_SETTINGS, settings)
      return response.data
    } catch (error) {
      console.error('Error updating security settings:', error)
      throw error
    }
  }

  /**
   * Get API keys
   */
  static async getApiKeys(): Promise<any[]> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.API_KEYS)
      return response.data
    } catch (error) {
      console.error('Error fetching API keys:', error)
      throw error
    }
  }

  /**
   * Create API key
   */
  static async createApiKey(keyData: any): Promise<any> {
    try {
      const response = await apiClient.post(ADMIN_ENDPOINTS.API_KEYS, keyData)
      return response.data
    } catch (error) {
      console.error('Error creating API key:', error)
      throw error
    }
  }

  /**
   * Update API key
   */
  static async updateApiKey(keyId: string, keyData: any): Promise<any> {
    try {
      const response = await apiClient.put(`${ADMIN_ENDPOINTS.API_KEYS}/${keyId}`, keyData)
      return response.data
    } catch (error) {
      console.error('Error updating API key:', error)
      throw error
    }
  }

  /**
   * Delete API key
   */
  static async deleteApiKey(keyId: string): Promise<void> {
    try {
      await apiClient.delete(`${ADMIN_ENDPOINTS.API_KEYS}/${keyId}`)
    } catch (error) {
      console.error('Error deleting API key:', error)
      throw error
    }
  }

  /**
   * Revoke API key
   */
  static async revokeApiKey(keyId: string): Promise<any> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.API_KEYS}/${keyId}/revoke`)
      return response.data
    } catch (error) {
      console.error('Error revoking API key:', error)
      throw error
    }
  }
}

export default AdminApiService
