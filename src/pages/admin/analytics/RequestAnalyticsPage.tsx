/**
 * Request Analytics Page
 * Admin page for request analytics and statistics
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { RequestAnalytics } from '@/components/features/admin/analytics'

const RequestAnalyticsPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <RequestAnalytics />
      </Container>
    </AdminLayout>
  )
}

export default RequestAnalyticsPage

