import { Container } from '@mui/material'
import React from 'react'

import { ProgressTimeline } from '@/components/features/progress'
import { UserLayout } from '@/components/layout'

export const ProgressTimelinePage: React.FC = () => {
  const mockMilestones: any[] = []

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ProgressTimeline milestones={mockMilestones} overallProgress={0} />
      </Container>
    </UserLayout>
  )
}

export default ProgressTimelinePage

