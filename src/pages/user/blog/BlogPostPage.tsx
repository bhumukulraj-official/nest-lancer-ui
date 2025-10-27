import { Container , Grid } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

import { BlogPost, BlogComments } from '@/components/features/blog'
import { UserLayout } from '@/components/layout'


export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const mockPost = { id: id || '1', title: 'Sample Post', content: '', author: { name: 'Admin', avatar: '' }, publishedAt: new Date() }
  const mockComments: any[] = []

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

