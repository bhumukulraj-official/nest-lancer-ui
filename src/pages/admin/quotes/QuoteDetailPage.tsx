/**
 * Quote Detail Page
 * Admin page for viewing and managing individual quote details
 */

import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { QuoteDetailAdmin } from '@/components/features/admin/quotes'

const QuoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <QuoteDetailAdmin quoteId={id} />
      </Container>
    </AdminLayout>
  )
}

export default QuoteDetailPage

