/**
 * App Layout Component
 * Main application layout wrapper with responsive design
 * Provides the base structure for the entire application
 */

import { FC, ReactNode } from 'react'
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  CssBaseline,
} from '@mui/material'
import { Outlet } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

interface AppLayoutProps {
  children?: ReactNode
  showSidebar?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  disableGutters?: boolean
}

const AppLayout: FC<AppLayoutProps> = ({
  children,
  showSidebar = false,
  maxWidth = 'lg',
  disableGutters = false,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <CssBaseline />
      
      {/* Header */}
      <Header />
      
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1,
          pt: { xs: 7, sm: 8 }, // Account for fixed header
        }}
      >
        {/* Sidebar (if enabled) */}
        {showSidebar && !isMobile && (
          <Sidebar />
        )}
        
        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            ml: showSidebar && !isMobile ? '240px' : 0,
            transition: theme.transitions.create(['margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Container
            maxWidth={maxWidth}
            disableGutters={disableGutters}
            sx={{
              flexGrow: 1,
              py: { xs: 2, sm: 3 },
              px: disableGutters ? 0 : { xs: 2, sm: 3 },
            }}
          >
            {children || <Outlet />}
          </Container>
        </Box>
      </Box>
      
      {/* Footer */}
      <Footer />
    </Box>
  )
}

export default AppLayout
