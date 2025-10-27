/**
 * Quote List Page
 * Admin page for viewing and managing all quotes
 */

import { Container } from '@mui/material'
import React from 'react'

import { QuoteListAdmin } from '@/components/features/admin/quotes'
import { AdminLayout } from '@/components/layout/AdminLayout'

const QuoteListPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <QuoteListAdmin />
      </Container>
    </AdminLayout>
  )
}

export default QuoteListPage

