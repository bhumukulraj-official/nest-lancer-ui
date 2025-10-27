/**
 * Webhook Config Page
 * Admin page for webhook configuration
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { WebhookConfig } from '@/components/features/admin/webhooks'

const WebhookConfigPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <WebhookConfig />
      </Container>
    </AdminLayout>
  )
}

export default WebhookConfigPage

