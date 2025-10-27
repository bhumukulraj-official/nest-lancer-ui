import { Container } from '@mui/material'
import React from 'react'

import { MediaUpload } from '@/components/features/media'
import { UserLayout } from '@/components/layout'

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

