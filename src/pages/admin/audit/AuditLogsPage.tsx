/**
 * Audit Logs Page
 * Admin page for viewing audit logs
 */

import { Container } from '@mui/material'
import React from 'react'

import { AuditLogs } from '@/components/features/admin/audit'
import { AdminLayout } from '@/components/layout/AdminLayout'

const AuditLogsPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <AuditLogs />
      </Container>
    </AdminLayout>
  )
}

export default AuditLogsPage

