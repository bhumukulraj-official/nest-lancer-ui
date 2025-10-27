/**
 * User Analytics Page
 * Admin page for user analytics and statistics
 */

import { Container } from '@mui/material'
import React from 'react'

import { UserAnalytics } from '@/components/features/admin/analytics'
import { AdminLayout } from '@/components/layout/AdminLayout'

const UserAnalyticsPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <UserAnalytics />
      </Container>
    </AdminLayout>
  )
}

export default UserAnalyticsPage

