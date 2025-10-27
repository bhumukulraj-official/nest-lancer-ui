/**
 * Milestone Management Page
 * Admin page for managing project milestones
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { MilestoneManager } from '@/components/features/admin/progress'

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

