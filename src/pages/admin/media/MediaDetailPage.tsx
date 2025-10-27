/**
 * Media Detail Page
 * Admin page for viewing individual media details
 */

import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { MediaDetailAdmin } from '@/components/features/admin/media'

const MediaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <MediaDetailAdmin mediaId={id} />
      </Container>
    </AdminLayout>
  )
}

export default MediaDetailPage

