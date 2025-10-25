/**
 * Admin Dashboard Hook
 * Custom hook for admin dashboard data management
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect } from 'react'
import { AdminApiService } from '../../services/admin/adminApiService'
import type { AdminDashboard, AdminStats } from '../../types/models/admin.types'

export interface UseAdminDashboardOptions {
  autoFetch?: boolean
  refreshInterval?: number
}

export interface UseAdminDashboardReturn {
  // State
  dashboard: AdminDashboard | null
  stats: AdminStats | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null

  // Actions
  fetchDashboard: () => Promise<void>
  fetchStats: (filters?: any) => Promise<void>
  refresh: () => Promise<void>
  clearError: () => void
}

export function useAdminDashboard(options: UseAdminDashboardOptions = {}): UseAdminDashboardReturn {
  const { autoFetch = true, refreshInterval } = options

  // State
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Fetch dashboard data
  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const dashboardData = await AdminApiService.getAdminDashboard()
      setDashboard(dashboardData)
      setLastUpdated(new Date())
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data'
      setError(errorMessage)
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch stats
  const fetchStats = useCallback(async (filters?: any) => {
    try {
      setLoading(true)
      setError(null)

      const statsData = await AdminApiService.getAdminStats(filters)
      setStats(statsData)
      setLastUpdated(new Date())
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stats'
      setError(errorMessage)
      console.error('Error fetching stats:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Refresh all data
  const refresh = useCallback(async () => {
    await Promise.all([
      fetchDashboard(),
      fetchStats()
    ])
  }, [fetchDashboard, fetchStats])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      refresh()
    }
  }, [autoFetch, refresh])

  // Auto-refresh interval
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(() => {
        refresh()
      }, refreshInterval)

      return () => clearInterval(interval)
    }
  }, [refreshInterval, refresh])

  return {
    // State
    dashboard,
    stats,
    loading,
    error,
    lastUpdated,

    // Actions
    fetchDashboard,
    fetchStats,
    refresh,
    clearError
  }
}

export default useAdminDashboard
