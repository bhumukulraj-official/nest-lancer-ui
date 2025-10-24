/**
 * LoadingButton Component
 * Button component with integrated loading states and async operation support
 * Handles promises, loading indicators, and success/error states
 */

import React, { forwardRef, useState, useCallback } from 'react'
import {
  Button,
  ButtonProps,
  CircularProgress,
  Box,
  Fade,
  useTheme,
} from '@mui/material'
import {
  Check,
  Error as ErrorIcon,
} from '@mui/icons-material'

// Loading button props
export interface LoadingButtonProps extends Omit<ButtonProps, 'onClick'> {
  // Loading state
  loading?: boolean
  loadingPosition?: 'start' | 'end' | 'center'
  loadingIndicator?: React.ReactNode
  
  // Success/Error states
  showSuccessState?: boolean
  showErrorState?: boolean
  successDuration?: number
  errorDuration?: number
  
  // Success/Error icons
  successIcon?: React.ReactNode
  errorIcon?: React.ReactNode
  
  // Promise handling
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  onSuccess?: () => void
  onError?: (error: any) => void
  
  // Loading text
  loadingText?: string
  successText?: string
  errorText?: string
}

// Internal state type
type ButtonState = 'idle' | 'loading' | 'success' | 'error'

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      loading = false,
      loadingPosition = 'center',
      loadingIndicator,
      showSuccessState = true,
      showErrorState = true,
      successDuration = 2000,
      errorDuration = 3000,
      successIcon = <Check />,
      errorIcon = <ErrorIcon />,
      onClick,
      onSuccess,
      onError,
      loadingText,
      successText,
      errorText,
      children,
      disabled,
      startIcon,
      endIcon,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    const [internalState, setInternalState] = useState<ButtonState>('idle')
    
    // Determine current state
    const currentState = loading ? 'loading' : internalState
    const isDisabled = disabled || currentState !== 'idle'
    
    // Get loading indicator size
    const getLoadingSize = () => {
      switch (props.size) {
        case 'small':
          return 16
        case 'large':
          return 24
        case 'medium':
        default:
          return 20
      }
    }
    
    // Default loading indicator
    const defaultLoadingIndicator = (
      <CircularProgress
        size={getLoadingSize()}
        color="inherit"
        sx={{
          ...(loadingPosition === 'start' && { mr: 1 }),
          ...(loadingPosition === 'end' && { ml: 1 }),
        }}
      />
    )
    
    // Handle click with promise support
    const handleClick = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!onClick || isDisabled) return
      
      try {
        setInternalState('loading')
        
        const result = onClick(event)
        
        // Check if result is a promise
        if (result && typeof result.then === 'function') {
          await result
        }
        
        // Show success state
        if (showSuccessState) {
          setInternalState('success')
          onSuccess?.()
          
          setTimeout(() => {
            setInternalState('idle')
          }, successDuration)
        } else {
          setInternalState('idle')
          onSuccess?.()
        }
      } catch (error) {
        // Show error state
        if (showErrorState) {
          setInternalState('error')
          onError?.(error)
          
          setTimeout(() => {
            setInternalState('idle')
          }, errorDuration)
        } else {
          setInternalState('idle')
          onError?.(error)
        }
      }
    }, [
      onClick,
      isDisabled,
      showSuccessState,
      showErrorState,
      successDuration,
      errorDuration,
      onSuccess,
      onError,
    ])
    
    // Get current text
    const getCurrentText = () => {
      switch (currentState) {
        case 'loading':
          return loadingText || children
        case 'success':
          return successText || children
        case 'error':
          return errorText || children
        default:
          return children
      }
    }
    
    // Get current start icon
    const getCurrentStartIcon = () => {
      switch (currentState) {
        case 'loading':
          return loadingPosition === 'start' 
            ? (loadingIndicator || defaultLoadingIndicator)
            : startIcon
        case 'success':
          return showSuccessState ? successIcon : startIcon
        case 'error':
          return showErrorState ? errorIcon : startIcon
        default:
          return startIcon
      }
    }
    
    // Get current end icon
    const getCurrentEndIcon = () => {
      switch (currentState) {
        case 'loading':
          return loadingPosition === 'end'
            ? (loadingIndicator || defaultLoadingIndicator)
            : endIcon
        case 'success':
          return showSuccessState && !successIcon ? successIcon : endIcon
        case 'error':
          return showErrorState && !errorIcon ? errorIcon : endIcon
        default:
          return endIcon
      }
    }
    
    // Get button content for center loading
    const getButtonContent = () => {
      if (currentState === 'loading' && loadingPosition === 'center') {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loadingIndicator || defaultLoadingIndicator}
            {getCurrentText() && (
              <Box sx={{ ml: 1, opacity: 0.7 }}>
                {getCurrentText()}
              </Box>
            )}
          </Box>
        )
      }
      
      return getCurrentText()
    }
    
    // Get state-based styling
    const getStateStyles = () => {
      switch (currentState) {
        case 'success':
          return {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.success.dark,
            },
          }
        case 'error':
          return {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.error.dark,
            },
          }
        case 'loading':
          return {
            pointerEvents: 'none' as const,
          }
        default:
          return {}
      }
    }
    
    return (
      <Button
        ref={ref}
        disabled={isDisabled}
        onClick={handleClick}
        startIcon={getCurrentStartIcon()}
        endIcon={getCurrentEndIcon()}
        sx={{
          // State-based styles
          ...getStateStyles(),
          
          // Smooth transitions
          transition: theme.transitions.create([
            'background-color',
            'color',
            'transform',
          ], {
            duration: theme.transitions.duration.short,
          }),
          
          // Loading state styles
          ...(currentState === 'loading' && loadingPosition === 'center' && {
            '& .MuiButton-startIcon, & .MuiButton-endIcon': {
              opacity: 0.3,
            },
          }),
          
          // Success/Error animation
          ...(currentState === 'success' && {
            transform: 'scale(1.02)',
          }),
          
          // Custom styles
          ...sx,
        }}
        {...props}
      >
        <Fade in={true} key={currentState}>
          <span>
            {getButtonContent()}
          </span>
        </Fade>
      </Button>
    )
  }
)

