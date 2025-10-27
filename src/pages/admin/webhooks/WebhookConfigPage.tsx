/**
 * Webhook Config Page
 * Admin page for webhook configuration
 */

import { Container } from '@mui/material'
import React from 'react'

import { WebhookConfig } from '@/components/features/admin/webhooks'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

