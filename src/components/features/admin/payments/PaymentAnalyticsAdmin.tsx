/**
 * Payment Analytics Admin Component
 * Displays payment analytics and statistics for admin
 */

import React from 'react'
import { Box, Grid, Paper, Typography, Divider } from '@mui/material'
import { BarChart } from '@/components/shared/Chart/BarChart'

const PaymentAnalyticsAdmin: React.FC = () => {
  // Mock analytics data
  const analyticsData = {
    totalRevenue: 125000,
    totalTransactions: 450,
    averageTransaction: 278,
    successRate: 98.5,
  }

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [20000, 25000, 22000, 28000, 27000, 30000],
      },
    ],
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Payment Analytics
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              ${analyticsData.totalRevenue.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Revenue
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary.main">
              {analyticsData.totalTransactions}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Transactions
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main">
              ${analyticsData.averageTransaction}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Average Transaction
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {analyticsData.successRate}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Success Rate
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Trend
            </Typography>
            <BarChart data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PaymentAnalyticsAdmin

