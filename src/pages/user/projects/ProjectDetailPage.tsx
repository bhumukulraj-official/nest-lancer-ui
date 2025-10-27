/**
 * Project Detail Page
 * Detailed view for a single project
 */

import { Container, Box, Typography, Breadcrumbs, Link } from '@mui/material'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { ProjectCard } from '@/components/features/projects'
import { UserLayout } from '@/components/layout'

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // This would typically fetch from API
  const project = {
    id: id || '1',
    title: 'Sample Project',
    description: 'This is a sample project description',
    status: 'active',
  }

  return (
    <UserLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              navigate('/app/projects')
            }}
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            Projects
          </Link>
          <Typography color="text.primary">Project Details</Typography>
        </Breadcrumbs>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            {project.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {project.description}
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 800 }}>
          <ProjectCard project={project as any} onView={undefined} />
        </Box>
      </Container>
    </UserLayout>
  )
}

export default ProjectDetailPage

