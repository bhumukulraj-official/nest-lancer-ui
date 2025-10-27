/**
 * Environment Configuration Page
 * Admin page for managing environment variables and configuration
 */

import { Container } from '@mui/material'
import React from 'react'

import { EnvironmentConfig } from '@/components/features/admin/system'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

