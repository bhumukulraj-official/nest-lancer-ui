/**
 * Payment List Page
 * Admin page for viewing and managing all payments
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { PaymentListAdmin } from '@/components/features/admin/payments'

const PaymentListPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <PaymentListAdmin />
      </Container>
    </AdminLayout>
  )
}

export default PaymentListPage

