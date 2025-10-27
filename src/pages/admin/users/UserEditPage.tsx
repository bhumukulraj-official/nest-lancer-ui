/**
 * User Edit Page
 * Admin page for editing user information
 */

import { Container, Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { UserEditForm } from '@/components/features/admin/users'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { useAdminUsers } from '@/hooks/admin/useAdminUsers'
import { User } from '@/types/models/user.types'

const UserEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentUser: user, fetchUser, updateUser, loading } = useAdminUsers({ autoFetch: false })

  useEffect(() => {
    if (id) {
      fetchUser(id)
    }
  }, [id, fetchUser])

  const handleSubmit = async (data: Partial<User>) => {
    try {
      if (id) {
        await updateUser(id, data as any)
      }
      navigate('/admin/users')
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleCancel = () => {
    navigate('/admin/users')
  }

  if (loading || !user) {
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

