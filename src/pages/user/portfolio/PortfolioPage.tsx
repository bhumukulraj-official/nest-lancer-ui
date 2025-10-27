/**
 * Portfolio Page
 * User's portfolio showcase page
 */

import { Container, Box, Typography } from '@mui/material'
import React from 'react'

import { PortfolioView, FeaturedProjects } from '@/components/features/portfolio'
import { UserLayout } from '@/components/layout'

export const PortfolioPage: React.FC = () => {
  // This would typically fetch from API
  const featuredProjects: any[] = []

  return (
    <UserLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            My Portfolio
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Showcase your work and skills to potential clients
          </Typography>
        </Box>

        <PortfolioView
          isOwn={true}
        />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Featured Projects
          </Typography>
          <FeaturedProjects projects={featuredProjects} />
        </Box>
      </Container>
    </UserLayout>
  )
}

export default PortfolioPage

