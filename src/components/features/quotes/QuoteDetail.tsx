/**
 * QuoteDetail Component
 * Quote detail view with full pricing breakdown and terms
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
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import {
  Edit,
  Delete,
  Visibility,
  AttachMoney,
  Schedule,
  Assignment,
  Description,
  CheckCircle,
} from '@mui/icons-material'
import { Quote } from '@/types/models/quote.types'
import { formatCurrency, formatDate } from '@/utils'

interface QuoteDetailProps {
  quote: Quote
  onEdit?: () => void
  onDelete?: () => void
  onAccept?: () => void
  showActions?: boolean
}

export const QuoteDetail: React.FC<QuoteDetailProps> = ({
  quote,
  onEdit,
  onDelete,
  onAccept,
  showActions = true,
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
    <Card>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {quote.title}
            </Typography>
            <Chip
              label={quote.status}
              color={getStatusColor(quote.status) as any}
              sx={{ mt: 1 }}
            />
          </Box>
          {showActions && (
            <Stack direction="row" spacing={1}>
              {quote.status === 'pending' && onAccept && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircle />}
                  onClick={onAccept}
                >
                  Accept Quote
                </Button>
              )}
              {onEdit && (
                <Tooltip title="Edit Quote">
                  <IconButton onClick={onEdit} color="primary">
                    <Edit />
                  </IconButton>
                </Tooltip>
              )}
              {onDelete && (
                <Tooltip title="Delete Quote">
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
            {quote.description}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Pricing */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoney />
            Pricing Breakdown
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Total Amount
                </Typography>
                <Typography variant="h5" color="primary">
                  {formatCurrency(quote.totalAmount)}
                </Typography>
              </Box>
            </Grid>
            {quote.estimatedDuration && (
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    Estimated Duration
                  </Typography>
                  <Typography variant="h6">{quote.estimatedDuration} days</Typography>
                </Box>
              </Grid>
            )}
            {quote.deadline && (
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    Deadline
                  </Typography>
                  <Typography variant="body2">{formatDate(quote.deadline)}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Timeline (if applicable) */}
        {quote.milestones && quote.milestones.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Assignment />
              Project Milestones
            </Typography>
            <List sx={{ mt: 2 }}>
              {quote.milestones.map((milestone, index) => (
                <ListItem key={index} divider={index < quote.milestones!.length - 1}>
                  <ListItemText
                    primary={milestone.title}
                    secondary={`${formatCurrency(milestone.amount)} - ${formatDate(milestone.dueDate)}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Terms and Conditions */}
        {quote.termsAndConditions && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Terms and Conditions
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {quote.termsAndConditions}
            </Typography>
          </Box>
        )}

        {/* Progress (if applicable) */}
        {quote.progressPercentage !== undefined && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quote Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={quote.progressPercentage}
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {quote.progressPercentage}% Complete
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default QuoteDetail

