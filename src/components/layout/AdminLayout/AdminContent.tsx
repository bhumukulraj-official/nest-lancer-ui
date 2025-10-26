/**
 * Admin Content
 */

import React, { FC, ReactNode } from 'react'
import { Container } from '@mui/material'

interface AdminContentProps {
  children: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
}

export const AdminContent: FC<AdminContentProps> = ({
  children,
  maxWidth = 'xl',
}) => {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 3 }}>
      {children}
    </Container>
  )
}

export default AdminContent

