import { Box, Typography } from '@mui/material'
import React from 'react'

const BlogPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Blog</Typography>
      <Typography variant="body1" color="text.secondary">
        Blog page implementation coming soon...
      </Typography>
    </Box>
  )
}

export default BlogPage
