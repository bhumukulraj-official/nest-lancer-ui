/**
 * Register Form Component
 * User registration form with email, password, and profile information
 * Includes comprehensive validation, password strength, and terms acceptance
 */

import { FC, useState } from 'react'
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
  LinearProgress,
} from '@mui/material'
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { LoadingButton } from '@/components/shared/Button'
import { useAuth } from '@/hooks/auth/useAuth'

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface RegisterFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const RegisterForm: FC<RegisterFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { register, isLoading, error, clearError } = useAuth()
  
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({})

  // Password strength calculation
  const getPasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 6) strength += 20
    if (password.length >= 8) strength += 20
    if (/[a-z]/.test(password)) strength += 20
    if (/[A-Z]/.test(password)) strength += 20
    if (/[0-9]/.test(password)) strength += 10
    if (/[^A-Za-z0-9]/.test(password)) strength += 10
    return Math.min(strength, 100)
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'error'
    if (passwordStrength < 70) return 'warning'
    return 'success'
  }

  const getStrengthText = () => {
    if (passwordStrength < 40) return 'Weak'
    if (passwordStrength < 70) return 'Medium'
    return 'Strong'
  }

  // Form validation
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof RegisterFormData, string>> = {}
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    
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
    } else if (passwordStrength < 40) {
      errors.password = 'Password is too weak. Include uppercase, lowercase, numbers, and special characters'
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    // Terms acceptance validation
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions'
    }
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle input changes
  const handleInputChange = (field: keyof RegisterFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'acceptTerms' ? event.target.checked : event.target.value
    
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
      await register({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        acceptTerms: formData.acceptTerms,
      })
      onSuccess?.()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed'
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

        {/* Full Name Field */}
        <TextField
          fullWidth
          label="Full Name"
          value={formData.name}
          onChange={handleInputChange('name')}
          error={!!fieldErrors.name}
          helperText={fieldErrors.name}
          disabled={isLoading}
          autoComplete="name"
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="action" />
              </InputAdornment>
            ),
          }}
        />

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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Password Field */}
        <Box>
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange('password')}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
            disabled={isLoading}
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
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={passwordStrength}
                  color={getStrengthColor() as any}
                  sx={{ flex: 1, height: 6, borderRadius: 3 }}
                />
                <Typography variant="caption" color={`${getStrengthColor()}.main`}>
                  {getStrengthText()}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Confirm Password Field */}
        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          error={!!fieldErrors.confirmPassword}
          helperText={fieldErrors.confirmPassword}
          disabled={isLoading}
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

        {/* Terms and Conditions */}
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.acceptTerms}
                onChange={handleInputChange('acceptTerms')}
                disabled={isLoading}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <Link
                  component={RouterLink}
                  to="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link
                  component={RouterLink}
                  to="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Link>
              </Typography>
            }
          />
          {fieldErrors.acceptTerms && (
            <Typography variant="caption" color="error.main" sx={{ ml: 4 }}>
              {fieldErrors.acceptTerms}
            </Typography>
          )}
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
          Create Account
        </LoadingButton>

        {/* Login Link */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/auth/login"
              variant="body2"
              sx={{ 
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default RegisterForm
