/**
 * Admin Sidebar
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
  Collapse,
  useTheme,
} from '@mui/material'
import {
  Dashboard,
  People,
  Folder,
  RequestPage,
  AttachMoney,
  Assessment,
  Settings,
  AdminPanelSettings,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
  variant?: 'permanent' | 'persistent' | 'temporary'
}

const menuItems = [
  { label: 'Dashboard', path: '/admin', icon: <Dashboard /> },
  { label: 'Users', path: '/admin/users', icon: <People /> },
  { label: 'Projects', path: '/admin/projects', icon: <Folder /> },
  { label: 'Requests', path: '/admin/requests', icon: <RequestPage /> },
  { label: 'Payments', path: '/admin/payments', icon: <AttachMoney /> },
  { label: 'Analytics', path: '/admin/analytics', icon: <Assessment /> },
  { label: 'System', path: '/admin/system', icon: <Settings /> },
]

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
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
          bgcolor: 'background.default',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary.main" fontWeight={700}>
          Admin Panel
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
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default AdminSidebar

