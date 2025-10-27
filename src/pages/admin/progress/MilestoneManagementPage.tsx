/**
 * Milestone Management Page
 * Admin page for managing project milestones
 */

import { Container } from '@mui/material'
import React from 'react'

import { MilestoneManager } from '@/components/features/admin/progress'
import { AdminLayout } from '@/components/layout/AdminLayout'

const MilestoneManagementPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <MilestoneManager />
      </Container>
    </AdminLayout>
  )
}

export default MilestoneManagementPage

