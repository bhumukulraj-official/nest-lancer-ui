/**
 * Admin Hooks Index
 * Central export point for all admin-related hooks
 */

export { useAdminGuard } from './useAdminGuard'
export { useAdminDashboard } from './useAdminDashboard'
export { useAdminUsers } from './useAdminUsers'

// Re-export types for convenience
export type {
  UseAdminGuardOptions,
  UseAdminGuardReturn
} from './useAdminGuard'

export type {
  UseAdminDashboardOptions,
  UseAdminDashboardReturn
} from './useAdminDashboard'

export type {
  UseAdminUsersOptions,
  UseAdminUsersReturn
} from './useAdminUsers'
