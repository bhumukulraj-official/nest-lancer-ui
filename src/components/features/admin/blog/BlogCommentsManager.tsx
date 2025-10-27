/**
 * Blog Comments Manager Component
 */

import React from 'react'
import { Box, Paper, Typography } from '@mui/material'

const BlogCommentsManager: React.FC = () => {
  const comments: any[] = []

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Comments Management
        </Typography>
        {comments.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            No comments available
          </Typography>
        )}
      </Paper>
    </Box>
  )
}

export default BlogCommentsManager

