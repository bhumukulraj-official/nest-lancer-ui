/**
 * Blog Edit Page
 * Admin page for editing blog posts
 */

import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { BlogEditForm } from '@/components/features/admin/blog'

const BlogEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <BlogEditForm blogId={id} />
      </Container>
    </AdminLayout>
  )
}

export default BlogEditPage

