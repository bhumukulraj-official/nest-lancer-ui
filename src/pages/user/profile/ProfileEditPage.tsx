/**
 * Profile Edit Page
 * User profile editing page with form and avatar upload
 */

import React from 'react'
import { Container, Typography } from '@mui/material'
import { UserLayout } from '@/components/layout'
import ProfileForm from '@/components/features/profile/ProfileForm'
import AvatarUpload from '@/components/features/profile/AvatarUpload'
import Grid from '@mui/material/Grid'

export const ProfileEditPage: React.FC = () => {
  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Edit Profile
        </Typography>

        <Grid container spacing={4}>
          {/* Avatar Upload */}
          <Grid item xs={12} md={4}>
            <AvatarUpload />
          </Grid>

          {/* Profile Form */}
          <Grid item xs={12} md={8}>
            <ProfileForm />
          </Grid>
        </Grid>
      </Container>
    </UserLayout>
  )
}

export default ProfileEditPage
