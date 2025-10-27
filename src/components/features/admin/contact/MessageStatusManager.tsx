/**
 * Message Status Manager Component
 */

import React, { useState } from 'react'
import { Box, Paper, Typography, Select, MenuItem, Button, Stack } from '@mui/material'

const MessageStatusManager: React.FC = () => {
  const [status, setStatus] = useState('pending')

  const handleSave = () => {
    console.log('Save status:', status)
  }

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Manage Status
        </Typography>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="read">Read</MenuItem>
          <MenuItem value="replied">Replied</MenuItem>
          <MenuItem value="archived">Archived</MenuItem>
        </Select>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default MessageStatusManager

