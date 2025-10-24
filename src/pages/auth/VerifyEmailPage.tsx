/**
 * Verify Email Page
 * Email verification page with token validation
 * Handles email verification and redirects to login
 */

import { FC, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material'
import {
  CheckCircle,
  Error,
  Email,
} from '@mui/icons-material'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { LoadingButton } from '@/components/shared/Button'
import { authApiService } from '@/services/auth/authApiService'
import { useAuth } from '@/hooks/auth/useAuth'

type VerificationState = 'verifying' | 'success' | 'error' | 'expired'

export const VerifyEmailPage: FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isAuthenticated } = useAuth()
  
  const token = searchParams.get('token')
  
  const [verificationState, setVerificationState] = useState<VerificationState>('verifying')
  const [error, setError] = useState<string | null>(null)
  const [isResending, setIsResending] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Verify email token on mount
  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationState('error')
        setError('Invalid or missing verification token')
        return
      }

      try {
        await authApiService.verifyEmail({ token })
        setVerificationState('success')
      } catch (err: any) {
        const errorMessage = err?.message || 'Email verification failed'
        
        // Check if token is expired
        if (errorMessage.toLowerCase().includes('expired') || 
            errorMessage.toLowerCase().includes('invalid')) {
          setVerificationState('expired')
        } else {
          setVerificationState('error')
        }
        
        setError(errorMessage)
      }
    }

    verifyEmail()
  }, [token])

  // Handle resend verification email
  const handleResendVerification = async () => {
    setIsResending(true)
    setError(null)

    try {
      await authApiService.resendVerification()
      setError(null)
      // Show success message
      setVerificationState('success')
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to resend verification email'
      setError(errorMessage)
    } finally {
      setIsResending(false)
    }
  }

  // Verifying state
  if (verificationState === 'verifying') {
    return (
      <AuthLayout title="Verifying Email">
        <Box textAlign="center">
          <CircularProgress size={64} sx={{ mb: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            Verifying your email address...
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Please wait while we verify your email address.
          </Typography>
        </Box>
      </AuthLayout>
    )
  }

  // Success state
  if (verificationState === 'success') {
    return (
      <AuthLayout title="Email Verified">
        <Box textAlign="center">
          <CheckCircle 
            sx={{ 
              fontSize: 64, 
              color: 'success.main',
              mb: 3,
            }} 
          />
          
          <Typography variant="h5" gutterBottom color="success.main">
            Email Verified Successfully!
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Your email address has been verified. You can now sign in to your account.
          </Typography>
          
          <LoadingButton
            variant="contained"
            size="large"
            onClick={() => navigate('/auth/login')}
            sx={{ mt: 2 }}
          >
            Sign In Now
          </LoadingButton>
        </Box>
      </AuthLayout>
    )
  }

  // Expired token state
  if (verificationState === 'expired') {
    return (
      <AuthLayout title="Verification Link Expired">
        <Box textAlign="center">
          <Email 
            sx={{ 
              fontSize: 64, 
              color: 'warning.main',
              mb: 3,
            }} 
          />
          
          <Typography variant="h5" gutterBottom color="warning.main">
            Verification Link Expired
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            The verification link has expired or is no longer valid. 
            We can send you a new verification email.
          </Typography>
          
          <Stack spacing={2} sx={{ mt: 3 }}>
            <LoadingButton
              variant="contained"
              onClick={handleResendVerification}
              loading={isResending}
              disabled={isResending}
            >
              Send New Verification Email
            </LoadingButton>
            
            <Typography 
              variant="body2" 
              color="primary"
              sx={{ 
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => navigate('/auth/login')}
            >
              Back to Sign In
            </Typography>
          </Stack>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </AuthLayout>
    )
  }

  // Error state
  return (
    <AuthLayout title="Verification Failed">
      <Box textAlign="center">
        <Error 
          sx={{ 
            fontSize: 64, 
            color: 'error.main',
            mb: 3,
          }} 
        />
        
        <Typography variant="h5" gutterBottom color="error.main">
          Email Verification Failed
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          We couldn't verify your email address. This could be due to an invalid or expired link.
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Stack spacing={2} sx={{ mt: 3 }}>
          <LoadingButton
            variant="contained"
            onClick={handleResendVerification}
            loading={isResending}
            disabled={isResending}
          >
            Send New Verification Email
          </LoadingButton>
          
          <Typography 
            variant="body2" 
            color="primary"
            sx={{ 
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => navigate('/auth/login')}
          >
            Back to Sign In
          </Typography>
        </Stack>
      </Box>
    </AuthLayout>
  )
}

export default VerifyEmailPage
