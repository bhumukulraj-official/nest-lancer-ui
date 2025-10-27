/**
 * Request Detail Admin Component
 * Admin view for detailed request information
 */

import React from 'react'
import { Box, Paper, Typography, Chip, Grid, Divider, Button } from '@mui/material'
import { Edit as EditIcon, CheckCircle } from '@mui/icons-material'
import { LoadingButton } from '@/components/shared/Button/LoadingButton'
import { formatDate } from '@/utils/formatters/dateFormatter'
import { formatCurrency } from '@/utils/formatters/currencyFormatter'

interface RequestDetailAdminProps {
  request: any
  onEdit?: () => void
  onApprove?: () => void
}

const RequestDetailAdmin: React.FC<RequestDetailAdminProps> = ({ request, onEdit, onApprove }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {request.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip label={request.category} size="small" color="primary" />
            <Chip label={request.status} size="small" color="success" />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {onApprove && (
            <LoadingButton variant="contained" startIcon={<CheckCircle />} onClick={onApprove}>
              Approve
            </LoadingButton>
          )}
          <LoadingButton variant="outlined" startIcon={<EditIcon />} onClick={onEdit}>
            Edit
          </LoadingButton>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Request Details
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Category:</strong> {request.category}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Budget:</strong> {formatCurrency(request.budget)}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Status:</strong> {request.status}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Created:</strong> {formatDate(request.createdAt)}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Client Information
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Client:</strong> {request.clientName || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Email:</strong> {request.clientEmail || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Phone:</strong> {request.clientPhone || 'N/A'}
            </Typography>
          </Box>
        </Grid>

        {request.description && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Description
            </Typography>
            <Typography variant="body2">{request.description}</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

export default RequestDetailAdmin

