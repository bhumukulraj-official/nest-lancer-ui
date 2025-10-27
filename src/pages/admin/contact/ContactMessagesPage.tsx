/**
 * Contact Messages Page
 * Admin page for viewing contact messages
 */

import { Container } from '@mui/material'
import React from 'react'

import { ContactMessages } from '@/components/features/admin/contact'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

