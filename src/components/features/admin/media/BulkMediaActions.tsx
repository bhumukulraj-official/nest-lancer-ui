/**
 * Bulk Media Actions Component
 */

import { Box, Button, Stack } from '@mui/material'
import React from 'react'

interface BulkMediaActionsProps {
  selectedMedia: string[]
}

const BulkMediaActions: React.FC<BulkMediaActionsProps> = ({ selectedMedia }) => {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success">
          Make Public ({selectedMedia.length})
        </Button>
        <Button variant="contained" color="warning">
          Make Private ({selectedMedia.length})
        </Button>
        <Button variant="contained" color="error">
          Delete Selected ({selectedMedia.length})
        </Button>
      </Stack>
    </Box>
  )
}

export default BulkMediaActions

