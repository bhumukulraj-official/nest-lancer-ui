/**
 * Toast Component
 * Enhanced toast notification system using React Hot Toast
 * Provides success, error, warning, and info notifications
 */

import React from 'react'
import toast, { 
  Toaster, 
  ToastOptions, 
  Toast as HotToast,
  resolveValue,
} from 'react-hot-toast'
import {
  Box,
  Typography,
  IconButton,
  alpha,
  useTheme,
} from '@mui/material'
import {
  CheckCircle,
  Error,
  Warning,
  Info,
  Close,
} from '@mui/icons-material'

// Toast type
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading'

// Toast position
export type ToastPosition = 
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

// Enhanced toast options
export interface EnhancedToastOptions extends ToastOptions {
  type?: ToastType
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  persistent?: boolean
  showCloseButton?: boolean
}

// Custom toast component
const CustomToast: React.FC<{
  toast: HotToast
  message: string
  options?: EnhancedToastOptions
}> = ({ toast: t, message, options = {} }) => {
  const theme = useTheme()
  
  // Get type-specific settings
  const getTypeSettings = (type: ToastType = 'info') => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle />,
          color: theme.palette.success.main,
          backgroundColor: alpha(theme.palette.success.main, 0.1),
          borderColor: alpha(theme.palette.success.main, 0.3),
        }
      case 'error':
        return {
          icon: <Error />,
          color: theme.palette.error.main,
          backgroundColor: alpha(theme.palette.error.main, 0.1),
          borderColor: alpha(theme.palette.error.main, 0.3),
        }
      case 'warning':
        return {
          icon: <Warning />,
          color: theme.palette.warning.main,
          backgroundColor: alpha(theme.palette.warning.main, 0.1),
          borderColor: alpha(theme.palette.warning.main, 0.3),
        }
      case 'info':
        return {
          icon: <Info />,
          color: theme.palette.info.main,
          backgroundColor: alpha(theme.palette.info.main, 0.1),
          borderColor: alpha(theme.palette.info.main, 0.3),
        }
      case 'loading':
        return {
          icon: (
            <Box
              sx={{
                width: 20,
                height: 20,
                border: 2,
                borderRadius: '50%',
                borderColor: theme.palette.primary.main,
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
          ),
          color: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          borderColor: alpha(theme.palette.primary.main, 0.3),
        }
      default:
        return {
          icon: <Info />,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.divider,
        }
    }
  }
  
  const typeSettings = getTypeSettings(options.type)
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        p: 2,
        minWidth: 300,
        maxWidth: 500,
        backgroundColor:  typeSettings.backgroundColor,
        border: `1px solid ${typeSettings.borderColor}`,
        borderRadius: 1,
        boxShadow: theme.shadows[4],
        transform: `scale(${t.visible ? 1 : 0.95})`,
        transition: theme.transitions.create(['transform', 'opacity'], {
          duration: theme.transitions.duration.short,
        }),
        opacity: t.visible ? 1 : 0,
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          color: typeSettings.color,
          display: 'flex',
          alignItems: 'center',
          mt: options.title ? 0.25 : 0,
        }}
      >
        {typeSettings.icon}
      </Box>
      
      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {options.title && (
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'medium',
              color: 'text.primary',
              mb: options.description ? 0.5 : 0,
            }}
          >
            {options.title}
          </Typography>
        )}
        
        <Typography
          variant="body2"
          sx={{
            color: options.title ? 'text.secondary' : 'text.primary',
            wordBreak: 'break-word',
          }}
        >
          {resolveValue(message, t)}
        </Typography>
        
        {options.action && (
          <Box sx={{ mt: 1 }}>
            <Typography
              component="button"
              variant="body2"
              onClick={() => {
                options.action?.onClick()
                toast.dismiss(t.id)
              }}
              sx={{
                color: typeSettings.color,
                cursor: 'pointer',
                textDecoration: 'underline',
                border: 'none',
                background: 'none',
                p: 0,
                fontWeight: 'medium',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              {options.action.label}
            </Typography>
          </Box>
        )}
      </Box>
      
      {/* Close button */}
      {(options.showCloseButton !== false) && (
        <IconButton
          size="small"
          onClick={() => toast.dismiss(t.id)}
          sx={{
            color: 'text.secondary',
            mt: -0.5,
            mr: -0.5,
            '&:hover': {
              backgroundColor: alpha(theme.palette.action.hover, 0.04),
            },
          }}
        >
          <Close sx={{ fontSize: 18 }} />
        </IconButton>
      )}
    </Box>
  )
}

