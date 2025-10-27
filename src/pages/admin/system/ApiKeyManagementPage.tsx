/**
 * API Key Management Page
 * Admin page for managing API keys
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ApiKeyManager } from '@/components/features/admin/system'

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


