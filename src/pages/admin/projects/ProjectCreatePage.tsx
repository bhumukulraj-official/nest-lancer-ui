/**
 * Project Create Page
 * Admin page for creating new projects
 */

import React from 'react'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProjectCreateForm } from '@/components/features/admin/projects'

const ProjectCreatePage: React.FC = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    try {
      // Call API to create project
      console.log('Create project:', data)
      navigate('/admin/projects')
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  const handleCancel = () => {
    navigate('/admin/projects')
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <ProjectCreateForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </Container>
    </AdminLayout>
  )
}

export default ProjectCreatePage

