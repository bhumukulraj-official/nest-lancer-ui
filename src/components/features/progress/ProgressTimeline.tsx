/**
 * ProgressTimeline Component
 * Project progress timeline with milestone tracking and status updates
 */

import {
  CheckCircle,
  RadioButtonUnchecked,
  Schedule,
} from '@mui/icons-material'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
} from '@mui/material'
import React from 'react'

import { formatDate } from '@/utils'

interface Milestone {
  id: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed'
  dueDate: Date
  completedDate?: Date
}

interface ProgressTimelineProps {
  milestones: Milestone[]
  overallProgress: number
  currentPhase?: string
}

export const ProgressTimeline: React.FC<ProgressTimelineProps> = ({
  milestones,
  overallProgress,
  currentPhase,
}) => {
  const completedCount = milestones.filter(m => m.status === 'completed').length
  const totalCount = milestones.length

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Project Progress</Typography>
          <Chip
            label={`${Math.round(overallProgress)}% Complete`}
            color={overallProgress === 100 ? 'success' : 'primary'}
          />
        </Box>

        {/* Overall Progress Bar */}
        <Box sx={{ mb: 4 }}>
          <LinearProgress
            variant="determinate"
            value={overallProgress}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {completedCount} of {totalCount} milestones completed
          </Typography>
        </Box>

        {/* Current Phase */}
        {currentPhase && (
          <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Current Phase
            </Typography>
            <Typography variant="subtitle1">{currentPhase}</Typography>
          </Box>
        )}

        {/* Timeline */}
        <Timeline>
          {milestones.map((milestone, index) => (
            <TimelineItem key={milestone.id}>
              <TimelineSeparator>
                <TimelineDot
                  color={milestone.status === 'completed' ? 'success' : 'primary'}
                >
                  {milestone.status === 'completed' ? (
                    <CheckCircle fontSize="small" />
                  ) : (
                    <RadioButtonUnchecked fontSize="small" />
                  )}
                </TimelineDot>
                {index < milestones.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ py: 3 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle1">{milestone.title}</Typography>
                    <Chip
                      label={milestone.status}
                      size="small"
                      color={milestone.status === 'completed' ? 'success' : 'default'}
                    />
                  </Box>
                  {milestone.description && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {milestone.description}
                    </Typography>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Schedule fontSize="small" />
                    <Typography variant="caption" color="text.secondary">
                      Due: {formatDate(milestone.dueDate)}
                      {milestone.completedDate && ` | Completed: ${formatDate(milestone.completedDate)}`}
                    </Typography>
                  </Box>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ProgressTimeline

