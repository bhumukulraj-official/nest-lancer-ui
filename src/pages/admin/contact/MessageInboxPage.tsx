/**
 * Message Inbox Page
 * Admin page for managing message inbox
 */

import { Container } from '@mui/material'
import React from 'react'

import { MessageInbox } from '@/components/features/admin/contact'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

