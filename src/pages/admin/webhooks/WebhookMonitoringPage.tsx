/**
 * Webhook Monitoring Page
 * Admin page for webhook monitoring
 */

import { Container } from '@mui/material'
import React from 'react'

import { WebhookMonitoring } from '@/components/features/admin/webhooks'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

