/**
 * Card Component
 * Enhanced card component with Material-UI integration
 * Supports various layouts, actions, and interactive states
 */

import React, { forwardRef } from 'react'
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
  Box,
  IconButton,
  Divider,
  alpha,
  useTheme,
  Button,
} from '@mui/material'
import {
  Favorite,
  FavoriteBorder,
  Share,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material'

// Card component props
export interface CardProps extends Omit<MuiCardProps, 'variant' | 'title'> {
  // Header props
  title?: React.ReactNode
  subtitle?: React.ReactNode
  avatar?: React.ReactNode
  headerAction?: React.ReactNode
  
  // Media props
  image?: string
  imageHeight?: number | string
  imageAlt?: string
  video?: string
  media?: React.ReactNode
  
  // Content
  children?: React.ReactNode
  
  // Actions
  actions?: React.ReactNode
  primaryAction?: {
    label: string
    onClick: () => void
    variant?: 'text' | 'outlined' | 'contained'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    variant?: 'text' | 'outlined' | 'contained'
  }
  
  // Interactive features
  expandable?: boolean
  expanded?: boolean
  onExpandClick?: () => void
  expandContent?: React.ReactNode
  
  // Favorite/Like functionality
  favoritable?: boolean
  favorited?: boolean
  onFavoriteClick?: () => void
  
  // Share functionality
  shareable?: boolean
  onShareClick?: () => void
  
  // Visual variants
  variant?: 'elevation' | 'outlined' | 'filled' | 'glass'
  
  // Styling options
  hoverable?: boolean
  clickable?: boolean
  loading?: boolean
  
  // Layout
  horizontal?: boolean
  compact?: boolean
  
  // Colors
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      subtitle,
      avatar,
      headerAction,
      image,
      imageHeight = 200,
      imageAlt,
      video,
      media,
      children,
      actions,
      primaryAction,
      secondaryAction,
      expandable = false,
      expanded = false,
      onExpandClick,
      expandContent,
      favoritable = false,
      favorited = false,
      onFavoriteClick,
      shareable = false,
      onShareClick,
      variant = 'elevation',
      hoverable = false,
      clickable = false,
      loading = false,
      horizontal = false,
      compact = false,
      color = 'default',
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    
    // Get color palette
    const getColorStyles = () => {
      if (color === 'default') return {}
      
      const colorPalette = theme.palette[color as keyof typeof theme.palette] as any
      const colorValue = colorPalette?.main || theme.palette.primary.main
      
      return {
        borderColor: alpha(colorValue, 0.3),
        '& .MuiCardHeader-title': {
          color: colorValue,
        },
      }
    }
    
    // Get variant styles
    const getVariantStyles = () => {
      switch (variant) {
        case 'outlined':
          return {
            variant: 'outlined' as const,
            elevation: 0,
          }
        case 'filled':
          return {
            elevation: 0,
            backgroundColor: alpha(theme.palette.action.selected, 0.08),
          }
        case 'glass':
          return {
            elevation: 0,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }
        case 'elevation':
        default:
          return {
            elevation: 1,
          }
      }
    }
    
    // Build header actions
    const buildHeaderAction = () => {
      const actionElements: React.ReactNode[] = []
      
      if (favoritable) {
        actionElements.push(
          <IconButton
            key="favorite"
            size="small"
            onClick={onFavoriteClick}
            color={favorited ? 'error' : 'default'}
          >
            {favorited ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        )
      }
      
      if (shareable) {
        actionElements.push(
          <IconButton
            key="share"
            size="small"
            onClick={onShareClick}
          >
            <Share />
          </IconButton>
        )
      }
      
      if (expandable) {
        actionElements.push(
          <IconButton
            key="expand"
            size="small"
            onClick={onExpandClick}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )
      }
      
      if (headerAction) {
        actionElements.push(headerAction)
      }
      
      if (actionElements.length === 0) return undefined
      
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {actionElements}
        </Box>
      )
    }
    
    // Build card actions
    const buildCardActions = () => {
      const actionElements: React.ReactNode[] = []
      
      if (primaryAction) {
        actionElements.push(
          <Box key="primary" sx={{ ml: 'auto' }}>
            <Button
              variant={primaryAction.variant || 'contained'}
              color="primary"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          </Box>
        )
      }
      
      if (secondaryAction) {
        actionElements.push(
          <Box key="secondary">
            <Button
              variant={secondaryAction.variant || 'outlined'}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          </Box>
        )
      }
      
      if (actions) {
        actionElements.push(actions)
      }
      
      return actionElements.length > 0 ? actionElements : undefined
    }
    
    // Build media content
    const buildMedia = () => {
      if (media) return media
      
      if (image) {
        return (
          <CardMedia
            component="img"
            height={imageHeight}
            image={image}
            alt={imageAlt || title as string}
            sx={{
              objectFit: 'cover',
              ...(loading && {
                filter: 'blur(2px)',
                opacity: 0.7,
              }),
            }}
          />
        )
      }
      
      if (video) {
        return (
          <CardMedia
            component="video"
            height={imageHeight}
            src={video}
            controls
            sx={{
              objectFit: 'cover',
            }}
          />
        )
      }
      
      return null
    }
    
    const variantProps = getVariantStyles()
    const cardActions = buildCardActions()
    const mediaContent = buildMedia()
    
    return (
      <MuiCard
        ref={ref}
        {...variantProps}
        sx={{
          // Base styles
          ...(hoverable && {
            transition: theme.transitions.create(['box-shadow', 'transform'], {
              duration: theme.transitions.duration.short,
            }),
            '&:hover': {
              boxShadow: theme.shadows[4],
              transform: 'translateY(-2px)',
            },
          }),
          
          ...(clickable && {
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: alpha(theme.palette.action.hover, 0.04),
            },
          }),
          
          // Horizontal layout
          ...(horizontal && {
            display: 'flex',
            flexDirection: 'row',
          }),
          
          // Compact mode
          ...(compact && {
            '& .MuiCardContent-root': {
              padding: theme.spacing(1),
              '&:last-child': {
                paddingBottom: theme.spacing(1),
              },
            },
            '& .MuiCardHeader-root': {
              padding: theme.spacing(1),
            },
          }),
          
          // Loading state
          ...(loading && {
            opacity: 0.7,
            pointerEvents: 'none',
          }),
          
          // Color styles
          ...getColorStyles(),
          
          // Custom styles
          ...sx,
        }}
        {...props}
      >
        {/* Card Header */}
        {(title || subtitle || avatar) && (
          <CardHeader
            avatar={avatar}
            title={title}
            subheader={subtitle}
            action={buildHeaderAction()}
            sx={{
              ...(horizontal && {
                flex: '0 0 auto',
                width: '40%',
              }),
            }}
          />
        )}
        
        {/* Media Content */}
        {mediaContent && (
          <Box
            sx={{
              ...(horizontal && {
                flex: '0 0 auto',
                width: '40%',
              }),
            }}
          >
            {mediaContent}
          </Box>
        )}
        
        {/* Main Content */}
        {children && (
          <CardContent
            sx={{
              ...(horizontal && {
                flex: 1,
              }),
            }}
          >
            {children}
          </CardContent>
        )}
        
        {/* Expandable Content */}
        {expandable && expanded && expandContent && (
          <>
            <Divider />
            <CardContent>
              {expandContent}
            </CardContent>
          </>
        )}
        
        {/* Card Actions */}
        {cardActions && (
          <CardActions sx={{ justifyContent: 'space-between' }}>
            {cardActions}
          </CardActions>
        )}
      </MuiCard>
    )
  }
)

Card.displayName = 'Card'

export default Card
