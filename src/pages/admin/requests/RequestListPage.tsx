/**
 * Request List Page
 * Admin page for viewing and managing all requests
 */

import { Container } from '@mui/material'
import React from 'react'

import { RequestListAdmin } from '@/components/features/admin/requests'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

