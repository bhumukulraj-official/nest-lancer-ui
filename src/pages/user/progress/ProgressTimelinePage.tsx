import React from 'react'
import { Container } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { ProgressTimeline } from '@/components/features/progress'

export const ProgressTimelinePage: React.FC = () => {
  const mockMilestones = []

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ProgressTimeline milestones={mockMilestones} overallProgress={0} />
      </Container>
    </UserLayout>
  )
}

export default ProgressTimelinePage

