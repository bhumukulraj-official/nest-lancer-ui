/**
 * RequestDetail Component
 * Request detail view with full information and management options
 */

import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Stack,
  Grid,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  LinearProgress,
} from '@mui/material'
import {
  Edit,
  Delete,
  Visibility,
  AttachFile,
  Person,
  AttachMoney,
  Schedule,
  Assignment,
  Description,
} from '@mui/icons-material'
import { Request } from '@/types/models/request.types'
import { formatCurrency, formatDate } from '@/utils'

interface RequestDetailProps {
  request: Request
  onEdit?: () => void
  onDelete?: () => void
  onViewResponses?: () => void
  showActions?: boolean
}

export const RequestDetail: React.FC<RequestDetailProps> = ({
  request,
  onEdit,
  onDelete,
  onViewResponses,
  showActions = true,
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
    <Card>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {request.title}
            </Typography>
            <Chip
              label={request.status}
              color={getStatusColor(request.status) as any}
              sx={{ mt: 1 }}
            />
          </Box>
          {showActions && (
            <Stack direction="row" spacing={1}>
              {onEdit && (
                <Tooltip title="Edit Request">
                  <IconButton onClick={onEdit} color="primary">
                    <Edit />
                  </IconButton>
                </Tooltip>
              )}
              {onDelete && (
                <Tooltip title="Delete Request">
                  <IconButton onClick={onDelete} color="error">
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Description */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Description />
            Description
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {request.description}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Details Grid */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Budget */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Budget
              </Typography>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AttachMoney color="primary" />
                {formatCurrency(request.budget)}
              </Typography>
            </Box>
          </Grid>

          {/* Deadline */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Deadline
              </Typography>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Schedule color="primary" />
                {request.deadline ? formatDate(request.deadline) : 'Not set'}
              </Typography>
            </Box>
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Status
              </Typography>
              <Chip label={request.status} color={getStatusColor(request.status) as any} />
            </Box>
          </Grid>

          {/* Priority */}
          {request.priority && (
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                  Priority
                </Typography>
                <Typography variant="h6">{request.priority}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Client Info */}
        {request.client && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person />
              Client Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Avatar src={request.client.avatar} sx={{ width: 56, height: 56 }}>
                {request.client.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1">{request.client.name}</Typography>
                {request.client.email && (
                  <Typography variant="body2" color="text.secondary">
                    {request.client.email}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        )}

        {/* Progress */}
        {request.progressPercentage !== undefined && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Assignment />
              Progress
            </Typography>
            <Box sx={{ mt: 2 }}>
              <LinearProgress
                variant="determinate"
                value={request.progressPercentage}
                sx={{ mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {request.progressPercentage}% Complete
              </Typography>
            </Box>
          </Box>
        )}

        {/* Files/Attachments */}
        {request.attachments && request.attachments.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AttachFile />
              Attachments
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              {request.attachments.map((attachment, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachFile />
                  <Typography variant="body2">{attachment.filename}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Actions */}
        {onViewResponses && (
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Visibility />}
              onClick={onViewResponses}
            >
              View Responses & Timeline
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default RequestDetail

