/**
 * Authentication Hooks Index
 * Central export point for all authentication-related hooks
 */

export { 
  useAuth,
  useIsAuthenticated,
  useCurrentUser,
  useUserRole,
  useAuthLoading,
  useAuthError,
  type UseAuthReturn 
} from './useAuth'

// Re-export for convenience
export { useAuth as default } from './useAuth'
