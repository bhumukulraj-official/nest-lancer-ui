import React from 'react'
import { Container } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { NotificationCenter } from '@/components/features/notifications'

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

