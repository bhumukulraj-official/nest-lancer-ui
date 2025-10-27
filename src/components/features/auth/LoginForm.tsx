/**
 * Login Form Component
 * Authentication form for user login with email/password
 * Includes form validation, loading states, and error handling
 */

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import {
  Box,
  TextField,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Stack,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { FC, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { LoadingButton } from '@/components/shared/Button'
import { useAuth } from '@/hooks/auth/useAuth'

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface LoginFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const LoginForm: FC<LoginFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { login, isLoading, error, clearError } = useAuth()
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})

  // Form validation
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof LoginFormData, string>> = {}
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle input changes
  const handleInputChange = (field: keyof LoginFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'rememberMe' ? event.target.checked : event.target.value
    
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
      clearError()
    }
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      // Note: rememberMe is handled locally by the form for UI purposes
      // Backend doesn't support rememberMe field in login request
      await login(formData.email, formData.password)
      onSuccess?.()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      onError?.(errorMessage)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            onClose={clearError}
            sx={{ mb: 2 }}
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

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleInputChange('password')}
          error={!!fieldErrors.password}
          helperText={fieldErrors.password}
          disabled={isLoading}
          autoComplete="current-password"
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

        {/* Remember Me & Forgot Password */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rememberMe}
                onChange={handleInputChange('rememberMe')}
                disabled={isLoading}
                color="primary"
              />
            }
            label="Remember me"
          />
          
          <Link
            component={RouterLink}
            to="/auth/forgot-password"
            variant="body2"
            sx={{ textDecoration: 'none' }}
          >
            Forgot password?
          </Link>
        </Box>

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
          Sign In
        </LoadingButton>

        {/* Register Link */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link
              component={RouterLink}
              to="/auth/register"
              variant="body2"
              sx={{ 
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default LoginForm
