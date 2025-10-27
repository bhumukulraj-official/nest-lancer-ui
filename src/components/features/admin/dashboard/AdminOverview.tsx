/**
 * Admin Overview Component
 * Admin dashboard overview with system metrics and user statistics
 */

import {
  People,
  Assignment,
  Payment,
  Speed,
} from '@mui/icons-material'
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
import React from 'react'

import { useAuth } from '@/hooks/auth/useAuth'

// Admin stat card component
interface AdminStatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  trend?: {
    value: number
    isPositive: boolean
  }
  subtitle?: string
}

const AdminStatCard: React.FC<AdminStatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
  subtitle,
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
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Chip
                label={`${trend.isPositive ? '+' : ''}${trend.value}%`}
                size="small"
                color={trend.isPositive ? 'success' : 'error'}
                sx={{ fontSize: '0.75rem' }}
              />
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

// System health indicator component
const SystemHealthIndicator: React.FC = () => {
  const healthMetrics = [
    { label: 'Server Status', status: 'healthy', color: 'success' },
    { label: 'Database', status: 'healthy', color: 'success' },
    { label: 'API Response', status: 'warning', color: 'warning' },
    { label: 'Storage', status: 'healthy', color: 'success' },
  ]

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          System Health
        </Typography>
        <Grid container spacing={2}>
          {healthMetrics.map((metric, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip
                  label={metric.status}
                  color={metric.color as any}
                  size="small"
                  sx={{ mb: 1, textTransform: 'capitalize' }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  {metric.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

// Main admin overview component
export const AdminOverview: React.FC = () => {
  const { getDisplayName } = useAuth()

  // Mock data - in real app, this would come from API
  const adminStats = [
    {
      title: 'Total Users',
      value: '1,247',
      subtitle: '1,156 active, 91 inactive',
      icon: <People />,
      color: 'primary' as const,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Active Projects',
      value: '89',
      subtitle: '23 completed this week',
      icon: <Assignment />,
      color: 'info' as const,
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Revenue',
      value: '$45,230',
      subtitle: 'This month',
      icon: <Payment />,
      color: 'success' as const,
      trend: { value: 15, isPositive: true },
    },
    {
      title: 'System Load',
      value: '68%',
      subtitle: 'CPU usage',
      icon: <Speed />,
      color: 'warning' as const,
      trend: { value: 5, isPositive: false },
    },
  ]

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {getDisplayName()}. Here's your system overview.
        </Typography>
      </Box>

      <SystemHealthIndicator />

      <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
        System Metrics
      </Typography>
      
      <Grid container spacing={3}>
        {adminStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <AdminStatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default AdminOverview
