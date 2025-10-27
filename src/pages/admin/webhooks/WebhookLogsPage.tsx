/**
 * Webhook Logs Page
 * Admin page for viewing webhook logs
 */

import { Container } from '@mui/material'
import React from 'react'

import { WebhookLogs } from '@/components/features/admin/webhooks'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

