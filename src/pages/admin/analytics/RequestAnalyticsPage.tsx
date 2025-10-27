/**
 * Request Analytics Page
 * Admin page for request analytics and statistics
 */

import { Container } from '@mui/material'
import React from 'react'

import { RequestAnalytics } from '@/components/features/admin/analytics'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

