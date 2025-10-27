/**
 * Chip Component
 * Enhanced chip component with Material-UI integration
 * Supports tags, selections, filters, and interactive states
 */

import {
  Check,
  Add,
  Close,
} from '@mui/icons-material'
import {
  Chip as MuiChip,
  ChipProps as MuiChipProps,
  Avatar,
  Box,
  alpha,
  useTheme,
} from '@mui/material'
import React, { forwardRef } from 'react'

// Extended chip props
export interface ChipProps extends Omit<MuiChipProps, 'variant' | 'color' | 'icon' | 'avatar' | 'deleteIcon'> {
  // Visual variants
  variant?: 'filled' | 'outlined' | 'soft' | 'gradient'
  
  // Colors
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default'
  
  // Interactive states
  selected?: boolean
  selectable?: boolean
  
  // Content options
  avatar?: React.ReactNode
  icon?: React.ReactNode
  deleteIcon?: React.ReactNode
  
  // Styling options
  rounded?: boolean
  compact?: boolean
  bordered?: boolean
  
  // Special variants
  addable?: boolean
  countChip?: boolean
  statusChip?: boolean
  
  // Events
  onSelect?: () => void
  onAdd?: () => void
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      variant = 'filled',
      color = 'default',
      selected = false,
      selectable = false,
      avatar,
      icon,
      deleteIcon,
      rounded = false,
      compact = false,
      bordered = false,
      addable = false,
      countChip = false,
      statusChip = false,
      onSelect,
      onAdd,
      onClick,
      onDelete,
      label,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    
    // Get color values
    const getColorValues = () => {
      if (color === 'default') {
        return {
          main: theme.palette.grey[600],
          light: theme.palette.grey[100],
          dark: theme.palette.grey[800],
          contrastText: theme.palette.getContrastText(theme.palette.grey[600]),
        }
      }
      
      const colorPalette = theme.palette[color as keyof typeof theme.palette] as any
      return {
        main: colorPalette?.main || theme.palette.primary.main,
        light: colorPalette?.light || theme.palette.primary.light,
        dark: colorPalette?.dark || theme.palette.primary.dark,
        contrastText: colorPalette ? theme.palette.getContrastText(colorPalette.main) : theme.palette.primary.contrastText,
      }
    }
    
    // Get variant styles
    const getVariantStyles = () => {
      const colors = getColorValues()
      
      switch (variant) {
        case 'outlined':
          return {
            backgroundColor: 'transparent',
            color: colors.main,
            border: `1px solid ${colors.main}`,
            '&:hover': {
              backgroundColor: alpha(colors.main, 0.04),
            },
            '&:focus': {
              backgroundColor: alpha(colors.main, 0.08),
            },
          }
          
        case 'soft':
          return {
            backgroundColor: alpha(colors.main, 0.08),
            color: colors.main,
            border: 'none',
            '&:hover': {
              backgroundColor: alpha(colors.main, 0.12),
            },
            '&:focus': {
              backgroundColor: alpha(colors.main, 0.16),
            },
          }
          
        case 'gradient':
          return {
            background: `linear-gradient(45deg, ${colors.main} 30%, ${colors.light} 90%)`,
            color: colors.contrastText,
            border: 'none',
            '&:hover': {
              background: `linear-gradient(45deg, ${alpha(colors.main, 0.9)} 30%, ${alpha(colors.light, 0.9)} 90%)`,
            },
          }
          
        case 'filled':
        default:
          return {
            backgroundColor: colors.main,
            color: colors.contrastText,
            '&:hover': {
              backgroundColor: colors.dark,
            },
          }
      }
    }
    
