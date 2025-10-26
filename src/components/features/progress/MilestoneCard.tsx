/**
 * MilestoneCard Component
 * Milestone display card with progress information and status indicators
 */

import React from 'react'
import { Card, CardContent, Typography, Chip, Box, LinearProgress, IconButton } from '@mui/material'
import { CheckCircle, Edit, Delete } from '@mui/icons-material'
import { formatDate } from '@/utils'

interface MilestoneCardProps {
  id: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed'
  dueDate: Date
  completedDate?: Date
  progress?: number
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  id,
  title,
  description,
  status,
  dueDate,
  completedDate,
  progress,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6">{title}</Typography>
              <Chip
                label={status}
                size="small"
                color={status === 'completed' ? 'success' : status === 'in_progress' ? 'info' : 'default'}
              />
            </Box>
            {description && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {description}
              </Typography>
            )}
            {progress !== undefined && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="caption" color="text.secondary">
                  {progress}% complete
                </Typography>
              </Box>
            )}
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 2 }}>
              Due: {formatDate(dueDate)}
              {completedDate && ` | Completed: ${formatDate(completedDate)}`}
            </Typography>
          </Box>
          {(onEdit || onDelete) && (
            <Box>
              {onEdit && <IconButton size="small" onClick={() => onEdit(id)}><Edit /></IconButton>}
              {onDelete && <IconButton size="small" color="error" onClick={() => onDelete(id)}><Delete /></IconButton>}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default MilestoneCard

