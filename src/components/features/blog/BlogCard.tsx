import React from 'react'
import { Card, CardContent, CardMedia, Typography, Avatar, Box, IconButton } from '@mui/material'
import { Share, Bookmark, Comment } from '@mui/icons-material'

export const BlogCard: React.FC<{ post: any; onView?: (id: string) => void }> = ({ post, onView }) => {
  return (
    <Card onClick={() => onView?.(post.id)} sx={{ cursor: 'pointer' }}>
      {post.thumbnail && <CardMedia component="img" height="200" image={post.thumbnail} />}
      <CardContent>
        <Typography variant="h6" gutterBottom>{post.title}</Typography>
        <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 2 }}>{post.excerpt}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={post.author.avatar} sx={{ width: 32, height: 32 }}>{post.author.name.charAt(0)}</Avatar>
            <Box>
              <Typography variant="caption" display="block">{post.author.name}</Typography>
              <Typography variant="caption" color="text.secondary">{new Date(post.publishedAt).toLocaleDateString()}</Typography>
            </Box>
          </Box>
          <Box>
            <IconButton size="small"><Comment /></IconButton>
            <IconButton size="small"><Bookmark /></IconButton>
            <IconButton size="small"><Share /></IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
export default BlogCard