    // Handle click events
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (addable && onAdd) {
        onAdd()
      } else if (selectable && onSelect) {
        onSelect()
      } else if (onClick) {
        onClick(event)
      }
    }
    
    // Build avatar/icon
    const buildAvatar = (): React.ReactElement | undefined => {
      if (avatar && React.isValidElement(avatar)) return avatar as React.ReactElement
      
      if (icon) {
        if (React.isValidElement(icon)) {
          return (
            <Avatar
              sx={{
                bgcolor: 'transparent !important',
                color: 'inherit',
                width: 20,
                height: 20,
              }}
            >
              {icon}
            </Avatar>
          )
        }
      }
      
      // Special icons for different states
      if (selected && selectable) {
        return (
          <Avatar
            sx={{
              bgcolor: 'transparent !important',
              color: 'inherit',
              width: 16,
              height: 16,
            }}
          >
            <Check sx={{ fontSize: 12 }} />
          </Avatar>
        )
      }
      
      if (addable) {
        return (
          <Avatar
            sx={{
              bgcolor: 'transparent !important',
              color: 'inherit',
              width: 16,
              height: 16,
            }}
          >
            <Add sx={{ fontSize: 12 }} />
          </Avatar>
        )
      }
      
      return undefined
    }
    
    // Build delete icon
    const buildDeleteIcon = (): React.ReactElement | undefined => {
      if (!onDelete) return undefined
      
      if (deleteIcon && React.isValidElement(deleteIcon)) return deleteIcon as React.ReactElement
      
      return <Close sx={{ fontSize: 16 }} />
    }
    
    // Get MUI variant
    const getMuiVariant = () => {
      if (variant === 'outlined') return 'outlined'
      return 'filled'
    }
    
    // Get MUI color
    const getMuiColor = () => {
      if (color === 'default') return undefined
      return color as 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
    }
    
    return (
      <MuiChip
        ref={ref}
        label={label}
        variant={getMuiVariant()}
        color={getMuiColor()}
        avatar={buildAvatar()}
        deleteIcon={buildDeleteIcon()}
        onClick={handleClick}
        onDelete={onDelete}
        clickable={selectable || addable || Boolean(onClick)}
        sx={{
          // Base styles
          transition: theme.transitions.create([
            'background-color',
            'box-shadow',
            'transform',
          ], {
            duration: theme.transitions.duration.short,
          }),
          
          // Compact mode
          ...(compact && {
            height: 24,
            fontSize: '0.75rem',
            '& .MuiChip-avatar': {
              width: 16,
              height: 16,
              fontSize: '0.625rem',
            },
            '& .MuiChip-deleteIcon': {
              width: 14,
              height: 14,
            },
          }),
          
          // Rounded style
          ...(rounded && {
            borderRadius: 3,
          }),
          
          // Bordered style
          ...(bordered && {
            border: `1px solid ${theme.palette.divider}`,
          }),
          
          // Selected state
          ...(selected && {
            transform: 'scale(1.02)',
            boxShadow: theme.shadows[2],
          }),
          
          // Hover effects for clickable chips
          ...((selectable || addable || onClick) && {
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: theme.shadows[2],
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }),
          
          // Custom variant styles
          ...(variant !== 'filled' && variant !== 'outlined' && getVariantStyles()),
          
          // Status chip specific styles
          ...(statusChip && {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '0.625rem',
            letterSpacing: '0.5px',
          }),
          
          // Count chip specific styles
          ...(countChip && {
            minWidth: 32,
            borderRadius: 16,
            fontWeight: 'bold',
            fontSize: '0.75rem',
          }),
          
          // Addable chip styles
          ...(addable && {
            borderStyle: 'dashed',
            '&:hover': {
              borderStyle: 'solid',
            },
          }),
          
          // Custom styles
          ...sx,
        }}
        {...props}
      />
    )
  }
)

// Preset chip variants
export const SelectableChip: React.FC<Omit<ChipProps, 'selectable'>> = (props) => (
  <Chip {...props} selectable />
)

export const StatusChip: React.FC<Omit<ChipProps, 'statusChip'>> = (props) => (
  <Chip {...props} statusChip variant="soft" />
)

export const CountChip: React.FC<Omit<ChipProps, 'countChip'>> = (props) => (
  <Chip {...props} countChip />
)

export const AddChip: React.FC<Omit<ChipProps, 'addable'>> = (props) => (
  <Chip {...props} addable variant="outlined" />
)

export const TagChip: React.FC<ChipProps> = (props) => (
  <Chip {...props} variant="soft" compact />
)

// Chip Group Component
export interface ChipGroupProps {
  children: React.ReactElement<ChipProps>[]
  spacing?: number
  wrap?: boolean
  selectable?: boolean
  multiple?: boolean
  value?: string | string[]
  onChange?: (value: string | string[]) => void
}

export const ChipGroup: React.FC<ChipGroupProps> = ({
  children,
  spacing = 1,
  wrap = true,
  selectable = false,
  multiple = false,
  value,
  onChange,
}) => {
  const handleChipSelect = (chipValue: string) => {
    if (!onChange) return
    
    if (multiple && Array.isArray(value)) {
      const newValue = value.includes(chipValue)
        ? value.filter(v => v !== chipValue)
        : [...value, chipValue]
      onChange(newValue)
    } else {
      onChange(chipValue === value ? '' : chipValue)
    }
  }
  
  return (
    <Box
      sx={{
        display: 'flex',
        gap: spacing,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        alignItems: 'center',
      }}
    >
      {React.Children.map(children, (child, index) => {
        const chipValue = child.props.label?.toString() || index.toString()
        const isSelected = multiple && Array.isArray(value)
          ? value.includes(chipValue)
          : value === chipValue
        
        return React.cloneElement(child, {
          selected: selectable ? isSelected : child.props.selected,
          selectable: selectable || child.props.selectable,
          onSelect: selectable
            ? () => handleChipSelect(chipValue)
            : child.props.onSelect,
          ...child.props,
        })
      })}
    </Box>
  )
}

Chip.displayName = 'Chip'
SelectableChip.displayName = 'SelectableChip'
StatusChip.displayName = 'StatusChip'
CountChip.displayName = 'CountChip'
AddChip.displayName = 'AddChip'
TagChip.displayName = 'TagChip'
ChipGroup.displayName = 'ChipGroup'

export default Chip
