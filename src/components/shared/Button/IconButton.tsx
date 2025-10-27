/**
 * IconButton Component
 * Enhanced icon button component with loading states and Material-UI integration
 * Supports tooltips, badges, and various interactive states
 */

import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Tooltip,
  Badge,
  CircularProgress,
  Box,
  alpha,
  useTheme,
} from '@mui/material'
import React, { forwardRef } from 'react'

// Extended icon button props
export interface IconButtonProps extends Omit<MuiIconButtonProps, 'color'> {
  // Visual variants
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit' | 'default'
  variant?: 'standard' | 'outlined' | 'contained' | 'soft'
  
  // Loading state
  loading?: boolean
  
  // Tooltip
  tooltip?: string
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
  
  // Badge
  badge?: string | number
  badgeColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  badgeVariant?: 'standard' | 'dot'
  showZeroBadge?: boolean
  
  // Styling options
  rounded?: boolean
  elevation?: number
  
  // Interactive states
  selected?: boolean
  toggle?: boolean
  
  // Accessibility
  'aria-label'?: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      color = 'default',
      variant = 'standard',
      size = 'medium',
      loading = false,
      tooltip,
      tooltipPlacement = 'top',
      badge,
      badgeColor = 'error',
      badgeVariant = 'standard',
      showZeroBadge = false,
      rounded = false,
      elevation,
      selected = false,
      toggle = false,
      disabled,
      children,
      sx,
      onClick,
      'aria-label': ariaLabel,
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
          return 14
        case 'large':
          return 22
        case 'medium':
        default:
          return 18
      }
    }
    
    // Handle toggle functionality
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event)
      }
    }
    
    // Get custom variant styles
    const getVariantStyles = () => {
      const baseColor = theme.palette[color as keyof typeof theme.palette] as any
      const colorValue = baseColor?.main || theme.palette.action.active
      
      switch (variant) {
        case 'outlined':
          return {
            border: `1px solid ${alpha(colorValue, 0.5)}`,
            '&:hover': {
              backgroundColor: alpha(colorValue, 0.04),
              borderColor: colorValue,
            },
          }
          
        case 'contained':
          return {
            backgroundColor: colorValue,
            color: theme.palette.getContrastText(colorValue),
            '&:hover': {
              backgroundColor: alpha(colorValue, 0.8),
            },
          }
          
        case 'soft':
          return {
            backgroundColor: alpha(colorValue, 0.08),
            color: colorValue,
            '&:hover': {
              backgroundColor: alpha(colorValue, 0.12),
            },
          }
          
        case 'standard':
        default:
          return {
            color: colorValue,
            '&:hover': {
              backgroundColor: alpha(colorValue, 0.04),
            },
          }
      }
    }
    
    // Button content with loading state
    const buttonContent = loading ? (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ opacity: 0.3 }}>
          {children}
        </Box>
        <CircularProgress
          size={getLoadingSize()}
          color="inherit"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Box>
    ) : (
      children
    )
    
    // Build the icon button
    const iconButton = (
      <MuiIconButton
        ref={ref}
        size={size}
        disabled={isDisabled}
        onClick={handleClick}
        aria-label={ariaLabel}
        sx={{
          // Base styles
          ...(rounded && { borderRadius: 2 }),
          
          // Variant styles
          ...getVariantStyles(),
          
          // Selected state
          ...(selected && {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.16),
            },
          }),
          
          // Elevation
          ...(elevation !== undefined && {
            boxShadow: theme.shadows[elevation],
            '&:hover': {
              boxShadow: theme.shadows[Math.min(elevation + 2, 24)],
            },
          }),
          
          // Loading state
          ...(loading && {
            pointerEvents: 'none',
          }),
          
          // Enhanced transitions
          transition: theme.transitions.create([
            'background-color',
            'box-shadow',
            'border-color',
            'color',
            'transform',
          ], {
            duration: theme.transitions.duration.short,
          }),
          
          // Focus styles
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
          },
          
          // Interactive hover effect
          '&:hover': {
            transform: 'scale(1.05)',
          },
          
          // Active state
          '&:active': {
            transform: 'scale(0.95)',
          },
          
          // Custom styles
          ...sx,
        }}
        {...props}
      >
        {buttonContent}
      </MuiIconButton>
    )
    
    // Wrap with badge if needed
    const badgeWrappedButton = badge !== undefined ? (
      <Badge
        badgeContent={badge}
        color={badgeColor}
        variant={badgeVariant}
        showZero={showZeroBadge}
        sx={{
          '& .MuiBadge-badge': {
            ...(badgeVariant === 'dot' && {
              minWidth: 6,
              height: 6,
              borderRadius: '50%',
            }),
          },
        }}
      >
        {iconButton}
      </Badge>
    ) : (
      iconButton
    )
    
    // Wrap with tooltip if needed
    if (tooltip) {
      return (
        <Tooltip
          title={tooltip}
          placement={tooltipPlacement}
          arrow
          enterDelay={500}
          leaveDelay={200}
        >
          <span>
            {badgeWrappedButton}
          </span>
        </Tooltip>
      )
    }
    
    return badgeWrappedButton
  }
)

// Preset icon button variants
export const PrimaryIconButton: React.FC<Omit<IconButtonProps, 'color'>> = (props) => (
  <IconButton {...props} color="primary" />
)

export const SecondaryIconButton: React.FC<Omit<IconButtonProps, 'color'>> = (props) => (
  <IconButton {...props} color="secondary" />
)

export const ErrorIconButton: React.FC<Omit<IconButtonProps, 'color'>> = (props) => (
  <IconButton {...props} color="error" />
)

export const SuccessIconButton: React.FC<Omit<IconButtonProps, 'color'>> = (props) => (
  <IconButton {...props} color="success" />
)

export const WarningIconButton: React.FC<Omit<IconButtonProps, 'color'>> = (props) => (
  <IconButton {...props} color="warning" />
)

IconButton.displayName = 'IconButton'
PrimaryIconButton.displayName = 'PrimaryIconButton'
SecondaryIconButton.displayName = 'SecondaryIconButton'
ErrorIconButton.displayName = 'ErrorIconButton'
SuccessIconButton.displayName = 'SuccessIconButton'
WarningIconButton.displayName = 'WarningIconButton'

export default IconButton
