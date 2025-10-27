/**
 * Media Visibility Manager Component
 */

import { Box, Paper, Typography, Select, MenuItem, Button, Stack } from '@mui/material'
import React, { useState } from 'react'

const MediaVisibilityManager: React.FC = () => {
  const [visibility, setVisibility] = useState('public')

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Manage Visibility
        </Typography>
        <Select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
        </Select>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained">Save Changes</Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default MediaVisibilityManager

