import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { RequestDetail } from '@/components/features/requests'

export const RequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  // Mock data - replace with actual API call
  const mockRequest = { id: id || '1', title: 'Sample Request', description: '', status: 'pending', budget: 0, deadline: new Date() }

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <RequestDetail request={mockRequest as any} />
      </Container>
    </UserLayout>
  )
}

export default RequestDetailPage

