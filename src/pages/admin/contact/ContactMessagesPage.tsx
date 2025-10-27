/**
 * Contact Messages Page
 * Admin page for viewing contact messages
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ContactMessages } from '@/components/features/admin/contact'

const ContactMessagesPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <ContactMessages />
      </Container>
    </AdminLayout>
  )
}

export default ContactMessagesPage

