import React from 'react'
import { Container } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { MediaUpload } from '@/components/features/media'

export const MediaUploadPage: React.FC = () => {
  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MediaUpload />
      </Container>
    </UserLayout>
  )
}

export default MediaUploadPage

