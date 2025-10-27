/**
 * Spinner Component
 * Loading spinner with size variants for different contexts
 * Uses Material-UI CircularProgress with customizable colors and animation
 */

import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
} from '@mui/material'
import { FC } from 'react'

export type SpinnerSize = 'small' | 'medium' | 'large' | number

interface SpinnerProps {
  size?: SpinnerSize
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit'
  thickness?: number
  label?: string
  centered?: boolean
  overlay?: boolean
  fullscreen?: boolean
  className?: string
}

const Spinner: FC<SpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  thickness = 3.6,
  label,
  centered = false,
  overlay = false,
  fullscreen = false,
  className,
}) => {
  const theme = useTheme()
  
  // Convert size to pixel values
  const getSpinnerSize = (size: SpinnerSize): number => {
    if (typeof size === 'number') return size
    
    switch (size) {
      case 'small':
        return 20
      case 'medium':
        return 40
      case 'large':
        return 60
      default:
        return 40
    }
  }
  
  const spinnerSize = getSpinnerSize(size)
  
  const spinner = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: label ? 1 : 0,
      }}
    >
      <CircularProgress
        size={spinnerSize}
        thickness={thickness}
        color={color}
        sx={{
          animationDuration: '0.8s',
        }}
      />
      
      {label && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: spinnerSize < 30 ? '0.75rem' : '0.875rem',
            textAlign: 'center',
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  )
  
  // Fullscreen overlay
  if (fullscreen) {
    return (
      <Box
        className={className}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(2px)',
          zIndex: theme.zIndex.modal + 1,
        }}
      >
        {spinner}
      </Box>
    )
  }
  
  // Overlay (relative to parent)
  if (overlay) {
    return (
      <Box
        className={className}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(1px)',
          zIndex: 1,
        }}
      >
        {spinner}
      </Box>
    )
  }
  
  // Centered spinner
  if (centered) {
    return (
      <Box
        className={className}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          py: 4,
        }}
      >
        {spinner}
      </Box>
    )
  }
  
  // Default inline spinner
  return (
    <Box className={className} sx={{ display: 'inline-flex' }}>
      {spinner}
    </Box>
  )
}

export default Spinner
