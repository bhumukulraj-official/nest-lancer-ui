/**
 * Blog List Page
 * Admin page for viewing and managing blog posts
 */

import React from 'react'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'

const BlogListPage: React.FC = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Blog list content will be added here */}
      </Container>
    </AdminLayout>
  )
}

export default BlogListPage

