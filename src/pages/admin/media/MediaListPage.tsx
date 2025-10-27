/**
 * Media List Page
 * Admin page for managing media files
 */

import { Container } from '@mui/material'
import React from 'react'

import { MediaListAdmin } from '@/components/features/admin/media'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

