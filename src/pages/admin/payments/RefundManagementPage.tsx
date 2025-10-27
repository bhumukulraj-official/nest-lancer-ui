/**
 * Refund Management Page
 * Admin page for managing payment refunds
 */

import { Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

import { RefundManager } from '@/components/features/admin/payments'
import { AdminLayout } from '@/components/layout/AdminLayout'

const RefundManagementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <RefundManager paymentId={id} />
      </Container>
    </AdminLayout>
  )
}

export default RefundManagementPage

