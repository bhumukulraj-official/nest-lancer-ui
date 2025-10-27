/**
 * Authentication Layout Component
 * Centered layout for authentication pages (login, register, forgot password)
 * Provides consistent branding and responsive design for auth flows
 */

import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
} from '@mui/material'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface AuthLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  showBranding?: boolean
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBranding = true,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`,
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={isMobile ? 0 : 4}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: { xs: 0, sm: 2 },
            width: '100%',
            background: theme.palette.background.paper,
          }}
        >
          <Stack spacing={3} alignItems="center">
            {/* Branding Section */}
            {showBranding && (
              <Box textAlign="center">
                <Typography
                  component={Link}
                  to="/"
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textDecoration: 'none',
                    mb: 1,
                    display: 'block',
                    '&:hover': {
                      color: 'primary.dark',
                    },
                  }}
                >
                  NestLancer
                </Typography>
                
                {title && (
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 1,
                    }}
                  >
                    {title}
                  </Typography>
                )}
                
                {subtitle && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {subtitle}
                  </Typography>
                )}
                
                {(title || subtitle) && <Divider sx={{ width: '100%', mb: 2 }} />}
              </Box>
            )}

            {/* Main Content */}
            <Box sx={{ width: '100%' }}>
              {children}
            </Box>

            {/* Footer Links */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 3 }}
              divider={
                <Divider 
                  orientation={isMobile ? 'horizontal' : 'vertical'} 
                  flexItem 
                />
              }
              sx={{ 
                pt: 2,
                '& a': {
                  color: 'text.secondary',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                  },
                },
              }}
            >
              <Typography
                component={Link}
                to="/portfolio"
                variant="body2"
              >
                View Portfolio
              </Typography>
              <Typography
                component={Link}
                to="/contact"
                variant="body2"
              >
                Contact Us
              </Typography>
              <Typography
                component={Link}
                to="/blog"
                variant="body2"
              >
                Blog
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default AuthLayout
