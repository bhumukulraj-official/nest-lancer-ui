/**
 * Admin Guard Hook
 * Custom hook for admin access control
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect } from 'react'
import { useAuth } from '../auth/useAuth'

export interface UseAdminGuardOptions {
  redirectTo?: string
  showError?: boolean
}

export interface UseAdminGuardReturn {
  // State
  isAdmin: boolean
  isLoading: boolean
  hasAccess: boolean
  error: string | null

  // Actions
  checkAccess: () => boolean
  clearError: () => void
}

export function useAdminGuard(options: UseAdminGuardOptions = {}): UseAdminGuardReturn {
  const { redirectTo = '/dashboard', showError = true } = options
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()

  // State
  const [isAdmin, setIsAdmin] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check admin access
  const checkAccess = useCallback((): boolean => {
    if (!isAuthenticated || !user) {
      setError('Authentication required')
      setHasAccess(false)
      setIsAdmin(false)
      return false
    }

    const userIsAdmin = user.role === 'admin' || user.role === 'super_admin'
    setIsAdmin(userIsAdmin)
    setHasAccess(userIsAdmin)

    if (!userIsAdmin) {
      const errorMessage = 'Admin access required'
      setError(errorMessage)
      
      if (showError) {
        console.warn(errorMessage)
      }
      
      return false
    }

    setError(null)
    return true
  }, [isAuthenticated, user, showError])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Check access when user or auth state changes
  useEffect(() => {
    if (!authLoading) {
      checkAccess()
    }
  }, [authLoading, checkAccess])

  // Redirect if no access
  useEffect(() => {
    if (!authLoading && isAuthenticated && !hasAccess && redirectTo) {
      // Note: In a real app, you would use router navigation here
      console.log(`Redirecting to ${redirectTo} - Admin access required`)
    }
  }, [authLoading, isAuthenticated, hasAccess, redirectTo])

  return {
    // State
    isAdmin,
    isLoading: authLoading,
    hasAccess,
    error,

    // Actions
    checkAccess,
    clearError
  }
}

export default useAdminGuard
