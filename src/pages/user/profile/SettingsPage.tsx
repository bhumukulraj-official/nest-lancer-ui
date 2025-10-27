/**
 * Settings Page
 * User settings page for preferences and account management
 */

import { Container, Typography } from '@mui/material'
import React from 'react'

import SettingsForm from '@/components/features/profile/SettingsForm'
import { UserLayout } from '@/components/layout'

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
