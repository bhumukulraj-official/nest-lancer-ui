import { Container } from '@mui/material'
import React from 'react'

import { RequestList } from '@/components/features/requests'
import { UserLayout } from '@/components/layout'

export const RequestListPage: React.FC = () => {
  // Mock data - replace with actual API call
  const mockRequests: any[] = []

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <RequestList requests={mockRequests} />
      </Container>
    </UserLayout>
  )
}

export default RequestListPage

