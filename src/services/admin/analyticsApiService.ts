/**
 * Analytics API Service
 * Handles all analytics-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { ADMIN_ENDPOINTS } from '../api/endpoints'

export interface AnalyticsData {
  users: {
    total: number
    active: number
    new: number
    growth: number
  }
  projects: {
    total: number
    active: number
    completed: number
    growth: number
  }
  requests: {
    total: number
    pending: number
    approved: number
    rejected: number
    growth: number
  }
  quotes: {
    total: number
    pending: number
    accepted: number
    rejected: number
    growth: number
  }
  payments: {
    total: number
    pending: number
    completed: number
    failed: number
    growth: number
  }
  revenue: {
    total: number
    monthly: number
    growth: number
  }
  engagement: {
    pageViews: number
    uniqueVisitors: number
    bounceRate: number
    avgSessionDuration: number
  }
}

export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }>
}

export interface TimeSeriesData {
  date: string
  value: number
  label?: string
}

export class AnalyticsApiService {
  /**
   * Get dashboard analytics
   */
  static async getDashboardAnalytics(filters?: any): Promise<AnalyticsData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/dashboard`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching dashboard analytics:', error)
      throw error
    }
  }

  /**
   * Get user analytics
   */
  static async getUserAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/users`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching user analytics:', error)
      throw error
    }
  }

  /**
   * Get project analytics
   */
  static async getProjectAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/projects`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching project analytics:', error)
      throw error
    }
  }

  /**
   * Get request analytics
   */
  static async getRequestAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/requests`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching request analytics:', error)
      throw error
    }
  }

  /**
   * Get quote analytics
   */
  static async getQuoteAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/quotes`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching quote analytics:', error)
      throw error
    }
  }

  /**
   * Get payment analytics
   */
  static async getPaymentAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/payments`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching payment analytics:', error)
      throw error
    }
  }

  /**
   * Get revenue analytics
   */
  static async getRevenueAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/revenue`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching revenue analytics:', error)
      throw error
    }
  }

  /**
   * Get engagement analytics
   */
  static async getEngagementAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/engagement`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching engagement analytics:', error)
      throw error
    }
  }

  /**
   * Get time series data
   */
  static async getTimeSeriesData(metric: string, filters?: any): Promise<TimeSeriesData[]> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/time-series/${metric}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching time series data:', error)
      throw error
    }
  }

  /**
   * Get conversion funnel data
   */
  static async getConversionFunnel(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/conversion-funnel`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching conversion funnel:', error)
      throw error
    }
  }

  /**
   * Get geographic analytics
   */
  static async getGeographicAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/geographic`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching geographic analytics:', error)
      throw error
    }
  }

  /**
   * Get device analytics
   */
  static async getDeviceAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/devices`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching device analytics:', error)
      throw error
    }
  }

  /**
   * Get browser analytics
   */
  static async getBrowserAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/browsers`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching browser analytics:', error)
      throw error
    }
  }

  /**
   * Get traffic sources analytics
   */
  static async getTrafficSourcesAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/traffic-sources`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching traffic sources analytics:', error)
      throw error
    }
  }

  /**
   * Get page analytics
   */
  static async getPageAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/pages`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching page analytics:', error)
      throw error
    }
  }

  /**
   * Get search analytics
   */
  static async getSearchAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/search`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching search analytics:', error)
      throw error
    }
  }

  /**
   * Get performance analytics
   */
  static async getPerformanceAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/performance`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching performance analytics:', error)
      throw error
    }
  }

  /**
   * Get error analytics
   */
  static async getErrorAnalytics(filters?: any): Promise<ChartData> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/errors`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching error analytics:', error)
      throw error
    }
  }

  /**
   * Get custom analytics
   */
  static async getCustomAnalytics(query: string, filters?: any): Promise<any> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.ANALYTICS}/custom`, {
        query,
        filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching custom analytics:', error)
      throw error
    }
  }

  /**
   * Export analytics data
   */
  static async exportAnalyticsData(metric: string, format: 'csv' | 'excel' | 'json' = 'csv', filters?: any): Promise<Blob> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/export/${metric}`, {
        params: { format, ...filters },
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting analytics data:', error)
      throw error
    }
  }

  /**
   * Get real-time analytics
   */
  static async getRealTimeAnalytics(): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/real-time`)
      return response.data
    } catch (error) {
      console.error('Error fetching real-time analytics:', error)
      throw error
    }
  }

  /**
   * Get analytics summary
   */
  static async getAnalyticsSummary(filters?: any): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/summary`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching analytics summary:', error)
      throw error
    }
  }

  /**
   * Get analytics insights
   */
  static async getAnalyticsInsights(filters?: any): Promise<any> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/insights`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching analytics insights:', error)
      throw error
    }
  }

  /**
   * Get analytics alerts
   */
  static async getAnalyticsAlerts(): Promise<any[]> {
    try {
      const response = await apiClient.get(`${ADMIN_ENDPOINTS.ANALYTICS}/alerts`)
      return response.data
    } catch (error) {
      console.error('Error fetching analytics alerts:', error)
      throw error
    }
  }

  /**
   * Create analytics alert
   */
  static async createAnalyticsAlert(alertData: any): Promise<any> {
    try {
      const response = await apiClient.post(`${ADMIN_ENDPOINTS.ANALYTICS}/alerts`, alertData)
      return response.data
    } catch (error) {
      console.error('Error creating analytics alert:', error)
      throw error
    }
  }

  /**
   * Update analytics alert
   */
  static async updateAnalyticsAlert(alertId: string, alertData: any): Promise<any> {
    try {
      const response = await apiClient.put(`${ADMIN_ENDPOINTS.ANALYTICS}/alerts/${alertId}`, alertData)
      return response.data
    } catch (error) {
      console.error('Error updating analytics alert:', error)
      throw error
    }
  }

  /**
   * Delete analytics alert
   */
  static async deleteAnalyticsAlert(alertId: string): Promise<void> {
    try {
      await apiClient.delete(`${ADMIN_ENDPOINTS.ANALYTICS}/alerts/${alertId}`)
    } catch (error) {
      console.error('Error deleting analytics alert:', error)
      throw error
    }
  }
}

export default AnalyticsApiService
