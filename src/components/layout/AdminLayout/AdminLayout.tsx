/**
 * AdminLayout Component
 * Admin dashboard layout with sidebar navigation, header, and content area
 */

import { Box, useTheme, useMediaQuery } from '@mui/material'
import React, { FC, ReactNode } from 'react'

import { AdminContent } from './AdminContent'
import { AdminHeader } from './AdminHeader'
import { AdminSidebar } from './AdminSidebar'

interface AdminLayoutProps {
  children: ReactNode
  showSidebar?: boolean
  showHeader?: boolean
  sidebarOpen?: boolean
  onSidebarToggle?: () => void
}

export const AdminLayout: FC<AdminLayoutProps> = ({
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
      {showSidebar && (
        <AdminSidebar
          open={isSidebarOpen}
          onClose={() => handleSidebarToggle()}
          variant={isMobile ? 'temporary' : 'persistent'}
        />
      )}
      
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
        {showHeader && (
          <AdminHeader
            onMenuClick={handleSidebarToggle}
            showMenuButton={isMobile && showSidebar}
          />
        )}
        
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <AdminContent>
            {children}
          </AdminContent>
        </Box>
      </Box>
    </Box>
  )
}

export default AdminLayout

