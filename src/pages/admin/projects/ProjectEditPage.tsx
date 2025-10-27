/**
 * Project Edit Page
 * Admin page for editing existing projects
 */

import { Container } from '@mui/material'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { ProjectEditForm } from '@/components/features/admin/projects'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

