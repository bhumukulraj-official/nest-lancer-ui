/**
 * Webhook Retry Component
 */

import React from 'react'
import { Box, Paper, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material'
import { Refresh } from '@mui/icons-material'

const WebhookRetry: React.FC = () => {
  const failedWebhooks: any[] = []

  const handleRetryAll = () => {
    console.log('Retry all failed webhooks')
  }

  const handleRetry = (id: string) => {
    console.log('Retry webhook:', id)
  }

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Failed Webhooks</Typography>
        <Button variant="contained" startIcon={<Refresh />} onClick={handleRetryAll}>
          Retry All
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        {failedWebhooks.length === 0 ? (
          <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 4 }}>
            No failed webhooks
          </Typography>
        ) : (
          <List>
            {failedWebhooks.map((webhook) => (
              <ListItem
                key={webhook.id}
                secondaryAction={
                  <IconButton onClick={() => handleRetry(webhook.id)}>
                    <Refresh />
                  </IconButton>
                }
              >
                <ListItemText primary={webhook.url} secondary={webhook.error} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  )
}

export default WebhookRetry

