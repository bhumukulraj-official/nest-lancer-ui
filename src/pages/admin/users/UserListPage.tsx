/**
 * User List Page
 * Admin page for viewing and managing all users
 */

import { Container } from '@mui/material'
import React from 'react'

import { UserList } from '@/components/features/admin/users'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

