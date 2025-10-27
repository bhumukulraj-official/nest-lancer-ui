/**
 * Contact Analytics Component
 */

import React from 'react'
import { Box, Grid, Paper, Typography, Divider } from '@mui/material'

const ContactAnalytics: React.FC = () => {
  const analytics = {
    totalMessages: 150,
    unreadMessages: 12,
    repliedMessages: 120,
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Contact Analytics
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4">{analytics.totalMessages}</Typography>
            <Typography variant="body2" color="textSecondary">
              Total Messages
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {analytics.unreadMessages}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Unread Messages
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {analytics.repliedMessages}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Replied Messages
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ContactAnalytics

