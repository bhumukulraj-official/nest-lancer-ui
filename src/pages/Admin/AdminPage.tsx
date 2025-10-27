/**
 * Admin Page
 * Main admin dashboard with system metrics and user management
 */

import { Container, Grid } from '@mui/material'
import React from 'react'

import {
  AdminOverview,
  SystemMetrics,
} from '@/components/features/admin/dashboard'

const AdminPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* Main Admin Overview */}
        <Grid item xs={12}>
          <AdminOverview />
        </Grid>

        {/* System Metrics */}
        <Grid item xs={12}>
          <SystemMetrics />
        </Grid>
      </Grid>
    </Container>
  )
}

export default AdminPage
