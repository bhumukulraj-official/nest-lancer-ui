import { Container } from '@mui/material'
import React from 'react'

import { BlogList } from '@/components/features/blog'
import { UserLayout } from '@/components/layout'

export const BlogListPage: React.FC = () => {
  const mockPosts: any[] = []

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <BlogList posts={mockPosts} />
      </Container>
    </UserLayout>
  )
}

export default BlogListPage

