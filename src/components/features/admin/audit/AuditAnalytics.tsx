/**
 * Audit Analytics Component
 */

import { Box, Grid, Paper, Typography, Divider } from '@mui/material'
import React from 'react'

import { LineChart } from '@/components/shared/Chart/LineChart'

const AuditAnalytics: React.FC = () => {
  const analytics = {
    totalLogs: 1000,
    todayLogs: 45,
    errorLogs: 12,
  }

  const chartData = [
    { name: 'Mon', value: 20 },
    { name: 'Tue', value: 35 },
    { name: 'Wed', value: 30 },
    { name: 'Thu', value: 45 },
    { name: 'Fri', value: 40 },
    { name: 'Sat', value: 50 },
    { name: 'Sun', value: 45 },
  ]

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Audit Analytics
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4">{analytics.totalLogs}</Typography>
            <Typography variant="body2" color="textSecondary">
              Total Logs
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {analytics.todayLogs}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Today's Logs
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="error.main">
              {analytics.errorLogs}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Error Logs
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Activity Trend
            </Typography>
            <LineChart data={chartData} lines={[{ dataKey: 'value' }]} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AuditAnalytics

