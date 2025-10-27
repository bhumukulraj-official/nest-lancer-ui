/**
 * AdminGuard Component
 * UI-only guard for admin features
 * Performs UI redirects only; backend enforces security
 */

import React, { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useAuth } from '@/hooks/auth/useAuth'

interface AdminGuardProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
}

export const AdminGuard: FC<AdminGuardProps> = ({
  children,
  fallback,
  redirectTo = '/',
}) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'admin' || (user?.role as string) === 'super_admin'
  
  React.useEffect(() => {
    if (!isAdmin) {
      navigate(redirectTo)
    }
  }, [isAdmin, navigate, redirectTo])
  
  if (!isAdmin) {
    if (fallback) {
      return <>{fallback}</>
    }
    
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Access Denied
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You don't have permission to access this page.
        </Typography>
      </Box>
    )
  }
  
  return <>{children}</>
}

export default AdminGuard

