/**
 * Rate Limit Analytics Page
 * Admin page for rate limit monitoring and analytics
 */

import { Container } from '@mui/material'
import React from 'react'

import { RateLimitAnalytics } from '@/components/features/admin/analytics'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

