/**
 * System Metrics Component
 * Detailed system performance metrics and monitoring
 */

import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material'
import {
  CheckCircle,
  Warning,
  Error,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material'

// Metric item interface
interface MetricItem {
  id: string
  name: string
  value: number
  max: number
  unit: string
  status: 'healthy' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
  trendValue: number
}

// Metric card component
interface MetricCardProps {
  metric: MetricItem
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const getStatusColor = () => {
    switch (metric.status) {
      case 'healthy':
        return 'success'
      case 'warning':
        return 'warning'
      case 'critical':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusIcon = () => {
    switch (metric.status) {
      case 'healthy':
        return <CheckCircle sx={{ fontSize: 16 }} />
      case 'warning':
        return <Warning sx={{ fontSize: 16 }} />
      case 'critical':
        return <Error sx={{ fontSize: 16 }} />
      default:
        return undefined
    }
  }

  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
      case 'down':
        return <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
      default:
        return null
    }
  }

  const percentage = (metric.value / metric.max) * 100

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {metric.name}
          </Typography>
          <Chip
            icon={getStatusIcon() || undefined}
            label={metric.status}
            size="small"
            color={getStatusColor() as any}
            sx={{ textTransform: 'capitalize' }}
          />
        </Stack>

        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {metric.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {metric.unit}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            of {metric.max} {metric.unit}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                bgcolor: `${getStatusColor()}.main`,
              },
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, display: 'block' }}
          >
            {percentage.toFixed(1)}% utilized
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" spacing={1}>
          {getTrendIcon()}
          <Typography variant="body2" color="text.secondary">
            {metric.trendValue}% vs last hour
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

// System alerts component
const SystemAlerts: React.FC = () => {
  const alerts = [
    {
      id: '1',
      type: 'warning',
      message: 'High CPU usage detected on server-02',
      timestamp: '5 minutes ago',
    },
    {
      id: '2',
      type: 'info',
      message: 'Database backup completed successfully',
      timestamp: '1 hour ago',
    },
    {
      id: '3',
      type: 'error',
      message: 'Failed to process payment for transaction #12345',
      timestamp: '2 hours ago',
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <Warning sx={{ fontSize: 20, color: 'warning.main' }} />
      case 'error':
        return <Error sx={{ fontSize: 20, color: 'error.main' }} />
      case 'info':
        return <CheckCircle sx={{ fontSize: 20, color: 'info.main' }} />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          System Alerts
        </Typography>
        <List sx={{ p: 0 }}>
          {alerts.map((alert, index) => (
            <React.Fragment key={alert.id}>
              <ListItem sx={{ px: 0, py: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getAlertIcon(alert.type)}
                </ListItemIcon>
                <ListItemText
                  primary={alert.message}
                  secondary={alert.timestamp}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
              {index < alerts.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

// Main system metrics component
export const SystemMetrics: React.FC = () => {
  // Mock data - in real app, this would come from API
  const metrics: MetricItem[] = [
    {
      id: '1',
      name: 'CPU Usage',
      value: 68,
      max: 100,
      unit: '%',
      status: 'warning',
      trend: 'up',
      trendValue: 5,
    },
    {
      id: '2',
      name: 'Memory Usage',
      value: 4.2,
      max: 8,
      unit: 'GB',
      status: 'healthy',
      trend: 'stable',
      trendValue: 0,
    },
    {
      id: '3',
      name: 'Disk Space',
      value: 156,
      max: 500,
      unit: 'GB',
      status: 'healthy',
      trend: 'up',
      trendValue: 2,
    },
    {
      id: '4',
      name: 'Network I/O',
      value: 45,
      max: 100,
      unit: '%',
      status: 'healthy',
      trend: 'down',
      trendValue: 3,
    },
  ]

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
        System Performance
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map(metric => (
          <Grid item xs={12} sm={6} md={3} key={metric.id}>
            <MetricCard metric={metric} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                Performance Trends
              </Typography>
              <Box
                sx={{
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Chart visualization would go here
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <SystemAlerts />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SystemMetrics
