/**
 * Audit API Service
 * Handles all audit-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { ADMIN_ENDPOINTS } from '../api/endpoints'

export interface AuditLog {
  id: string
  userId: string
  userEmail: string
  action: string
  resource: string
  resourceId: string
  details: any
  ipAddress: string
  userAgent: string
  timestamp: string
  status: 'success' | 'failure' | 'warning'
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export interface AuditFilters {
  userId?: string
  action?: string
  resource?: string
  status?: string
  severity?: string
  startDate?: string
  endDate?: string
  ipAddress?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface AuditStats {
  totalLogs: number
  successCount: number
  failureCount: number
  warningCount: number
  criticalCount: number
  uniqueUsers: number
  uniqueActions: number
  uniqueResources: number
  topActions: Array<{ action: string; count: number }>
  topUsers: Array<{ userId: string; userEmail: string; count: number }>
  topResources: Array<{ resource: string; count: number }>
  dailyStats: Array<{ date: string; count: number }>
}

export class AuditApiService {
  /**
   * Get audit logs
   */
  static async getAuditLogs(filters?: AuditFilters): Promise<{ logs: AuditLog[]; total: number; page: number; limit: number }> {
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
   * Get a single audit log by ID
   */
  static async getAuditLog(id: string): Promise<AuditLog> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching audit log:', error)
      throw error
    }
  }

  /**
   * Get audit log statistics
   */
  static async getAuditStats(filters?: AuditFilters): Promise<AuditStats> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/stats`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit stats:', error)
      throw error
    }
  }

  /**
   * Search audit logs
   */
  static async searchAuditLogs(query: string, filters?: AuditFilters): Promise<{ logs: AuditLog[]; total: number }> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/search`, {
        params: { query, ...filters }
      })
      return response.data
    } catch (error) {
      console.error('Error searching audit logs:', error)
      throw error
    }
  }

  /**
   * Get audit log by user
   */
  static async getAuditLogsByUser(userId: string, filters?: AuditFilters): Promise<{ logs: AuditLog[]; total: number }> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/user/${userId}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit logs by user:', error)
      throw error
    }
  }

  /**
   * Get audit log by action
   */
  static async getAuditLogsByAction(action: string, filters?: AuditFilters): Promise<{ logs: AuditLog[]; total: number }> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/action/${action}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit logs by action:', error)
      throw error
    }
  }

  /**
   * Get audit log by resource
   */
  static async getAuditLogsByResource(resource: string, filters?: AuditFilters): Promise<{ logs: AuditLog[]; total: number }> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/resource/${resource}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit logs by resource:', error)
      throw error
    }
  }

  /**
   * Get audit log by resource ID
   */
  static async getAuditLogsByResourceId(resourceId: string, filters?: AuditFilters): Promise<{ logs: AuditLog[]; total: number }> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/resource-id/${resourceId}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit logs by resource ID:', error)
      throw error
    }
  }

  /**
   * Get audit log timeline
   */
  static async getAuditLogTimeline(filters?: AuditFilters): Promise<Array<{ date: string; logs: AuditLog[] }>> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/timeline`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit log timeline:', error)
      throw error
    }
  }

  /**
   * Get audit log summary
   */
  static async getAuditLogSummary(filters?: AuditFilters): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/summary`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit log summary:', error)
      throw error
    }
  }

  /**
   * Export audit logs
   */
  static async exportAuditLogs(format: 'csv' | 'excel' | 'pdf' = 'csv', filters?: AuditFilters): Promise<Blob> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/export`, {
        params: { format, ...filters },
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting audit logs:', error)
      throw error
    }
  }

  /**
   * Get audit log alerts
   */
  static async getAuditLogAlerts(): Promise<any[]> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/alerts`)
      return response.data
    } catch (error) {
      console.error('Error fetching audit log alerts:', error)
      throw error
    }
  }

  /**
   * Create audit log alert
   */
  static async createAuditLogAlert(alertData: any): Promise<any> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/alerts`, alertData)
      return response.data
    } catch (error) {
      console.error('Error creating audit log alert:', error)
      throw error
    }
  }

  /**
   * Update audit log alert
   */
  static async updateAuditLogAlert(alertId: string, alertData: any): Promise<any> {
    try {
      const response = await apiClient.put(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/alerts/${alertId}`, alertData)
      return response.data
    } catch (error) {
      console.error('Error updating audit log alert:', error)
      throw error
    }
  }

  /**
   * Delete audit log alert
   */
  static async deleteAuditLogAlert(alertId: string): Promise<void> {
    try {
      await apiClient.delete(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/alerts/${alertId}`)
    } catch (error) {
      console.error('Error deleting audit log alert:', error)
      throw error
    }
  }

  /**
   * Get audit log retention settings
   */
  static async getAuditLogRetentionSettings(): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/retention`)
      return response.data
    } catch (error) {
      console.error('Error fetching audit log retention settings:', error)
      throw error
    }
  }

  /**
   * Update audit log retention settings
   */
  static async updateAuditLogRetentionSettings(settings: any): Promise<any> {
    try {
      const response = await apiClient.put(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/retention`, settings)
      return response.data
    } catch (error) {
      console.error('Error updating audit log retention settings:', error)
      throw error
    }
  }

  /**
   * Clean up old audit logs
   */
  static async cleanupOldAuditLogs(): Promise<{ deletedCount: number; freedSpace: number }> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/cleanup`)
      return response.data
    } catch (error) {
      console.error('Error cleaning up old audit logs:', error)
      throw error
    }
  }

  /**
   * Archive audit logs
   */
  static async archiveAuditLogs(filters?: AuditFilters): Promise<{ archivedCount: number; archivePath: string }> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/archive`, filters)
      return response.data
    } catch (error) {
      console.error('Error archiving audit logs:', error)
      throw error
    }
  }

  /**
   * Get audit log compliance report
   */
  static async getAuditLogComplianceReport(filters?: AuditFilters): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/compliance-report`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit log compliance report:', error)
      throw error
    }
  }

  /**
   * Get audit log security report
   */
  static async getAuditLogSecurityReport(filters?: AuditFilters): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/security-report`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit log security report:', error)
      throw error
    }
  }

  /**
   * Get audit log performance metrics
   */
  static async getAuditLogPerformanceMetrics(filters?: AuditFilters): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/performance-metrics`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit log performance metrics:', error)
      throw error
    }
  }

  /**
   * Get audit log dashboard data
   */
  static async getAuditLogDashboard(filters?: AuditFilters): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.AUDIT_LOGS}/dashboard`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching audit log dashboard:', error)
      throw error
    }
  }
}

export default AuditApiService
