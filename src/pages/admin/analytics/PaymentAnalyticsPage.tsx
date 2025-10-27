/**
 * Payment Analytics Page
 * Admin page for payment analytics and statistics
 */

import { Container } from '@mui/material'
import React from 'react'

import { PaymentAnalytics } from '@/components/features/admin/analytics'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

