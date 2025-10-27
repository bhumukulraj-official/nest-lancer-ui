/**
 * Quote Analytics Component
 * Quote analytics and statistics display
 * UI-only component - displays backend analytics data
 */

import {
  Description,
  CheckCircle,
  Cancel,
  TrendingUp,
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

interface ChartDataPoint {
  label: string
  value: number
  date?: string
}

interface QuoteAnalytics {
  totalQuotes: number
  acceptedQuotes: number
  pendingQuotes: number
  rejectedQuotes: number
  acceptanceRate: number
  avgQuoteValue: number
  quoteVolumeData: ChartDataPoint[]
  categoryDistribution: Array<{ category: string; count: number; revenue: number }>
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

export const QuoteAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<QuoteAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    loadAnalytics()
  }, [])
  
  const loadAnalytics = async () => {
    setIsLoading(true)
    
    const mockAnalytics: QuoteAnalytics = {
      totalQuotes: 234,
      acceptedQuotes: 156,
      pendingQuotes: 45,
      rejectedQuotes: 33,
      acceptanceRate: 66.7,
      avgQuoteValue: 3450.00,
      quoteVolumeData: [
        { label: 'Mon', value: 12 },
        { label: 'Tue', value: 18 },
        { label: 'Wed', value: 15 },
        { label: 'Thu', value: 22 },
        { label: 'Fri', value: 25 },
        { label: 'Sat', value: 14 },
        { label: 'Sun', value: 10 },
      ],
      categoryDistribution: [
        { category: 'Web Development', count: 89, revenue: 245000 },
        { category: 'Mobile App', count: 67, revenue: 189000 },
        { category: 'Design', count: 45, revenue: 67000 },
        { category: 'Marketing', count: 33, revenue: 89000 },
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
        Quote Analytics
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Quotes"
            value={analytics.totalQuotes}
            icon={<Description />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Accepted"
            value={analytics.acceptedQuotes}
            subtitle={`${analytics.acceptanceRate}% rate`}
            icon={<CheckCircle />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={analytics.pendingQuotes}
            icon={<TrendingUp />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Rejected"
            value={analytics.rejectedQuotes}
            icon={<Cancel />}
            color="error"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <ChartWithControls
            title="Quote Volume (Last 7 Days)"
            data={analytics.quoteVolumeData}
            type="bar"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Category Distribution
              </Typography>
              <Stack spacing={2}>
                {analytics.categoryDistribution.map((cat) => {
                  const percentage = (cat.count / analytics.totalQuotes) * 100
                  return (
                    <Box key={cat.category}>
                      <Stack direction="row" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {cat.category}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {cat.count}
                        </Typography>
                      </Stack>
                      <Chip
                        label={`${percentage.toFixed(1)}%`}
                        size="small"
                        color="info"
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

export default QuoteAnalytics

