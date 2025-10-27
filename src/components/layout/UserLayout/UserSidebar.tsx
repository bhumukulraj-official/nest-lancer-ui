/**
 * User Sidebar
 */

import React from 'react'
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
} from '@mui/material'
import {
  Dashboard,
  Folder,
  Assignment as Request,
  Payment,
  Message,
  Settings,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

interface UserSidebarProps {
  open: boolean
  onClose: () => void
  variant?: 'permanent' | 'persistent' | 'temporary'
}

const menuItems = [
  { label: 'Dashboard', path: '/user/dashboard', icon: <Dashboard /> },
  { label: 'Projects', path: '/user/projects', icon: <Folder /> },
  { label: 'Requests', path: '/user/requests', icon: <Request /> },
  { label: 'Payments', path: '/user/payments', icon: <Payment /> },
  { label: 'Messages', path: '/user/messages', icon: <Message /> },
  { label: 'Settings', path: '/user/settings', icon: <Settings /> },
]

export const UserSidebar: React.FC<UserSidebarProps> = ({
  open,
  onClose,
  variant = 'persistent',
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  
  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      anchor="left"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary.main" fontWeight={700}>
          NestLancer
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={location.pathname.startsWith(item.path)}
              onClick={() => {
                navigate(item.path)
                if (variant !== 'permanent') {
                  onClose()
                }
              }}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  borderLeft: `3px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default UserSidebar

