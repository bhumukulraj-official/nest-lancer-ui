/**
 * Quote Analytics Page
 * Admin page for quote analytics and statistics
 */

import { Container } from '@mui/material'
import React from 'react'

import { QuoteAnalytics } from '@/components/features/admin/analytics'
import { AdminLayout } from '@/components/layout/AdminLayout'

const QuoteAnalyticsPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <QuoteAnalytics />
      </Container>
    </AdminLayout>
  )
}

export default QuoteAnalyticsPage

