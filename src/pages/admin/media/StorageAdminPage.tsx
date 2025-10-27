/**
 * Storage Admin Page
 * Admin page for storage management
 */

import { Container } from '@mui/material'
import React from 'react'

import { StorageAdmin } from '@/components/features/admin/media'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

