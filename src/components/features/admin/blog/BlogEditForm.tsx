/**
 * Blog Edit Form Admin Component
 */

import React, { useState } from 'react'
import { Box, Paper, Typography, TextField, Button, Stack, Divider } from '@mui/material'
import { Save } from '@mui/icons-material'

interface BlogEditFormProps {
  blogId?: string
}

const BlogEditForm: React.FC<BlogEditFormProps> = ({ blogId }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    console.log('Update blog:', { blogId, title, content })
  }

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Edit Blog Post
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
            Save Changes
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default BlogEditForm

