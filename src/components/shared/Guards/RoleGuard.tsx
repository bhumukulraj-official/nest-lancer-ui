/**
 * Role Guard Component
 * Higher-order component that checks user roles
 * Renders content based on user role permissions
 */

import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { Block, ArrowBack } from '@mui/icons-material'
import { useAuth } from '@/hooks/auth/useAuth'

export interface RoleGuardProps {
  children: ReactNode
  allowedRoles: ('user' | 'admin')[]
  fallbackPath?: string
  showAccessDenied?: boolean
}

export const RoleGuard: FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallbackPath = '/app/dashboard',
  showAccessDenied = true,
}) => {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  // If not authenticated, don't handle here (let AuthGuard handle)
  if (!isAuthenticated || !user) {
    return null
  }

  // Check if user has required role
  const hasRequiredRole = allowedRoles.includes(user.role)

  // If user doesn't have required role
  if (!hasRequiredRole) {
    // Show access denied page
    if (showAccessDenied) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            px: 3,
          }}
        >
          <Block
            sx={{
              fontSize: 64,
              color: 'error.main',
              mb: 2,
            }}
          />
          
          <Typography variant="h4" gutterBottom color="error.main">
            Access Denied
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            You don't have permission to access this page.
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            Required role: {allowedRoles.join(' or ')}
            <br />
            Your role: {user.role}
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => window.history.back()}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Box>
      )
    }

    // Redirect to fallback path
    return (
      <Navigate
        to={fallbackPath}
        state={{
          error: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
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
 * Admin Guard Component
 * Convenience wrapper for admin-only access
 */
export const AdminGuard: FC<{ children: ReactNode; showAccessDenied?: boolean }> = ({ 
  children, 
  showAccessDenied = true 
}) => {
  return (
    <RoleGuard 
      allowedRoles={['admin']} 
      showAccessDenied={showAccessDenied}
    >
      {children}
    </RoleGuard>
  )
}

/**
 * User Guard Component
 * Convenience wrapper for user-role access
 */
export const UserGuard: FC<{ children: ReactNode; showAccessDenied?: boolean }> = ({ 
  children, 
  showAccessDenied = true 
}) => {
  return (
    <RoleGuard 
      allowedRoles={['user']} 
      showAccessDenied={showAccessDenied}
    >
      {children}
    </RoleGuard>
  )
}

export default RoleGuard
