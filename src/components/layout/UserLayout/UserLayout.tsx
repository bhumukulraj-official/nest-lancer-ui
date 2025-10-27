/**
 * UserLayout Component
 * User dashboard layout with sidebar navigation, header, and main content area
 * Includes responsive design and role-based features
 */

import React, { FC, ReactNode } from 'react'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { UserHeader } from './UserHeader'
import { UserSidebar } from './UserSidebar'
import { UserContent } from './UserContent'

interface UserLayoutProps {
  children: ReactNode
  showSidebar?: boolean
  showHeader?: boolean
  sidebarOpen?: boolean
  onSidebarToggle?: () => void
}

export const UserLayout: FC<UserLayoutProps> = ({
  children,
  showSidebar = true,
  showHeader = true,
  sidebarOpen,
  onSidebarToggle,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [internalSidebarOpen, setInternalSidebarOpen] = React.useState(!isMobile)
  const isSidebarOpen = sidebarOpen ?? internalSidebarOpen
  const handleSidebarToggle = onSidebarToggle ?? (() => setInternalSidebarOpen(!internalSidebarOpen))
  
  const drawerWidth = 280
  
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      {showSidebar && (
        <UserSidebar
          open={isSidebarOpen}
          onClose={() => handleSidebarToggle()}
          variant={isMobile ? 'temporary' : 'persistent'}
        />
      )}
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: isMobile || !showSidebar ? '100%' : `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Header */}
        {showHeader && (
          <UserHeader
            onMenuClick={handleSidebarToggle}
            showMenuButton={isMobile && showSidebar}
          />
        )}
        
        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <UserContent>
            {children}
          </UserContent>
        </Box>
      </Box>
    </Box>
  )
}

export default UserLayout

