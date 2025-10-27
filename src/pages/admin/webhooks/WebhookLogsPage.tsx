/**
 * Webhook Logs Page
 * Admin page for viewing webhook logs
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { WebhookLogs } from '@/components/features/admin/webhooks'

const WebhookLogsPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <WebhookLogs />
      </Container>
    </AdminLayout>
  )
}

export default WebhookLogsPage

