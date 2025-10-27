/**
 * Audit Logs Page
 * Admin page for viewing audit logs
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { AuditLogs } from '@/components/features/admin/audit'

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

