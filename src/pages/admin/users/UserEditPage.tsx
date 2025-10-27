/**
 * User Edit Page
 * Admin page for editing user information
 */

import React from 'react'
import { Container, Box } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { UserEditForm } from '@/components/features/admin/users'
import { useUsersQuery } from '@/hooks/admin/useAdminUsers'
import { User } from '@/types/models/user.types'

const UserEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: user } = useUsersQuery({ id })

  const handleSubmit = async (data: Partial<User>) => {
    try {
      // Call API to update user
      console.log('Update user:', data)
      navigate('/admin/users')
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleCancel = () => {
    navigate('/admin/users')
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
        <UserEditForm user={user} onSubmit={handleSubmit} onCancel={handleCancel} />
      </Container>
    </AdminLayout>
  )
}

export default UserEditPage

