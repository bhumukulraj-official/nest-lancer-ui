/**
 * Webhook Monitoring Component
 */

import { CheckCircle, Cancel, Warning } from '@mui/icons-material'
import { Box, Grid, Paper, Typography, LinearProgress, Divider } from '@mui/material'
import React from 'react'

const WebhookMonitoring: React.FC = () => {
  const stats = {
    total: 100,
    successful: 95,
    failed: 3,
    pending: 2,
  }

  const successRate = ((stats.successful / stats.total) * 100).toFixed(1)

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Webhook Monitoring
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{stats.successful}</Typography>
            <Typography variant="body2" color="textSecondary">
              Successful
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Cancel color="error" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{stats.failed}</Typography>
            <Typography variant="body2" color="textSecondary">
              Failed
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Warning color="warning" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{stats.pending}</Typography>
            <Typography variant="body2" color="textSecondary">
              Pending
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Success Rate: {successRate}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={parseFloat(successRate)}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default WebhookMonitoring

