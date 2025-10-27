/**
 * Project Edit Page
 * Admin page for editing existing projects
 */

import React from 'react'
import { Container, Box } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProjectEditForm } from '@/components/features/admin/projects'

const ProjectEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Placeholder project data - replace with actual data fetching
  const project = {
    id: id || '',
    title: 'Sample Project',
    description: 'Sample description',
    category: 'Web Development',
    budget: 5000,
    deadline: '2024-12-31',
    status: 'active',
    technologies: ['React', 'TypeScript', 'Node.js'],
  }

  const handleSubmit = async (data: any) => {
    try {
      // Call API to update project
      console.log('Update project:', data)
      navigate('/admin/projects')
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const handleCancel = () => {
    navigate('/admin/projects')
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <ProjectEditForm project={project} onSubmit={handleSubmit} onCancel={handleCancel} />
      </Container>
    </AdminLayout>
  )
}

export default ProjectEditPage

