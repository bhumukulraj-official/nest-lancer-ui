/**
 * Authentication Guard Component
 * Higher-order component that requires authentication
 * Redirects unauthenticated users to login page
 */

import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useAuth } from '@/hooks/auth/useAuth'

export interface AuthGuardProps {
  children: ReactNode
  fallbackPath?: string
  requireEmailVerification?: boolean
}

export const AuthGuard: FC<AuthGuardProps> = ({
  children,
  fallbackPath = '/auth/login',
  requireEmailVerification = false,
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

  // Check email verification if required
  if (requireEmailVerification && user && !user.emailVerified) {
    return (
      <Navigate
        to="/auth/verify-email"
        state={{ 
          from: location.pathname,
          message: 'Please verify your email address to continue'
        }}
        replace
      />
    )
  }

  // Render protected content
  return <>{children}</>
}

export default AuthGuard
