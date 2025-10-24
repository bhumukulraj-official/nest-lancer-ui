/**
 * Header Component
 * Application header with responsive navigation and user authentication state
 * Includes logo, navigation links, user menu, and mobile hamburger menu
 */

import { FC, useState } from 'react'
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
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import {
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  Settings,
  Logout,
  Dashboard,
  Person,
} from '@mui/icons-material'

// TODO: Replace with actual auth hook when implemented
const useAuth = () => ({
  user: null as { name: string; email: string; avatar?: string } | null, // Will be replaced with actual user data
  isAuthenticated: false,
  logout: () => console.log('Logout clicked'),
})

const Header: FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  
  const { user, isAuthenticated, logout } = useAuth()
  
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }
  
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }
  
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]
  
  const userMenuItems = [
    { label: 'Dashboard', icon: <Dashboard />, path: '/user/dashboard' },
    { label: 'Profile', icon: <Person />, path: '/user/profile' },
    { label: 'Settings', icon: <Settings />, path: '/user/settings' },
  ]

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          {/* Mobile Menu Button */}
          {isMobile && (
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
          
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            NestLancer
          </Typography>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  sx={{
                    color: 'text.primary',
                    mx: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
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
                <IconButton
                  color="inherit"
                  aria-label="notifications"
                >
                  <Notifications />
                </IconButton>
                
                {/* User Menu */}
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
              </>
            ) : (
              <>
                {/* Login/Register Buttons */}
                <Button
                  variant="text"
                  sx={{ color: 'text.primary' }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    ml: 1,
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
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
        {userMenuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={handleUserMenuClose}
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
      
      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="primary.main" fontWeight={700}>
            NestLancer
          </Typography>
        </Box>
        
        <Divider />
        
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={handleMobileMenuToggle}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default Header
