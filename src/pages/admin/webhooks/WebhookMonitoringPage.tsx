/**
 * Webhook Monitoring Page
 * Admin page for webhook monitoring
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { WebhookMonitoring } from '@/components/features/admin/webhooks'

const WebhookMonitoringPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <WebhookMonitoring />
      </Container>
    </AdminLayout>
  )
}

export default WebhookMonitoringPage

