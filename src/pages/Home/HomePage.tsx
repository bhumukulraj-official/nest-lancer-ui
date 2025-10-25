/**
 * Home Page
 * Public landing page with hero section, features, and call-to-action
 * Responsive design with mobile-first approach
 */

import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material'
import {
  RocketLaunch,
  People,
  Security,
  Speed,
  Support,
  TrendingUp,
  CheckCircle,
  ArrowForward,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import SentryTest from '@/components/SentryTest'

// Hero section component
const HeroSection: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                Welcome to{' '}
                <Box component="span" sx={{ color: 'secondary.light' }}>
                  NestLancer
                </Box>
              </Typography>

              <Typography
                variant={isMobile ? 'h6' : 'h5'}
                sx={{
                  mb: 3,
                  opacity: 0.9,
                  lineHeight: 1.6,
                }}
              >
                Your Gateway to Professional Freelancing Excellence
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  opacity: 0.8,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.7,
                }}
              >
                Connect with top-tier freelancers, manage projects seamlessly,
                and grow your business with our comprehensive platform designed
                for modern professionals.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mb: 4 }}
              >
                <Button
                  component={RouterLink}
                  to="/auth/register"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  Get Started Free
                </Button>

                <Button
                  component={RouterLink}
                  to="/auth/login"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Sign In
                </Button>
              </Stack>

              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip
                  label="No Credit Card Required"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
                <Chip
                  label="Free Trial Available"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  width: { xs: 300, md: 400 },
                  height: { xs: 300, md: 400 },
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <RocketLaunch
                  sx={{
                    fontSize: { xs: 120, md: 160 },
                    opacity: 0.8,
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

// Features section component
const FeaturesSection: React.FC = () => {
  const theme = useTheme()

  const features = [
    {
      icon: <People sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Expert Freelancers',
      description:
        'Connect with verified professionals across various industries and skill sets.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure Platform',
      description:
        'Your projects and payments are protected with enterprise-grade security.',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Fast Delivery',
      description:
        'Get your projects completed quickly with our streamlined workflow.',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you succeed.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Growth Analytics',
      description: 'Track your progress with detailed analytics and insights.',
    },
    {
      icon: <CheckCircle sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Quality Assurance',
      description: 'Every project goes through our quality review process.',
    },
  ]

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, color: 'text.primary' }}
          >
            Why Choose NestLancer?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            We provide everything you need to succeed in the modern freelancing
            economy
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition:
                    'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

// CTA section component
const CTASection: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Ready to Get Started?
          </Typography>

          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Join thousands of professionals who trust NestLancer for their
            freelancing needs
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Button
              component={RouterLink}
              to="/auth/register"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Start Your Journey
            </Button>

            <Button
              component={RouterLink}
              to="/auth/login"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Sign In
            </Button>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontSize: '0.875rem',
            }}
          >
            No setup fees • Cancel anytime • 30-day money-back guarantee
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

// Main HomePage component
export const HomePage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      
      {/* Temporary Sentry Test Component - Remove after testing */}
      <SentryTest />
    </Box>
  )
}

export default HomePage
