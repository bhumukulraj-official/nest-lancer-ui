/**
 * Quote Detail Admin Component
 * Detailed admin view for managing individual quotes
 */

import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Chip,
  Grid,
  Divider,
  Button,
  Stack,
} from '@mui/material'
import { Edit, Delete, ArrowBack } from '@mui/icons-material'
import { formatDate } from '@/utils/formatters/dateFormatter'
import { formatCurrency } from '@/utils/formatters/currencyFormatter'

interface QuoteDetailAdminProps {
  quoteId?: string
}

const QuoteDetailAdmin: React.FC<QuoteDetailAdminProps> = ({ quoteId }) => {
  // Mock data - replace with actual API call
  const quote = {
    id: quoteId || '1',
    requestId: 'REQ-001',
    clientId: 'CLIENT-001',
    amount: 5000,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  const handleEdit = () => {
    console.log('Edit quote:', quote)
  }

  const handleDelete = () => {
    console.log('Delete quote:', quote)
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button startIcon={<ArrowBack />} variant="outlined">
          Back to List
        </Button>
        <Button startIcon={<Edit />} variant="contained" onClick={handleEdit}>
          Edit Quote
        </Button>
        <Button startIcon={<Delete />} variant="outlined" color="error" onClick={handleDelete}>
          Delete Quote
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quote Information
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Request ID
                </Typography>
                <Typography variant="body1">{quote.requestId}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Client ID
                </Typography>
                <Typography variant="body1">{quote.clientId}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Amount
                </Typography>
                <Typography variant="h6" color="primary">
                  {formatCurrency(quote.amount)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Status
                </Typography>
                <Chip label={quote.status.toUpperCase()} color="primary" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  Created At
                </Typography>
                <Typography variant="body1">{formatDate(quote.createdAt)}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={2}>
              <Button variant="outlined" fullWidth>
                Approve Quote
              </Button>
              <Button variant="outlined" fullWidth>
                Reject Quote
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default QuoteDetailAdmin

