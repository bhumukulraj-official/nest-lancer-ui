/**
 * Media Detail Admin Component
 */

import React from 'react'
import { Box, Paper, Typography, Divider, Button, Stack } from '@mui/material'
import { ArrowBack, Edit, Delete } from '@mui/icons-material'

interface MediaDetailAdminProps {
  mediaId?: string
}

const MediaDetailAdmin: React.FC<MediaDetailAdminProps> = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button startIcon={<ArrowBack />} variant="outlined">
          Back to List
        </Button>
        <Button startIcon={<Edit />} variant="contained">
          Edit Media
        </Button>
        <Button startIcon={<Delete />} variant="outlined" color="error">
          Delete Media
        </Button>
      </Stack>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Media Information
        </Typography>
        <Divider sx={{ my: 2 }} />
        {/* Media details will be added here */}
      </Paper>
    </Box>
  )
}

export default MediaDetailAdmin

