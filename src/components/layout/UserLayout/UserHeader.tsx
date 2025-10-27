/**
 * User Layout Header
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
} from '@mui/material'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/auth/useAuth'

interface UserHeaderProps {
  onMenuClick?: () => void
  showMenuButton?: boolean
}

export const UserHeader: FC<UserHeaderProps> = ({
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
          User Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small">
            <Notifications />
          </IconButton>
          
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ width: 32, height: 32 }}>{user?.name?.charAt(0)}</Avatar>
          </IconButton>
        </Box>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
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

export default UserHeader

