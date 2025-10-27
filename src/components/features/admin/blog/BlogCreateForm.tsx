/**
 * Blog Create Form Admin Component
 */

import { Save } from '@mui/icons-material'
import { Box, Paper, Typography, TextField, Button, Stack, Divider } from '@mui/material'
import React, { useState } from 'react'

const BlogCreateForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    console.log('Create blog:', { title, content })
  }

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Create Blog Post
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Content"
            multiline
            rows={10}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<Save />} onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default BlogCreateForm

