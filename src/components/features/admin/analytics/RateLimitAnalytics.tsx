/**
 * Rate Limit Analytics Component
 * Rate limiting analytics and monitoring
 * UI-only component - displays backend rate limit data
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Alert,
} from '@mui/material'
import {
  Speed,
  Warning,
  CheckCircle,
  Error,
} from '@mui/icons-material'
import { ChartWithControls } from './AnalyticsCharts'
import type { ChartDataPoint } from './AnalyticsCharts'

interface RateLimitMetrics {
  totalRequests: number
  limitedRequests: number
  remainingRequests: number
  limitExceededCount: number
  avgResponseTime: number
  violationRate: number
}

interface RateLimitData {
  endpoint: string
  requests: number
  limit: number
  violations: number
  status: 'healthy' | 'warning' | 'critical'
}

interface RateLimitAnalytics {
  metrics: RateLimitMetrics
  usageData: ChartDataPoint[]
  endpointData: RateLimitData[]
  violationsByHour: ChartDataPoint[]
}

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, color }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 1,
              bgcolor: `${color}.main`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {icon}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export const RateLimitAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<RateLimitAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    loadAnalytics()
  }, [])
  
  const loadAnalytics = async () => {
    setIsLoading(true)
    
    const mockAnalytics: RateLimitAnalytics = {
      metrics: {
        totalRequests: 125678,
        limitedRequests: 1234,
        remainingRequests: 124444,
        limitExceededCount: 89,
        avgResponseTime: 145,
        violationRate: 0.07,
      },
      usageData: [
        { label: 'Mon', value: 4500 },
        { label: 'Tue', value: 5200 },
        { label: 'Wed', value: 4800 },
        { label: 'Thu', value: 6100 },
        { label: 'Fri', value: 5800 },
        { label: 'Sat', value: 4200 },
        { label: 'Sun', value: 3800 },
      ],
      endpointData: [
        { endpoint: '/api/users', requests: 4500, limit: 10000, violations: 0, status: 'healthy' },
        { endpoint: '/api/projects', requests: 3200, limit: 5000, violations: 2, status: 'healthy' },
        { endpoint: '/api/payments', requests: 2500, limit: 3000, violations: 15, status: 'warning' },
        { endpoint: '/api/requests', requests: 1800, limit: 2000, violations: 5, status: 'healthy' },
        { endpoint: '/api/auth/login', requests: 8900, limit: 10000, violations: 45, status: 'warning' },
        { endpoint: '/api/quotes', requests: 1200, limit: 2000, violations: 0, status: 'healthy' },
      ],
      violationsByHour: [
        { label: '00:00', value: 2 },
        { label: '06:00', value: 5 },
        { label: '12:00', value: 12 },
        { label: '18:00', value: 18 },
        { label: '24:00', value: 8 },
      ],
    }
    
    setAnalytics(mockAnalytics)
    setIsLoading(false)
  }
  
  if (isLoading || !analytics) {
    return <Typography>Loading analytics...</Typography>
  }
  
  const criticalEndpoints = analytics.endpointData.filter(e => e.status === 'critical')
  
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Rate Limit Analytics
      </Typography>
      
      {criticalEndpoints.length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {criticalEndpoints.length} endpoint{criticalEndpoints.length > 1 ? 's' : ''} experiencing critical rate limit violations
        </Alert>
      )}
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Requests"
            value={analytics.metrics.totalRequests.toLocaleString()}
            icon={<Speed />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Limited Requests"
            value={analytics.metrics.limitedRequests.toLocaleString()}
            subtitle={`${analytics.metrics.violationRate}% rate`}
            icon={<Warning />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Limit Exceeded"
            value={analytics.metrics.limitExceededCount}
            icon={<Error />}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Remaining Requests"
            value={analytics.metrics.remainingRequests.toLocaleString()}
            icon={<CheckCircle />}
            color="success"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <ChartWithControls
            title="Request Volume (Last 7 Days)"
            data={analytics.usageData}
            type="line"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Endpoint Status
              </Typography>
              <Stack spacing={2}>
                {analytics.endpointData.map((endpoint) => {
                  const percentage = (endpoint.requests / endpoint.limit) * 100
                  const getStatusColor = () => {
                    switch (endpoint.status) {
                      case 'healthy': return 'success'
                      case 'warning': return 'warning'
                      case 'critical': return 'error'
                      default: return 'default'
                    }
                  }
                  
                  return (
                    <Box key={endpoint.endpoint}>
                      <Stack direction="row" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {endpoint.endpoint}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {endpoint.requests} / {endpoint.limit}
                        </Typography>
                      </Stack>
                      <Chip
                        label={`${percentage.toFixed(1)}% - ${endpoint.violations} violations`}
                        size="small"
                        color={getStatusColor()}
                        sx={{ width: '100%', justifyContent: 'space-between' }}
                      />
                    </Box>
                  )
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RateLimitAnalytics

