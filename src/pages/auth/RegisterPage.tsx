/**
 * Register Page
 * User registration page with form and email verification handling
 * Redirects authenticated users and handles registration success
 */

import { CheckCircle } from '@mui/icons-material'
import { Box, Typography, Alert } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { RegisterForm } from '@/components/features/auth'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { useAuth } from '@/hooks/auth/useAuth'

export const RegisterPage: FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Handle successful registration
  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true)
  }

  // Handle registration error (optional - form handles its own errors)
  const handleRegistrationError = (error: string) => {
    console.error('Registration error:', error)
    // Could show a toast notification here if needed
  }

  // Success state - show email verification message
  if (registrationSuccess) {
    return (
      <AuthLayout title="Check Your Email">
        <Box textAlign="center">
          <CheckCircle 
            sx={{ 
              fontSize: 64, 
              color: 'success.main',
              mb: 3,
            }} 
          />
          
          <Typography variant="h5" gutterBottom color="success.main">
            Account Created Successfully!
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            We've sent a verification email to your email address. 
            Please check your inbox and click the verification link to activate your account.
          </Typography>
          
          <Alert severity="info" sx={{ mt: 3, textAlign: 'left' }}>
            <Typography variant="body2">
              <strong>Next steps:</strong>
              <br />
              1. Check your email inbox (and spam folder)
              <br />
              2. Click the verification link in the email
              <br />
              3. Return to the login page to sign in
            </Typography>
          </Alert>
          
          <Box sx={{ mt: 3 }}>
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ 
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => navigate('/auth/login')}
            >
              Go to Login Page
            </Typography>
          </Box>
        </Box>
      </AuthLayout>
    )
  }

  // Registration form state
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join NestLancer today and start your freelancing journey"
    >
      <RegisterForm
        onSuccess={handleRegistrationSuccess}
        onError={handleRegistrationError}
      />
    </AuthLayout>
  )
}

export default RegisterPage
