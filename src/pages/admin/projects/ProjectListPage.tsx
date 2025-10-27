/**
 * Project List Page
 * Admin page for viewing and managing all projects
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { DataGrid } from '@/components/shared/Table/DataGrid'

const ProjectListPage: React.FC = () => {
  // Placeholder data - replace with actual data fetching
  const projects = [
    { id: '1', title: 'Sample Project', category: 'Web Development', status: 'active' },
    { id: '2', title: 'Another Project', category: 'Mobile App', status: 'completed' },
  ]

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
  ]

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <DataGrid rows={projects} columns={columns} />
      </Container>
    </AdminLayout>
  )
}

export default ProjectListPage

