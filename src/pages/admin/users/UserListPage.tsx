/**
 * User List Page
 * Admin page for viewing and managing all users
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { UserList } from '@/components/features/admin/users'

const UserListPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <UserList />
      </Container>
    </AdminLayout>
  )
}

export default UserListPage

