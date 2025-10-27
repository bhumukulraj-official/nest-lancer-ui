/**
 * Avatar Component
 * Enhanced avatar component with Material-UI integration
 * Supports images, initials, icons, and status indicators
 */

import {
  Person,
  Group,
  Business,
} from '@mui/icons-material'
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
  AvatarGroup,
  Badge,
  Box,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import React, { forwardRef, useState } from 'react'

// Avatar size type
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number

// Avatar variant type
export type AvatarVariant = 'circular' | 'rounded' | 'square'

// Avatar status type
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

// Extended avatar props
export interface AvatarProps extends Omit<MuiAvatarProps, 'variant'> {
  // Basic props
  src?: string
  alt?: string
  name?: string
  
  // Variant and styling
  variant?: AvatarVariant
  size?: AvatarSize
  
  // Status indicator
  status?: AvatarStatus
  showStatus?: boolean
  
  // Content options
  icon?: React.ReactNode
  placeholder?: React.ReactNode
  
  // Styling options
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default'
  outlined?: boolean
  clickable?: boolean
  loading?: boolean
  
  // Hover effects
  hoverable?: boolean
  hoverContent?: React.ReactNode
  
  // Fallback handling
  onError?: () => void
  showFallback?: boolean
  
  // Events
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

// Avatar group props
export interface AvatarGroupProps {
  children: React.ReactElement<AvatarProps>[]
  max?: number
  total?: number
  spacing?: 'small' | 'medium' | number
  variant?: AvatarVariant
  size?: AvatarSize
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      variant = 'circular',
      size = 'md',
      status,
      showStatus = false,
      icon,
      placeholder,
      color = 'default',
      outlined = false,
      clickable = false,
      loading = false,
      hoverable = false,
      hoverContent,
      onError,
      showFallback = true,
      onClick,
      children,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    const [imageError, setImageError] = useState(false)
    
    // Get size values
    const getSizeValue = (): number => {
      if (typeof size === 'number') return size
      
      switch (size) {
        case 'xs':
          return 24
        case 'sm':
          return 32
        case 'lg':
          return 56
        case 'xl':
          return 80
        case 'md':
        default:
          return 40
      }
    }
    
    // Get font size for initials
    const getFontSize = (): string => {
      const sizeValue = getSizeValue()
      return `${sizeValue * 0.4}px`
    }
    
    // Generate initials from name
    const generateInitials = (fullName: string): string => {
      const names = fullName.trim().split(' ')
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase()
      } else if (names.length === 1) {
        return names[0][0].toUpperCase()
      }
      return '?'
    }
    
    // Get background color for initials
    const getBackgroundColor = () => {
      if (color === 'default' && name) {
        // Generate color based on name hash
        let hash = 0
        for (let i = 0; i < name.length; i++) {
          hash = name.charCodeAt(i) + ((hash << 5) - hash)
        }
        
        const hue = Math.abs(hash % 360)
        return `hsl(${hue}, 60%, 60%)`
      }
      
      if (color === 'default') {
        return theme.palette.grey[500]
      }
      
      const colorPalette = theme.palette[color as keyof typeof theme.palette] as any
      return colorPalette?.main || theme.palette.primary.main
    }
    
    // Get status indicator color
    const getStatusColor = () => {
      switch (status) {
        case 'online':
          return theme.palette.success.main
        case 'away':
          return theme.palette.warning.main
        case 'busy':
          return theme.palette.error.main
        case 'offline':
          return theme.palette.grey[500]
        default:
          return theme.palette.success.main
      }
    }
    
    // Handle image error
    const handleImageError = () => {
      setImageError(true)
      onError?.()
    }
    
