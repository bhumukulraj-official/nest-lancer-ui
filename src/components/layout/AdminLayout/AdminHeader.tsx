/**
 * Admin Header
 */

import {
  Menu as MenuIcon,
  Notifications,
  Settings,
  Logout,
} from '@mui/icons-material'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  Badge,
} from '@mui/material'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/auth/useAuth'

interface AdminHeaderProps {
  onMenuClick?: () => void
  showMenuButton?: boolean
}

export const AdminHeader: FC<AdminHeaderProps> = ({
  onMenuClick,
  showMenuButton = false,
}) => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        {showMenuButton && (
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip label="Admin" size="small" color="primary" />
          
          <IconButton size="small">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ width: 32, height: 32 }}>{user?.name?.charAt(0)}</Avatar>
          </IconButton>
        </Box>
        
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => { navigate('/admin/settings'); handleMenuClose(); }}>
            <Settings sx={{ mr: 1 }} fontSize="small" />
            Settings
          </MenuItem>
          <MenuItem onClick={() => { logout(); handleMenuClose(); }} sx={{ color: 'error.main' }}>
            <Logout sx={{ mr: 1 }} fontSize="small" />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default AdminHeader

