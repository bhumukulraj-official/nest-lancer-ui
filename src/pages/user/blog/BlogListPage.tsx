import React from 'react'
import { Container } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { BlogList } from '@/components/features/blog'

export const BlogListPage: React.FC = () => {
  const mockPosts = []

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <BlogList posts={mockPosts} />
      </Container>
    </UserLayout>
  )
}

export default BlogListPage

