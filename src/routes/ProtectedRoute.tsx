/**
 * Protected Route Component
 * Route wrapper that requires authentication and optional role-based access
 * Handles redirection for unauthenticated users and insufficient permissions
 */

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useAuth } from '@/hooks/auth/useAuth'

// Protected route props
export interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'user' | 'admin'
  fallbackPath?: string
}

/**
 * Protected Route Component
 * Wraps routes that require authentication
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallbackPath = '/auth/login',
}) => {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={48} />
        <Typography variant="body1" color="text.secondary">
          Checking authentication...
        </Typography>
      </Box>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate
        to={fallbackPath}
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    // User doesn't have required role
    return (
      <Navigate
        to="/app/dashboard"
        state={{
          error: `Access denied. ${requiredRole} role required.`,
          from: location.pathname,
        }}
        replace
      />
    )
  }

  // Render protected content
  return <>{children}</>
}

/**
 * Admin Route Component
 * Convenience wrapper for admin-only routes
 */
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="admin">
      {children}
    </ProtectedRoute>
  )
}

/**
 * User Route Component
 * Convenience wrapper for user-role routes
 */
export const UserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="user">
      {children}
    </ProtectedRoute>
  )
}

export default ProtectedRoute
