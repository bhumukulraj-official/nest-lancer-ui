/**
 * Request List Page
 * Admin page for viewing and managing all requests
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { RequestListAdmin } from '@/components/features/admin/requests'

const RequestListPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <RequestListAdmin />
      </Container>
    </AdminLayout>
  )
}

export default RequestListPage

