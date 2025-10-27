/**
 * Navbar Component
 * Main navigation bar with responsive design and user authentication state
 * Includes logo, navigation links, user menu, and mobile hamburger menu
 */

import {
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  Settings,
  Logout,
  Dashboard,
  Person,
} from '@mui/icons-material'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Badge,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/auth/useAuth'

interface NavbarProps {
  // Navigation items
  navigationItems?: Array<{ label: string; path: string; icon?: React.ReactNode }>
  
  // Brand/Logo
  brandText?: string
  brandComponent?: React.ReactNode
  
  // User menu items
  userMenuItems?: Array<{ label: string; path: string; icon?: React.ReactNode }>
  
  // Behavior
  showNotifications?: boolean
  showUserMenu?: boolean
  showMobileMenu?: boolean
  
  // Styling
  elevation?: number
  color?: 'default' | 'primary' | 'secondary' | 'inherit' | 'transparent'
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'
  
  // Custom actions
  onNotificationClick?: () => void
  onUserMenuClick?: (path: string) => void
}

export const Navbar: FC<NavbarProps> = ({
  navigationItems = [],
  brandText = 'NestLancer',
  brandComponent,
  userMenuItems = [],
  showNotifications = true,
  showUserMenu = true,
  showMobileMenu = true,
  elevation = 1,
  color = 'default',
  position = 'fixed',
  onNotificationClick,
  onUserMenuClick,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const [unreadCount] = useState(0)
  
  const { user, isAuthenticated, logout } = useAuth()
  
  // Default navigation items
  const defaultNavItems = [
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ]
  
  // Default user menu items
  const defaultUserMenuItems = [
    { label: 'Dashboard', icon: <Dashboard />, path: '/app/dashboard' },
    { label: 'Profile', icon: <Person />, path: '/app/profile' },
    { label: 'Settings', icon: <Settings />, path: '/app/settings' },
  ]
  
  const items = (navigationItems.length > 0 ? navigationItems : defaultNavItems) as Array<{ label: string; path: string; icon?: React.ReactNode }>
  const menuItems = userMenuItems.length > 0 ? userMenuItems : defaultUserMenuItems
  
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }
  
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }
  
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  const handleUserMenuClick = (path: string) => {
    handleUserMenuClose()
    onUserMenuClick?.(path)
    navigate(path)
  }
  
  return (
    <>
      <AppBar
        position={position}
        elevation={elevation}
        color={color}
        sx={{
          bgcolor: color === 'transparent' ? 'transparent' : undefined,
          boxShadow: elevation === 0 ? 'none' : undefined,
        }}
      >
        <Toolbar>
          {/* Mobile Menu Button */}
          {isMobile && showMobileMenu && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {/* Logo/Brand */}
          {brandComponent || (
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                cursor: 'pointer',
                '&:hover': { color: 'primary.dark' },
              }}
              onClick={() => navigate('/')}
            >
              {brandText}
            </Typography>
          )}
          
          {/* Desktop Navigation */}
          {!isMobile && items.length > 0 && (
            <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
              {items.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: 'inherit',
                    mx: 1,
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  startIcon={item.icon ? item.icon : undefined}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                {showNotifications && (
                  <IconButton
                    color="inherit"
                    aria-label="notifications"
                    onClick={onNotificationClick}
                  >
                    {unreadCount > 0 ? (
                      <Badge badgeContent={unreadCount} color="error">
                        <Notifications />
                      </Badge>
                    ) : (
                      <Notifications />
                    )}
                  </IconButton>
                )}
                
                {/* User Menu */}
                {showUserMenu && (
                  <IconButton
                    onClick={handleUserMenuOpen}
                    aria-label="user menu"
                    sx={{ p: 0, ml: 1 }}
                  >
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={user?.avatar}
                    >
                      {user?.name?.charAt(0) || <AccountCircle />}
                    </Avatar>
                  </IconButton>
                )}
              </>
            ) : (
              <>
                {/* Login/Register Buttons */}
                <Button
                  variant="text"
                  onClick={() => navigate('/auth/login')}
                  sx={{ 
                    color: 'inherit',
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/auth/register')}
                  sx={{
                    ml: 1,
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* User Menu Dropdown */}
      {showUserMenu && (
        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 200,
              border: 1,
              borderColor: 'divider',
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* User Info */}
          {user && (
            <>
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" color="text.primary">
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              <Divider />
            </>
          )}
          
          {/* Menu Items */}
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => handleUserMenuClick(item.path)}
              sx={{ gap: 1.5 }}
            >
              {item.icon}
              {item.label}
            </MenuItem>
          ))}
          
          <Divider />
          
          {/* Logout */}
          <MenuItem
            onClick={() => {
              handleUserMenuClose()
              logout()
            }}
            sx={{ gap: 1.5, color: 'error.main' }}
          >
            <Logout />
            Logout
          </MenuItem>
        </Menu>
      )}
    </>
  )
}

export default Navbar

