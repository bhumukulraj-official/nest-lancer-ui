/**
 * API Key Management Page
 * Admin page for managing API keys
 */

import { Container } from '@mui/material'
import React from 'react'

import { ApiKeyManager } from '@/components/features/admin/system'
import { AdminLayout } from '@/components/layout/AdminLayout'

const ApiKeyManagementPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <ApiKeyManager />
      </Container>
    </AdminLayout>
  )
}

export default ApiKeyManagementPage


