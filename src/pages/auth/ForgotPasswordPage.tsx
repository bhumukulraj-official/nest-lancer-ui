/**
 * Forgot Password Page
 * Password reset request page with email form
 * Redirects authenticated users
 */

import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ForgotPasswordForm } from '@/components/features/auth'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { useAuth } from '@/hooks/auth/useAuth'

export const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Handle successful password reset request
  const handleResetSuccess = (email: string) => {
    console.log('Password reset sent to:', email)
    // Form handles success UI, no additional action needed
  }

  // Handle password reset error (optional - form handles its own errors)
  const handleResetError = (error: string) => {
    console.error('Password reset error:', error)
    // Could show a toast notification here if needed
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email to receive a password reset link"
    >
      <ForgotPasswordForm
        onSuccess={handleResetSuccess}
        onError={handleResetError}
      />
    </AuthLayout>
  )
}

export default ForgotPasswordPage
