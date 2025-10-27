/**
 * User Detail Page
 * Admin page for viewing detailed user information
 */

import React from 'react'
import { Container, Box } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { UserDetail } from '@/components/features/admin/users'
import { useUsersQuery } from '@/hooks/admin/useAdminUsers'

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: user } = useUsersQuery({ id })

  const handleEdit = () => {
    navigate(`/admin/users/${id}/edit`)
  }

  if (!user) {
    return (
      <AdminLayout>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Box>Loading...</Box>
        </Container>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <UserDetail user={user} onEdit={handleEdit} />
      </Container>
    </AdminLayout>
  )
}

export default UserDetailPage

