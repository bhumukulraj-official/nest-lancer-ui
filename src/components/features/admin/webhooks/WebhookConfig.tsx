/**
 * Webhook Config Component
 */

import { Save } from '@mui/icons-material'
import { Box, Paper, Typography, TextField, Button, Stack, Switch, FormControlLabel, Divider } from '@mui/material'
import React, { useState } from 'react'

const WebhookConfig: React.FC = () => {
  const [url, setUrl] = useState('')
  const [enabled, setEnabled] = useState(false)

  const handleSave = () => {
    console.log('Save webhook config:', { url, enabled })
  }

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Webhook Configuration
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Webhook URL"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-webhook-url.com"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />}
            label="Enable Webhook"
          />
        </Box>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
            Save Configuration
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default WebhookConfig

