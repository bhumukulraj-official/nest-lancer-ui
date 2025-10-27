import { Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { RequestForm } from '@/components/features/requests'
import { UserLayout } from '@/components/layout'


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

