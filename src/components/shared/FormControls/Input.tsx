/**
 * Input Component
 * Enhanced text input component with validation, icons, and Material-UI integration
 * Supports controlled/uncontrolled inputs with React Hook Form integration
 */

import {
  Visibility,
  VisibilityOff,
  Clear,
  Error as ErrorIcon,
  CheckCircle,
} from '@mui/icons-material'
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
  Box,
  alpha,
  useTheme,
} from '@mui/material'
import React, { forwardRef, useState } from 'react'

// Extended input props
export interface InputProps extends Omit<TextFieldProps, 'variant' | 'color'> {
  // Visual variants
  variant?: 'outlined' | 'filled' | 'standard'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  
  // Enhanced functionality
  clearable?: boolean
  showPasswordToggle?: boolean
  maxLength?: number
  minLength?: number
  
  // Validation states
  validationState?: 'error' | 'warning' | 'success' | null
  
  // Icons
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  
  // Loading state
  loading?: boolean
  
  // Additional styling
  rounded?: boolean
  compact?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'outlined',
      color = 'primary',
      type = 'text',
      clearable = false,
      showPasswordToggle = false,
      maxLength,
      minLength,
      validationState,
      startIcon,
      endIcon,
      loading = false,
      rounded = false,
      compact = false,
      error,
      helperText,
      value,
      onChange,
      sx,
      InputProps = {},
      inputProps = {},
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    const [showPassword, setShowPassword] = useState(false)
    
    // Determine actual input type
    const actualType = showPasswordToggle && type === 'password' 
      ? (showPassword ? 'text' : 'password')
      : type
    
    // Determine if field has value
    const hasValue = Boolean(value && value.toString().length > 0)
    
    // Determine validation color
    const getValidationColor = () => {
      if (error || validationState === 'error') return theme.palette.error.main
      if (validationState === 'warning') return theme.palette.warning.main
      if (validationState === 'success') return theme.palette.success.main
      return undefined
    }
    
    // Handle clear action
    const handleClear = (event: React.MouseEvent) => {
      event.stopPropagation()
      
      if (onChange) {
        // Create synthetic event for onChange
        const syntheticEvent = {
          target: { value: '' },
          currentTarget: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }
    
    // Toggle password visibility
    const handleTogglePassword = () => {
      setShowPassword(!showPassword)
    }
    
    // Build start adornment
    const startAdornment = startIcon ? (
      <InputAdornment position="start">
        {loading ? (
          <Box
            sx={{
              width: 20,
              height: 20,
              border: 2,
              borderRadius: '50%',
              borderColor: 'primary.main',
              borderTopColor: 'transparent',
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
        ) : (
          startIcon
        )}
      </InputAdornment>
    ) : undefined
    
    // Build end adornment
    const buildEndAdornment = () => {
      const elements: React.ReactNode[] = []
      
      // Validation icon
      if (validationState === 'error' || error) {
        elements.push(
          <ErrorIcon
            key="error"
            sx={{
              color: theme.palette.error.main,
              fontSize: 20,
              mr: 0.5,
            }}
          />
        )
      } else if (validationState === 'success' && hasValue) {
        elements.push(
          <CheckCircle
            key="success"
            sx={{
              color: theme.palette.success.main,
              fontSize: 20,
              mr: 0.5,
            }}
          />
        )
      }
      
      // Clear button
      if (clearable && hasValue && !props.disabled && !inputProps.readOnly) {
        elements.push(
          <IconButton
            key="clear"
            size="small"
            onClick={handleClear}
            sx={{
              p: 0.5,
              mr: 0.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.action.hover, 0.04),
              },
            }}
          >
            <Clear sx={{ fontSize: 18 }} />
          </IconButton>
        )
      }
      
      // Password toggle
      if (showPasswordToggle && type === 'password') {
        elements.push(
          <IconButton
            key="password-toggle"
            size="small"
            onClick={handleTogglePassword}
            sx={{
              p: 0.5,
              mr: 0.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.action.hover, 0.04),
              },
            }}
          >
            {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
          </IconButton>
        )
      }
      
      // Custom end icon
      if (endIcon) {
        elements.push(
          <Box key="end-icon" sx={{ mr: 0.5 }}>
            {endIcon}
          </Box>
        )
      }
      
      return elements.length > 0 ? (
        <InputAdornment position="end">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {elements}
          </Box>
        </InputAdornment>
      ) : undefined
    }
    
    // Character count helper text
    const buildHelperText = () => {
      const elements: React.ReactNode[] = []
      
      if (helperText) {
        elements.push(helperText)
      }
      
      if (maxLength && typeof value === 'string') {
        const count = value.length
        const countText = `${count}/${maxLength}`
        const isOverLimit = count > maxLength
        
        elements.push(
          <Box
            key="char-count"
            component="span"
            sx={{
              ml: 'auto',
              fontSize: '0.75rem',
              color: isOverLimit ? 'error.main' : 'text.secondary',
            }}
          >
            {countText}
          </Box>
        )
      }
      
      return elements.length > 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {elements}
        </Box>
      ) : undefined
    }
    
    return (
      <TextField
        ref={ref}
        variant={variant}
        color={color}
        type={actualType}
        value={value}
        onChange={onChange}
        error={error || validationState === 'error'}
        helperText={buildHelperText()}
        onFocus={(e) => {
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          props.onBlur?.(e)
        }}
        InputProps={{
          startAdornment,
          endAdornment: buildEndAdornment(),
          ...InputProps,
          sx: {
            ...(rounded && {
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }),
            ...(compact && {
              '& .MuiOutlinedInput-input': {
                py: 1,
              },
            }),
            ...InputProps.sx,
          },
        }}
        inputProps={{
          maxLength,
          minLength,
          ...inputProps,
        }}
        sx={{
          ...(validationState && {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: getValidationColor(),
              },
              '&.Mui-focused fieldset': {
                borderColor: getValidationColor(),
              },
            },
          }),
          ...sx,
        }}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
