import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Box } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { BlogPost, BlogComments } from '@/components/features/blog'
import { Grid } from '@mui/material'

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const mockPost = { id: id || '1', title: 'Sample Post', content: '', author: { name: 'Admin', avatar: '' }, publishedAt: new Date() }
  const mockComments = []

  return (
    <UserLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <BlogPost post={mockPost} />
          </Grid>
          <Grid item xs={12}>
            <BlogComments comments={mockComments} />
          </Grid>
        </Grid>
      </Container>
    </UserLayout>
  )
}

export default BlogPostPage

