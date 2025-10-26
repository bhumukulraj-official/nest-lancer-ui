/**
 * ProgressTracker Component
 * Progress tracking component with overall project progress and milestone completion
 */

import React from 'react'
import { Card, CardContent, Typography, Box, Grid, LinearProgress } from '@mui/material'

interface ProgressTrackerProps {
  overallProgress: number
  completedMilestones: number
  totalMilestones: number
  upcomingMilestones?: Array<{ title: string; dueDate: Date }>
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  overallProgress,
  completedMilestones,
  totalMilestones,
  upcomingMilestones,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Project Progress Overview
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Overall Progress
              </Typography>
              <Typography variant="h4" color="primary">
                {Math.round(overallProgress)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={overallProgress}
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Milestones
              </Typography>
              <Typography variant="h4" color="primary">
                {completedMilestones} / {totalMilestones}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {Math.round((completedMilestones / totalMilestones) * 100)}% completed
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {upcomingMilestones && upcomingMilestones.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Upcoming Milestones
            </Typography>
            {upcomingMilestones.slice(0, 3).map((milestone, index) => (
              <Box key={index} sx={{ py: 1, borderBottom: index < 2 ? 1 : 0, borderColor: 'divider' }}>
                <Typography variant="body2">{milestone.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Due: {milestone.dueDate.toLocaleDateString()}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default ProgressTracker

