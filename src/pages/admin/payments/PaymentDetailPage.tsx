/**
 * Payment Detail Page
 * Admin page for viewing individual payment details
 */

import { Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

import { PaymentDetailAdmin } from '@/components/features/admin/payments'
import { AdminLayout } from '@/components/layout/AdminLayout'

const PaymentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <PaymentDetailAdmin paymentId={id} />
      </Container>
    </AdminLayout>
  )
}

export default PaymentDetailPage

