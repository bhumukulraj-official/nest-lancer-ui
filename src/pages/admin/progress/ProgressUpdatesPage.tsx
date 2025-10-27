/**
 * Progress Updates Page
 * Admin page for managing progress updates
 */

import { Container } from '@mui/material'
import React from 'react'

import { ProgressUpdates } from '@/components/features/admin/progress'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