// Preset loading button variants
export const PrimaryLoadingButton: React.FC<Omit<LoadingButtonProps, 'color'>> = (props) => (
  <LoadingButton {...props} color="primary" />
)

export const SecondaryLoadingButton: React.FC<Omit<LoadingButtonProps, 'color'>> = (props) => (
  <LoadingButton {...props} color="secondary" />
)

export const ErrorLoadingButton: React.FC<Omit<LoadingButtonProps, 'color'>> = (props) => (
  <LoadingButton {...props} color="error" />
)

export const SuccessLoadingButton: React.FC<Omit<LoadingButtonProps, 'color'>> = (props) => (
  <LoadingButton {...props} color="success" />
)

// Utility hook for async operations
export const useLoadingButton = (
  asyncOperation: () => Promise<void>,
  options: {
    onSuccess?: () => void
    onError?: (error: any) => void
    successDuration?: number
    errorDuration?: number
  } = {}
) => {
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle')
  
  const execute = useCallback(async () => {
    try {
      setLoading(true)
      setState('idle')
      
      await asyncOperation()
      
      setState('success')
      options.onSuccess?.()
      
      setTimeout(() => {
        setState('idle')
      }, options.successDuration || 2000)
    } catch (error) {
      setState('error')
      options.onError?.(error)
      
      setTimeout(() => {
        setState('idle')
      }, options.errorDuration || 3000)
    } finally {
      setLoading(false)
    }
  }, [asyncOperation, options])
  
  return {
    loading,
    state,
    execute,
    reset: () => {
      setLoading(false)
      setState('idle')
    },
  }
}

LoadingButton.displayName = 'LoadingButton'
PrimaryLoadingButton.displayName = 'PrimaryLoadingButton'
SecondaryLoadingButton.displayName = 'SecondaryLoadingButton'
ErrorLoadingButton.displayName = 'ErrorLoadingButton'
SuccessLoadingButton.displayName = 'SuccessLoadingButton'

export default LoadingButton
