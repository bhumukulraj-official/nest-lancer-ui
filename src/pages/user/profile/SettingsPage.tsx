/**
 * Settings Page
 * User settings page for preferences and account management
 */

import React from 'react'
import { Container, Typography } from '@mui/material'
import { UserLayout } from '@/components/layout'
import SettingsForm from '@/components/features/profile/SettingsForm'

export const SettingsPage: React.FC = () => {
  return (
    <UserLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Settings
        </Typography>

        <SettingsForm />
      </Container>
    </UserLayout>
  )
}

export default SettingsPage
