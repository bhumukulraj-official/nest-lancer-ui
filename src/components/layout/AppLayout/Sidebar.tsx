/**
 * Sidebar Component
 * Collapsible sidebar navigation for desktop views
 * Provides navigation for authenticated users with role-based menu items
 */

import {
  Dashboard,
  Person,
  Work,
  RequestPage,
  Receipt,
  Payment,
  AdminPanelSettings,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Collapse,
  Avatar,
  IconButton,
  useTheme,
} from '@mui/material'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/auth/useAuth'

interface SidebarProps {
  width?: number
  collapsed?: boolean
  onToggleCollapse?: () => void
}

interface MenuItem {
  label: string
  icon: React.ReactElement
  path: string
  role?: string[]
  children?: MenuItem[]
}

const Sidebar: FC<SidebarProps> = ({
  width = 240,
  collapsed = false,
  onToggleCollapse,
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  
  const handleExpandToggle = (itemLabel: string) => {
    setExpandedItems(prev =>
      prev.includes(itemLabel)
        ? prev.filter(item => item !== itemLabel)
        : [...prev, itemLabel]
    )
  }
  
  // Navigation menu items based on user role
  const menuItems: MenuItem[] = [
    // User menu items
    {
      label: 'Dashboard',
      icon: <Dashboard />,
      path: '/app/dashboard',
      role: ['user', 'admin'],
    },
    {
      label: 'Profile',
      icon: <Person />,
      path: '/app/profile',
      role: ['user', 'admin'],
    },
    {
      label: 'Projects',
      icon: <Work />,
      path: '/app/projects',
      role: ['user', 'admin'],
    },
    {
      label: 'Requests',
      icon: <RequestPage />,
      path: '/app/requests',
      role: ['user', 'admin'],
    },
    {
      label: 'Quotes',
      icon: <Receipt />,
      path: '/app/quotes',
      role: ['user', 'admin'],
    },
    {
      label: 'Payments',
      icon: <Payment />,
      path: '/app/payments',
      role: ['user', 'admin'],
    },
    
    // Admin-only menu items
    {
      label: 'Admin Panel',
      icon: <AdminPanelSettings />,
      path: '/admin',
      role: ['admin'],
    },
  ]
  
  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => 
    !item.role || item.role.includes(user?.role || 'user')
  )
  
  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.label)
    
    return (
      <Box key={item.label}>
        <ListItem disablePadding sx={{ pl: level * 2 }}>
          <ListItemButton
            onClick={() => {
              if (hasChildren) {
                handleExpandToggle(item.label)
              } else {
                navigate(item.path)
              }
            }}
            sx={{
              minHeight: 48,
              px: 2.5,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? 'auto' : 3,
                justifyContent: 'center',
                color: 'text.secondary',
              }}
            >
              {item.icon}
            </ListItemIcon>
            
            {!collapsed && (
              <>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                />
                {hasChildren && (
                  isExpanded ? <ExpandLess /> : <ExpandMore />
                )}
              </>
            )}
          </ListItemButton>
        </ListItem>
        
        {/* Render children */}
        {hasChildren && !collapsed && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    )
  }
  
  if (!isAuthenticated) {
    return null
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: collapsed ? 64 : width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 64 : width,
          boxSizing: 'border-box',
          top: { xs: 56, sm: 64 }, // Account for AppBar height
          height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' },
          borderRight: 1,
          borderColor: 'divider',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          minHeight: 64,
        }}
      >
        {!collapsed && user && (
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Avatar
              sx={{ width: 32, height: 32, mr: 1.5 }}
              src={user.avatar}
            >
              {user.name?.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{ fontWeight: 600 }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
              >
                {user.role}
              </Typography>
            </Box>
          </Box>
        )}
        
        {/* Toggle Collapse Button */}
        {onToggleCollapse && (
          <IconButton
            onClick={onToggleCollapse}
            size="small"
            sx={{
              ml: collapsed ? 0 : 'auto',
              mx: collapsed ? 'auto' : 0,
            }}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </Box>
      
      <Divider />
      
      {/* Navigation Menu */}
      <List sx={{ flex: 1, pt: 1 }}>
        {visibleMenuItems.map(item => renderMenuItem(item))}
      </List>
    </Drawer>
  )
}

export default Sidebar
