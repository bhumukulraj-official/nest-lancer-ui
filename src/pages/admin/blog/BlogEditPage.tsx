/**
 * Blog Edit Page
 * Admin page for editing blog posts
 */

import { Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

import { BlogEditForm } from '@/components/features/admin/blog'
import { AdminLayout } from '@/components/layout/AdminLayout'

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

