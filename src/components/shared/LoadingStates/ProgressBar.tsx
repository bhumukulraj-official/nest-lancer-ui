/**
 * ProgressBar Component
 * Linear progress indicators for file uploads and process tracking
 * Includes determinate/indeterminate states and custom styling
 */

import {
  LinearProgress,
  LinearProgressProps,
  Box,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { FC } from 'react'

export interface ProgressBarProps extends LinearProgressProps {
  value?: number
  showValue?: boolean
  label?: string
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query'
  size?: 'small' | 'medium' | 'large'
}

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  showValue = true,
  label,
  color = 'primary',
  variant = 'determinate',
  size = 'medium',
  sx,
  ...props
}) => {
  const theme = useTheme()
  const height = size === 'small' ? 4 : size === 'large' ? 12 : 8
  
  return (
    <Box sx={{ width: '100%', ...sx }}>
      {(label || (showValue && variant === 'determinate')) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          {label && (
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
          )}
          {showValue && variant === 'determinate' && (
            <Typography variant="caption" color="text.secondary">
              {value || 0}%
            </Typography>
          )}
        </Box>
      )}
      
      <LinearProgress
        variant={variant}
        value={value}
        color={color}
        sx={{
          height,
          borderRadius: height / 2,
          backgroundColor: alpha(theme.palette[color].main, 0.1),
          '& .MuiLinearProgress-bar': {
            borderRadius: height / 2,
          },
        }}
        {...props}
      />
    </Box>
  )
}

export default ProgressBar

