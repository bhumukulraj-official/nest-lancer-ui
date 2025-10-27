/**
 * Blog Create Page
 * Admin page for creating new blog posts
 */

import { Container } from '@mui/material'
import React from 'react'

import { BlogCreateForm } from '@/components/features/admin/blog'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

