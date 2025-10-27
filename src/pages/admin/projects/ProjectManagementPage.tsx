/**
 * Project Management Page
 * Admin page for comprehensive project management
 */

import { Add as AddIcon } from '@mui/icons-material'
import { Container, Box, Typography, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { BulkProjectActions } from '@/components/features/admin/projects'
import { AdminLayout } from '@/components/layout/AdminLayout'

const ProjectManagementPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedProjects, setSelectedProjects] = React.useState<string[]>([])

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h1">
            Project Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/projects/create')}
            >
              Create Project
            </Button>
          </Box>
        </Box>

        <BulkProjectActions
          selectedProjects={selectedProjects}
          onActionComplete={() => setSelectedProjects([])}
        />
      </Container>
    </AdminLayout>
  )
}

export default ProjectManagementPage

