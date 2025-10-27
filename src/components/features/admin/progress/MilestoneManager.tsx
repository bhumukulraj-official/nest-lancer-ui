/**
 * Milestone Manager Admin Component
 * Manages project milestones
 */

import React from 'react'
import { Box, Paper, Typography, Chip, Button, Stack, Divider } from '@mui/material'
import { Add, CheckCircle } from '@mui/icons-material'
import { formatDate } from '@/utils/formatters/dateFormatter'

interface Milestone {
  id: string
  title: string
  description: string
  dueDate: string
  status: string
}

const MilestoneManager: React.FC = () => {
  // Mock data
  const milestones: Milestone[] = []

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Milestone Management</Typography>
        <Button variant="contained" startIcon={<Add />}>
          Add Milestone
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        {milestones.length === 0 ? (
          <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 4 }}>
            No milestones available
          </Typography>
        ) : (
          milestones.map((milestone) => (
            <Box key={milestone.id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {milestone.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Due: {formatDate(milestone.dueDate)}
                  </Typography>
                </Box>
                <Chip
                  icon={<CheckCircle />}
                  label={milestone.status}
                  size="small"
                  color={milestone.status === 'completed' ? 'success' : 'default'}
                />
              </Box>
              <Typography variant="body2">{milestone.description}</Typography>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  )
}

export default MilestoneManager

