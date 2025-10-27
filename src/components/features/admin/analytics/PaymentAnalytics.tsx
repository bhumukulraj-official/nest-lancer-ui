/**
 * Payment Analytics Component
 * Payment analytics and statistics display
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
  Payment,
  TrendingUp,
  AccountBalance,
  AttachMoney,
} from '@mui/icons-material'
import { ChartWithControls } from './AnalyticsCharts'

interface ChartDataPoint {
  label: string
  value: number
  date?: string
}

interface PaymentAnalytics {
  totalRevenue: number
  transactionsCount: number
  avgTransactionValue: number
  successRate: number
  revenueGrowth: number
  revenueData: ChartDataPoint[]
  paymentMethods: Array<{ method: string; count: number; revenue: number }>
}

interface StatCardProps {
  title: string
  value: string
  change?: number
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
            {change !== undefined && (
              <Chip
                label={`${change > 0 ? '+' : ''}${change}%`}
                size="small"
                color={change > 0 ? 'success' : 'error'}
              />
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export const PaymentAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<PaymentAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    loadAnalytics()
  }, [])
  
  const loadAnalytics = async () => {
    setIsLoading(true)
    
    const mockAnalytics: PaymentAnalytics = {
      totalRevenue: 124567.89,
      transactionsCount: 456,
      avgTransactionValue: 273.04,
      successRate: 97.5,
      revenueGrowth: 18.5,
      revenueData: [
        { label: 'Jan', value: 85000 },
        { label: 'Feb', value: 92000 },
        { label: 'Mar', value: 105000 },
        { label: 'Apr', value: 110000 },
        { label: 'May', value: 115000 },
        { label: 'Jun', value: 124568 },
      ],
      paymentMethods: [
        { method: 'Credit Card', count: 234, revenue: 62340 },
        { method: 'Debit Card', count: 156, revenue: 45678 },
        { method: 'PayPal', count: 52, revenue: 15240 },
        { method: 'Bank Transfer', count: 14, revenue: 1309.89 },
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
        Payment Analytics
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`$${analytics.totalRevenue.toLocaleString()}`}
            change={analytics.revenueGrowth}
            icon={<AttachMoney />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Transactions"
            value={analytics.transactionsCount.toLocaleString()}
            change={12.5}
            icon={<Payment />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Transaction"
            value={`$${analytics.avgTransactionValue.toFixed(2)}`}
            icon={<AccountBalance />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Success Rate"
            value={`${analytics.successRate}%`}
            icon={<TrendingUp />}
            color="success"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <ChartWithControls
            title="Revenue Trend (Last 6 Months)"
            data={analytics.revenueData}
            type="line"
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Payment Methods Breakdown
              </Typography>
              <Stack spacing={2}>
                {analytics.paymentMethods.map((method) => {
                  const percentage = (method.revenue / analytics.totalRevenue) * 100
                  return (
                    <Box key={method.method}>
                      <Stack direction="row" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {method.method}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          <Typography variant="body2" color="text.secondary">
                            {method.count} transactions
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            ${method.revenue.toLocaleString()}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Chip
                        label={`${percentage.toFixed(1)}%`}
                        size="small"
                        color="primary"
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

export default PaymentAnalytics

