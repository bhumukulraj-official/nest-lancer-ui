/**
 * System Info Page
 * Admin page for viewing system information
 */

import { Container } from '@mui/material'
import React from 'react'

import { SystemInfo } from '@/components/features/admin/system'
import { AdminLayout } from '@/components/layout/AdminLayout'

const SystemInfoPage: React.FC = () => {
  // Mock data - replace with actual API call
  const systemInfo = {
    version: '1.0.0',
    environment: 'production',
    nodeVersion: '18.0.0',
    uptime: '5 days, 3 hours',
    memory: {
      total: '8 GB',
      used: '4.2 GB',
      free: '3.8 GB',
    },
    disk: {
      total: '100 GB',
      used: '45 GB',
      free: '55 GB',
    },
    cpu: {
      usage: '35%',
      cores: 8,
    },
    services: {
      database: 'online' as const,
      cache: 'online' as const,
      queue: 'online' as const,
    },
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <SystemInfo systemInfo={systemInfo} />
      </Container>
    </AdminLayout>
  )
}

export default SystemInfoPage

