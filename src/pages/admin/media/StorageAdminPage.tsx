/**
 * Storage Admin Page
 * Admin page for storage management
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { StorageAdmin } from '@/components/features/admin/media'

const StorageAdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <StorageAdmin />
      </Container>
    </AdminLayout>
  )
}

export default StorageAdminPage

