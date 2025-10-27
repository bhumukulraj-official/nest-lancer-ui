/**
 * Payment Analytics Page
 * Admin page for payment analytics and statistics
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { PaymentAnalytics } from '@/components/features/admin/analytics'

const PaymentAnalyticsPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <PaymentAnalytics />
      </Container>
    </AdminLayout>
  )
}

export default PaymentAnalyticsPage

