/**
 * Reset Password Page
 * Password reset form with token validation
 * Handles password reset completion and redirects to login
 */

import {
  Lock,
  Visibility,
  VisibilityOff,
  CheckCircle,
} from '@mui/icons-material'
import {
  Box,
  TextField,
  Typography,
  Stack,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { LoadingButton } from '@/components/shared/Button'
import { useAuth } from '@/hooks/auth/useAuth'
import { authApiService } from '@/services/auth/authApiService'

interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

export const ResetPasswordPage: FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isAuthenticated } = useAuth()
  
  const token = searchParams.get('token')
  
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: '',
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<ResetPasswordFormData>>({})

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset.')
    }
  }, [token])

  // Form validation
  const validateForm = (): boolean => {
    const errors: Partial<ResetPasswordFormData> = {}
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle input changes
  const handleInputChange = (field: keyof ResetPasswordFormData) => (
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
    
    // Clear confirm password error when password changes
    if (field === 'password' && fieldErrors.confirmPassword) {
      setFieldErrors(prev => ({
        ...prev,
        confirmPassword: undefined,
      }))
    }
    
    // Clear general error
    if (error) {
      setError(null)
    }
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!token) {
      setError('Invalid reset token')
      return
    }
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await authApiService.resetPassword({
        token,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
      
      setIsSuccess(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset password'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Success state
  if (isSuccess) {
    return (
      <AuthLayout title="Password Reset Complete">
        <Box textAlign="center">
          <CheckCircle 
            sx={{ 
              fontSize: 64, 
              color: 'success.main',
              mb: 3,
            }} 
          />
          
          <Typography variant="h5" gutterBottom color="success.main">
            Password Reset Successful!
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Your password has been successfully reset. You can now sign in with your new password.
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

  // Form state
  return (
    <AuthLayout
      title="Set New Password"
      subtitle="Enter your new password below"
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {/* Token validation error */}
          {!token && (
            <Alert severity="error">
              Invalid or missing reset token. 
              <Typography 
                component="span" 
                sx={{ 
                  ml: 1,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
                onClick={() => navigate('/auth/forgot-password')}
              >
                Request a new password reset
              </Typography>
            </Alert>
          )}

          {/* Password Field */}
          <TextField
            fullWidth
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange('password')}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
            disabled={isLoading || !token}
            autoComplete="new-password"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={isLoading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password Field */}
          <TextField
            fullWidth
            label="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            error={!!fieldErrors.confirmPassword}
            helperText={fieldErrors.confirmPassword}
            disabled={isLoading || !token}
            autoComplete="new-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
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
            disabled={isLoading || !token}
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </LoadingButton>

          {/* Back to Login Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              color="primary"
              sx={{ 
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => navigate('/auth/login')}
            >
              ← Back to Sign In
            </Typography>
          </Box>
        </Stack>
      </Box>
    </AuthLayout>
  )
}

export default ResetPasswordPage
