import { Container } from '@mui/material'
import React from 'react'

import { MediaGallery } from '@/components/features/media'
import { UserLayout } from '@/components/layout'

export const MediaGalleryPage: React.FC = () => {
  const mockMedia: any[] = []

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MediaGallery media={mockMedia} />
      </Container>
    </UserLayout>
  )
}

export default MediaGalleryPage

