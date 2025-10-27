/**
 * Quote List Page
 * Admin page for viewing and managing all quotes
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { QuoteListAdmin } from '@/components/features/admin/quotes'

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

