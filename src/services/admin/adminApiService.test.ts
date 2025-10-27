/**
 * Admin API Service Tests
 * Unit tests for the AdminApiService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'

import { apiClient } from '../api/client'

import AdminApiService from './adminApiService'

// Mock apiClient
vi.mock('../api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn()
  }
}))

// Mock endpoints
vi.mock('../api/endpoints', () => ({
  ADMIN_ENDPOINTS: {
    DASHBOARD: '/admin/dashboard',
    STATS: '/admin/stats',
    METRICS: '/admin/metrics',
    SYSTEM_INFO: '/admin/system/info',
    HEALTH_CHECK: '/admin/health'
  }
}))

describe('AdminApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAdminDashboard', () => {
    it('should fetch admin dashboard data', async () => {
      const mockDashboard = { totalUsers: 100, totalProjects: 50 }
      ;(apiClient.get as any).mockResolvedValue({ data: mockDashboard })

      const result = await AdminApiService.getAdminDashboard()

      expect(apiClient.get).toHaveBeenCalledWith('/admin/dashboard')
      expect(result).toEqual(mockDashboard)
    })

    it('should handle errors', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
      ;(apiClient.get as any).mockRejectedValue(new Error('Network error'))

      await expect(AdminApiService.getAdminDashboard()).rejects.toThrow('Network error')
      
      expect(consoleError).toHaveBeenCalled()
      consoleError.mockRestore()
    })
  })

  describe('getAdminStats', () => {
    it('should fetch admin stats with filters', async () => {
      const mockStats = { revenue: 10000, users: 500 }
      ;(apiClient.get as any).mockResolvedValue({ data: mockStats })

      const filters = { startDate: '2024-01-01', endDate: '2024-12-31' }
      const result = await AdminApiService.getAdminStats(filters)

      expect(apiClient.get).toHaveBeenCalledWith('/admin/stats', { params: filters })
      expect(result).toEqual(mockStats)
    })
  })

  describe('getSystemMetrics', () => {
    it('should fetch system metrics', async () => {
      const mockMetrics = { cpu: 75, memory: 60, disk: 50 }
      ;(apiClient.get as any).mockResolvedValue({ data: mockMetrics })

      const result = await AdminApiService.getSystemMetrics()

      expect(apiClient.get).toHaveBeenCalledWith('/admin/metrics')
      expect(result).toEqual(mockMetrics)
    })
  })

  describe('getSystemInfo', () => {
    it('should fetch system information', async () => {
      const mockInfo = { version: '1.0.0', uptime: 3600 }
      ;(apiClient.get as any).mockResolvedValue({ data: mockInfo })

      const result = await AdminApiService.getSystemInfo()

      expect(apiClient.get).toHaveBeenCalledWith('/admin/system/info')
      expect(result).toEqual(mockInfo)
    })
  })

  describe('getHealthCheck', () => {
    it('should fetch health check status', async () => {
      const mockHealth = { status: 'healthy', timestamp: new Date().toISOString() }
      ;(apiClient.get as any).mockResolvedValue({ data: mockHealth })

      const result = await AdminApiService.getSystemHealthCheck()

      expect(apiClient.get).toHaveBeenCalledWith('/admin/health')
      expect(result).toEqual(mockHealth)
    })
  })

  describe('Error Handling', () => {
    it('should log and rethrow errors', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
      const error = new Error('API Error')
      ;(apiClient.get as any).mockRejectedValue(error)

      await expect(AdminApiService.getAdminDashboard()).rejects.toThrow('API Error')
      expect(consoleError).toHaveBeenCalled()
      
      consoleError.mockRestore()
    })
  })
})

