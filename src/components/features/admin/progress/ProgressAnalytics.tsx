/**
 * Progress Analytics Admin Component
 * Displays progress analytics and statistics
 */

import React from 'react'
import { Box, Grid, Paper, Typography, Divider } from '@mui/material'
import { LineChart } from '@/components/shared/Chart/LineChart'

const ProgressAnalytics: React.FC = () => {
  // Mock analytics data
  const analyticsData = {
    totalProjects: 150,
    completedProjects: 120,
    inProgressProjects: 25,
    completionRate: 80,
  }

  const chartData = [
    { name: 'Jan', completed: 15, inProgress: 10 },
    { name: 'Feb', completed: 18, inProgress: 12 },
    { name: 'Mar', completed: 20, inProgress: 15 },
    { name: 'Apr', completed: 22, inProgress: 18 },
    { name: 'May', completed: 20, inProgress: 15 },
    { name: 'Jun', completed: 25, inProgress: 20 },
  ]

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Progress Analytics
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4">{analyticsData.totalProjects}</Typography>
            <Typography variant="body2" color="textSecondary">
              Total Projects
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {analyticsData.completedProjects}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Completed
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {analyticsData.inProgressProjects}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              In Progress
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary.main">
              {analyticsData.completionRate}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Completion Rate
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Project Status Trend
            </Typography>
            <LineChart
              data={chartData}
              lines={[
                { dataKey: 'completed', name: 'Projects Completed' },
                { dataKey: 'inProgress', name: 'Projects in Progress' }
              ]}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProgressAnalytics

