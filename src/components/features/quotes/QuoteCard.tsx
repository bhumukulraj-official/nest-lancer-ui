/**
 * QuoteCard Component
 * Quote display card with pricing information, timeline, and status
 */

import {
  Visibility,
  Edit,
  Delete,
  CheckCircle,
  AttachMoney,
  Schedule,
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
  Grid,
  Divider,
} from '@mui/material'
import React from 'react'

import { Quote } from '@/types/models/quote.types'
import { formatCurrency, formatDate } from '@/utils'

interface QuoteCardProps {
  quote: Quote
  onView?: (quote: Quote) => void
  onEdit?: (quote: Quote) => void
  onDelete?: (quote: Quote) => void
  onAccept?: (quote: Quote) => void
  showActions?: boolean
  variant?: 'default' | 'compact'
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  onView,
  onEdit,
  onDelete,
  onAccept,
  showActions = true,
  variant = 'default',
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'accepted':
        return 'success'
      case 'rejected':
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
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {quote.title}
            </Typography>
            <Chip
              label={quote.status}
              color={getStatusColor(quote.status) as any}
              size="small"
            />
          </Box>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
          noWrap={variant === 'compact'}
        >
          {quote.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Quote Details */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AttachMoney fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  Total:
                </Typography>
              </Box>
              <Typography variant="h6" color="primary">
                {formatCurrency(quote.totalAmount)}
              </Typography>
            </Box>
          </Grid>

          {quote.estimatedDuration && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Schedule fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  Duration: {quote.estimatedDuration} days
                </Typography>
              </Box>
            </Grid>
          )}

          {quote.deadline && (
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                Deadline: {formatDate(quote.deadline)}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>

      {/* Actions */}
      {showActions && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            {quote.status === 'pending' && onAccept && (
              <Tooltip title="Accept Quote">
                <IconButton
                  size="small"
                  color="success"
                  onClick={() => onAccept(quote)}
                >
                  <CheckCircle fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onView && (
              <Tooltip title="View Details">
                <IconButton size="small" onClick={() => onView(quote)}>
                  <Visibility fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onEdit && (
              <Tooltip title="Edit Quote">
                <IconButton size="small" onClick={() => onEdit(quote)}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Delete Quote">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(quote)}
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

export default QuoteCard

