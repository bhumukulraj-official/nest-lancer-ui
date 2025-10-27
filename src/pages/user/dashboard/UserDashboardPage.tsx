/**
 * User Dashboard Page
 * Main dashboard page for authenticated users showing overview, stats, and activity
 */

import { Container, Grid, Box } from '@mui/material'
import React from 'react'

import {
  DashboardOverview,
  StatsCards,
  ActivityFeed,
} from '@/components/features/dashboard'
import { UserLayout } from '@/components/layout'

export const UserDashboardPage: React.FC = () => {
  return (
    <UserLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <DashboardOverview />
        </Box>

        <Box sx={{ mb: 4 }}>
          <StatsCards />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <ActivityFeed />
          </Grid>
        </Grid>
      </Container>
    </UserLayout>
  )
}

export default UserDashboardPage