    // Determine what to show inside avatar
    const getAvatarContent = () => {
      // Loading state
      if (loading) {
        return (
          <Box
            sx={{
              width: '60%',
              height: '60%',
              border: 2,
              borderRadius: '50%',
              borderColor: 'currentColor',
              borderTopColor: 'transparent',
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
        )
      }
      
      // Custom children
      if (children) return children
      
      // Image (if not errored and src provided)
      if (src && !imageError) return undefined // Let MUI Avatar handle image
      
      // Custom icon
      if (icon) return icon
      
      // Initials from name
      if (name) {
        return (
          <Typography
            variant="body1"
            sx={{
              fontSize: getFontSize(),
              fontWeight: 'medium',
              color: theme.palette.getContrastText(getBackgroundColor()),
            }}
          >
            {generateInitials(name)}
          </Typography>
        )
      }
      
      // Placeholder
      if (placeholder) return placeholder
      
      // Default fallback
      if (showFallback) {
        return <Person sx={{ fontSize: '60%' }} />
      }
      
      return null
    }
    
    const sizeValue = getSizeValue()
    const backgroundColor = getBackgroundColor()
    
    // Build the avatar
    const avatarElement = (
      <MuiAvatar
        ref={ref}
        src={!imageError ? src : undefined}
        alt={alt || name}
        variant={variant}
        onError={handleImageError}
        onClick={clickable ? onClick : undefined}
        sx={{
          width: sizeValue,
          height: sizeValue,
          fontSize: getFontSize(),
          backgroundColor,
          
          // Outlined style
          ...(outlined && {
            border: `2px solid ${backgroundColor}`,
            backgroundColor: 'transparent',
            color: backgroundColor,
          }),
          
          // Clickable style
          ...(clickable && {
            cursor: 'pointer',
            transition: theme.transitions.create(['transform', 'box-shadow'], {
              duration: theme.transitions.duration.short,
            }),
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: theme.shadows[4],
            },
          }),
          
          // Hoverable style
          ...(hoverable && {
            position: 'relative',
            overflow: 'visible',
            '&:hover .avatar-hover-content': {
              opacity: 1,
              visibility: 'visible',
            },
          }),
          
          // Loading style
          ...(loading && {
            color: alpha(theme.palette.primary.main, 0.6),
          }),
          
          ...sx,
        }}
        {...props}
      >
        {getAvatarContent()}
        
        {/* Hover content */}
        {hoverable && hoverContent && (
          <Box
            className="avatar-hover-content"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: alpha(theme.palette.common.black, 0.6),
              color: theme.palette.common.white,
              borderRadius: variant === 'circular' ? '50%' : variant === 'rounded' ? 1 : 0,
              opacity: 0,
              visibility: 'hidden',
              transition: theme.transitions.create(['opacity', 'visibility'], {
                duration: theme.transitions.duration.short,
              }),
            }}
          >
            {hoverContent}
          </Box>
        )}
      </MuiAvatar>
    )
    
    // Wrap with status badge if needed
    if (showStatus && status) {
      return (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: getStatusColor(),
              border: `2px solid ${theme.palette.background.paper}`,
              width: Math.max(12, sizeValue * 0.25),
              height: Math.max(12, sizeValue * 0.25),
              borderRadius: '50%',
            },
          }}
        >
          {avatarElement}
        </Badge>
      )
    }
    
    return avatarElement
  }
)

// Avatar Group Component
export const AvatarGroup_: React.FC<AvatarGroupProps> = ({
  children,
  max = 5,
  total,
  spacing = 'medium',
  variant = 'circular',
  size = 'md',
}) => {
  const getSpacing = () => {
    if (typeof spacing === 'number') return spacing
    switch (spacing) {
      case 'small':
        return -8
      case 'medium':
      default:
        return -16
    }
  }
  
  return (
    <AvatarGroup
      max={max}
      total={total}
      spacing={getSpacing()}
      sx={{
        '& .MuiAvatar-root': {
          border: (theme) => `2px solid ${theme.palette.background.paper}`,
        },
      }}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          variant,
          size,
          ...child.props,
        })
      )}
    </AvatarGroup>
  )
}

// Preset avatar variants
export const UserAvatar: React.FC<Omit<AvatarProps, 'icon'>> = (props) => (
  <Avatar {...props} icon={<Person />} />
)

export const GroupAvatar: React.FC<Omit<AvatarProps, 'icon'>> = (props) => (
  <Avatar {...props} icon={<Group />} />
)

export const BusinessAvatar: React.FC<Omit<AvatarProps, 'icon'>> = (props) => (
  <Avatar {...props} icon={<Business />} />
)

Avatar.displayName = 'Avatar'
AvatarGroup_.displayName = 'AvatarGroup'
UserAvatar.displayName = 'UserAvatar'
GroupAvatar.displayName = 'GroupAvatar'
BusinessAvatar.displayName = 'BusinessAvatar'

export { AvatarGroup_ as AvatarGroup }
export default Avatar
