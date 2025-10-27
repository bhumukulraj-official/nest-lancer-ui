/**
 * Quote Analytics Page
 * Admin page for quote analytics and statistics
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { QuoteAnalytics } from '@/components/features/admin/analytics'

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

