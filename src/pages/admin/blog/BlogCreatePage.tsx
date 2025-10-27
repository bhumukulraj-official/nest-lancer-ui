/**
 * Blog Create Page
 * Admin page for creating new blog posts
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { BlogCreateForm } from '@/components/features/admin/blog'

const BlogCreatePage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <BlogCreateForm />
      </Container>
    </AdminLayout>
  )
}

export default BlogCreatePage

