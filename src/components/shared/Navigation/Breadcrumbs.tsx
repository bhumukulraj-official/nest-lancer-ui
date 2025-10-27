/**
 * Breadcrumbs Component
 * Breadcrumb navigation component for deep navigation
 * Includes custom separators, clickable items, and responsive design
 */

import {
  Home,
  NavigateNext,
} from '@mui/icons-material'
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Link,
  Typography,
  useTheme,
  alpha,
} from '@mui/material'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  path?: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface BreadcrumbsProps extends Omit<MuiBreadcrumbsProps, 'children'> {
  // Items to display
  items: BreadcrumbItem[]
  
  // Configuration
  showHome?: boolean
  homePath?: string
  separator?: 'slash' | 'arrow' | 'dot' | React.ReactNode
  maxItems?: number
  expandText?: string
  
  // Styling
  variant?: 'contained' | 'text'
  dense?: boolean
  
  // Callbacks
  onItemClick?: (item: BreadcrumbItem, index: number) => void
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  items,
  showHome = true,
  homePath = '/',
  separator = 'arrow',
  maxItems = 8,
  expandText = 'Show path',
  variant = 'text',
  dense = false,
  onItemClick,
  ...props
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  
  const handleItemClick = (item: BreadcrumbItem, index: number) => {
    if (item.disabled) return
    
    onItemClick?.(item, index)
    
    if (item.path) {
      navigate(item.path)
    }
  }
  
  const getSeparator = () => {
    if (typeof separator === 'object') {
      return separator
    }
    
    switch (separator) {
      case 'slash':
        return '/'
      case 'dot':
        return '•'
      case 'arrow':
      default:
        return <NavigateNext fontSize="small" />
    }
  }
  
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Home', path: homePath, icon: <Home fontSize="small" />, disabled: false }, ...items]
    : items
  
  const displayItems = allItems.length > maxItems
    ? [
        allItems[0],
        ...allItems.slice(-maxItems + 1),
      ]
    : allItems
  
  const itemsBeforeCollapse = allItems.length > maxItems ? 1 : undefined
  const itemsAfterCollapse = allItems.length > maxItems ? maxItems - 1 : undefined
  
  return (
    <MuiBreadcrumbs
      separator={getSeparator()}
      maxItems={maxItems}
      itemsBeforeCollapse={itemsBeforeCollapse}
      itemsAfterCollapse={itemsAfterCollapse}
      aria-label="breadcrumb"
      sx={{
        ...(variant === 'contained' && {
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          px: 2,
          py: 1,
          borderRadius: 1,
        }),
        ...(dense && { py: 0.5 }),
      }}
      {...props}
    >
      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1
        
        if (isLast) {
          return (
            <Typography
              key={index}
              color="text.primary"
              variant={dense ? 'body2' : 'body1'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontWeight: 600,
              }}
            >
              {item.icon}
              {item.label}
            </Typography>
          )
        }
        
        if (item.path) {
          return (
            <Link
              key={index}
              component="button"
              underline="hover"
              color={item.disabled ? 'text.disabled' : 'inherit'}
              onClick={() => handleItemClick(item, index)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                color: item.disabled ? 'text.disabled' : 'inherit',
                '&:hover': {
                  color: item.disabled ? 'text.disabled' : 'primary.main',
                },
                variant: dense ? 'body2' : 'body1',
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        }
        
        return (
          <Typography
            key={index}
            color="text.secondary"
            variant={dense ? 'body2' : 'body1'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {item.icon}
            {item.label}
          </Typography>
        )
      })}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs

