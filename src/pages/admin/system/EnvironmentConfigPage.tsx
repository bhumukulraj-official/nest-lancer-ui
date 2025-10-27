/**
 * Environment Configuration Page
 * Admin page for managing environment variables and configuration
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { EnvironmentConfig } from '@/components/features/admin/system'

const EnvironmentConfigPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <EnvironmentConfig />
      </Container>
    </AdminLayout>
  )
}

export default EnvironmentConfigPage

