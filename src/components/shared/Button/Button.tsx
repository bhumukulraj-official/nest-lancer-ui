/**
 * Button Component
 * Enhanced button component with loading states, icons, and Material-UI integration
 * Supports various variants, sizes, and interactive states
 */

import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
  Box,
  alpha,
  useTheme,
} from '@mui/material'
import React, { forwardRef } from 'react'

// Extended button props
export interface ButtonProps extends Omit<MuiButtonProps, 'color' | 'variant'> {
  // Visual variants
  variant?: 'contained' | 'outlined' | 'text' | 'soft' | 'gradient'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit'
  
  // Loading state
  loading?: boolean
  loadingPosition?: 'start' | 'end' | 'center'
  
  // Icons
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  
  // Styling options
  rounded?: boolean
  elevation?: number
  ripple?: boolean
  
  // Layout
  block?: boolean // Full width
  
  // Custom variants
  ghost?: boolean
  minimal?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      size = 'medium',
      loading = false,
      loadingPosition = 'center',
      startIcon,
      endIcon,
      rounded = false,
      elevation,
      ripple = true,
      block = false,
      ghost = false,
      minimal = false,
      disabled,
      children,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    
    // Determine if button should be disabled
    const isDisabled = disabled || loading
    
    // Get loading indicator size based on button size
    const getLoadingSize = () => {
      switch (size) {
        case 'small':
          return 16
        case 'large':
          return 24
        case 'medium':
        default:
          return 20
      }
    }
    
    // Build loading indicator
    const loadingIndicator = (
      <CircularProgress
        size={getLoadingSize()}
        color="inherit"
        sx={{
          ...(loadingPosition === 'start' && { mr: 1 }),
          ...(loadingPosition === 'end' && { ml: 1 }),
        }}
      />
    )
    
    // Determine icons to show
    const getStartIcon = () => {
      if (loading && loadingPosition === 'start') return loadingIndicator
      return startIcon
    }
    
    const getEndIcon = () => {
      if (loading && loadingPosition === 'end') return loadingIndicator
      return endIcon
    }
    
    // Build button content
    const buttonContent = () => {
      if (loading && loadingPosition === 'center') {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loadingIndicator}
            {children && (
              <Box
                sx={{
                  ml: 1,
                  opacity: 0.7,
                }}
              >
                {children}
              </Box>
            )}
          </Box>
        )
      }
      
      return children
    }
    
    // Custom variant styles
    const getCustomVariantStyles = () => {
      const baseColor = theme.palette[color as keyof typeof theme.palette] as any
      
      if (ghost) {
        return {
          backgroundColor: 'transparent',
          color: baseColor?.main || theme.palette.primary.main,
          border: `1px solid ${alpha(baseColor?.main || theme.palette.primary.main, 0.3)}`,
          '&:hover': {
            backgroundColor: alpha(baseColor?.main || theme.palette.primary.main, 0.04),
            borderColor: baseColor?.main || theme.palette.primary.main,
          },
          '&:active': {
            backgroundColor: alpha(baseColor?.main || theme.palette.primary.main, 0.08),
          },
        }
      }
      
      if (minimal) {
        return {
          backgroundColor: 'transparent',
          color: baseColor?.main || theme.palette.primary.main,
          border: 'none',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: alpha(baseColor?.main || theme.palette.primary.main, 0.04),
          },
          '&:active': {
            backgroundColor: alpha(baseColor?.main || theme.palette.primary.main, 0.08),
          },
        }
      }
      
      if (variant === 'soft') {
        return {
          backgroundColor: alpha(baseColor?.main || theme.palette.primary.main, 0.08),
          color: baseColor?.main || theme.palette.primary.main,
          border: 'none',
          '&:hover': {
            backgroundColor: alpha(baseColor?.main || theme.palette.primary.main, 0.12),
          },
          '&:active': {
            backgroundColor: alpha(baseColor?.main || theme.palette.primary.main, 0.16),
          },
        }
      }
      
      if (variant === 'gradient') {
        const lightColor = baseColor?.light || theme.palette.primary.light
        const mainColor = baseColor?.main || theme.palette.primary.main
        
        return {
          background: `linear-gradient(45deg, ${mainColor} 30%, ${lightColor} 90%)`,
          color: theme.palette.getContrastText(mainColor),
          border: 'none',
          '&:hover': {
            background: `linear-gradient(45deg, ${alpha(mainColor, 0.9)} 30%, ${alpha(lightColor, 0.9)} 90%)`,
          },
        }
      }
      
      return {}
    }
    
    // Determine actual variant for MUI
    const getMuiVariant = (): 'contained' | 'outlined' | 'text' => {
      if (ghost || minimal || variant === 'soft' || variant === 'gradient') {
        return 'text'
      }
      return variant as 'contained' | 'outlined' | 'text'
    }
    
    return (
      <MuiButton
        ref={ref}
        variant={getMuiVariant()}
        color={color}
        size={size}
        disabled={isDisabled}
        startIcon={getStartIcon()}
        endIcon={getEndIcon()}
        disableRipple={!ripple}
        disableElevation={variant === 'text' || variant === 'outlined' || elevation === 0}
        sx={{
          // Base styles
          ...(block && { width: '100%' }),
          ...(rounded && { borderRadius: 2 }),
          
          // Custom variant styles
          ...getCustomVariantStyles(),
          
          // Elevation
          ...(elevation !== undefined && {
            boxShadow: theme.shadows[elevation],
            '&:hover': {
              boxShadow: theme.shadows[Math.min(elevation + 2, 24)],
            },
          }),
          
          // Loading state styles
          ...(loading && {
            pointerEvents: 'none',
            position: 'relative',
            ...(loadingPosition === 'center' && {
              '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                opacity: 0.3,
              },
            }),
          }),
          
          // Transition improvements
          transition: theme.transitions.create([
            'background-color',
            'box-shadow',
            'border-color',
            'color',
          ], {
            duration: theme.transitions.duration.short,
          }),
          
          // Focus styles
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
          },
          
          // Custom styles
          ...sx,
        }}
        {...props}
      >
        {buttonContent()}
      </MuiButton>
    )
  }
)

Button.displayName = 'Button'

export default Button
