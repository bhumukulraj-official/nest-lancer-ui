/**
 * Rate Limit Analytics Page
 * Admin page for rate limit monitoring and analytics
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { RateLimitAnalytics } from '@/components/features/admin/analytics'

const RateLimitAnalyticsPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <RateLimitAnalytics />
      </Container>
    </AdminLayout>
  )
}

export default RateLimitAnalyticsPage

