/**
 * Real-Time Stats Component
 * Live system statistics and real-time updates
 * UI-only component - displays backend real-time data
 */

import {
  TrendingUp,
  TrendingDown,
  Remove,
} from '@mui/icons-material'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  useTheme,
} from '@mui/material'
import React, { useState, useEffect } from 'react'

// Real-time metric interface
interface RealTimeMetric {
  id: string
  label: string
  value: number
  previousValue: number
  unit: string
  format: 'number' | 'currency' | 'percentage'
}

// Real-time stat card component
interface RealTimeStatCardProps {
  metric: RealTimeMetric
  isLive: boolean
}

const RealTimeStatCard: React.FC<RealTimeStatCardProps> = ({ metric, isLive }) => {
  const theme = useTheme()
  
  const getChangePercent = () => {
    if (metric.previousValue === 0) return 0
    return ((metric.value - metric.previousValue) / metric.previousValue) * 100
  }
  
  const changePercent = getChangePercent()
  
  const getTrendIcon = () => {
    if (Math.abs(changePercent) < 0.1) return <Remove sx={{ fontSize: 16 }} />
    return changePercent > 0 ? <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} /> : <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
  }
  
  const getTrendColor = () => {
    if (Math.abs(changePercent) < 0.1) return 'default'
    return changePercent > 0 ? 'success' : 'error'
  }
  
  const formatValue = (value: number) => {
    switch (metric.format) {
      case 'currency':
        return `$${value.toLocaleString()}`
      case 'percentage':
        return `${value.toFixed(2)}%`
      default:
        return value.toLocaleString()
    }
  }
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        position: 'relative',
        border: isLive ? `2px solid ${theme.palette.success.main}` : 'none',
        animation: isLive ? 'pulse 2s infinite' : 'none',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {metric.label}
          </Typography>
          {isLive && (
            <Chip 
              label="LIVE" 
              size="small" 
              color="success"
              sx={{ fontSize: '0.65rem', height: 20 }}
            />
          )}
        </Stack>
        
        <Box sx={{ mb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {formatValue(metric.value)}
          </Typography>
        </Box>
        
        <Stack direction="row" alignItems="center" spacing={1}>
          {getTrendIcon()}
          <Typography 
            variant="body2" 
            color={getTrendColor() === 'success' ? 'success.main' : 'error.main'}
            sx={{ fontWeight: 600 }}
          >
            {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            vs 1 min ago
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

// Live activity feed component
interface ActivityItem {
  id: string
  type: 'user' | 'project' | 'payment' | 'request'
  message: string
  timestamp: Date
}

const LiveActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  
  useEffect(() => {
    // Mock live activities - in real app, this would come from WebSocket
    const mockActivities: ActivityItem[] = [
      {
        id: '1',
        type: 'user',
        message: 'New user registered: johndoe@example.com',
        timestamp: new Date(Date.now() - 30000),
      },
      {
        id: '2',
        type: 'payment',
        message: 'Payment received: $1,250',
        timestamp: new Date(Date.now() - 60000),
      },
      {
        id: '3',
        type: 'project',
        message: 'Project "E-commerce Site" status updated',
        timestamp: new Date(Date.now() - 90000),
      },
    ]
    
    setActivities(mockActivities)
  }, [])
  
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user': return 'primary'
      case 'project': return 'info'
      case 'payment': return 'success'
      case 'request': return 'warning'
      default: return 'default'
    }
  }
  
  const formatTime = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    return `${seconds}秒 ago`
  }
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Live Activity
        </Typography>
        <Stack spacing={1}>
          {activities.map((activity) => (
            <Box key={activity.id}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip 
                  label={activity.type}
                  size="small"
                  color={getActivityColor(activity.type) as any}
                  sx={{ textTransform: 'capitalize', fontSize: '0.7rem' }}
                />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {activity.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatTime(activity.timestamp)}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

// Main real-time stats component
export const RealTimeStats: React.FC = () => {
  const [metrics, setMetrics] = useState<RealTimeMetric[]>([])
  const [isLive] = useState(true)
  
  useEffect(() => {
    // Mock real-time data - in real app, this would come from WebSocket
    const mockMetrics: RealTimeMetric[] = [
      {
        id: '1',
        label: 'Active Users',
        value: 1247,
        previousValue: 1215,
        unit: 'users',
        format: 'number',
      },
      {
        id: '2',
        label: 'Revenue',
        value: 45230,
        previousValue: 38900,
        unit: '$',
        format: 'currency',
      },
      {
        id: '3',
        label: 'Project Completion',
        value: 87.5,
        previousValue: 84.2,
        unit: '%',
        format: 'percentage',
      },
      {
        id: '4',
        label: 'Response Time',
        value: 125,
        previousValue: 145,
        unit: 'ms',
        format: 'number',
      },
    ]
    
    setMetrics(mockMetrics)
  }, [])
  
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Real-Time Statistics
        </Typography>
        <Chip 
          label={isLive ? 'LIVE' : 'PAUSED'}
          color={isLive ? 'success' : 'default'}
          size="small"
        />
      </Stack>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map(metric => (
          <Grid item xs={12} sm={6} md={3} key={metric.id}>
            <RealTimeStatCard metric={metric} isLive={isLive} />
          </Grid>
        ))}
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                System Performance (Real-Time)
              </Typography>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Real-time performance chart would go here
                  <br />
                  (Connected via WebSocket)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <LiveActivityFeed />
        </Grid>
      </Grid>
    </Box>
  )
}

export default RealTimeStats

