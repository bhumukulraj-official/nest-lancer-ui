/**
 * Request Analytics Component
 * Request analytics and statistics display
 * UI-only component - displays backend analytics data
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
} from '@mui/material'
import {
  Assignment,
  Pending,
  CheckCircle,
  Cancel,
} from '@mui/icons-material'
import { ChartWithControls } from './AnalyticsCharts'
import type { ChartDataPoint } from './AnalyticsCharts'

interface RequestAnalytics {
  totalRequests: number
  pendingRequests: number
  completedRequests: number
  cancelledRequests: number
  avgResponseTime: number
  completionRate: number
  requestVolumeData: ChartDataPoint[]
  statusDistribution: Array<{ status: string; count: number; percentage: number }>
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

export const RequestAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<RequestAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    loadAnalytics()
  }, [])
  
  const loadAnalytics = async () => {
    setIsLoading(true)
    
    const mockAnalytics: RequestAnalytics = {
      totalRequests: 568,
      pendingRequests: 124,
      completedRequests: 389,
      cancelledRequests: 55,
      avgResponseTime: 2.5,
      completionRate: 68.5,
      requestVolumeData: [
        { label: 'Mon', value: 45 },
        { label: 'Tue', value: 52 },
        { label: 'Wed', value: 48 },
        { label: 'Thu', value: 61 },
        { label: 'Fri', value: 58 },
        { label: 'Sat', value: 42 },
        { label: 'Sun', value: 38 },
      ],
      statusDistribution: [
        { status: 'Completed', count: 389, percentage: 68.5 },
        { status: 'Pending', count: 124, percentage: 21.8 },
        { status: 'Cancelled', count: 55, percentage: 9.7 },
      ],
    }
    
    setAnalytics(mockAnalytics)
    setIsLoading(false)
  }
  
  if (isLoading || !analytics) {
    return <Typography>Loading analytics...</Typography>
  }
  
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Request Analytics
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Requests"
            value={analytics.totalRequests}
            icon={<Assignment />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={analytics.pendingRequests}
            subtitle={`${((analytics.pendingRequests / analytics.totalRequests) * 100).toFixed(1)}%`}
            icon={<Pending />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={analytics.completedRequests}
            subtitle={`${analytics.completionRate}% rate`}
            icon={<CheckCircle />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Cancelled"
            value={analytics.cancelledRequests}
            icon={<Cancel />}
            color="error"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ChartWithControls
            title="Request Volume (Last 7 Days)"
            data={analytics.requestVolumeData}
            type="bar"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Status Distribution
              </Typography>
              <Stack spacing={2}>
                {analytics.statusDistribution.map((item) => (
                  <Box key={item.status}>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">{item.status}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.count}
                      </Typography>
                    </Stack>
                    <Chip
                      label={`${item.percentage}%`}
                      size="small"
                      color={item.status === 'Completed' ? 'success' : item.status === 'Pending' ? 'warning' : 'error'}
                      sx={{ width: '100%', justifyContent: 'space-between' }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RequestAnalytics

