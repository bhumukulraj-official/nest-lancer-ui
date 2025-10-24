/**
 * Login Page
 * Main login page with authentication form and layout
 * Redirects authenticated users and handles login success
 */

import { FC, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { LoginForm } from '@/components/features/auth'
import { useAuth } from '@/hooks/auth/useAuth'

export const LoginPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  // Get redirect path from location state (set by ProtectedRoute)
  const from = (location.state as any)?.from || '/app/dashboard'

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  // Handle successful login
  const handleLoginSuccess = () => {
    navigate(from, { replace: true })
  }

  // Handle login error (optional - form handles its own errors)
  const handleLoginError = (error: string) => {
    console.error('Login error:', error)
    // Could show a toast notification here if needed
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your NestLancer account"
    >
      <LoginForm
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </AuthLayout>
  )
}

export default LoginPage
