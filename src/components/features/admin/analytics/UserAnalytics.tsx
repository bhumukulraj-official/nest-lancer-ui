/**
 * User Analytics Component
 * User analytics and statistics display
 * UI-only component - displays backend analytics data
 */

import {
  People,
  TrendingUp,
  AccountCircle,
} from '@mui/icons-material'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
} from '@mui/material'
import React, { useState, useEffect } from 'react'

import { ChartWithControls } from './AnalyticsCharts'
import type { ChartDataPoint } from './AnalyticsCharts'

// User analytics interface
interface UserAnalytics {
  totalUsers: number
  activeUsers: number
  newUsers: number
  inactiveUsers: number
  growthRate: number
  topCountries: Array<{ country: string; count: number }>
  userActivityData: ChartDataPoint[]
  userGrowthData: ChartDataPoint[]
}

// Stat card component
interface StatCardProps {
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Chip
              label={`${change > 0 ? '+' : ''}${change}%`}
              size="small"
              color={change > 0 ? 'success' : 'error'}
              icon={<TrendingUp />}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

// Main user analytics component
export const UserAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    loadAnalytics()
  }, [])
  
  const loadAnalytics = async () => {
    setIsLoading(true)
    
    // Mock data - in real app, this would come from API
    const mockAnalytics: UserAnalytics = {
      totalUsers: 1247,
      activeUsers: 1156,
      newUsers: 124,
      inactiveUsers: 91,
      growthRate: 12.5,
      topCountries: [
        { country: 'United States', count: 456 },
        { country: 'India', count: 234 },
        { country: 'United Kingdom', count: 178 },
        { country: 'Germany', count: 156 },
        { country: 'France', count: 223 },
      ],
      userActivityData: [
        { label: 'Mon', value: 1200 },
        { label: 'Tue', value: 1350 },
        { label: 'Wed', value: 1450 },
        { label: 'Thu', value: 1520 },
        { label: 'Fri', value: 1650 },
        { label: 'Sat', value: 1780 },
        { label: 'Sun', value: 1820 },
      ],
      userGrowthData: [
        { label: 'Jan', value: 800 },
        { label: 'Feb', value: 900 },
        { label: 'Mar', value: 950 },
        { label: 'Apr', value: 1050 },
        { label: 'May', value: 1100 },
        { label: 'Jun', value: 1247 },
      ],
    }
    
    setAnalytics(mockAnalytics)
    setIsLoading(false)
  }
  
  if (isLoading || !analytics) {
    return (
      <Box>
        <Typography>Loading analytics...</Typography>
      </Box>
    )
  }
  
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        User Analytics
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={analytics.totalUsers.toLocaleString()}
            change={analytics.growthRate}
            icon={<People />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value={analytics.activeUsers.toLocaleString()}
            change={8.5}
            icon={<AccountCircle />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="New Users (This Month)"
            value={analytics.newUsers.toLocaleString()}
            change={15.2}
            icon={<TrendingUp />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Inactive Users"
            value={analytics.inactiveUsers.toLocaleString()}
            change={-3.2}
            icon={<AccountCircle />}
            color="warning"
          />
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <ChartWithControls
            title="User Activity (Last 7 Days)"
            data={analytics.userActivityData}
            type="line"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Top Countries
              </Typography>
              <Stack spacing={1}>
                {analytics.topCountries.map((country, index) => (
                  <Box key={country.country}>
                    <Stack direction="row" justifyContent="space-between" mb={0.5}>
                      <Typography variant="body2">
                        {index + 1}. {country.country}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {country.count.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ChartWithControls
            title="User Growth Trend (Last 6 Months)"
            data={analytics.userGrowthData}
            type="bar"
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserAnalytics

