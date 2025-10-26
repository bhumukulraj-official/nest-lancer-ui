import React from 'react'
import { Container } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { RequestForm } from '@/components/features/requests'
import { useNavigate } from 'react-router-dom'

export const RequestCreatePage: React.FC = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    // API call here
    console.log('Creating request:', data)
    navigate('/user/requests')
  }

  return (
    <UserLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <RequestForm onSubmit={handleSubmit} onCancel={() => navigate('/user/requests')} />
      </Container>
    </UserLayout>
  )
}

export default RequestCreatePage

