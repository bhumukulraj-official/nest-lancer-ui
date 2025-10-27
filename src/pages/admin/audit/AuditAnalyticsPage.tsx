/**
 * Audit Analytics Page
 * Admin page for audit analytics
 */

import { Container } from '@mui/material'
import React from 'react'

import { AuditAnalytics } from '@/components/features/admin/audit'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

