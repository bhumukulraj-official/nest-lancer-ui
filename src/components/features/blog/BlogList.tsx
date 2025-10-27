import { Grid, Typography, TextField, Pagination, Box } from '@mui/material'
import React from 'react'

import { BlogCard } from './BlogCard'

export const BlogList: React.FC<{ posts: any[]; onViewPost?: (id: string) => void; loading?: boolean }> = ({ posts, onViewPost }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Blog Posts</Typography>
        <TextField size="small" placeholder="Search posts..." />
      </Box>
      <Grid container spacing={3}>
        {posts.map(post => (
          <Grid item xs={12} md={6} key={post.id}>
            <BlogCard post={post} onView={onViewPost} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  )
}
export default BlogList

