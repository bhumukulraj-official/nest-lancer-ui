/**
 * User Analytics Page
 * Admin page for user analytics and statistics
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { UserAnalytics } from '@/components/features/admin/analytics'

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

