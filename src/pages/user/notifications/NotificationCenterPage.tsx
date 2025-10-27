import { Container } from '@mui/material'
import React from 'react'

import { NotificationCenter } from '@/components/features/notifications'
import { UserLayout } from '@/components/layout'

export const NotificationCenterPage: React.FC = () => {
  const mockNotifications: any[] = []

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <NotificationCenter notifications={mockNotifications} />
      </Container>
    </UserLayout>
  )
}

export default NotificationCenterPage

