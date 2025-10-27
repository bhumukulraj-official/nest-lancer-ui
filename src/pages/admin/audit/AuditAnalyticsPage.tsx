/**
 * Audit Analytics Page
 * Admin page for audit analytics
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { AuditAnalytics } from '@/components/features/admin/audit'

const AuditAnalyticsPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <AuditAnalytics />
      </Container>
    </AdminLayout>
  )
}

export default AuditAnalyticsPage

