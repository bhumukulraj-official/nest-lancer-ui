import React from 'react'
import { Container } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { RequestList } from '@/components/features/requests'

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

