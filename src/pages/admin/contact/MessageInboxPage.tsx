/**
 * Message Inbox Page
 * Admin page for managing message inbox
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { MessageInbox } from '@/components/features/admin/contact'

const MessageInboxPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <MessageInbox />
      </Container>
    </AdminLayout>
  )
}

export default MessageInboxPage

