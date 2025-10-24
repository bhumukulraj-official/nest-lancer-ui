/**
 * Dashboard Page
 * Main user dashboard with overview, stats, and activity feed
 */

import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import { DashboardOverview, ActivityFeed, StatsCards } from '@/components/features/dashboard'

export const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to your NestLancer dashboard. Here's an overview of your activity and performance.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Overview and Stats */}
        <Grid item xs={12} lg={8}>
          <DashboardOverview />
          
          <Box sx={{ mt: 4 }}>
            <StatsCards />
          </Box>
        </Grid>

        {/* Right Column - Activity Feed */}
        <Grid item xs={12} lg={4}>
          <ActivityFeed />
        </Grid>
      </Grid>
    </Container>
  )
}

export default DashboardPage
