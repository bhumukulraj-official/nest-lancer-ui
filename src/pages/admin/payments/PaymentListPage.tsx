/**
 * Payment List Page
 * Admin page for viewing and managing all payments
 */

import { Container } from '@mui/material'
import React from 'react'

import { PaymentListAdmin } from '@/components/features/admin/payments'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

