/**
 * Dashboard Overview Component
 * Main dashboard overview with welcome message and quick stats
 */

import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Stack,
  useTheme,
} from '@mui/material'
import {
  Person,
  TrendingUp,
  Assignment,
  Payment,
} from '@mui/icons-material'
import { useAuth } from '@/hooks/auth/useAuth'

// Quick stats card component
interface QuickStatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  trend?: {
    value: number
    isPositive: boolean
  }
}

const QuickStatCard: React.FC<QuickStatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
}) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: `${color}.main`,
              color: 'white',
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            {trend && (
              <Chip
                label={`${trend.isPositive ? '+' : ''}${trend.value}%`}
                size="small"
                color={trend.isPositive ? 'success' : 'error'}
                sx={{ mt: 0.5, fontSize: '0.75rem' }}
              />
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

// Welcome card component
const WelcomeCard: React.FC = () => {
  const { user, getDisplayName } = useAuth()
  const theme = useTheme()

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
        mb: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              fontSize: '1.5rem',
              fontWeight: 600,
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome back, {getDisplayName()}!
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Here's what's happening with your projects today.
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

// Main dashboard overview component
export const DashboardOverview: React.FC = () => {
  // Mock data - in real app, this would come from API
  const quickStats = [
    {
      title: 'Active Projects',
      value: 3,
      icon: <Assignment />,
      color: 'primary' as const,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Pending Requests',
      value: 7,
      icon: <Person />,
      color: 'warning' as const,
      trend: { value: 5, isPositive: true },
    },
    {
      title: 'Completed Tasks',
      value: 24,
      icon: <TrendingUp />,
      color: 'success' as const,
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Total Earnings',
      value: '$2,450',
      icon: <Payment />,
      color: 'info' as const,
      trend: { value: 15, isPositive: true },
    },
  ]

  return (
    <Box>
      <WelcomeCard />
      
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
        Quick Overview
      </Typography>
      
      <Grid container spacing={3}>
        {quickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <QuickStatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default DashboardOverview
