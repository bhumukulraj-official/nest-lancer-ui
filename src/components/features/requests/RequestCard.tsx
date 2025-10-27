/**
 * RequestCard Component
 * Request display card with status indicators and timeline
 */

import {
  Visibility,
  Edit,
  Delete,
  Schedule,
  AttachMoney,
  Person,
} from '@mui/icons-material'
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material'
import React from 'react'

import { Request } from '@/types/models/request.types'
import { formatCurrency, formatDate } from '@/utils'

interface RequestCardProps {
  request: Request
  onView?: (request: Request) => void
  onEdit?: (request: Request) => void
  onDelete?: (request: Request) => void
  showActions?: boolean
  variant?: 'default' | 'compact'
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onView,
  onEdit,
  onDelete,
  showActions = true,
  variant = 'default',
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'in_progress':
        return 'info'
      case 'completed':
        return 'success'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            {request.title}
          </Typography>
          <Chip
            label={request.status}
            color={getStatusColor(request.status) as any}
            size="small"
          />
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
          noWrap={variant === 'compact'}
        >
          {request.description}
        </Typography>

        {/* Meta Information */}
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoney fontSize="small" color="action" />
            <Typography variant="body2">
              Budget: {formatCurrency(request.budget)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Schedule fontSize="small" color="action" />
            <Typography variant="body2">
              Deadline: {request.deadline ? formatDate(request.deadline) : 'Not set'}
            </Typography>
          </Box>
          {request.client && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person fontSize="small" color="action" />
              <Typography variant="body2">
                Client: {request.client.name}
              </Typography>
            </Box>
          )}
        </Stack>

        {/* Progress (if applicable) */}
        {request.progressPercentage !== undefined && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={request.progressPercentage}
              sx={{ mb: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              {request.progressPercentage}% Complete
            </Typography>
          </Box>
        )}
      </CardContent>

      {/* Actions */}
      {showActions && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            {onView && (
              <Tooltip title="View Details">
                <IconButton size="small" onClick={() => onView(request)}>
                  <Visibility fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onEdit && (
              <Tooltip title="Edit Request">
                <IconButton size="small" onClick={() => onEdit(request)}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Delete Request">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(request)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Box>
      )}
    </Card>
  )
}

export default RequestCard
