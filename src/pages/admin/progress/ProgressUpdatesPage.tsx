/**
 * Progress Updates Page
 * Admin page for managing progress updates
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProgressUpdates } from '@/components/features/admin/progress'

const ProgressUpdatesPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <ProgressUpdates />
      </Container>
    </AdminLayout>
  )
}

export default ProgressUpdatesPage

