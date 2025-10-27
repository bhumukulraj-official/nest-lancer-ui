/**
 * Badge Component
 * Enhanced badge component with Material-UI integration
 * Supports status indicators, counts, and custom styling
 */

import {
  Circle,
  CheckCircle,
  Error,
  Warning,
  Info,
  Cancel,
} from '@mui/icons-material'
import {
  Badge as MuiBadge,
  BadgeProps as MuiBadgeProps,
  Box,
  Chip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import React, { forwardRef } from 'react'

// Extended badge props
export interface BadgeProps extends Omit<MuiBadgeProps, 'variant' | 'color'> {
  // Badge variants
  variant?: 'standard' | 'dot' | 'chip' | 'status' | 'icon'
  
  // Colors
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default'
  
  // Status-specific props
  status?: 'online' | 'offline' | 'away' | 'busy' | 'success' | 'error' | 'warning' | 'info'
  
  // Content
  label?: string
  icon?: React.ReactNode
  
  // Styling options
  size?: 'small' | 'medium' | 'large'
  pulse?: boolean
  outlined?: boolean
  
  // Position (for dot/status badges)
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  
  // Standalone mode (without children)
  standalone?: boolean
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'standard',
      color = 'default',
      status,
      label,
      icon,
      size = 'medium',
      pulse = false,
      outlined = false,
      position = 'top-right',
      standalone = false,
      badgeContent,
      children,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    
    // Get color value based on status or color prop
    const getColorValue = () => {
      if (status) {
        switch (status) {
          case 'online':
          case 'success':
            return theme.palette.success.main
          case 'error':
            return theme.palette.error.main
          case 'warning':
            return theme.palette.warning.main
          case 'info':
            return theme.palette.info.main
          case 'away':
            return theme.palette.warning.main
          case 'busy':
            return theme.palette.error.main
          case 'offline':
            return theme.palette.grey[500]
          default:
            return theme.palette.primary.main
        }
      }
      
      if (color === 'default') {
        return theme.palette.grey[500]
      }
      
      const colorPalette = theme.palette[color as keyof typeof theme.palette] as any
      return colorPalette?.main || theme.palette.primary.main
    }
    
    // Get status icon
    const getStatusIcon = (): React.ReactElement => {
      if (icon && React.isValidElement(icon)) return icon as React.ReactElement
      
      switch (status) {
        case 'success':
          return <CheckCircle />
        case 'error':
          return <Error />
        case 'warning':
          return <Warning />
        case 'info':
          return <Info />
        case 'offline':
          return <Cancel />
        default:
          return <Circle />
      }
    }
    
    // Get size values
    const getSizeValues = () => {
      switch (size) {
        case 'small':
          return { width: 16, height: 16, fontSize: '0.625rem' }
        case 'large':
          return { width: 24, height: 24, fontSize: '0.875rem' }
        case 'medium':
        default:
          return { width: 20, height: 20, fontSize: '0.75rem' }
      }
    }
    
    // Get position styles
    const getPositionStyles = () => {
      const offset = 2
      
      switch (position) {
        case 'top-left':
          return {
            top: -offset,
            left: -offset,
            right: 'auto',
            bottom: 'auto',
          }
        case 'bottom-right':
          return {
            top: 'auto',
            left: 'auto',
            right: -offset,
            bottom: -offset,
          }
        case 'bottom-left':
          return {
            top: 'auto',
            left: -offset,
            right: 'auto',
            bottom: -offset,
          }
        case 'top-right':
        default:
          return {
            top: -offset,
            left: 'auto',
            right: -offset,
            bottom: 'auto',
          }
      }
    }
    
    // Render chip variant
    if (variant === 'chip') {
      return (
        <Chip
          label={label || badgeContent}
          icon={getStatusIcon()}
          size={size === 'large' ? 'medium' : 'small'}
          color={color}
          variant={outlined ? 'outlined' : 'filled'}
          sx={{
            ...(pulse && {
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { opacity: 1 },
                '50%': { opacity: 0.5 },
                '100%': { opacity: 1 },
              },
            }),
            ...sx,
          }}
          {...props}
        />
      )
    }
    
    // Render standalone status badge
    if (standalone) {
      const { width, height, fontSize } = getSizeValues()
      const colorValue = getColorValue()
      
      return (
        <Box
          ref={ref}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            ...sx,
          }}
        >
          {variant === 'icon' ? (
            <Box
              sx={{
                color: colorValue,
                display: 'flex',
                alignItems: 'center',
                fontSize: width,
              }}
            >
              {getStatusIcon()}
            </Box>
          ) : (
            <Box
              sx={{
                width,
                height,
                borderRadius: '50%',
                backgroundColor: colorValue,
                ...(outlined && {
                  backgroundColor: 'transparent',
                  border: `2px solid ${colorValue}`,
                }),
                ...(pulse && {
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)', opacity: 1 },
                    '50%': { transform: 'scale(1.1)', opacity: 0.7 },
                    '100%': { transform: 'scale(1)', opacity: 1 },
                  },
                }),
              }}
            />
          )}
          
          {label && (
            <Typography
              variant="caption"
              sx={{
                color: colorValue,
                fontSize,
                fontWeight: 'medium',
              }}
            >
              {label}
            </Typography>
          )}
        </Box>
      )
    }
    
    // Get badge content for MUI Badge
    const getBadgeContent = () => {
      if (variant === 'dot') return undefined
      if (variant === 'status') return undefined
      if (variant === 'icon') return getStatusIcon()
      return badgeContent
    }
    
    // Get MUI Badge variant
    const getMuiBadgeVariant = () => {
      if (variant === 'dot' || variant === 'status') return 'dot'
      return 'standard'
    }
    
    const { width, height, fontSize } = getSizeValues()
    const colorValue = getColorValue()
    
    return (
      <MuiBadge
        ref={ref}
        badgeContent={getBadgeContent()}
        variant={getMuiBadgeVariant()}
        color={color === 'default' ? undefined : color}
        sx={{
          '& .MuiBadge-badge': {
            ...(variant === 'dot' || variant === 'status') && {
              width,
              height,
              borderRadius: '50%',
              backgroundColor: colorValue,
              ...getPositionStyles(),
              ...(outlined && {
                backgroundColor: 'transparent',
                border: `2px solid ${colorValue}`,
                boxSizing: 'border-box',
              }),
            },
            
            ...(variant === 'icon' && {
              width: width + 4,
              height: height + 4,
              fontSize: width - 4,
              backgroundColor: outlined 
                ? 'transparent' 
                : alpha(colorValue, 0.1),
              color: colorValue,
              border: outlined ? `1px solid ${colorValue}` : 'none',
            }),
            
            ...(variant === 'standard' && {
              fontSize,
              minWidth: width,
              height: height,
              borderRadius: height / 2,
            }),
            
            ...(pulse && {
              animation: 'badgePulse 2s infinite',
              '@keyframes badgePulse': {
                '0%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(1.2)', opacity: 0.7 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }),
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </MuiBadge>
    )
  }
)

// Preset badge variants
export const StatusBadge: React.FC<Omit<BadgeProps, 'variant'> & { status: BadgeProps['status'] }> = (props) => (
  <Badge {...props} variant="status" />
)

export const CountBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge {...props} variant="standard" />
)

export const DotBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge {...props} variant="dot" />
)

export const IconBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge {...props} variant="icon" />
)

export const ChipBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge {...props} variant="chip" />
)

Badge.displayName = 'Badge'
StatusBadge.displayName = 'StatusBadge'
CountBadge.displayName = 'CountBadge'
DotBadge.displayName = 'DotBadge'
IconBadge.displayName = 'IconBadge'
ChipBadge.displayName = 'ChipBadge'

export default Badge
