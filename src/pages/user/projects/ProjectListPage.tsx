/**
 * Project List Page
 * Page for displaying user's projects with filtering and search
 */

import { Container, Box, Typography } from '@mui/material'
import React from 'react'

import { ProjectList } from '@/components/features/projects'
import { UserLayout } from '@/components/layout'

export const ProjectListPage: React.FC = () => {
  // This would typically fetch from API
  const projects: any[] = []

  return (
    <UserLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            My Projects
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track all your projects in one place
          </Typography>
        </Box>

        <ProjectList projects={projects} />
      </Container>
    </UserLayout>
  )
}

export default ProjectListPage

