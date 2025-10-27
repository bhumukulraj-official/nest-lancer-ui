/**
 * User Detail Page
 * Admin page for viewing detailed user information
 */

import React, { useEffect } from 'react'
import { Container, Box } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { UserDetail } from '@/components/features/admin/users'
import { useAdminUsers } from '@/hooks/admin/useAdminUsers'

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentUser: user, fetchUser, loading } = useAdminUsers({ autoFetch: false })

  useEffect(() => {
    if (id) {
      fetchUser(id)
    }
  }, [id, fetchUser])

  const handleEdit = () => {
    navigate(`/admin/users/${id}/edit`)
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
        <UserDetail user={user} onEdit={handleEdit} />
      </Container>
    </AdminLayout>
  )
}

export default UserDetailPage

