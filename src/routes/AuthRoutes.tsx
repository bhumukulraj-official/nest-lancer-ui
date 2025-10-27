/**
 * Authentication Routes
 * Routing configuration for authentication pages
 * Handles login, register, password reset, and email verification
 */

import { Box, CircularProgress } from '@mui/material'
import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { useAuth } from '@/hooks/auth/useAuth'

// Auth Layout

// Auth Page Components (Lazy loaded)
const LoginPage = React.lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = React.lazy(() => import('@/pages/auth/RegisterPage'))
const ForgotPasswordPage = React.lazy(() => import('@/pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = React.lazy(() => import('@/pages/auth/ResetPasswordPage'))
const VerifyEmailPage = React.lazy(() => import('@/pages/auth/VerifyEmailPage'))

// Auth loading component
const AuthLoader: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
    }}
  >
    <CircularProgress size={40} />
  </Box>
)

/**
 * Authentication Routes Component
 * Handles all authentication-related routes
 */
export const AuthRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth()

  // Redirect authenticated users to dashboard
  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />
  }

  return (
    <AuthLayout>
      <Suspense fallback={<AuthLoader />}>
        <Routes>
          {/* Default auth route */}
          <Route index element={<Navigate to="/auth/login" replace />} />
          
          {/* Login */}
          <Route path="login" element={<LoginPage />} />
          
          {/* Register */}
          <Route path="register" element={<RegisterPage />} />
          
          {/* Forgot Password */}
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Reset Password */}
          <Route path="reset-password" element={<ResetPasswordPage />} />
          
          {/* Email Verification */}
          <Route path="verify-email" element={<VerifyEmailPage />} />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Suspense>
    </AuthLayout>
  )
}

export default AuthRoutes