// Toast service class
class ToastService {
  // Success toast
  success(message: string, options: EnhancedToastOptions = {}): string {
    return toast.custom(
      (t) => (
        <CustomToast
          toast={t}
          message={message}
          options={{ ...options, type: 'success' }}
        />
      ),
      {
        duration: options.persistent ? Infinity : 4000,
        ...options,
      }
    )
  }
  
  // Error toast
  error(message: string, options: EnhancedToastOptions = {}): string {
    return toast.custom(
      (t) => (
        <CustomToast
          toast={t}
          message={message}
          options={{ ...options, type: 'error' }}
        />
      ),
      {
        duration: options.persistent ? Infinity : 6000,
        ...options,
      }
    )
  }
  
  // Warning toast
  warning(message: string, options: EnhancedToastOptions = {}): string {
    return toast.custom(
      (t) => (
        <CustomToast
          toast={t}
          message={message}
          options={{ ...options, type: 'warning' }}
        />
      ),
      {
        duration: options.persistent ? Infinity : 5000,
        ...options,
      }
    )
  }
  
  // Info toast
  info(message: string, options: EnhancedToastOptions = {}): string {
    return toast.custom(
      (t) => (
        <CustomToast
          toast={t}
          message={message}
          options={{ ...options, type: 'info' }}
        />
      ),
      {
        duration: options.persistent ? Infinity : 4000,
        ...options,
      }
    )
  }
  
  // Loading toast
  loading(message: string, options: EnhancedToastOptions = {}): string {
    return toast.custom(
      (t) => (
        <CustomToast
          toast={t}
          message={message}
          options={{ ...options, type: 'loading' }}
        />
      ),
      {
        duration: Infinity,
        ...options,
      }
    )
  }
  
  // Promise toast
  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: any) => string)
    },
    options: EnhancedToastOptions = {}
  ): Promise<T> {
    return toast.promise(
      promise,
      {
        loading: messages.loading,
        success: (data) => (
          <CustomToast
            toast={{ id: 'success', visible: true } as HotToast}
            message={typeof messages.success === 'function' ? messages.success(data) : messages.success}
            options={{ ...options, type: 'success' }}
          />
        ),
        error: (error) => (
          <CustomToast
            toast={{ id: 'error', visible: true } as HotToast}
            message={typeof messages.error === 'function' ? messages.error(error) : messages.error}
            options={{ ...options, type: 'error' }}
          />
        ),
      },
      options
    )
  }
  
  // Dismiss toast
  dismiss(toastId?: string): void {
    toast.dismiss(toastId)
  }
  
  // Dismiss all toasts
  dismissAll(): void {
    toast.dismiss()
  }
  
  // Remove toast
  remove(toastId?: string): void {
    toast.remove(toastId)
  }
  
  // Custom toast
  custom(jsx: React.ReactElement, options: ToastOptions = {}): string {
    return toast.custom(jsx, options)
  }
}

// Export toast service instance
export const toastService = new ToastService()

// Toast Provider Component
export interface ToastProviderProps {
  position?: ToastPosition
  maxToasts?: number
  containerStyle?: React.CSSProperties
  toastOptions?: ToastOptions
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  position = 'top-right',
  containerStyle,
  toastOptions,
}) => {
  return (
    <Toaster
      position={position}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
        },
        ...toastOptions,
      }}
      containerStyle={{
        top: 20,
        left: 20,
        bottom: 20,
        right: 20,
        ...containerStyle,
      }}
      gutter={12}
      reverseOrder={false}
    />
  )
}

// Hook for using toast
export const useToast = () => {
  return toastService
}

// Export default toast service
export default toastService

// Re-export for convenience
export { toast, toastService as Toast }
