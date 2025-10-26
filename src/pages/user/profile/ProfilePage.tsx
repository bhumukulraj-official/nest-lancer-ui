/**
 * Profile Page
 * User profile view page displaying user information and portfolio
 */

import React from 'react'
import { Container, Typography, Box, Avatar, Grid, Card, CardContent, Chip, Stack } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { UserApiService } from '@/services/user'
import { useAuth } from '@/hooks/auth/useAuth'

export const ProfilePage: React.FC = () => {
  const { user } = useAuth()
  const [profileData, setProfileData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        try {
          const data = await UserApiService.getCurrentUser()
          setProfileData(data)
        } catch (error) {
          console.error('Error fetching profile:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchProfile()
  }, [user])

  if (loading) {
    return (
      <UserLayout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <Typography>Loading profile...</Typography>
          </Box>
        </Container>
      </UserLayout>
    )
  }

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Header */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    src={profileData?.avatar || profileData?.user?.avatar}
                    sx={{ width: 120, height: 120 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" gutterBottom>
                  {profileData?.name || profileData?.user?.name || 'User Profile'}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {profileData?.title || profileData?.user?.title || 'Freelancer'}
                </Typography>
                {profileData?.bio && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {profileData.bio}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Stack spacing={2} sx={{ mt: 2 }}>
                  {profileData?.email && (
                    <Typography variant="body2">
                      <strong>Email:</strong> {profileData.email}
                    </Typography>
                  )}
                  {profileData?.phone && (
                    <Typography variant="body2">
                      <strong>Phone:</strong> {profileData.phone}
                    </Typography>
                  )}
                  {profileData?.location && (
                    <Typography variant="body2">
                      <strong>Location:</strong> {profileData.location}
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Skills */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                  {profileData?.skills?.map((skill: string, index: number) => (
                    <Chip key={index} label={skill} size="small" color="primary" variant="outlined" />
                  )) || <Typography variant="body2" color="text.secondary">No skills added</Typography>}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Portfolio Summary */}
          {profileData?.portfolio && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Portfolio Summary
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profileData.portfolio.summary || 'No portfolio summary available'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </UserLayout>
  )
}

export default ProfilePage
