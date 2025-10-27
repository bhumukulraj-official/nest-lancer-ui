import { Send } from '@mui/icons-material'
import { Box, TextField, Button, Stack, Avatar, Typography, Divider } from '@mui/material'
import React, { useState } from 'react'

export const BlogComments: React.FC<{ comments: any[]; onSubmitComment?: (text: string) => void }> = ({ comments = [], onSubmitComment }) => {
  const [newComment, setNewComment] = useState('')
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Comments ({comments.length})</Typography>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write a comment..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <Button variant="contained" startIcon={<Send />} onClick={() => { onSubmitComment?.(newComment); setNewComment('') }}>
          Post Comment
        </Button>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack spacing={3}>
        {comments.map((comment: any) => (
          <Box key={comment.id}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Avatar src={comment.author.avatar}>{comment.author.name.charAt(0)}</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2">{comment.author.name}</Typography>
                <Typography variant="caption" color="text.secondary">{new Date(comment.createdAt).toLocaleString()}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{comment.text}</Typography>
              </Box>
            </Box>
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
export default BlogComments

