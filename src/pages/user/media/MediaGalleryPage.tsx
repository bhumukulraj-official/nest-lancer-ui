import React from 'react'
import { Container } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { MediaGallery } from '@/components/features/media'

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

