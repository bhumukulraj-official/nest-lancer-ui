/**
 * Request Detail Page
 * Admin page for viewing detailed request information
 */

import { Container } from '@mui/material'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { RequestDetailAdmin } from '@/components/features/admin/requests'
import { AdminLayout } from '@/components/layout/AdminLayout'

const RequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // Placeholder data - replace with actual API call
  const request = {
    id: id || '',
    title: 'Sample Request',
    category: 'Web Development',
    budget: 5000,
    status: 'pending',
    createdAt: new Date().toISOString(),
    description: 'Sample request description',
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
  }

  const handleEdit = () => {
    navigate(`/admin/requests/${id}/edit`)
  }

  const handleApprove = () => {
    console.log('Approve request:', id)
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <RequestDetailAdmin
          request={request}
          onEdit={handleEdit}
          onApprove={handleApprove}
        />
      </Container>
    </AdminLayout>
  )
}

export default RequestDetailPage

