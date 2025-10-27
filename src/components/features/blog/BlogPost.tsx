import { Box, Typography, Avatar, Divider, Chip, Stack } from '@mui/material'
import React from 'react'

export const BlogPost: React.FC<{ post: any }> = ({ post }) => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>{post.title}</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Avatar src={post.author.avatar}>{post.author.name.charAt(0)}</Avatar>
        <Box>
          <Typography variant="subtitle2">{post.author.name}</Typography>
          <Typography variant="caption" color="text.secondary">{new Date(post.publishedAt).toLocaleDateString()}</Typography>
        </Box>
        <Chip label={post.category} size="small" />
      </Stack>
      <Divider sx={{ mb: 3 }} />
      {post.thumbnail && <Box component="img" src={post.thumbnail} sx={{ width: '100%', mb: 3, borderRadius: 1 }} />}
      <Typography variant="body1" paragraph>{post.content}</Typography>
    </Box>
  )
}
export default BlogPost

