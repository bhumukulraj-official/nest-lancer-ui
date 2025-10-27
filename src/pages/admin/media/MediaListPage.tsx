/**
 * Media List Page
 * Admin page for managing media files
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { MediaListAdmin } from '@/components/features/admin/media'

const MediaListPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <MediaListAdmin />
      </Container>
    </AdminLayout>
  )
}

export default MediaListPage

