/**
 * Forgot Password Form Component
 * Form for requesting password reset email
 * Includes email validation and success state
 */

import {
  Email,
  CheckCircle,
} from '@mui/icons-material'
import {
  Box,
  TextField,
  Typography,
  Link,
  Stack,
  Alert,
  InputAdornment,
} from '@mui/material'
import { FC, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { LoadingButton } from '@/components/shared/Button'
import { authApiService } from '@/services/auth/authApiService'

interface ForgotPasswordFormData {
  email: string
}

export interface ForgotPasswordFormProps {
  onSuccess?: (email: string) => void
  onError?: (error: string) => void
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ForgotPasswordFormData, string>>>({})

  // Form validation
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ForgotPasswordFormData, string>> = {}
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle input changes
  const handleInputChange = (field: keyof ForgotPasswordFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: undefined,
      }))
    }
    
    // Clear general error
    if (error) {
      setError(null)
    }
    
    // Reset success state when user modifies email
    if (isSuccess) {
      setIsSuccess(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await authApiService.forgotPassword({
        email: formData.email,
      })
      
      setIsSuccess(true)
      onSuccess?.(formData.email)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset email'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle resend email
  const handleResend = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    setError(null)

    try {
      await authApiService.forgotPassword({
        email: formData.email,
      })
      
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend reset email'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Success state
  if (isSuccess) {
    return (
      <Box>
        <Stack spacing={3} alignItems="center" textAlign="center">
          <CheckCircle 
            sx={{ 
              fontSize: 64, 
              color: 'success.main',
              mb: 1,
            }} 
          />
          
          <Box>
            <Typography variant="h5" gutterBottom color="success.main">
              Check Your Email
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We've sent a password reset link to:
            </Typography>
            <Typography variant="body1" fontWeight={600} paragraph>
              {formData.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click the link in the email to reset your password. 
              If you don't see it, check your spam folder.
            </Typography>
          </Box>

          <Stack spacing={2} width="100%">
            <LoadingButton
              variant="outlined"
              onClick={handleResend}
              loading={isLoading}
              disabled={isLoading}
            >
              Resend Email
            </LoadingButton>
            
            <Typography variant="body2" color="text.secondary">
              <Link
                component={RouterLink}
                to="/auth/login"
                sx={{ textDecoration: 'none' }}
              >
                ← Back to Sign In
              </Link>
            </Typography>
          </Stack>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}
        </Stack>
      </Box>
    )
  }

  // Form state
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        <Box textAlign="center" mb={2}>
          <Typography variant="body1" color="text.secondary">
            Enter your email address and we'll send you a link to reset your password.
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {/* Email Field */}
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
          disabled={isLoading}
          autoComplete="email"
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Submit Button */}
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          loading={isLoading}
          disabled={isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          Send Reset Link
        </LoadingButton>

        {/* Back to Login Link */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            <Link
              component={RouterLink}
              to="/auth/login"
              variant="body2"
              sx={{ 
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              ← Back to Sign In
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default ForgotPasswordForm
