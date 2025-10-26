/**
 * Sidebar Component
 * Collapsible sidebar navigation for user and admin dashboards
 * Includes nested navigation, role-based menu items, and responsive behavior
 */

import React, { FC, useState } from 'react'
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material'
import {
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

interface SidebarItem {
  label: string
  path?: string
  icon?: React.ReactNode
  badge?: string | number
  children?: SidebarItem[]
  divider?: boolean
  onClick?: () => void
}

interface SidebarProps {
  // Menu items
  items: SidebarItem[]
  
  // Behavior
  variant?: 'permanent' | 'persistent' | 'temporary'
  open?: boolean
  onClose?: () => void
  collapseOnMobile?: boolean
  
  // Styling
  width?: number
  collapsedWidth?: number
  showToolbar?: boolean
  toolbaTitle?: string
  
  // Callbacks
  onItemClick?: (item: SidebarItem) => void
}

export const Sidebar: FC<SidebarProps> = ({
  items,
  variant = 'persistent',
  open: controlledOpen,
  onClose,
  collapseOnMobile = true,
  width = 280,
  collapsedWidth = 64,
  showToolbar = false,
  toolbaTitle = 'Navigation',
  onItemClick,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()
  const navigate = useNavigate()
  
  const [internalOpen, setInternalOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const drawerWidth = open ? width : collapsedWidth
  
  const handleToggle = () => {
    if (controlledOpen === undefined) {
      setInternalOpen(!internalOpen)
    } else {
      onClose?.()
    }
  }
  
  const handleItemClick = (item: SidebarItem) => {
    if (item.children) {
      // Toggle expansion
      const newExpanded = new Set(expandedItems)
      if (newExpanded.has(item.label)) {
        newExpanded.delete(item.label)
      } else {
        newExpanded.add(item.label)
      }
      setExpandedItems(newExpanded)
    } else if (item.path) {
      // Navigate to path
      navigate(item.path)
      onItemClick?.(item)
      if (isMobile && variant !== 'permanent') {
        onClose?.()
      }
    } else if (item.onClick) {
      item.onClick()
      if (isMobile && variant !== 'permanent') {
        onClose?.()
      }
    }
  }
  
  const isItemActive = (item: SidebarItem): boolean => {
    if (item.path && location.pathname === item.path) {
      return true
    }
    if (item.children) {
      return item.children.some(child => isItemActive(child))
    }
    return false
  }
  
  const renderItem = (item: SidebarItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = hasChildren && expandedItems.has(item.label)
    const isActive = isItemActive(item)
    const isCollapsed = !open
    
    return (
      <React.Fragment key={item.label}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleItemClick(item)}
            selected={isActive}
            sx={{
              pl: 2 + depth * 2,
              minHeight: 48,
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                borderLeft: `3px solid ${theme.palette.primary.main}`,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.16),
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: isCollapsed ? 'auto' : 40,
                color: isActive ? 'primary.main' : 'text.secondary',
              }}
            >
              {item.icon}
            </ListItemIcon>
            
            {open && (
              <>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
                
                {hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
                
                {item.badge && (
                  <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                    {item.badge}
                  </Typography>
                )}
              </>
            )}
          </ListItemButton>
        </ListItem>
        
        {/* Divider */}
        {item.divider && <Divider />}
        
        {/* Children (nested items) */}
        {hasChildren && open && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => renderItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    )
  }
  
  const drawerContent = (
    <Box>
      {showToolbar && (
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: [1],
          }}
        >
          {open && (
            <Typography variant="h6" noWrap component="div" color="primary.main">
              {toolbaTitle}
            </Typography>
          )}
          
          <IconButton onClick={handleToggle} size="small">
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Toolbar>
      )}
      
      <Divider />
      
      <List sx={{ py: 1 }}>
        {items.map((item) => renderItem(item))}
      </List>
    </Box>
  )
  
  if (variant === 'permanent') {
    return (
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...(!open && {
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>
    )
  }
  
  if (variant === 'temporary') {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width,
          '& .MuiDrawer-paper': {
            width,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    )
  }
  
  // Persistent variant (default)
  return (
    <Drawer
      variant="persistent"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}

export default Sidebar

