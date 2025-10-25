/**
 * Webhook API Service
 * Handles all webhook-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { ADMIN_ENDPOINTS } from '../api/endpoints'

export interface WebhookLog {
  id: string
  webhookId: string
  event: string
  url: string
  method: string
  headers: Record<string, string>
  payload: any
  response: {
    status: number
    statusText: string
    headers: Record<string, string>
    body: any
  }
  duration: number
  timestamp: string
  status: 'success' | 'failure' | 'pending' | 'retrying'
  retryCount: number
  error?: string
}

export interface WebhookConfig {
  id: string
  name: string
  url: string
  events: string[]
  secret: string
  isActive: boolean
  retryPolicy: {
    maxRetries: number
    retryDelay: number
    backoffMultiplier: number
  }
  timeout: number
  headers: Record<string, string>
  createdAt: string
  updatedAt: string
}

export interface WebhookFilters {
  webhookId?: string
  event?: string
  status?: string
  startDate?: string
  endDate?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface WebhookStats {
  totalLogs: number
  successCount: number
  failureCount: number
  pendingCount: number
  retryingCount: number
  averageResponseTime: number
  totalWebhooks: number
  activeWebhooks: number
  inactiveWebhooks: number
  topEvents: Array<{ event: string; count: number }>
  topWebhooks: Array<{ webhookId: string; name: string; count: number }>
  dailyStats: Array<{ date: string; success: number; failure: number }>
}

export class WebhookApiService {
  /**
   * Get webhook configurations
   */
  static async getWebhookConfigs(): Promise<WebhookConfig[]> {
    try {
      const response = await apiClient.get(ADMIN_ENDPOINTS.WEBHOOK_CONFIGS)
      return response.data
    } catch (error) {
      console.error('Error fetching webhook configs:', error)
      throw error
    }
  }

  /**
   * Get a single webhook configuration by ID
   */
  static async getWebhookConfig(id: string): Promise<WebhookConfig> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_CONFIGS}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching webhook config:', error)
      throw error
    }
  }

  /**
   * Create webhook configuration
   */
  static async createWebhookConfig(config: Omit<WebhookConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<WebhookConfig> {
    try {
      const response = await apiClient.post(ADMIN_ENDPOINTS.WEBHOOK_CONFIGS, config)
      return response.data
    } catch (error) {
      console.error('Error creating webhook config:', error)
      throw error
    }
  }

  /**
   * Update webhook configuration
   */
  static async updateWebhookConfig(id: string, config: Partial<WebhookConfig>): Promise<WebhookConfig> {
    try {
      const response = await apiClient.put(`${ADMIN_ENDPOINTS.WEBHOOK_CONFIGS}/${id}`, config)
      return response.data
    } catch (error) {
      console.error('Error updating webhook config:', error)
      throw error
    }
  }

  /**
   * Delete webhook configuration
   */
  static async deleteWebhookConfig(id: string): Promise<void> {
    try {
      await apiClient.delete(`${ADMIN_ENDPOINTS.WEBHOOK_CONFIGS}/${id}`)
    } catch (error) {
      console.error('Error deleting webhook config:', error)
      throw error
    }
  }

  /**
   * Activate webhook configuration
   */
  static async activateWebhookConfig(id: string): Promise<WebhookConfig> {
    try {
      const response = await apiClient.patch(`${ADMIN_ENDPOINTS.WEBHOOK_CONFIGS}/${id}/activate`)
      return response.data
    } catch (error) {
      console.error('Error activating webhook config:', error)
      throw error
    }
  }

  /**
   * Deactivate webhook configuration
   */
  static async deactivateWebhookConfig(id: string): Promise<WebhookConfig> {
    try {
      const response = await apiClient.patch(`${ADMIN_ENDPOINTS.WEBHOOK_CONFIGS}/${id}/deactivate`)
      return response.data
    } catch (error) {
      console.error('Error deactivating webhook config:', error)
      throw error
    }
  }

  /**
   * Test webhook configuration
   */
  static async testWebhookConfig(id: string, testData?: any): Promise<WebhookLog> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.WEBHOOK_CONFIGS}/${id}/test`, testData)
      return response.data
    } catch (error) {
      console.error('Error testing webhook config:', error)
      throw error
    }
  }

  /**
   * Get webhook logs
   */
  static async getWebhookLogs(filters?: WebhookFilters): Promise<{ logs: WebhookLog[]; total: number; page: number; limit: number }> {
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
   * Get a single webhook log by ID
   */
  static async getWebhookLog(id: string): Promise<WebhookLog> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching webhook log:', error)
      throw error
    }
  }

  /**
   * Get webhook logs by webhook ID
   */
  static async getWebhookLogsByWebhookId(webhookId: string, filters?: WebhookFilters): Promise<{ logs: WebhookLog[]; total: number }> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/webhook/${webhookId}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching webhook logs by webhook ID:', error)
      throw error
    }
  }

  /**
   * Get webhook logs by event
   */
  static async getWebhookLogsByEvent(event: string, filters?: WebhookFilters): Promise<{ logs: WebhookLog[]; total: number }> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/event/${event}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching webhook logs by event:', error)
      throw error
    }
  }

  /**
   * Retry webhook log
   */
  static async retryWebhookLog(id: string): Promise<WebhookLog> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/${id}/retry`)
      return response.data
    } catch (error) {
      console.error('Error retrying webhook log:', error)
      throw error
    }
  }

  /**
   * Cancel webhook log
   */
  static async cancelWebhookLog(id: string): Promise<WebhookLog> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/${id}/cancel`)
      return response.data
    } catch (error) {
      console.error('Error canceling webhook log:', error)
      throw error
    }
  }

  /**
   * Get webhook statistics
   */
  static async getWebhookStats(filters?: WebhookFilters): Promise<WebhookStats> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/stats`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching webhook stats:', error)
      throw error
    }
  }

  /**
   * Search webhook logs
   */
  static async searchWebhookLogs(query: string, filters?: WebhookFilters): Promise<{ logs: WebhookLog[]; total: number }> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/search`, {
        params: { query, ...filters }
      })
      return response.data
    } catch (error) {
      console.error('Error searching webhook logs:', error)
      throw error
    }
  }

  /**
   * Get webhook log timeline
   */
  static async getWebhookLogTimeline(filters?: WebhookFilters): Promise<Array<{ date: string; logs: WebhookLog[] }>> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/timeline`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching webhook log timeline:', error)
      throw error
    }
  }

  /**
   * Export webhook logs
   */
  static async exportWebhookLogs(format: 'csv' | 'excel' | 'pdf' = 'csv', filters?: WebhookFilters): Promise<Blob> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/export`, {
        params: { format, ...filters },
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting webhook logs:', error)
      throw error
    }
  }

  /**
   * Get webhook monitoring dashboard
   */
  static async getWebhookMonitoringDashboard(filters?: WebhookFilters): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/monitoring`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching webhook monitoring dashboard:', error)
      throw error
    }
  }

  /**
   * Get webhook health status
   */
  static async getWebhookHealthStatus(): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/health`)
      return response.data
    } catch (error) {
      console.error('Error fetching webhook health status:', error)
      throw error
    }
  }

  /**
   * Get webhook events
   */
  static async getWebhookEvents(): Promise<string[]> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_CONFIGS}/events`)
      return response.data
    } catch (error) {
      console.error('Error fetching webhook events:', error)
      throw error
    }
  }

  /**
   * Get webhook templates
   */
  static async getWebhookTemplates(): Promise<any[]> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_CONFIGS}/templates`)
      return response.data
    } catch (error) {
      console.error('Error fetching webhook templates:', error)
      throw error
    }
  }

  /**
   * Create webhook template
   */
  static async createWebhookTemplate(template: any): Promise<any> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.WEBHOOK_CONFIGS}/templates`, template)
      return response.data
    } catch (error) {
      console.error('Error creating webhook template:', error)
      throw error
    }
  }

  /**
   * Update webhook template
   */
  static async updateWebhookTemplate(templateId: string, template: any): Promise<any> {
    try {
      const response = await apiClient.put(`${ADMIN_ENDPOINTS.WEBHOOK_CONFIGS}/templates/${templateId}`, template)
      return response.data
    } catch (error) {
      console.error('Error updating webhook template:', error)
      throw error
    }
  }

  /**
   * Delete webhook template
   */
  static async deleteWebhookTemplate(templateId: string): Promise<void> {
    try {
      await apiClient.delete(`${ADMIN_ENDPOINTS.WEBHOOK_CONFIGS}/templates/${templateId}`)
    } catch (error) {
      console.error('Error deleting webhook template:', error)
      throw error
    }
  }

  /**
   * Get webhook alerts
   */
  static async getWebhookAlerts(): Promise<any[]> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/alerts`)
      return response.data
    } catch (error) {
      console.error('Error fetching webhook alerts:', error)
      throw error
    }
  }

  /**
   * Create webhook alert
   */
  static async createWebhookAlert(alertData: any): Promise<any> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/alerts`, alertData)
      return response.data
    } catch (error) {
      console.error('Error creating webhook alert:', error)
      throw error
    }
  }

  /**
   * Update webhook alert
   */
  static async updateWebhookAlert(alertId: string, alertData: any): Promise<any> {
    try {
      const response = await apiClient.put(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/alerts/${alertId}`, alertData)
      return response.data
    } catch (error) {
      console.error('Error updating webhook alert:', error)
      throw error
    }
  }

  /**
   * Delete webhook alert
   */
  static async deleteWebhookAlert(alertId: string): Promise<void> {
    try {
      await apiClient.delete(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/alerts/${alertId}`)
    } catch (error) {
      console.error('Error deleting webhook alert:', error)
      throw error
    }
  }

  /**
   * Clean up old webhook logs
   */
  static async cleanupOldWebhookLogs(): Promise<{ deletedCount: number; freedSpace: number }> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/cleanup`)
      return response.data
    } catch (error) {
      console.error('Error cleaning up old webhook logs:', error)
      throw error
    }
  }

  /**
   * Get webhook performance metrics
   */
  static async getWebhookPerformanceMetrics(filters?: WebhookFilters): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.WEBHOOK_LOGS}/performance-metrics`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching webhook performance metrics:', error)
      throw error
    }
  }
}

export default WebhookApiService
